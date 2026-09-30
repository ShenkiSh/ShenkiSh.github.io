import { expect, test } from "./fixtures";
import { test as failureTest } from "@playwright/test";

const manifest = { loader: "Build/test.loader.js", data: "Build/test.data", framework: "Build/test.framework.js", code: "Build/test.wasm", version: "test" };
const loader = "window.createUnityInstance = async (canvas, config, progress) => { progress(1); return { Quit: async () => {}, SendMessage: (object, method, value) => { if (object === 'FamilyWebBridge' && method === 'SetMuted') canvas.dataset.muted = value; } }; };";
const games = [
  { number: "01", slug: "personal-space", title: "Personal Space" },
  { number: "02", slug: "objects", title: "Objects" },
];

for (const { number, slug, title } of games) {
  test(`Family game ${number} loads only on request and keeps sound, keyboard, fullscreen and return working`, async ({ page, isMobile }) => {
    const requests: string[] = [];
    await page.route("**/games/happily/*/build.json", route => {
      requests.push(route.request().url());
      return route.fulfill({ json: manifest });
    });
    await page.route("**/games/happily/*/Build/test.loader.js", route => route.fulfill({ contentType: "application/javascript", body: loader }));
    await page.goto("/#/we-live-happily-here");
    expect(requests).toHaveLength(0);
    const opener = page.getByRole("button", { name: `Play Game ${number}` });
    await opener.focus();
    const before = await page.evaluate(() => scrollY);
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: `Play ${title}`, exact: true });
    const game = page.frameLocator(`iframe[title="Play ${title} in Unity"]`);
    await expect(dialog).toBeVisible();
    await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
    expect(requests).toHaveLength(1);
    expect(requests[0]).toContain(`/happily/${slug}/build.json`);
    const canvas = game.locator("canvas");
    await expect(canvas).toBeVisible();
    const box = (await canvas.boundingBox())!;
    expect(box.width / box.height).toBeCloseTo(9 / 16, 2);
    await expect(canvas).toHaveAttribute("data-muted", "0");
    await dialog.getByRole("button", { name: "Mute game", exact: true }).click();
    await expect(canvas).toHaveAttribute("data-muted", "1");
    await dialog.getByRole("button", { name: "Unmute game", exact: true }).click();
    await expect(canvas).toHaveAttribute("data-muted", "0");
    if (!isMobile) {
      await dialog.getByRole("button", { name: "Game fullscreen", exact: true }).click();
      await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
      await dialog.getByRole("button", { name: "Exit game fullscreen", exact: true }).click();
      await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(false);
    }
    await canvas.press("Tab");
    await expect(dialog.getByRole("button", { name: "Close game", exact: true })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
    expect(await page.evaluate(() => scrollY)).toBeCloseTo(before, 0);
    await opener.click();
    await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
    await canvas.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  });
}

failureTest("Family game retry preserves mute and returns to the same game", async ({ page }) => {
  let requests = 0;
  await page.route("**/games/happily/objects/build.json", route => {
    requests++;
    return requests === 1 ? route.fulfill({ status: 503, body: "unavailable" }) : route.fulfill({ json: manifest });
  });
  await page.route("**/games/happily/objects/Build/test.loader.js", route => route.fulfill({ contentType: "application/javascript", body: loader }));
  await page.goto("/#/we-live-happily-here");
  await page.getByRole("button", { name: "Play Game 02" }).click();
  const game = page.frameLocator('iframe[title="Play Objects in Unity"]');
  await expect(game.getByRole("alert")).toContainText("The game couldn’t load.");
  await page.getByRole("button", { name: "Mute game", exact: true }).click();
  await game.getByRole("button", { name: "Try again" }).click();
  await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
  await expect(game.locator("canvas")).toHaveAttribute("data-muted", "1");
  expect(requests).toBe(2);
  await page.getByRole("button", { name: "Close game", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});

test("Phone tilt permission is requested from the game frame and denied access keeps touch controls available", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Motion permission control is only offered on touch devices.");
  await page.route("**/games/happily/personal-space/build.json", route => route.fulfill({ json: manifest }));
  await page.route("**/games/happily/personal-space/Build/test.loader.js", route => route.fulfill({ contentType: "application/javascript", body: loader }));
  await page.goto("/#/we-live-happily-here");
  await page.getByRole("button", { name: "Play Game 01" }).click();
  const game = page.frameLocator('iframe[title="Play Personal Space in Unity"]');
  await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
  await game.locator("body").evaluate(() => {
    Object.defineProperty(window.DeviceMotionEvent, "requestPermission", { value: () => Promise.resolve("granted"), configurable: true });
  });
  const tilt = page.getByRole("button", { name: "Enable phone tilt" });
  await tilt.click();
  await expect(tilt).toHaveAttribute("aria-pressed", "true");
  await expect(game.locator("canvas")).toBeFocused();
  await game.locator("body").evaluate(() => {
    Object.defineProperty(window.DeviceMotionEvent, "requestPermission", { value: () => Promise.resolve("denied"), configurable: true });
  });
  await tilt.click();
  await expect(tilt).toHaveAttribute("aria-pressed", "false");
  await expect(page.getByRole("dialog")).toContainText("Tilt is unavailable. Use the touch arrows.");
});
