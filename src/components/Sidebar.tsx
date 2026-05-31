import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const useViewport = () => {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const mainItems = [
  { label: 'Dashboard', icon: '📊', path: '/dashboard' },
  { label: 'Marketing', icon: '📣', path: '/marketing' },
  { label: 'Onboarding', icon: '👥', path: '/onboarding' },
  { label: 'Retention', icon: '❤️', path: '/retention' },
  { label: 'Settings', icon: '⚙️', path: '/settings' },
];

const toolItems = [
  { label: 'Leads', icon: '🔍', path: '/marketing/leads' },
  { label: 'Calendar', icon: '📅', path: '/marketing/calendar' },
];

const styles = {
  hamburger: {
    position: 'fixed',
    top: '16px',
    left: '16px',
    zIndex: 300,
    background: '#111827',
    border: '1px solid #1E2535',
    borderRadius: '8px',
    padding: '8px',
    color: '#F5A623',
    cursor: 'pointer',
    width: '40px',
    height: '40px',
    fontSize: '18px',
    lineHeight: 1,
  } as React.CSSProperties,
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.6)',
    zIndex: 200,
  } as React.CSSProperties,
  sidebar: {
    position: 'fixed',
    left: 0,
    top: 0,
    height: '100vh',
    background: '#0D1117',
    borderRight: '1px solid #1E2535',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 220,
    padding: 0,
    boxSizing: 'border-box',
    transition: 'transform 0.2s ease, width 0.2s ease',
  } as React.CSSProperties,
  logoArea: {
    padding: '24px 20px',
    borderBottom: '1px solid #1E2535',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  } as React.CSSProperties,
  logoCircle: {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: '#F5A623',
    color: '#000',
    fontWeight: 900,
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  } as React.CSSProperties,
  brandName: {
    color: '#F5A623',
    fontWeight: 800,
    fontSize: '16px',
    letterSpacing: '2px',
  } as React.CSSProperties,
  label: {
    padding: '24px 20px 8px',
    color: '#334155',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '2px',
  } as React.CSSProperties,
  profileBlock: {
    padding: '16px 20px',
    borderTop: '1px solid #1E2535',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  } as React.CSSProperties,
  avatar: {
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
    flexShrink: 0,
  } as React.CSSProperties,
};

const getNavStyle = (active: boolean, compact: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: compact ? 'center' : 'flex-start',
  gap: compact ? 0 : '12px',
  padding: compact ? '12px 0' : '12px 20px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500,
  textDecoration: 'none',
  transition: 'all 0.15s',
  background: active ? '#F5A62315' : 'transparent',
  borderLeft: active ? '3px solid #F5A623' : '3px solid transparent',
  color: active ? '#F5A623' : '#64748B',
});

interface SidebarPanelProps {
  mode: 'desktop' | 'tablet' | 'mobile';
  open?: boolean;
  onNavigate?: () => void;
}

const SidebarPanel: React.FC<SidebarPanelProps> = ({ mode, open = true, onNavigate }) => {
  const { profile, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const compact = mode === 'tablet';
  const firstLetter = (profile?.full_name || profile?.email || 'C').charAt(0).toUpperCase();

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const sidebarStyle: React.CSSProperties = {
    ...styles.sidebar,
    width: compact ? '64px' : '240px',
    transform: mode === 'mobile' && !open ? 'translateX(-100%)' : 'translateX(0)',
  };

  const renderItems = (items: typeof mainItems) => items.map((item) => (
    <Link
      key={item.path}
      to={item.path}
      title={compact ? item.label : undefined}
      onClick={onNavigate}
      style={getNavStyle(isActive(item.path), compact)}
    >
      <span>{item.icon}</span>
      {!compact && <span>{item.label}</span>}
    </Link>
  ));

  return (
    <aside style={sidebarStyle}>
      <div>
        <div style={{
          ...styles.logoArea,
          justifyContent: compact ? 'center' : 'flex-start',
          padding: compact ? '20px 0' : '24px 20px',
        }}>
          <div style={styles.logoCircle}>C</div>
          {!compact && <div style={styles.brandName}>COREXA</div>}
        </div>

        {!compact && <div style={styles.label}>MAIN MENU</div>}
        {renderItems(mainItems)}

        {!compact && <div style={{ height: '1px', background: '#1E2535', margin: '16px 20px 0' }} />}
        {!compact && <div style={styles.label}>TOOLS</div>}
        {renderItems(toolItems)}
      </div>

      <div style={{
        ...styles.profileBlock,
        justifyContent: compact ? 'center' : 'flex-start',
        padding: compact ? '16px 0' : '16px 20px',
      }}>
        <div style={styles.avatar} title={profile?.full_name || 'Corexa User'}>{firstLetter}</div>
        {!compact && (
          <>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ color: '#F1F5F9', fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {profile?.full_name || 'Corexa User'}
              </div>
              <div style={{ color: '#64748B', fontSize: '11px', marginTop: '2px' }}>
                {profile?.role === 'admin' ? 'Admin' : 'Client'}
              </div>
            </div>
            <button type="button" onClick={handleLogout} style={{ color: '#64748B', cursor: 'pointer', background: 'transparent', border: 'none', fontSize: '18px' }} title="Sign out">
              ↗
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export const Sidebar: React.FC = () => {
  const width = useViewport();
  const [open, setOpen] = useState(false);

  if (width < 768) {
    return (
      <>
        <button type="button" onClick={() => setOpen((current) => !current)} style={styles.hamburger}>
          {open ? '✕' : '☰'}
        </button>
        {open && <div style={styles.overlay} onClick={() => setOpen(false)} />}
        <SidebarPanel mode="mobile" open={open} onNavigate={() => setOpen(false)} />
      </>
    );
  }

  if (width <= 1024) {
    return <SidebarPanel mode="tablet" />;
  }

  return <SidebarPanel mode="desktop" />;
};
