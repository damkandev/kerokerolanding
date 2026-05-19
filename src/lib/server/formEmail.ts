const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RESEND_FROM = "KeroKero <web@kerokero.cl>";
export const RESEND_TO = "damian@kerokero.cl";

export function getResendApiKey() {
  return import.meta.env.RESEND_API_KEY?.trim() || null;
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function textToHtml(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

export function isValidEmail(value: string) {
  return EMAIL_PATTERN.test(value);
}

export function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
