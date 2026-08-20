const sourceNodes = [
  { label: "Registros", detail: "Situación legal" },
  { label: "Vehículo", detail: "Condición observada" },
  { label: "Mercado", detail: "Precio y rotación" },
] as const;

const decisionRows = [
  {
    finding: "Prenda o restricción",
    signal: "Riesgo legal",
    decision: "Detener o regularizar",
  },
  {
    finding: "Kilometraje inconsistente",
    signal: "Identidad en duda",
    decision: "Revisar o descartar",
  },
  {
    finding: "Falla con costo conocido",
    signal: "Margen corregido",
    decision: "Negociar el precio",
  },
  {
    finding: "Baja rotación esperada",
    signal: "Capital inmovilizado",
    decision: "Ajustar la oferta",
  },
] as const;

function Arrow({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-2 py-2 text-kk-heading lg:px-1 lg:py-0">
      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-kk-text/45 lg:sr-only">
        {label}
      </span>
      <span aria-hidden="true" className="text-xl leading-none max-lg:rotate-90">
        →
      </span>
    </div>
  );
}

function DataChainChart() {
  return (
    <div
      role="img"
      aria-label="Tres fuentes de información convergen en el modelo diseñado por Kerokero y producen una evaluación para comprar, negociar o descartar un vehículo."
      className="border border-kk-border-strong bg-kk-canvas p-5 sm:p-7"
    >
      <div className="grid items-stretch lg:grid-cols-[1fr_auto_1.05fr_auto_1fr]">
        <div className="grid gap-2">
          {sourceNodes.map((node) => (
            <div key={node.label} className="border border-kk-border bg-white/65 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading">
                {node.label}
              </p>
              <p className="mt-1 text-[12px] leading-[1.45] text-kk-text/65">
                {node.detail}
              </p>
            </div>
          ))}
        </div>

        <Arrow label="Se normalizan" />

        <div className="flex flex-col justify-center border-2 border-kk-border-strong bg-kk-brand/25 p-5 text-center shadow-[5px_5px_0_#a2bba2]">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-kk-text/55">
            Modelo Kerokero
          </p>
          <p className="mt-3 font-serif text-[1.65rem] leading-none text-kk-heading">
            Identidad → señales → criterios
          </p>
          <p className="mt-3 text-[12px] leading-[1.55] text-kk-text/65">
            Cada dato conserva su fuente y adquiere un efecto operacional.
          </p>
        </div>

        <Arrow label="Se evalúan" />

        <div className="grid gap-2">
          {["Comprar", "Negociar", "Descartar"].map((decision, index) => (
            <div
              key={decision}
              className="flex items-center gap-3 border border-kk-border-strong bg-kk-brand/35 p-4"
            >
              <span className="font-mono text-[10px] text-kk-text/45">
                0{index + 1}
              </span>
              <span className="font-serif text-xl text-kk-heading">{decision}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SignalDecisionChart() {
  return (
    <div className="overflow-hidden border border-kk-border-strong" role="group" aria-label="Matriz de señales y decisiones">
      <div className="hidden grid-cols-[1.15fr_1fr_1.2fr] border-b border-kk-border-strong bg-kk-brand/25 font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading sm:grid">
        <p className="p-3">Hallazgo</p>
        <p className="border-l border-kk-border-strong p-3">Señal</p>
        <p className="border-l border-kk-border-strong p-3">Decisión</p>
      </div>
      {decisionRows.map((row) => (
        <div
          key={row.finding}
          className="grid border-b border-kk-border last:border-b-0 sm:grid-cols-[1.15fr_1fr_1.2fr]"
        >
          <div className="p-4">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-kk-text/45 sm:hidden">
              Hallazgo
            </p>
            <p className="mt-1 text-[13px] leading-[1.5] text-kk-text/75 sm:mt-0">
              {row.finding}
            </p>
          </div>
          <div className="border-t border-kk-border bg-kk-brand/15 p-4 sm:border-l sm:border-t-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-kk-text/45 sm:hidden">
              Señal
            </p>
            <p className="mt-1 text-[13px] leading-[1.5] text-kk-heading sm:mt-0">
              {row.signal}
            </p>
          </div>
          <div className="border-t border-kk-border bg-kk-brand/18 p-4 sm:border-l sm:border-t-0">
            <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-kk-text/45 sm:hidden">
              Decisión
            </p>
            <p className="mt-1 text-[13px] leading-[1.5] text-kk-heading sm:mt-0">
              {row.decision}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

const capitalSteps = [
  {
    index: "01",
    title: "Evaluar",
    copy: "Riesgo, precio y rotación antes de comprar.",
  },
  {
    index: "02",
    title: "Incorporar",
    copy: "La unidad entra con un valor y un escenario.",
  },
  {
    index: "03",
    title: "Valorizar",
    copy: "La flota reúne el capital observado.",
  },
  {
    index: "04",
    title: "Financiar",
    copy: "El inventario respalda nuevas compras.",
  },
] as const;

function CapitalCycleChart() {
  return (
    <div
      role="img"
      aria-label="Ciclo de capital: evaluar un vehículo, incorporarlo al inventario, valorizar la flota y financiar nuevas compras."
      className="kk-grid-bg border border-kk-border-strong p-5 sm:p-8"
    >
      <div className="grid gap-3 sm:grid-cols-2">
        {capitalSteps.map((step) => (
          <div key={step.title} className="flex min-h-[170px] flex-col border border-kk-border-strong bg-kk-canvas p-5">
            <p className="font-serif text-[1.65rem] leading-none text-kk-heading">
              {step.title}
            </p>
            <p className="mt-3 text-[12px] leading-[1.5] text-kk-text/65">{step.copy}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-center font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading/60">
        La siguiente compra parte con más contexto
      </p>
    </div>
  );
}

export function RodarChart({
  chartType,
}: {
  chartType: "dataChain" | "signalDecision" | "capitalCycle";
}) {
  if (chartType === "dataChain") return <DataChainChart />;
  if (chartType === "signalDecision") return <SignalDecisionChart />;
  return <CapitalCycleChart />;
}
