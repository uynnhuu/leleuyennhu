import React, { useState } from 'react';
import { MEKONG_TOURISM_DESTINATIONS } from '../data/tourismData';
import { TourismDestination } from '../types/mekong';
import { 
  Camera, 
  MapPin, 
  Sparkles, 
  Compass, 
  Calendar, 
  Leaf, 
  Waves, 
  ChevronRight,
  ExternalLink,
  School,
  X,
  Info
} from 'lucide-react';

export const MekongTourismGallery: React.FC = () => {
  const [selectedDest, setSelectedDest] = useState<TourismDestination | null>(null);
  const [filterTag, setFilterTag] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tất Cả Điểm Đến' },
    { id: 'ai', label: '✨ Ảnh Nghệ Thuật AI Studio' },
    { id: 'song-nuoc', label: 'Chợ Nổi & Sông Nước' },
    { id: 'sinh-thai', label: 'Rừng Tràm & Đất Ngập Nước' },
    { id: 'miet-vuon', label: 'Vị Thủy & Miệt Vườn' },
  ];

  const filteredDestinations = MEKONG_TOURISM_DESTINATIONS.filter((d) => {
    if (filterTag === 'all') return true;
    if (filterTag === 'ai') return d.aiGenerated === true;
    if (filterTag === 'song-nuoc') return d.id === 'cai-rang' || d.id === 'con-phung-ben-tre';
    if (filterTag === 'sinh-thai') return d.id === 'tra-su' || d.id === 'dong-sen-thap-muoi';
    if (filterTag === 'miet-vuon') return d.id === 'xa-no-vi-thuy' || d.id === 'cai-rang';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Tourism Hero Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-sky-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Bộ Sưu Tập Du Lịch • Google AI Studio
            </span>
            <span className="text-xs text-sky-200 flex items-center gap-1">
              <School className="w-3.5 h-3.5" />
              TH, THCS, THPT FPT Hậu Giang
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Vẻ Đẹp Du Lịch Sông Mê Công & Đồng Bằng Sông Cửu Long
          </h1>

          <p className="text-xs sm:text-sm text-sky-100 leading-relaxed">
            Khám phá vẻ đẹp huyền diệu của "Dòng sông Mẹ" khi đổ về hạ lưu Việt Nam: từ chợ nổi rộn rã trên sông Cần Thơ, 
            rừng tràm Trà Sư xanh biếc bạt ngàn mùa nước nổi đến ánh hoàng hôn vàng ruộm trên kênh xáng Xà No – Vị Thủy.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-amber-300 font-semibold">
            <span>📍 Tọa độ xuất phát: 61C ấp 6, xã Vị Thủy, TP.Cần Thơ</span>
            <span>•</span>
            <span>Tích hợp nội dung Du lịch Địa lí 11</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setFilterTag(c.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              filterTag === c.id
                ? 'bg-sky-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDestinations.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedDest(item)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md hover:border-sky-300 transition-all cursor-pointer group flex flex-col"
          >
            {/* Image Box */}
            <div className="relative h-52 w-full overflow-hidden bg-slate-100">
              <img
                src={item.imageSrc}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Tag / Badge */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white font-bold text-[11px] border border-white/20">
                  {item.tag}
                </span>
                {item.aiGenerated && (
                  <span className="px-2 py-1 rounded-lg bg-amber-400 text-slate-950 font-extrabold text-[10px] flex items-center gap-1 shadow-xs">
                    <Sparkles className="w-3 h-3" />
                    AI Studio
                  </span>
                )}
              </div>

              {/* Location pin on image */}
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.province} • {item.distanceFromFpt}
                </span>
                <h3 className="font-black text-sm sm:text-base leading-snug line-clamp-1 mt-0.5 text-white">
                  {item.title}
                </h3>
              </div>
            </div>

            {/* Content summary */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                {item.description}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-md">
                  {item.seasonHighlight.split(';')[0]}
                </span>

                <span className="text-sky-600 font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                  Khám phá
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Destination Detail Modal */}
      {selectedDest && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72 w-full">
              <img
                src={selectedDest.imageSrc}
                alt={selectedDest.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

              <button
                onClick={() => setSelectedDest(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 font-bold text-[11px]">
                    {selectedDest.tag}
                  </span>
                  {selectedDest.aiGenerated && (
                    <span className="px-2 py-0.5 rounded-md bg-sky-500 text-white font-bold text-[11px]">
                      Hình ảnh Google AI Studio
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-black">{selectedDest.title}</h2>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-300" />
                  {selectedDest.location}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-950 flex items-start gap-2">
                <School className="w-4 h-4 text-sky-700 mt-0.5 shrink-0" />
                <div>
                  <span className="font-bold">Chỉ dẫn tuyến đường từ Trường TH, THCS, THPT FPT Hậu Giang:</span>
                  <p className="text-slate-700 mt-0.5">{selectedDest.distanceFromFpt}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1">
                  Giới thiệu cảnh quan & văn hóa:
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedDest.description}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Leaf className="w-3.5 h-3.5 text-emerald-600" />
                  Hoạt động trải nghiệm sinh thái sông nước:
                </h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {selectedDest.ecoActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-1.5 shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950">
                <span className="font-bold flex items-center gap-1 mb-0.5 text-amber-900">
                  <Info className="w-4 h-4" />
                  Ý nghĩa Địa lí 11 & Giá trị bảo tồn:
                </span>
                <p className="text-amber-900/90">{selectedDest.geographySignificance}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedDest(null)}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs"
                >
                  Đóng Lại
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
