import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { expect, test } from "./fixtures";

test("Resume shows the supplied CV with the portfolio typography and no unfinished content", async ({ page, isMobile }) => {
  await page.goto("/resume.html");
  await expect(page).toHaveURL(/#\/resume$/);
  await expect(page).toHaveTitle("Resume | Shani Shlomov");
  await expect(page.getByRole("heading", { name: "Resume", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Experience", exact: true })).toBeVisible();
  await expect(page.getByText("Volunteer Product & UX/UI Designer", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Education", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Skills", exact: true })).toBeVisible();
  await expect(page.getByText(/placeholder|not been supplied|to be supplied|wireframe/i)).toHaveCount(0);
  await expect(page.locator("main article").first()).toHaveCSS("font-family", /Satoshi/);
  await expect(page.getByRole("link", { name: "shanishlomov@gmail.com", exact: true })).toHaveAttribute("href", "mailto:shanishlomov@gmail.com");
  if (isMobile) await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Resume", exact: true })).toHaveAttribute("aria-current", "page");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Download PDF saves the actual complete resume and Open PDF opens that same document", async ({ page }) => {
  await page.goto("/#/resume");
  const downloadLink = page.getByRole("link", { name: "Download PDF", exact: true });
  await downloadLink.focus();
  const downloadEvent = page.waitForEvent("download");
  await page.keyboard.press("Enter");
  const download = await downloadEvent;
  expect(download.suggestedFilename()).toBe("ResumeSHANI.pdf");
  expect(await download.failure()).toBeNull();
  const downloaded = await readFile(await download.path());
  const original = await readFile(new URL("../public/assets/resume/ResumeSHANI.pdf", import.meta.url));
  expect(downloaded.subarray(0, 5).toString()).toBe("%PDF-");
  expect(createHash("sha256").update(downloaded).digest("hex")).toBe(createHash("sha256").update(original).digest("hex"));
  await expect(page).toHaveURL(/#\/resume$/);

  const openLink = page.getByRole("link", { name: "Open PDF", exact: true });
  await expect(openLink).toHaveAttribute("href", await downloadLink.getAttribute("href") ?? "");
  await expect(openLink).toHaveAttribute("target", "_blank");
  const response = await page.request.get((await openLink.getAttribute("href"))!);
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
  expect(await response.body()).toEqual(original);
});

test("Resume case-study links open the projects and returning restores the resume", async ({ page }) => {
  await page.goto("/#/resume");
  await page.getByRole("link", { name: "View NUMI case study", exact: true }).click();
  await expect(page).toHaveURL(/#\/numi$/);
  await expect(page.getByRole("heading", { name: "NUMI", exact: true })).toBeVisible();
  await page.goBack();
  await page.getByRole("link", { name: "View We Live Happily Here case study", exact: true }).click();
  await expect(page).toHaveURL(/#\/we-live-happily-here$/);
  await expect(page.getByRole("heading", { name: "We Live Happily Here", exact: true })).toBeVisible();
});
