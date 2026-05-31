const json = (statusCode, body) => ({
  statusCode,
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify(body),
});

const fallbackContent = ({ topic, platform, business_type, tone }) => {
  const brandTone = tone || 'professional';

  if (platform === 'email') {
    return `Subject: Scaling ${business_type} with better systems\n\nDear Founder,\n\nYour funding gives you speed, but operational systems give you leverage. ${topic} is one of those areas where clear workflows compound fast.\n\nCorexa helps teams convert that momentum into repeatable marketing, onboarding, and retention loops.\n\nBest,\nCorexa Operations`;
  }

  if (platform === 'blog') {
    return `## ${topic}: A Corexa Field Note for ${business_type}\n\nFunded teams grow faster when their internal systems mature at the same pace as their market ambition. For ${business_type}, ${topic} is not just a marketing theme; it is an operating discipline.\n\nThis piece explores the workflow, customer touchpoints, and retention signals founders should watch first.`;
  }

  return `Scaling ${business_type}? Let's talk about ${topic}.\n\nThe teams that win after funding are not only louder in market. They are more consistent: tighter onboarding, faster follow-up, cleaner retention signals, and content that sounds ${brandTone} without slowing the team down.\n\nCorexa turns those moving pieces into one operating engine.\n\n#Corexa #StartupGrowth #${business_type.replace(/\s+/g, '')}`;
};

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed' });
  }

  const input = JSON.parse(event.body || '{}');
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY;

  if (!apiKey) {
    return json(200, { content: fallbackContent(input), mode: 'simulated' });
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
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `Write high-converting ${input.platform} copy for a ${input.business_type} startup.\nTopic: ${input.topic}\nTone: ${input.tone}\nReturn only the finished copy.`,
        }],
      }),
    });

    if (!response.ok) {
      return json(200, { content: fallbackContent(input), mode: 'simulated' });
    }

    const data = await response.json();
    return json(200, { content: data.content?.[0]?.text || fallbackContent(input), mode: 'live' });
  } catch (error) {
    return json(200, { content: fallbackContent(input), mode: 'simulated', warning: String(error) });
  }
};
