import React, { useState } from 'react';
import { FileText, Video, Presentation, FileCode, Download, Eye, Search, Layers, ExternalLink } from 'lucide-react';
import { RESOURCES } from '../../data/mockData';
import { ResourceItem } from '../../types';

interface ResourcesSectionProps {
  onOpenResource?: (resource: ResourceItem) => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({ onOpenResource }) => {
  const [activeType, setActiveType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const types = ['All', 'PDF', 'Video', 'Presentation', 'Document', 'Article'];

  const filteredResources = RESOURCES.filter((res) => {
    const matchesType = activeType === 'All' || res.type === activeType;
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.trainerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Video':
        return <Video className="w-5 h-5 text-rose-500" />;
      case 'Presentation':
        return <Presentation className="w-5 h-5 text-amber-500" />;
      case 'Document':
        return <FileCode className="w-5 h-5 text-[#2A7F7E]" />;
      case 'PDF':
      default:
        return <FileText className="w-5 h-5 text-[#0D3B66]" />;
    }
  };

  return (
    <section id="resources" className="py-20 bg-white border-b border-[#E7E5E4] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-[#2A7F7E] font-mono">
              Institutional Knowledge Base
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight mt-1">
              Scientific Resource Library
            </h2>
            <p className="text-base text-[#57534E] mt-2 max-w-2xl">
              Doppler radar manuals, recorded lecture masterclasses, INSAT-3DR calibration reports, and operational Python notebooks.
            </p>
          </div>
          <div className="mt-4 md:mt-0 text-xs font-semibold text-[#64748B]">
            {filteredResources.length} Specialized Documents Available
          </div>
        </div>

        {/* Filter controls */}
        <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-[#E7E5E4] mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents, radar manuals..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#E7E5E4] text-xs sm:text-sm text-[#0F172A] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 text-xs no-scrollbar">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeType === type
                    ? 'bg-[#0D3B66] text-white shadow-xs'
                    : 'bg-white text-[#57534E] border border-[#E7E5E4] hover:bg-[#F5F0E8]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div
              key={res.id}
              className="bg-[#FAF8F5] rounded-2xl border border-[#E7E5E4] hover:border-[#0D3B66]/30 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between text-left group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white border border-[#E7E5E4] shadow-xs">
                    {getTypeIcon(res.type)}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-white border border-[#E7E5E4] text-[#64748B]">
                      {res.category}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#94A3B8]">
                      {res.fileSize}
                    </span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0D3B66] transition-colors leading-snug mb-2">
                  {res.title}
                </h3>

                <p className="text-xs text-[#57534E] line-clamp-3 leading-relaxed mb-4">
                  {res.description}
                </p>

                <p className="text-[11px] text-[#64748B] mb-4">
                  Contributed by: <span className="font-semibold text-[#0F172A]">{res.trainerName}</span>
                </p>
              </div>

              <div className="pt-4 border-t border-[#E7E5E4] flex items-center justify-between text-xs text-[#64748B]">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Download className="w-3.5 h-3.5" />
                    {res.downloadsCount}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {res.viewsCount}
                  </span>
                </div>

                <button
                  onClick={() => onOpenResource?.(res)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#CBD5E1] text-xs font-semibold text-[#0D3B66] hover:bg-[#0D3B66] hover:text-white transition-colors flex items-center gap-1 shadow-xs"
                >
                  <span>Access</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
