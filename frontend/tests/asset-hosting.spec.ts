import { expect, test } from "./fixtures";

test("large recordings use the configured media host while previews and Unity stay on the site", async ({ page }) => {
  await page.goto("/#/le-frogette");
  const urls = await page.evaluate(async () => {
    const modulePath = "/src/shared/utils/asset.ts";
    const { asset } = await import(modulePath) as { asset: (path: string) => string };
    return [
      asset("assets/hop/full-game.mp4"),
      asset("/assets/redream/full-experience-hd.mp4"),
      asset("assets/hop/gameplay-preview.mp4"),
      asset("games/hop/index.html"),
    ];
  });
  const mediaBase = process.env.VITE_MEDIA_BASE_URL?.trim().replace(/\/+$/, "");
  expect(urls).toEqual([
    `${mediaBase ? `${mediaBase}/` : "/"}assets/hop/full-game.mp4`,
    `${mediaBase ? `${mediaBase}/` : "/"}assets/redream/full-experience-hd.mp4`,
    "/assets/hop/gameplay-preview.mp4",
    "/games/hop/index.html",
  ]);
});
