import { expect, test } from "./fixtures";

const clips = [
  ["we-live-happily-here", "We Live Happily Here", "2aa5f73eca"],
  ["le-frogette", "Le Frogette", "807756928c"],
  ["numi", "NUMI", "338a6d70b4"],
] as const;

test("navigation follows both scroll directions, restores transparency, and View Work finds the work", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const header = page.locator("[data-site-header]");
  await expect(header).toHaveCSS("position", "fixed");
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  for (const y of [1, 450, 1300, 2100, 950, 80]) {
    await page.evaluate(y => window.scrollTo(0, y), y);
    await expect(header).toHaveCSS("background-color", "rgb(0, 0, 0)");
    expect(await header.evaluate(el => el.getBoundingClientRect().top)).toBe(0);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(header).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  await page.getByRole("link", { name: "View Work", exact: true }).click();
  await expect(page).toHaveURL(/#\/#work$/);
  const work = page.locator("#work");
  expect(await work.evaluate(el => el.getBoundingClientRect().top)).toBeGreaterThan(60);
  await expect(work.getByRole("heading", { name: "FEATURED PROJECT" })).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.getByRole("link", { name: /^Play$/ })).toHaveCount(0);
});

test("approved original hero clips retain order, pause position, and keyboard switching", async ({ page, isMobile }) => {
  await page.goto("/");
  const hero = page.locator("#home");
  await expect(hero).toHaveAttribute("data-playback", "playing");
  await expect(hero).toHaveAttribute("data-project", "numi");
  const first = hero.locator('video[src*="338a6d70b4"]');
  await expect.poll(() => first.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.3);
  const pause = page.getByRole("button", { name: "Pause hero videos" });
  if (!isMobile) {
    await page.mouse.move(10, 850);
    await expect(pause).toHaveCSS("opacity", "0");
    await pause.hover();
    await expect(pause).toHaveCSS("opacity", "1");
  }
  await pause.click();
  const time = await first.evaluate((v: HTMLVideoElement) => v.currentTime);
  await expect(hero).toHaveAttribute("data-playback", "paused");
  await page.waitForTimeout(200);
  expect(await first.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeCloseTo(time, 1);
  await page.getByRole("button", { name: "Play hero videos" }).click();
  await expect.poll(() => first.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(time + .1);
  await page.getByRole("button", { name: "Pause hero videos" }).click();
  for (const [project, title] of clips) {
    await page.getByRole("button", { name: `Show ${title}`, exact: false }).click();
    await expect(hero).toHaveAttribute("data-project", project);
    await expect(hero).toHaveAttribute("data-playback", "paused");
    await expect(page.getByRole("button", { name: "Play hero videos" })).toBeVisible();
  }
  await page.keyboard.press("Home");
  await expect(hero).toHaveAttribute("data-project", clips[0][0]);
  await page.keyboard.press("ArrowRight");
  await expect(hero).toHaveAttribute("data-project", clips[1][0]);
  await page.getByRole("button", { name: "Play hero videos" }).click();
  await expect(hero.locator('video[src*="807756928c"]')).toHaveJSProperty("muted", true);
  await expect.poll(() => hero.locator('video[src*="807756928c"]').evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(.1);
  await hero.locator('video[src*="807756928c"]').evaluate((v: HTMLVideoElement) => { v.currentTime = v.duration - .05; });
  await expect(hero).toHaveAttribute("data-project", "numi");
  await expect(hero.locator('video[src*="338a6d70b4"]')).toHaveJSProperty("muted", true);
});

test("carousel projects open directly and project routes preserve their content", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [name, slug, heading] of [["HeadEase", "headease", "HeadEase"], ["ReDream Lab", "redream", "ReDream Labs™"], ["Lollipop", "lollipop", "Lollipop"]]) {
    await page.goto("/");
    await page.getByRole("button", { name: `Go to ${name}`, exact: true }).click();
    const link = page.getByRole("link", { name: `View ${name} project`, exact: true });
    await expect(link).toHaveAttribute("href", `#/${slug}`);
    if (isMobile) await link.tap();
    else { await link.focus(); await page.keyboard.press("Enter"); }
    await expect(page).toHaveURL(new RegExp(`#/${slug}$`));
    await expect(page.locator("main h1")).toHaveText(heading);
    await expect(page.locator("dialog[open]")).toHaveCount(0);
    await page.goBack();
    await expect(page.locator("#more-work")).toBeVisible();
  }
  await page.goto("/numi.html#unity");
  await expect(page).toHaveURL(/#\/numi#unity$/);
  await expect(page.getByRole("heading", { name: "NUMI", exact: true })).toBeVisible();
  const chapters = page.getByRole("navigation", { name: "NUMI sections" });
  await expect(chapters).toHaveCSS("position", "sticky");
  await expect(chapters.getByRole("link", { name: "UX/UI · Unity", exact: true })).toHaveAttribute("aria-current", "location");
  await chapters.getByRole("link", { name: "Level Design", exact: true }).click();
  await expect(chapters.getByRole("link", { name: "Level Design", exact: true })).toHaveAttribute("aria-current", "location");
  await page.reload();
  await expect(page.getByRole("heading", { name: "NUMI", exact: true })).toBeVisible();
  for (const slug of ["we-live-happily-here", "ikko", "le-frogette", "my-bunny", "headease", "about", "resume", "contact"]) {
    await page.goto(`/#/${slug}`);
    await expect(page.locator("main h1")).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
  await page.goto("/#/le-frogette");
  await expect(page.getByRole("link", { name: "Next project: ReDream Labs", exact: true })).toHaveAttribute("href", "#/redream");
  await page.goto("/#/play");
  await expect(page.getByRole("heading", { name: "Page not found" })).toBeVisible();
});

test("mobile menu closes with Escape and navigation", async ({ page, isMobile }) => {
  test.skip(!isMobile, "Mobile menu is only present on narrow screens");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Menu", exact: true });
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeFocused();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await menu.click();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Hi, I’m Shani" })).toBeVisible();
  await expect(menu).toHaveAttribute("aria-expanded", "false");
});
