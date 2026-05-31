import React from 'react';

const stats = [
  ['TOTAL LEADS', '0'],
  ['QUALIFIED', '0'],
  ['THIS WEEK', '0'],
  ['AVG SCORE', '—'],
];

export const LeadCapture: React.FC = () => (
  <section className="cx-section">
    <h2 className="cx-page-title">Leads Capture & CRM</h2>
    <div className="cx-grid-4" style={{ marginBottom: '32px' }}>
      {stats.map(([label, number]) => (
        <div className="cx-card" key={label}>
          <span className="cx-label">{label}</span>
          <div className="cx-stat-number">{number}</div>
        </div>
      ))}
    </div>

    <div className="cx-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <h3 style={{ color: '#F1F5F9', fontWeight: 700, margin: 0 }}>All Leads</h3>
        <button className="cx-btn-primary" type="button">Add Lead</button>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '820px' }}>
          <thead>
            <tr style={{ background: '#0A0A0F' }}>
              {['NAME', 'COMPANY', 'SECTOR', 'SCORE', 'STATUS', 'SOURCE', 'DATE', 'ACTIONS'].map((head) => (
                <th key={head} className="cx-label" style={{ padding: '12px 16px', textAlign: 'left', marginBottom: 0 }}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={8} style={{ padding: '56px 16px', textAlign: 'center', borderTop: '1px solid #1E2535' }}>
                <div style={{ fontSize: '42px', marginBottom: '12px' }}>🔍</div>
                <h3 style={{ color: '#F1F5F9', margin: '0 0 8px' }}>No leads yet</h3>
                <p className="cx-text-muted" style={{ marginBottom: '18px' }}>Import from USASpending.gov or add manually</p>
                <button className="cx-btn-primary" type="button">Import from USASpending</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);
