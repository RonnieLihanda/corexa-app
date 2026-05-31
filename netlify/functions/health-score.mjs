const json = (statusCode, body) => ({
  statusCode,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});

const localScore = ({ last_activity, nps_score = 8, onboarding_pct = 60 }) => {
  const daysSince = Math.floor((Date.now() - new Date(last_activity).getTime()) / 86400000) || 0;
  const score = Math.min(100, Math.max(10, Math.round(onboarding_pct * 0.5 + nps_score * 3.5 + Math.max(0, 30 - daysSince * 2) + 15)));
  const recommendation = score >= 75
    ? 'Client is healthy and engaged. Consider asking for a testimonial or expansion conversation.'
    : score >= 40
      ? 'Client shows moderate risk. Schedule a milestone review and remove onboarding friction.'
      : `Client is critical after ${daysSince} inactive day(s). Trigger re-engagement immediately.`;

  return { score, recommendation };
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const input = JSON.parse(event.body || '{}');
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    return json(200, { ...localScore(input), mode: 'simulated' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
        max_tokens: 400,
        messages: [{
          role: 'user',
          content: `Return only JSON like {"score": 75, "recommendation": "..."} for this client health input: ${JSON.stringify(input)}`,
        }],
      }),
    });

    if (!response.ok) {
      return json(200, { ...localScore(input), mode: 'simulated' });
    }

    const data = await response.json();
    const content = data.content?.[0]?.text || '';
    const parsed = JSON.parse(content.slice(content.indexOf('{'), content.lastIndexOf('}') + 1));
    return json(200, { score: parsed.score, recommendation: parsed.recommendation, mode: 'live' });
  } catch (error) {
    return json(200, { ...localScore(input), mode: 'simulated', warning: String(error) });
  }
};
