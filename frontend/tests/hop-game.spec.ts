import { expect, test } from "./fixtures";
import { test as failureTest } from "@playwright/test";

const manifest = { loader: "Build/test.loader.js", data: "Build/test.data", framework: "Build/test.framework.js", code: "Build/test.wasm", version: "test" };
const loader = "window.createUnityInstance = async (canvas, config, progress) => { progress(1); return { Quit: async () => {}, SendMessage: (object, method, value) => { if (object === 'HopWebBridge' && method === 'SetMuted') canvas.dataset.muted = value; } }; };";

test("Hop opens on request with accessible sound, fullscreen, close and mobile recording fallback", async ({ page, isMobile }) => {
  let requests = 0;
  await page.route("**/games/hop/build.json", route => { requests++; return route.fulfill({ json: manifest }); });
  await page.route("**/games/hop/Build/test.loader.js", route => route.fulfill({ contentType: "application/javascript", body: loader }));
  await page.goto("/#/le-frogette");
  const opener = page.getByRole("button", { name: "Play the game", exact: true });
  await opener.focus();
  const scroll = await page.evaluate(() => scrollY);
  expect(requests).toBe(0);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "Hop! It’s the Chef!", exact: true });
  await expect(dialog).toBeVisible();
  if (isMobile) {
    await expect(dialog).toContainText("Play on a computer with a keyboard.");
    await expect(dialog.locator("iframe")).toHaveCount(0);
    expect(requests).toBe(0);
    await dialog.getByRole("button", { name: "Watch the full playthrough", exact: true }).click();
    await expect(dialog).toHaveCount(0);
    const video = page.locator('#watch video');
    await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(.1);
    return;
  }
  const game = page.frameLocator('iframe[title="Play Hop! It’s the Chef! in Unity"]');
  await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
  expect(requests).toBe(1);
  const box = (await game.locator("canvas").boundingBox())!;
  expect(box.width / box.height).toBeCloseTo(16 / 9, 2);
  await dialog.getByRole("button", { name: "Mute game", exact: true }).click();
  await expect(game.locator("canvas")).toHaveAttribute("data-muted", "1");
  await dialog.getByRole("button", { name: "Unmute game", exact: true }).click();
  await expect(game.locator("canvas")).toHaveAttribute("data-muted", "0");
  await dialog.getByRole("button", { name: "Game fullscreen", exact: true }).click();
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
  await dialog.getByRole("button", { name: "Exit game fullscreen", exact: true }).click();
  await expect(game.locator("canvas")).toBeFocused();
  // Escape remains available to the authored pause/practice UI.
  await game.locator("canvas").press("Escape");
  await expect(dialog).toBeVisible();
  await game.locator("canvas").press("Tab");
  await expect(dialog.getByRole("button", { name: "Close game", exact: true })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
  await opener.click();
  await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
  await game.locator("canvas").press("Shift+X");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
});

failureTest("Hop download retries in place and preserves mute", async ({ page, isMobile }) => {
  failureTest.skip(isMobile, "The keyboard game offers the recording on touch devices");
  let requests = 0;
  await page.route("**/games/hop/build.json", route => {
    requests++;
    return requests === 1 ? route.fulfill({ status: 503, body: "unavailable" }) : route.fulfill({ json: manifest });
  });
  await page.route("**/games/hop/Build/test.loader.js", route => route.fulfill({ contentType: "application/javascript", body: loader }));
  await page.goto("/#/le-frogette");
  await page.getByRole("button", { name: "Play the game", exact: true }).click();
  const game = page.frameLocator('iframe[title="Play Hop! It’s the Chef! in Unity"]');
  await expect(game.getByRole("alert")).toContainText("Hop couldn’t load.");
  await page.getByRole("button", { name: "Mute game", exact: true }).click();
  await game.getByRole("button", { name: "Try again" }).click();
  await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
  await expect(game.locator("canvas")).toHaveAttribute("data-muted", "1");
  expect(requests).toBe(2);
  await page.getByRole("button", { name: "Close game", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
