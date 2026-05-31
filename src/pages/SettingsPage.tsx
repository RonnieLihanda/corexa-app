import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { profile, updateProfile } = useAuth();
  const savedSettings = (() => {
    try {
      return JSON.parse(localStorage.getItem('corexa_settings') || '{}');
    } catch {
      return {};
    }
  })();
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [email] = useState(profile?.email || '');
  const [businessName, setBusinessName] = useState(profile?.business_name || '');
  const [businessType, setBusinessType] = useState(profile?.business_type || '');
  const [fundingAmount, setFundingAmount] = useState(String(profile?.funding_amount || ''));
  const [supabaseUrl, setSupabaseUrl] = useState(savedSettings.supabase_url || localStorage.getItem('corexa_supabase_url') || import.meta.env.VITE_SUPABASE_URL || '');
  const [supabaseAnonKey, setSupabaseAnonKey] = useState(savedSettings.supabase_anon_key || localStorage.getItem('corexa_supabase_anon_key') || import.meta.env.VITE_SUPABASE_ANON_KEY || '');
  const [anthropicKey, setAnthropicKey] = useState(localStorage.getItem('corexa_anthropic_key') || import.meta.env.VITE_ANTHROPIC_API_KEY || '');
  const [resendKey, setResendKey] = useState(localStorage.getItem('corexa_resend_key') || import.meta.env.VITE_RESEND_API_KEY || '');

  const saveProfile = async () => {
    await updateProfile({
      full_name: fullName,
      business_name: businessName,
      business_type: businessType,
      funding_amount: parseFloat(fundingAmount) || 0,
    });
  };

  const saveKeys = () => {
    localStorage.setItem('corexa_settings', JSON.stringify({
      supabase_url: supabaseUrl,
      supabase_anon_key: supabaseAnonKey,
    }));
    localStorage.setItem('corexa_supabase_url', supabaseUrl);
    localStorage.setItem('corexa_supabase_anon_key', supabaseAnonKey);
    localStorage.setItem('corexa_anthropic_key', anthropicKey);
    localStorage.setItem('corexa_resend_key', resendKey);
  };

  return (
    <section className="cx-section">
      <h2 className="cx-page-title">Account Settings</h2>
      <div className="cx-grid-2">
        <div className="cx-card">
          <h3 style={{ color: '#F1F5F9', fontWeight: 700, margin: '0 0 20px' }}>Profile</h3>
          <span className="cx-label">Full Name</span>
          <input className="cx-input" value={fullName} onChange={(e) => setFullName(e.target.value)} style={{ marginBottom: '16px' }} />
          <span className="cx-label">Email</span>
          <input className="cx-input" value={email} readOnly style={{ marginBottom: '16px', opacity: 0.75 }} />
          <span className="cx-label">Business Name</span>
          <input className="cx-input" value={businessName} onChange={(e) => setBusinessName(e.target.value)} style={{ marginBottom: '16px' }} />
          <span className="cx-label">Business Type</span>
          <input className="cx-input" value={businessType} onChange={(e) => setBusinessType(e.target.value)} style={{ marginBottom: '16px' }} />
          <span className="cx-label">Funding Amount</span>
          <input className="cx-input" type="number" value={fundingAmount} onChange={(e) => setFundingAmount(e.target.value)} style={{ marginBottom: '20px' }} />
          <button className="cx-btn-primary" type="button" onClick={saveProfile}>Save Changes</button>
        </div>

        <div className="cx-card">
          <h3 style={{ color: '#F1F5F9', fontWeight: 700, margin: '0 0 20px' }}>API Keys</h3>
          <div style={{ background: '#1A1200', border: '1px solid #F5A62340', borderRadius: '8px', padding: '12px', color: '#F5A623', fontSize: '12px', marginBottom: '20px' }}>
            🔑 API keys are stored locally and never sent to our servers.
          </div>
          <span className="cx-label">Supabase URL</span>
          <input className="cx-input" value={supabaseUrl} onChange={(e) => setSupabaseUrl(e.target.value)} style={{ marginBottom: '16px' }} />
          <span className="cx-label">Supabase Anon Key</span>
          <input className="cx-input" value={supabaseAnonKey} onChange={(e) => setSupabaseAnonKey(e.target.value)} style={{ marginBottom: '16px' }} />
          <span className="cx-label">Anthropic API Key</span>
          <input className="cx-input" type="password" value={anthropicKey} onChange={(e) => setAnthropicKey(e.target.value)} style={{ marginBottom: '16px' }} />
          <span className="cx-label">Resend API Key</span>
          <input className="cx-input" type="password" value={resendKey} onChange={(e) => setResendKey(e.target.value)} style={{ marginBottom: '20px' }} />
          <button className="cx-btn-primary" type="button" onClick={saveKeys}>Save API Keys</button>
        </div>
      </div>
    </section>
  );
};
