import { expect, test } from "./fixtures";

test("My Bunny presents the care game with original mockup and visual artwork", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/my-bunny");
  await expect(page).toHaveTitle("My Bunny | Shani Shlomov");
  await expect(page.getByRole("heading", { name: "My Bunny", exact: true })).toBeVisible();
  await expect(page.getByText("Educational Care Game", { exact: true })).toBeVisible();
  await expect(page.getByText(/placeholder|Mobile Game|Characters \/ Assets/i)).toHaveCount(0);
  await expect(page.locator("#stages figure")).toHaveCount(3);
  for (const image of await page.locator("article img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  }
  const mockup = page.getByRole("button", { name: "Enlarge the My Bunny mockup", exact: true });
  const image = mockup.getByRole("img");
  const box = (await image.boundingBox())!;
  expect(box.width / box.height).toBeCloseTo(16 / 9, 2);
  expect(await image.evaluate(el => getComputedStyle(el).objectFit)).toBe("contain");
  await mockup.focus();
  const scroll = await page.evaluate(() => scrollY);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "My Bunny", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Close artwork" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(mockup).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBeCloseTo(scroll, 0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("link", { name: "HeadEase", exact: false }).click();
  await expect(page).toHaveURL(/#\/headease$/);
  await expect(page.locator("main h1")).toHaveText("HeadEase");
});

test("chapter links work with the keyboard and legacy/deep links retain the right position", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/my-bunny.html#feedback");
  const nav = page.getByRole("navigation", { name: "My Bunny sections" });
  await expect(nav.getByRole("link", { name: "Feedback", exact: true })).toHaveAttribute("aria-current", "location");
  for (const [label, id] of [["Care stages", "stages"], ["Feedback", "feedback"], ["Visual design", "visual-ui"], ["Try it", "prototype"]]) {
    const link = nav.getByRole("link", { name: label, exact: true });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`#/my-bunny#${id}$`));
    await expect(link).toHaveAttribute("aria-current", "location");
    await expect(page.locator(`#${id}`)).toBeFocused();
    await expect(page.locator(`#${id}`).getByRole("heading").first()).toBeInViewport();
    const navBox = (await nav.boundingBox())!;
    expect((await page.locator(`#${id}`).boundingBox())!.y).toBeGreaterThanOrEqual(navBox.y + navBox.height - 1);
  }
  await page.reload();
  await expect(page.locator("#prototype")).toBeFocused();
  for (const id of ["idea", "interaction", "app-game"]) {
    await page.goto(`/#/my-bunny#${id}`);
    await expect(page.locator(`#${id}`)).toBeFocused();
    await expect(page.locator(`#${id}`).getByRole("heading").first()).toBeInViewport();
  }
  await page.getByRole("link", { name: "Back to Work", exact: true }).click();
  await expect(page).toHaveURL(/#\/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});

test("the hero gameplay action starts the full film with sound and retains accessible controls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/my-bunny");
  const hero = page.locator('header[aria-label="My Bunny introduction"]');
  await expect(hero.getByRole("link", { name: "Explore the game", exact: true })).toHaveAttribute("href", /#prototype$/);
  await expect(page.locator("#prototype").getByRole("button", { name: "Play My Bunny", exact: true })).toHaveCount(1);
  await expect(hero.getByRole("button", { name: "Watch Gameplay", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Watch Full Prototype" })).toHaveCount(0);
  await expect(page.locator("#prototype").getByRole("button", { name: "Watch Gameplay" })).toHaveCount(0);
  const player = page.getByRole("group", { name: "My Bunny — Unity gameplay video player" });
  const video = player.locator("video");
  await expect(video).toHaveJSProperty("paused", true);
  await expect(video).toHaveAttribute("preload", "none");
  await page.getByRole("button", { name: "Watch Gameplay", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(video).toHaveJSProperty("paused", false);
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeLessThan(5);
  await expect(video).toHaveJSProperty("muted", false);
  await expect(video).toBeInViewport();
  await player.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", true);
  await player.getByRole("button", { name: "Mute", exact: true }).click();
  await expect(video).toHaveJSProperty("muted", true);
  await player.getByRole("button", { name: "Unmute", exact: true }).click();
  await expect(video).toHaveJSProperty("muted", false);
  const seek = player.getByRole("slider", { name: "Seek video" });
  await seek.focus();
  await page.keyboard.press("End");
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(60);
  await page.keyboard.press("Home");
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeLessThan(5);
  await player.getByRole("button", { name: "Play", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", false);
  await page.getByRole("heading", { name: "My Bunny", exact: true }).scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", true);
});

test("an unavailable Unity recording can be retried without leaving the case study", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/videos/my-bunny-full.mp4", route => route.fulfill({ status: 200, contentType: "video/mp4", body: "invalid video" }));
  await page.goto("/#/my-bunny");
  await page.getByRole("button", { name: "Watch Gameplay", exact: true }).click();
  const player = page.getByRole("group", { name: "My Bunny — Unity gameplay video player" });
  await expect(player.getByRole("alert")).toContainText("This video could not load.");
  await expect(player.getByRole("link", { name: "Open video" })).toHaveAttribute("href", /my-bunny-full.mp4$/);
  await page.unroute("**/videos/my-bunny-full.mp4");
  await player.getByRole("button", { name: "Try again" }).click();
  await expect(player.getByRole("alert")).toHaveCount(0);
  await expect(player.locator("video")).toHaveJSProperty("paused", false);
  await expect.poll(() => player.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime)).toBeLessThan(5);
});

test("care and feedback clips play with sound on request, one at a time", async ({ page, isMobile }) => {
  let downloads = 0;
  await page.route("**/my-bunny-*-demo.mp4", route => { downloads++; return route.continue(); });
  await page.goto("/#/my-bunny");
  await expect(page).toHaveTitle("My Bunny | Shani Shlomov");
  expect(downloads).toBe(0);
  const clips = page.locator('#stages video, #feedback video');
  await expect(clips).toHaveCount(4);
  for (const [title, duration] of [["Feeding", 18], ["Cleaning", 12], ["Playtime", 12], ["Feedback", 6]] as const) {
    const player = page.getByRole("group", { name: `My Bunny — ${title} video player`, exact: true });
    const video = player.locator("video");
    await expect(video).toHaveJSProperty("paused", true);
    const play = player.getByRole("button", { name: `Play My Bunny — ${title}`, exact: true });
    if (isMobile) await play.tap();
    else { await play.focus(); await page.keyboard.press("Enter"); }
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
    await expect(video).toHaveJSProperty("muted", false);
    expect(await video.evaluate((v: HTMLVideoElement) => v.duration)).toBeCloseTo(duration, 1);
    expect(await video.evaluate((v: HTMLVideoElement) => v.videoWidth / v.videoHeight)).toBeCloseTo(9 / 16, 2);
    await expect.poll(() => page.locator("article video").evaluateAll(nodes => nodes.filter(node => !(node as HTMLVideoElement).paused).length)).toBe(1);
  }
  const feedback = page.getByRole("group", { name: "My Bunny — Feedback video player", exact: true });
  await feedback.getByRole("button", { name: "Mute", exact: true }).click();
  await expect(feedback.locator("video")).toHaveJSProperty("muted", true);
  await feedback.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(feedback.locator("video")).toHaveJSProperty("paused", true);
  expect(downloads).toBeGreaterThanOrEqual(4);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
