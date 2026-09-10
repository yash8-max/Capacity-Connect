import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Shield, UserCheck, GraduationCap, Lock, Mail, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Building2 } from 'lucide-react';
import { UserRole } from '../../types';
import { AuthService } from '../../auth/authService';
import { useAuth } from '../../auth/AuthContext';

export const LoginPage: React.FC = () => {
  const { roleParam } = useParams<{ roleParam?: string }>();
  const navigate = useNavigate();
  const { login } = useAuth();

  // Determine role from route parameter
  const role: UserRole = roleParam?.toUpperCase() === 'ADMIN'
    ? 'ADMIN'
    : roleParam?.toUpperCase() === 'TRAINER'
    ? 'TRAINER'
    : 'TRAINEE';

  // Default demo credentials per role
  const defaultCredentials = {
    ADMIN: { email: 'admin@capacityconnect.gov.in', pass: 'Admin@12345' },
    TRAINER: { email: 'trainer@capacityconnect.gov.in', pass: 'Trainer@12345' },
    TRAINEE: { email: 'trainee@capacityconnect.gov.in', pass: 'Trainee@12345' },
  };

  const [email, setEmail] = useState(defaultCredentials[role].email);
  const [password, setPassword] = useState(defaultCredentials[role].pass);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [roleMismatchData, setRoleMismatchData] = useState<{ actualRole: UserRole; userObj: any } | null>(null);
  const [showDemoBox, setShowDemoBox] = useState(true);

  // Role metadata
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
      dashboardPath: '/admin/dashboard',
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
      dashboardPath: '/trainer/dashboard',
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
      dashboardPath: '/trainee/dashboard',
    },
  }[role];

  const IconComponent = roleMeta.icon;

  const handleFillDemo = () => {
    setEmail(defaultCredentials[role].email);
    setPassword(defaultCredentials[role].pass);
    setErrorMessage('');
    setRoleMismatchData(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setRoleMismatchData(null);

    if (!email || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = AuthService.loginWithCredentials(email, password, role);
      setIsLoading(false);

      if (result.success && result.user) {
        login(result.user);
        navigate(roleMeta.dashboardPath);
      } else if (result.roleMismatch && result.user) {
        setRoleMismatchData({ actualRole: result.user.role, userObj: result.user });
        setErrorMessage(result.error || 'Role mismatch detected.');
      } else {
        setErrorMessage(result.error || 'Unable to sign in. Please check your institutional credentials.');
      }
    }, 400);
  };

  const handleSwitchToCorrectRole = (actualRole: UserRole, userObj: any) => {
    login(userObj);
    const paths = {
      ADMIN: '/admin/dashboard',
      TRAINER: '/trainer/dashboard',
      TRAINEE: '/trainee/dashboard',
    };
    navigate(paths[actualRole]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between antialiased text-[#0F172A]">
      {/* Top Header */}
      <header className="w-full bg-white border-b border-[#E7E5E4] px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#0D3B66] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm group-hover:bg-[#092b4d] transition-all">
            CC
          </div>
          <div>
            <span className="font-serif font-bold text-base text-[#0F172A] tracking-tight block">CAPACITY CONNECT</span>
            <span className="text-[10px] text-[#64748B] tracking-wider uppercase font-mono block">MoES & IMD India</span>
          </div>
        </Link>

        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D3B66] hover:text-[#2A7F7E] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Portal Landing</span>
        </Link>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-5xl bg-white rounded-3xl border border-[#E7E5E4] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 animate-fade-in">
          
          {/* LEFT COLUMN: Role Info & Scientific Brand */}
          <div className="lg:col-span-5 p-8 sm:p-10 bg-[#FAF8F5] border-r border-[#E7E5E4] flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded bg-white border border-[#E7E5E4] text-[#0D3B66]">
                  Secure SSO Portal • PS 26075
                </span>
              </div>

              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-sm ${roleMeta.accent}`}>
                <IconComponent className="w-7 h-7" />
              </div>

              <h1 className="text-3xl font-serif font-black text-[#0F172A] tracking-tight mb-2">
                {roleMeta.title}
              </h1>

              <p className="text-xs font-semibold text-[#64748B] mb-4">
                {roleMeta.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#57534E] leading-relaxed mb-8">
                {roleMeta.description}
              </p>

              {/* Channel Selector Tabs */}
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">Select Access Channel:</p>
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    to="/login/admin"
                    className={`px-3 py-2 rounded-xl text-center text-xs font-semibold border transition-all ${
                      role === 'ADMIN'
                        ? 'bg-[#0D3B66] text-white border-[#0D3B66] shadow-sm'
                        : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    Admin
                  </Link>
                  <Link
                    to="/login/trainer"
                    className={`px-3 py-2 rounded-xl text-center text-xs font-semibold border transition-all ${
                      role === 'TRAINER'
                        ? 'bg-[#0D3B66] text-white border-[#0D3B66] shadow-sm'
                        : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    Trainer
                  </Link>
                  <Link
                    to="/login/trainee"
                    className={`px-3 py-2 rounded-xl text-center text-xs font-semibold border transition-all ${
                      role === 'TRAINEE'
                        ? 'bg-[#0D3B66] text-white border-[#0D3B66] shadow-sm'
                        : 'bg-white text-[#57534E] border-[#E7E5E4] hover:bg-[#FAF8F5]'
                    }`}
                  >
                    Trainee
                  </Link>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-[#E7E5E4] mt-8">
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-[#2A7F7E]" />
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">Ministry of Earth Sciences</p>
                  <p className="text-[11px] text-[#64748B]">India Meteorological Department</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Form & Demo Credentials */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md w-full mx-auto space-y-6">
              
              <div>
                <h2 className="text-2xl font-serif font-bold text-[#0F172A] mb-1">Sign In to Dashboard</h2>
                <p className="text-xs text-[#64748B]">Enter your government credentials or use seeded demo account.</p>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs flex flex-col gap-3 animate-fade-in">
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Authentication Error</p>
                      <p className="text-red-700">{errorMessage}</p>
                    </div>
                  </div>

                  {roleMismatchData && (
                    <button
                      onClick={() => handleSwitchToCorrectRole(roleMismatchData.actualRole, roleMismatchData.userObj)}
                      className="self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold text-xs hover:bg-red-700 transition-colors"
                    >
                      <span>Continue to {roleMismatchData.actualRole} Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Institutional Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. admin@capacityconnect.gov.in"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs text-[#0F172A] focus:outline-none focus:border-[#0D3B66] focus:bg-white transition-all font-mono"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-[#0F172A]">Password</label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Password reset link sent to your registered IMD email address.'); }} className="text-[11px] font-medium text-[#2A7F7E] hover:underline">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-[#94A3B8]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-12 py-3 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs text-[#0F172A] focus:outline-none focus:border-[#0D3B66] focus:bg-white transition-all font-mono"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-[#94A3B8] hover:text-[#0F172A]"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between py-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-[#E7E5E4] text-[#0D3B66] focus:ring-[#0D3B66]"
                    />
                    <span className="text-xs text-[#64748B]">Remember this device</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3.5 rounded-xl text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2 ${roleMeta.button}`}
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Sign In as {role}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Demo Credentials Helper Box */}
              {showDemoBox && (
                <div className="p-4 rounded-2xl bg-[#F5F0E8] border border-[#E7E5E4] text-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#0F172A] flex items-center gap-1.5 font-mono">
                      <span className="w-2 h-2 rounded-full bg-[#B88E28]" />
                      Demo Credentials ({role})
                    </span>
                    <button
                      type="button"
                      onClick={handleFillDemo}
                      className="text-[11px] font-semibold text-[#0D3B66] hover:underline"
                    >
                      Auto-fill
                    </button>
                  </div>
                  <div className="text-[11px] text-[#57534E] space-y-1 font-mono">
                    <p>Email: <strong className="text-[#0F172A]">{defaultCredentials[role].email}</strong></p>
                    <p>Password: <strong className="text-[#0F172A]">{defaultCredentials[role].pass}</strong></p>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs text-[#64748B] border-t border-[#E7E5E4] bg-white">
        Ministry of Earth Sciences • India Meteorological Department © 2026. All rights reserved.
      </footer>
    </div>
  );
};
