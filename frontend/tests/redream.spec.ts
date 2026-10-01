import { expect, test } from "./fixtures";

test("ReDream opens directly from More Projects and presents the confirmed After Effects work", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/");
  await page.getByRole("button", { name: "Go to ReDream Lab", exact: true }).click();
  const project = page.getByRole("link", { name: "View ReDream Lab project", exact: true });
  await expect(project).toHaveAttribute("href", "#/redream");
  if (isMobile) await project.tap();
  else { await project.focus(); await page.keyboard.press("Enter"); }
  await expect(page).toHaveURL(/#\/redream$/);
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(page).toHaveTitle("ReDream Labs™ | Shani Shlomov");
  await expect(page.getByRole("heading", { name: "ReDream Labs™", exact: true })).toBeVisible();
  await expect(page.getByText(/placeholder|footage will be added|coming soon/i)).toHaveCount(0);
  await expect(page.locator("#scenes figure")).toHaveCount(4);
  const production = page.getByRole("region", { name: "Building the experience.", exact: true });
  await expect(production.getByRole("heading", { name: "The dream scan in motion", exact: true })).toBeVisible();
  await expect(production).toContainText("I created the video scenes and transitions in After Effects");
  await expect(page.locator("#credits")).toContainText("Lighting inside Unity");
  await expect(production.getByRole("group", { name: "ReDream Labs — Dream scan video player", exact: true }).locator("video")).toHaveAttribute("src", /redream\/dream-scan-hd.mp4$/);
  await expect(page.locator("article header").getByRole("button", { name: "Watch the full experience", exact: true })).toBeVisible();
  for (const img of await page.locator("article img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: "Next project: NUMI", exact: true }).click();
  await expect(page).toHaveURL(/#\/numi$/);
});

test("the concise chapters and earlier deep links support keyboard navigation and browser back", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/redream#production");
  const nav = page.getByRole("navigation", { name: "ReDream Labs sections" });
  await expect(page.locator("#production")).toBeFocused();
  await expect(nav.getByRole("link", { name: "Making it", exact: true })).toHaveAttribute("aria-current", "location");
  const chapters = [["The idea", "overview"], ["The journey", "scenes"], ["Making it", "production"], ["Full experience", "watch"]];
  for (const [label, id] of chapters) {
    const link = nav.getByRole("link", { name: label, exact: true });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`#/redream#${id}$`));
    await expect(link).toHaveAttribute("aria-current", "location");
    const section = page.locator(`#${id}`);
    await expect(section).toBeFocused();
    await expect(section.getByRole("heading").first()).toBeInViewport();
    const navBox = (await nav.boundingBox())!;
    expect((await section.boundingBox())!.y).toBeGreaterThanOrEqual(navBox.y + navBox.height - 1);
  }
  await page.goBack();
  await expect(page.locator("#production")).toBeFocused();
  await page.reload();
  await expect(page.locator("#production")).toBeFocused();
  for (const id of ["research", "narrative", "vr-design"]) {
    await page.goto(`/#/redream#${id}`);
    await expect(page.locator(`#${id}`)).toBeFocused();
    await expect(page.locator(`#${id}`).getByRole("heading").first()).toBeInViewport();
  }
  await page.getByRole("link", { name: "Back to Work", exact: true }).click();
  await expect(page).toHaveURL(/#\/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});

test("ReDream films load on request, play one at a time and expose working sound and seek controls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  let requests = 0;
  await page.route("**/redream/*.mp4", route => { requests++; return route.continue(); });
  await page.goto("/#/redream");
  await expect(page).toHaveTitle("ReDream Labs™ | Shani Shlomov");
  expect(requests).toBe(0);
  for (const video of await page.locator("article video").all()) {
    await expect(video).toHaveJSProperty("paused", true);
    await expect(video).toHaveAttribute("preload", "none");
  }
  const titles = ["Experience preview", "Dream scan", "Inside the exam", "Leaving the classroom"];
  for (const title of titles) {
    const player = page.getByRole("group", { name: `ReDream Labs — ${title} video player`, exact: true });
    await player.getByRole("button", { name: `Play ReDream Labs — ${title}`, exact: true }).click();
    await expect.poll(() => player.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
    expect(await player.locator("video").evaluate((v: HTMLVideoElement) => v.videoWidth)).toBeGreaterThanOrEqual(2560);
    expect(await player.locator("video").evaluate((v: HTMLVideoElement) => v.videoHeight)).toBeGreaterThanOrEqual(1440);
    await expect.poll(() => page.locator("article video").evaluateAll(nodes => nodes.filter(n => !(n as HTMLVideoElement).paused).length)).toBe(1);
  }
  const full = page.getByRole("group", { name: "ReDream Labs — Full VR experience video player", exact: true });
  const video = full.locator("video");
  await page.getByRole("button", { name: "Watch the full experience", exact: true }).click();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
  await expect(video).toHaveJSProperty("muted", false);
  expect(await video.evaluate((v: HTMLVideoElement) => v.duration)).toBeCloseTo(267.03, 0);
  expect(await video.evaluate((v: HTMLVideoElement) => v.videoWidth)).toBeGreaterThanOrEqual(2560);
  expect(await video.evaluate((v: HTMLVideoElement) => v.videoHeight)).toBeGreaterThanOrEqual(1440);
  await full.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", true);
  await full.getByRole("button", { name: "Mute", exact: true }).click();
  await expect(video).toHaveJSProperty("muted", true);
  await full.getByRole("slider", { name: "Seek video" }).focus();
  await page.keyboard.press("End");
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(260);
  await page.getByRole("button", { name: "Watch the full experience", exact: true }).click();
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeLessThan(5);
  await page.getByRole("heading", { name: "ReDream Labs™", exact: true }).scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", true);
});

test("a failed full recording can be retried in place", async ({ page }) => {
  await page.route("**/redream/full-experience-hd.mp4", route => route.fulfill({ status: 200, contentType: "video/mp4", body: "invalid video" }));
  await page.goto("/#/redream#watch");
  await page.getByRole("button", { name: "Watch the full experience", exact: true }).click();
  const player = page.getByRole("group", { name: "ReDream Labs — Full VR experience video player", exact: true });
  await expect(player.getByRole("alert")).toContainText("This video could not load.");
  await page.unroute("**/redream/full-experience-hd.mp4");
  await player.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(player.getByRole("alert")).toHaveCount(0);
  await expect.poll(() => player.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
});
