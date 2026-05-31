import React from 'react';

export const NPSBuilder: React.FC = () => (
  <section className="cx-section">
    <h2 className="cx-page-title">NPS Surveys</h2>
    <div className="cx-grid-2">
      <div className="cx-card">
        <h3 style={{ color: '#F1F5F9', marginTop: 0 }}>Survey Builder</h3>
        <span className="cx-label">Question</span>
        <textarea className="cx-input" rows={4} defaultValue="How likely are you to recommend Corexa to another funded startup founder?" style={{ marginBottom: '20px' }} />
        <button className="cx-btn-primary" type="button">Save Survey</button>
      </div>
      <div className="cx-card-gold">
        <h3 style={{ color: '#F1F5F9', marginTop: 0 }}>Recent Responses</h3>
        <p className="cx-text-muted">No NPS responses logged yet.</p>
      </div>
    </div>
  </section>
);
