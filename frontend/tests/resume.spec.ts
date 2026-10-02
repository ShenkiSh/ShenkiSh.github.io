import { readFile } from "node:fs/promises";
import { expect, test } from "./fixtures";

const pdfPath = "/assets/resume/ResumeSHANI.pdf";

test("Resume is a secondary PDF action beside View Work and the navigation has three items", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const hero = page.locator("#home");
  const resume = hero.getByRole("link", { name: "Resume", exact: true });
  const work = hero.getByRole("link", { name: "View Work", exact: true });
  await expect(resume).toBeVisible();
  await expect(resume).toHaveText("Resume");
  await expect(resume).toHaveAttribute("href", pdfPath);
  await expect(resume).toHaveAttribute("target", "_blank");
  await expect(resume).not.toHaveCSS("box-shadow", "none");
  await expect(work).not.toHaveCSS("box-shadow", "none");
  const [workBox, resumeBox] = await Promise.all([work.boundingBox(), resume.boundingBox()]);
  expect(Math.abs(workBox!.y - resumeBox!.y)).toBeLessThan(2);
  expect(resumeBox!.x).toBeGreaterThan(workBox!.x + workBox!.width);
  if (isMobile) await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link")).toHaveText(["Work", "About", "Contact"]);
  await expect(page.locator('a[href*="#/resume"]')).toHaveCount(0);
  if (isMobile) await page.getByRole("button", { name: "Close", exact: true }).click();
  await work.click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Home and About open the same supplied PDF in a new tab without duplicating the CV", async ({ page, context }) => {
  const original = await readFile(new URL("../public/assets/resume/ResumeSHANI.pdf", import.meta.url));
  const response = await page.request.get(pdfPath);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect(await response.body()).toEqual(original);
  // Exercise the anchor's tab behavior independently of headless Chromium's PDF download mode.
  // The real PDF response above is checked byte-for-byte; native PDF viewing is checked in Chrome.
  await context.route(`**${pdfPath}`, route => route.fulfill({ contentType: "text/html", body: "<title>Resume PDF destination</title>" }));
  for (const [path, name] of [["/", "Resume"], ["/#/about", "View Resume"]]) {
    await page.goto(path);
    const link = page.locator("main").getByRole("link", { name, exact: true });
    await expect(link).toHaveText(name);
    await expect(link).toHaveAttribute("href", pdfPath);
    await expect(link).toHaveAttribute("target", "_blank");
    const pageUrl = page.url();
    await link.focus();
    const popupEvent = page.waitForEvent("popup");
    await page.keyboard.press("Enter");
    const popup = await popupEvent;
    await expect(popup).toHaveURL(new RegExp(`${pdfPath}$`));
    await expect(page).toHaveURL(pageUrl);
    await popup.close();
    await expect(page.getByRole("heading", { name: "Experience", exact: true })).toHaveCount(0);
    await expect(page.locator('nav a[href*="resume"]')).toHaveCount(0);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("old Resume bookmarks go directly to the PDF and Contact keeps its existing link working", async ({ page, context }) => {
  await context.route(`**${pdfPath}`, route => route.fulfill({ contentType: "text/html", body: "<title>Resume PDF destination</title>" }));
  for (const path of ["/#/resume", "/resume.html"]) {
    await page.goto(path);
    await expect(page).toHaveURL(new RegExp(`${pdfPath}$`));
  }
  await page.goto("/");
  await page.locator("#home").waitFor();
  await page.evaluate(() => { window.location.hash = "/resume"; });
  await expect(page).toHaveURL(new RegExp(`${pdfPath}$`));
  await page.goto("/#/contact");
  const link = page.locator("#contact-resume a");
  await expect(link).toContainText("View Resume");
  await expect(link).toHaveAttribute("href", pdfPath);
  await expect(link).toHaveAttribute("target", "_blank");
});

test("the hero keeps its primary and secondary actions together on tablet", async ({ page, isMobile }) => {
  test.skip(isMobile, "This check sets a tablet viewport explicitly");
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto("/");
  const actions = page.locator("#home").getByRole("link");
  await expect(actions).toHaveCount(2);
  const [work, resume] = await Promise.all([actions.nth(0).boundingBox(), actions.nth(1).boundingBox()]);
  expect(Math.abs(work!.y - resume!.y)).toBeLessThan(2);
  expect(resume!.x + resume!.width).toBeLessThan(768);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
