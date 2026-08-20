import { expect, test } from "@playwright/test";

const MAX_JAVASCRIPT_BYTES = 100 * 1024;
const MAX_IMAGE_BYTES = 250 * 1024;
const ALLOWED_HOSTS = new Set(["127.0.0.1", "localhost"]);
const ROUTE_CHUNK_PATH = "/_next/static/chunks/app/";

const articles = [
  {
    slug: "afuera-no-adentro",
    title: "Afuera, no adentro.",
    seoTitle:
      "Afuera, no adentro: mercados tradicionales como oportunidad | Blog Kerokero",
    originalUrl: "https://www.dapan.es/es/articles/afuera-no-adentro/",
  },
] as const;

test("blog is navigable, static, and within the route budget", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  const thirdPartyUrls: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      consoleErrors.push(message.text());
    }
  });

  page.on("request", (request) => {
    const url = new URL(request.url());
    if (!ALLOWED_HOSTS.has(url.hostname)) {
      thirdPartyUrls.push(request.url());
    }
  });

  await page.goto("/blog", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Kerokero explica cómo convertir problemas operativos en software útil.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Próximamente")).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Leer artículo" }),
  ).toHaveAttribute("href", `/blog/${articles[0].slug}`);
  await expect(page.getByRole("link", { name: "Blog" }).first()).toHaveAttribute(
    "aria-current",
    "page",
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
});

test("blog exposes canonical metadata and structured data", async ({
  page,
  request,
}) => {
  await page.goto("/blog", { waitUntil: "networkidle" });

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.kerokero.cl/blog",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Blog sobre software a medida, datos y producto | Kerokero",
  );

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((script) => JSON.parse(script.textContent ?? "{}"));
  expect(jsonLd).toMatchObject({
    "@type": "Blog",
    url: "https://www.kerokero.cl/blog",
    inLanguage: "es-CL",
  });

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  expect(await sitemapResponse.text()).toContain(
    "<loc>https://www.kerokero.cl/blog</loc>",
  );
});

for (const testArticle of articles) {
  test(`blog article ${testArticle.slug} presents the collaboration with crawlable metadata and stays within budgets`, async ({
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

    await page.goto(`/blog/${testArticle.slug}`, {
      waitUntil: "networkidle",
    });

    await expect(
      page.getByRole("heading", { level: 1, name: testArticle.title }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "dapan.es ↗" }),
    ).toHaveAttribute("href", testArticle.originalUrl);
    await expect(
      page.getByRole("link", { name: "Volver al blog" }),
    ).toHaveAttribute("href", "/blog");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://www.kerokero.cl/blog/${testArticle.slug}`,
    );
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      "content",
      testArticle.seoTitle,
    );

    const jsonLd = await page
      .locator('script[type="application/ld+json"]')
      .evaluate((script) => JSON.parse(script.textContent ?? "{}"));
    expect(jsonLd).toMatchObject({
      "@type": "Article",
      url: `https://www.kerokero.cl/blog/${testArticle.slug}`,
      datePublished: "2026-04-04",
      author: expect.arrayContaining([
        expect.objectContaining({ "@type": "Person", name: "Damián Panes" }),
      ]),
    });

    const sitemapResponse = await request.get("/sitemap.xml");
    expect(sitemapResponse.ok()).toBe(true);
    expect(await sitemapResponse.text()).toContain(
      `<loc>https://www.kerokero.cl/blog/${testArticle.slug}</loc>`,
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
