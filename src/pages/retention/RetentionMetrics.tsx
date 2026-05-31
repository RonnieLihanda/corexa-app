import React from 'react';

export const RetentionMetrics: React.FC = () => (
  <section className="cx-section">
    <h2 className="cx-page-title">Metrics</h2>
    <div className="cx-grid-3">
      {['Active Clients', 'Churn Risk', 'NPS Trend'].map((label) => (
        <div className="cx-card" key={label}>
          <span className="cx-label">{label}</span>
          <div className="cx-stat-number">—</div>
          <p className="cx-text-muted">Connect data sources to populate this metric.</p>
        </div>
      ))}
    </div>
  </section>
);
