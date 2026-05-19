# KeroKero Landing

Landing institucional de KeroKero construida con Astro. Incluye páginas públicas, portfolio, trabajos, formularios serverless para contacto/postulación y metadata SEO.

## Stack

- Astro 6
- Tailwind CSS 4
- GSAP + ScrollTrigger
- Lenis
- Resend
- Vercel adapter

## Comandos

```sh
pnpm install
pnpm dev
pnpm build
pnpm check
pnpm preview
```

El proyecto requiere Node `>=22.12.0`.

## Variables de Entorno

```sh
RESEND_API_KEY=...
```

Los formularios usan Resend desde endpoints serverless:

- `POST /api/contacto`
- `POST /api/postulacion`

Ambos endpoints responden `500` si `RESEND_API_KEY` no está configurada. El remitente configurado es `KeroKero <web@kerokero.cl>` y los mensajes llegan a `damian@kerokero.cl`.

## Estructura

- `src/pages/`: rutas públicas y endpoints API.
- `src/components/`: secciones reutilizables de la landing.
- `src/lib/server/`: helpers server-side.
- `public/`: assets estáticos, robots y sitemap.

## Deploy

El sitio está preparado para Vercel mediante `@astrojs/vercel`. Configurar `RESEND_API_KEY` en el proyecto de Vercel antes de publicar para habilitar formularios reales.

El dominio canónico usado por SEO, robots y sitemap es:

```text
https://kerokero.cl
```

## QA Local

Antes de publicar:

```sh
pnpm build
pnpm check
pnpm dev
```

Verificar manualmente:

- Navegación desktop y mobile.
- Dropdown de servicios.
- CTAs a contacto desde páginas internas.
- Anchor “Postularme” en `/trabajos`.
- Formularios con email inválido y sin `RESEND_API_KEY`.
- Carga visual de `/portfolio` y avatares optimizados.
