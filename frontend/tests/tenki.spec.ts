import { expect, test } from "./fixtures";

test("chapter links reach visible headings and follow manual scrolling on both layouts", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/tenki");
  const navigation = page.getByRole("navigation", { name: "TENKI sections" });
  const chapters = [
    ["The idea", "artist"], ["App flow", "product-flow"],
    ["Visual design", "translation"], ["Graphic language", "graphic-language"], ["Try it", "prototype"],
  ] as const;
  for (const [label, id] of chapters) {
    const link = navigation.getByRole("link", { name: label, exact: true });
    await link.focus();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(new RegExp(`#/tenki#${id}$`));
    await expect(link).toHaveAttribute("aria-current", "location");
    await expect(navigation.locator('[aria-current="location"]')).toHaveCount(1);
    const section = page.locator(`#${id}`);
    await expect(section).toBeFocused();
    await expect(section.getByRole("heading").first()).toBeInViewport();
    const navBox = (await navigation.boundingBox())!;
    const headerBox = (await page.locator("[data-site-header]").boundingBox())!;
    const sectionBox = (await section.boundingBox())!;
    const headerGap = navBox.y - headerBox.y - headerBox.height;
    expect(headerGap).toBeGreaterThanOrEqual(-1);
    // Research immediately follows the bar; its 24px anchor gap precedes sticking.
    expect(headerGap).toBeLessThan(id === "artist" ? 25 : 2);
    expect(sectionBox.y).toBeGreaterThanOrEqual(navBox.y + navBox.height);
  }
  await page.locator("#product-flow").evaluate(section => section.scrollIntoView());
  const flowLink = navigation.getByRole("link", { name: "App flow", exact: true });
  await expect(flowLink).toHaveAttribute("aria-current", "location");
  await expect.poll(() => flowLink.evaluate(link => {
    const bounds = link.getBoundingClientRect();
    const row = link.parentElement!.getBoundingClientRect();
    return bounds.left >= row.left - 1 && bounds.right <= row.right + 1;
  })).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("direct section links and browser back preserve chapter position", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/ikko#graphic-language");
  const navigation = page.getByRole("navigation", { name: "TENKI sections" });
  await expect(page.locator("#graphic-language")).toBeFocused();
  await expect(navigation.getByRole("link", { name: "Graphic language", exact: true })).toHaveAttribute("aria-current", "location");
  await navigation.getByRole("link", { name: "Try it", exact: true }).click();
  await expect(page.locator("#prototype")).toBeFocused();
  await page.goBack();
  await expect(page.locator("#graphic-language")).toBeFocused();
  await expect(navigation.getByRole("link", { name: "Graphic language", exact: true })).toHaveAttribute("aria-current", "location");
});

test("TENKI and its legacy project link show complete screens and original graphic assets", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/tenki");
  await expect(page).toHaveTitle("TENKI | Shani Shlomov");
  await expect(page.getByRole("heading", { name: "TENKI", exact: true })).toBeVisible();
  await expect(page.getByText(/placeholder|coming soon/i)).toHaveCount(0);
  const flow = page.getByRole("region", { name: "From forecast to outing." });
  const screens = flow.getByRole("img");
  await expect(screens).toHaveCount(5);
  for (const screen of await screens.all()) {
    await screen.scrollIntoViewIfNeeded();
    await expect.poll(() => screen.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    const shape = await screen.evaluate(image => ({ ratio: image.getBoundingClientRect().width / image.getBoundingClientRect().height, fit: getComputedStyle(image).objectFit }));
    expect(shape.ratio).toBeCloseTo(412 / 917, 2);
    expect(shape.fit).toBe("contain");
  }
  await expect(page.getByRole("img", { name: "Custom geometric 25-degree numeral" })).toHaveAttribute("src", /numeral-25.svg$/);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto("/#/ikko");
  await expect(page).toHaveTitle("TENKI | Shani Shlomov");
  await expect(page.getByRole("heading", { name: "TENKI", exact: true })).toBeVisible();
});

test("the map pans with a pointer and keyboard, stays within its artwork and resets", async ({ page, isMobile }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/tenki");
  const map = page.getByRole("region", { name: "Interactive TENKI map" });
  await map.scrollIntoViewIfNeeded();
  await expect.poll(() => map.getByRole("img").evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await map.focus();
  await page.keyboard.press("ArrowRight");
  await expect.poll(() => map.evaluate(element => element.scrollLeft)).toBe(72);
  await page.keyboard.press("Home");
  await expect.poll(() => map.evaluate(element => element.scrollLeft)).toBe(0);
  const box = (await map.boundingBox())!;
  const from = { x: box.x + box.width * .8, y: box.y + box.height * .6 };
  const to = { x: box.x + box.width * .2, y: box.y + box.height * .4 };
  if (isMobile) {
    const touch = await page.context().newCDPSession(page);
    await touch.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [from] });
    await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [to] });
    await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await touch.detach();
  } else {
    await page.mouse.move(from.x, from.y);
    await page.mouse.down();
    await page.mouse.move(to.x, to.y, { steps: 10 });
    await page.mouse.up();
  }
  await expect.poll(() => map.evaluate(element => element.scrollLeft)).toBeGreaterThan(100);
  await expect.poll(() => map.evaluate(element => element.scrollTop)).toBeGreaterThan(50);
  await map.focus();
  for (let i = 0; i < 25; i++) await page.keyboard.press("ArrowRight");
  expect(await map.evaluate(element => element.scrollLeft)).toBe(await map.evaluate(element => element.scrollWidth - element.clientWidth));
  await page.getByRole("button", { name: "Reset map position" }).click();
  await expect.poll(() => map.evaluate(element => [element.scrollLeft, element.scrollTop])).toEqual([0, 0]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test("the silent demo respects reduced motion and can be played and paused explicitly", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/tenki");
  const video = page.getByLabel("TENKI app demonstration");
  await page.getByRole("link", { name: "Explore the app", exact: true }).click();
  await expect(page.locator("#prototype")).toBeFocused();
  await expect(page.locator('header[aria-label="TENKI introduction"] video')).toHaveCount(0);
  await expect(page.locator("article video")).toHaveCount(1);
  await expect(page.locator("#prototype video")).toHaveCount(1);
  await expect(page.locator("#prototype").getByRole("region", { name: "Interactive TENKI map" })).toHaveCount(1);
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", true);
  await page.getByRole("button", { name: "Play TENKI demo" }).click();
  await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(.1);
  await expect(video).toHaveJSProperty("muted", true);
  await page.getByRole("button", { name: "Pause TENKI demo" }).click();
  await expect(video).toHaveJSProperty("paused", true);
  await page.getByRole("heading", { name: "TENKI", exact: true }).scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await video.scrollIntoViewIfNeeded();
  await expect(video).toHaveJSProperty("paused", true);
});

test("the final prototype opens separately and the case study links back to work", async ({ page, context }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await context.route("https://www.figma.com/proto/**", route => route.fulfill({ contentType: "text/html", body: "<title>TENKI prototype link</title>" }));
  await page.goto("/#/tenki");
  const popup = page.waitForEvent("popup");
  await page.getByRole("link", { name: "Try the app", exact: false }).click();
  const prototype = await popup;
  await prototype.waitForLoadState();
  expect(new URL(prototype.url()).searchParams.get("node-id")).toBe("1333-30894");
  await prototype.close();
  await expect(page).toHaveURL(/#\/tenki$/);
  await page.getByRole("link", { name: "Back to Work", exact: true }).click();
  await expect(page).toHaveURL(/#\/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
});

test("an unavailable animation offers the working prototype link", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("**/tenki/app-demo.mp4", route => route.fulfill({ status: 200, contentType: "video/mp4", body: "invalid video" }));
  await page.goto("/#/tenki");
  await page.getByRole("button", { name: "Play TENKI demo" }).click();
  await expect(page.getByRole("status")).toContainText("The demo could not play.");
  await expect(page.getByRole("link", { name: "Try TENKI in Figma" })).toHaveAttribute("href", /figma.com\/proto\/NNjB6Gey6DtLbO1ZzQV51g/);
});

test("original TENKI mockups stay complete and enlarge with keyboard focus restoration", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/tenki");
  await page.evaluate(() => document.fonts.ready);
  for (const [label, title] of [["Enlarge the seasonal app mockup", "TENKI seasonal app"], ["Enlarge TENKI brand applications", "TENKI beyond the screen"]]) {
    const launch = page.getByRole("button", { name: label, exact: true });
    await launch.scrollIntoViewIfNeeded();
    const image = launch.getByRole("img");
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth === 1920)).toBe(true);
    const box = (await image.boundingBox())!;
    expect(box.width / box.height).toBeCloseTo(16 / 9, 2);
    expect(await image.evaluate(el => getComputedStyle(el).objectFit)).toBe("contain");
    await launch.focus();
    const scroll = await page.evaluate(() => scrollY);
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog", { name: title, exact: true });
    await expect(dialog).toBeVisible();
    await expect(dialog.getByRole("button", { name: "Close artwork" })).toBeFocused();
    await expect(dialog.getByRole("button", { name: "Close artwork" })).toBeInViewport();
    await expect.poll(() => dialog.getByRole("img").evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth === 1920)).toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(launch).toBeFocused();
    expect(await page.evaluate(() => scrollY)).toBeCloseTo(scroll, 0);
  }
});

test("consolidated chapters preserve earlier concept and interface deep links", async ({ page }) => {
  for (const anchor of ["concept", "seasons", "final-interface"]) {
    await page.goto(`/#/tenki#${anchor}`);
    const target = page.locator(`#${anchor}`);
    await expect(target).toBeFocused();
    await expect(target.getByRole("heading").first()).toBeInViewport();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  }
});

test("each app screen opens at reading size and closes back to its place in the flow", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#/tenki#product-flow");
  const flow = page.getByRole("list", { name: "The five screens of the TENKI app" });
  const screens = flow.getByRole("button");
  await expect(screens).toHaveCount(5);
  for (const launch of await screens.all()) {
    await launch.scrollIntoViewIfNeeded();
    await launch.focus();
    const source = await launch.getByRole("img").getAttribute("src");
    const scroll = await page.evaluate(() => scrollY);
    const flowScroll = await flow.evaluate(el => el.scrollLeft);
    await page.keyboard.press("Enter");
    const dialog = page.getByRole("dialog");
    const close = dialog.getByRole("button", { name: "Close artwork" });
    await expect(close).toBeFocused();
    const image = dialog.getByRole("img");
    await expect(image).toHaveAttribute("src", source!);
    await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    const imageBox = (await image.boundingBox())!;
    expect(imageBox.width).toBeGreaterThanOrEqual(300);
    expect(imageBox.width / imageBox.height).toBeCloseTo(412 / 917, 2);
    await dialog.evaluate(el => { el.scrollTop = el.scrollHeight; });
    await expect(close).toBeInViewport();
    expect(await close.evaluate(el => {
      const box = el.getBoundingClientRect();
      return el.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
    })).toBe(true);
    await close.click();
    await expect(dialog).toHaveCount(0);
    await expect(launch).toBeFocused();
    expect(await page.evaluate(() => scrollY)).toBeCloseTo(scroll, 0);
    expect(await flow.evaluate(el => el.scrollLeft)).toBeCloseTo(flowScroll, 0);
  }
  await screens.first().scrollIntoViewIfNeeded();
  await screens.first().click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(screens.first()).toBeFocused();
});
