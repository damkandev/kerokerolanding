import { site } from "../../lib/site";
import { ContactForm } from "./ContactForm";
import { PressableLink } from "./PressableButton";

export function ContactSection() {
  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="feature-card-grid border-y border-kk-border-strong px-6 py-14 sm:px-12 lg:px-[90px] lg:py-20"
    >
      <div className="mx-auto max-w-[980px] text-center">
        <h2
          id="contact-title"
          className="font-serif text-[clamp(2.15rem,9vw,3rem)] leading-[0.93] text-kk-heading"
        >
          Conversemos sobre una decisión importante.
        </h2>
        <p className="mx-auto mt-5 max-w-[620px] text-[14px] leading-[1.55] text-kk-text/75">
          Cuéntanos dónde tu equipo pierde tiempo, contexto o capacidad de
          anticiparse. Revisamos el problema contigo y evaluamos si un sistema
          a medida puede mover el resultado.
        </p>
        <div className="mt-10 grid gap-6 text-left lg:grid-cols-[minmax(0,1.25fr)_minmax(300px,0.75fr)]">
          <article className="border border-kk-border-strong bg-kk-canvas p-5 shadow-[5px_5px_0_#a2bba2] sm:p-7">
            <h3 className="font-serif text-2xl text-kk-heading">Escríbenos</h3>
            <p className="mb-6 mt-2 text-xs leading-relaxed text-kk-text/70">
              Danos el contexto necesario para hacer una primera lectura del problema.
            </p>
            <ContactForm />
          </article>
          <article className="flex flex-col border border-kk-border-strong bg-kk-canvas p-5 shadow-[5px_5px_0_#a2bba2] sm:p-7">
            <h3 className="font-serif text-2xl text-kk-heading">
              Agenda 30 minutos
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-kk-text/70">
              Si prefieres conversar, elige el horario que mejor te acomode.
            </p>
            <PressableLink
              href={site.meetingUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-8 w-full lg:mt-auto"
            >
              Agendar reunión
            </PressableLink>
          </article>
        </div>
      </div>
    </section>
  );
}
