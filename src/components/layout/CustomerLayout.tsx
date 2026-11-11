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
    <div className="min-h-screen flex flex-col bg-[var(--theme-page-bg)] text-[#1C2733] selection:bg-[#DBFCC5] selection:text-[#1C2733]">
      {/* SMS Simulator Notification */}
      <SmsBubble />

      {/* Floating Demo Dock */}
      <DemoDock />

      {/* Header */}
      <header
        className={`w-full transition-colors duration-150 ${
          theme === 'green-brand'
            ? 'bg-[#1C2733] text-white border-b border-white/10'
            : 'bg-white text-[#1C2733] border-b border-[#E3E8F0]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="focus:outline-none">
            <Logo
              direction={logoDirection}
              variant={theme === 'green-brand' ? 'dark' : 'light'}
              size="md"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/track"
              className={`text-sm font-semibold transition-colors ${
                theme === 'green-brand'
                  ? 'text-gray-200 hover:text-[#6AE878]'
                  : 'text-[#5A6B7F] hover:text-[#1C2733]'
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
      <footer className="w-full bg-white border-t border-[#E3E8F0] py-8 text-xs text-[#5A6B7F] z-10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pl-0 sm:pl-28">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
              <Link to="/how-it-works" className="hover:text-[#1C2733] transition-colors">
                How it works
              </Link>
              <Link to="/pricing" className="hover:text-[#1C2733] transition-colors">
                Pricing
              </Link>
              <Link to="/coverage" className="hover:text-[#1C2733] transition-colors">
                Coverage (MD · VA · DC)
              </Link>
              <Link to="/not-title-insurance" className="hover:text-[#1C2733] transition-colors">
                Not title insurance
              </Link>
              <Link to="/legal" className="hover:text-[#1C2733] transition-colors">
                Terms &amp; Privacy
              </Link>
              <Link to="/support" className="hover:text-[#1C2733] transition-colors">
                Support
              </Link>
              <Link to="/brand" className="text-[#00BC82] hover:underline font-semibold transition-colors">
                Brand specs
              </Link>
            </div>
            <div className="text-[11px] text-[#5A6B7F] text-center sm:text-right">
              © {new Date().getFullYear()} OneDaySearch LLC. Title search marketplace.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
