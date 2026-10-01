import { expect, test } from "./fixtures";

test("all five memory previews play inline with keyboard and support fullscreen without simultaneous playback", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/numi");
  await expect(page).toHaveTitle("NUMI | Shani Shlomov");
  const memories = page.getByRole("list", { name: "Five playable memories" });
  await expect(memories.locator("video")).toHaveCount(5);
  for (const video of await memories.locator("video").all()) {
    await expect(video).toHaveJSProperty("paused", true);
    await expect(video).toHaveJSProperty("autoplay", false);
    await expect(video).toHaveAttribute("preload", "none");
  }
  for (const name of ["Childhood", "Teenage Years", "Twenties", "Motherhood", "Seventies"]) {
    const player = memories.getByRole("group", { name: `${name} — gameplay preview video player`, exact: true });
    const opener = player.getByRole("button", { name: `Play ${name} — gameplay preview`, exact: true });
    await opener.focus();
    await page.keyboard.press("Enter");
    await expect.poll(() => player.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(.1);
    await expect(player.getByRole("button", { name: "Pause", exact: true })).toBeVisible();
    expect(await page.locator("video").evaluateAll((videos: HTMLVideoElement[]) => videos.filter(video => !video.paused).length)).toBe(1);
  }
  const lastPlayer = memories.getByRole("group", { name: "Seventies — gameplay preview video player", exact: true });
  await lastPlayer.getByRole("button", { name: "Fullscreen", exact: true }).click();
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
  await lastPlayer.getByRole("button", { name: "Exit fullscreen", exact: true }).click();
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const chapters = page.getByRole("navigation", { name: "NUMI sections" });
  await chapters.getByRole("link", { name: "UX/UI · Unity", exact: true }).click();
  await expect(chapters.getByRole("link", { name: "UX/UI · Unity", exact: true })).toHaveAttribute("aria-current", "location");
  await expect(page.locator("#testing video")).toHaveCount(2);
  await expect(lastPlayer.locator("video")).toHaveJSProperty("paused", true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("hero plays one trailer inline and Play the Childhood demo scrolls to the playable section", async ({ page }) => {
  const gameRequests: string[] = [];
  page.on("request", request => { if (request.url().includes("/games/numi/")) gameRequests.push(request.url()); });
  await page.goto("/#/numi");
  const player = page.getByRole("group", { name: "NUMI — Gameplay Trailer video player", exact: true });
  const video = player.locator("video");
  await expect(video).toHaveAttribute("src", /trailer\.mp4$/);
  await expect(video).toHaveAttribute("poster", /trailer\.jpg$/);
  await expect(video).toHaveJSProperty("paused", true);
  await expect(video).toHaveJSProperty("autoplay", false);
  await player.getByRole("button", { name: "Play NUMI — Gameplay Trailer", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(player.getByRole("button", { name: "Pause", exact: true })).toBeVisible();
  await expect(player.getByRole("slider", { name: "Seek video" })).toBeVisible();
  await expect(video).toHaveJSProperty("muted", true);
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
  await player.getByRole("button", { name: "Unmute", exact: true }).click();
  await expect(video).toHaveJSProperty("muted", false);
  const playGame = page.getByRole("link", { name: "Play the Childhood demo", exact: true });
  await playGame.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#first-memory")).toBeFocused();
  await expect(page.getByRole("button", { name: "Play in browser", exact: true })).toBeInViewport();
  await expect(video).toHaveJSProperty("paused", true);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator('video[src$="/hero.mp4"]')).toHaveCount(0);
  expect(gameRequests).toEqual([]);
});

test("full childhood film opens in its dialog and restores focus and scroll", async ({ page }) => {
  await page.goto("/#/numi");
  await page.evaluate(() => document.fonts.ready);
  await page.getByRole("link", { name: "Play the Childhood demo", exact: true }).click();
  await expect(page.locator("#first-memory")).toBeFocused();
  const opener = page.getByRole("button", { name: "Watch full Childhood playthrough · 7:33", exact: true });
  await opener.focus();
  const scroll = await page.evaluate(() => scrollY);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog.locator("video")).toHaveAttribute("src", /childhood-full\.mp4$/);
  await expect.poll(() => dialog.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
  await page.getByRole("button", { name: "Close media", exact: true }).click();
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
});

test("only one inline player runs and each video retains working sound controls", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/numi");
  const beforePlayer = page.getByRole("group", { name: "Before — simultaneous controller prompts video player", exact: true });
  const afterPlayer = page.getByRole("group", { name: "After — one prompt at a time video player", exact: true });
  const before = beforePlayer.locator("video");
  const after = afterPlayer.locator("video");
  await beforePlayer.getByRole("button", { name: "Play Before — simultaneous controller prompts", exact: true }).click();
  await expect.poll(() => before.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
  await beforePlayer.getByRole("button", { name: "Unmute", exact: true }).click();
  await expect(before).toHaveJSProperty("muted", false);
  await beforePlayer.getByRole("button", { name: "Mute", exact: true }).click();
  await expect(before).toHaveJSProperty("muted", true);
  await afterPlayer.getByRole("button", { name: "Play After — one prompt at a time", exact: true }).click();
  await expect(after).toHaveJSProperty("paused", false);
  await expect(before).toHaveJSProperty("paused", true);
  await afterPlayer.getByRole("button", { name: "Pause", exact: true }).click();
  await expect(after).toHaveJSProperty("paused", true);
  const seek = afterPlayer.getByRole("slider", { name: "Seek video" });
  await expect(seek).toBeEnabled();
  await seek.focus();
  await page.keyboard.press("Home");
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => after.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeCloseTo(.1, 1);
  await afterPlayer.getByRole("button", { name: "Fullscreen", exact: true }).click();
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
  await afterPlayer.getByRole("button", { name: "Exit fullscreen", exact: true }).click();
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
});

test("the two bridge moments play independently and keep the comparison in place", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/numi");
  const section = page.locator("#design");
  const collapse = section.getByRole("group", { name: "The collapsing hand bridge video player", exact: true });
  const crossing = section.getByRole("group", { name: "A safe crossing video player", exact: true });
  await collapse.getByRole("button", { name: "Play The collapsing hand bridge", exact: true }).click();
  await expect.poll(() => collapse.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(.1);
  await crossing.getByRole("button", { name: "Play A safe crossing", exact: true }).click();
  await expect.poll(() => crossing.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(.1);
  await expect(collapse.locator("video")).toHaveJSProperty("paused", true);
  await expect(collapse.locator("video")).toHaveAttribute("src", /bridge-collapse\.mp4$/);
  await expect(crossing.locator("video")).toHaveAttribute("src", /safe-crossing\.mp4$/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("an unavailable clip can be retried from its frame", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/numi/resize.mp4", route => route.fulfill({ status: 200, contentType: "video/mp4", body: "invalid video" }));
  await page.goto("/#/numi");
  await page.locator("#mechanics > summary").click();
  const player = page.getByRole("group", { name: "Resize video player", exact: true });
  await player.getByRole("button", { name: "Play Resize", exact: true }).click();
  await expect(player.getByRole("alert")).toContainText("This video could not load.");
  await page.unroute("**/numi/resize.mp4");
  await player.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(player.getByRole("alert")).toHaveCount(0);
  await expect.poll(() => player.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
});

test("closing the interaction examples pauses their film and reopening keeps it paused", async ({ page }) => {
  await page.goto("/#/numi");
  const summary = page.locator("#mechanics > summary");
  await summary.click();
  const player = page.getByRole("group", { name: "Resize video player", exact: true });
  const video = page.locator('#mechanics video[src$="/resize.mp4"]');
  await player.getByRole("button", { name: "Play Resize", exact: true }).click();
  await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(.1);
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(page.locator("#mechanics")).not.toHaveAttribute("open");
  await expect(video).toHaveJSProperty("paused", true);
  await page.keyboard.press("Enter");
  await expect(player).toBeVisible();
  await expect(video).toHaveJSProperty("paused", true);
});

test("touch controls can be revealed after hiding and remain usable on finger release", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Requires a touch viewport");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/numi");
  await page.locator("#mechanics > summary").click();
  const player = page.getByRole("group", { name: "Resize video player", exact: true });
  await player.getByRole("button", { name: "Play Resize", exact: true }).tap();
  await expect.poll(() => player.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
  await expect(player).toHaveAttribute("data-controls", "false");
  await player.getByRole("button", { name: "Show controls for Resize", exact: true }).tap();
  await expect(player).toHaveAttribute("data-controls", "true");
  await player.getByRole("button", { name: "Unmute", exact: true }).tap();
  await expect(player.locator("video")).toHaveJSProperty("muted", false);
  await player.getByRole("button", { name: "Pause", exact: true }).tap();
  await expect(player.locator("video")).toHaveJSProperty("paused", true);
});

test("the event image enlarges and the next project returns to a real case study", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/numi");
  const opener = page.getByRole("button", { name: "Enlarge public playtesting photo" });
  await opener.click();
  await expect(page.getByRole("dialog").getByRole("img")).toHaveAttribute("src", /event-01\.jpg$/);
  await page.getByRole("button", { name: "Close media" }).click();
  await expect(opener).toBeFocused();
  await expect(page.getByRole("link", { name: "Channel 10 interview", exact: false })).toHaveAttribute("href", "https://youtu.be/jpuC4LFZNx4");
  await page.getByRole("link", { name: "Next project: We Live Happily Here", exact: true }).click();
  await expect(page).toHaveURL(/#\/we-live-happily-here$/);
  await expect(page.locator("main h1")).toBeVisible();
});
