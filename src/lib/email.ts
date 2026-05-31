/**
 * Corexa Email Integration Layer (Resend API)
 */

export interface EmailDispatchPayload {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

/**
 * Dispatches an email campaign using Resend API or premium local log mock.
 */
export const sendCampaignEmail = async (payload: EmailDispatchPayload): Promise<{ success: boolean; id?: string; error?: unknown }> => {
  const apiKey = import.meta.env.VITE_RESEND_API_KEY || localStorage.getItem('corexa_resend_key');
  const fromEmail = payload.from || 'Corexa Operations <onboarding@corexa.io>';

  if (apiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [payload.to],
          subject: payload.subject,
          html: `<div style="font-family: sans-serif; background-color: #0A0A0F; color: #F1F5F9; padding: 24px; border-radius: 12px; border: 1px solid #1E2535;">
            <div style="font-size: 20px; font-weight: bold; color: #F5A623; margin-bottom: 16px; letter-spacing: 1px;">COREXA</div>
            <div style="font-size: 14px; line-height: 1.6; color: #E1E5F9; white-space: pre-line;">${payload.body}</div>
            <hr style="border: 0; border-top: 1px solid #1E2535; margin-top: 24px; margin-bottom: 12px;" />
            <div style="font-size: 10px; color: #5F6575;">© 2026 Corexa by Mic3 Solution Group. Powered by Resend API.</div>
          </div>`
        })
      });

      if (response.ok) {
        const data = await response.json();
        return { success: true, id: data.id };
      } else {
        const errorData = await response.json();
        console.warn('Resend dispatch error', errorData);
        return { success: false, error: errorData };
      }
    } catch (e) {
      console.warn('Resend API request failed, falling back to mock logger', e);
    }
  }

  // Realistic mock dispatch logger
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  console.log('%c[Resend Email Mock Dispatch]', 'color: #F5A623; font-weight: bold;', {
    from: fromEmail,
    to: payload.to,
    subject: payload.subject,
    body: payload.body,
    timestamp: new Date().toISOString()
  });

  return { 
    success: true, 
    id: 'mock-email-id-' + Math.random().toString(36).substr(2, 9) 
  };
};
