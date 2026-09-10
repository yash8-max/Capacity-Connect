import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CheckSquare,
  Award,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  Search,
  Shield,
  Menu,
  X,
  ChevronRight,
  TrendingUp,
  FileText,
  UserCheck,
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { CapacityAIWidget } from '../components/common/CapacityAIWidget';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigationItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users & Roles', path: '/admin/users', icon: Users },
    { label: 'Trainers Roster', path: '/admin/trainers', icon: UserCheck },
    { label: 'Trainees Directory', path: '/admin/trainees', icon: GraduationCap },
    { label: 'Courses Management', path: '/admin/courses', icon: BookOpen },
    { label: 'Enrollments', path: '/admin/enrollments', icon: TrendingUp },
    { label: 'Assessments', path: '/admin/assessments', icon: CheckSquare },
    { label: 'Certifications', path: '/admin/certifications', icon: Award },
    { label: 'Competency Mapping', path: '/admin/competencies', icon: BarChart3 },
    { label: 'Analytics & Audits', path: '/admin/analytics', icon: BarChart3 },
    { label: 'Announcements', path: '/admin/announcements', icon: Bell },
    { label: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0F172A] flex flex-col md:flex-row antialiased">
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-[#E7E5E4] p-6 sticky top-0 h-screen z-30">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#0D3B66] flex items-center justify-center text-white font-serif font-bold text-lg shadow-sm">
            CC
          </div>
          <div>
            <span className="font-serif font-bold text-sm text-[#0F172A] tracking-tight block">CAPACITY CONNECT</span>
            <span className="text-[10px] text-[#9E7318] uppercase font-mono font-bold tracking-wider block">Admin Console</span>
          </div>
        </div>

        {/* User Card */}
        <div className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E7E5E4] mb-6 flex items-center gap-3">
          <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-xl object-cover" />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-[#0F172A] truncate">{user?.name}</p>
            <p className="text-[10px] text-[#64748B] truncate">Administrator</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto no-scrollbar pr-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-[#0D3B66] text-white shadow-xs'
                    : 'text-[#57534E] hover:bg-[#FAF8F5] hover:text-[#0F172A]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <div className="pt-4 border-t border-[#E7E5E4] mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MOBILE HEADER */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b border-[#E7E5E4] sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#0D3B66] flex items-center justify-center text-white font-bold text-sm">
            CC
          </div>
          <span className="font-serif font-bold text-sm text-[#0F172A]">Admin Portal</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-[#FAF8F5] border border-[#E7E5E4] text-[#0F172A]"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex">
          <div className="w-72 bg-white h-full p-6 flex flex-col justify-between shadow-2xl animate-slide-right">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-serif font-bold text-sm text-[#0F172A]">Admin Navigation</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg text-[#64748B]">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-1">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-[#0D3B66] text-white' : 'text-[#57534E] hover:bg-[#FAF8F5]'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-600 bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-[#E7E5E4] sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <Shield className="w-4 h-4 text-[#9E7318]" />
            <span className="font-mono uppercase tracking-wider font-semibold text-[#0D3B66]">Admin Governance Portal</span>
            <span>•</span>
            <span>Ministry of Earth Sciences</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-medium text-[#57534E]">Logged in as <strong className="text-[#0F172A]">{user?.name}</strong></span>
            <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover ring-2 ring-[#0D3B66]/20" />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
        {user && <CapacityAIWidget currentUser={user} />}
      </div>
    </div>
  );
};
