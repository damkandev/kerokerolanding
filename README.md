# Kerokero Landing

Landing ultraligera para `kerokero.cl`, creada con Next.js, TypeScript,
Tailwind CSS y quality gates desde el inicio.

## Scripts

```bash
pnpm dev
pnpm lint
pnpm test
pnpm build
```

## Formulario de contacto

El endpoint `POST /api/contact` envía los mensajes a
`damkancontacto@gmail.com` mediante la API HTTP de Resend. Configura estas
variables solo en el servidor o en el proveedor de hosting:

```bash
RESEND_API_KEY=re_...
# Opcional si quieres reemplazar el remitente predeterminado:
RESEND_FROM_EMAIL="KeroKero <contacto@tu-dominio-verificado.cl>"
```

Sin `RESEND_FROM_EMAIL`, el formulario usa
`KeroKero <contacto@mail.kerokero.cl>`. El dominio del remitente debe estar
verificado en Resend. Ninguna de estas variables debe usar el prefijo
`NEXT_PUBLIC_`.

`pnpm build` es el gate estricto del proyecto: ejecuta lint, tests unitarios,
build productivo, Playwright y Lighthouse CI.

## Quality Gates

- `pnpm lint`: ESLint con reglas de Next core web vitals y TypeScript.
- `pnpm test`: Vitest + React Testing Library.
- `pnpm test:e2e`: Playwright contra `next start`.
- `pnpm lhci`: Lighthouse CI con performance `>= 95`, LCP `<= 2.5 s`,
  CLS `<= 0.1`, TBT `<= 200 ms` y peso total `<= 1 MB`.

Playwright valida que no haya errores de consola, que no aparezcan terceros no
permitidos, que cada imagen pese menos de `250 kB` y que el JS propio de ruta
quede bajo `100 kB`.

## Notes

El build productivo usa `next build --webpack` porque Next 16/Turbopack produjo
un panic procesando CSS en este entorno. Si Turbopack queda estable más adelante,
se puede reevaluar el script `build:next`.
