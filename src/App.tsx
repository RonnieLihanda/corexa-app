import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './components/DashboardLayout';

// Core pages
import { LandingPage } from './pages/LandingPage';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { DashboardOverview } from './pages/DashboardOverview';
import { SettingsPage } from './pages/SettingsPage';

// Marketing pages
import { MarketingOverview } from './pages/marketing/MarketingOverview';
import { AIContentGenerator } from './pages/marketing/AIContentGenerator';
import { ContentCalendar } from './pages/marketing/ContentCalendar';
import { LeadCapture } from './pages/marketing/LeadCapture';
import { EmailCampaigns } from './pages/marketing/EmailCampaigns';

// Onboarding pages
import { OnboardingOverview } from './pages/onboarding/OnboardingOverview';
import { ClientList } from './pages/onboarding/ClientList';
import { ClientPortalView } from './pages/onboarding/ClientPortalView';
import { DocChecklist } from './pages/onboarding/DocChecklist';
import { WelcomeSequences } from './pages/onboarding/WelcomeSequences';

// Retention pages
import { RetentionOverview } from './pages/retention/RetentionOverview';
import { HealthScores } from './pages/retention/HealthScores';
import { NPSBuilder } from './pages/retention/NPSBuilder';
import { ChurnAlerts } from './pages/retention/ChurnAlerts';
import { RetentionMetrics } from './pages/retention/RetentionMetrics';

const DashboardLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Landing pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Secure Dashboard Workspace */}
          <Route 
            path="/dashboard" 
            element={
              <DashboardLayoutWrapper>
                <DashboardOverview />
              </DashboardLayoutWrapper>
            } 
          />

          {/* Marketing Module (4 sub-pages) */}
          <Route 
            path="/marketing" 
            element={
              <DashboardLayoutWrapper>
                <MarketingOverview />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/marketing/content" 
            element={
              <DashboardLayoutWrapper>
                <AIContentGenerator />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/marketing/calendar" 
            element={
              <DashboardLayoutWrapper>
                <ContentCalendar />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/marketing/leads" 
            element={
              <DashboardLayoutWrapper>
                <LeadCapture />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/marketing/campaigns" 
            element={
              <DashboardLayoutWrapper>
                <EmailCampaigns />
              </DashboardLayoutWrapper>
            } 
          />

          {/* Onboarding Module (4 sub-pages) */}
          <Route 
            path="/onboarding" 
            element={
              <DashboardLayoutWrapper>
                <OnboardingOverview />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/onboarding/clients" 
            element={
              <DashboardLayoutWrapper>
                <ClientList />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/onboarding/portal" 
            element={
              <DashboardLayoutWrapper>
                <ClientPortalView />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/onboarding/docs" 
            element={
              <DashboardLayoutWrapper>
                <DocChecklist />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/onboarding/sequences" 
            element={
              <DashboardLayoutWrapper>
                <WelcomeSequences />
              </DashboardLayoutWrapper>
            } 
          />

          {/* Retention Module (4 sub-pages) */}
          <Route 
            path="/retention" 
            element={
              <DashboardLayoutWrapper>
                <RetentionOverview />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/retention/health" 
            element={
              <DashboardLayoutWrapper>
                <HealthScores />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/retention/nps" 
            element={
              <DashboardLayoutWrapper>
                <NPSBuilder />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/retention/alerts" 
            element={
              <DashboardLayoutWrapper>
                <ChurnAlerts />
              </DashboardLayoutWrapper>
            } 
          />
          <Route 
            path="/retention/metrics" 
            element={
              <DashboardLayoutWrapper>
                <RetentionMetrics />
              </DashboardLayoutWrapper>
            } 
          />

          {/* Settings view */}
          <Route 
            path="/settings" 
            element={
              <DashboardLayoutWrapper>
                <SettingsPage />
              </DashboardLayoutWrapper>
            } 
          />

          {/* Redirect fallbacks */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
