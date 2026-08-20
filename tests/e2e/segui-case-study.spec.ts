import { expect, test } from "@playwright/test";

const MAX_JAVASCRIPT_BYTES = 100 * 1024;
const MAX_IMAGE_BYTES = 250 * 1024;
const ALLOWED_HOSTS = new Set(["127.0.0.1", "localhost"]);
const ROUTE_CHUNK_PATH = "/_next/static/chunks/app/";

test("Segui case study presents technical story with crawlable metadata and stays within budgets", async ({
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

  await page.goto("/case-studies/segui", {
    waitUntil: "networkidle",
  });

  // Verify main title
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Sistema de seguimiento automatizado post-alta veterinaria/,
    }),
  ).toBeVisible();

  // Verify key sections
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "El problema no era tecnológico",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "El modelo de datos como contrato operativo",
    }),
  ).toBeVisible();

  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "El motor de eventos: de manual a automático",
    }),
  ).toBeVisible();

  // Verify navigation links
  await expect(
    page.getByRole("link", { name: "Ver servicios" }),
  ).toHaveAttribute("href", "/#servicios");

  await expect(
    page.getByRole("link", { name: "Ver el caso Rodar" }),
  ).toHaveAttribute("href", "/case-studies/rodar");

  // Verify SEO metadata
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.kerokero.cl/case-studies/segui",
  );

  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    /Caso Segui: Sistema de Seguimiento/,
  );

  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article",
  );

  // Verify JSON-LD
  const jsonLdScripts = await page.locator('script[type="application/ld+json"]').all();
  const articleJsonLd = await jsonLdScripts[0].evaluate((script) =>
    JSON.parse(script.textContent ?? "{}")
  );
  
  expect(articleJsonLd).toMatchObject({
    "@type": "Article",
    url: "https://www.kerokero.cl/case-studies/segui",
  });

  // Verify sitemap includes Segui
  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  expect(await sitemapResponse.text()).toContain(
    "<loc>https://www.kerokero.cl/case-studies/segui</loc>",
  );

  // Verify performance budgets
  const javascriptBytes = await page.evaluate(
    (routeChunkPath) =>
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
