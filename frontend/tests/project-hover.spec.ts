import { expect, test } from "./fixtures";

test("project hover enlarges only the frame, plays available silent previews, and resets on leave", async ({ page, isMobile }) => {
  test.skip(isMobile, "Touch devices use the static poster and normal project link");
  await page.goto("/");
  const frames = page.locator("#work [data-project-preview]");
  await expect(frames).toHaveCount(5);
  const clips = ["numi-reel", "happily-hover-20260916", "tenki-hover-clean", "hover-preview", "my-bunny-hover-1"];
  for (let index = 0; index < 5; index++) {
    const frame = frames.nth(index);
    await frame.scrollIntoViewIfNeeded();
    await page.mouse.move(0, 0);
    const original = await frame.boundingBox();
    const sectionHeight = await page.locator("#work").evaluate(node => node.clientHeight);
    const video = frame.locator("video");
    await expect(video).not.toHaveAttribute("src");
    await frame.hover();
    await expect(video).toHaveAttribute("src", new RegExp(`/${clips[index]}\\.mp4$`));
    if (index > 0) await expect(frame.locator("..").locator("h3")).toHaveCSS("text-decoration-line", "none");
    await expect.poll(() => frame.evaluate(node => node.getBoundingClientRect().width)).toBeGreaterThan((original?.width ?? 0) * 1.02);
    await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(.1);
    await expect(video).toHaveJSProperty("muted", true);
    await expect(video).toHaveCSS("opacity", "1");
    expect(await page.locator("#work").evaluate(node => node.clientHeight)).toBe(sectionHeight);
    await page.mouse.move(0, 0);
    await expect(video).toHaveJSProperty("paused", true);
    await expect(video).toHaveJSProperty("currentTime", 0);
    await expect(video).toHaveCSS("opacity", "0");
    await expect(frame).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  }
  const numi = page.getByRole("link", { name: "View NUMI project", exact: true });
  await numi.focus();
  await expect.poll(() => numi.locator("video").evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(.1);
  await page.keyboard.press("Tab");
  await expect(numi.locator("video")).toHaveJSProperty("paused", true);
  await page.locator('#work a[href="#/ikko"]').click();
  await expect(page).toHaveURL(/#\/ikko$/);
});

test("carousel previews keep captions and controls usable while enlarging", async ({ page, isMobile }) => {
  test.skip(isMobile, "Hover is only enabled for a fine pointer");
  await page.goto("/");
  const gallery = page.locator("#more-work");
  const frame = gallery.locator('[data-position="current"] [data-project-preview]');
  for (const [title, clip] of [["HeadEase", "headease-hover-clean"], ["ReDream Labs", "redream-hover"], ["Lollipop", "lollipop-hover-20260916"]]) {
    await gallery.getByRole("button", { name: `Go to ${title}` }).click();
    await frame.hover();
    const video = frame.locator("video");
    await expect(video).toHaveAttribute("src", new RegExp(`/${clip}\\.mp4$`));
    await expect.poll(() => video.evaluate((node: HTMLVideoElement) => node.currentTime)).toBeGreaterThan(.1);
    await expect(video).toHaveJSProperty("muted", true);
    await expect(video).toHaveCSS("opacity", "1");
    await expect(gallery.locator('[data-position="current"] h3')).toHaveText(title);
    await expect(frame).toHaveCSS("transform", "matrix(1.025, 0, 0, 1.025, 0, 0)");
    await page.mouse.move(0, 0);
    await expect(video).toHaveJSProperty("paused", true);
    await expect(video).toHaveJSProperty("currentTime", 0);
    await expect(video).toHaveCSS("opacity", "0");
  }
});

test("touch and reduced motion retain the poster and normal navigation", async ({ page, isMobile }) => {
  if (!isMobile) await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const link = page.locator('#work a[href="#/my-bunny"]');
  await link.scrollIntoViewIfNeeded();
  if (!isMobile) await link.hover();
  await expect(link.locator("video")).not.toHaveAttribute("src");
  await expect(link.locator("[data-project-preview]")).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
  await link.click();
  await expect(page).toHaveURL(/#\/my-bunny$/);
});
