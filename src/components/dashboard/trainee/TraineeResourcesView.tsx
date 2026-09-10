import React, { useState } from 'react';
import { User, ResourceItem } from '../../../types';
import { RESOURCES } from '../../../data/mockData';
import { FolderOpen, FileText, Search } from 'lucide-react';

interface TraineeResourcesViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TraineeResourcesView: React.FC<TraineeResourcesViewProps> = ({ currentUser, onToast }) => {
  const [resources] = useState<ResourceItem[]>(RESOURCES);
  const [search, setSearch] = useState('');

  const filtered = resources.filter(r => r.title.toLowerCase().includes(search.toLowerCase()) || r.topic.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Institutional Resources Library</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Access study materials, recorded lectures, PDFs, and reference manuals.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full bg-[#FAF8F5] border border-[#E7E5E4] rounded-xl pl-10 pr-4 py-2 text-xs text-[#0F172A] outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((res) => (
          <div key={res.id} className="bg-white rounded-3xl border border-[#E7E5E4] p-6 shadow-xs space-y-4">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-[#FAF3EE] text-[#D97706] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E7E5E4] text-[10px] font-bold uppercase font-mono text-[#57534E]">
                {res.type}
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0F172A]">{res.title}</h3>
              <p className="text-xs text-[#64748B] mt-1">Topic: {res.topic} • {res.fileSize}</p>
            </div>
            <button
              onClick={() => onToast(`Downloading resource: ${res.title}`)}
              className="w-full py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E7E5E4] text-xs font-semibold text-[#0F172A] hover:bg-[#0D3B66] hover:text-white transition-all"
            >
              Download PDF / Material
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
