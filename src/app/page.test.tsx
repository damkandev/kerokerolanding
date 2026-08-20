import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Home", () => {
  it("renders the Kerokero landing hero", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Construimos software a medida que tu competencia no puede comprar.",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("KeroKero")).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Conversemos" }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByRole("link", { name: "Servicios" })[0],
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Sobre Nosotros" })[0],
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "Blog" })[0]).toHaveAttribute(
      "href",
      "/blog",
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Segui" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Tu empresa" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Rodar" }),
    ).toBeInTheDocument();
    const caseStudyLinks = screen.getAllByRole("link", { name: /Ver caso/ });
    expect(caseStudyLinks[0]).toHaveAttribute(
      "href",
      "/case-studies/segui",
    );
    expect(caseStudyLinks[1]).toHaveAttribute(
      "href",
      "/case-studies/rodar",
    );
    expect(
      screen.getByRole("heading", { level: 2, name: "Cómo construimos ventaja" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Partimos por una decisión relevante para el negocio. Luego construimos, integramos y medimos el sistema que permite mejorarla.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 3, name: "Tu operación cambia. Tus decisiones también." }),
    ).toBeInTheDocument();
    expect(screen.getByRole("table", { name: "Estado de pacientes y acciones sugeridas" })).toBeInTheDocument();
    expect(screen.getByLabelText("Modelo progresivo de riesgo y prioridad")).toBeInTheDocument();
    expect(screen.getByText("riesgo = f(historial, evolución, contexto)")).toBeInTheDocument();
    expect(screen.getByText(/prioridad = riesgo \+ Δtendencia/)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Conversemos sobre una decisión importante.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Enviar mensaje" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Agendar reunión" }),
    ).toHaveAttribute(
      "href",
      "https://cal.com/damian-panes-rtpp9v/30min",
    );
    for (const step of [
      "Observamos",
      "Identificamos",
      "Construimos",
      "Resultados",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: step }),
      ).toBeInTheDocument();
      expect(
        document.querySelector(`[data-methodology-card="${step}"] svg`),
      ).toBeInTheDocument();
    }
  });

  it("opens and closes the mobile menu accessibly", async () => {
    const user = userEvent.setup();
    render(<Home />);

    const openButton = screen.getByRole("button", { name: "Abrir menú" });
    expect(openButton).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByRole("navigation", { name: "Principal móvil" }),
    ).not.toBeInTheDocument();

    await user.click(openButton);

    const closeButton = screen.getByRole("button", { name: "Cerrar menú" });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("navigation", { name: "Principal móvil" }),
    ).toBeInTheDocument();

    await user.keyboard("{Escape}");

    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveFocus();
    expect(
      screen.queryByRole("navigation", { name: "Principal móvil" }),
    ).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Abrir menú" }));
    await user.click(screen.getAllByRole("link", { name: "Servicios" })[1]);

    expect(screen.getByRole("button", { name: "Abrir menú" })).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });
});
