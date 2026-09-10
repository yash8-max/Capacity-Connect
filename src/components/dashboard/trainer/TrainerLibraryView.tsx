import React, { useState } from 'react';
import { User, ResourceItem } from '../../../types';
import { RESOURCES } from '../../../data/mockData';
import { FolderOpen, FileText, Upload } from 'lucide-react';

interface TrainerLibraryViewProps {
  currentUser: User;
  onToast: (msg: string) => void;
}

export const TrainerLibraryView: React.FC<TrainerLibraryViewProps> = ({ currentUser, onToast }) => {
  const [resources, setResources] = useState<ResourceItem[]>(RESOURCES);

  return (
    <div className="space-y-6 text-left">
      <div className="bg-white rounded-3xl border border-[#E7E5E4] p-6 sm:p-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">Trainer Resource Library</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Upload and manage study materials, recorded lectures, PDFs, and reference papers.
          </p>
        </div>
        <button
          onClick={() => onToast('Resource upload dialog opened')}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0D3B66] text-white text-xs font-semibold hover:bg-[#092b4d]"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Resource</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res) => (
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
              Download Material
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
