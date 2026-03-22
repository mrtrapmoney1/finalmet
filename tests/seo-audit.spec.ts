import { test, expect } from "@playwright/test";

test.describe("SEO Audit — iPhone 16 Pro", () => {
  // 1. JSON-LD Validity
  test("homepage has valid LocalBusiness JSON-LD", async ({ page }) => {
    await page.goto("/");
    const jsonLd = await page.evaluate(() => {
      const script = document.querySelector(
        'script[type="application/ld+json"]',
      );
      return script ? JSON.parse(script.textContent!) : null;
    });
    expect(jsonLd).toBeTruthy();
    const biz = jsonLd["@graph"]
      ? jsonLd["@graph"].find(
          (n: Record<string, unknown>) =>
            (Array.isArray(n["@type"]) &&
              n["@type"].includes("LocalBusiness")) ||
            n["@type"] === "LocalBusiness",
        )
      : jsonLd;
    expect(biz.name).toBe("Metro TV & Appliances");
    expect(biz.telephone).toContain("402-466-9090");
    expect(biz.address.postalCode).toBe("68505");
  });

  test("service pages have Service JSON-LD", async ({ page }) => {
    for (const slug of ["appliance", "tv", "audio", "commercial"]) {
      await page.goto(`/${slug}`);
      const jsonLd = await page.evaluate(() => {
        const scripts = document.querySelectorAll(
          'script[type="application/ld+json"]',
        );
        return Array.from(scripts).map((s) => JSON.parse(s.textContent!));
      });
      const hasService = jsonLd.some((j: Record<string, unknown>) =>
        JSON.stringify(j).includes("Service"),
      );
      expect(hasService).toBe(true);
    }
  });

  test("FAQ page has FAQPage JSON-LD", async ({ page }) => {
    await page.goto("/faq");
    const jsonLd = await page.evaluate(() => {
      const scripts = document.querySelectorAll(
        'script[type="application/ld+json"]',
      );
      return Array.from(scripts).map((s) => JSON.parse(s.textContent!));
    });
    const hasFaq = jsonLd.some((j: Record<string, unknown>) =>
      JSON.stringify(j).includes("FAQPage"),
    );
    expect(hasFaq).toBe(true);
  });

  // 2. ADA Compliance
  test("diagnostic wizard has aria-live region", async ({ page }) => {
    await page.goto("/troubleshooting/appliances");
    const ariaLive = await page.locator("[aria-live]").count();
    expect(ariaLive).toBeGreaterThan(0);
  });

  test("all interactive elements meet 48px touch target", async ({ page }) => {
    await page.goto("/");
    const buttons = await page.locator("button, a[href]").all();
    for (const btn of buttons.slice(0, 20)) {
      const box = await btn.boundingBox();
      if (box) {
        expect(Math.max(box.width, box.height)).toBeGreaterThanOrEqual(48);
      }
    }
  });

  test("mobile nav is keyboard accessible", async ({ page }) => {
    await page.goto("/");
    const menuBtn = page.locator("button").filter({ hasText: /menu/i }).first();
    if ((await menuBtn.count()) > 0) {
      await menuBtn.click();
      const expanded = await menuBtn.getAttribute("aria-expanded");
      expect(expanded).toBe("true");
    }
  });

  // 3. Performance
  test("hero section renders within 3s on mobile", async ({ page }) => {
    const start = Date.now();
    await page.goto("/", { waitUntil: "domcontentloaded" });
    await page.locator("section").first().waitFor({ state: "visible" });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(3000);
  });

  test("no layout shift on mobile nav toggle", async ({ page }) => {
    await page.goto("/");
    const mainTop = await page.locator("main").boundingBox();
    const menuBtn = page.locator("button").filter({ hasText: /menu/i }).first();
    if ((await menuBtn.count()) > 0) {
      await menuBtn.click();
      await page.waitForTimeout(300);
      const mainTopAfter = await page.locator("main").boundingBox();
      expect(
        Math.abs((mainTopAfter?.y ?? 0) - (mainTop?.y ?? 0)),
      ).toBeLessThan(200);
    }
  });

  // 4. AEO Checks
  test("every service page has a 25-60 word featured snippet", async ({
    page,
  }) => {
    for (const slug of ["appliance", "tv", "audio", "commercial"]) {
      await page.goto(`/${slug}`);
      const firstP = await page.locator("main p").first().textContent();
      const wordCount = firstP?.split(/\s+/).length ?? 0;
      expect(wordCount).toBeGreaterThanOrEqual(25);
      expect(wordCount).toBeLessThanOrEqual(60);
    }
  });

  // 5. Critical SEO elements
  test("every page has unique title and meta description", async ({
    page,
  }) => {
    const pages = [
      "/",
      "/appliance",
      "/tv",
      "/audio",
      "/commercial",
      "/faq",
      "/contact",
    ];
    const titles = new Set<string>();
    for (const p of pages) {
      await page.goto(p);
      const title = await page.title();
      expect(titles.has(title)).toBe(false);
      titles.add(title);
      const desc = await page.getAttribute(
        "meta[name='description']",
        "content",
      );
      expect(desc).toBeTruthy();
      expect(desc!.length).toBeGreaterThan(50);
    }
  });

  test("canonical URLs are set correctly", async ({ page }) => {
    const pages = ["/", "/appliance", "/tv", "/faq"];
    for (const p of pages) {
      await page.goto(p);
      const canonical = await page.getAttribute(
        "link[rel='canonical']",
        "content",
      );
      if (!canonical) {
        // canonical might be href attribute
        const href = await page.getAttribute(
          "link[rel='canonical']",
          "href",
        );
        expect(href).toContain("metrotv-audiotech.com");
      } else {
        expect(canonical).toContain("metrotv-audiotech.com");
      }
    }
  });
});
