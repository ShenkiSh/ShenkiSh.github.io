import { expect, test } from "./fixtures";

test("Each family member has their original report and cooperation meter, including arrow navigation", async ({ page }) => {
  await page.goto("/#/we-live-happily-here");
  await page.locator("#app-prototype").getByRole("button", { name: "Try the App", exact: true }).click();
  const parent = page.locator('[data-device="parent"]');
  await parent.getByRole("button", { name: "סטטוס", exact: true }).click();
  const report = parent.getByRole("region", { name: "סיכום שחקן", exact: true });
  for (const [name, id, friction, frequent, helpful, connection, meter] of [
    ["אמא", "mom", "דני, משחק חפצים", "הוגנות - 2 פעמים היום", "משחק חפצים", "הכי זורם עם: טוהר, משחק תחרות", 93],
    ["יובל", "yuval", "אבא, משחק פגיעה", "תחרות - 3 פעמים היום", "משחק מרחב אישי", "הכי זורם עם: דני, משחק חפצים", 53],
    ["אבא", "dad", "יובל, משחק פגיעה", "חפצים - 1 פעמים היום", "משחק תחרות", "הכי זורם עם: אמא, משחק הוגנות", 35],
    ["טוהר", "tohar", "יובל, משחק מרחב אישי", "מרחב אישי - 2 פעמים היום", "משחק הוגנות", "הכי זורם עם: אמא, משחק תחרות", 82],
    ["דני", "dani", "אמא, משחק חפצים", "הוגנות - 1 פעמים היום", "משחק חפצים", "הכי זורם עם: יובל, משחק חפצים", 74],
  ] as const) {
    await parent.getByRole("button", { name, exact: true }).click();
    await expect(report).toHaveAttribute("data-player", id);
    for (const text of [friction, frequent, helpful, connection]) await expect(report.getByText(text, { exact: true })).toBeVisible();
    await expect(report.getByRole("meter")).toHaveAttribute("aria-valuenow", String(meter));
    const fill = await report.getByRole("meter").evaluate(el => el.firstElementChild!.getBoundingClientRect().width / el.getBoundingClientRect().width * 100);
    expect(Math.abs(fill - meter)).toBeLessThan(.5);
    await parent.getByRole("button", { name: "בחזרה לסיכום הבית", exact: true }).click();
  }
  await parent.getByRole("button", { name: "אמא", exact: true }).click();
  await parent.getByRole("button", { name: "השחקן הבא", exact: true }).click();
  await expect(report).toHaveAttribute("data-player", "yuval");
  await expect(report).toContainText("אבא, משחק פגיעה");
  await parent.getByRole("button", { name: "השחקן הקודם", exact: true }).click();
  await parent.getByRole("button", { name: "השחקן הקודם", exact: true }).click();
  await expect(report).toHaveAttribute("data-player", "dani");
  await expect(report).toContainText("אמא, משחק חפצים");
});

test("Mother chooses the original award team, keeps that choice and sends only to the selected recipients", async ({ page, isMobile }) => {
  await page.goto("/#/we-live-happily-here");
  await page.locator("#app-prototype").getByRole("button", { name: "Try the App", exact: true }).click();
  const app = page.getByRole("dialog", { name: "App Prototype" });
  const parent = app.locator('[data-device="parent"]');
  const child = app.locator('[data-device="child"]');
  await parent.getByRole("button", { name: "סטטוס", exact: true }).click();
  const trigger = parent.getByRole("button", { name: /קלפי השבוע/ });
  await trigger.click();
  const card = parent.getByRole("region", { name: "קלף השבוע", exact: true });
  const next = card.getByRole("button", { name: "הצוות הבא", exact: true });
  const previous = card.getByRole("button", { name: "הצוות הקודם", exact: true });
  const send = card.getByRole("button", { name: "שלח לשחקנים", exact: true });
  await expect(previous).toBeFocused();
  await expect(card).toHaveAttribute("data-team", "dani-yuval");
  if (isMobile) await next.tap(); else { await next.focus(); await page.keyboard.press("Enter"); }
  await expect(card).toHaveAttribute("data-team", "tohar-mom");
  await expect(card.getByRole("img")).toHaveAttribute("src", /weekly-tohar-mom.png$/);
  await expect(card.getByRole("group", { name: "בחירת צוות אחים" })).toContainText("טוהר ואמא");
  await expect(send).toBeEnabled();
  await expect(child.locator('[data-screen="award-notification"]')).toHaveCount(0);
  await card.getByRole("button", { name: "סגירת קלף השבוע", exact: true }).click();
  await expect(trigger).toBeFocused();
  await parent.getByRole("button", { name: "בחזרה למשפחה", exact: true }).click();
  await parent.getByRole("button", { name: "סטטוס", exact: true }).click();
  await trigger.click();
  await expect(card).toHaveAttribute("data-team", "tohar-mom");
  await send.click();
  await expect(send).toBeDisabled();
  await expect(card.getByRole("status")).toHaveText("קלף השבוע נשלח לצוות טוהר ואמא");
  await expect(child.locator('[data-screen="registration-invite"]')).toHaveCount(1);
  await expect(child.locator('[data-screen="award-notification"]')).toHaveCount(0);
  await expect(parent).toBeVisible();
  await previous.click();
  await expect(card).toHaveAttribute("data-team", "dani-yuval");
  await expect(send).toBeEnabled();
  await send.click();
  await expect(child.locator('[data-screen="award-notification"]')).toBeVisible();
  await child.getByRole("button", { name: "פתיחת קלף השבוע", exact: true }).click();
  await expect(child.getByRole("region", { name: "תעודת הצטיינות" })).toContainText("דני ויובל");
  if (isMobile) await app.getByRole("button", { name: "הצגת המסך של אמא" }).click();
  await next.click();
  await expect(send).toBeDisabled();
  await expect(child.getByRole("region", { name: "תעודת הצטיינות", includeHidden: true })).toContainText("דני ויובל");
});
