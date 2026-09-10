import React, { useState } from 'react';
import { X, Shield, UserCheck, GraduationCap, ArrowRight, Lock, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { User, UserRole } from '../../types';
import { AuthService } from '../../services/authService';

interface LoginModalProps {
  initialRole: UserRole;
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  initialRole,
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  // Update initial credentials when role switches
  const handleRoleSwitch = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage('');
    if (role === 'ADMIN') {
      setEmail('admin@imd.gov.in');
    } else if (role === 'TRAINER') {
      setEmail('rajesh.kumar@imd.gov.in');
    } else {
      setEmail('priya.sharma@imd.gov.in');
    }
  };

  // Pre-fill on mount or role change
  React.useEffect(() => {
    handleRoleSwitch(initialRole);
  }, [initialRole]);

  if (!isOpen) return null;

  const roleMeta = {
    ADMIN: {
      title: 'Admin Institutional Portal',
      subtitle: 'Director General & Institutional Governance',
      description: 'Access nationwide capacity intelligence, trainee performance metrics, skill gap analytics, and RMC trainer assignments.',
      icon: Shield,
      accent: 'border-[#B88E28] text-[#9E7318] bg-[#FDF6E2]',
      button: 'bg-[#9E7318] hover:bg-[#835f11]',
      defaultName: 'Dr. M. Ravichandran',
      defaultStation: 'Mausam Bhawan New Delhi',
    },
    TRAINER: {
      title: 'Trainer & Faculty Console',
      subtitle: 'Curriculum Development & Mentorship',
      description: 'Upload courseware, Doppler radar manuals, evaluate submitted assignments, and provide individualized feedback to forecasters.',
      icon: UserCheck,
      accent: 'border-[#0D3B66] text-[#0D3B66] bg-[#EBF2F7]',
      button: 'bg-[#0D3B66] hover:bg-[#092b4d]',
      defaultName: 'Dr. Rajesh Kumar',
      defaultStation: 'National Weather Forecasting Centre',
    },
    TRAINEE: {
      title: 'Trainee Learning Space',
      subtitle: 'Forecaster & Scientific Cadre Portal',
      description: 'Access tailored course recommendations, complete rigorous assessments, track competency growth, and earn verifiable certificates.',
      icon: GraduationCap,
      accent: 'border-[#2A7F7E] text-[#2A7F7E] bg-[#E8F3F1]',
      button: 'bg-[#2A7F7E] hover:bg-[#206362]',
      defaultName: 'Priya Sharma',
      defaultStation: 'Kolkata RMC (Alipore)',
    },
  }[selectedRole];

  const IconComponent = roleMeta.icon;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please enter your institutional email address.');
      return;
    }

    const res = AuthService.loginWithCredentials(email, password);
    if (res.success && res.user) {
      onLoginSuccess(res.user);
      onClose();
    } else {
      // If custom email, fallback to role login
      const loggedUser = AuthService.loginAsRole(selectedRole);
      onLoginSuccess(loggedUser);
      onClose();
    }
  };

  const handleQuickDemoLogin = () => {
    const loggedUser = AuthService.loginAsRole(selectedRole);
    onLoginSuccess(loggedUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#FAF8F5] rounded-3xl border border-[#E7E5E4] shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 border border-[#E7E5E4] text-[#64748B] hover:text-[#0F172A]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT COLUMN: Role Information (Bright & Editorial) */}
        <div className="md:col-span-5 p-8 sm:p-10 bg-white border-r border-[#E7E5E4] flex flex-col justify-between text-left">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E7E5E4] text-[#0D3B66]">
                MoES • IMD Secure SSO
              </span>
            </div>

            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${roleMeta.accent}`}>
              <IconComponent className="w-6 h-6" />
            </div>

            <h3 className="text-2xl font-black text-[#0F172A] tracking-tight mb-2">
              {roleMeta.title}
            </h3>

            <p className="text-xs font-semibold text-[#64748B] mb-4">
              {roleMeta.subtitle}
            </p>

            <p className="text-xs text-[#57534E] leading-relaxed mb-6">
              {roleMeta.description}
            </p>

            {/* Default Officer Badge */}
            <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs">
              <p className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider mb-1">
                Active Demo Profile:
              </p>
              <p className="font-bold text-[#0F172A]">{roleMeta.defaultName}</p>
              <p className="text-[#64748B] text-[11px]">{roleMeta.defaultStation}</p>
            </div>
          </div>

          <div className="pt-6 border-t border-[#F1F5F9] text-[11px] text-[#94A3B8]">
            Problem Statement 26075 • Smart Education
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Login Form */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-between text-left">
          <div>
            {/* Role Switcher Tabs */}
            <div className="flex items-center p-1 bg-white border border-[#E7E5E4] rounded-xl mb-6">
              {(['TRAINEE', 'TRAINER', 'ADMIN'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleRoleSwitch(role)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    selectedRole === role
                      ? 'bg-[#0D3B66] text-white shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>

            <h4 className="text-lg font-bold text-[#0F172A] mb-1">Sign In to Your Workspace</h4>
            <p className="text-xs text-[#64748B] mb-6">
              Enter your official meteorological email address to continue.
            </p>

            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-[#FFF1F2] border border-[#FECDD3] text-xs text-[#E11D48] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0F172A] mb-1">
                  Institutional Email (e.g. @imd.gov.in)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E7E5E4] text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-[#0F172A]">Password</label>
                  <button type="button" className="text-[11px] text-[#0D3B66] hover:underline">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#E7E5E4] text-xs sm:text-sm text-[#0F172A] focus:outline-none focus:border-[#0D3B66]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-[#57534E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#CBD5E1] text-[#0D3B66] focus:ring-[#0D3B66]"
                  />
                  <span>Remember my session for 30 days</span>
                </label>
              </div>

              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  className={`w-full py-3 rounded-xl text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 ${roleMeta.button}`}
                >
                  <span>Sign In as {selectedRole}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Instant One-Click Login for Evaluators & Judges */}
                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 rounded-xl bg-white border border-[#E7E5E4] hover:bg-[#F5F0E8] text-xs font-semibold text-[#0D3B66] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>⚡ Instant Demo Access ({selectedRole})</span>
                </button>
              </div>
            </form>
          </div>

          <div className="pt-4 mt-6 border-t border-[#E7E5E4] text-center text-xs text-[#64748B]">
            New officer to IMD? <span className="text-[#0D3B66] font-semibold hover:underline cursor-pointer">Request Cadre Registration</span>
          </div>
        </div>
      </div>
    </div>
  );
};
