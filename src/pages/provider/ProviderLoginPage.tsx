import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Logo } from '../../components/brand/Logo';
import { useDemo } from '../../context/DemoContext';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';

export const ProviderLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { logoDirection } = useDemo();
  const [email, setEmail] = useState<string>('m.vance@vancetitle.example');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/provider');
  };

  return (
    <div className="min-h-screen bg-[#F4F6FA] flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white rounded-card border border-[#D1E2E5] shadow-soft p-8 text-left">
        <div className="text-center mb-6">
          <Logo direction={logoDirection} variant="light" layout="stacked" size="md" />
          <div className="mt-3 inline-block px-2.5 py-0.5 rounded bg-[#1C2733] text-white text-[10px] font-bold uppercase tracking-wider">
            Abstractor Partner Portal
          </div>
        </div>

        <h1 className="text-xl font-extrabold text-[#1C2733] mb-1">
          Sign In to Dispatch Workbench
        </h1>
        <p className="text-xs text-[#5A6B7F] mb-6">
          Authorized independent title abstractors only.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#1C2733] mb-1">
              Registered Abstractor Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#D1E2E5] focus:outline-none focus:ring-2 focus:ring-[#1E535E]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#1C2733] mb-1">
              Access Code / Password
            </label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#D1E2E5] focus:outline-none focus:ring-2 focus:ring-[#1E535E] font-mono"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="btn-primary w-full py-3 text-xs sm:text-sm font-bold shadow-soft flex items-center justify-center gap-2"
            >
              <span>Sign In to Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-[#D1E2E5] text-center text-xs text-[#5A6B7F]">
          <Link to="/" className="text-[#1C2733] hover:underline font-semibold">
            ← Return to Customer Site
          </Link>
        </div>
      </div>
    </div>
  );
};
