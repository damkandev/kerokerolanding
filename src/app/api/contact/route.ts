const contactEmail = "damkancontacto@gmail.com";
const defaultFromEmail = "KeroKero <contacto@mail.kerokero.cl>";
const maxRequestBytes = 20_000;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  message?: unknown;
  website?: unknown;
};

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

const cleanSingleLineText = (value: unknown, maxLength: number) =>
  cleanText(value, maxLength).replace(/\s+/g, " ");

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > maxRequestBytes) {
    return Response.json({ error: "Solicitud demasiado grande" }, { status: 413 });
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return Response.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const name = cleanSingleLineText(payload.name, 100);
  const email = cleanText(payload.email, 254).toLowerCase();
  const company = cleanSingleLineText(payload.company, 120);
  const message = cleanText(payload.message, 3000);
  const website = cleanText(payload.website, 200);

  if (website) {
    return Response.json({ ok: true });
  }

  if (
    !name ||
    !/^\S+@\S+\.\S+$/.test(email) ||
    message.length < 20
  ) {
    return Response.json({ error: "Completa los campos requeridos" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL?.trim() || defaultFromEmail;
  if (!apiKey) {
    return Response.json(
      { error: "El formulario no está configurado" },
      { status: 503 },
    );
  }

  const text = [
    `Nombre: ${name}`,
    `Email: ${email}`,
    `Empresa: ${company || "No indicada"}`,
    "",
    "Decisión que quiere mejorar:",
    message,
  ].join("\n");

  let resendResponse: Response;
  try {
    resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
        "User-Agent": "kerokero-landing/1.0",
      },
      body: JSON.stringify({
        from,
        to: [contactEmail],
        reply_to: email,
        subject: `Nuevo contacto web: ${name}`,
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
  } catch {
    return Response.json({ error: "No fue posible enviar el mensaje" }, { status: 502 });
  }

  if (!resendResponse.ok) {
    return Response.json({ error: "No fue posible enviar el mensaje" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
