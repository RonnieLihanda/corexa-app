import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const platforms = ['LinkedIn', 'Email', 'Blog', 'Facebook'];
const tones = ['Professional', 'Friendly', 'Bold', 'Conversational'];

const toggleStyle = (active: boolean): React.CSSProperties => ({
  background: active ? '#F5A623' : '#0A0A0F',
  color: active ? '#000' : '#64748B',
  border: active ? '1px solid #F5A623' : '1px solid #1E2535',
  borderRadius: '6px',
  padding: '8px 16px',
  fontWeight: active ? 700 : 600,
  cursor: 'pointer',
});

export const AIContentGenerator: React.FC = () => {
  const navigate = useNavigate();
  const [platform, setPlatform] = useState('LinkedIn');
  const [tone, setTone] = useState('Professional');
  const [topic, setTopic] = useState('');
  const [sector, setSector] = useState('');
  const [content, setContent] = useState('');

  const generate = () => {
    setContent(`Here is a ${tone.toLowerCase()} ${platform} draft for ${sector || 'your business'}:\n\n${topic || 'Funded startups need systems before more staff.'}\n\nCorexa turns marketing, onboarding, and retention into one automated operating layer so founders can scale without duct-taping tools together.`);
  };

  return (
    <section className="cx-section">
      <button type="button" onClick={() => navigate(-1)} className="cx-gold" style={{ cursor: 'pointer', marginBottom: '24px', background: 'transparent', border: 'none', padding: 0 }}>← Back to Marketing Overview</button>
      <h2 className="cx-page-title">AI Content Engine</h2>
      <div className="cx-grid-2">
        <div className="cx-card">
          <h3 style={{ color: '#F1F5F9', fontWeight: 700, margin: '0 0 20px' }}>Generate Content</h3>
          <span className="cx-label">PLATFORM CHANNEL</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {platforms.map((item) => <button key={item} type="button" onClick={() => setPlatform(item)} style={toggleStyle(platform === item)}>{item}</button>)}
          </div>

          <span className="cx-label">DESCRIBE TOPIC / ANGLE</span>
          <textarea className="cx-input" rows={4} value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Why funded startups need systems before they need more staff" style={{ marginBottom: '20px', resize: 'vertical' }} />

          <span className="cx-label">BUSINESS SECTOR / NICHE</span>
          <input className="cx-input" value={sector} onChange={(e) => setSector(e.target.value)} placeholder="e.g. SaaS Startup, Consulting, AI Agency" style={{ marginBottom: '20px' }} />

          <span className="cx-label">BRAND VOICE TONE</span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
            {tones.map((item) => <button key={item} type="button" onClick={() => setTone(item)} style={toggleStyle(tone === item)}>{item}</button>)}
          </div>

          <button className="cx-btn-primary" type="button" onClick={generate} style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}>✨ Generate Post Copy</button>
        </div>

        <div className="cx-card">
          <h3 style={{ color: '#F1F5F9', fontWeight: 700, margin: '0 0 20px' }}>Preview</h3>
          <div style={{ background: '#0A0A0F', border: '1px solid #1E2535', borderRadius: '8px', minHeight: '300px', padding: '20px', color: content ? '#F1F5F9' : '#94A3B8', fontSize: '14px', lineHeight: 1.7, whiteSpace: 'pre-line', display: content ? 'block' : 'flex', alignItems: 'center', justifyContent: 'center', textAlign: content ? 'left' : 'center' }}>
            {content || '✨ Your generated content will appear here.\nFill in the fields and click Generate.'}
          </div>
          {content && (
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '16px' }}>
              <button className="cx-btn-secondary" type="button">📋 Copy</button>
              <button className="cx-btn-secondary" type="button">💾 Save to Queue</button>
              <button className="cx-btn-secondary" type="button">📅 Schedule</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
