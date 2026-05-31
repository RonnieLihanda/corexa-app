const json = (statusCode, body) => ({
  statusCode,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const input = JSON.parse(event.body || '{}');
  const apiKey = process.env.RESEND_API_KEY || process.env.VITE_RESEND_API_KEY;

  if (!apiKey) {
    return json(200, {
      success: true,
      id: `mock-email-${Date.now()}`,
      mode: 'simulated',
    });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${apiKey}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || 'Corexa Operations <onboarding@corexa.io>',
        to: [process.env.COREXA_TEST_RECIPIENT || 'founder@example.com'],
        subject: input.subject,
        html: `<div style="font-family:Inter,Arial,sans-serif;line-height:1.6">${String(input.body || '').replace(/\n/g, '<br />')}</div>`,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      return json(502, { success: false, error: data });
    }

    return json(200, { success: true, id: data.id, mode: 'live' });
  } catch (error) {
    return json(500, { success: false, error: String(error) });
  }
};
