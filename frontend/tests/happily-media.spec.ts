import { expect, test } from "./fixtures";

test("full app film opens on request, plays exclusively and restores keyboard focus", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", request => { if (request.url().endsWith("/app-full-flow.mp4")) requests.push(request.url()); });
  await page.goto("/#/we-live-happily-here");
  await expect(page.getByRole("heading", { name: "We Live Happily Here", exact: true })).toBeVisible();
  await expect(page.locator('video[src$="app-full-flow.mp4"]')).toHaveCount(0);
  expect(requests).toEqual([]);
  const overview = page.getByRole("group", { name: "How We Live Happily Here works video player" });
  await overview.getByRole("button", { name: "Play How We Live Happily Here works", exact: true }).click();
  await expect.poll(() => overview.locator("video").evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(0);
  const launch = page.getByRole("button", { name: "Watch the full app flow", exact: true });
  await launch.focus();
  const scroll = await page.evaluate(() => scrollY);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "The full app flow" });
  await expect(dialog).toBeVisible();
  const video = dialog.locator("video");
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(.1);
  await expect(video).toHaveJSProperty("muted", false);
  expect(await video.evaluate((el: HTMLVideoElement) => el.duration)).toBeCloseTo(263.6, 0);
  await dialog.getByRole("button", { name: "Mute", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(video).toHaveJSProperty("muted", true);
  await dialog.getByRole("button", { name: "Pause", exact: true }).focus();
  await page.keyboard.press("Enter");
  await dialog.getByRole("slider", { name: "Seek video" }).focus();
  await page.keyboard.press("End");
  await expect.poll(() => video.evaluate((el: HTMLVideoElement) => el.currentTime)).toBeGreaterThan(262);

  await expect(overview.locator("video")).toHaveJSProperty("paused", true);
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(launch).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBeCloseTo(scroll, 0);
  await expect(page.locator('video[src$="app-full-flow.mp4"]')).toHaveCount(0);
});

test("the original photographic mockup enlarges without losing the reader's place", async ({ page }) => {
  await page.goto("/#/we-live-happily-here");
  await expect(page.getByRole("heading", { name: "We Live Happily Here", exact: true })).toBeVisible();
  const launch = page.getByRole("button", { name: "Enlarge the family app mockup" });
  await launch.focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "The family app" });
  await expect(dialog).toBeVisible();
  await expect.poll(() => dialog.locator("img").evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  await dialog.getByRole("button", { name: "Close media" }).click();
  await expect(dialog).toHaveCount(0);
  await expect(launch).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
