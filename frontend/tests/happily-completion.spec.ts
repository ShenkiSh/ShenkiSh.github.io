import { expect, test } from "./fixtures";

test("Finishing either Unity game delivers the original parent notification and updates only the invited players", async ({ page, isMobile }) => {
  await page.route("**/games/happily/*/build.json", route => route.fulfill({ json: {
    loader: "Build/completion.loader.js", data: "Build/completion.data", framework: "Build/completion.framework.js", code: "Build/completion.wasm", version: "test",
  } }));
  await page.route("**/games/happily/*/Build/completion.loader.js", route => route.fulfill({
    contentType: "application/javascript", body: "window.createUnityInstance = async () => ({ Quit: async () => {}, SendMessage: () => {} });",
  }));
  await page.goto("/#/we-live-happily-here");
  const launch = page.locator("#app-prototype").getByRole("button", { name: "Try the App", exact: true });
  await launch.click();
  const app = page.getByRole("dialog", { name: "App Prototype" });
  const parent = app.locator('[data-device="parent"]');
  const child = app.locator('[data-device="child"]');
  const showParent = async () => { if (isMobile) await app.getByRole("button", { name: "הצגת המסך של אמא" }).click(); };

  for (const [index, [conflict, slug, title]] of [
    ["מרחב אישי", "personal-space", "Personal Space"], ["חפצים", "objects", "Objects"],
  ].entries()) {
    for (const name of ["יובל", "דני"]) await parent.getByRole("button", { name, exact: true }).click();
    await parent.getByRole("button", { name: "משחק חדש", exact: true }).click();
    await parent.getByRole("button", { name: conflict, exact: true }).click();
    await parent.getByRole("button", { name: "שלח הזמנה", exact: true }).click();
    await child.getByRole("button", { name: "יש לך הזמנה למשחק!", exact: true }).click();
    await child.getByRole("button", { name: "אני מוכן!", exact: true }).click();
    const game = page.getByRole("dialog", { name: `Play ${title}`, exact: true });
    const frame = page.frameLocator(`iframe[title="Play ${title} in Unity"]`);
    await expect(frame.locator("body")).toHaveAttribute("data-state", "ready");

    // Closing partway through is not a completed game; it returns to the same lobby.
    await frame.locator("canvas").press("Escape");
    await expect(game).toHaveCount(0);
    await showParent();
    await expect(parent.locator('[data-player="dani"]')).toContainText(`${index} משחקים היום`);
    await expect(parent.locator('[data-screen="completion"]')).toHaveCount(0);
    if (isMobile) await app.getByRole("button", { name: "הצגת המסך של הילד" }).click();
    await child.getByRole("button", { name: "אני מוכן!", exact: true }).click();
    await expect(frame.locator("body")).toHaveAttribute("data-state", "ready");

    // A different sender, different origin or wrong game cannot complete this invitation.
    await page.evaluate(gameSlug => window.postMessage({ type: "family-complete", game: gameSlug }, location.origin), slug);
    await frame.locator("canvas").evaluate(() => window.parent.postMessage({ type: "family-complete", game: "wrong-game" }, location.origin));
    await page.locator(`iframe[title="Play ${title} in Unity"]`).evaluate((element, gameSlug) => {
      if (element instanceof HTMLIFrameElement) window.dispatchEvent(new MessageEvent("message", {
        data: { type: "family-complete", game: gameSlug }, source: element.contentWindow, origin: "https://unrelated.example",
      }));
    }, slug);
    await expect(game).toBeVisible();

    // This is the exact message emitted by the Unity final-summary Finish button.
    // Repeated delivery must count the finished invitation once.
    await frame.locator("canvas").evaluate((_, gameSlug) => {
      window.parent.postMessage({ type: "family-complete", game: gameSlug }, location.origin);
      window.parent.postMessage({ type: "family-complete", game: gameSlug }, location.origin);
    }, slug);
    await expect(game).toHaveCount(0);
    await expect(parent.getByRole("heading", { name: "המשחק הסתיים", exact: true })).toBeFocused();
    await expect(parent.locator('img[src$="parent-completion.png"]')).toBeVisible();
    await expect(child.locator('[data-screen="home"]')).toHaveCount(1);
    await expect(child.getByText(`${1 + index} משחקים היום`, { exact: true })).toHaveCount(1);
    await expect(page.locator("body")).toHaveCSS("overflow", "hidden");
    const notice = parent.getByRole("button", { name: "המשחק הסתיים — כניסה לאפליקציה", exact: true });
    if (isMobile) await notice.tap(); else { await notice.focus(); await page.keyboard.press("Enter"); }
    await expect(parent.locator('[data-player="yuval"]')).toContainText(`${4 + index} משחקים היום`);
    await expect(parent.locator('[data-player="dani"]')).toContainText(`${1 + index} משחקים היום`);
    await expect(parent.locator('[data-player="dad"]')).toContainText("1 משחקים היום");
    await expect(parent.locator('[data-player="tohar"]')).toContainText("2 משחקים היום");
    await expect(parent.getByRole("button", { name: "משחק חדש", exact: true })).toBeDisabled();
    await parent.getByRole("button", { name: "סטטוס", exact: true }).click();
    await expect(parent.getByText("סיכום הבית", { exact: true })).toBeVisible();
    expect(await parent.locator('[data-screen="activity"]').evaluate(el => el.scrollHeight === el.clientHeight && el.scrollWidth === el.clientWidth)).toBe(true);
    await expect(parent.getByText(String(7 + index), { exact: true })).toBeVisible();
    await parent.getByRole("button", { name: "דני", exact: true }).click();
    await expect(parent.getByText("סיכום שחקן", { exact: true })).toBeVisible();
    await expect(parent.getByText(`${1 + index} משחקים היום`, { exact: true })).toBeVisible();
    await parent.getByRole("button", { name: "בחזרה לסיכום הבית", exact: true }).click();
    await parent.getByRole("button", { name: /קלפי השבוע/ }).click();
    await expect(parent.getByRole("region", { name: "קלף השבוע" })).toBeVisible();
    expect(await parent.locator('[data-screen="activity"]').evaluate(el => el.scrollHeight === el.clientHeight && el.scrollWidth === el.clientWidth)).toBe(true);
    if (index === 0) {
      await parent.getByRole("button", { name: "שלח לשחקנים", exact: true }).click();
      await child.getByRole("button", { name: "פתיחת קלף השבוע", exact: true }).click();
      await child.getByRole("button", { name: "סגירת קלף השבוע וחזרה הביתה", exact: true }).click();
      await showParent();
    }
    await expect(parent.getByRole("button", { name: "שלח לשחקנים", exact: true })).toHaveAttribute("aria-pressed", "true");
    await expect(parent.getByRole("button", { name: "שלח לשחקנים", exact: true })).toBeDisabled();
    await parent.getByRole("button", { name: "סגירת קלף השבוע", exact: true }).click();
    await parent.getByRole("button", { name: "בחזרה למשפחה", exact: true }).click();
    await expect(parent.locator('[data-player="dani"]')).toContainText(`${1 + index} משחקים היום`);
  }
  await app.getByRole("button", { name: "Close app prototype" }).click();
  await expect(launch).toBeFocused();
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
  await launch.click();
  await expect(parent.locator('[data-player="dani"]')).toContainText("0 משחקים היום");
  await expect(child.locator('[data-screen="registration-invite"]')).toHaveCount(1);
});
