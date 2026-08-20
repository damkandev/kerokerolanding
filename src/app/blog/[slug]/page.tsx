import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  AvatarByline,
  ContactSection,
  Header,
  IconMask,
  PaperShader,
  PressableLink,
  SiteFooter,
} from "../../../components/landing";
import { site } from "../../../lib/site";
import { blogArticles, getBlogArticle, type BlogBodyBlock, type BlogInlineSegment } from "./content";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    return {};
  }

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      type: "article",
      locale: "es_CL",
      url: `/blog/${article.slug}`,
      siteName: site.name,
      title: article.seoTitle,
      description: article.seoDescription,
      publishedTime: article.publishedAt,
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
      title: article.seoTitle,
      description: article.seoDescription,
      images: ["/opengraph-image"],
    },
  };
}

function InlineSegment({ segment }: { segment: BlogInlineSegment }) {
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

  return segment.text;
}

function ArticleBlock({ block }: { block: BlogBodyBlock }) {
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
    case "image":
      return (
        <figure className="mt-10 max-w-[560px]">
          <Image
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            sizes="(min-width: 768px) 560px, calc(100vw - 96px)"
            className="h-auto w-full border border-kk-border-strong"
          />
          <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.12em] text-kk-text/55">
            {block.caption}
          </figcaption>
        </figure>
      );
    default:
      return (
        <p className="mt-6 text-[14px] leading-[1.75] text-kk-text/80 first:mt-0 lg:text-[15px] lg:leading-[1.8]">
          {block.segments.map((segment, index) => (
            <InlineSegment key={`${segment.type}-${index}`} segment={segment} />
          ))}
        </p>
      );
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${site.url}/blog/${article.slug}#article`,
    url: `${site.url}/blog/${article.slug}`,
    mainEntityOfPage: `${site.url}/blog/${article.slug}`,
    headline: article.title,
    description: article.seoDescription,
    inLanguage: "es-CL",
    datePublished: article.publishedAt,
    author: [
      {
        "@type": "Person",
        name: article.author.name,
        url: article.author.website,
      },
      { "@id": `${site.url}/#organization` },
    ],
    publisher: { "@id": `${site.url}/#organization` },
    isPartOf: { "@id": `${site.url}/blog/#blog` },
  };

  return (
    <main className="relative min-h-screen bg-background px-3 font-sans text-kk-text sm:px-6 lg:px-10 2xl:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto w-full max-w-[1132px] border-x border-kk-border bg-kk-canvas lg:max-w-[1240px]">
        <Header currentPath="/blog" />

        <section
          aria-labelledby="article-hero-title"
          className="hero-grid flex min-h-[570px] flex-col items-center border-b border-kk-border px-5 pb-12 pt-20 text-center sm:min-h-[470px] sm:px-10 sm:pb-14 sm:pt-24 lg:min-h-[520px] lg:px-16 lg:pb-16 lg:pt-28"
        >
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-kk-heading/60 lg:text-xs">
            <IconMask
              src="/figma/star.svg"
              className="size-[14px] text-kk-text-strong lg:size-4"
            />
            {article.category}
            {article.collaboration ? " · Colaboración" : ""}
          </p>
          <h1
            id="article-hero-title"
            className="mx-auto mt-6 max-w-[820px] font-serif text-[clamp(2.55rem,10vw,3.25rem)] leading-[0.94] text-kk-heading lg:max-w-[900px] lg:text-[58px]"
          >
            {article.title}
          </h1>
          <p className="mx-auto mt-7 max-w-[670px] text-[14px] leading-[1.6] text-kk-text/70 lg:text-[15.5px] lg:leading-[1.6]">
            {article.subtitle}
          </p>
          <div className="mt-auto flex justify-center pt-12">
            <AvatarByline
              authorImage={article.author.image}
              authorName={article.author.name}
              meta={article.publishedLabel}
              size="lg"
            />
          </div>
        </section>

        <section
          aria-label="Cuerpo del artículo"
          className="border-b border-kk-border px-6 py-16 sm:px-12 lg:px-[72px] lg:py-20"
        >
          <div className="mx-auto max-w-[700px]">
            {article.body.map((block, index) => (
              <ArticleBlock key={`${block.type}-${index}`} block={block} />
            ))}

            <aside className="mt-16 border border-kk-border-strong bg-kk-canvas p-6 shadow-[6px_6px_0_#a2bba2] sm:p-8">
              <AvatarByline
                authorImage={article.author.image}
                authorName={article.author.name}
                meta={article.publishedLabel}
              />
              <p className="mt-5 text-[13px] leading-[1.65] text-kk-text/70">
                {article.authorBio}
              </p>
              <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.13em] text-kk-text/55">
                Publicado originalmente en{" "}
                <a
                  href={article.original.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-kk-heading underline decoration-kk-border-strong underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-kk-focus"
                >
                  {article.original.label} ↗
                </a>{" "}
                · Reproducido con permiso del autor
              </p>
            </aside>

            <aside className="mt-14 flex flex-col gap-7 border-t border-kk-border pt-10 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="max-w-[420px] font-serif text-[clamp(1.6rem,5vw,2rem)] leading-[1.05] text-kk-heading">
                  El blog sigue abierto.
                </h2>
                <p className="mt-4 max-w-[440px] text-[13px] leading-[1.65] text-kk-text/70">
                  Preparamos artículos sobre producto, estrategia y datos para
                  convertir problemas operativos en software útil.
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:shrink-0">
                <PressableLink href="/blog">Volver al blog</PressableLink>
                <PressableLink href="/#servicios" variant="secondary">
                  Ver servicios
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
