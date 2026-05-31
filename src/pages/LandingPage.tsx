import React from 'react';
import { Link } from 'react-router-dom';
import { Megaphone, Users, Heart } from 'lucide-react';

const styles = {
  page: {
    minHeight: '100vh',
    background: '#0A0A0F',
    color: '#F1F5F9',
    fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  } as React.CSSProperties,
  navbar: {
    width: '100%',
    height: '64px',
    background: '#0A0A0F',
    borderBottom: '1px solid #1E2535',
    padding: '0 80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'sticky',
    top: 0,
    zIndex: 100,
    boxSizing: 'border-box',
  } as React.CSSProperties,
  logo: {
    color: '#F5A623',
    fontSize: '20px',
    fontWeight: 800,
    letterSpacing: '3px',
    textDecoration: 'none',
  } as React.CSSProperties,
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  } as React.CSSProperties,
  signIn: {
    color: '#94A3B8',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 600,
  } as React.CSSProperties,
  navCta: {
    background: '#F5A623',
    color: '#000000',
    padding: '10px 20px',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '14px',
    textDecoration: 'none',
    display: 'inline-block',
  } as React.CSSProperties,
  heroSection: {
    background: '#0A0A0F',
    padding: '120px 80px',
    textAlign: 'center',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  heroInner: {
    maxWidth: '800px',
    margin: '0 auto',
  } as React.CSSProperties,
  pill: {
    display: 'inline-flex',
    background: '#F5A62315',
    border: '1px solid #F5A62340',
    borderRadius: '999px',
    padding: '6px 16px',
    color: '#F5A623',
    fontSize: '13px',
    marginBottom: '32px',
  } as React.CSSProperties,
  h1: {
    margin: 0,
    color: '#F1F5F9',
    fontSize: '56px',
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: '-1px',
  } as React.CSSProperties,
  h1Gold: {
    display: 'block',
    color: '#F5A623',
    fontSize: '56px',
    fontWeight: 800,
    lineHeight: 1.1,
  } as React.CSSProperties,
  heroText: {
    color: '#94A3B8',
    fontSize: '18px',
    lineHeight: 1.7,
    maxWidth: '600px',
    margin: '24px auto',
  } as React.CSSProperties,
  heroButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '32px',
  } as React.CSSProperties,
  primaryButton: {
    background: '#F5A623',
    color: '#000000',
    padding: '14px 32px',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '16px',
    border: 'none',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
  } as React.CSSProperties,
  secondaryButton: {
    background: 'transparent',
    color: '#F5A623',
    padding: '14px 32px',
    borderRadius: '8px',
    border: '1px solid #F5A623',
    fontWeight: 700,
    fontSize: '16px',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
  } as React.CSSProperties,
  featuresSection: {
    background: '#0D1117',
    padding: '100px 80px',
    textAlign: 'center',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  sectionHeading: {
    color: '#F1F5F9',
    fontSize: '40px',
    fontWeight: 800,
    lineHeight: 1.2,
    margin: 0,
  } as React.CSSProperties,
  headingGold: {
    color: '#F5A623',
  } as React.CSSProperties,
  sectionSubtext: {
    color: '#64748B',
    fontSize: '16px',
    lineHeight: 1.7,
    margin: '16px auto 60px',
    maxWidth: '620px',
  } as React.CSSProperties,
  featureGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '24px',
    maxWidth: '1100px',
    margin: '0 auto',
  } as React.CSSProperties,
  featureCard: {
    background: '#111827',
    border: '1px solid #1E2535',
    borderLeft: '3px solid #F5A623',
    borderRadius: '12px',
    padding: '36px 32px',
    textAlign: 'left',
    transition: 'transform 0.2s',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  iconCircle: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    background: '#F5A62315',
    border: '1px solid #F5A62340',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  } as React.CSSProperties,
  cardTitle: {
    color: '#F1F5F9',
    fontSize: '20px',
    fontWeight: 700,
    margin: '0 0 12px',
  } as React.CSSProperties,
  cardDescription: {
    color: '#64748B',
    fontSize: '14px',
    lineHeight: 1.7,
    margin: 0,
  } as React.CSSProperties,
  pricingSection: {
    background: '#0A0A0F',
    padding: '100px 80px',
    textAlign: 'center',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  pricingCards: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    maxWidth: '1100px',
    margin: '0 auto',
    flexWrap: 'wrap',
  } as React.CSSProperties,
  pricingCard: {
    background: '#111827',
    border: '1px solid #1E2535',
    borderRadius: '16px',
    padding: '40px 32px',
    width: '320px',
    textAlign: 'left',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  } as React.CSSProperties,
  pricingCardGrowth: {
    background: '#111827',
    border: '2px solid #F5A623',
    borderRadius: '16px',
    padding: '40px 32px',
    width: '320px',
    textAlign: 'left',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    boxShadow: '0 0 40px #F5A62320',
  } as React.CSSProperties,
  popularBadge: {
    position: 'absolute',
    top: '-14px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#F5A623',
    color: '#000000',
    fontSize: '11px',
    fontWeight: 800,
    letterSpacing: '2px',
    padding: '4px 16px',
    borderRadius: '999px',
    whiteSpace: 'nowrap',
  } as React.CSSProperties,
  tierLabel: {
    color: '#64748B',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '3px',
    marginBottom: '16px',
  } as React.CSSProperties,
  tierLabelGrowth: {
    color: '#F5A623',
    fontSize: '11px',
    fontWeight: 700,
    letterSpacing: '3px',
    marginBottom: '16px',
  } as React.CSSProperties,
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
  } as React.CSSProperties,
  price: {
    color: '#F1F5F9',
    fontSize: '48px',
    fontWeight: 800,
    lineHeight: 1,
  } as React.CSSProperties,
  perMonth: {
    color: '#64748B',
    fontSize: '18px',
  } as React.CSSProperties,
  planDescription: {
    color: '#64748B',
    fontSize: '14px',
    lineHeight: 1.7,
    margin: '16px 0 28px',
    minHeight: '72px',
  } as React.CSSProperties,
  divider: {
    borderTop: '1px solid #1E2535',
    marginBottom: '28px',
  } as React.CSSProperties,
  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flex: 1,
  } as React.CSSProperties,
  planFeature: {
    display: 'flex',
    gap: '10px',
    marginBottom: '14px',
    alignItems: 'flex-start',
  } as React.CSSProperties,
  checkmark: {
    color: '#10B981',
    fontWeight: 700,
    fontSize: '14px',
  } as React.CSSProperties,
  featureText: {
    color: '#94A3B8',
    fontSize: '14px',
  } as React.CSSProperties,
  planButton: {
    width: '100%',
    background: 'transparent',
    border: '1px solid #1E2535',
    color: '#F1F5F9',
    padding: '14px',
    borderRadius: '8px',
    fontWeight: 600,
    marginTop: '32px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  planButtonGrowth: {
    width: '100%',
    background: '#F5A623',
    border: 'none',
    color: '#000000',
    padding: '14px',
    borderRadius: '8px',
    fontWeight: 700,
    marginTop: '32px',
    cursor: 'pointer',
    textAlign: 'center',
    textDecoration: 'none',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  ctaBanner: {
    background: '#F5A623',
    padding: '80px',
    textAlign: 'center',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  ctaHeading: {
    color: '#000000',
    fontSize: '36px',
    fontWeight: 800,
    margin: 0,
  } as React.CSSProperties,
  ctaText: {
    color: '#00000080',
    fontSize: '16px',
    margin: '16px 0 32px',
  } as React.CSSProperties,
  ctaButton: {
    background: '#000000',
    color: '#F5A623',
    padding: '14px 32px',
    borderRadius: '8px',
    fontWeight: 700,
    fontSize: '16px',
    border: 'none',
    textDecoration: 'none',
    display: 'inline-block',
    cursor: 'pointer',
  } as React.CSSProperties,
  footer: {
    background: '#0A0A0F',
    borderTop: '1px solid #1E2535',
    padding: '40px 80px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
  } as React.CSSProperties,
  footerLogo: {
    color: '#F5A623',
    fontWeight: 800,
    letterSpacing: '3px',
  } as React.CSSProperties,
  footerText: {
    color: '#334155',
    fontSize: '13px',
  } as React.CSSProperties,
};

const features = [
  {
    icon: Megaphone,
    title: 'AI Marketing Engine',
    description: 'Generate content, capture qualified leads, and run email campaigns automatically from one workspace.',
  },
  {
    icon: Users,
    title: 'Seamless Onboarding',
    description: 'Every new client gets a branded portal, document checklist, and AI welcome sequence that runs itself.',
  },
  {
    icon: Heart,
    title: 'Retention Intelligence',
    description: 'Monitor health scores, trigger NPS surveys, and prevent churn before clients go quiet.',
  },
];

const plans = [
  {
    tier: 'STARTER',
    price: '$197',
    description: 'Marketing module for teams building their first growth system.',
    features: ['Marketing module', 'AI content generation', 'Content calendar', 'Lead capture workspace'],
  },
  {
    tier: 'GROWTH',
    price: '$497',
    description: 'The full Corexa engine. All 3 modules. Fully automated.',
    features: ['Everything in Starter', 'Client onboarding portal', 'Health scores + churn alerts', 'NPS automation', 'Retention dashboard'],
    highlighted: true,
  },
  {
    tier: 'SCALE',
    price: '$997',
    description: 'All modules + Mic3 runs everything for you.',
    features: ['Everything in Growth', 'Dedicated Mic3 ops manager', 'Custom AI workflows', 'Priority support', 'Monthly strategy calls'],
  },
];

export const LandingPage: React.FC = () => {
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.logo}>COREXA</Link>
        <div style={styles.navRight}>
          <Link to="/login" style={styles.signIn}>Sign In</Link>
          <Link to="/signup" style={styles.navCta}>Book Demo →</Link>
        </div>
      </nav>

      <section style={styles.heroSection}>
        <div style={styles.heroInner}>
          <div style={styles.pill}>⚡ Now in Beta — Limited Pilot Spots Available</div>
          <h1 style={styles.h1}>
            Your Business Got Funded.
            <span style={styles.h1Gold}>Now Let's Grow It.</span>
          </h1>
          <p style={styles.heroText}>
            Corexa is the AI business engine that handles marketing, onboarding, and retention — fully automated, fully managed.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/signup" style={styles.primaryButton}>Book Your Free Demo →</Link>
            <button type="button" onClick={scrollToFeatures} style={styles.secondaryButton}>Explore Modules</button>
          </div>
        </div>
      </section>

      <section id="features" style={styles.featuresSection}>
        <h2 style={styles.sectionHeading}>
          Three Modules. <span style={styles.headingGold}>One Growth Engine.</span>
        </h2>
        <p style={styles.sectionSubtext}>
          A clean operating layer for teams that need acquisition, onboarding, and retention working from the same system.
        </p>
        <div style={styles.featureGrid}>
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} style={styles.featureCard}>
                <div style={styles.iconCircle}>
                  <Icon size={22} color="#F5A623" />
                </div>
                <h3 style={styles.cardTitle}>{feature.title}</h3>
                <p style={styles.cardDescription}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="pricing" style={styles.pricingSection}>
        <h2 style={styles.sectionHeading}>
          Pricing Built For <span style={styles.headingGold}>Momentum.</span>
        </h2>
        <p style={styles.sectionSubtext}>
          One flat monthly fee. No feature gating. No surprise charges.
        </p>
        <div style={styles.pricingCards}>
          {plans.map((plan) => (
            <div key={plan.tier} style={plan.highlighted ? styles.pricingCardGrowth : styles.pricingCard}>
              {plan.highlighted && <div style={styles.popularBadge}>MOST POPULAR</div>}
              <div style={plan.highlighted ? styles.tierLabelGrowth : styles.tierLabel}>{plan.tier}</div>
              <div style={styles.priceRow}>
                <span style={styles.price}>{plan.price}</span>
                <span style={styles.perMonth}>/mo</span>
              </div>
              <p style={styles.planDescription}>{plan.description}</p>
              <div style={styles.divider} />
              <ul style={styles.featureList}>
                {plan.features.map((feature) => (
                  <li key={feature} style={styles.planFeature}>
                    <span style={styles.checkmark}>✓</span>
                    <span style={styles.featureText}>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/signup" style={plan.highlighted ? styles.planButtonGrowth : styles.planButton}>
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.ctaBanner}>
        <h2 style={styles.ctaHeading}>Ready to Put Your Funding to Work?</h2>
        <p style={styles.ctaText}>
          Join funded businesses already using Corexa to automate their growth.
        </p>
        <Link to="/signup" style={styles.ctaButton}>Book Your Free Demo →</Link>
      </section>

      <footer style={styles.footer}>
        <div style={styles.footerLogo}>COREXA</div>
        <div style={styles.footerText}>© 2026 Corexa by Mic3 Solution Group</div>
      </footer>
    </div>
  );
};
