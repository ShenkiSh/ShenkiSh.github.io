import { expect, test } from "./fixtures";
import { test as failureTest } from "@playwright/test";

const manifest = { loader: "Build/test.loader.js", data: "Build/test.data", framework: "Build/test.framework.js", code: "Build/test.wasm", version: "test" };
const loader = "window.createUnityInstance = async (canvas, config, progress) => { progress(1); return { Quit: async () => {}, SendMessage: (object, method, value) => { if (object === 'MyBunnyAudio' && method === 'SetMuted') canvas.dataset.muted = value; } }; };";

test("My Bunny loads on request on desktop and touch, and restores the hero on close", async ({ page, isMobile }) => {
  let requests = 0;
  await page.route("**/games/my-bunny/build.json", route => { requests++; return route.fulfill({ json: manifest }); });
  await page.route("**/games/my-bunny/Build/test.loader.js", route => route.fulfill({ contentType: "application/javascript", body: loader }));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/my-bunny");
  const opener = page.getByRole("button", { name: "Play My Bunny", exact: true });
  await opener.focus();
  const scroll = await page.evaluate(() => scrollY);
  expect(requests).toBe(0);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Play My Bunny", exact: true });
  const game = page.frameLocator('iframe[title="Play My Bunny in Unity"]');
  await expect(dialog).toBeVisible();
  await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
  expect(requests).toBe(1);
  await expect(game.locator("canvas")).toBeVisible();
  const box = (await game.locator("canvas").boundingBox())!;
  expect(box.width / box.height).toBeCloseTo(9 / 16, 2);
  await expect(game.locator("canvas")).toHaveAttribute("data-muted", "0");
  await dialog.getByRole("button", { name: "Mute game", exact: true }).click();
  await expect(game.locator("canvas")).toHaveAttribute("data-muted", "1");
  await dialog.getByRole("button", { name: "Unmute game", exact: true }).click();
  await expect(game.locator("canvas")).toHaveAttribute("data-muted", "0");
  if (!isMobile) {
    await dialog.getByRole("button", { name: "Game fullscreen", exact: true }).click();
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
    await dialog.getByRole("button", { name: "Exit game fullscreen", exact: true }).click();
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
    await expect(game.locator("canvas")).toBeFocused();
  }
  // Tab must escape Unity's canvas to the surrounding dialog controls.
  await game.locator("canvas").press("Tab");
  await expect(dialog.getByRole("button", { name: "Close game", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
  expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
  await opener.click();
  await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
  await game.locator("canvas").press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

// The failed download is deliberate; keep its expected network error local to this test.
failureTest("My Bunny retries a failed download without leaving the case study", async ({ page }) => {
  let requests = 0;
  await page.route("**/games/my-bunny/build.json", route => {
    requests++;
    return requests === 1 ? route.fulfill({ status: 503, body: "unavailable" }) : route.fulfill({ json: manifest });
  });
  await page.route("**/games/my-bunny/Build/test.loader.js", route => route.fulfill({ contentType: "application/javascript", body: loader }));
  await page.goto("/#/my-bunny");
  await page.getByRole("button", { name: "Play My Bunny", exact: true }).click();
  const game = page.frameLocator('iframe[title="Play My Bunny in Unity"]');
  await expect(game.getByRole("alert")).toContainText("My Bunny couldn’t load.");
  await page.getByRole("button", { name: "Mute game", exact: true }).click();
  await game.getByRole("button", { name: "Try again" }).click();
  await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
  await expect(game.locator("canvas")).toHaveAttribute("data-muted", "1");
  expect(requests).toBe(2);
  await page.getByRole("button", { name: "Close game", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
