interface TimeAllocationData {
  before: { manual: number; decisions: number; medical: number };
  after: { manual: number; decisions: number; medical: number };
}

interface CapacityData {
  before: { capacity: number; cost: number };
  after: { capacity: number; cost: number };
}

interface BeforeAfterMetric {
  label: string;
  before: string;
  after: string;
  improvement: string;
}

interface BeforeAfterData {
  metrics: BeforeAfterMetric[];
}

function TimeAllocationChart({ data }: { data: TimeAllocationData }) {
  const { before, after } = data;
  const total = 100;

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      {/* Before */}
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading/60">
          Antes
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div
              className="h-8 border border-kk-border-strong bg-[#c44536]"
              style={{ width: `${(before.manual / total) * 100}%` }}
            />
            <span className="text-[13px] text-kk-text/70">{before.manual}h manual</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="h-8 border border-kk-border-strong bg-[#e8b44f]"
              style={{ width: `${(before.decisions / total) * 100}%` }}
            />
            <span className="text-[13px] text-kk-text/70">{before.decisions}h decisiones</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="h-8 border border-kk-border-strong bg-[#4a7c59]"
              style={{ width: `${(before.medical / total) * 100}%` }}
            />
            <span className="text-[13px] text-kk-text/70">{before.medical}h criterio médico</span>
          </div>
        </div>
      </div>

      {/* After */}
      <div>
        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading/60">
          Después
        </p>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div
              className="h-8 border border-kk-border-strong bg-[#c44536]"
              style={{ width: `${(after.manual / total) * 100}%` }}
            />
            <span className="text-[13px] text-kk-text/70">{after.manual}h manual</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="h-8 border border-kk-border-strong bg-[#e8b44f]"
              style={{ width: `${(after.decisions / total) * 100}%` }}
            />
            <span className="text-[13px] text-kk-text/70">{after.decisions}h decisiones</span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="h-8 border border-kk-border-strong bg-[#4a7c59]"
              style={{ width: `${(after.medical / total) * 100}%` }}
            />
            <span className="text-[13px] text-kk-text/70">{after.medical}h criterio médico</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CapacityChart({ data }: { data: CapacityData }) {
  const { before, after } = data;
  const maxCapacity = Math.max(before.capacity, after.capacity);

  return (
    <div className="grid gap-8 sm:grid-cols-2">
      <div className="border border-kk-border-strong bg-kk-canvas p-6">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading/60">
          Antes
        </p>
        <div className="mb-6">
          <div
            className="border border-kk-border-strong bg-[#4a7c59]"
            style={{ height: `${(before.capacity / maxCapacity) * 120}px` }}
          />
        </div>
        <p className="text-[24px] font-bold text-kk-heading">{before.capacity}</p>
        <p className="text-[12px] text-kk-text/60">altas manejables</p>
        <p className="mt-3 text-[12px] text-kk-text/60">{before.cost}h/mes trabajo manual</p>
      </div>

      <div className="border border-kk-border-strong bg-kk-canvas p-6">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading/60">
          Después
        </p>
        <div className="mb-6">
          <div
            className="border border-kk-border-strong bg-[#4a7c59]"
            style={{ height: `${(after.capacity / maxCapacity) * 120}px` }}
          />
        </div>
        <p className="text-[24px] font-bold text-kk-heading">{after.capacity}</p>
        <p className="text-[12px] text-kk-text/60">altas manejables</p>
        <p className="mt-3 text-[12px] text-kk-text/60">{after.cost}h/mes (solo prioritarios)</p>
      </div>
    </div>
  );
}

function BeforeAfterChart({ data }: { data: BeforeAfterData }) {
  return (
    <div className="overflow-x-auto border border-kk-border-strong">
      <table className="w-full">
        <thead>
          <tr className="border-b border-kk-border-strong bg-kk-canvas">
            <th className="p-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading/60">
              Métrica
            </th>
            <th className="p-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading/60">
              Antes
            </th>
            <th className="p-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading/60">
              Después
            </th>
            <th className="p-3 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-kk-heading/60">
              Mejora
            </th>
          </tr>
        </thead>
        <tbody>
          {data.metrics.map((metric, index) => (
            <tr
              key={index}
              className="border-b border-kk-border-strong last:border-0"
            >
              <td className="p-3 text-[13px] text-kk-text/80">{metric.label}</td>
              <td className="p-3 font-mono text-[13px] text-kk-text/60">{metric.before}</td>
              <td className="p-3 font-mono text-[13px] text-kk-heading">{metric.after}</td>
              <td className="p-3 font-mono text-[13px] text-[#4a7c59]">
                {metric.improvement}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ChartBlock({
  chartType,
  data,
  caption,
}: {
  chartType: "beforeAfter" | "capacity" | "timeAllocation";
  data: Record<string, unknown>;
  caption: string;
}) {
  return (
    <figure className="my-10">
      {chartType === "timeAllocation" && (
        <TimeAllocationChart data={data as unknown as TimeAllocationData} />
      )}
      {chartType === "capacity" && <CapacityChart data={data as unknown as CapacityData} />}
      {chartType === "beforeAfter" && <BeforeAfterChart data={data as unknown as BeforeAfterData} />}
      <figcaption className="mt-4 text-[12px] leading-[1.6] text-kk-text/60">
        {caption}
      </figcaption>
    </figure>
  );
}
