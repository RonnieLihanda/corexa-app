import React from 'react';

export const WelcomeSequences: React.FC = () => (
  <section className="cx-section">
    <h2 className="cx-page-title">Welcome Sequences</h2>
    <div className="cx-card-gold">
      <h3 style={{ color: '#F1F5F9', marginTop: 0 }}>AI-powered onboarding emails</h3>
      <p className="cx-text-muted">Configure day 1, 3, 7, and 14 email sequences for new clients.</p>
      <button className="cx-btn-primary" type="button" style={{ marginTop: '16px' }}>Create Sequence</button>
    </div>
  </section>
);
