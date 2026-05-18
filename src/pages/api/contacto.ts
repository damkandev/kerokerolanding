import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
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

  const { error } = await resend.emails.send({
    from: 'KeroKero <contacto@web.kerokero.cl>',
    to: ['damian@kerokero.cl'],
    replyTo: email,
    subject: `Nuevo contacto: ${nombre}`,
    html: `
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Empresa:</strong> ${empresa}</p>
      <p><strong>Teléfono:</strong> ${pais} ${telefono}</p>
      <hr />
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje.replace(/\n/g, '<br />')}</p>
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
