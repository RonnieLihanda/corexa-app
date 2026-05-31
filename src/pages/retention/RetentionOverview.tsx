import React from 'react';
import { Link } from 'react-router-dom';

const stats = [
  ['ACTIVE CLIENTS', '0'],
  ['AT RISK', '0'],
  ['AVG HEALTH', '—'],
  ['NPS SCORE', '—'],
];

const modules = [
  ['❤️', 'Health Scores', 'Monitor dynamic client health and engagement signals.', '/retention/health'],
  ['📊', 'NPS Surveys', 'Collect feedback and automate lifecycle survey loops.', '/retention/nps'],
  ['🚨', 'Churn Alerts', 'Spot risky accounts and trigger re-engagement.', '/retention/alerts'],
  ['📈', 'Metrics', 'Review retention performance and account trends.', '/retention/metrics'],
];

export const RetentionOverview: React.FC = () => (
  <section className="cx-section">
    <h2 className="cx-page-title">Retention</h2>
    <div className="cx-grid-4" style={{ marginBottom: '32px' }}>
      {stats.map(([label, number]) => (
        <div className="cx-card" key={label}>
          <span className="cx-label">{label}</span>
          <div className="cx-stat-number">{number}</div>
        </div>
      ))}
    </div>
    <div className="cx-grid-2">
      {modules.map(([icon, title, description, path]) => (
        <Link to={path} key={title} className="cx-card-gold" style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F5A62320', border: '1px solid #F5A62340', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>{icon}</div>
          <h3 style={{ color: '#F1F5F9', fontSize: '16px', fontWeight: 700, margin: '0 0 8px' }}>{title}</h3>
          <p className="cx-text-muted" style={{ lineHeight: 1.7 }}>{description}</p>
          <span className="cx-gold" style={{ fontSize: '13px' }}>View →</span>
        </Link>
      ))}
    </div>
  </section>
);
