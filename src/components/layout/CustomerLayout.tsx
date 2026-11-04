import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Logo } from '../brand/Logo';
import { useDemo } from '../../context/DemoContext';
import { DemoDock } from '../demo/DemoDock';
import { SmsBubble } from '../demo/SmsBubble';

export const CustomerLayout: React.FC = () => {
  const { theme, logoDirection } = useDemo();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-[var(--theme-page-bg)] text-[#0B1B33] selection:bg-[#FDEBD0] selection:text-[#0B1B33]">
      {/* SMS Simulator Notification */}
      <SmsBubble />

      {/* Floating Demo Dock */}
      <DemoDock />

      {/* Header */}
      <header
        className={`w-full transition-colors duration-150 ${
          theme === 'navy-brand'
            ? 'bg-[#0B1B33] text-white border-b border-white/10'
            : 'bg-white text-[#0B1B33] border-b border-[#E3E8F0]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="focus:outline-none">
            <Logo
              direction={logoDirection}
              variant={theme === 'navy-brand' ? 'dark' : 'light'}
              size="md"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/track"
              className={`text-sm font-semibold transition-colors ${
                theme === 'navy-brand'
                  ? 'text-gray-200 hover:text-[#F2A33A]'
                  : 'text-[#4F5F78] hover:text-[#0B1B33]'
              }`}
            >
              Track an order
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Customer Footer */}
      <footer className="w-full bg-white border-t border-[#E3E8F0] py-8 text-xs text-[#4F5F78] z-10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pl-0 sm:pl-28">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
              <Link to="/how-it-works" className="hover:text-[#0B1B33] transition-colors">
                How it works
              </Link>
              <Link to="/pricing" className="hover:text-[#0B1B33] transition-colors">
                Pricing
              </Link>
              <Link to="/coverage" className="hover:text-[#0B1B33] transition-colors">
                Coverage (MD · VA · DC)
              </Link>
              <Link to="/not-title-insurance" className="hover:text-[#0B1B33] transition-colors font-medium text-[#0B1B33]">
                Not Title Insurance Notice
              </Link>
              <Link to="/legal" className="hover:text-[#0B1B33] transition-colors">
                Terms &amp; Privacy
              </Link>
              <Link to="/support" className="hover:text-[#0B1B33] transition-colors">
                Support
              </Link>
              <Link to="/brand" className="hover:text-[#0B1B33] text-[#e09228] font-bold transition-colors">
                Brand Specs
              </Link>
            </div>
            <div className="text-[11px] text-[#4F5F78] text-center sm:text-right">
              © {new Date().getFullYear()} OneDaySearch LLC. Title search marketplace.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
