import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const SERVICE_LABELS: Record<string, string> = {
  "reparacion-urgencia": "Reparación de urgencia",
  instalacion: "Instalación de agua",
  calefaccion: "Calefacción y termos",
  mantenimiento: "Mantenimiento preventivo",
  otro: "Otro servicio",
};

export const POST: APIRoute = async ({ request }) => {
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Solicitud inválida." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { nombre, telefono, servicio, mensaje } = body;

  if (!nombre?.trim() || !telefono?.trim() || !mensaje?.trim()) {
    return new Response(
      JSON.stringify({ error: "Faltan campos obligatorios." }),
      { status: 422, headers: { "Content-Type": "application/json" } },
    );
  }

  const servicioLabel = servicio
    ? (SERVICE_LABELS[servicio] ?? servicio)
    : "No especificado";
  const fechaHora = new Date().toLocaleString("es-ES", {
    timeZone: "Atlantic/Canary",
    dateStyle: "full",
    timeStyle: "short",
  });

  const html = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nueva solicitud de presupuesto</title>
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Cabecera -->
          <tr>
            <td style="background:#1a1a2e;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
              <p style="margin:0 0 4px;color:#cf7840;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;">L&amp;M Fontanero Autorizado</p>
              <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">Nueva solicitud de presupuesto</h1>
              <p style="margin:8px 0 0;color:#8b8b9a;font-size:13px;">${fechaHora}</p>
            </td>
          </tr>

          <!-- Cuerpo -->
          <tr>
            <td style="background:#ffffff;padding:36px 40px;">

              <!-- Datos del cliente -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td colspan="2" style="padding-bottom:16px;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b7280;">Datos del cliente</p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:12px 16px;background:#f9fafb;border-radius:8px 0 0 8px;border:1px solid #e5e7eb;border-right:none;">
                    <p style="margin:0 0 2px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Nombre</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">${escapeHtml(nombre)}</p>
                  </td>
                  <td width="50%" style="padding:12px 16px;background:#f9fafb;border-radius:0 8px 8px 0;border:1px solid #e5e7eb;">
                    <p style="margin:0 0 2px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:#9ca3af;">Teléfono</p>
                    <p style="margin:0;font-size:15px;font-weight:600;color:#111827;">
                      <a href="tel:${escapeHtml(telefono)}" style="color:#cf7840;text-decoration:none;">${escapeHtml(telefono)}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Servicio -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td colspan="2" style="padding-bottom:16px;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b7280;">Servicio solicitado</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 18px;background:#fff7ed;border-left:4px solid #cf7840;border-radius:0 8px 8px 0;">
                    <p style="margin:0;font-size:15px;font-weight:600;color:#92400e;">${escapeHtml(servicioLabel)}</p>
                  </td>
                </tr>
              </table>

              <!-- Mensaje -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-bottom:16px;">
                    <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#6b7280;">Descripción del problema</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:18px;background:#f9fafb;border-radius:8px;border:1px solid #e5e7eb;">
                    <p style="margin:0;font-size:14px;line-height:1.7;color:#374151;white-space:pre-wrap;">${escapeHtml(mensaje)}</p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#f9fafb;padding:24px 40px;text-align:center;border:1px solid #e5e7eb;border-top:none;">
              <p style="margin:0 0 16px;font-size:13px;color:#6b7280;">Responde directamente a este cliente</p>
              <a href="https://wa.me/34${telefono.replace(/\D/g, "")}" style="display:inline-block;background:#25d366;color:#ffffff;font-weight:700;font-size:13px;padding:12px 28px;border-radius:8px;text-decoration:none;margin:0 6px;">WhatsApp</a>
              <a href="tel:${escapeHtml(telefono)}" style="display:inline-block;background:#cf7840;color:#ffffff;font-weight:700;font-size:13px;padding:12px 28px;border-radius:8px;text-decoration:none;margin:0 6px;">Llamar</a>
            </td>
          </tr>

          <!-- Pie -->
          <tr>
            <td style="background:#1a1a2e;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#6b7280;">L&amp;M Fontanero Autorizado · Licencia 05-B-D90 · <a href="tel:643368225" style="color:#cf7840;text-decoration:none;">643 368 225</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  const { error } = await resend.emails.send({
    from: "Nuevo presupuesto <onboarding@resend.dev>",
    to: ["david4100ggx@gmail.com"],
    replyTo: undefined,
    subject: `Nuevo presupuesto de ${nombre} — ${servicioLabel}`,
    html,
  });

  if (error) {
    console.error("Resend error:", error);
    return new Response(
      JSON.stringify({
        error: "No se pudo enviar el mensaje. Inténtalo de nuevo.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
