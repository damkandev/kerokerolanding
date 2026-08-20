import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "./page";

describe("AboutPage", () => {
  it("presents the Kerokero story, principles, and team", () => {
    render(<AboutPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "En Kerokero, quienes entienden tu operación construyen el sistema.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Fundamos Kerokero para acortar la distancia entre el negocio y el código.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Ver casos de éxito" }),
    ).toHaveAttribute("href", "/#servicios");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Mantenemos el contexto del negocio en cada decisión del proyecto.",
      }),
    ).toBeInTheDocument();

    for (const principle of [
      "Observamos antes de construir",
      "Los socios se hacen cargo",
      "La operación define el sistema",
      "Tu empresa conserva el control",
    ]) {
      expect(
        screen.getByRole("heading", { level: 3, name: principle }),
      ).toBeInTheDocument();
    }

    expect(
      screen.getByRole("img", { name: "Damián Panes, CEO de Kerokero" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Felipe Figueroa, CTO de Kerokero" }),
    ).toBeInTheDocument();

    for (const member of [
      "Lautaro Villalba",
      "Josue Palma",
      "Agustin Altamirano",
      "Jesus Rojas",
      "Ivan Belasich",
      "Marilyn Cellis",
    ]) {
      expect(screen.getByText(member)).toBeInTheDocument();
    }

    expect(
      screen.getAllByRole("link", { name: "Sobre Nosotros" })[0],
    ).toHaveAttribute("aria-current", "page");
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Conversemos sobre una decisión importante.",
      }),
    ).toBeInTheDocument();
  });
});
