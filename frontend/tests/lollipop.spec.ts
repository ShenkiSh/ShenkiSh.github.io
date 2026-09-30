import { expect, test } from "./fixtures";

test("Lollipop loads its artwork, brand website and single social reel", async ({ page, context }) => {
  await page.goto("/#/lollipop");
  await expect(page).toHaveTitle("Lollipop | Shani Shlomov");
  await expect(page.getByRole("heading", { name: "Lollipop", exact: true })).toBeVisible();
  await expect(page.locator("main h1")).toHaveCSS("font-family", "Satoshi, Arial, sans-serif");
  for (const img of await page.locator("article img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  }
  const social = page.getByRole("region", { name: "Social Campaign", exact: true });
  await expect(social.locator("video")).toHaveCount(1);
  await expect(social.getByRole("button", { name: "Play Lollipop — Social campaign", exact: true })).toBeVisible();
  await expect(social.getByText(/coming soon/i)).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);

  const website = page.getByRole("link", { name: "Explore the brand website", exact: true });
  const href = await website.getAttribute("href");
  expect(href).toContain("figma.com/proto/oB8PHtagAffUtn4ixBkZxe/");
  expect(new URL(href!).searchParams.get("node-id")).toBe("401-106");
  await expect(website).toHaveAttribute("rel", "noopener noreferrer");
  // Verify the destination without depending on Figma's authentication.
  await context.route("https://www.figma.com/proto/**", route => route.fulfill({ contentType: "text/html", body: "<title>Lollipop brand prototype</title>" }));
  const popupPromise = page.waitForEvent("popup");
  await website.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(href!);
  await popup.close();
  await expect(page).toHaveURL(/#\/lollipop$/);
  await page.getByRole("link", { name: "Next project: ReDream Lab", exact: true }).click();
  await expect(page.getByRole("heading", { name: "ReDream Labs™", exact: true })).toBeVisible();
});

test("the original portrait reel loads on Play and supports sound, seeking, fullscreen and offscreen pause", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  let requests = 0;
  await page.route("**/lollipop/social-reel.mp4", route => { requests++; return route.continue(); });
  await page.goto("/#/lollipop#social");
  const player = page.getByRole("group", { name: "Lollipop — Social campaign video player", exact: true });
  const video = player.locator("video");
  await expect(video).toHaveJSProperty("paused", true);
  await expect(video).toHaveAttribute("preload", "none");
  expect(requests).toBe(0);
  const play = player.getByRole("button", { name: "Play Lollipop — Social campaign", exact: true });
  if (isMobile) await play.tap();
  else { await play.focus(); await page.keyboard.press("Enter"); }
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
  await expect(video).toHaveJSProperty("muted", false);
  expect(await video.evaluate((v: HTMLVideoElement) => [v.videoWidth, v.videoHeight])).toEqual([1080, 1920]);
  expect(await video.evaluate((v: HTMLVideoElement) => v.duration)).toBeCloseTo(19.533, 1);
  await expect(video).toHaveCSS("object-fit", "contain");
  const bounds = (await video.boundingBox())!;
  expect(bounds.width / bounds.height).toBeCloseTo(9 / 16, 2);
  await player.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", true);
  await player.getByRole("button", { name: "Mute", exact: true }).click();
  await expect(video).toHaveJSProperty("muted", true);
  await player.getByRole("button", { name: "Unmute", exact: true }).click();
  await expect(video).toHaveJSProperty("muted", false);
  await player.getByRole("slider", { name: "Seek video" }).focus();
  await page.keyboard.press("End");
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(19);
  await page.keyboard.press("Home");
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeLessThan(.2);
  await player.getByRole("button", { name: "Fullscreen", exact: true }).click();
  await expect.poll(() => player.evaluate(node => document.fullscreenElement === node)).toBe(true);
  await player.getByRole("button", { name: "Exit fullscreen", exact: true }).click();
  await expect.poll(() => page.evaluate(() => document.fullscreenElement === null)).toBe(true);
  await player.getByRole("button", { name: "Play", exact: true }).click();
  await expect(video).toHaveJSProperty("paused", false);
  await page.getByRole("heading", { name: "Lollipop", exact: true }).scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", true);
});

test("the campaign reel can retry a failed media load", async ({ page }) => {
  await page.route("**/lollipop/social-reel.mp4", route => route.fulfill({ status: 200, contentType: "video/mp4", body: "invalid video" }));
  await page.goto("/#/lollipop#social");
  const player = page.getByRole("group", { name: "Lollipop — Social campaign video player", exact: true });
  await player.getByRole("button", { name: "Play Lollipop — Social campaign", exact: true }).click();
  await expect(player.getByRole("alert")).toContainText("This video could not load.");
  await page.unroute("**/lollipop/social-reel.mp4");
  await player.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(player.getByRole("alert")).toHaveCount(0);
  await expect.poll(() => player.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
});

test("Lollipop chapters support deep links, keyboard navigation and returning to Work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/lollipop#social");
  await expect(page.locator("#social")).toBeFocused();
  const nav = page.getByRole("navigation", { name: "Lollipop sections" });
  const chapters = [["Concept", "concept"], ["World", "world"], ["Identity", "identity"], ["Collection", "collection"], ["Posters", "posters"], ["Extensions", "extensions"], ["Website", "website"], ["Social", "social"]];
  for (const [label, id] of chapters) {
    const link = nav.getByRole("link", { name: label, exact: true });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`#/lollipop#${id}$`));
    await expect(link).toHaveAttribute("aria-current", "location");
    const section = page.locator(`#${id}`);
    await expect(section).toBeFocused();
    await expect(section.getByRole("heading").first()).toBeInViewport();
    const navBox = (await nav.boundingBox())!;
    expect((await section.boundingBox())!.y).toBeGreaterThanOrEqual(navBox.y + navBox.height - 1);
  }
  await page.goBack();
  await expect(page.locator("#website")).toBeFocused();
  await page.reload();
  await expect(page.locator("#website")).toBeFocused();
  await page.getByRole("link", { name: "Back to Work", exact: true }).click();
  await expect(page).toHaveURL(/#\/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});
