import React from 'react';

const docs = ['Articles of Incorporation', 'Corporate W-9 Form', 'Cap Table Ledger', 'Compliance Signature Contract'];

export const DocChecklist: React.FC = () => (
  <section className="cx-section">
    <h2 className="cx-page-title">Document Manager</h2>
    <div className="cx-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '16px', flexWrap: 'wrap' }}>
        <h3 style={{ color: '#F1F5F9', margin: 0 }}>Required Documents</h3>
        <button className="cx-btn-primary" type="button">+ Add Document</button>
      </div>
      {docs.map((doc) => (
        <div key={doc} style={{ background: '#0A0A0F', border: '1px solid #1E2535', borderRadius: '8px', padding: '16px', marginBottom: '12px', display: 'flex', justifyContent: 'space-between', gap: '16px', alignItems: 'center' }}>
          <div>
            <strong style={{ color: '#F1F5F9' }}>{doc}</strong>
            <p className="cx-text-muted" style={{ margin: '6px 0 0' }}>Pending client upload or review.</p>
          </div>
          <span className="cx-gold" style={{ fontSize: '12px' }}>Review →</span>
        </div>
      ))}
    </div>
  </section>
);
