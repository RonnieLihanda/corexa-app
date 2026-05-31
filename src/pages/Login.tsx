import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type ThemeMode = 'dark' | 'light';

const useViewport = () => {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

const getPalette = (mode: ThemeMode) => ({
  page: mode === 'dark' ? '#0A0A0F' : '#F8FAFC',
  card: mode === 'dark' ? '#111827' : '#FFFFFF',
  input: mode === 'dark' ? '#0A0A0F' : '#F8FAFC',
  border: mode === 'dark' ? '#1E2535' : '#E2E8F0',
  text: mode === 'dark' ? '#F1F5F9' : '#0F172A',
  muted: mode === 'dark' ? '#64748B' : '#64748B',
  label: mode === 'dark' ? '#94A3B8' : '#475569',
  errorBg: mode === 'dark' ? '#3B121A' : '#FEF2F2',
  errorBorder: mode === 'dark' ? '#7F1D1D' : '#FCA5A5',
  errorText: mode === 'dark' ? '#FCA5A5' : '#991B1B',
});

interface TextInputProps {
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  palette: ReturnType<typeof getPalette>;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, type, value, placeholder, palette, onChange }) => {
  const [focused, setFocused] = useState(false);

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{
        color: palette.label,
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '1px',
        textTransform: 'uppercase',
        display: 'block',
        marginBottom: '8px',
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: palette.input,
          border: focused ? '1px solid #F5A623' : `1px solid ${palette.border}`,
          borderRadius: '8px',
          padding: '12px 16px',
          color: palette.text,
          fontSize: '14px',
          boxSizing: 'border-box',
          outline: 'none',
        }}
        required
      />
    </div>
  );
};

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const width = useViewport();
  const palette = getPalette(theme);
  const isMobile = width < 640;
  const { signIn } = useAuth();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signIn(email, password);
    } catch {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: palette.page,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '24px 16px' : '48px 24px',
      boxSizing: 'border-box',
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    }}>
      <button
        type="button"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        style={{
          position: 'fixed',
          top: '18px',
          right: '18px',
          background: palette.card,
          border: `1px solid ${palette.border}`,
          color: palette.label,
          borderRadius: '999px',
          padding: '8px 14px',
          fontSize: '12px',
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </button>

      <div style={{
        background: palette.card,
        border: `1px solid ${palette.border}`,
        borderRadius: '16px',
        padding: isMobile ? '36px 24px' : '48px 40px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: theme === 'dark' ? '0 25px 50px rgba(0,0,0,0.5)' : '0 25px 50px rgba(15,23,42,0.12)',
        boxSizing: 'border-box',
      }}>
        <div style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          background: '#F5A623',
          color: '#000000',
          fontSize: '20px',
          fontWeight: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 24px',
        }}>
          C
        </div>

        <h1 style={{
          color: palette.text,
          fontSize: isMobile ? '22px' : '24px',
          fontWeight: 700,
          textAlign: 'center',
          margin: '0 0 8px',
        }}>
          Welcome to <span style={{ color: '#F5A623' }}>Corexa</span>
        </h1>
        <p style={{
          color: palette.muted,
          fontSize: '14px',
          textAlign: 'center',
          margin: '0 0 32px',
        }}>
          The AI business engine for funded companies
        </p>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email Address"
            type="email"
            value={email}
            placeholder="name@company.com"
            palette={palette}
            onChange={setEmail}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            placeholder="••••••••"
            palette={palette}
            onChange={setPassword}
          />

          {error && (
            <p style={{
              color: '#EF4444',
              fontSize: '13px',
              marginTop: '8px',
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              background: '#F5A623',
              color: '#000000',
              padding: '14px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '15px',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '8px',
              opacity: loading ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            {loading && (
              <span style={{
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                border: '2px solid rgba(0,0,0,0.25)',
                borderTop: '2px solid #000000',
                animation: 'spin 0.8s linear infinite',
              }} />
            )}
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p style={{
          color: palette.muted,
          fontSize: '14px',
          textAlign: 'center',
          margin: '28px 0 0',
        }}>
          Don't have an account?{' '}
          <Link to="/signup" style={{ color: '#F5A623', textDecoration: 'none', fontWeight: 700 }}>
            Start Free Trial
          </Link>
        </p>
      </div>
    </div>
  );
};
