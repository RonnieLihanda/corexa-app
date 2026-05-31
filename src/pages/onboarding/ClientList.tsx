import React from 'react';

export const ClientList: React.FC = () => (
  <section className="cx-section">
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
      <h2 className="cx-page-title" style={{ marginBottom: 0 }}>Client Management</h2>
      <button className="cx-btn-primary" type="button">+ Add New Client</button>
    </div>

    <div className="cx-card">
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
          <thead>
            <tr style={{ background: '#0A0A0F' }}>
              {['CLIENT', 'INDUSTRY', 'ONBOARDING', 'HEALTH', 'LAST ACTIVE', 'ACTIONS'].map((head) => (
                <th key={head} className="cx-label" style={{ padding: '12px 16px', textAlign: 'left', marginBottom: 0 }}>{head}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} style={{ padding: '56px 16px', textAlign: 'center', borderTop: '1px solid #1E2535' }}>
                <div style={{ fontSize: '42px', marginBottom: '12px' }}>👥</div>
                <h3 style={{ color: '#F1F5F9', margin: '0 0 8px' }}>No clients yet</h3>
                <p className="cx-text-muted" style={{ marginBottom: '18px' }}>Add a client to begin onboarding.</p>
                <button className="cx-btn-primary" type="button">+ Add New Client</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
);
