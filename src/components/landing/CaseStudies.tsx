import { caseStudies } from "./data";
import { CaseStudyCard } from "./CaseStudyCard";

export function CaseStudies() {
  return (
    <section
      id="servicios"
      aria-label="Casos de estudio"
      className="grid gap-12 border-b border-kk-border px-6 py-12 sm:px-10 lg:grid-cols-[repeat(3,313px)] lg:items-start lg:justify-center lg:gap-4 lg:px-0 lg:py-9"
    >
      {caseStudies.map((card) => (
        <CaseStudyCard key={card.title} card={card} />
      ))}
    </section>
  );
}
