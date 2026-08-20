---
name: kerokero-case-study
description: Turn Kerokero client project repositories into published case studies on kerokero.cl. Use when the user wants to create or draft a "case study", "caso de estudio", or "caso de éxito" from a client repo, wants the agent to investigate a client system deeply (backend, data handling, data models) to write about it, or wants to add a new case study page to the Kerokero landing.
metadata:
  version: 1.0.0
  source: Local mirror of ~/.agents/skills/kerokero-case-study. Keep both copies in sync.
---

# Kerokero Case Study

Convert a client repository into a published case study page on the Kerokero landing. The research phase is the core of this skill: the agent reads the client system deeply, backend and data handling first, because that is what Kerokero sells ("De datos a decisiones"). The published copy must be true to the code. Research exists to make the story accurate, not to list technologies.

## Non-negotiables

- Copy in Spanish (es_CL). All interviews with the user in Spanish.
- Never mention the client's tech stack in the copy. Describe function, not implementation. No "React", no "Postgres", no "microservicios", no "API" when a plain word fits.
- Never invent metrics. Numbers come from code-derived scenarios (Phase 4) or stay qualitative. Default is qualitative, like the existing Segui and Rodar cases.
- Scope: the case study page only. The home card copy gets delivered as a suggestion in chat, never implemented.
- Verify with `rtk pnpm build` in the landing repo before finishing. If it cannot run, state what blocked it and run the narrowest checks available (lint, unit tests, Playwright).
- Read the landing repo's AGENTS.md before touching it. The landing uses a Next.js version with breaking changes; consult `node_modules/next/dist/docs/` if you write framework code.
- Never publish client-sensitive internals: keys, internal URLs, employee names, private business data. Ask what to anonymize during intake.

## Phase 1: Intake

Ask the user:

1. Path to the client repo. Verify it exists before proceeding.
2. One repo or several? Monorepo, multi-repo, or single app? This shapes the research.
3. Path to the Kerokero landing. Default: `~/Codigo/kerokerolanding`.
4. Extra material available: briefs, emails, meeting notes, the original proposal, anything that documents the "before".
5. Can the client's real name appear on the site?

## Phase 2: Problem interview

Before reading any code. Interview the user in Spanish, one batch of questions at a time. Goal: understand the story from the business side so the code reading has direction.

Ask:

- ¿Qué hace el negocio del cliente? ¿Cómo gana dinero?
- ¿Cómo era el día a día del equipo antes del sistema? Walk through a concrete day.
- ¿Dónde vivían los datos? Planillas, chats, papel, sistemas previos.
- ¿Qué decisión estaba lenta, manual o mal informada? Name the specific decision, not a category.
- ¿Qué gatilló el proyecto? A crisis, a lost client, a growth step?
- ¿Qué hay que anonimizar? Client names, sectors, figures?
- ¿Qué ícono representa al cliente? The icon lives in `public/figma/`.
- ¿Hay métricas reales verificadas que quieras usar? If not provided, numbers must come from Phase 4 or stay qualitative.

## Phase 3: System research

### 3a: Map the topology first

Read the repo root before going deep anywhere:

- Manifests and workspace configs: `docker-compose.yml`, `package.json` workspaces, `turbo.json`, `nx.json`, `go.mod`, `Cargo.toml`.
- Directory structure: `apps/`, `services/`, `packages/`, `workers/`, `jobs/`.
- Infra configs and CI workflows: what gets deployed, what runs on schedule.
- README and docs.

Produce an inventory of components: each deployable unit, its role, and how they talk (HTTP, queues, events, shared database). Present this map to the user in one screen before going deeper. If something in the map surprises the user, fix the map first.

For large repos, dispatch explore subagents, one per component, backend components first.

### 3b: Backend deep read (the priority)

This mirrors what the home page promises: "Reunimos la información, incorporamos criterios de negocio y la convertimos en una herramienta que tu equipo puede usar todos los días." Follow the full data chain:

| Link | What to look for | Home page equivalent |
|------|------------------|---------------------|
| Fuentes | integrations, webhooks, imports, manual loaders | "reunimos la información" |
| Ingesta | jobs, queues, syncs, ETL processes | |
| Modelo | schemas, migrations, entities, relations, constraints | "modelos de datos" |
| Señales | computed fields, aggregations, scoring | `riesgo = f(historial, evolución, contexto)` |
| Criterios | thresholds, weights, business rules, state machines | "criterios de negocio" |
| Superficies | endpoints, dashboards, alerts, exports | |
| Decisiones | which action each surface enables | priorizar / revisar / continuar |

Two extras:

- Migrations are gold. The oldest ones show the "before" of the business. Each later migration tells what the operation needed next. Read the migration history as a narrative.
- Seeds and fixtures are the basis for Phase 4 metrics. Note them.
- Dead code, TODOs, and gaps in the schema are traces of the "before" and of what is missing. Note them for 3d.

### 3c: Contextual reads (frontend and support code)

Read the frontend and support code (scripts, workers, infra) only deep enough to answer one question: what does the team see, and what actions can they take on each screen? Tables, filters, buttons, flows. This is not for describing UI. It is for knowing which decisions the interface enables.

### 3d: Code-informed interview

After reading, present your understanding of the system to the user, then ask questions only the code can generate:

- "El scoring pondera X con pesos Y. ¿Quién definió esos criterios y cómo se llegó a esos números?"
- "El modelo tiene A, B y C, pero D no aparece. ¿D vivía en planillas?"
- "Hay un job que procesa X cada hora. ¿Cómo se hacía antes, a mano?"
- "El schema tiene una tabla que ya no se usa. ¿Qué reemplazó esa función?"

### Phase 3 output

Present all of this before drafting anything:

1. The system map: topology plus the complete data chain.
2. Four candidate capabilities, grounded in real code behavior.
3. Derivable metrics, if any (with the derivation).
4. Open questions from 3d.

## Phase 4: Evidence-based metrics

If a number would strengthen the story, derive it from the code:

- Analyze seeds and fixtures. Run the real logic over representative scenarios. Count states, entities, alerts.
- Every number must be reproducible from the repo. Show the derivation to the user at the review gate.
- Round numbers, anchored to the scenario that produced them. "Con los 400 casos del seed, el tablero marca 23 desvíos el primer día." Not "redujo el tiempo en 87,3%".
- False precision is banned. So are unverifiable claims.
- If a metric is not derivable or the data is sensitive, stay qualitative. The existing cases are qualitative and that is fine.

## Phase 5: Draft

### Schema contract

The draft must match the exact shape of `src/app/case-studies/[slug]/content.ts`:

```ts
{
  slug: "kebab-case",
  client: "Display Name",
  icon: "/figma/name.svg",
  metaLine: "short operational descriptor",
  seoTitle: "Caso de estudio {Client} | Kerokero",
  seoDescription: "Cómo Kerokero construyó con {Client} un sistema que...", // 140-165 chars
  headline: "{Client} + transformation.", // ends with period, ~60-70 chars
  summary: "what was built and what changed", // one paragraph, ~230-260 chars
  problemTitle: "the before-state, stated plainly", // ends with period
  problem: ["paragraph 1", "paragraph 2"], // exactly 2, each ~200-280 chars
  systemTitle: "what the system is, in one sentence",
  capabilities: [ // exactly 4
    { title: "2-4 words", copy: "what the team gets, ~140-180 chars" },
  ],
  operationTitle: "the after-state",
  operationIntro: "how the day works now, ~180-230 chars",
  outcomes: [ // exactly 3
    { label: "one word", copy: "~80-110 chars" },
  ],
  nextCase: {
    title: "Conoce el caso {X}.",
    copy: "one line about the next case",
    cta: "Ver el caso {X}",
    href: "/case-studies/{x}",
  },
}
```

### Voice

Direct, concrete, operational. Short declarative sentences. The reader is a business decision maker, not an engineer.

Rules:

- Capabilities describe what the team gets, never what the code is. "Centro de señales" and "Prioridades explícitas" pass. "Arquitectura escalable" and "Pipeline robusto" are technical slop and fail.
- The team is the actor. "El equipo revisa los desvíos", not passive constructions that hide who acts.
- One idea per sentence. Two items beat three.
- Clean oral filler when transcribing user answers into copy. Interview speech is not publishable prose.

### Slop gate

Before showing any draft to the user, read `skills/stop-slop/SKILL.md` in the landing repo if it exists, apply it to Spanish copy using the distillation below, and score the draft. If the repo copy is missing, the distillation stands alone.

Spanish patterns to remove:

| Category | Banned | Fix |
|----------|--------|-----|
| Throat-clearing | "La realidad es que", "Lo cierto es que", "Hay que ser claros" | Say the thing |
| Adverbs | realmente, simplemente, básicamente, literalmente, esencialmente, filler -mente | Cut |
| Marketing verbs | revolucionar, transformar, potenciar, impulsar, elevar, desbloquear, empoderar | Concrete verb: reunir, ordenar, marcar, decidir |
| Noun fog | "solución integral", "visión 360", "un antes y un después", "a la medida de tus necesidades" | The real noun |
| Era openers | "En el mundo de hoy", "En la era de los datos" | Start with the fact |
| Reveal contrast | "No era un problema de X. Era un problema de Y.", "no solo X sino también Y", "deja de ser X para convertirse en Y" | Say the second half |
| Triads | "más rápido, más claro y más eficiente" | Two items or one |
| Em dashes | — | Comma, period, or colon. Zero exceptions. |
| False agency | "los datos cuentan una historia", "el tablero habla del negocio" | Who acts |
| Vague declaratives | "El impacto fue significativo" | The concrete fact |

House calibrations, tuned against the existing copy:

- "en lugar de" is allowed when both halves inform, maximum one per section. "Las reuniones deciden acciones en lugar de reconciliar números." passes.
- Literal system verbs (reúne, ordena, marca, compara, registra) are fine. The system does those things in code. Figurative ones ("el sistema entiende", "los datos susurran") are banned.
- Passive-reflexive that hides the actor gets replaced when the actor matters: "se tomaban decisiones" becomes "el equipo decidía".
- No stack names, ever. Implementation vocabulary stays in the research notes.

Calibration lines. New copy must match this bar:

- "El día parte con las prioridades resueltas y el contexto de cada caso a un clic."
- "Las reuniones deciden acciones en lugar de reconciliar números."
- "El sistema compara lo que ocurre contra lo esperado y marca las diferencias. El equipo revisa los desvíos en lugar de recorrer toda la planilla."
- "Cada acción queda registrada con su contexto. El equipo responde qué pasó y quién decidió, sin reconstruir la historia a mano."

Score 1-10 on each dimension:

| Dimension | Question |
|-----------|----------|
| Directness | Statements or announcements? |
| Rhythm | Varied or metronomic? |
| Trust | Respects reader intelligence? |
| Authenticity | Sounds human? |
| Density | Anything cuttable? |

Below 35/50: rewrite before the user sees anything.

### Review gate

Show the user, before touching the landing:

1. The full draft mapped to the schema.
2. Which slop patterns the gate caught and fixed (one line).
3. Metric derivations, if any numbers are used.
4. A suggested home card copy (2-3 sentences in the style of `src/components/landing/data.ts`), delivered in chat only. Do not implement it.

Implement only after approval.

## Phase 6: Implementation

Touch these files, in this order:

1. `public/figma/{name}.svg` — icon. Outline SVG, viewBox around 22×22, stroke width 2, stroke `#0F1E0F`, no fill. Monochrome: it renders via CSS mask with `currentColor`. Match the style of `paw.svg` and `rodar.svg`.
2. `src/app/case-studies/[slug]/content.ts` — the new entry, plus the nextCase ring update.
3. `src/app/case-studies/[slug]/page.test.tsx` — add the slug to the `slugs` array.
4. `src/app/sitemap.ts` — new entry: `changeFrequency: "yearly"`, `priority: 0.6`.
5. `tests/e2e/case-studies.spec.ts` — new entry in `cases`, and update any existing entry whose `nextCaseCta` or `nextCaseHref` changed.

Never touch: `src/components/landing/data.ts`, `src/app/page.test.tsx`, home sections. The home stays manual per scope.

### nextCase ring

The set of `nextCase` links must form a single cycle covering every case, so each case promotes exactly one other and all cases stay reachable. With two cases it is a mutual pointer. When adding a third, ask the user which case should precede and follow the new one, then update the displaced pointer. Example with cases A, B existing and C new: A→B, B→A becomes A→B, B→C, C→A, if the user picks that order. After changing any pointer, update the matching e2e expectations.

## Phase 7: Verification

Run from the landing repo:

```bash
rtk pnpm build
```

It runs lint, unit tests, production build, Playwright, and Lighthouse CI. Fix everything it reports, then run it again. If it cannot run, state exactly what blocked it and run the narrowest checks available (lint, unit tests, Playwright).

Budgets that must stay green:

- Lighthouse performance >= 95, LCP <= 2.5 s, CLS <= 0.1, TBT <= 200 ms.
- Total page weight <= 1 MB, route JS < 100 kB, each image < 250 kB.
- No console errors, no third-party requests.

Report the final budgets to the user with the summary of everything shipped.

## Quick checklist

- [ ] Intake: repo path(s), landing path, extra material, name visibility
- [ ] Problem interview before reading code
- [ ] Topology map presented and confirmed
- [ ] Backend data chain traced end to end (fuentes → ingesta → modelo → señales → criterios → superficies → decisiones)
- [ ] Frontend read contextually: which actions each screen enables
- [ ] Code-informed interview done
- [ ] Metrics derived from code or left qualitative
- [ ] Draft passes slop gate (>= 35/50)
- [ ] Review gate: draft, derivations, home card suggestion, approved
- [ ] Five files touched, home untouched
- [ ] nextCase ring is a single cycle
- [ ] `rtk pnpm build` green, budgets reported
