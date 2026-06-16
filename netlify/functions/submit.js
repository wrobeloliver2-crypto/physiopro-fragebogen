// Netlify Function: empfängt Fragebogen-Antworten und mailt sie via Microsoft Graph.
// Benötigte ENV-Variablen (im Netlify-Dashboard / .env-Import):
//   AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET
//   MAIL_SENDER     -> sendendes Postfach (oliver.wrobel@pilatescompany.de)
//   MAIL_RECIPIENT  -> Empfänger (oliver.wrobel@pilatescompany.de)
//   MAIL_CC         -> CC-Empfänger (hanna.wrobel@pilatescompany.de)

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  let payload;
  try {
    payload = await req.json();
  } catch (e) {
    return new Response('Bad Request', { status: 400 });
  }

  const name = payload.name || 'Unbekannt';
  const questionnaire = payload.questionnaire || 'Fragebogen';
  const answers = payload.answers || {};

  const TENANT = Netlify.env.get('AZURE_TENANT_ID');
  const CLIENT = Netlify.env.get('AZURE_CLIENT_ID');
  const SECRET = Netlify.env.get('AZURE_CLIENT_SECRET');
  const SENDER = Netlify.env.get('MAIL_SENDER');
  const RECIPIENT = Netlify.env.get('MAIL_RECIPIENT');
  const CC = Netlify.env.get('MAIL_CC');

  if (!TENANT || !CLIENT || !SECRET || !SENDER || !RECIPIENT) {
    return new Response('Server not configured', { status: 500 });
  }

  // 1) Access-Token via Client Credentials holen
  let token;
  try {
    const tokenRes = await fetch(
      `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0/token`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          client_id: CLIENT,
          client_secret: SECRET,
          scope: 'https://graph.microsoft.com/.default',
          grant_type: 'client_credentials',
        }),
      }
    );
    const tokenJson = await tokenRes.json();
    if (!tokenRes.ok) {
      console.error('Token error', tokenJson);
      return new Response('Auth failed', { status: 502 });
    }
    token = tokenJson.access_token;
  } catch (e) {
    console.error(e);
    return new Response('Auth request failed', { status: 502 });
  }

  // 2) HTML-Mail-Body aus den Antworten bauen
  const esc = (s) =>
    String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const rows = Object.keys(answers)
    .map(
      (k) =>
        `<tr>
           <td style="padding:8px 12px;background:#E3F0EC;font-weight:600;color:#1f4a40;vertical-align:top;width:38%;border-bottom:1px solid #fff;">${esc(k)}</td>
           <td style="padding:8px 12px;border-bottom:1px solid #eee;">${esc(answers[k]).replace(/\n/g, '<br>')}</td>
         </tr>`
    )
    .join('');

  const html = `
    <div style="font-family:Arial,sans-serif;color:#1d2520;max-width:640px;">
      <h2 style="color:#2E6B5E;">${esc(questionnaire)} – ${esc(name)}</h2>
      <p style="color:#5f6b66;">Eingegangen über das PhysioPro Fragebogen-Tool.</p>
      <table style="border-collapse:collapse;width:100%;font-size:14px;">${rows}</table>
    </div>`;

  // 3) Mail via Graph sendMail verschicken
  try {
    const mailRes = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(SENDER)}/sendMail`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: {
            subject: `${questionnaire}: ${name}`,
            body: { contentType: 'HTML', content: html },
            toRecipients: [{ emailAddress: { address: RECIPIENT } }],
            ccRecipients: CC ? [{ emailAddress: { address: CC } }] : [],
          },
          saveToSentItems: true,
        }),
      }
    );
    if (!mailRes.ok) {
      const t = await mailRes.text();
      console.error('sendMail error', t);
      return new Response('Send failed', { status: 502 });
    }
  } catch (e) {
    console.error(e);
    return new Response('Send request failed', { status: 502 });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const config = {
  path: '/.netlify/functions/submit',
};
