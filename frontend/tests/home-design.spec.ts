import { expect, test } from "./fixtures";

test("Figma homepage uses the supplied compositions and keeps the three-project carousel centered", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#home")).toHaveAttribute("data-playback", "paused");
  for (const file of ["numi", "happily-sky", "happily-screens", "tenki", "my-bunny"]) {
    const image = page.locator(`#work img[src$="/${file}.png"]`);
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
  }
  await expect(page.getByRole("heading", { name: "Game UI & Visual Playground" })).toHaveCount(0);
  const gallery = page.locator("#more-work");
  await gallery.scrollIntoViewIfNeeded();
  const names = ["HeadEase", "ReDream Labs", "Lollipop"];
  await expect(gallery.getByRole("button", { name: /^Go to / })).toHaveCount(3);
  await expect(gallery).not.toContainText("Amberlia");
  for (const [index, name] of names.entries()) {
    await gallery.getByRole("button", { name: `Go to ${name}`, exact: true }).click();
    const card = gallery.locator('[data-position="current"]');
    await expect(card.getByRole("heading", { name, exact: true })).toBeVisible();
    await expect(gallery.locator('[data-position="previous"]')).toHaveAttribute("aria-label", `${(index + 2) % 3 + 1} of 3: ${names[(index + 2) % 3]}`);
    await expect(gallery.locator('[data-position="next"]')).toHaveAttribute("aria-label", `${(index + 1) % 3 + 1} of 3: ${names[(index + 1) % 3]}`);
    const image = card.locator("img").first();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBeGreaterThan(0);
    const bounds = await image.boundingBox();
    expect(Math.abs((bounds?.x ?? 0) + (bounds?.width ?? 0) / 2 - (page.viewportSize()?.width ?? 0) / 2)).toBeLessThan(2);
  }
  await gallery.getByRole("button", { name: "Go to Lollipop" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(gallery.getByRole("button", { name: "Go to HeadEase" })).toBeFocused();
  await expect(gallery.locator('[data-position="current"]')).toContainText("HeadEase");
  await expect(gallery.getByRole("button", { name: /(?:Play|Pause) project carousel/ })).toHaveCount(0);
  await expect(page.locator("footer")).toContainText("© 2026 Shani Shlomov");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("carousel advances automatically and holds the project while its preview is hovered", async ({ page, isMobile }) => {
  test.skip(isMobile, "Touch navigation is covered by the mobile carousel check");
  await page.goto("/");
  const gallery = page.locator("#more-work");
  await gallery.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const active = gallery.locator('[data-position="current"]');
  await expect(active).toContainText("ReDream Labs", { timeout: 6500 });
  await active.locator("[data-project-preview]").hover();
  await page.waitForTimeout(4200);
  await expect(active).toContainText("ReDream Labs");
  await page.mouse.move(0, 0);
  await expect(active).toContainText("Lollipop", { timeout: 6500 });
});

test("character motion respects reduced motion and explicit pause without a second visible poster", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const about = page.locator("#about");
  await about.scrollIntoViewIfNeeded();
  const video = about.locator("video");
  await expect(video).not.toHaveAttribute("src");
  const play = page.getByRole("button", { name: "Play character animation" });
  await play.focus();
  await play.click();
  await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(.1);
  await expect(about.locator("img")).toBeHidden();
  await page.getByRole("button", { name: "Pause character animation" }).click();
  await expect(video).toHaveJSProperty("paused", true);
});
