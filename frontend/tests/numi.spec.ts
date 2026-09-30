import { expect, test } from "./fixtures";

test("NUMI uses the finished case study, has real media, and navigates five memories by keyboard", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/numi");
  await expect(page).toHaveTitle("NUMI | Shani Shlomov");
  await expect(page.getByRole("heading", { name: "NUMI", exact: true })).toBeVisible();
  await expect(page.getByText(/placeholder|coming soon/i)).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Play in browser", exact: true })).toBeVisible();
  const tabs = page.getByRole("tablist", { name: "Five playable memories" });
  await tabs.getByRole("tab", { name: "Childhood", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("heading", { name: "Teenage Years", exact: true })).toBeVisible();
  await expect(tabs.getByRole("tab", { name: "Teenage Years" })).toBeFocused();
  await expect(page.getByRole("tabpanel").getByRole("img")).toHaveAttribute("src", /memory-2\.jpg$/);
  await page.keyboard.press("End");
  await expect(page.getByRole("heading", { name: "Seventies", exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Next memory", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Childhood", exact: true })).toBeVisible();
  const chapters = page.getByRole("navigation", { name: "NUMI sections" });
  await chapters.getByRole("link", { name: "Playtesting", exact: true }).click();
  await expect(chapters.getByRole("link", { name: "Playtesting", exact: true })).toHaveAttribute("aria-current", "location");
  await expect(page.locator("#testing video")).toHaveCount(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("hero plays one trailer inline and Play the game scrolls to the playable section", async ({ page }) => {
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
  const playGame = page.getByRole("link", { name: "Play the game", exact: true });
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
  await page.getByRole("link", { name: "Play the game", exact: true }).click();
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

test("all five Childhood thumbnails play their clip in one shared frame", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/numi");
  const sequence = page.getByRole("group", { name: "Childhood level sequence" });
  const video = page.locator("#level-preview video");
  await expect(video).toHaveJSProperty("paused", true);
  const steps = [
    { caption: "Explore the space", file: "level-explore", duration: "0:11" },
    { caption: "Adapt to the collapsing bridge", file: "bridge-collapse", duration: "0:11" },
    { caption: "Roll the wheel into place", file: "level-wheel", duration: "0:11" },
    { caption: "Combine movement and objects", file: "level-combine", duration: "0:12" },
    { caption: "Cross safely to the bicycle", file: "safe-crossing", duration: "0:11" },
  ];
  await expect(sequence.getByRole("button")).toHaveCount(steps.length);
  for (const [index, step] of steps.entries()) {
    const thumbnail = sequence.getByRole("button", { name: `Play: ${step.caption}`, exact: true });
    await expect(thumbnail).toHaveText(step.duration);
    if (index === 0) {
      await thumbnail.focus();
      await page.keyboard.press("Enter");
    } else await thumbnail.click();
    await expect(thumbnail).toHaveAttribute("aria-pressed", "true");
    await expect(sequence.locator('[aria-pressed="true"]')).toHaveCount(1);
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(video).toHaveCount(1);
    await expect(video).toHaveAttribute("src", new RegExp(`${step.file}\\.mp4$`));
    await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
    await expect.poll(() => page.evaluate(() => [...document.querySelectorAll("video")].filter(video => !video.paused).length)).toBe(1);
  }
});

test("an unavailable clip can be retried from its frame", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/numi/resize.mp4", route => route.fulfill({ status: 200, contentType: "video/mp4", body: "invalid video" }));
  await page.goto("/#/numi");
  const player = page.getByRole("group", { name: "Resize video player", exact: true });
  await player.getByRole("button", { name: "Play Resize", exact: true }).click();
  await expect(player.getByRole("alert")).toContainText("This video could not load.");
  await page.unroute("**/numi/resize.mp4");
  await player.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(player.getByRole("alert")).toHaveCount(0);
  await expect.poll(() => player.locator("video").evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
});

test("touch controls can be revealed after hiding and remain usable on finger release", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Requires a touch viewport");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/numi");
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
  await expect(page.getByRole("dialog").getByRole("img")).toHaveAttribute("src", /imgSourceArtworkGroup1100\.png$/);
  await page.getByRole("button", { name: "Close media" }).click();
  await expect(opener).toBeFocused();
  await expect(page.getByRole("link", { name: "Channel 10 interview", exact: false })).toHaveAttribute("href", "https://youtu.be/jpuC4LFZNx4");
  await page.getByRole("link", { name: "Next project: We Live Happily Here", exact: true }).click();
  await expect(page).toHaveURL(/#\/we-live-happily-here$/);
  await expect(page.locator("main h1")).toBeVisible();
});
