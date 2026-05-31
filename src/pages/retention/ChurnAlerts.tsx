import React from 'react';

export const ChurnAlerts: React.FC = () => (
  <section className="cx-section">
    <h2 className="cx-page-title">Churn Alerts</h2>
    <div className="cx-card">
      <div style={{ borderLeft: '4px solid #EF4444', background: '#1A0E0E', borderRadius: '8px', padding: '16px' }}>
        <h3 style={{ color: '#EF4444', marginTop: 0 }}>Critical Churn Warning</h3>
        <p className="cx-text-muted">Horizon Biotech onboarding inactive. Health score critical. Send re-engagement.</p>
        <button className="cx-btn-primary" type="button">Send Re-engagement</button>
      </div>
    </div>
  </section>
);
