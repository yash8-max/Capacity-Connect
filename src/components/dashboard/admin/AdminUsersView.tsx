import React, { useState } from 'react';
import { User } from '../../../types';
import { INITIAL_USERS } from '../../../data/mockData';
import { Users, Search, Plus, Shield, UserCheck, GraduationCap, MoreVertical, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

interface AdminUsersViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const AdminUsersView: React.FC<AdminUsersViewProps> = ({ currentUser, onToast }) => {
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [activeTab, setActiveTab] = useState<'all' | 'TRAINEE' | 'TRAINER' | 'ADMIN' | 'pending'>('all');
  const [search, setSearch] = useState('');
  const [addUserModal, setAddUserModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState<'TRAINEE' | 'TRAINER' | 'ADMIN'>('TRAINEE');
  const [newDesignation, setNewDesignation] = useState('');

  const filtered = users.filter((u) => {
    const matchesTab = 
      activeTab === 'all' ? true :
      activeTab === 'pending' ? false : u.role === activeTab;
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()) || u.organization.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newEmail) return;

    const newUser: User = {
      id: `user-${Date.now()}`,
      name: newName,
      email: newEmail,
      role: newRole,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
      designation: newDesignation || 'Meteorological Officer',
      department: 'Operational Forecasting',
      organization: 'India Meteorological Department (IMD)',
      division: 'RMC New Delhi',
      location: 'New Delhi',
      joinedDate: new Date().toISOString().split('T')[0],
      bio: 'Newly onboarded institutional officer.',
    };

    setUsers([newUser, ...users]);
    setAddUserModal(false);
    setNewName('');
    setNewEmail('');
    setNewDesignation('');
    onToast(`Successfully registered ${newName} as ${newRole}`);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">User Management & Role Governance</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Manage administrative personnel, faculty trainers, and regional forecaster trainee accounts across IMD stations.
          </p>
        </div>
        <button
          onClick={() => setAddUserModal(true)}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs sm:text-sm font-semibold hover:bg-[#092b4d] shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add New User</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
            {(['all', 'TRAINEE', 'TRAINER', 'ADMIN', 'pending'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-[#0D3B66] text-white shadow-xs'
                    : 'bg-[#FAF8F5] border border-[#E7E5E4] text-[#57534E] hover:border-[#0D3B66]'
                }`}
              >
                {tab === 'all' ? 'All Users' : tab}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, station..."
              className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl pl-10 pr-4 py-2 text-xs text-[#0F172A] outline-none focus:border-[#0D3B66]"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#E7E5E4] text-[11px] font-mono text-[#94A3B8] uppercase">
                <th className="py-3 px-4">Officer Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Designation & Station</th>
                <th className="py-3 px-4">Joined Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E7E5E4] text-xs">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-[#FAF8F5] transition-colors">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-[#0F172A]">{u.name}</p>
                      <p className="text-[11px] text-[#64748B]">{u.email}</p>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono ${
                        u.role === 'ADMIN'
                          ? 'bg-[#FDF6E2] text-[#9E7318]'
                          : u.role === 'TRAINER'
                          ? 'bg-[#EBF2F7] text-[#0D3B66]'
                          : 'bg-[#E8F3F1] text-[#2A7F7E]'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <p className="font-medium text-[#0F172A]">{u.designation}</p>
                    <p className="text-[11px] text-[#64748B]">{u.organization} • {u.location}</p>
                  </td>
                  <td className="py-4 px-4 font-mono text-[#64748B]">{u.joinedDate}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => onToast(`Opening administrative profile for ${u.name}`)}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#E7E5E4] text-xs font-semibold text-[#0F172A] hover:bg-[#0D3B66] hover:text-white transition-all"
                    >
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {addUserModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <h3 className="text-lg font-bold text-[#0F172A]">Register New Institutional Officer</h3>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#57534E] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Dr. Ramesh Kumar"
                  className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none focus:border-[#0D3B66]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#57534E] mb-1">Official Email</label>
                <input
                  type="email"
                  required
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="e.g. ramesh.kumar@imd.gov.in"
                  className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none focus:border-[#0D3B66]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#57534E] mb-1">Role & Permissions</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as any)}
                  className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none focus:border-[#0D3B66]"
                >
                  <option value="TRAINEE">Trainee Forecaster</option>
                  <option value="TRAINER">Faculty Trainer</option>
                  <option value="ADMIN">Administrator</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#57534E] mb-1">Designation & Station</label>
                <input
                  type="text"
                  value={newDesignation}
                  onChange={(e) => setNewDesignation(e.target.value)}
                  placeholder="e.g. Scientist-C, RMC Mumbai"
                  className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl px-4 py-2.5 text-xs text-[#0F172A] outline-none focus:border-[#0D3B66]"
                />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E7E5E4]">
                <button
                  type="button"
                  onClick={() => setAddUserModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs font-semibold text-[#57534E]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0D3B66] text-xs font-semibold text-white hover:bg-[#092b4d]"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
