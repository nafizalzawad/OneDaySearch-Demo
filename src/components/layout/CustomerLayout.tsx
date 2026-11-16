import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Logo } from '../brand/Logo';
import { useDemo } from '../../context/DemoContext';
import { DemoDock } from '../demo/DemoDock';
import { SmsBubble } from '../demo/SmsBubble';

export const CustomerLayout: React.FC = () => {
  const { theme, logoDirection } = useDemo();
  const location = useLocation();

  const isGreenTheme = theme === 'vibrant-green';
  const isDarkTheme = theme === 'dark-brand';
  const isHomePage = location.pathname === '/';

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-200 ${
        isGreenTheme
          ? 'bg-[#187E5F] text-white'
          : isDarkTheme
          ? 'bg-[#00381F] text-white'
          : 'bg-[#F4FBF8] text-[#1C2733]'
      }`}
    >
      {/* Signature Emerald Water Ribbon */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#E6F7F2] via-[#2DD4A0] to-[#00381F] shrink-0" />

      {/* SMS Simulator Notification */}
      <SmsBubble />

      {/* Floating Demo Dock */}
      <DemoDock />

      {/* Header */}
      <header
        className={`w-full transition-colors duration-150 sticky top-0 z-40 backdrop-blur-md shrink-0 ${
          isGreenTheme
            ? 'bg-[#0B5844]/95 text-white border-b border-white/15 shadow-sm'
            : isDarkTheme
            ? 'bg-[#00381F]/95 text-white border-b border-white/10'
            : 'bg-white/95 text-[#1C2733] border-b border-[#D1E5DE]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link to="/" className="focus:outline-none">
            <Logo
              direction={logoDirection}
              variant={isGreenTheme || isDarkTheme ? 'dark' : 'light'}
              size="md"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/track"
              className={`text-sm font-bold transition-colors ${
                isGreenTheme
                  ? 'text-white hover:text-[#2DD4A0]'
                  : isDarkTheme
                  ? 'text-gray-200 hover:text-[#2DD4A0]'
                  : 'text-[#5A6B7F] hover:text-[#1C2733]'
              }`}
            >
              Track an order
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0">
        <Outlet />
      </main>

      {/* Customer Footer */}
      <footer
        className={`w-full text-xs transition-colors z-10 relative shrink-0 py-4 sm:py-5 ${
          isGreenTheme
            ? 'bg-[#00381F] text-gray-300 border-t border-[#00381F]'
            : isDarkTheme
            ? 'bg-[#002715] text-gray-400 border-t border-white/10'
            : 'bg-white text-[#5A6B7F] border-t border-[#D1E5DE]'
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 pl-0 sm:pl-28">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-1.5 text-[11px] sm:text-xs">
              <Link to="/how-it-works" className="hover:text-white transition-colors">
                How it works
              </Link>
              <Link to="/pricing" className="hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/coverage" className="hover:text-white transition-colors">
                Coverage (MD · VA · DC)
              </Link>
              <Link to="/not-title-insurance" className="hover:text-white transition-colors">
                Not title insurance
              </Link>
              <Link to="/legal" className="hover:text-white transition-colors">
                Terms &amp; Privacy
              </Link>
              <Link to="/support" className="hover:text-white transition-colors">
                Support
              </Link>
              <Link to="/brand" className="text-[#2DD4A0] hover:underline font-bold transition-colors">
                Brand specs
              </Link>
            </div>
            <div className="text-[10px] sm:text-[11px] text-gray-400 text-center sm:text-right">
              © {new Date().getFullYear()} OneDaySearch LLC. Title search marketplace.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
