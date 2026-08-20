import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { seguiCaseStudy } from "./content";
import SeguiCaseStudyPage, { generateMetadata } from "./page";

describe("SeguiCaseStudyPage", () => {
  it("presents the Segui case study with correct structure", async () => {
    const study = seguiCaseStudy;

    render(await SeguiCaseStudyPage());

    expect(
      screen.getByRole("heading", { level: 1, name: study.title }),
    ).toBeInTheDocument();

    // Verify key headings from the content
    const h2Headings = study.body.filter((block) => block.type === "heading2");
    for (const heading of h2Headings) {
      if (heading.type === "heading2") {
        expect(
          screen.getByRole("heading", { level: 2, name: heading.text }),
        ).toBeInTheDocument();
      }
    }

    // Verify navigation links
    expect(
      screen.getByRole("link", { name: "Ver servicios" }),
    ).toHaveAttribute("href", "/#servicios");
    expect(screen.getByRole("link", { name: "Ver el caso Rodar" })).toHaveAttribute(
      "href",
      "/case-studies/rodar",
    );

    // Verify CTA section
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Conversemos sobre tu operación.",
      }),
    ).toBeInTheDocument();
  });

  it("builds crawlable metadata for Segui", async () => {
    const study = seguiCaseStudy;
    const metadata = await generateMetadata();

    expect(metadata.title).toBe(study.seoTitle);
    expect(metadata.description).toBe(study.seoDescription);
    expect(metadata.alternates?.canonical).toBe(`/case-studies/${study.slug}`);
    expect(metadata.openGraph?.url).toBe(`/case-studies/${study.slug}`);
  });

  it("renders code blocks correctly", async () => {
    render(await SeguiCaseStudyPage());

    // Verify that code blocks are rendered (checking for <pre> elements)
    const codeBlocks = screen.getAllByRole("generic").filter(
      (el) => el.tagName === "PRE"
    );
    expect(codeBlocks.length).toBeGreaterThan(0);
  });

  it("renders list items correctly", async () => {
    render(await SeguiCaseStudyPage());

    // Verify that lists are rendered
    const lists = screen.getAllByRole("list");
    expect(lists.length).toBeGreaterThan(0);
  });
});
