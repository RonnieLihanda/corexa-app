import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const useViewport = () => {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const stats = [
  {
    label: 'MARKETING PIPELINE',
    number: '3',
    sub: 'Leads captured',
    link: 'Access Marketing Suite →',
    path: '/marketing',
  },
  {
    label: 'ONBOARDING VELOCITY',
    number: '62%',
    sub: 'Avg completion',
    link: 'Manage Client Checklist →',
    path: '/onboarding/docs',
  },
  {
    label: 'RETENTION INTEGRITY',
    number: '78',
    sub: 'Avg health index',
    link: 'Inspect Risk Factors →',
    path: '/retention/health',
  },
  {
    label: 'ACTIVE CLIENTS',
    number: '5',
    sub: 'Paying clients',
    link: 'View All Clients →',
    path: '/onboarding/clients',
  },
];

export const DashboardOverview: React.FC = () => {
  const width = useViewport();
  const isMobile = width < 720;
  const isTablet = width >= 720 && width < 1100;

  return (
    <div style={{ width: '100%', boxSizing: 'border-box' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)',
        gap: '20px',
        marginBottom: '32px',
      }}>
        {stats.map((item) => (
          <div key={item.label} style={{
            background: '#111827',
            border: '1px solid #1E2535',
            borderRadius: '12px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            boxSizing: 'border-box',
          }}>
            <div style={{
              color: '#64748B',
              fontSize: '11px',
              letterSpacing: '1.5px',
              fontWeight: 700,
            }}>
              {item.label}
            </div>
            <div style={{
              color: '#F5A623',
              fontSize: '36px',
              fontWeight: 800,
              lineHeight: 1,
            }}>
              {item.number}
            </div>
            <div style={{
              color: '#64748B',
              fontSize: '13px',
              marginBottom: '8px',
            }}>
              {item.sub}
            </div>
            <Link to={item.path} style={{
              color: '#F5A623',
              fontSize: '13px',
              textDecoration: 'none',
              cursor: 'pointer',
              marginTop: 'auto',
            }}>
              {item.link}
            </Link>
          </div>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr',
        gap: '24px',
      }}>
        <section style={{
          background: '#111827',
          border: '1px solid #1E2535',
          borderRadius: '12px',
          padding: '24px',
          boxSizing: 'border-box',
        }}>
          <h2 style={{
            color: '#F1F5F9',
            fontWeight: 700,
            fontSize: '14px',
            margin: '0 0 16px',
          }}>
            ⚠️ ACTIVE PLATFORM WARNINGS
          </h2>

          <div style={{
            borderLeft: '4px solid #EF4444',
            background: '#1A0E0E',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '12px',
          }}>
            <h3 style={{
              color: '#EF4444',
              fontSize: '14px',
              fontWeight: 700,
              margin: 0,
            }}>
              Critical Churn Warning
            </h3>
            <p style={{
              color: '#64748B',
              fontSize: '13px',
              margin: '8px 0',
              lineHeight: 1.6,
            }}>
              Horizon Biotech onboarding inactive. Health score critical. Send re-engagement.
            </p>
            <Link to="/retention/alerts" style={{
              color: '#F5A623',
              fontSize: '12px',
              textDecoration: 'none',
            }}>
              Send Engagement Now →
            </Link>
          </div>

          <div style={{
            borderLeft: '4px solid #10B981',
            background: '#0A1A12',
            borderRadius: '8px',
            padding: '16px',
          }}>
            <h3 style={{
              color: '#10B981',
              fontSize: '14px',
              fontWeight: 700,
              margin: 0,
            }}>
              Claude AI Engine Ready
            </h3>
            <p style={{
              color: '#64748B',
              fontSize: '13px',
              margin: '8px 0 0',
              lineHeight: 1.6,
            }}>
              Content generation and health audits fully active.
            </p>
          </div>
        </section>

        <section style={{
          background: '#111827',
          border: '1px solid #1E2535',
          borderRadius: '12px',
          padding: '24px',
          boxSizing: 'border-box',
        }}>
          <h2 style={{
            color: '#F1F5F9',
            fontWeight: 700,
            fontSize: '14px',
            margin: '0 0 16px',
          }}>
            QUICK ACTIONS
          </h2>

          {[
            { text: '✏️ Generate LinkedIn Post with AI', path: '/marketing/content' },
            { text: '👥 Launch Client Onboarding Portal', path: '/onboarding/portal' },
            { text: '📊 Review Automated NPS Feedback', path: '/retention/nps' },
          ].map((action) => (
            <Link key={action.path} to={action.path} style={{
              background: '#0A0A0F',
              border: '1px solid #1E2535',
              borderRadius: '8px',
              padding: '14px 16px',
              color: '#94A3B8',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              textAlign: 'left',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '10px',
              width: '100%',
              textDecoration: 'none',
              boxSizing: 'border-box',
            }}>
              {action.text}
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};
