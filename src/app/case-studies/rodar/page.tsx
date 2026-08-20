import type { Metadata } from "next";
import Image from "next/image";

import {
  ContactSection,
  Header,
  IconMask,
  PaperShader,
  PressableLink,
  SiteFooter,
} from "../../../components/landing";
import { site } from "../../../lib/site";
import { RodarChart } from "./charts";
import { rodarCaseStudy, type RodarBlock } from "./content";

export const metadata: Metadata = {
  title: rodarCaseStudy.seoTitle,
  description: rodarCaseStudy.seoDescription,
  keywords: [
    "inteligencia automotriz",
    "datos para automotoras",
    "valorización de inventario",
    "evaluación de vehículos usados",
    "riesgo vehicular",
    "financiamiento automotoras",
    "software a medida",
    "Kerokero casos de estudio",
  ],
  alternates: { canonical: `/case-studies/${rodarCaseStudy.slug}` },
  openGraph: {
    type: "article",
    locale: "es_CL",
    url: `/case-studies/${rodarCaseStudy.slug}`,
    siteName: site.name,
    title: rodarCaseStudy.seoTitle,
    description: rodarCaseStudy.seoDescription,
    publishedTime: rodarCaseStudy.publishedAt,
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
    title: rodarCaseStudy.seoTitle,
    description: rodarCaseStudy.seoDescription,
    images: ["/opengraph-image"],
  },
};

function headingId(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function FormulaBlock({ block }: { block: Extract<RodarBlock, { type: "formula" }> }) {
  return (
    <figure className="my-9 border-l-2 border-kk-border-strong bg-kk-brand/20 px-5 py-5 sm:px-7">
      <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-[12px] leading-[1.85] text-kk-heading sm:text-[13px]">
        <code>{block.lines.join("\n")}</code>
      </pre>
      <figcaption className="mt-3 text-[11px] leading-[1.6] text-kk-text/55">
        {block.caption}
      </figcaption>
    </figure>
  );
}

function ContentBlock({ block }: { block: RodarBlock }) {
  switch (block.type) {
    case "heading2":
      return (
        <h2
          id={headingId(block.text)}
          className="mt-14 scroll-mt-24 font-serif text-[clamp(1.8rem,5.5vw,2.35rem)] leading-[1.05] text-kk-heading first:mt-0"
        >
          {block.text}
        </h2>
      );
    case "heading3":
      return (
        <h3 className="mt-11 font-serif text-[1.55rem] leading-[1.1] text-kk-heading">
          {block.text}
        </h3>
      );
    case "formula":
      return <FormulaBlock block={block} />;
    case "list":
      return (
        <ul className="mt-7 space-y-3 border-l border-kk-border-strong pl-5 sm:pl-7">
          {block.items.map((item) => (
            <li key={item} className="text-[14px] leading-[1.75] text-kk-text/80 lg:text-[15px]">
              {item}
            </li>
          ))}
        </ul>
      );
    case "chart":
      return (
        <figure className="my-10">
          <RodarChart chartType={block.chartType} />
          <figcaption className="mt-4 text-[11px] leading-[1.65] text-kk-text/55">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "image":
      return (
        <figure className={`my-10 ${block.width > 800 ? "" : "mx-auto max-w-[430px]"}`}>
          <div className="overflow-hidden border border-kk-border-strong bg-white">
            <Image
              src={block.src}
              alt={block.alt}
              width={block.width}
              height={block.height}
              sizes={block.width > 800 ? "(min-width: 1024px) 812px, calc(100vw - 72px)" : "(min-width: 640px) 430px, calc(100vw - 72px)"}
              className="h-auto w-full"
            />
          </div>
          <figcaption className="mt-3 text-[11px] leading-[1.65] text-kk-text/55">
            {block.caption}
          </figcaption>
        </figure>
      );
    case "callout":
      return (
        <aside className="my-10 border border-kk-border-strong bg-kk-brand/25 p-6 shadow-[5px_5px_0_#a2bba2] sm:p-8">
          <p className="font-serif text-[1.55rem] leading-[1.15] text-kk-heading sm:text-[1.8rem]">
            {block.text}
          </p>
        </aside>
      );
    default:
      return (
        <p className="mt-6 text-[14px] leading-[1.78] text-kk-text/80 first:mt-0 lg:text-[15px] lg:leading-[1.82]">
          {block.text}
        </p>
      );
  }
}

export default function RodarCaseStudyPage() {
  const study = rodarCaseStudy;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.url}/case-studies/${study.slug}#article`,
    url: `${site.url}/case-studies/${study.slug}`,
    mainEntityOfPage: `${site.url}/case-studies/${study.slug}`,
    headline: study.title,
    description: study.seoDescription,
    inLanguage: "es-CL",
    datePublished: study.publishedAt,
    dateModified: study.publishedAt,
    author: [{ "@id": `${site.url}/#organization` }],
    publisher: { "@id": `${site.url}/#organization` },
    about: [
      { "@type": "Thing", name: "Inteligencia de datos para automotoras" },
      { "@type": "Thing", name: "Evaluación y valorización de vehículos" },
    ],
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: site.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "Casos de estudio",
        item: `${site.url}/#servicios`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Rodar",
        item: `${site.url}/case-studies/${study.slug}`,
      },
    ],
  };

  return (
    <main className="relative min-h-screen bg-background px-3 font-sans text-kk-text sm:px-6 lg:px-10 2xl:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsJsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <div className="mx-auto w-full max-w-[1132px] border-x border-kk-border bg-kk-canvas lg:max-w-[1240px]">
        <Header currentPath="/case-studies/rodar" />

        <section
          aria-labelledby="rodar-hero-title"
          className="hero-grid flex min-h-[570px] flex-col items-center border-b border-kk-border px-5 pb-12 pt-20 text-center sm:min-h-[470px] sm:px-10 sm:pb-14 sm:pt-24 lg:min-h-[520px] lg:px-16 lg:pb-16 lg:pt-28"
        >
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-kk-heading/60 lg:text-xs">
            <IconMask src="/figma/rodar.svg" className="size-[14px] text-kk-text-strong lg:size-4" />
            {study.category} · {study.metaLine}
          </p>
          <h1
            id="rodar-hero-title"
            className="mx-auto mt-6 max-w-[820px] font-serif text-[clamp(2.55rem,10vw,3.25rem)] leading-[0.94] text-kk-heading lg:max-w-[900px] lg:text-[58px]"
          >
            {study.title}
          </h1>
          <p className="mx-auto mt-7 max-w-[670px] text-[14px] leading-[1.6] text-kk-text/70 lg:text-[15.5px] lg:leading-[1.6]">
            {study.subtitle}
          </p>
          <div className="mt-auto flex justify-center pt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-kk-text/55">
              {study.publishedLabel}
            </p>
          </div>
        </section>

        <section
          aria-label="Contenido del caso de estudio"
          className="border-b border-kk-border px-6 py-16 sm:px-12 lg:px-[72px] lg:py-20"
        >
          <div className="mx-auto max-w-[700px]">
            <article>
              {study.body.map((block, index) => (
                <ContentBlock key={`${block.type}-${index}`} block={block} />
              ))}

              <aside className="mt-16 border-t border-kk-border pt-10">
                <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-kk-heading/55">
                  Siguiente caso
                </p>
                <h2 className="mt-4 max-w-[520px] font-serif text-[clamp(1.8rem,5vw,2.35rem)] leading-[1.05] text-kk-heading">
                  Segui convierte el seguimiento post-alta en prioridades para el equipo.
                </h2>
                <p className="mt-4 max-w-[560px] text-[13px] leading-[1.65] text-kk-text/70">
                  Otro ejemplo de cómo Kerokero diseña el modelo que conecta datos operativos con una decisión diaria.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <PressableLink href="/case-studies/segui">Ver el caso Segui</PressableLink>
                  <PressableLink href="/#servicios" variant="secondary">
                    Ver servicios
                  </PressableLink>
                </div>
              </aside>
            </article>
          </div>
        </section>

        <ContactSection />
        <SiteFooter />
      </div>
      <PaperShader />
    </main>
  );
}
