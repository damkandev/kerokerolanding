import type { Metadata } from "next";

import {
  AvatarByline,
  ContactSection,
  Header,
  IconMask,
  PaperShader,
  PressableLink,
  SiteFooter,
} from "../../components/landing";
import { site } from "../../lib/site";
import { blogArticles } from "./[slug]/content";

const title = "Blog sobre software a medida, datos y producto | Kerokero";
const description =
  "Criterios de producto, datos y arquitectura para convertir problemas operativos en software útil, escritos por el equipo de Kerokero.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "/blog",
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

const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${site.url}/blog/#blog`,
  url: `${site.url}/blog`,
  name: title,
  description,
  inLanguage: "es-CL",
  publisher: {
    "@id": `${site.url}/#organization`,
  },
  about: ["Producto digital", "Datos", "Arquitectura de software"],
};

export default function BlogPage() {
  return (
    <main className="relative min-h-screen bg-background px-3 font-sans text-kk-text sm:px-6 lg:px-10 2xl:px-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto w-full max-w-[1132px] border-x border-kk-border bg-kk-canvas lg:max-w-[1240px]">
        <Header currentPath="/blog" />

        <section
          aria-labelledby="blog-hero-title"
          className="hero-grid flex min-h-[570px] flex-col items-center border-b border-kk-border px-5 pb-12 pt-16 text-center sm:min-h-[470px] sm:px-10 sm:pb-14 sm:pt-20 lg:min-h-[520px] lg:px-16 lg:pb-16 lg:pt-24"
        >
          <h1
            id="blog-hero-title"
            className="mx-auto max-w-[850px] font-serif text-[clamp(2.55rem,10vw,3.25rem)] leading-[0.94] text-kk-heading lg:max-w-[980px] lg:text-[58px]"
          >
            Kerokero explica cómo convertir problemas operativos en software
            útil.
          </h1>
          <p className="mx-auto mt-7 max-w-[690px] text-[14px] leading-[1.6] text-kk-text/70 lg:text-[15.5px]">
            Compartimos criterios de producto, datos y arquitectura nacidos del
            trabajo con empresas de Chile, Argentina y Perú.
          </p>
        </section>

        <section
          aria-labelledby="blog-editorial-title"
          className="border-b border-kk-border px-6 py-16 sm:px-12 lg:px-[72px] lg:py-24"
        >
          <div className="mx-auto max-w-[960px]">
            <h2
              id="blog-editorial-title"
              className="max-w-[790px] font-serif text-[clamp(2.15rem,8vw,3rem)] leading-[0.96] text-kk-heading"
            >
              Compartimos el criterio que suele quedar dentro del proyecto.
            </h2>
            <div className="mt-8 grid gap-5 text-[14px] leading-[1.65] text-kk-text/75 md:grid-cols-2 md:gap-10 lg:text-[15px]">
              <p>
                Un sistema empieza antes del código. El equipo necesita entender
                la operación, elegir una decisión que valga la pena mejorar y
                acordar cómo medirá el resultado.
              </p>
              <p>
                Damián, Felipe y el equipo explican cómo evalúan alternativas,
                convierten datos en señales y construyen herramientas que las
                personas pueden usar en su trabajo.
              </p>
            </div>

          </div>
        </section>

        <section
          aria-labelledby="latest-articles-title"
          className="border-b border-kk-border px-6 py-16 sm:px-12 lg:px-[72px] lg:py-24"
        >
          <div className="mx-auto max-w-[960px]">
            <h2
              id="latest-articles-title"
              className="font-serif text-[clamp(2.15rem,8vw,3rem)] leading-[0.96] text-kk-heading"
            >
              Lo último.
            </h2>
            <p className="mt-5 max-w-[650px] text-[14px] leading-[1.65] text-kk-text/70">
              Publicamos también colaboraciones con autores que escriben del
              modo en que Kerokero construye software.
            </p>

            <div className="mt-12 flex flex-col gap-6">
              {blogArticles.map((article) => (
                <article
                  key={article.slug}
                  className="border border-kk-border-strong bg-kk-canvas p-6 shadow-[6px_6px_0_#a2bba2] sm:p-8 lg:p-10"
                >
                  <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
                    <div className="max-w-[560px]">
                      <h3 className="font-serif text-[clamp(1.9rem,6vw,2.5rem)] leading-[0.98] text-kk-heading">
                        {article.title}
                      </h3>
                      <p className="mt-4 text-[13px] leading-[1.65] text-kk-text/70 lg:text-[14px]">
                        {article.summary}
                      </p>
                    </div>
                    <div className="flex flex-col items-start gap-6 lg:border-l lg:border-kk-border lg:pl-10">
                      <AvatarByline
                        authorImage={article.author.image}
                        authorName={article.author.name}
                        nameLabel={article.author.shortName}
                        meta={article.publishedLabel}
                      />
                      <PressableLink
                        href={`/blog/${article.slug}`}
                        variant="secondary"
                        className="group w-full px-[15px]"
                      >
                        <span className="flex w-full items-center justify-between gap-6">
                          <span>Leer artículo</span>
                          <IconMask
                            src="/figma/arrow.svg"
                            className="size-[14px] transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
                          />
                        </span>
                      </PressableLink>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ContactSection />
        <SiteFooter />
      </div>
      <PaperShader />
    </main>
  );
}
