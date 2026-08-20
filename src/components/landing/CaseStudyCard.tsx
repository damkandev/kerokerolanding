import type { CaseStudy } from "./data";
import { IconMask } from "./IconMask";
import { PressableLink } from "./PressableButton";

export function CaseStudyCard({ card }: { card: CaseStudy }) {
  return (
    <article
      className={
        card.featured
          ? "feature-card-grid flex flex-col border border-kk-border-strong p-[23px] shadow-[5px_5px_0_#a2bba2] lg:min-h-[435px] lg:p-[25px]"
          : "flex min-h-[215px] flex-col px-[23px] pb-[23px] lg:min-h-[237px] lg:px-[25px] lg:pb-[25px] lg:pt-0"
      }
    >
      <div className="flex items-center gap-2 lg:gap-[9px]">
        {card.icon ? (
          <IconMask src={card.icon} className="size-[23px] text-kk-text-strong lg:size-[25px]" />
        ) : null}
        <h2
          className={`font-serif text-[20.52px] leading-[0.93] text-kk-text-strong lg:text-[22.5px] ${
            card.weight ?? "font-normal"
          }`}
        >
          {card.title}
        </h2>
      </div>

      <p
        className={`whitespace-pre-line font-sans text-[10.86px] leading-[14px] text-kk-text lg:text-xs lg:leading-[15.5px] ${
          card.featured ? "mt-[10px] lg:mt-[11px]" : "mt-[31px] lg:mt-[34px]"
        }`}
      >
        {card.copy}
      </p>

      {card.featured ? (
        <PressableLink href={card.href} className="mt-5 w-full lg:mt-auto">
          Evaluemos tu caso
        </PressableLink>
      ) : (
        <PressableLink
          href={card.href}
          variant="secondary"
          className="group mt-auto w-full px-[15px]"
        >
          <span className="flex w-full items-center justify-between gap-6">
            <span>Ver caso</span>
            <IconMask
              src="/figma/arrow.svg"
              className="size-[14px] transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </span>
        </PressableLink>
      )}
    </article>
  );
}
