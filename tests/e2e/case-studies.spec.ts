import { expect, test } from "@playwright/test";

const MAX_JAVASCRIPT_BYTES = 100 * 1024;
const MAX_IMAGE_BYTES = 250 * 1024;
const ALLOWED_HOSTS = new Set(["127.0.0.1", "localhost"]);
const ROUTE_CHUNK_PATH = "/_next/static/chunks/app/";

const cases = [
  {
    slug: "segui",
    headline:
      "Sistema de seguimiento automatizado post-alta veterinaria: de Excel a decisiones basadas en datos",
    seoTitle:
      "Caso Segui: Sistema de Seguimiento Veterinario Automatizado | Kerokero",
    nextCaseCta: "Ver el caso Rodar",
    nextCaseHref: "/case-studies/rodar",
  },
  {
    slug: "rodar",
    headline: "De una patente a una decisión de millones.",
    seoTitle: "Caso Rodar: datos para comprar y valorizar vehículos | Kerokero",
    nextCaseCta: "Ver el caso Segui",
    nextCaseHref: "/case-studies/segui",
  },
] as const;

for (const testCase of cases) {
  test(`case study ${testCase.slug} presents the story with crawlable metadata and stays within budgets`, async ({
    page,
    request,
  }) => {
    const consoleErrors: string[] = [];
    const thirdPartyUrls: string[] = [];
    const oversizedImages: string[] = [];

    page.on("console", (message) => {
      if (message.type() === "error") {
        consoleErrors.push(message.text());
      }
    });

    page.on("request", (requestEvent) => {
      const url = new URL(requestEvent.url());
      if (!ALLOWED_HOSTS.has(url.hostname)) {
        thirdPartyUrls.push(requestEvent.url());
      }
    });

    page.on("response", async (response) => {
      const requestEvent = response.request();
      const contentLength = Number(response.headers()["content-length"] ?? 0);

      if (requestEvent.resourceType() === "image") {
        const imageBytes = contentLength || (await response.body()).byteLength;
        if (imageBytes > MAX_IMAGE_BYTES) {
          oversizedImages.push(`${requestEvent.url()} (${imageBytes} bytes)`);
        }
      }
    });

    await page.goto(`/case-studies/${testCase.slug}`, {
      waitUntil: "networkidle",
    });

    await expect(
      page.getByRole("heading", { level: 1, name: testCase.headline }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: testCase.nextCaseCta }),
    ).toHaveAttribute("href", testCase.nextCaseHref);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.kerokero.cl/case-studies/${testCase.slug}`,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      testCase.seoTitle,
    );

    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .evaluate((script) => JSON.parse(script.textContent ?? "{}"));
    expect(jsonLd).toMatchObject({
      "@type": "Article",
      url: `https://www.kerokero.cl/case-studies/${testCase.slug}`,
    });

    const sitemapResponse = await request.get("/sitemap.xml");
    expect(sitemapResponse.ok()).toBe(true);
    expect(await sitemapResponse.text()).toContain(
      `<loc>https://www.kerokero.cl/case-studies/${testCase.slug}</loc>`,
    );

    const javascriptBytes = await page.evaluate((routeChunkPath) =>
      performance
        .getEntriesByType("resource")
        .map((entry) => entry as PerformanceResourceTiming)
        .filter(
          (entry) =>
            entry.initiatorType === "script" &&
            new URL(entry.name).pathname.includes(routeChunkPath),
        )
        .reduce((total, entry) => total + (entry.transferSize ?? 0), 0),
      ROUTE_CHUNK_PATH,
    );

    expect(consoleErrors).toEqual([]);
    expect(thirdPartyUrls).toEqual([]);
    expect(javascriptBytes).toBeLessThan(MAX_JAVASCRIPT_BYTES);
    expect(oversizedImages).toEqual([]);
  });
}
