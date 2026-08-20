export function Hero() {
  return (
    <section className="hero-grid flex min-h-[640px] flex-col items-center border-b border-kk-border px-5 pb-14 pt-20 text-center sm:min-h-[425px] sm:px-8 sm:pb-[68px] sm:pt-[84px] lg:min-h-[466px] lg:pb-[75px] lg:pt-[92px]">
      <h1 className="mx-auto max-w-[737px] font-serif text-[clamp(2.55rem,11vw,2.875rem)] leading-[0.93] text-kk-heading sm:text-[44.31px] lg:max-w-[810px] lg:text-5xl">
        Construimos software a medida que tu competencia no puede comprar.
      </h1>
      <p className="mx-auto mt-6 max-w-[599px] font-sans text-[14px] leading-[1.47] text-kk-text/70 sm:mt-5 lg:max-w-[660px] lg:text-[15.5px] lg:leading-[23px]">
        Convertimos los datos y la experiencia de tu empresa en sistemas
        propios que anticipan riesgos, priorizan oportunidades y ayudan a tu
        equipo a decidir antes y con más precisión.
      </p>
      <p className="mt-auto font-sans text-[10.86px] leading-none text-kk-text lg:text-xs">
        Estamos en <span aria-hidden="true">🇨🇱</span> Chile{" "}
        <span aria-hidden="true">🇦🇷</span> Argentina{" "}
        <span aria-hidden="true">🇵🇪</span> Perú
      </p>
    </section>
  );
}
