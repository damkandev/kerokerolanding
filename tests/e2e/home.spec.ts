import { expect, test } from "@playwright/test";

const MAX_JAVASCRIPT_BYTES = 100 * 1024;
const MAX_IMAGE_BYTES = 250 * 1024;
const ALLOWED_HOSTS = new Set(["127.0.0.1", "localhost"]);
const ROUTE_CHUNK_PATH = "/_next/static/chunks/app/";

type MethodologyMotionFrame = {
  cardHeight: number;
  cardWidth: number;
  cardX: number;
  cardY: number;
  flowOpacity: number;
  mainPathDashOffset: number;
  revealOpacity: number;
};

test("home has no console errors, uncontrolled third parties, or budget overages", async ({
  page,
}) => {
  const consoleErrors: string[] = [];
  const thirdPartyUrls: string[] = [];
  const oversizedImages: string[] = [];

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

  page.on("response", async (response) => {
    const request = response.request();
    const resourceType = request.resourceType();
    const contentLength = Number(response.headers()["content-length"] ?? 0);

    if (resourceType === "image") {
      const imageBytes = contentLength || (await response.body()).byteLength;
      if (imageBytes > MAX_IMAGE_BYTES) {
        oversizedImages.push(`${request.url()} (${imageBytes} bytes)`);
      }
    }
  });

  await page.goto("/", { waitUntil: "networkidle" });

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Construimos software a medida que tu competencia no puede comprar.",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { level: 2, name: "Decisiones que generan ventaja" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "De datos a decisiones",
    }),
  ).toBeVisible();
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

test("home exposes canonical crawl and sharing metadata", async ({ page, request }) => {
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.kerokero.cl",
  );
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
    "content",
    "Software a medida para mejores decisiones | Kerokero",
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /^https:\/\/www\.kerokero\.cl\/opengraph-image/,
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image",
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "href",
    "/figma/star.svg",
  );
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute(
    "type",
    "image/svg+xml",
  );

  const faviconResponse = await request.get("/figma/star.svg");
  expect(faviconResponse.ok()).toBe(true);
  const favicon = await faviconResponse.text();
  expect(favicon).toContain("prefers-color-scheme: dark");
  expect(favicon).toContain("#355133");
  expect(favicon).toContain("#b8ffba");

  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .evaluate((script) => JSON.parse(script.textContent ?? "{}"));
  expect(jsonLd).toMatchObject({
    "@type": "Organization",
    name: "Kerokero",
    url: "https://www.kerokero.cl",
  });

  const robotsResponse = await request.get("/robots.txt");
  expect(robotsResponse.ok()).toBe(true);
  expect(await robotsResponse.text()).toContain(
    "Sitemap: https://www.kerokero.cl/sitemap.xml",
  );

  const sitemapResponse = await request.get("/sitemap.xml");
  expect(sitemapResponse.ok()).toBe(true);
  const sitemap = await sitemapResponse.text();
  expect(sitemap).toContain("<loc>https://www.kerokero.cl</loc>");
  expect(sitemap).toContain(
    "<loc>https://www.kerokero.cl/sobre-nosotros</loc>",
  );
  expect(sitemap).toContain("<loc>https://www.kerokero.cl/blog</loc>");

  const apexResponse = await request.get("/", {
    headers: { host: "kerokero.cl" },
    maxRedirects: 0,
  });
  expect(apexResponse.status()).toBe(308);
  expect(apexResponse.headers().location).toBe("https://www.kerokero.cl");
});

test("contact offers email form and Cal.com scheduling", async ({ page }) => {
  let contactRequests = 0;
  await page.route("**/api/contact", async (route) => {
    contactRequests += 1;
    expect(route.request().postDataJSON()).toMatchObject({
      name: "Ada Lovelace",
      email: "ada@example.com",
      company: "Analytical Engines",
    });
    await route.fulfill({ status: 200, json: { ok: true } });
  });

  await page.goto("/");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(page.getByText("Cuéntanos cómo te llamas.")).toBeVisible();
  await expect(page.getByText("Ingresa tu email.")).toBeVisible();
  await expect(
    page.getByText("Cuéntanos qué decisión quieres mejorar."),
  ).toBeVisible();
  await expect(page.getByLabel("Nombre")).toBeFocused();
  expect(contactRequests).toBe(0);

  await page.getByLabel("Nombre").fill("Ada Lovelace");
  await page.getByLabel("Email").fill("ada@example.com");
  await page.getByLabel("Empresa").fill("Analytical Engines");
  await page
    .getByLabel("¿Qué decisión quieres mejorar?")
    .fill("Queremos anticipar la demanda con mejores señales.");
  await page.getByRole("button", { name: "Enviar mensaje" }).click();
  await expect(page.getByText("Mensaje enviado. Te responderemos pronto.")).toBeVisible();
  expect(contactRequests).toBe(1);

  await expect(page.getByRole("link", { name: "Agendar reunión" })).toHaveAttribute(
    "href",
    "https://cal.com/damian-panes-rtpp9v/30min",
  );
});

test("methodology animations start cleanly and stay continuous on hover", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");

  const card = page.locator('[data-methodology-card="Observamos"]');
  const mainPath = card.locator("[data-main-path]");
  const reveal = card.locator('[data-reveal="components"]');

  const initialState = await card.evaluate((element) => {
    const path = element.querySelector("[data-main-path]");
    const content = element.querySelector('[data-reveal="components"]');

    return {
      dashOffset: path
        ? Number.parseFloat(getComputedStyle(path).strokeDashoffset)
        : Number.NaN,
      revealOpacity: content
        ? Number.parseFloat(getComputedStyle(content).opacity)
        : Number.NaN,
    };
  });

  expect(initialState.dashOffset).toBeCloseTo(1, 2);
  expect(initialState.revealOpacity).toBeCloseTo(0, 2);

  await card.scrollIntoViewIfNeeded();
  await expect
    .poll(async () =>
      Number.parseFloat(await mainPath.evaluate((path) => getComputedStyle(path).strokeDashoffset)),
    )
    .toBeLessThan(0.02);
  await expect
    .poll(async () =>
      Number.parseFloat(await reveal.evaluate((content) => getComputedStyle(content).opacity)),
    )
    .toBeGreaterThan(0.98);

  const probeKey = "__kerokeroMethodologyMotionProbe";
  await page.evaluate(
    ({ durationMs, key, selector }) => {
      const probeWindow = window as unknown as Record<
        string,
        { done: boolean; frames: MethodologyMotionFrame[] }
      >;
      const cardElement = document.querySelector<HTMLElement>(selector);
      const path = cardElement?.querySelector<SVGPathElement>("[data-main-path]");
      const content = cardElement?.querySelector<SVGGElement>('[data-reveal="components"]');
      const flow = cardElement?.querySelector<SVGPathElement>("[data-hover-flow]");

      if (!(cardElement && path && content && flow)) {
        throw new Error("Methodology motion probe could not find its targets");
      }

      const probe = { done: false, frames: [] as MethodologyMotionFrame[] };
      probeWindow[key] = probe;
      const startedAt = performance.now();

      const sample = () => {
        const rect = cardElement.getBoundingClientRect();
        probe.frames.push({
          cardHeight: rect.height,
          cardWidth: rect.width,
          cardX: rect.x,
          cardY: rect.y,
          flowOpacity: Number.parseFloat(getComputedStyle(flow).opacity),
          mainPathDashOffset: Number.parseFloat(
            getComputedStyle(path).strokeDashoffset,
          ),
          revealOpacity: Number.parseFloat(getComputedStyle(content).opacity),
        });

        if (performance.now() - startedAt < durationMs) {
          requestAnimationFrame(sample);
        } else {
          probe.done = true;
        }
      };

      requestAnimationFrame(sample);
    },
    {
      durationMs: 750,
      key: probeKey,
      selector: '[data-methodology-card="Observamos"]',
    },
  );

  await card.hover();
  await expect
    .poll(() =>
      page.evaluate((key) => {
        const probeWindow = window as unknown as Record<
          string,
          { done?: boolean }
        >;
        return probeWindow[key]?.done ?? false;
      }, probeKey),
    )
    .toBe(true);

  const frames = await page.evaluate((key) => {
    const probeWindow = window as unknown as Record<
      string,
      { frames?: MethodologyMotionFrame[] }
    >;
    return probeWindow[key]?.frames ?? [];
  }, probeKey);

  const range = (values: number[]) => Math.max(...values) - Math.min(...values);
  const largestStep = (values: number[]) =>
    Math.max(
      0,
      ...values.slice(1).map((value, index) => Math.abs(value - values[index])),
    );

  expect(frames.length).toBeGreaterThan(20);
  expect(Math.max(...frames.map((frame) => Math.abs(frame.mainPathDashOffset)))).toBeLessThan(0.02);
  expect(Math.min(...frames.map((frame) => frame.revealOpacity))).toBeGreaterThan(0.98);
  expect(range(frames.map((frame) => frame.cardWidth))).toBeLessThan(0.1);
  expect(range(frames.map((frame) => frame.cardHeight))).toBeLessThan(0.1);
  expect(range(frames.map((frame) => frame.cardX))).toBeLessThanOrEqual(2.1);
  expect(range(frames.map((frame) => frame.cardY))).toBeLessThanOrEqual(2.1);
  expect(largestStep(frames.map((frame) => frame.flowOpacity))).toBeLessThan(0.3);
});

test("methodology diagrams expose their final state with reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  const card = page.locator('[data-methodology-card="Observamos"]');
  const state = await card.evaluate((element) => {
    const path = element.querySelector("[data-main-path]");
    const content = element.querySelector('[data-reveal="components"]');

    return {
      dashOffset: path
        ? Number.parseFloat(getComputedStyle(path).strokeDashoffset)
        : Number.NaN,
      revealOpacity: content
        ? Number.parseFloat(getComputedStyle(content).opacity)
        : Number.NaN,
    };
  });

  expect(state.dashOffset).toBeCloseTo(0, 2);
  expect(state.revealOpacity).toBeCloseTo(1, 2);
});
