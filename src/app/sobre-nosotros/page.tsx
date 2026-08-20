import type { Metadata } from "next";

import {
  ContactSection,
  Header,
  PaperShader,
  PressableLink,
  SiteFooter,
  TeamPortrait,
} from "../../components/landing";
import { site } from "../../lib/site";

const title = "Sobre nosotros | Kerokero";
const description =
  "Conoce al equipo de Kerokero y cómo trabajamos: un estudio latinoamericano de software a medida donde los socios participan en cada proyecto.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/sobre-nosotros",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/sobre-nosotros",
    siteName: site.name,
    title,
    description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kerokero, software a medida para convertir datos en mejores decisiones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/opengraph-image"],
  },
};

const principles = [
  {
    title: "Observamos antes de construir",
    copy: "Conversamos con quienes hacen el trabajo y revisamos datos, reglas y restricciones. Así definimos el problema con el equipo que lo vive.",
  },
  {
    title: "Los socios se hacen cargo",
    copy: "Damián acompaña producto y relación con el cliente. Felipe define arquitectura y criterios técnicos. Ambos participan en las decisiones que cambian el alcance.",
  },
  {
    title: "La operación define el sistema",
    copy: "Cada proyecto parte desde la forma en que tu empresa trabaja. El alcance responde a una decisión concreta y crece con evidencia de uso.",
  },
  {
    title: "Tu empresa conserva el control",
    copy: "Te entregamos el código, los datos, el diseño y la documentación. Si otro equipo continúa el trabajo, recibe el contexto necesario.",
  },
] as const;

const team = [
  { name: "Lautaro Villalba", role: "Tech Lead" },
  { name: "Josue Palma", role: "Fullstack" },
  { name: "Agustin Altamirano", role: "Fullstack" },
  { name: "Jesus Rojas", role: "Fullstack" },
  { name: "Ivan Belasich", role: "Fullstack" },
  { name: "Marilyn Cellis", role: "Fullstack" },
] as const;

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${site.url}/sobre-nosotros/#about`,
  url: `${site.url}/sobre-nosotros`,
  name: title,
  description,
  inLanguage: "es-CL",
  about: {
    "@id": `${site.url}/#organization`,
  },
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-background px-3 font-sans text-kk-text sm:px-6 lg:px-10 2xl:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto w-full max-w-[1132px] border-x border-kk-border bg-kk-canvas lg:max-w-[1240px]">
        <Header currentPath="/sobre-nosotros" />

        <section
          aria-labelledby="about-hero-title"
          className="hero-grid flex min-h-[570px] flex-col items-center border-b border-kk-border px-5 pb-12 pt-20 text-center sm:min-h-[470px] sm:px-10 sm:pb-14 sm:pt-24 lg:min-h-[520px] lg:px-16 lg:pb-16 lg:pt-28"
        >
          <h1
            id="about-hero-title"
            className="mx-auto max-w-[820px] font-serif text-[clamp(2.55rem,10vw,3.25rem)] leading-[0.94] text-kk-heading lg:max-w-[900px] lg:text-[58px]"
          >
            En Kerokero, quienes entienden tu operación construyen el sistema.
          </h1>
          <p className="mx-auto mt-7 max-w-[670px] text-[14px] leading-[1.6] text-kk-text/70 lg:text-[15.5px] lg:leading-[1.6]">
            Somos un estudio latinoamericano de software a medida. Los socios
            participan en cada proyecto para convertir decisiones críticas en
            herramientas que tu equipo puede usar, medir y mejorar.
          </p>
          <p className="mt-auto pt-12 font-mono text-[10px] text-kk-text/70 lg:text-xs">
            Chile <span aria-hidden="true">·</span> Argentina{" "}
            <span aria-hidden="true">·</span> Perú
          </p>
        </section>

        <section
          aria-labelledby="about-origin-title"
          className="border-b border-kk-border px-6 py-16 sm:px-12 lg:px-[72px] lg:py-24"
        >
          <div className="mx-auto max-w-[960px]">
            <h2
              id="about-origin-title"
              className="max-w-[760px] font-serif text-[clamp(2.15rem,8vw,3rem)] leading-[0.96] text-kk-heading"
            >
              Fundamos Kerokero para acortar la distancia entre el negocio y
              el código.
            </h2>
            <div className="mt-8 grid gap-5 text-[14px] leading-[1.65] text-kk-text/75 md:grid-cols-2 md:gap-10 lg:text-[15px]">
              <p>
                Vimos proyectos donde el problema pasaba por demasiadas manos.
                Quien hablaba con el cliente no diseñaba el producto, y quien
                escribía el código recibía una versión incompleta de la
                operación.
              </p>
              <p>
                Damián y Felipe participan en las conversaciones que definen
                cada sistema. El equipo observa el trabajo, identifica una
                decisión que vale la pena mejorar y construye alrededor de
                ella.
              </p>
            </div>
          </div>

          <aside className="mx-auto mt-14 flex max-w-[960px] flex-col gap-7 border border-kk-border-strong bg-kk-canvas p-6 shadow-[6px_6px_0_#a2bba2] sm:flex-row sm:items-end sm:justify-between sm:p-8">
            <div>
              <h3 className="max-w-[560px] font-serif text-[clamp(1.8rem,6vw,2.35rem)] leading-[1] text-kk-heading">
                Mira cómo funciona en proyectos reales.
              </h3>
              <p className="mt-4 max-w-[620px] text-[13px] leading-[1.65] text-kk-text/70">
                Conoce los sistemas que construimos para Segui y Rodar, y cómo
                convierten información dispersa en decisiones claras.
              </p>
            </div>
            <PressableLink
              href="/#servicios"
              className="w-full shrink-0 sm:w-[170px]"
            >
              Ver casos de éxito
            </PressableLink>
          </aside>
        </section>

        <section
          aria-labelledby="about-principles-title"
          className="feature-card-grid border-b border-kk-border px-6 py-16 sm:px-12 lg:px-[72px] lg:py-24"
        >
          <div className="max-w-[800px]">
            <h2
              id="about-principles-title"
              className="font-serif text-[clamp(2.15rem,8vw,3rem)] leading-[0.96] text-kk-heading"
            >
              Mantenemos el contexto del negocio en cada decisión del proyecto.
            </h2>
          </div>

          <div className="mt-12 grid border-l border-t border-kk-border-strong md:grid-cols-2">
            {principles.map((principle) => (
              <article
                key={principle.title}
                className="min-h-[220px] border-b border-r border-kk-border-strong bg-kk-canvas/85 p-6 sm:p-8"
              >
                <h3 className="max-w-[360px] font-serif text-[1.7rem] leading-[1] text-kk-heading">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-[440px] text-[13px] leading-[1.65] text-kk-text/70">
                  {principle.copy}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="about-team-title"
          className="border-b border-kk-border px-6 py-16 sm:px-12 lg:px-[72px] lg:py-24"
        >
          <div className="mx-auto max-w-[960px]">
            <h2
              id="about-team-title"
              className="font-serif text-[clamp(2.15rem,8vw,3rem)] leading-[0.96] text-kk-heading"
            >
              Las personas detrás de cada decisión.
            </h2>
            <p className="mt-5 max-w-[650px] text-[14px] leading-[1.65] text-kk-text/70">
              Combinamos producto, arquitectura y desarrollo. Trabajamos juntos
              desde la primera conversación hasta producción.
            </p>
          </div>

          <div className="mx-auto mt-12 grid max-w-[960px] gap-7 lg:grid-cols-2">
            <article className="grid gap-6 border border-kk-border-strong bg-kk-canvas p-5 shadow-[6px_6px_0_#a2bba2] sm:grid-cols-[128px_1fr] sm:items-start sm:p-6">
              <TeamPortrait
                src="/team/damian-panes.webp"
                alt="Damián Panes, CEO de Kerokero"
                sizes="(min-width: 640px) 128px, 160px"
                className="size-40 border border-kk-border sm:size-32"
              />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-kk-heading/60">
                  CEO
                </p>
                <h3 className="mt-2 font-serif text-[1.8rem] leading-none text-kk-heading">
                  Damián Panes
                </h3>
                <p className="mt-4 text-[13px] leading-[1.6] text-kk-text/70">
                  Lidera la estrategia de producto y trabaja con cada cliente
                  para convertir el problema operativo en un alcance que el
                  equipo pueda construir y medir.
                </p>
                <a
                  href="https://www.linkedin.com/in/damianpanes/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex font-mono text-[10px] text-kk-heading underline decoration-kk-border-strong underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-kk-focus"
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            <article className="grid gap-6 border border-kk-border-strong bg-kk-canvas p-5 shadow-[6px_6px_0_#a2bba2] sm:grid-cols-[128px_1fr] sm:items-start sm:p-6">
              <TeamPortrait
                src="/team/felipe-figueroa.webp"
                alt="Felipe Figueroa, CTO de Kerokero"
                sizes="(min-width: 640px) 128px, 160px"
                className="size-40 border border-kk-border sm:size-32"
              />
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-kk-heading/60">
                  CTO
                </p>
                <h3 className="mt-2 font-serif text-[1.8rem] leading-none text-kk-heading">
                  Felipe Figueroa
                </h3>
                <p className="mt-4 text-[13px] leading-[1.6] text-kk-text/70">
                  Define la arquitectura y los criterios técnicos. Acompaña el
                  desarrollo desde las primeras decisiones hasta producción.
                </p>
                <a
                  href="https://www.linkedin.com/in/felipefigueroaf/"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex font-mono text-[10px] text-kk-heading underline decoration-kk-border-strong underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-kk-focus"
                >
                  LinkedIn <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>

          <ul className="mx-auto mt-12 grid max-w-[960px] border-l border-t border-kk-border sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <li
                key={member.name}
                className="border-b border-r border-kk-border px-5 py-5"
              >
                <p className="font-serif text-lg leading-tight text-kk-heading">
                  {member.name}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-kk-text/55">
                  {member.role}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <ContactSection />
        <SiteFooter />
      </div>
      <PaperShader />
    </main>
  );
}
