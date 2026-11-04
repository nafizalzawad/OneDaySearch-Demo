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
      <div className="w-full max-w-md bg-white rounded-card border border-[#E3E8F0] shadow-soft p-8 text-left">
        <div className="text-center mb-6">
          <Logo direction={logoDirection} variant="light" layout="stacked" size="md" />
          <div className="mt-3 inline-block px-2.5 py-0.5 rounded bg-[#0B1B33] text-white text-[10px] font-bold uppercase tracking-wider">
            Abstractor Partner Portal
          </div>
        </div>

        <h1 className="text-xl font-extrabold text-[#0B1B33] mb-1">
          Sign In to Dispatch Workbench
        </h1>
        <p className="text-xs text-[#4F5F78] mb-6">
          Authorized independent title abstractors only.
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#0B1B33] mb-1">
              Registered Abstractor Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#E3E8F0] focus:outline-none focus:ring-2 focus:ring-[#F2A33A]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#0B1B33] mb-1">
              Access Code / Password
            </label>
            <input
              type="password"
              defaultValue="••••••••••••"
              className="w-full text-xs sm:text-sm p-3 rounded-lg border border-[#E3E8F0] focus:outline-none focus:ring-2 focus:ring-[#F2A33A] font-mono"
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

        <div className="mt-6 pt-5 border-t border-[#E3E8F0] text-center text-xs text-[#4F5F78]">
          <Link to="/" className="text-[#0B1B33] hover:underline font-semibold">
            ← Return to Customer Site
          </Link>
        </div>
      </div>
    </div>
  );
};
