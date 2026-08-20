"use client";

import { useState, type FormEvent } from "react";
import { PressableButton } from "./PressableButton";

type SubmissionState = "idle" | "sending" | "sent" | "error";
type FieldName = "name" | "email" | "message";
type FieldErrors = Partial<Record<FieldName, string>>;

const fieldClassName =
  "border border-kk-border-strong bg-kk-canvas px-3 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-kk-focus aria-invalid:border-red-700 aria-invalid:bg-red-50";

export function ContactForm() {
  const [submissionState, setSubmissionState] =
    useState<SubmissionState>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function clearFieldError(field: FieldName) {
    setFieldErrors((errors) => {
      if (!errors[field]) return errors;
      const nextErrors = { ...errors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    const name = String(payload.name ?? "").trim();
    const email = String(payload.email ?? "").trim();
    const message = String(payload.message ?? "").trim();
    const errors: FieldErrors = {};

    if (!name) errors.name = "Cuéntanos cómo te llamas.";
    if (!email) {
      errors.email = "Ingresa tu email.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Ingresa un email válido.";
    }
    if (!message) {
      errors.message = "Cuéntanos qué decisión quieres mejorar.";
    } else if (message.length < 20) {
      errors.message = "Agrega un poco más de contexto, al menos 20 caracteres.";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmissionState("idle");
      const firstInvalidField = (Object.keys(errors) as FieldName[])[0];
      const field = form.elements.namedItem(firstInvalidField);
      if (field instanceof HTMLElement) field.focus();
      return;
    }

    setFieldErrors({});
    setSubmissionState("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("No fue posible enviar el formulario");
      }

      form.reset();
      setSubmissionState("sent");
    } catch {
      setSubmissionState("error");
    }
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-left text-xs text-kk-text">
          Nombre
          <input
            name="name"
            autoComplete="name"
            maxLength={100}
            aria-invalid={fieldErrors.name ? true : undefined}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            onChange={() => clearFieldError("name")}
            className={`min-h-11 ${fieldClassName}`}
          />
          {fieldErrors.name ? (
            <span id="contact-name-error" className="text-xs leading-snug text-red-800">
              {fieldErrors.name}
            </span>
          ) : null}
        </label>
        <label className="grid gap-2 text-left text-xs text-kk-text">
          Email
          <input
            type="email"
            name="email"
            autoComplete="email"
            maxLength={254}
            aria-invalid={fieldErrors.email ? true : undefined}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            onChange={() => clearFieldError("email")}
            className={`min-h-11 ${fieldClassName}`}
          />
          {fieldErrors.email ? (
            <span id="contact-email-error" className="text-xs leading-snug text-red-800">
              {fieldErrors.email}
            </span>
          ) : null}
        </label>
      </div>
      <label className="grid gap-2 text-left text-xs text-kk-text">
        Empresa
        <input
          name="company"
          autoComplete="organization"
          maxLength={120}
          className={`min-h-11 ${fieldClassName}`}
        />
      </label>
      <label className="grid gap-2 text-left text-xs text-kk-text">
        ¿Qué decisión quieres mejorar?
        <textarea
          name="message"
          rows={5}
          maxLength={3000}
          aria-invalid={fieldErrors.message ? true : undefined}
          aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
          onChange={() => clearFieldError("message")}
          className={`resize-y py-3 ${fieldClassName}`}
        />
        {fieldErrors.message ? (
          <span id="contact-message-error" className="text-xs leading-snug text-red-800">
            {fieldErrors.message}
          </span>
        ) : null}
      </label>
      <label className="sr-only" aria-hidden="true">
        Sitio web
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <PressableButton
        type="submit"
        disabled={submissionState === "sending"}
        className="mt-1 w-full disabled:cursor-wait disabled:opacity-60"
      >
        {submissionState === "sending" ? "Enviando" : "Enviar mensaje"}
      </PressableButton>
      <p className="min-h-5 text-center text-xs text-kk-text/75" aria-live="polite">
        {submissionState === "sent"
          ? "Mensaje enviado. Te responderemos pronto."
          : null}
        {submissionState === "error"
          ? "No pudimos enviarlo. Intenta nuevamente en unos minutos."
          : null}
      </p>
    </form>
  );
}
