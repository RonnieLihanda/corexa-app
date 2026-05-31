/**
 * Corexa AI Integration Layer (Anthropic Claude API)
 * Model: claude-sonnet-4-20250514
 */

export interface GenerationInput {
  topic: string;
  platform: string;
  business_type: string;
  tone: string;
}

export interface HealthScoreInput {
  last_activity: string;
  nps_score: number;
  onboarding_pct: number;
}

/**
 * Generates custom copy utilizing Claude Sonnet or premium local fallback generators.
 */
export const generateContent = async (input: GenerationInput): Promise<string> => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || localStorage.getItem('corexa_anthropic_key');
  
  if (apiKey) {
    try {
      // Direct call to Anthropic API using a proxy or client-side fetch (requires CORS allowance or endpoint proxy)
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'dangerously-allow-browser': 'true' // For client side direct connection in development
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            {
              role: 'user',
              content: `You are an expert copywriter building a post for a ${input.business_type} startup.
              Topic: ${input.topic}
              Platform Channel: ${input.platform}
              Brand Voice Tone: ${input.tone}
              
              Write highly engaging and converting copy tailored specifically to this channel. Do not include extra comments, intros or wrappers, output only the completed copy directly.`
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.content[0]?.text || 'No response returned from Claude.';
      }
    } catch (e) {
      console.warn('Claude API request error, falling back to local generator', e);
    }
  }

  // Realistic, highly-tailored local generator fallback
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const { topic, platform, business_type } = input;

  if (platform === 'linkedin') {
    return `🚀 Scaling ${business_type} Operations: Let's talk about ${topic}.\n\nAt Mic3 Solution Group, we've studied funded team structures, and the consensus is clear: having capital gives you speed, but setting up standard automated loops gives you leverage.\n\nHere are 3 critical checkpoints for your operations this quarter:\n\n1️⃣ Automate document intake - Reminding clients to upload files manually eats hours of account manager time.\n2️⃣ Track customer NPS early - Capturing sentiment at Day 30 lets you fix friction points before they become churn risks.\n3️⃣ Calculate engagement vectors - Keep close track of client logins and progress dashboards.\n\nWhat are your biggest bottlenecks this quarter? Let's discuss in the comments below! 👇\n\n#StartupScaling #${business_type.replace(/\s+/g, '')} #Corexa #Operations`;
  }

  if (platform === 'email') {
    return `Subject: The Founder's Blueprint: Navigating ${topic} 📈\n\nDear Partner,\n\nFirst off, congratulations on your recent capital raise! The clock is now officially ticking, and scaling your ${business_type} efficiently is the number one priority.\n\nToday, we are highlighting a subject crucial to your timeline: "${topic}". We see many early stage teams waste valuable developer hours building custom trackers when they should be focusing on product-market fit.\n\nHere's what our research shows:\n- Teams that deploy self-serve client checklist portals double their onboarding speeds.\n- Integrating automated NPS loops reduces early lifecycle churn by 40%.\n\nWe would love to coordinate your onboarding roadmap. Simply log back into your portal or reply here to coordinate a strategy call.\n\nBest regards,\nRonnie Lihanda\nMic3 Solution Group`;
  }

  if (platform === 'blog') {
    return `### Chapter 1: The Modern Founder's Guide to ${topic} in ${business_type} Space\n\nWhen a startup raises its seed round, the instinct is to immediately double headcount and spend aggressively on lead generation. However, experienced operators know that rapid expansion without system optimization is a recipe for high churn.\n\nIn this analysis, we tackle the core challenges of "${topic}". By standardizing client portals and automating milestone checks early on, you create a robust structure designed to support scale.\n\nLet's break down the mathematical metrics of customer retention...`;
  }

  return `📣 Quick update on ${topic} for our ${business_type} community!\n\nBuilding a premium product requires clear boundaries and absolute consistency. With Corexa, you can automate checklists, generate copy, and analyze client risk profiles seamlessly. Learn more at corexa.io!`;
};

/**
 * Calculates client health score and fetches recommendation.
 */
export const calculateHealthScore = async (input: HealthScoreInput): Promise<{ score: number; recommendation: string }> => {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY || localStorage.getItem('corexa_anthropic_key');
  
  if (apiKey) {
    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
          'dangerously-allow-browser': 'true'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          messages: [
            {
              role: 'user',
              content: `Evaluate the client health score (0-100) and provide a 2-sentence recommendation based on these parameters:
              Days since last activity: ${Math.floor((Date.now() - new Date(input.last_activity).getTime()) / (1000 * 60 * 60 * 24))},
              NPS Rating: ${input.nps_score},
              Onboarding completion percentage: ${input.onboarding_pct}%
              
              Output ONLY a JSON block in this exact format: {"score": 75, "recommendation": "your recommendation here"}`
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.content[0]?.text || '';
        const parsed = JSON.parse(content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1));
        return {
          score: parsed.score || 70,
          recommendation: parsed.recommendation || 'Activity parameters are optimal.'
        };
      }
    } catch (e) {
      console.warn('Claude API request error on health score, falling back to local auditor', e);
    }
  }

  // Local Auditor Fallback
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const daysSince = Math.floor((Date.now() - new Date(input.last_activity).getTime()) / (1000 * 60 * 60 * 24)) || 0;
  
  // Calculate score based on parameters
  const onboardingWeight = input.onboarding_pct * 0.5;
  const npsWeight = input.nps_score * 3.5;
  const activityPenalty = Math.max(0, 30 - daysSince * 2);
  const calculatedScore = Math.min(100, Math.max(10, Math.round(onboardingWeight + npsWeight + activityPenalty + 15)));

  const recommendation = calculatedScore >= 75
    ? 'Client is highly engaged and completing checklist items rapidly. Excellent candidate to request testimonials or prompt for upgrade package.'
    : calculatedScore >= 40
      ? 'Onboarding progress is steady but activity has cooled off slightly. Schedule a standard checkpoints review to check for any friction points.'
      : `Urgent alert! Client health index is critical. They have spent ${daysSince} days inactive with incomplete checklists. Dispatch outbound re-engagement emails immediately.`;

  return {
    score: calculatedScore,
    recommendation
  };
};
