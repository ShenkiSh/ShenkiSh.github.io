import { expect, test } from "./fixtures";

test("Child registration opens the original home and character choices persist through invitations", async ({ page, isMobile }) => {
  await page.goto("/#/we-live-happily-here");
  const launch = page.locator("#app-prototype").getByRole("button", { name: "Try the App", exact: true });
  await launch.click();
  const app = page.getByRole("dialog", { name: "App Prototype" });
  const child = app.locator('[data-device="child"]');
  const parent = app.locator('[data-device="parent"]');
  if (isMobile) await app.getByRole("button", { name: "הצגת המסך של הילד" }).tap();
  await expect(child.locator('img[src$="registration-invite.png"]')).toBeVisible();
  await child.getByRole("button", { name: "הצטרפות לאפליקציה" }).click();
  await expect(child.getByRole("heading", { name: "שלום דני!" })).toBeFocused();
  await expect(child.getByText("איזו דמות תרצה להיות?", { exact: true })).toBeVisible();
  await expect(child.getByText("בחר ועצב את הדמות שלך", { exact: true })).toBeVisible();
  const canvas = child.locator('[data-screen="home"]');
  const box = (await canvas.boundingBox())!;
  expect(box.width / box.height).toBeCloseTo(412 / 917, 3);
  expect(await canvas.evaluate(el => el.scrollHeight === el.clientHeight && el.scrollWidth === el.clientWidth)).toBe(true);
  const save = child.getByRole("button", { name: "שמירת הדמות" });
  await expect(save).toHaveAttribute("aria-pressed", "false");
  for (const character of ["raccoon", "mushroom", "frog", "bear"]) {
    const next = child.getByRole("button", { name: "הדמות הבאה" });
    if (isMobile) await next.tap(); else { await next.focus(); await page.keyboard.press("Enter"); }
    await expect(child.locator("img[data-character]")).toHaveAttribute("data-character", character);
  }
  await child.getByRole("button", { name: "הדמות הקודמת" }).click();
  await expect(child.locator("img[data-character]")).toHaveAttribute("data-character", "frog");
  for (const [label, color] of [["סגול", "purple"], ["קרם", "cream"], ["חום", "brown"], ["כתום", "orange"], ["ירוק", "green"]]) {
    const swatch = child.getByRole("button", { name: label, exact: true });
    await swatch.click();
    await expect(swatch).toHaveAttribute("aria-pressed", "true");
    await expect(child.locator("img[data-character]")).toHaveAttribute("src", new RegExp(`bear-${color}-source.png$`));
  }
  await child.getByRole("button", { name: "אביזרים", exact: true }).click();
  for (const [label, accessory] of [["סרבל", "overalls"], ["כובע רחב", "hat"], ["שפם", "moustache"], ["חצאית", "skirt"], ["צעיף", "scarf"], ["משקפיים", "glasses"]]) {
    const button = child.getByRole("button", { name: label, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    await expect(child.locator("img[data-accessory]")).toHaveAttribute("data-accessory", accessory);
  }
  await child.getByRole("button", { name: "משקפיים", exact: true }).click();
  await expect(child.locator("img[data-accessory]")).toHaveCount(0);
  await child.getByRole("button", { name: "משקפיים", exact: true }).click();
  await save.click();
  await expect(save).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(child.getByRole("status")).toHaveText("הדמות נשמרה");
  await child.getByRole("button", { name: "בחזרה להזמנת ההצטרפות" }).click();
  await child.getByRole("button", { name: "הצטרפות לאפליקציה" }).click();
  await expect(save).toHaveAttribute("aria-pressed", "true");
  await expect(child.locator("img[data-character]")).toHaveAttribute("data-color", "green");
  await expect(child.locator("img[data-accessory]")).toHaveAttribute("data-accessory", "glasses");
  if (isMobile) await app.getByRole("button", { name: "הצגת המסך של אמא" }).click();
  for (const name of ["יובל", "דני", "משחק חדש", "מרחב אישי", "שלח הזמנה"]) await parent.getByRole("button", { name, exact: true }).click();
  await child.getByRole("button", { name: "יש לך הזמנה למשחק!" }).click();
  await expect(child.getByRole("heading", { name: "המשחק עוד רגע מתחיל!" })).toBeFocused();
  await child.getByRole("button", { name: "בחזרה להזמנה", exact: true }).click();
  await child.getByRole("button", { name: "למסך הבית של הילד" }).click();
  await expect(save).toHaveAttribute("aria-pressed", "true");
  await expect(child.locator("img[data-character]")).toHaveAttribute("data-color", "green");
  await expect(child.locator("img[data-accessory]")).toHaveAttribute("data-accessory", "glasses");
  expect(await child.locator("img").evaluateAll(imgs => imgs.every(img => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0))).toBe(true);
  await app.getByRole("button", { name: "Close app prototype" }).click();
  await launch.click();
  if (isMobile) await app.getByRole("button", { name: "הצגת המסך של הילד" }).click();
  await child.getByRole("button", { name: "הצטרפות לאפליקציה" }).click();
  await expect(save).toHaveAttribute("aria-pressed", "false");
  await expect(child.locator("img[data-character]")).toHaveAttribute("data-color", "orange");
  await expect(child.locator("img[data-accessory]")).toHaveCount(0);
});
