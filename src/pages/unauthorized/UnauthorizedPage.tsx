import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';
import { useAuth } from '../../auth/AuthContext';

export const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();
  const { role, user } = useAuth();

  const handleReturnDashboard = () => {
    if (role === 'ADMIN') navigate('/admin/dashboard');
    else if (role === 'TRAINER') navigate('/trainer/dashboard');
    else if (role === 'TRAINEE') navigate('/trainee/dashboard');
    else navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E7E5E4] shadow-xl p-8 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center mx-auto text-red-600">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-red-50 text-red-700 border border-red-200">
            HTTP 403 • Access Restricted
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#0F172A]">Unauthorized Access</h1>
          <p className="text-xs text-[#57534E] leading-relaxed">
            You do not have permission to access this secure area of CAPACITY CONNECT as a <strong className="text-[#0D3B66]">{role || 'GUEST'}</strong>.
          </p>
        </div>

        {user && (
          <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-left text-xs">
            <span className="text-[10px] text-[#64748B] block font-mono">AUTHENTICATED USER:</span>
            <span className="font-bold text-[#0F172A]">{user.name}</span> ({user.email})
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white border border-[#E7E5E4] text-xs font-semibold text-[#0F172A] hover:bg-[#FAF8F5] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>

          <button
            onClick={handleReturnDashboard}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0D3B66] text-xs font-semibold text-white hover:bg-[#092b4d] shadow-md transition-all"
          >
            <Home className="w-4 h-4" />
            <span>My Dashboard</span>
          </button>
        </div>
      </div>
    </div>
  );
};
