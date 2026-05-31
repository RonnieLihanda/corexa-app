import React from 'react';

export const ClientPortalView: React.FC = () => (
  <section className="cx-section">
    <h2 className="cx-page-title">Client Portal</h2>
    <div className="cx-card-gold">
      <h3 style={{ color: '#F1F5F9', marginTop: 0 }}>Acme SaaS Corp Portal Preview</h3>
      <p className="cx-text-muted">Clients see checklist progress, welcome sequence status, resources, and signature tasks here.</p>
      <div style={{ background: '#1E2535', height: '8px', borderRadius: '4px', margin: '24px 0 8px' }}>
        <div style={{ width: '62%', background: '#F5A623', height: '8px', borderRadius: '4px' }} />
      </div>
      <p className="cx-text-muted">62% complete</p>
    </div>
  </section>
);
