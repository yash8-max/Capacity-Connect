import React, { useState, useEffect } from 'react';
import { Search, Bell, ArrowRight, Menu, X, Shield, GraduationCap, UserCheck, ChevronDown, Sparkles } from 'lucide-react';
import { User, UserRole } from '../../types';

interface NavbarProps {
  currentUser?: User | null;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
  onSelectRoleLogin: (role: UserRole) => void;
  onNavigate: (sectionId: string) => void;
  onEnterDashboard: () => void;
  isInDashboard?: boolean;
  onBackToLanding?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  onOpenSearch,
  onOpenNotifications,
  unreadNotificationsCount,
  onSelectRoleLogin,
  onNavigate,
  onEnterDashboard,
  isInDashboard = false,
  onBackToLanding,
}) => {
  const safeUser = currentUser || {
    name: 'Priya Sharma',
    role: 'TRAINEE' as UserRole,
    designation: 'Meteorologist Grade-II',
  };
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'About', id: 'about' },
    { label: 'Features', id: 'features' },
    { label: 'Courses', id: 'courses' },
    { label: 'Trainers', id: 'trainers' },
    { label: 'Resources', id: 'resources' },
    { label: 'Certification', id: 'certification' },
  ];

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'ADMIN':
        return 'bg-[#FDF6E2] text-[#9E7318] border-[#E8D49E]';
      case 'TRAINER':
        return 'bg-[#EBF2F7] text-[#0D3B66] border-[#BFD4E6]';
      case 'TRAINEE':
      default:
        return 'bg-[#E8F3F1] text-[#2A7F7E] border-[#B9DDD7]';
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/90 backdrop-blur-md shadow-sm border-b border-[#E7E5E4]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Subtitle */}
          <div
            onClick={() => {
              if (isInDashboard && onBackToLanding) {
                onBackToLanding();
              } else {
                onNavigate('hero');
              }
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Abstract Institutional Logo representing connection, atmosphere and growth */}
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-[#0D3B66] via-[#124578] to-[#2A7F7E] p-2 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
              <svg viewBox="0 0 24 24" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.4)" strokeDasharray="3 3" />
                <path d="M12 3a9 9 0 0 1 9 9" stroke="#EBF2F7" strokeLinecap="round" />
                <circle cx="12" cy="12" r="3.5" fill="#FAF8F5" />
                <path d="M7 16l5-4 5 4" stroke="#B88E28" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#2A7F7E] rounded-full ring-2 ring-white" />
            </div>

            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0F172A] font-sans">
                  CAPACITY <span className="text-[#0D3B66]">CONNECT</span>
                </span>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E7E5E4] text-[#57534E] hidden sm:inline-block">
                  MoES • IMD
                </span>
              </div>
              <p className="text-[11px] text-[#64748B] font-medium tracking-normal hidden md:block">
                Digital Capacity Building & Learning Management Portal
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          {!isInDashboard && (
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="px-3 py-1.5 rounded-lg text-sm font-medium text-[#57534E] hover:text-[#0D3B66] hover:bg-[#F5F0E8]/60 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Global Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-[#E7E5E4] text-[#64748B] hover:text-[#0D3B66] hover:border-[#CBD5E1] shadow-xs text-xs sm:text-sm font-normal transition-all"
              title="Quick Search (Press / or click)"
            >
              <Search className="w-4 h-4 text-[#64748B]" />
              <span className="hidden xl:inline text-xs">Search courses, trainers, skills...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#FAF8F5] border border-[#E7E5E4] rounded text-[#94A3B8]">
                ⌘K
              </kbd>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-xl bg-white border border-[#E7E5E4] text-[#57534E] hover:text-[#0D3B66] hover:bg-[#F5F0E8]/60 transition-colors shadow-xs"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#0D3B66] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-[#FAF8F5]">
                  {unreadNotificationsCount}
                </span>
              )}
            </button>

            {/* Active Role Selector / Demo Quick Switch */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-xs ${getRoleBadgeStyle(
                  safeUser.role
                )}`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                <span>{safeUser.role}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {roleDropdownOpen && (
                <div
                  onMouseLeave={() => setRoleDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-[#E7E5E4] py-1.5 z-50 text-left"
                >
                  <div className="px-3 py-2 border-b border-[#F1F5F9]">
                    <p className="text-[10px] uppercase font-bold text-[#94A3B8] tracking-wider">
                      Switch Role Profile
                    </p>
                    <p className="text-xs font-semibold text-[#0F172A] truncate">{safeUser.name}</p>
                    <p className="text-[11px] text-[#64748B] truncate">{safeUser.designation}</p>
                  </div>

                  <button
                    onClick={() => {
                      onSelectRoleLogin('TRAINEE');
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#F8FAFC] text-[#0F172A]"
                  >
                    <GraduationCap className="w-4 h-4 text-[#2A7F7E]" />
                    <div>
                      <p className="font-semibold">Trainee (Priya Sharma)</p>
                      <p className="text-[10px] text-[#64748B]">Forecaster, Kolkata RMC</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectRoleLogin('TRAINER');
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#F8FAFC] text-[#0F172A]"
                  >
                    <UserCheck className="w-4 h-4 text-[#0D3B66]" />
                    <div>
                      <p className="font-semibold">Trainer (Dr. Rajesh Kumar)</p>
                      <p className="text-[10px] text-[#64748B]">Head of NWP, New Delhi</p>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      onSelectRoleLogin('ADMIN');
                      setRoleDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-[#F8FAFC] text-[#0F172A]"
                  >
                    <Shield className="w-4 h-4 text-[#B88E28]" />
                    <div>
                      <p className="font-semibold">Admin (Director General)</p>
                      <p className="text-[10px] text-[#64748B]">Central Institutional Learning</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Primary Action Button: Explore Platform / Enter Dashboard */}
            {isInDashboard ? (
              <button
                onClick={onBackToLanding}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-[#0D3B66]/30 text-[#0D3B66] text-xs sm:text-sm font-semibold hover:bg-[#EBF2F7] transition-all shadow-xs"
              >
                ← Back to Portal
              </button>
            ) : (
              <button
                onClick={onEnterDashboard}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D3B66] text-white text-xs sm:text-sm font-semibold hover:bg-[#092b4d] active:scale-98 transition-all shadow-sm group"
              >
                <span>Explore Platform</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#57534E] hover:text-[#0F172A] hover:bg-[#F5F0E8]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[#E7E5E4] space-y-2 bg-[#FAF8F5]">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-[#57534E] hover:bg-[#F5F0E8] rounded-lg"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#E7E5E4] px-4">
              <button
                onClick={() => {
                  onEnterDashboard();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0D3B66] text-white text-sm font-semibold"
              >
                {isInDashboard ? 'View Portal Home' : 'Enter Dashboard →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
