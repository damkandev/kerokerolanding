import { IconMask } from "./IconMask";

const decisions = [
  ["Anticipar demanda", "Planificar ventas, inventario, capacidad y carga operativa con mejor información."],
  ["Detectar riesgos", "Reconocer antes qué clientes, operaciones o activos requieren atención."],
  ["Priorizar oportunidades", "Concentrar tiempo y recursos donde pueden generar mayor impacto."],
  ["Detectar anomalías", "Encontrar errores, fraude o desvíos antes de que escalen en costo."],
  ["Entender clientes", "Identificar patrones de compra, recurrencia, uso y abandono para actuar con contexto."],
  ["Aumentar capacidad", "Reducir tareas manuales y cuellos de botella sin ampliar innecesariamente el equipo."],
];

export function DecisionAreas() {
  return (
    <section
      aria-labelledby="decision-areas-title"
      className="decision-areas border-b border-kk-border"
    >
      <div className="decision-areas-feature kk-grid-bg relative flex min-h-[349px] items-end justify-center overflow-hidden border border-kk-border-strong px-6 pb-14 text-center sm:px-10 lg:min-h-[383px] lg:pb-[62px]">
        <div aria-hidden="true" className="decision-areas-arch" />
        <div className="relative z-10 flex w-full max-w-[420px] flex-col items-center text-kk-canvas">
          <IconMask src="/icons/bridge.svg" className="size-8 lg:size-[35px]" />
          <h2
            id="decision-areas-title"
            className="mt-3 font-serif text-[clamp(2rem,9vw,2.25rem)] leading-[0.93] lg:text-[39.5px]"
          >
            Decisiones que generan ventaja
          </h2>
          <p className="mt-3 max-w-[290px] font-sans text-[10.86px] leading-[14px] sm:max-w-[407px] lg:max-w-[448px] lg:text-xs lg:leading-[15.5px]">
            Aplicamos datos, modelos y software donde decidir mejor puede mover un resultado importante para tu empresa.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 border-b border-kk-border sm:grid-cols-2 lg:grid-cols-3">
        {decisions.map(([title, copy]) => (
          <article key={title} className="min-h-[97px] border-b border-kk-border px-[17px] py-[17px] lg:min-h-[107px] lg:px-[19px] lg:py-[19px]">
            <h3 className="font-serif text-[20.52px] font-bold leading-[0.93] text-kk-heading lg:text-[22.5px]">
              {title}
            </h3>
            <p className="mt-[9px] max-w-[344px] font-sans text-[10.86px] leading-[14px] text-kk-text lg:mt-[10px] lg:max-w-[378px] lg:text-xs lg:leading-[15.5px]">
              {copy}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
