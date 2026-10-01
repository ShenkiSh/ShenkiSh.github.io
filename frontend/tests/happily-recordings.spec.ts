import { expect, test } from "./fixtures";

const recordings = [
  { section: "project-overview", title: "How We Live Happily Here works", file: "we-live-happily-here-full", duration: 19.967 },
  { section: "unity-game-01", title: "Personal Space — Gameplay Recording", file: "personal-space-recording", duration: 153.033 },
  { section: "unity-game-02", title: "Objects — Gameplay Recording", file: "objects-recording", duration: 130.867 },
] as const;

test("Happily puts the complete recordings in their sections and loads them only on play", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", request => { if (recordings.some(film => request.url().endsWith(`/${film.file}.mp4`))) requests.push(request.url()); });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/we-live-happily-here");
  for (const film of recordings) {
    const section = page.locator(`#${film.section}`);
    const player = section.getByRole("group", { name: `${film.title} video player` });
    await player.scrollIntoViewIfNeeded();
    await expect(player.locator("video")).toHaveAttribute("src", new RegExp(`${film.file}\\.mp4$`));
    await expect(player.locator("video")).toHaveAttribute("preload", "none");
    await expect(player.locator("video")).toHaveJSProperty("paused", true);
    await expect(player.getByRole("button", { name: `Play ${film.title}`, exact: true })).toBeVisible();
  }
  expect(requests).toEqual([]);
  expect(await page.locator("#project-overview").evaluate(el => Boolean(el.compareDocumentPosition(document.getElementById("how-it-works")!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  expect(await page.locator("#two-users").evaluate(el => Boolean(el.compareDocumentPosition(document.getElementById("cooperation")!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  expect(await page.locator("#two-users").evaluate(el => Boolean(el.compareDocumentPosition(document.getElementById("try-it")!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  await expect(page.locator("#two-users img, #two-users ol")).toHaveCount(0);
  await expect(page.getByRole("heading", { name: "Two Users, One System", exact: true })).toHaveCount(0);

  for (const film of recordings) {
    const player = page.getByRole("group", { name: `${film.title} video player` });
    const video = player.locator("video");
    await player.getByRole("button", { name: `Play ${film.title}`, exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.1);
    expect(await video.evaluate((el: HTMLVideoElement) => el.duration)).toBeCloseTo(film.duration, 0);
    await expect(video).toHaveJSProperty("muted", false);
    // Keyboard focus reveals controls even if they auto-hide while the film loads.
    await player.getByRole("button", { name: "Mute", exact: true }).focus();
    await page.keyboard.press("Enter");
    await expect(video).toHaveJSProperty("muted", true);
    expect(await page.locator("article video").evaluateAll(videos => videos.filter(el => !(el as HTMLVideoElement).paused).length)).toBe(1);
    await player.getByRole("button", { name: "Pause", exact: true }).focus();
    await page.keyboard.press("Enter");
    const seek = player.getByRole("slider", { name: "Seek video" });
    await seek.focus();
    await page.keyboard.press("End");
    await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(film.duration - 1);
  }
});

test("a failed game recording retries and keeps the playable game action available", async ({ page }) => {
  let fail = true;
  await page.route("**/assets/happily/objects-recording.mp4", route => fail ? route.fulfill({ status: 200, contentType: "video/mp4", body: "invalid video" }) : route.continue());
  await page.goto("/#/we-live-happily-here");
  const game = page.locator("#unity-game-02");
  const player = game.getByRole("group", { name: "Objects — Gameplay Recording video player" });
  await player.getByRole("button", { name: "Play Objects — Gameplay Recording", exact: true }).click();
  await expect(player.getByRole("alert")).toContainText("This video could not load.");
  await expect(game.getByRole("button", { name: "Play Game 02", exact: true })).toBeEnabled();
  fail = false;
  await player.getByRole("button", { name: "Try again", exact: true }).click();
  await expect(player.getByRole("alert")).toHaveCount(0);
  await expect.poll(() => player.locator("video").evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.1);
});
