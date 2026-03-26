import ScrollReveal from '@/components/ScrollReveal';

export default function PainPointSection() {
  return (
    <section className="h-screen flex items-center justify-center px-4 sm:px-6" aria-label="Solución">
      <ScrollReveal y={80} opacity={0} className='flex flex-col items-center justify-center max-w-[700px] mx-auto'>
        <p className="font-jetbrains font-medium text-base sm:text-lg lg:text-xl text-center px-4">
          Todo dueño de una empresa, sabe que hay un proceso que podría ser mejor y <span className="text-[#51B85F]">no te deja dormir</span>.
        </p>
        <img src="/ojos.png" alt="" className="w-[200px] sm:w-[280px] lg:w-[350px] max-w-[70vw] object-contain mt-6" />
      </ScrollReveal>
    </section>
  );
}
