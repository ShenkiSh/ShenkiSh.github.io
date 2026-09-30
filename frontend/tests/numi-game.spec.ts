import { expect, test } from "./fixtures";
import { test as failureTest } from "@playwright/test";

const manifest = { loader: "Build/test.loader.js", data: "Build/test.data", framework: "Build/test.framework.js", code: "Build/test.wasm", version: "test" };
const loader = "window.createUnityInstance = async (canvas, config, progress) => { progress(1); return { Quit: async () => {} }; };";

test("NUMI loads the game only on request and closing restores the case study", async ({ page, isMobile }) => {
  const exceptions: string[] = [];
  page.on("pageerror", error => exceptions.push(error.message));
  let buildRequests = 0;
  await page.route("**/games/numi/build.json", route => { buildRequests++; return route.fulfill({ json: manifest }); });
  await page.route("**/games/numi/Build/test.loader.js", route => route.fulfill({ contentType: "application/javascript", body: loader }));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/numi");
  const opener = page.getByRole("button", { name: "Play in browser", exact: true });
  await opener.scrollIntoViewIfNeeded();
  await opener.focus();
  const scroll = await page.evaluate(() => scrollY);
  expect(buildRequests).toBe(0);
  await opener.click();
  const dialog = page.getByRole("dialog", { name: "NUMI · First Memory" });
  await expect(dialog).toBeVisible();
  if (isMobile) {
    await expect(dialog.getByText("Play on a computer with a keyboard or controller.")).toBeVisible();
    expect(buildRequests).toBe(0);
    await dialog.getByRole("button", { name: "Watch the full playthrough" }).click();
    await expect(page.getByRole("dialog").locator("video")).toHaveAttribute("src", /childhood-full\.mp4$/);
    await page.getByRole("button", { name: "Close media" }).click();
  } else {
    const game = page.frameLocator('iframe[title="Play NUMI — First Memory"]');
    await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
    expect(buildRequests).toBe(1);
    await expect(game.locator("canvas")).toBeVisible();
    await dialog.getByRole("button", { name: "Game fullscreen", exact: true }).click();
    await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement))).toBe(true);
    await expect(game.locator("canvas")).toBeFocused();
    await dialog.getByRole("button", { name: "Exit game fullscreen", exact: true }).click();
    await dialog.getByRole("button", { name: "Close game", exact: true }).click();
    await expect(page.locator('iframe[title="Play NUMI — First Memory"]')).toHaveCount(0);
    await expect(opener).toBeFocused();
    expect(await page.evaluate(() => scrollY)).toBe(scroll);
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
    await opener.click();
    await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
    await game.locator("canvas").press("Shift+KeyX");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
  }
  expect(exceptions).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

// Expected network/console errors belong to this recovery test only.
failureTest("the game shell retries a failed manifest without trapping the user", async ({ page, isMobile }) => {
  failureTest.skip(isMobile, "Desktop game shell; mobile offers the playthrough.");
  let requests = 0;
  await page.route("**/games/numi/build.json", route => {
    requests++;
    return requests === 1 ? route.fulfill({ status: 503, body: "unavailable" }) : route.fulfill({ json: manifest });
  });
  await page.route("**/games/numi/Build/test.loader.js", route => route.fulfill({ contentType: "application/javascript", body: loader }));
  await page.goto("/#/numi");
  await page.getByRole("button", { name: "Play in browser", exact: true }).click();
  const frame = page.frameLocator('iframe[title="Play NUMI — First Memory"]');
  await expect(frame.getByRole("alert")).toContainText("NUMI couldn’t load.");
  await frame.getByRole("button", { name: "Try again" }).click();
  await expect(frame.locator("body")).toHaveAttribute("data-state", "ready");
  expect(requests).toBe(2);
  await page.getByRole("button", { name: "Close game", exact: true }).click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
