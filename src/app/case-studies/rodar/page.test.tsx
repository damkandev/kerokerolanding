import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import RodarCaseStudyPage, { metadata } from "./page";
import { rodarCaseStudy } from "./content";

describe("RodarCaseStudyPage", () => {
  it("presents the Rodar case as an independent technical article", () => {
    render(<RodarCaseStudyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: rodarCaseStudy.title }),
    ).toBeInTheDocument();

    const headings = rodarCaseStudy.body.filter((block) => block.type === "heading2");
    for (const heading of headings) {
      expect(
        screen.getByRole("heading", { level: 2, name: heading.text }),
      ).toBeInTheDocument();
    }

    expect(screen.getAllByRole("figure").length).toBeGreaterThanOrEqual(6);
    expect(screen.getByRole("link", { name: "Ver el caso Segui" })).toHaveAttribute(
      "href",
      "/case-studies/segui",
    );
  });

  it("exposes crawlable metadata", () => {
    expect(metadata.title).toBe(rodarCaseStudy.seoTitle);
    expect(metadata.description).toBe(rodarCaseStudy.seoDescription);
    expect(metadata.alternates?.canonical).toBe("/case-studies/rodar");
    expect(metadata.openGraph?.url).toBe("/case-studies/rodar");
  });
});
