<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Kerokero Landing Instructions

This repo is the ultra-light landing for `kerokero.cl`.

The goal is to build a fast, focused landing in Next.js, TypeScript, and
Tailwind CSS, keeping the first screen and future sections lean. Avoid adding
runtime dependencies, third-party scripts, animation libraries, images, or
tracking unless the user explicitly asks for them and the quality budgets remain
green.

## Quality Bar

Every agent change must keep the project passing:

```bash
rtk pnpm build
```

`pnpm build` is intentionally strict. It runs lint, unit tests, production build,
Playwright, and Lighthouse CI. Do not close a code change without running it,
unless the user explicitly asks to skip verification or the environment blocks
it. If it cannot be run, state exactly what blocked it and run the narrower
checks that are possible.

## Performance Budgets

Preserve these budgets while developing:

- Lighthouse performance >= 95.
- LCP <= 2.5 s.
- CLS <= 0.1.
- TBT <= 200 ms.
- Total page weight <= 1 MB.
- Playwright: no console errors.
- Playwright: no uncontrolled third-party requests.
- Playwright: route-owned JavaScript < 100 kB.
- Playwright: each image < 250 kB.

## Implementation Preferences

- Keep the landing static by default.
- Prefer semantic HTML and Tailwind utilities over custom abstractions.
- Use local/system fonts unless a brand decision requires otherwise.
- Add animations only after choosing a library intentionally, and keep them
  compatible with the existing budgets.
- Keep copy and UI in Spanish unless the user requests another language.
- Do not reintroduce unused starter assets or template links.
