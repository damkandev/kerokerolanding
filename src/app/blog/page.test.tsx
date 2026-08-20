import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import BlogPage from "./page";

describe("BlogPage", () => {
  it("presents the editorial position and upcoming articles", () => {
    render(<BlogPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Kerokero explica cómo convertir problemas operativos en software útil.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Compartimos el criterio que suele quedar dentro del proyecto.",
      }),
    ).toBeInTheDocument();

    const latestSection = screen
      .getByRole("heading", { level: 2, name: "Lo último." })
      .closest("section");

    expect(latestSection).not.toBeNull();
    const latest = within(latestSection as HTMLElement);

    expect(
      latest.getByRole("heading", { level: 3, name: "Afuera, no adentro." }),
    ).toBeInTheDocument();
    expect(
      latest.getByRole("link", { name: "Leer artículo" }),
    ).toHaveAttribute("href", "/blog/afuera-no-adentro");
    expect(latest.getAllByText(/Damián/).length).toBeGreaterThan(0);
    expect(latest.getByText("4 de abril de 2026")).toBeInTheDocument();
    expect(latest.queryByText(/Estrategia/)).toBeNull();

    expect(screen.queryByText("Tres temas que estamos preparando.")).toBeNull();
    expect(screen.queryByText("Próximamente")).toBeNull();
    expect(screen.getAllByRole("link", { name: "Blog" })[0]).toHaveAttribute(
      "href",
      "/blog",
    );
    expect(screen.getAllByRole("link", { name: "Blog" })[0]).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Conversemos sobre una decisión importante.",
      }),
    ).toBeInTheDocument();
  });
});
