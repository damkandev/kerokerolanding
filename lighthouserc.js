module.exports = {
  ci: {
    collect: {
      url: [
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3000/sobre-nosotros",
        "http://127.0.0.1:3000/blog",
        "http://127.0.0.1:3000/case-studies/segui",
        "http://127.0.0.1:3000/case-studies/rodar",
      ],
      startServerCommand: "pnpm start",
      startServerReadyPattern: "Ready",
      numberOfRuns: 1,
      settings: {
        chromeFlags: "--headless=new --no-sandbox",
        preset: "desktop",
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.95 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 200 }],
        "total-byte-weight": ["error", { maxNumericValue: 1_000_000 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
