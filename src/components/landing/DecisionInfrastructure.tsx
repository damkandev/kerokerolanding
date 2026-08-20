"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { IconMask } from "./IconMask";
import { PressableLink } from "./PressableButton";

type Signals = {
  history: number;
  evolution: number;
  context: number;
  capacity: number;
};

type Patient = {
  id: string;
  signals: Signals;
  trend: "estable" | "↑" | "↑↑" | "↓";
  previous?: {
    signals: Signals;
    trend: "estable" | "↑" | "↑↑" | "↓";
  };
};

const calculateRisk = ({ history, evolution, context }: Signals) =>
  0.5 * history + 0.3 * evolution + 0.2 * context;

const trendAdjustment: Record<Patient["trend"], number> = {
  estable: 0,
  "↑": 0.03,
  "↑↑": 0.06,
  "↓": -0.03,
};

const calculatePriority = (risk: number, trend: Patient["trend"], capacity: number) =>
  Math.min(1, Math.max(0, risk + trendAdjustment[trend] + 0.04 * (1 - capacity)));

const getAction = (risk: number, trend: Patient["trend"], capacity: number) => {
  const priority = calculatePriority(risk, trend, capacity);
  if (priority >= 0.85) return "priorizar";
  if (priority >= 0.6) return "revisar";
  if (trend === "↓") return "continuar";
  return "observar";
};

const initialPatients: Patient[] = [
  {
    id: "P-1042",
    signals: { history: 0.25, evolution: 0.3, context: 0.45, capacity: 0.8 },
    trend: "estable",
    previous: { signals: { history: 0.6, evolution: 0.7, context: 0.7, capacity: 0.9 }, trend: "↑" },
  },
  {
    id: "P-1187",
    signals: { history: 0.64, evolution: 0.85, context: 0.925, capacity: 0.5 },
    trend: "↑",
    previous: { signals: { history: 0.5, evolution: 0.4, context: 0.85, capacity: 0.8 }, trend: "estable" },
  },
  {
    id: "P-1204",
    signals: { history: 0.82, evolution: 0.9, context: 1, capacity: 0.3 },
    trend: "↑↑",
    previous: { signals: { history: 0.8, evolution: 0.8, context: 0.3, capacity: 0.6 }, trend: "↑" },
  },
  {
    id: "P-1251",
    signals: { history: 0.4, evolution: 0.4, context: 0.5, capacity: 0.7 },
    trend: "↓",
    previous: { signals: { history: 0.5, evolution: 0.6, context: 0.4, capacity: 0.5 }, trend: "estable" },
  },
  {
    id: "P-1286",
    signals: { history: 0.6, evolution: 0.4, context: 0.75, capacity: 0.9 },
    trend: "estable",
    previous: { signals: { history: 0.7, evolution: 0.8, context: 0.5, capacity: 0.65 }, trend: "↑" },
  },
  {
    id: "P-1312",
    signals: { history: 0.7, evolution: 0.8, context: 0.5, capacity: 0.7 },
    trend: "↑",
    previous: { signals: { history: 0.4, evolution: 0.6, context: 0.4, capacity: 0.9 }, trend: "estable" },
  },
];

const expandingColumns = [
  { key: "history", label: "Historial", value: (signals: Signals) => signals.history },
  { key: "context", label: "Contexto", value: (signals: Signals) => signals.context },
  { key: "evolution", label: "Evolución", value: (signals: Signals) => signals.evolution },
  { key: "capacity", label: "Capacidad", value: (signals: Signals) => signals.capacity },
] as const;

const clampSignal = (value: number) => Math.min(1, Math.max(0, value));

const evolveSignal = (value: number) => {
  const distance = 0.025 + Math.random() * 0.055;
  const direction = Math.random() < 0.5 ? -1 : 1;
  const candidate = value + distance * direction;
  return clampSignal(candidate < 0 || candidate > 1 ? value - distance * direction : candidate);
};

const getTrendFromEvolution = (previous: number, current: number): Patient["trend"] => {
  const change = current - previous;
  if (change > 0.06) return "↑↑";
  if (change > 0) return "↑";
  if (change < -0.025) return "↓";
  return "estable";
};

const getCellAnimationStyle = (row: number, column: number) => ({
  "--cell-delay": `${((row * 7 + column) % 10) * 70}ms`,
}) as CSSProperties;

function DecisionSheetTable({ patients, version }: { patients: Patient[]; version: number }) {
  return (
    <table aria-label="Estado de pacientes y acciones sugeridas" className="decision-sheet-table">
      <thead><tr>
        <th scope="col">Paciente</th><th scope="col">Riesgo</th><th scope="col">Tendencia</th><th scope="col">Acción</th>
        {expandingColumns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
      </tr></thead>
      <tbody>{patients.map((patient, rowIndex) => {
        const risk = calculateRisk(patient.signals);
        const previousRisk = patient.previous ? calculateRisk(patient.previous.signals) : null;
        const action = getAction(risk, patient.trend, patient.signals.capacity);
        const previousAction = patient.previous
          ? getAction(previousRisk ?? risk, patient.previous.trend, patient.previous.signals.capacity)
          : null;

        return <tr key={patient.id} className={patient.id === "P-1204" ? "decision-sheet-priority-row" : undefined}>
          <td>{patient.id}</td>
          <td key={`risk-${version}`} className="decision-sheet-cell-change" style={getCellAnimationStyle(rowIndex, 0)}>{patient.previous ? <span className="decision-sheet-value"><span>{previousRisk?.toFixed(2)}</span><span>{risk.toFixed(2)}</span></span> : risk.toFixed(2)}</td>
          <td key={`trend-${version}`} className="decision-sheet-cell-change" style={getCellAnimationStyle(rowIndex, 1)}>{patient.previous ? <span className="decision-sheet-value"><span>{patient.previous.trend}</span><span>{patient.trend}</span></span> : patient.trend}</td>
          <td key={`action-${version}`} className="decision-sheet-cell-change" style={getCellAnimationStyle(rowIndex, 2)}>{patient.previous ? <span className="decision-sheet-value"><span>{previousAction}</span><span>{action}</span></span> : action}</td>
          {expandingColumns.map((column, columnIndex) => (
            <td key={`${column.key}-${version}`} className="decision-sheet-cell-change" style={getCellAnimationStyle(rowIndex, columnIndex + 3)}>
              <span className="decision-sheet-value">
                <span>{column.value(patient.previous?.signals ?? patient.signals).toFixed(2)}</span>
                <span>{column.value(patient.signals).toFixed(2)}</span>
              </span>
            </td>
          ))}
        </tr>;
      })}</tbody>
    </table>
  );
}

export function DecisionInfrastructure() {
  const [{ patients, version }, setSnapshot] = useState({
    patients: initialPatients,
    version: 0,
  });

  useEffect(() => {
    if (
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    const interval = window.setInterval(() => {
      setSnapshot((snapshot) => ({
        version: snapshot.version + 1,
        patients: snapshot.patients.map((patient) => {
          const signals = {
            history: evolveSignal(patient.signals.history),
            evolution: evolveSignal(patient.signals.evolution),
            context: evolveSignal(patient.signals.context),
            capacity: evolveSignal(patient.signals.capacity),
          };

          return {
            id: patient.id,
            signals,
            trend: getTrendFromEvolution(patient.signals.evolution, signals.evolution),
            previous: {
              signals: patient.signals,
              trend: patient.trend,
            },
          };
        }),
      }));
    }, 2000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="datos-a-decisiones" aria-labelledby="infrastructure-title" className="decision-infrastructure">
      <div className="methodology-banner-grid grid min-h-[160px] items-center gap-6 border-b border-kk-border-strong px-6 py-8 sm:min-h-[131px] sm:grid-cols-[minmax(0,1fr)_400px] sm:px-12 sm:py-6 lg:min-h-36 lg:grid-cols-[minmax(0,1fr)_440px] lg:px-[53px] lg:py-[26px]">
        <div className="flex items-center gap-5">
          <IconMask src="/icons/atom.svg" className="size-8 shrink-0 text-kk-heading lg:size-[35px]" />
          <h2 id="infrastructure-title" className="font-serif text-[clamp(2.05rem,8vw,2.4rem)] leading-[0.93] text-kk-heading sm:text-[34.45px] lg:text-[38px]">
            De datos a decisiones
          </h2>
        </div>
        <p className="max-w-[400px] font-sans text-[10.86px] leading-[14px] text-kk-text sm:justify-self-end lg:max-w-[440px] lg:text-xs lg:leading-[15.5px]">
          Reunimos la información, incorporamos criterios de negocio y la convertimos en una herramienta que tu equipo puede usar todos los días.
        </p>
      </div>

      <div className="grid lg:grid-cols-2">
        <div className="decision-sheet-grid min-h-[577px] overflow-hidden border-b border-kk-border-strong lg:min-h-[634px] lg:border-r lg:border-b-0">
          <div className="decision-sheet-scroll">
            <DecisionSheetTable patients={patients} version={version} />
          </div>
          <div className="decision-sheet-formula" aria-label="Modelo progresivo de riesgo y prioridad">
            <p className="decision-sheet-formula-stage decision-sheet-formula-stage-one">
              riesgo = f(historial, evolución, contexto)
            </p>
            <p className="decision-sheet-formula-stage decision-sheet-formula-stage-two">
              riesgo = 0.5 × <span className="decision-sheet-formula-history">historial</span> + 0.3 × {" "}
              <span className="decision-sheet-formula-evolution">evolución</span> + 0.2 × {" "}
              <span className="decision-sheet-formula-context">contexto</span>
            </p>
            <p className="decision-sheet-formula-stage decision-sheet-formula-stage-three">
              prioridad = riesgo + Δtendencia + 0.04 × (1 − capacidad)
              <span className="decision-sheet-rules">≥ 0.85: priorizar · ≥ 0.60: revisar · ↓ y &lt; 0.60: continuar</span>
            </p>
          </div>
        </div>

        <div className="flex min-h-[577px] items-center px-8 py-14 sm:px-14 lg:min-h-[634px] lg:px-[90px]">
          <div className="w-full max-w-[400px] lg:max-w-[440px]">
            <h3 className="font-serif text-[27.92px] leading-[0.93] text-kk-heading lg:text-[31px]">
              Tu operación cambia. Tus decisiones también.
            </h3>
            <p className="mt-[11px] font-sans text-[10.86px] leading-[14px] text-kk-text lg:mt-3 lg:text-xs lg:leading-[15.5px]">
              Una planilla puede mostrar lo que ocurrió. Nosotros construimos sistemas que leen lo que está pasando, detectan cambios relevantes y señalan dónde actuar ahora.
            </p>
            <PressableLink
              href="#contacto"
              className="mt-[27px] w-full sm:max-w-[239px] lg:mt-[30px] lg:max-w-[263px]"
            >
              Conversemos
            </PressableLink>
          </div>
        </div>
      </div>
    </section>
  );
}
