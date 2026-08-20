import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ContactSection,
  Header,
  IconMask,
  PaperShader,
  PressableLink,
  SiteFooter,
} from "../../../components/landing";
import { site } from "../../../lib/site";
import { seguiCaseStudy, type SegBlock, type SegContent } from "./content";
import { ChartBlock } from "./charts";

export async function generateMetadata(): Promise<Metadata> {
  const study = seguiCaseStudy;

  return {
    title: study.seoTitle,
    description: study.seoDescription,
    keywords: [
      "sistema seguimiento veterinario",
      "automatización clínica veterinaria",
      "scoring prioridad casos",
      "adherencia medicación mascotas",
      "motor eventos automatizado",
      "alertas inteligentes veterinaria",
      "ROI operativo clínicas",
      "de datos a decisiones",
      "software veterinario a medida",
      "Kerokero casos de estudio",
    ],
    alternates: {
      canonical: `/case-studies/${study.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "es_CL",
      url: `/case-studies/${study.slug}`,
      siteName: site.name,
      title: study.seoTitle,
      description: study.seoDescription,
      publishedTime: study.publishedAt,
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
      title: study.seoTitle,
      description: study.seoDescription,
      images: ["/opengraph-image"],
    },
  };
}

function InlineContent({ segment }: { segment: SegContent }) {
  if (segment.type === "link") {
    return (
      <a
        href={segment.href}
        target="_blank"
        rel="noreferrer"
        className="text-kk-text-strong underline decoration-kk-border-strong underline-offset-4 transition-colors hover:decoration-kk-heading focus:outline-none focus-visible:ring-2 focus-visible:ring-kk-focus"
      >
        {segment.text}
      </a>
    );
  }

  if (segment.type === "emphasis") {
    return <em>{segment.text}</em>;
  }

  if (segment.type === "code") {
    return (
      <code className="rounded bg-kk-canvas px-1.5 py-0.5 font-mono text-[13px] text-kk-heading">
        {segment.text}
      </code>
    );
  }

  return segment.text;
}

function ContentBlock({ block }: { block: SegBlock }) {
  switch (block.type) {
    case "heading2":
      return (
        <h2 className="mt-14 font-serif text-[clamp(1.8rem,5.5vw,2.35rem)] leading-[1.05] text-kk-heading first:mt-0">
          {block.text}
        </h2>
      );
    case "heading3":
      return (
        <h3 className="mt-12 font-serif text-[1.5rem] leading-[1.15] text-kk-heading first:mt-0">
          {block.text}
        </h3>
      );
    case "codeBlock":
      return (
        <div className="mt-8">
          <pre className="overflow-x-auto border border-kk-border-strong bg-kk-canvas p-5 font-mono text-[12px] leading-[1.7] text-kk-text/85 lg:text-[13px]">
            <code>{block.code}</code>
          </pre>
          {block.caption && (
            <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-kk-text/55">
              {block.caption}
            </p>
          )}
        </div>
      );
    case "list":
      return (
        <ul className="mt-6 space-y-3 pl-6">
          {block.items.map((item, index) => (
            <li key={index} className="text-[14px] leading-[1.75] text-kk-text/80 lg:text-[15px] lg:leading-[1.8]">
              <span className="mr-3 text-kk-text-strong">•</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case "chart":
      return (
        <ChartBlock
          chartType={block.chartType}
          data={block.data}
          caption={block.caption}
        />
      );
    default:
      return (
        <p className="mt-6 text-[14px] leading-[1.75] text-kk-text/80 first:mt-0 lg:text-[15px] lg:leading-[1.8]">
          {block.segments.map((segment, index) => (
            <InlineContent key={`${segment.type}-${index}`} segment={segment} />
          ))}
        </p>
      );
  }
}

export default async function SeguiCaseStudyPage() {
  const study = seguiCaseStudy;

  if (!study) {
    notFound();
  }

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
    keywords: [
      "sistema de seguimiento veterinario",
      "automatización clínica veterinaria",
      "scoring de prioridad",
      "adherencia de medicación",
      "motor de eventos",
      "ARQ job queue",
      "alertas inteligentes",
      "WhatsApp automatizado",
      "ROI operativo",
      "de datos a decisiones",
    ],
    about: [
      {
        "@type": "Thing",
        name: "Automatización de seguimiento médico veterinario",
      },
      {
        "@type": "Thing",
        name: "Sistema de priorización basado en datos",
      },
      {
        "@type": "Thing",
        name: "Optimización operativa de clínicas",
      },
    ],
  };

  const breadcrumbsJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: site.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Casos de estudio",
        item: `${site.url}/#servicios`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Segui",
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
        <Header currentPath="/case-studies/segui" />

        <section
          aria-labelledby="case-study-hero-title"
          className="hero-grid flex min-h-[570px] flex-col items-center border-b border-kk-border px-5 pb-12 pt-20 text-center sm:min-h-[470px] sm:px-10 sm:pb-14 sm:pt-24 lg:min-h-[520px] lg:px-16 lg:pb-16 lg:pt-28"
        >
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-kk-heading/60 lg:text-xs">
            <IconMask
              src="/figma/paw.svg"
              className="size-[14px] text-kk-text-strong lg:size-4"
            />
            {study.category} · {study.metaLine}
          </p>
          <h1
            id="case-study-hero-title"
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
            {study.body.map((block, index) => (
              <ContentBlock key={`${block.type}-${index}`} block={block} />
            ))}

            <aside className="mt-16 border-t border-kk-border pt-10">
              <h2 className="max-w-[420px] font-serif text-[clamp(1.6rem,5vw,2rem)] leading-[1.05] text-kk-heading">
                Conversemos sobre tu operación.
              </h2>
              <p className="mt-4 max-w-[520px] text-[13px] leading-[1.65] text-kk-text/70">
                Si reconociste parte de tu problema en este caso, o si tu operación genera señales que nadie está mirando, hablemos. No vendemos un producto genérico. Construimos el sistema que tu operación necesita.
              </p>
              <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <PressableLink href="/#servicios">Ver servicios</PressableLink>
                <PressableLink href="/case-studies/rodar" variant="secondary">
                  Ver el caso Rodar
                </PressableLink>
              </div>
            </aside>
          </div>
        </section>

        <ContactSection />
        <SiteFooter />
      </div>
      <PaperShader />
    </main>
  );
}
