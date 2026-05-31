import React, { useState } from 'react';

export const EmailCampaigns: React.FC = () => {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  return (
    <section className="cx-section">
      <h2 className="cx-page-title">Email Campaign Builder</h2>
      <div className="cx-grid-2">
        <div className="cx-card">
          <h3 style={{ color: '#F1F5F9', marginTop: 0 }}>Compose Campaign</h3>
          <span className="cx-label">Subject</span>
          <input className="cx-input" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. 3 levers for funded growth" style={{ marginBottom: '16px' }} />
          <span className="cx-label">Body</span>
          <textarea className="cx-input" rows={8} value={body} onChange={(e) => setBody(e.target.value)} placeholder="Write your campaign..." style={{ marginBottom: '20px', resize: 'vertical' }} />
          <button className="cx-btn-primary" type="button">Send via Resend</button>
        </div>
        <div className="cx-card-gold">
          <h3 style={{ color: '#F1F5F9', marginTop: 0 }}>Campaign Logs</h3>
          <p className="cx-text-muted">No campaigns have been launched yet. Draft and send your first broadcast from the composer.</p>
        </div>
      </div>
    </section>
  );
};
