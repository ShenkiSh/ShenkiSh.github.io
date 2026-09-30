import { expect, test } from "./fixtures";

test("the updated frog project opens from Work with complete current artwork", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const card = page.locator('#work a[href="#/le-frogette"]');
  await expect(card).toContainText("Hop! It’s the Chef!");
  const poster = card.locator("img");
  await poster.scrollIntoViewIfNeeded();
  await expect(poster).toHaveAttribute("src", /\/hop\/gameplay-poster\.webp$/);
  await expect.poll(() => poster.evaluate((node: HTMLImageElement) => node.naturalWidth)).toBe(1920);
  await expect(card.locator("video")).not.toHaveAttribute("src");
  if (isMobile) await card.tap();
  else { await card.focus(); await page.keyboard.press("Enter"); }
  await expect(page.locator("main h1")).toHaveText("Hop! It’s the Chef!");
  await expect(page).toHaveTitle("Hop! It’s the Chef! | Shani Shlomov");
  const article = page.locator("[data-hop-case]");
  await expect(article).not.toContainText("2D to 3D");
  await expect(article.locator("video")).toHaveCount(2);
  await expect(page.getByRole("button", { name: "Play the game", exact: true })).toBeVisible();
  for (const image of await article.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node: HTMLImageElement) => node.complete && node.naturalWidth > 0)).toBe(true);
    await expect(image).toHaveCSS("object-fit", "contain");
    await expect(image).not.toHaveAttribute("alt", "");
  }
  await expect(page.locator("#watch")).toContainText("Full playthrough · 12:19");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  const next = page.getByRole("link", { name: "Next project: ReDream Labs", exact: true });
  await next.click();
  await expect(page).toHaveURL(/#\/redream$/);
  await expect(page.locator("main h1")).toHaveText("ReDream Labs™");
});

test("frog chapter navigation supports keyboard, deep links and return to Work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/le-frogette.html#unity");
  await expect(page).toHaveURL(/#\/le-frogette#unity$/);
  await expect(page.getByRole("heading", { name: "Built in Unity", exact: true })).toBeInViewport();
  const chapters = page.getByRole("navigation", { name: "Hop! It’s the Chef! sections" });
  await expect(chapters).toHaveCSS("position", "sticky");
  const art = chapters.getByRole("link", { name: "Art & iteration", exact: true });
  await art.focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#\/le-frogette#art$/);
  await expect(art).toHaveAttribute("aria-current", "location");
  await expect(page.locator("#art")).toBeFocused();
  await page.reload();
  await expect(page.getByRole("heading", { name: "From Original Illustration to Game-Ready Art", exact: true })).toBeInViewport();
  const headingTop = await page.locator("#art-heading").evaluate(node => node.getBoundingClientRect().top);
  const navigationBottom = await chapters.evaluate(node => node.getBoundingClientRect().bottom);
  expect(headingTop).toBeGreaterThan(navigationBottom);
  await chapters.getByRole("link", { name: "Watch gameplay", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Watch Gameplay", exact: true })).toBeInViewport();
  await page.getByRole("link", { name: "Back to Work", exact: false }).click();
  await expect(page).toHaveURL(/#\/#work$/);
  await expect(page.getByRole("heading", { name: "FEATURED PROJECT" })).toBeInViewport();
});
