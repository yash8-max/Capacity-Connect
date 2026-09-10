import React from 'react';
import { User } from '../../../types';
import { Settings, Shield } from 'lucide-react';

interface AdminSettingsViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({ currentUser, onToast }) => {
  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8">
        <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Institutional System Settings</h2>
        <p className="text-xs sm:text-sm text-[#64748B] mt-1">
          Configure security policies, API integrations, WMO competency criteria, and notification gateways.
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E5E4]">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">Gemini AI Intelligence Gateway</h3>
            <p className="text-xs text-[#64748B]">Connected to Google GenAI SDK (gemini-3.8-flash) for automated recommendations & chat.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            Active & Secure
          </span>
        </div>
        <div className="flex items-center justify-between pb-6 border-b border-[#E7E5E4]">
          <div>
            <h3 className="text-sm font-bold text-[#0F172A]">WMO Compliance Engine</h3>
            <p className="text-xs text-[#64748B]">Enforcing rigorous baseline competency standards for meteorological forecasters.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
            Enforced
          </span>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => onToast('System configuration settings saved successfully')}
            className="px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};
