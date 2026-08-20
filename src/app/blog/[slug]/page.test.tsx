import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { blogArticles, getBlogArticle } from "./content";
import BlogArticlePage, { generateMetadata, generateStaticParams } from "./page";

const slugs = blogArticles.map((article) => article.slug);

function paramsFor(slug: string) {
  return { params: Promise.resolve({ slug }) };
}

describe("BlogArticlePage", () => {
  it("exposes every article as a static param", () => {
    expect(generateStaticParams()).toEqual(
      blogArticles.map((article) => ({ slug: article.slug })),
    );
  });

  it.each(slugs)("presents the %s article", async (slug) => {
    const article = getBlogArticle(slug);
    if (!article) {
      throw new Error(`Missing content for ${slug}`);
    }

    render(await BlogArticlePage(paramsFor(slug)));

    expect(
      screen.getByRole("heading", { level: 1, name: article.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(article.subtitle)).toBeInTheDocument();
    expect(
      screen.getAllByText(/Damián Panes/).length,
    ).toBeGreaterThan(0);
    expect(screen.getAllByText(article.publishedLabel).length).toBeGreaterThan(
      0,
    );

    for (const block of article.body) {
      if (block.type === "heading2") {
        expect(
          screen.getByRole("heading", { level: 2, name: block.text }),
        ).toBeInTheDocument();
      }
      if (block.type === "heading3") {
        expect(
          screen.getByRole("heading", { level: 3, name: block.text }),
        ).toBeInTheDocument();
      }
    }

    expect(
      screen.getByRole("link", { name: `${article.original.label} ↗` }),
    ).toHaveAttribute("href", article.original.url);
    expect(
      screen.getByRole("link", { name: "Volver al blog" }),
    ).toHaveAttribute("href", "/blog");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Conversemos sobre una decisión importante.",
      }),
    ).toBeInTheDocument();
  });

  it.each(slugs)("builds crawlable metadata for %s", async (slug) => {
    const article = getBlogArticle(slug);
    if (!article) {
      throw new Error(`Missing content for ${slug}`);
    }

    const metadata = await generateMetadata(paramsFor(slug));

    expect(metadata.title).toBe(article.seoTitle);
    expect(metadata.description).toBe(article.seoDescription);
    expect(metadata.alternates?.canonical).toBe(`/blog/${slug}`);
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: `/blog/${slug}`,
    });
  });
});
