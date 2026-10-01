import { expect, test } from "./fixtures";

test("Happily opens the app directly and keeps keyboard links to both Unity games", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/we-live-happily-here");
  await expect(page.getByRole("heading", { name: "We Live Happily Here", exact: true })).toBeVisible();
  await expect(page).toHaveTitle("We Live Happily Here | Shani Shlomov");
  for (const number of ["01", "02"]) {
    const link = page.getByRole("link", { name: `Unity Game ${number}`, exact: false });
    await link.focus();
    await page.keyboard.press("Enter");
    const slot = page.locator(`#unity-game-${number}`);
    await expect(slot).toBeFocused();
    await expect(slot).toBeInViewport();
    await expect(slot.getByRole("button", { name: `Play Game ${number}` })).toBeVisible();
    await expect(slot.getByRole("link")).toHaveCount(0);
  }
  const heroLaunch = page.locator("article > header").getByRole("button", { name: "Try the App", exact: true });
  await heroLaunch.focus();
  const scrollBefore = await page.evaluate(() => scrollY);
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog", { name: "App Prototype" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "מרחב משחק משפחתי" })).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBeCloseTo(scrollBefore, 0);
  await dialog.getByRole("button", { name: "Close app prototype" }).click();
  await expect(dialog).toHaveCount(0);
  await expect(heroLaunch).toBeFocused();
  expect(await page.evaluate(() => scrollY)).toBeCloseTo(scrollBefore, 0);
  const app = page.locator("#app-prototype");
  await expect(app.getByRole("button", { name: "Try the App" })).toBeVisible();
  await expect(app.getByRole("link", { name: "Original Figma prototype" })).toHaveAttribute("href", /figma\.com\/proto\/NNjB6Gey6DtLbO1ZzQV51g\/Portfolio\?page-id=1457-5110/);
  await expect(app.getByRole("link", { name: "Original Figma prototype" })).toHaveAttribute("target", "_blank");
  expect(await page.locator("#two-users").evaluate(el => Boolean(el.compareDocumentPosition(document.getElementById("try-it")!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  expect(await page.locator("#game-ui").evaluate(el => Boolean(el.compareDocumentPosition(document.getElementById("try-it")!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Happily original artwork loads and chapter navigation keeps its target visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/we-live-happily-here");
  const navigation = page.getByRole("navigation", { name: "We Live Happily Here sections" });
  for (const name of ["The idea", "Family flow", "Game design", "Visual language", "Try it"]) {
    const link = navigation.getByRole("link", { name, exact: true });
    await link.click();
    await expect(link).toHaveAttribute("aria-current", "location");
  }
  for (const img of await page.locator("article img").all()) {
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByRole("navigation", { name: "Project navigation" }).getByRole("link", { name: /TENKI/ }).click();
  await expect(page).toHaveURL(/#\/tenki$/);
});

test("Happily shows the complete original mockup and equally prominent previews for both games", async ({ page, isMobile }) => {
  await page.goto("/#/we-live-happily-here");
  await page.evaluate(() => document.fonts.ready);
  const heroImages = page.locator("article > header img");
  await expect(heroImages).toHaveCount(1);
  for (const img of await heroImages.all()) {
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    const dimensions = await img.evaluate((el: HTMLImageElement) => ({
      rendered: el.clientWidth / el.clientHeight,
      original: el.naturalWidth / el.naturalHeight,
      fit: getComputedStyle(el).objectFit,
    }));
    expect(dimensions.rendered).toBeCloseTo(dimensions.original, 2);
    expect(dimensions.fit).toBe("contain");
  }
  const boxes = [];
  for (const title of ["Personal Space", "Objects"]) {
    const game = page.getByRole("region", { name: title, exact: true });
    await game.scrollIntoViewIfNeeded();
    const preview = game.getByRole("group", { name: `${title} — Gameplay Recording video player` }).locator("video");
    await expect(preview).toBeVisible();
    await expect(preview).toHaveAttribute("poster", /-recording\.jpg$/);
    expect(await preview.evaluate(el => getComputedStyle(el).objectFit)).toBe("contain");
    boxes.push(await preview.evaluate(el => ({
      top: el.getBoundingClientRect().top + scrollY,
      left: el.getBoundingClientRect().left,
      width: el.clientWidth,
      height: el.clientHeight,
    })));
  }
  expect(boxes[0].height).toBeGreaterThan(300);
  expect(boxes[0].height).toBe(boxes[1].height);
  expect(boxes[0].width).toBeCloseTo(boxes[1].width, 0);
  if (isMobile) {
    expect(boxes[1].top).toBeGreaterThan(boxes[0].top + boxes[0].height);
  } else {
    expect(boxes[1].top).toBeCloseTo(boxes[0].top, 0);
    expect(boxes[1].left).toBeGreaterThan(boxes[0].left + boxes[0].width);
    await page.setViewportSize({ width: 768, height: 1024 });
    const tablet = await page.locator("#try-it video").evaluateAll(videos => videos.map(video => {
      const box = video.getBoundingClientRect();
      return { top: box.top, height: box.height };
    }));
    expect(tablet).toHaveLength(2);
    expect(tablet[0].top).toBeCloseTo(tablet[1].top, 0);
    expect(tablet[0].height).toBeCloseTo(tablet[1].height, 0);
  }
});

for (const variant of ["character"]) test(`Happily ${variant} GIFs respect reduced motion, keyboard pause and leaving the viewport`, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/we-live-happily-here");
  const characters = page.locator("[data-animations]").filter({ has: page.getByRole("button", { name: new RegExp(`${variant} animations$`) }) });
  const play = page.getByRole("button", { name: `Play ${variant} animations` });
  await play.scrollIntoViewIfNeeded();
  await expect(characters).toHaveAttribute("data-animations", "paused");
  await expect(characters.getByAltText("Animated raccoon family avatar")).toHaveAttribute("src", /raccoon\.png$/);
  await play.focus();
  await page.keyboard.press("Enter");
  await expect(characters).toHaveAttribute("data-animations", "playing");
  await expect(characters.getByAltText("Animated raccoon family avatar")).toHaveAttribute("src", /raccoon\.gif$/);
  await page.getByRole("button", { name: `Pause ${variant} animations` }).click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await play.scrollIntoViewIfNeeded();
  await expect(characters).toHaveAttribute("data-animations", "paused");
  await play.click();
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(characters).toHaveAttribute("data-animations", "paused");
});

test("Happily family flow keeps complete screens and aligned captions", async ({ page, isMobile }) => {
  await page.goto("/#/we-live-happily-here");
  await page.getByRole("navigation", { name: "We Live Happily Here sections" }).getByRole("link", { name: "Family flow", exact: true }).click();
  const examples = page.locator("#how-it-works figure");
  await expect(examples).toHaveCount(4);
  const positions = [];
  for (const example of await examples.all()) {
    await example.scrollIntoViewIfNeeded();
    await expect.poll(() => example.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    const bounds = await example.evaluate(el => {
      const image = el.querySelector("img")!;
      const media = image.parentElement!.getBoundingClientRect();
      const art = image.getBoundingClientRect();
      const caption = el.querySelector("figcaption")!.getBoundingClientRect();
      return { top: art.top + scrollY, caption: caption.top + scrollY, gap: caption.top - art.bottom,
        overflow: art.bottom - media.bottom, fit: getComputedStyle(image).objectFit };
    });
    expect(bounds.gap).toBeGreaterThanOrEqual(15);
    expect(bounds.overflow).toBeLessThanOrEqual(1);
    expect(bounds.fit).toBe("contain");
    positions.push(bounds);
  }
  for (const position of positions.slice(1)) {
    if (isMobile) expect(position.top).toBeGreaterThan(positions[0].caption);
    else {
      expect(position.top).toBeCloseTo(positions[0].top, 0);
      expect(position.caption).toBeCloseTo(positions[0].caption, 0);
    }
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("Happily cooperation keeps current game captures complete, equal-sized and separate from captions", async ({ page, isMobile }) => {
  await page.goto("/#/we-live-happily-here");
  const link = page.getByRole("link", { name: "Game design", exact: true });
  await link.focus();
  await page.keyboard.press("Enter");
  const captures = page.locator("#cooperation figure");
  await expect(captures).toHaveCount(2);
  const positions = [];
  for (const capture of await captures.all()) {
    await capture.scrollIntoViewIfNeeded();
    await expect.poll(() => capture.locator("img").evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
    const bounds = await capture.evaluate(el => {
      const img = el.querySelector("img")!;
      const image = img.getBoundingClientRect();
      const caption = el.querySelector("figcaption")!.getBoundingClientRect();
      const figure = el.getBoundingClientRect();
      return { width: image.width, height: image.height, top: image.top + scrollY,
        captionTop: caption.top + scrollY, bottom: figure.bottom + scrollY,
        gap: caption.top - image.bottom, overflow: caption.bottom - figure.bottom,
        originalRatio: img.naturalWidth / img.naturalHeight, fit: getComputedStyle(img).objectFit };
    });
    expect(bounds.width / bounds.height).toBeCloseTo(bounds.originalRatio, 2);
    expect(bounds.height).toBeLessThanOrEqual(561);
    expect(bounds.fit).toBe("contain");
    expect(bounds.gap).toBeGreaterThanOrEqual(15);
    expect(bounds.overflow).toBeLessThanOrEqual(1);
    positions.push(bounds);
  }
  expect(positions[1].height).toBeCloseTo(positions[0].height, 0);
  expect(positions[1].width).toBeCloseTo(positions[0].width, 0);
  if (isMobile) expect(positions[1].top).toBeGreaterThan(positions[0].bottom);
  else {
    expect(positions[1].top).toBeCloseTo(positions[0].top, 0);
    expect(positions[1].captionTop).toBeCloseTo(positions[0].captionTop, 0);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});


test("Happily visual language captions share a baseline on desktop", async ({ page, isMobile }) => {
  test.skip(isMobile, "Visual stories stack on phones");
  await page.goto("/#/we-live-happily-here");
  await page.getByRole("link", { name: "Visual language", exact: true }).click();
  const titles = page.locator("#game-ui h3");
  await expect(titles).toHaveCount(2);
  const tops = await titles.evaluateAll(elements => elements.map(el => el.getBoundingClientRect().top));
  expect(tops[0]).toBeCloseTo(tops[1], 0);
});
