import { expect, test } from "@playwright/test";

const MAX_JAVASCRIPT_BYTES = 100 * 1024;
const MAX_IMAGE_BYTES = 250 * 1024;
const ALLOWED_HOSTS = new Set(["127.0.0.1", "localhost"]);
const ROUTE_CHUNK_PATH = "/_next/static/chunks/app/";

test("about presents the team with crawlable metadata and stays within budgets", async ({
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

  await page.goto("/sobre-nosotros", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "En Kerokero, quienes entienden tu operación construyen el sistema.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { name: "Damián Panes" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Felipe Figueroa" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Sobre Nosotros", exact: true }),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.kerokero.cl/sobre-nosotros",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Sobre nosotros | Kerokero",
  );

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((script) => JSON.parse(script.textContent ?? "{}"));
  expect(jsonLd).toMatchObject({
    "@type": "AboutPage",
    url: "https://www.kerokero.cl/sobre-nosotros",
  });

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  expect(await sitemapResponse.text()).toContain(
    "<loc>https://www.kerokero.cl/sobre-nosotros</loc>",
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
