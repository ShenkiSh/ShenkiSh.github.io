import { expect, test } from "./fixtures";

test("HeadEase replaces the placeholder page with complete, sharp original artwork", async ({ page }) => {
  await page.goto("/#/headease");
  await expect(page).toHaveTitle("HeadEase | Shani Shlomov");
  await expect(page.getByRole("heading", { name: "HeadEase", exact: true })).toBeVisible();
  await expect(page.locator("main h1")).toHaveCSS("font-family", "Satoshi, Arial, sans-serif");
  await expect(page.getByText(/placeholder|coming soon/i)).toHaveCount(0);
  for (const img of await page.locator("article img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    const geometry = await img.evaluate(image => {
      const node = image as HTMLImageElement;
      const rect = node.getBoundingClientRect();
      return { width: rect.width, height: rect.height, source: [node.naturalWidth, node.naturalHeight], screen: node.hasAttribute("data-headease-screen") };
    });
    expect(geometry.width).toBeGreaterThan(0);
    expect(geometry.height).toBeGreaterThan(0);
    if (geometry.screen) {
      expect(geometry.source).toEqual([1080, 2400]);
      expect(geometry.width / geometry.height).toBeCloseTo(9 / 20, 3);
    }
  }
  await expect(page.locator("#journey figure")).toHaveCount(8);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("HeadEase chapters support keyboard access, deep links, reload and browser back", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/headease#control");
  await expect(page.locator("#control")).toBeFocused();
  const nav = page.getByRole("navigation", { name: "HeadEase sections" });
  for (const [label, id] of [["Overview", "need"], ["System", "system"], ["Journey", "journey"], ["Dashboard", "dashboard"], ["Control", "control"], ["Safety", "safety"], ["Interface", "final"], ["Prototype", "prototype"]]) {
    const link = nav.getByRole("link", { name: label, exact: true });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`#/headease#${id}$`));
    await expect(link).toHaveAttribute("aria-current", "location");
    const section = page.locator(`#${id}`);
    await expect(section).toBeFocused();
    await expect(section.getByRole("heading").first()).toBeInViewport();
    const navBox = (await nav.boundingBox())!;
    expect((await section.boundingBox())!.y).toBeGreaterThanOrEqual(navBox.y + navBox.height - 1);
  }
  await page.goBack();
  await expect(page.locator("#final")).toBeFocused();
  await page.reload();
  await expect(page.locator("#final")).toBeFocused();
  await page.getByRole("link", { name: "Back to Work", exact: true }).click();
  await expect(page).toHaveURL(/#\/#work$/);
});

test("the carousel enters HeadEase directly, and its prototype and next-project links work", async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/#more-work");
  await page.getByRole("button", { name: "Go to HeadEase", exact: true }).click();
  await page.getByRole("link", { name: "View HeadEase project", exact: true }).click();
  await expect(page).toHaveURL(/#\/headease$/);
  await expect(page.getByRole("heading", { name: "HeadEase", exact: true })).toBeVisible();
  await expect(page.getByRole("dialog")).toHaveCount(0);
  const link = page.getByRole("link", { name: "Open prototype", exact: true }).first();
  const href = (await link.getAttribute("href"))!;
  expect(new URL(href).searchParams.get("node-id")).toBe("1601-543");
  await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  // Exercise the link without making the regression depend on Figma sign-in.
  await context.route("https://www.figma.com/proto/**", route => route.fulfill({ contentType: "text/html", body: "<title>HeadEase prototype</title>" }));
  const popupPromise = page.waitForEvent("popup");
  await link.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(href);
  await popup.close();
  await expect(page).toHaveURL(/#\/headease$/);
  await page.getByRole("link", { name: "Next project: My Bunny", exact: true }).click();
  await expect(page).toHaveURL(/#\/my-bunny$/);
});
