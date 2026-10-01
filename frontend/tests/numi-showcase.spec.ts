import { expect, test } from "./fixtures";

test("the Channel 10 interview loads on play with sound and preserves seeking", async ({ page }) => {
  const requests: string[] = [];
  page.on("request", request => { if (request.url().endsWith("/numi/interview.mp4")) requests.push(request.url()); });
  await page.goto("/#/numi#players");
  await expect(page.locator("#players")).toBeFocused();
  const player = page.getByRole("group", { name: "NUMI — Channel 10 interview video player", exact: true });
  await expect(player).toBeVisible();
  expect(requests).toEqual([]);
  const video = player.locator("video");
  await expect(video).toHaveJSProperty("paused", true);
  await player.getByRole("button", { name: "Play NUMI — Channel 10 interview", exact: true }).click();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(.1);
  await expect(video).toHaveJSProperty("muted", false);
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.duration)).toBeGreaterThan(508);
  // Playback can load after controls have faded; reveal them as a visitor would.
  await player.getByRole("button", { name: "Show controls for NUMI — Channel 10 interview", exact: true }).click();
  await player.getByRole("button", { name: "Pause", exact: true }).click();
  const seek = player.getByRole("slider", { name: "Seek video" });
  await seek.focus();
  await page.keyboard.press("End");
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(500);
  expect(requests.length).toBeGreaterThan(0);
});

test("the gallery keeps its close control visible in landscape", async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 });
  await page.goto("/#/numi#players");
  await expect(page.locator("#players")).toBeFocused();
  await page.getByRole("button", { name: "Open event photo 1 of 5", exact: true }).click();
  const dialog = page.getByRole("dialog");
  const close = dialog.getByRole("button", { name: "Close media", exact: true });
  await expect(close).toBeInViewport({ ratio: 1 });
  await page.keyboard.press("End");
  await expect(dialog.getByRole("img")).toHaveAttribute("src", /event-05\.jpg$/);
  await expect(close).toBeInViewport({ ratio: 1 });
  await close.click();
  await expect(dialog).toHaveCount(0);
});

test("event thumbnails open the selected photo and gallery navigation restores focus and scroll", async ({ page }) => {
  await page.goto("/#/numi#players");
  // Anchor navigation focuses the section after fonts and layout settle.
  await expect(page.locator("#players")).toBeFocused();
  const opener = page.getByRole("button", { name: "Open event photo 3 of 5", exact: true });
  await opener.focus();
  const scroll = await page.evaluate(() => scrollY);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("img")).toHaveAttribute("src", /event-03\.jpg$/);
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("img")).toHaveAttribute("src", /event-04\.jpg$/);
  await page.keyboard.press("Home");
  await expect(dialog.getByRole("img")).toHaveAttribute("src", /event-01\.jpg$/);
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByRole("img")).toHaveAttribute("src", /event-05\.jpg$/);
  await dialog.getByRole("button", { name: "Next photo", exact: true }).click();
  await expect(dialog.getByRole("img")).toHaveAttribute("src", /event-01\.jpg$/);
  await dialog.getByRole("button", { name: "Show event photo 2 of 5", exact: true }).click();
  await expect(dialog.getByRole("img")).toHaveAttribute("src", /event-02\.jpg$/);
  await expect(dialog.getByRole("img")).toHaveCSS("object-fit", "contain");
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(opener).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBe(scroll);
});

test("the enlarged gallery supports horizontal swipes on touch screens", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Requires a touch viewport");
  await page.goto("/#/numi#players");
  await expect(page.locator("#players")).toBeFocused();
  await page.getByRole("button", { name: "Open event photo 2 of 5", exact: true }).tap();
  const dialog = page.getByRole("dialog");
  const image = dialog.getByRole("img");
  await expect(image).toHaveAttribute("src", /event-02\.jpg$/);
  const box = (await image.boundingBox())!;
  const cdp = await page.context().newCDPSession(page);
  const x = box.x + box.width * .8, y = box.y + box.height / 2;
  await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x, y }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: x - 90, y }] });
  await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await expect(image).toHaveAttribute("src", /event-03\.jpg$/);
  await cdp.detach();
  await dialog.getByRole("button", { name: "Close media", exact: true }).tap();
  await expect(dialog).toHaveCount(0);
});
