import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone } from 'lucide-react';

const stats = [
  ['TOTAL LEADS', '0', 'Leads captured', '/marketing/leads', 'Manage Leads →'],
  ['CONTENT QUEUE', '0', 'Scheduled pieces', '/marketing/calendar', 'Open Calendar →'],
  ['PUBLISHED POSTS', '0', 'This month', '/marketing/calendar', 'View Posts →'],
  ['ACTIVE CAMPAIGNS', '1', 'Resend API Live', '/marketing/campaigns', 'Build Campaign →'],
];

const modules = [
  ['✏️', 'AI Content Generator', 'Generate LinkedIn posts, blog intros, and email copy with Claude AI.', 'Generate Content →', '/marketing/content'],
  ['📅', 'Content Calendar', 'View and schedule all your content across platforms in one grid.', 'Open Calendar →', '/marketing/calendar'],
  ['👥', 'Leads Capture & CRM', 'Build intake forms and manage incoming startup leads.', 'Manage Leads →', '/marketing/leads'],
  ['📧', 'Email Campaign Builder', 'Create, schedule, and send campaigns via Resend API.', 'Build Campaign →', '/marketing/campaigns'],
];

export const MarketingOverview: React.FC = () => (
  <section className="cx-section">
    <div className="cx-card" style={{ textAlign: 'center', marginBottom: '32px' }}>
      <Megaphone size={32} color="#F5A623" />
      <h2 className="cx-page-title" style={{ textAlign: 'center', marginTop: '12px' }}>AI Marketing Engine</h2>
      <p className="cx-text-muted" style={{ textAlign: 'center' }}>Generate content, capture leads, and launch campaigns from a single growth command center.</p>
    </div>

    <div className="cx-grid-4" style={{ marginBottom: '32px' }}>
      {stats.map(([label, number, sub, path, link]) => (
        <div className="cx-card" key={label}>
          <span className="cx-label">{label}</span>
          <div className="cx-stat-number">{number}</div>
          <p className="cx-text-muted">{sub}</p>
          <Link to={path} className="cx-gold" style={{ textDecoration: 'none', fontSize: '13px' }}>{link}</Link>
        </div>
      ))}
    </div>

    <div className="cx-grid-2" style={{ marginTop: '8px' }}>
      {modules.map(([icon, title, description, link, path]) => (
        <Link to={path} className="cx-card-gold" key={title} style={{ textDecoration: 'none', display: 'block' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F5A62320', border: '1px solid #F5A62340', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>{icon}</div>
          <h3 style={{ color: '#F1F5F9', fontSize: '16px', fontWeight: 700, margin: '0 0 8px' }}>{title}</h3>
          <p className="cx-text-muted" style={{ lineHeight: 1.7 }}>{description}</p>
          <span className="cx-gold" style={{ fontSize: '13px' }}>{link}</span>
        </Link>
      ))}
    </div>
  </section>
);
