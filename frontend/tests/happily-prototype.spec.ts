import { expect, test } from "./fixtures";

test("Happily app matches the original family and keeps selected colors across navigation", async ({ page, isMobile }) => {
  await page.goto("/#/we-live-happily-here");
  const launch = page.locator("#app-prototype").getByRole("button", { name: "Try the App", exact: true });
  await launch.focus(); await page.keyboard.press("Enter");
  const app = page.getByRole("dialog", { name: "App Prototype" });
  await expect(app.getByRole("heading", { name: "מרחב משחק משפחתי" })).toBeFocused();
  await expect(app.getByRole("heading", { name: "בחירת משתמשים" })).toBeVisible();
  for (const name of ["אמא", "אבא", "יובל", "טוהר", "דני"]) await expect(app.getByRole("button", { name, exact: true })).toBeVisible();
  await expect(app.getByText("Interactive demo", { exact: false })).toHaveCount(0);
  await expect(app.getByText("מנהלת המשחק")).toHaveCount(0);
  await expect(app.getByRole("button", { name: "Restart", exact: true })).toHaveCount(0);
  const next = app.getByRole("button", { name: "משחק חדש", exact: true });
  await expect(next).toBeDisabled();
  await expect(next).toHaveCSS("background-color", "rgb(131, 197, 255)");
  const yuval = app.getByRole("button", { name: "יובל", exact: true });
  const normal = "rgb(201, 230, 255)";
  await expect(yuval).toHaveCSS("background-color", normal);
  if (isMobile) await yuval.tap(); else { await yuval.focus(); await page.keyboard.press("Space"); }
  await page.mouse.move(0, 0);
  await expect(yuval).toHaveAttribute("aria-pressed", "true");
  await expect(yuval).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await yuval.click(); await expect(yuval).toHaveCSS("background-color", normal);
  await yuval.click(); await app.getByRole("button", { name: "דני", exact: true }).click();
  await expect(next).toBeEnabled(); await expect(next).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await app.getByRole("button", { name: "טוהר", exact: true }).click();
  await expect(app.getByRole("status")).toContainText("אפשר לבחור שני משתמשים");
  await expect(app.getByRole("button", { name: "טוהר", exact: true })).toHaveAttribute("aria-pressed", "false");
  await next.click();
  const send = app.getByRole("button", { name: "שלח הזמנה", exact: true });
  await expect(send).toBeDisabled();
  const objects = app.getByRole("button", { name: "חפצים", exact: true });
  await objects.click(); await page.mouse.move(0, 0);
  await expect(objects).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await expect(send).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await app.getByRole("button", { name: "בחזרה למשפחה", exact: true }).click();
  await expect(yuval).toHaveAttribute("aria-pressed", "true"); await next.click();
  await expect(objects).toHaveAttribute("aria-pressed", "true");
  const fairness = app.getByRole("button", { name: "הוגנות", exact: true });
  await fairness.click(); await expect(objects).toHaveCSS("background-color", normal);
  await expect(fairness).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await fairness.click(); await expect(send).toBeDisabled();
});

test("Happily app scales the complete original canvas without an internal scrollbar", async ({ page }) => {
  await page.goto("/#/we-live-happily-here");
  await page.locator("#app-prototype").getByRole("button", { name: "Try the App", exact: true }).click();
  const app = page.getByRole("dialog", { name: "App Prototype" });
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }, { width: 320, height: 568 }, { width: 844, height: 390 }]) {
    await page.setViewportSize(viewport);
    const canvas = app.locator('[data-screen="family"]');
    await expect.poll(async () => (await canvas.boundingBox())!.height).toBeLessThanOrEqual(viewport.height - 63);
    const box = (await canvas.boundingBox())!;
    expect(box.width / box.height).toBeCloseTo(412 / 917, 3);
    expect(box.x).toBeGreaterThanOrEqual(15); expect(box.y).toBeGreaterThanOrEqual(47);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width - 15);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.height - 15);
    expect(await canvas.evaluate(el => el.scrollHeight === el.clientHeight && el.scrollWidth === el.clientWidth)).toBe(true);
    const child = app.locator('[data-device="child"]');
    if (viewport.width > 700) {
      const childCanvas = (await child.locator('[data-screen="registration-invite"]').boundingBox())!;
      expect(childCanvas.y).toBeCloseTo(box.y, 0);
      expect(childCanvas.height).toBeCloseTo(box.height, 0);
      expect(childCanvas.x).toBeGreaterThan(box.x + box.width);
      expect(childCanvas.x + childCanvas.width).toBeLessThanOrEqual(viewport.width - 15);
    } else {
      await expect(child).toBeHidden();
      await expect(app.getByRole("button", { name: "הצגת המסך של הילד" })).toBeVisible();
    }
    for (const label of ["סטטוס", "שחקן חדש"]) {
      const button = (await app.getByRole("button", { name: label, exact: true }).boundingBox())!;
      expect(button.y + button.height).toBeLessThan(box.y + box.height);
    }
  }
});

test("Happily parent and child stay independent and a replacement invitation cancels the previous launch", async ({ page, isMobile }) => {
  await page.goto("/#/we-live-happily-here");
  const launch = page.locator("#app-prototype").getByRole("button", { name: "Try the App", exact: true });
  await launch.click();
  const app = page.getByRole("dialog", { name: "App Prototype" });
  const parent = app.locator('[data-device="parent"]');
  const child = app.locator('[data-device="child"]');
  const showParent = async () => { if (isMobile) await app.getByRole("button", { name: "הצגת המסך של אמא" }).click(); };
  const showChild = async () => { if (isMobile) await app.getByRole("button", { name: "הצגת המסך של הילד" }).click(); };
  await expect(child.locator('[data-screen="registration-invite"]')).toHaveCount(1);
  await expect(child.getByRole("button", { name: "יש לך הזמנה למשחק!" })).toHaveCount(0);
  if (isMobile) {
    await showChild();
    await expect(child.getByRole("heading", { name: "יש לך הזמנה מאמא" })).toBeFocused();
    await expect(parent).toBeHidden();
    await showParent();
  }
  for (const name of ["יובל", "דני"]) await parent.getByRole("button", { name, exact: true }).click();
  await parent.getByRole("button", { name: "משחק חדש", exact: true }).click();
  await parent.getByRole("button", { name: "מרחב אישי", exact: true }).click();
  await parent.getByRole("button", { name: "שלח הזמנה", exact: true }).click();
  await expect(child.getByRole("button", { name: "יש לך הזמנה למשחק!" })).toBeVisible();
  await expect(parent.locator('[data-screen="family"]')).toHaveCount(1);
  await child.getByRole("button", { name: "יש לך הזמנה למשחק!" }).click();
  await expect(child.getByText("משחק: שומרים על הגלגלים", { exact: true })).toBeVisible();

  // A parent can navigate and select another pair without changing the sent invitation.
  await showParent();
  await parent.getByRole("button", { name: "סטטוס", exact: true }).click();
  await expect(parent.getByText("סיכום הבית", { exact: true })).toBeVisible();
  await expect(child.locator('[data-screen="lobby"]')).toHaveCount(1);
  await parent.getByRole("button", { name: "בחזרה למשפחה", exact: true }).click();
  await parent.getByRole("button", { name: "דני", exact: true }).click();
  await parent.getByRole("button", { name: "טוהר", exact: true }).click();
  await parent.getByRole("button", { name: "משחק חדש", exact: true }).click();
  await parent.getByRole("button", { name: "חפצים", exact: true }).click();
  await showChild();
  await expect(child.locator('[aria-label="דני: עדיין לא מוכן"]')).toBeVisible();
  await expect(child.locator('[aria-label="טוהר: עדיין לא מוכן"]')).toHaveCount(0);

  await page.clock.install();
  await page.clock.pauseAt(new Date());
  await child.getByRole("button", { name: "אני מוכן!", exact: true }).click();
  await showParent();
  await parent.getByRole("button", { name: "שלח הזמנה", exact: true }).click();
  await page.clock.runFor(1500);
  await expect(page.locator('iframe[src*="games/happily"]')).toHaveCount(0);
  await expect(child.getByRole("heading", { name: "יש לך הזמנה למשחק!" })).toBeFocused();
  await child.getByRole("button", { name: "יש לך הזמנה למשחק!" }).click();
  await expect(child.getByText("משחק: קופצים ואוספים", { exact: true })).toBeVisible();
  await expect(child.locator('[aria-label="טוהר: עדיין לא מוכן"]')).toBeVisible();
  await expect(child.getByRole("button", { name: "אני מוכן!", exact: true })).toHaveAttribute("aria-pressed", "false");

  await app.getByRole("button", { name: "Close app prototype" }).click();
  await launch.click();
  await expect(child.locator('[data-screen="registration-invite"]')).toHaveCount(1);
  await expect(parent.getByRole("button", { name: "משחק חדש", exact: true })).toBeDisabled();
});

test("Happily notification opens the original lobby and readiness launches the matching Unity game", async ({ page, isMobile }) => {
  const requests: string[] = [];
  await page.route("**/games/happily/*/build.json", route => {
    requests.push(route.request().url());
    return route.fulfill({ json: { loader: "Build/lobby.loader.js", data: "Build/lobby.data", framework: "Build/lobby.framework.js", code: "Build/lobby.wasm", version: "test" } });
  });
  await page.route("**/games/happily/*/Build/lobby.loader.js", route => route.fulfill({ contentType: "application/javascript", body: "window.createUnityInstance = async () => ({ Quit: async () => {}, SendMessage: () => {} });" }));
  await page.goto("/#/we-live-happily-here");
  for (const [conflict, slug, title, description] of [
    ["מרחב אישי", "personal-space", "Personal Space", "משחק: שומרים על הגלגלים"],
    ["חפצים", "objects", "Objects", "משחק: קופצים ואוספים"],
  ]) {
    const launch = page.locator("#app-prototype").getByRole("button", { name: "Try the App", exact: true });
    await launch.click();
    const app = page.getByRole("dialog", { name: "App Prototype" });
    for (const name of ["יובל", "דני"]) await app.getByRole("button", { name, exact: true }).click();
    await app.getByRole("button", { name: "משחק חדש", exact: true }).click();
    await app.getByRole("button", { name: conflict, exact: true }).click();
    await app.getByRole("button", { name: "שלח הזמנה", exact: true }).click();
    await expect(app.getByRole("heading", { name: "יש לך הזמנה למשחק!" })).toBeFocused();
    await app.getByRole("button", { name: "יש לך הזמנה למשחק!", exact: true }).click();
    await expect(app.getByRole("heading", { name: "המשחק עוד רגע מתחיל!" })).toBeFocused();
    await expect(app.getByText(description, { exact: true })).toBeVisible();
    const lobby = app.locator('[data-screen="lobby"]');
    await expect(lobby.locator('img[src$="-background.png"]')).toHaveAttribute("src", new RegExp(`${slug === "objects" ? "objects" : "space"}-background.png$`));
    await expect(app.locator('[aria-label="יובל: מוכן"]')).toHaveAttribute("data-ready", "true");
    await expect(app.locator('[aria-label="דני: עדיין לא מוכן"]')).toHaveAttribute("data-ready", "false");
    await expect(app.getByText("יובל מחכה לך...")).toBeVisible();
    expect(requests).toHaveLength(title === "Personal Space" ? 0 : 1);
    const box = (await lobby.boundingBox())!;
    expect(box.width / box.height).toBeCloseTo(412 / 917, 3);
    expect(await lobby.evaluate(el => el.scrollHeight === el.clientHeight && el.scrollWidth === el.clientWidth)).toBe(true);
    const ready = app.getByRole("button", { name: "אני מוכן!", exact: true });
    if (isMobile) await ready.tap(); else { await ready.focus(); await page.keyboard.press("Enter"); }
    await expect(ready).toHaveAttribute("aria-pressed", "true");
    await expect(app.locator('[aria-label="דני: מוכן"]')).toHaveAttribute("data-ready", "true");
    const gameDialog = page.getByRole("dialog", { name: `Play ${title}`, exact: true });
    await expect(gameDialog).toBeVisible();
    const game = page.frameLocator(`iframe[title="Play ${title} in Unity"]`);
    await expect(game.locator("body")).toHaveAttribute("data-state", "ready");
    expect(requests.at(-1)).toContain(`/happily/${slug}/build.json`);
    await game.locator("canvas").press("Escape");
    await expect(gameDialog).toHaveCount(0);
    await expect(app).toBeVisible();
    await expect(ready).toBeFocused();
    await expect(ready).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    await app.getByRole("button", { name: "Close app prototype" }).click();
    await expect(launch).toBeFocused();
    await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  }
});

test("Happily lobby preserves invited names and cancels a pending game when navigating back", async ({ page }) => {
  await page.goto("/#/we-live-happily-here");
  await page.locator("#app-prototype").getByRole("button", { name: "Try the App", exact: true }).click();
  const app = page.getByRole("dialog", { name: "App Prototype" });
  for (const name of ["טוהר", "יובל"]) await app.getByRole("button", { name, exact: true }).click();
  await app.getByRole("button", { name: "משחק חדש", exact: true }).click();
  await app.getByRole("button", { name: "מרחב אישי", exact: true }).click();
  await app.getByRole("button", { name: "שלח הזמנה", exact: true }).click();
  await app.getByRole("button", { name: "יש לך הזמנה למשחק!", exact: true }).click();
  await expect(app.locator('[aria-label="טוהר: מוכן"]')).toBeVisible();
  await expect(app.locator('[aria-label="יובל: עדיין לא מוכן"]')).toBeVisible();
  // Freeze the readiness delay so cancellation does not depend on machine speed.
  await page.clock.install();
  await page.clock.pauseAt(new Date());
  await app.getByRole("button", { name: "אני מוכן!", exact: true }).click();
  await app.getByRole("button", { name: "בחזרה להזמנה", exact: true }).click();
  await page.clock.runFor(1500);
  await expect(app.getByRole("heading", { name: "יש לך הזמנה למשחק!" })).toBeFocused();
  await expect(page.locator('iframe[src*="games/happily"]')).toHaveCount(0);
  await app.getByRole("button", { name: "יש לך הזמנה למשחק!", exact: true }).click();
  const ready = app.getByRole("button", { name: "אני מוכן!", exact: true });
  await expect(ready).toHaveAttribute("aria-pressed", "false");
  await ready.click();
  await app.getByRole("button", { name: "Close app prototype" }).click();
  await page.clock.runFor(1500);
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(page.locator('iframe[src*="games/happily"]')).toHaveCount(0);
});

test("Happily original status, registration and accessible close work", async ({ page, isMobile }) => {
  await page.goto("/#/we-live-happily-here");
  const launch = page.locator("#app-prototype").getByRole("button", { name: "Try the App", exact: true });
  await launch.click(); const scrollBefore = await page.evaluate(() => scrollY);
  const app = page.getByRole("dialog", { name: "App Prototype" });
  await app.getByRole("button", { name: "סטטוס", exact: true }).click();
  await expect(app.getByText("סיכום הבית", { exact: true })).toBeVisible();
  await app.getByRole("button", { name: "השבוע", exact: true }).click();
  await expect(app.getByRole("button", { name: "השבוע", exact: true })).toHaveCSS("background-color", "rgb(255, 255, 255)");
  await app.getByRole("button", { name: "טוהר", exact: true }).click();
  await expect(app.getByText("סיכום שחקן", { exact: true })).toBeVisible();
  await expect(app.getByText("מד שיתוף פעולה", { exact: true })).toBeVisible();
  await app.getByRole("button", { name: "בחזרה למשפחה", exact: true }).click();
  await app.getByRole("button", { name: "שחקן חדש", exact: true }).click();
  const save = app.getByRole("button", { name: "שמירת השחקן", exact: true });
  await expect(save).toBeDisabled();
  await app.getByLabel("שם השחקן").fill("נועה"); await expect(save).toBeDisabled();
  await app.getByLabel("מספר טלפון", { exact: true }).fill("0500000000"); await expect(save).toBeEnabled();
  await save.click(); await expect(app.getByRole("button", { name: "נועה", exact: true })).toBeVisible();
  await app.getByRole("button", { name: "נועה", exact: true }).click();
  await expect(app.getByLabel("שם השחקן")).toHaveValue("נועה");
  if (isMobile) await app.getByRole("button", { name: "Close app prototype" }).tap(); else await page.keyboard.press("Escape");
  await expect(app).toHaveCount(0); await expect(launch).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBeCloseTo(scrollBefore, 0);
  await launch.click(); await expect(page.getByRole("dialog").getByRole("button", { name: "משחק חדש", exact: true })).toBeDisabled();
});
