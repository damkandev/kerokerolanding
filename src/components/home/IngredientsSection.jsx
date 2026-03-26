import ScrollReveal from '@/components/ScrollReveal';

export default function IngredientsSection() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-x-hidden" aria-label="Problema">
      <ScrollReveal y={80} opacity={0} className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8 lg:gap-12">
        <img src="/ingredientes.png" alt="" className="w-[72vw] max-w-[320px] sm:w-[280px] lg:w-[350px] object-contain shrink-0" />
        <p className="font-jetbrains font-medium text-base sm:text-lg lg:text-xl w-full max-w-[500px] text-left leading-relaxed px-1 sm:px-2 lg:px-0">
          Tú eliges los ingredientes (<span className="text-[#51B85F]">funciones</span>) que creas que hoy tu empresa necesita para poder crecer.
        </p>
      </ScrollReveal>
    </section>
  );
}
