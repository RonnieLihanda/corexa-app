import React from 'react';

const clients = [
  ['Acme SaaS Corp', 'SaaS Platforms', 82, '2 days ago'],
  ['Vertex E-commerce', 'E-commerce', 58, '5 days ago'],
  ['Horizon Biotech', 'Biotech', 30, '16 days ago'],
] as const;

const scoreColor = (score: number) => score > 70 ? '#10B981' : score >= 40 ? '#F59E0B' : '#EF4444';

export const HealthScores: React.FC = () => (
  <section className="cx-section">
    <h2 className="cx-page-title">Client Health Scores</h2>
    <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap', marginBottom: '24px' }}>
      <span className="cx-text-muted">🟢 Healthy (70-100)</span>
      <span className="cx-text-muted">🟡 At Risk (40-69)</span>
      <span className="cx-text-muted">🔴 Critical (0-39)</span>
    </div>

    <div className="cx-grid-3">
      {clients.map(([name, industry, score, activity]) => (
        <div className="cx-card" key={name}>
          <h3 style={{ color: '#F1F5F9', fontWeight: 700, margin: '0 0 4px' }}>{name}</h3>
          <p className="cx-text-muted" style={{ fontSize: '12px', margin: '0 0 18px' }}>{industry}</p>
          <div style={{ color: scoreColor(score), fontSize: '44px', fontWeight: 800, lineHeight: 1 }}>{score}</div>
          <div style={{ background: '#1E2535', height: '6px', borderRadius: '3px', margin: '16px 0' }}>
            <div style={{ width: `${score}%`, background: scoreColor(score), height: '6px', borderRadius: '3px' }} />
          </div>
          <p className="cx-text-muted">Last activity: {activity}</p>
          {score < 40 && <button className="cx-btn-primary" type="button" style={{ marginTop: '12px' }}>Send Re-engagement</button>}
        </div>
      ))}
    </div>
  </section>
);
