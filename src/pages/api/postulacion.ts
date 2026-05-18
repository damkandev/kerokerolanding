import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const data = await request.formData();

  const nombre = data.get('nombre')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const linkedin = data.get('linkedin')?.toString().trim() || '—';
  const portfolio = data.get('portfolio')?.toString().trim() || '—';
  const mensaje = data.get('mensaje')?.toString().trim() || '—';
  const cv = data.get('cv') as File | null;

  if (!nombre || !email || !cv) {
    return new Response(JSON.stringify({ error: 'Campos requeridos incompletos.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const cvBuffer = await cv.arrayBuffer();

  const { error } = await resend.emails.send({
    from: 'KeroKero <web@kerokero.cl>',
    to: ['damian@kerokero.cl'],
    replyTo: email,
    subject: `Nueva postulación: ${nombre}`,
    html: `
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>LinkedIn:</strong> ${linkedin}</p>
      <p><strong>Portfolio / GitHub:</strong> ${portfolio}</p>
      <hr />
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje.replace(/\n/g, '<br />')}</p>
    `,
    attachments: [
      {
        filename: cv.name || 'cv.pdf',
        content: Buffer.from(cvBuffer),
      },
    ],
  });

  if (error) {
    return new Response(JSON.stringify({ error: 'Error al enviar la postulación.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
