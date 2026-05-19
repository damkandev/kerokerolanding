import type { APIRoute } from 'astro';
import { Buffer } from 'node:buffer';
import { Resend } from 'resend';
import {
  RESEND_FROM,
  RESEND_TO,
  escapeHtml,
  getResendApiKey,
  isValidEmail,
  jsonResponse,
  textToHtml,
} from '../../lib/server/formEmail';

export const prerender = false;

const MAX_CV_BYTES = 5 * 1024 * 1024;

export const POST: APIRoute = async ({ request }) => {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    return jsonResponse({ error: 'Falta configurar RESEND_API_KEY.' }, 500);
  }

  const resend = new Resend(apiKey);
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

  if (!isValidEmail(email)) {
    return jsonResponse({ error: 'Email inválido.' }, 400);
  }

  const cvName = cv.name?.trim() || '';
  const isPdfName = cvName.toLowerCase().endsWith('.pdf');
  const isPdfMime = cv.type === 'application/pdf';

  if (!(cv instanceof File) || !isPdfName || !isPdfMime) {
    return jsonResponse({ error: 'El CV debe ser un archivo PDF.' }, 400);
  }

  if (cv.size > MAX_CV_BYTES) {
    return jsonResponse({ error: 'El CV no puede superar 5 MB.' }, 400);
  }

  const safeNombre = escapeHtml(nombre);
  const safeEmail = escapeHtml(email);
  const safeLinkedin = escapeHtml(linkedin);
  const safePortfolio = escapeHtml(portfolio);
  const safeMensaje = textToHtml(mensaje);

  const cvBuffer = await cv.arrayBuffer();

  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to: [RESEND_TO],
    replyTo: email,
    subject: `Nueva postulación: ${nombre}`,
    html: `
      <p><strong>Nombre:</strong> ${safeNombre}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>LinkedIn:</strong> ${safeLinkedin}</p>
      <p><strong>Portfolio / GitHub:</strong> ${safePortfolio}</p>
      <hr />
      <p><strong>Mensaje:</strong></p>
      <p>${safeMensaje}</p>
    `,
    attachments: [
      {
        filename: cvName || 'cv.pdf',
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
