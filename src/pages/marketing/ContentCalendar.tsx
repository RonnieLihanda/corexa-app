import React from 'react';

const days = Array.from({ length: 35 }, (_, index) => index + 1);
const headers = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const ContentCalendar: React.FC = () => (
  <section className="cx-section">
    <h2 className="cx-page-title">Content Calendar</h2>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button className="cx-btn-secondary" type="button" style={{ padding: '8px 12px' }}>←</button>
        <h3 style={{ color: '#F1F5F9', margin: 0 }}>May 2026</h3>
        <button className="cx-btn-secondary" type="button" style={{ padding: '8px 12px' }}>→</button>
      </div>
      <button className="cx-btn-primary" type="button">+ Schedule Content</button>
    </div>

    <div className="cx-card">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
        {headers.map((day) => (
          <div key={day} className="cx-label" style={{ textAlign: 'center', marginBottom: 0 }}>{day}</div>
        ))}
        {days.map((day) => {
          const inMonthDay = day > 4 ? day - 4 : day + 26;
          const current = day > 4 && day <= 35;
          const today = current && inMonthDay === 31;
          const hasContent = current && [12, 20, 28].includes(inMonthDay);

          return (
            <div key={day} style={{ minHeight: '80px', border: today ? '1px solid #F5A623' : '1px solid #1E2535', borderRadius: '8px', padding: '8px', cursor: 'pointer', opacity: current ? 1 : 0.45, boxSizing: 'border-box' }}>
              <div style={{ color: '#94A3B8', fontSize: '13px', marginBottom: '8px' }}>{inMonthDay}</div>
              {hasContent && (
                <div style={{ background: '#F5A62320', border: '1px solid #F5A62340', borderRadius: '4px', padding: '2px 8px', fontSize: '11px', color: '#F5A623', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  LinkedIn post
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
