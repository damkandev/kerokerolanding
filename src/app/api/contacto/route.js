import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    try {
        const { nombre, correo, servicios, mensaje } = await request.json();

        // Validación básica
        if (!nombre || !correo || !mensaje) {
            return NextResponse.json(
                { error: 'Faltan campos requeridos' },
                { status: 400 }
            );
        }

        // Formatear los servicios para el email
        const serviciosTexto = servicios && servicios.length > 0
            ? servicios.join(', ')
            : 'No especificados';

        // Email de notificación para ti (damian@rodar.cl)
        await resend.emails.send({
            from: 'KeroKero <noreply@email.keroke.ro>',
            to: 'damian@rodar.cl',
            subject: `🐸 Nuevo contacto de ${nombre}`,
            html: `
                <div style="font-family: 'JetBrains Mono', monospace; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #51B85F; font-size: 24px; margin-bottom: 20px;">
                        🐸 Nuevo mensaje de contacto
                    </h1>
                    
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <p style="margin: 0 0 10px 0;"><strong>Nombre:</strong> ${nombre}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Correo:</strong> ${correo}</p>
                        <p style="margin: 0 0 10px 0;"><strong>Servicios:</strong> ${serviciosTexto}</p>
                    </div>
                    
                    <div style="background: #1a1a1a; color: #fff; padding: 20px; border-radius: 8px;">
                        <p style="margin: 0 0 10px 0; color: #51B85F;"><strong>Mensaje:</strong></p>
                        <p style="margin: 0; white-space: pre-wrap;">${mensaje}</p>
                    </div>
                    
                    <p style="margin-top: 20px; color: #666; font-size: 12px;">
                        Responder directamente a: <a href="mailto:${correo}">${correo}</a>
                    </p>
                </div>
            `,
            replyTo: correo,
        });

        // Email de confirmación para el usuario
        await resend.emails.send({
            from: 'KeroKero <noreply@email.keroke.ro>',
            to: correo,
            subject: '🐸 ¡Recibimos tu mensaje! - KeroKero',
            html: `
                <div style="font-family: 'JetBrains Mono', monospace; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #51B85F; font-size: 24px; margin-bottom: 20px;">
                        ¡Hola ${nombre}! 👋
                    </h1>
                    
                    <p style="color: #333; line-height: 1.6;">
                        Recibimos tu mensaje y te responderemos lo antes posible (generalmente en menos de 24 horas).
                    </p>
                    
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                        <p style="margin: 0 0 10px 0; color: #666;"><strong>Lo que nos contaste:</strong></p>
                        <p style="margin: 0 0 10px 0;"><strong>Servicios de interés:</strong> ${serviciosTexto}</p>
                        <p style="margin: 0; white-space: pre-wrap; color: #333;">${mensaje}</p>
                    </div>
                    
                    <p style="color: #333; line-height: 1.6;">
                        Mientras tanto, puedes revisar nuestros <a href="https://keroke.ro/servicios" style="color: #51B85F;">servicios</a> 
                        o conocer más <a href="https://keroke.ro/sobre-nosotros" style="color: #51B85F;">sobre nosotros</a>.
                    </p>
                    
                    <p style="margin-top: 30px; color: #333;">
                        ¡Gracias por contactarnos! 🐸
                    </p>
                    
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    
                    <p style="color: #999; font-size: 12px;">
                        KeroKero - Software Factory Automatizada<br/>
                        <a href="https://keroke.ro" style="color: #51B85F;">keroke.ro</a>
                    </p>
                </div>
            `,
        });

        return NextResponse.json({
            success: true,
            message: 'Emails enviados correctamente'
        });

    } catch (error) {
        console.error('Error enviando email:', error);
        return NextResponse.json(
            { error: 'Error al enviar el mensaje. Por favor intenta de nuevo.' },
            { status: 500 }
        );
    }
}
