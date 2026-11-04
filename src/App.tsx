import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider } from './context/DemoContext';

// Customer Pages & Layout
import { CustomerLayout } from './components/layout/CustomerLayout';
import { HomePage } from './pages/HomePage';
import { DetailsPage } from './pages/DetailsPage';
import { SpeedPage } from './pages/SpeedPage';
import { PaymentPage } from './pages/PaymentPage';
import { OrderStatusPage } from './pages/OrderStatusPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { PricingPage } from './pages/PricingPage';
import { CoveragePage } from './pages/CoveragePage';
import { NotTitleInsurancePage } from './pages/NotTitleInsurancePage';
import { LegalTermsPage } from './pages/LegalTermsPage';
import { SupportPage } from './pages/SupportPage';
import { BrandPage } from './pages/BrandPage';

// Provider Pages & Layout
import { ProviderLayout } from './pages/provider/ProviderLayout';
import { ProviderDashboardPage } from './pages/provider/ProviderDashboardPage';
import { ProviderOrderWorkbenchPage } from './pages/provider/ProviderOrderWorkbenchPage';
import { ProviderQuestionsPage } from './pages/provider/ProviderQuestionsPage';
import { ProviderEarningsPage } from './pages/provider/ProviderEarningsPage';
import { ProviderOnboardingPage } from './pages/provider/ProviderOnboardingPage';
import { ProviderLoginPage } from './pages/provider/ProviderLoginPage';

// Admin Pages & Layout
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminOrdersPage } from './pages/admin/AdminOrdersPage';
import { AdminAlertsPage } from './pages/admin/AdminAlertsPage';
import { AdminProvidersPage } from './pages/admin/AdminProvidersPage';
import { AdminConfigPage } from './pages/admin/AdminConfigPage';
import { AdminAuditLogPage } from './pages/admin/AdminAuditLogPage';

export function App() {
  return (
    <DemoProvider>
      <BrowserRouter>
        <Routes>
          {/* Surface A: Customer Site */}
          <Route element={<CustomerLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/details" element={<DetailsPage />} />
            <Route path="/speed" element={<SpeedPage />} />
            <Route path="/pay" element={<PaymentPage />} />
            <Route path="/order/:token" element={<OrderStatusPage />} />
            <Route path="/track" element={<TrackOrderPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/coverage" element={<CoveragePage />} />
            <Route path="/not-title-insurance" element={<NotTitleInsurancePage />} />
            <Route path="/legal" element={<LegalTermsPage />} />
            <Route path="/support" element={<SupportPage />} />
          </Route>

          {/* Standalone Brand Specifications Page */}
          <Route path="/brand" element={<BrandPage />} />

          {/* Surface B: Provider Portal */}
          <Route path="/provider/login" element={<ProviderLoginPage />} />
          <Route path="/provider" element={<ProviderLayout />}>
            <Route index element={<ProviderDashboardPage />} />
            <Route path="orders/:orderId" element={<ProviderOrderWorkbenchPage />} />
            <Route path="questions" element={<ProviderQuestionsPage />} />
            <Route path="earnings" element={<ProviderEarningsPage />} />
            <Route path="onboarding" element={<ProviderOnboardingPage />} />
          </Route>

          {/* Surface C: Admin Operations Console */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOrdersPage />} />
            <Route path="alerts" element={<AdminAlertsPage />} />
            <Route path="providers" element={<AdminProvidersPage />} />
            <Route path="config" element={<AdminConfigPage />} />
            <Route path="audit" element={<AdminAuditLogPage />} />
          </Route>

          {/* Catch-all redirect to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </DemoProvider>
  );
}

export default App;
