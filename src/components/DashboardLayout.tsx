import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar } from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const useViewport = () => {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const titleMap: Array<[string, string]> = [
  ['/marketing/content', 'AI Content Engine'],
  ['/marketing/calendar', 'Content Calendar'],
  ['/marketing/leads', 'Leads Capture & CRM'],
  ['/marketing/campaigns', 'Email Campaign Builder'],
  ['/marketing', 'Marketing'],
  ['/onboarding/clients', 'Client Management'],
  ['/onboarding/portal', 'Client Portal'],
  ['/onboarding/docs', 'Document Manager'],
  ['/onboarding/sequences', 'Welcome Sequences'],
  ['/onboarding', 'Onboarding'],
  ['/retention/health', 'Client Health Scores'],
  ['/retention/nps', 'NPS Surveys'],
  ['/retention/alerts', 'Churn Alerts'],
  ['/retention/metrics', 'Metrics'],
  ['/retention', 'Retention'],
  ['/settings', 'Account Settings'],
  ['/dashboard', 'Dashboard'],
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { profile } = useAuth();
  const width = useViewport();
  const firstLetter = (profile?.full_name || profile?.email || 'C').charAt(0).toUpperCase();
  const marginLeft = width < 768 ? 0 : width <= 1024 ? 64 : 240;
  const pageTitle = useMemo(() => titleMap.find(([path]) => location.pathname === path || location.pathname.startsWith(`${path}/`))?.[1] || 'Dashboard', [location.pathname]);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0F', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <Sidebar />
      <div className="main-content" style={{ marginLeft, flex: 1, overflowY: 'auto', minHeight: '100vh' }}>
        <header style={{
          background: '#0D1117',
          borderBottom: '1px solid #1E2535',
          height: '64px',
          padding: width < 768 ? '0 20px 0 72px' : '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
        }}>
          <h1 style={{ color: '#F1F5F9', fontSize: '20px', fontWeight: 700, margin: 0 }}>{pageTitle}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: '#64748B', fontSize: '20px' }}>🔔</span>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: '#F5A62320',
              border: '1px solid #F5A623',
              color: '#F5A623',
              fontWeight: 700,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {firstLetter}
            </div>
          </div>
        </header>
        <main style={{ padding: width < 768 ? '20px 16px' : '32px', maxWidth: '1200px', boxSizing: 'border-box' }}>
          {children}
        </main>
      </div>
    </div>
  );
};
