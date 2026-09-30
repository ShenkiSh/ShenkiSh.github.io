import { expect, test } from "./fixtures";
import { test as failureTest } from "@playwright/test";

test("Hop loads films on play and supports the complete recording, sound and seeking", async ({ page, isMobile }) => {
  let requests = 0;
  page.on("request", request => { if (/\/assets\/hop\/.*\.mp4/.test(request.url())) requests++; });
  await page.goto("/#/le-frogette");
  const preview = page.getByRole("group", { name: "Hop gameplay preview video player", exact: true });
  const full = page.getByRole("group", { name: "Hop full playthrough video player", exact: true });
  await expect(preview).toBeVisible();
  await expect(preview.locator("video")).toHaveAttribute("preload", "none");
  expect(requests).toBe(0);
  await preview.getByRole("button", { name: "Play Hop gameplay preview", exact: true }).click();
  await expect.poll(() => preview.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(.1);
  await expect(preview.locator("video")).toHaveJSProperty("muted", false);
  await page.getByRole("button", { name: "Watch the full playthrough", exact: true }).click();
  await expect(full).toBeInViewport();
  await expect.poll(() => full.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(.1);
  await expect(preview.locator("video")).toHaveJSProperty("paused", true);
  await expect(full.locator("video")).toHaveJSProperty("videoWidth", 1920);
  await expect.poll(() => full.locator("video").evaluate((video: HTMLVideoElement) => video.duration)).toBeCloseTo(739.53, 0);
  await full.getByRole("button", { name: "Mute", exact: true }).click();
  await expect(full.locator("video")).toHaveJSProperty("muted", true);
  await full.getByRole("button", { name: "Unmute", exact: true }).click();
  await full.getByRole("slider", { name: "Seek video" }).fill("600");
  await expect.poll(() => full.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThanOrEqual(600);
  if (!isMobile) {
    await full.getByRole("button", { name: "Fullscreen", exact: true }).click();
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
    await full.getByRole("button", { name: "Exit fullscreen", exact: true }).click();
  }
  await page.evaluate(() => scrollTo(0, 0));
  await expect(full.locator("video")).toHaveJSProperty("paused", true);
});

failureTest("Hop recording offers retry after a failed download", async ({ page }) => {
  let failed = false;
  await page.route("**/assets/hop/full-game.mp4", async route => {
    if (!failed) { failed = true; await route.abort(); }
    else await route.continue();
  });
  await page.goto("/#/le-frogette");
  await page.getByRole("button", { name: "Watch the full playthrough", exact: true }).click();
  const full = page.getByRole("group", { name: "Hop full playthrough video player", exact: true });
  await expect(full.getByRole("alert")).toContainText("This video could not load.");
  await full.getByRole("button", { name: "Try again", exact: true }).click();
  await expect.poll(() => full.locator("video").evaluate((video: HTMLVideoElement) => video.currentTime)).toBeGreaterThan(.1);
  await expect(full.getByRole("alert")).toHaveCount(0);
});
