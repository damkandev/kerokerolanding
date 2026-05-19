import type { APIRoute } from 'astro';
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

export const POST: APIRoute = async ({ request }) => {
  const apiKey = getResendApiKey();
  if (!apiKey) {
    return jsonResponse({ error: 'Falta configurar RESEND_API_KEY.' }, 500);
  }

  const resend = new Resend(apiKey);
  const data = await request.formData();

  const nombre = data.get('nombre')?.toString().trim();
  const email = data.get('email')?.toString().trim();
  const empresa = data.get('empresa')?.toString().trim() || '—';
  const pais = data.get('pais')?.toString().trim() || '';
  const telefono = data.get('telefono')?.toString().trim();
  const mensaje = data.get('mensaje')?.toString().trim();

  if (!nombre || !email || !mensaje) {
    return new Response(JSON.stringify({ error: 'Campos requeridos incompletos.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!isValidEmail(email)) {
    return jsonResponse({ error: 'Email inválido.' }, 400);
  }

  const safeNombre = escapeHtml(nombre);
  const safeEmail = escapeHtml(email);
  const safeEmpresa = escapeHtml(empresa);
  const safePais = escapeHtml(pais);
  const safeTelefono = escapeHtml(telefono || '—');
  const safeMensaje = textToHtml(mensaje);

  const { error } = await resend.emails.send({
    from: RESEND_FROM,
    to: [RESEND_TO],
    replyTo: email,
    subject: `Nuevo contacto: ${nombre}`,
    html: `
      <p><strong>Nombre:</strong> ${safeNombre}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Empresa:</strong> ${safeEmpresa}</p>
      <p><strong>Teléfono:</strong> ${safePais} ${safeTelefono}</p>
      <hr />
      <p><strong>Mensaje:</strong></p>
      <p>${safeMensaje}</p>
    `,
  });

  if (error) {
    console.error('[resend error]', error);
    return new Response(JSON.stringify({ error: 'Error al enviar el mensaje.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
