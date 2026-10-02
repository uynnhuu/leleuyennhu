import React, { useState } from 'react';
import { 
  RIVER_STATIONS, 
  MEKONG_GENERAL_STATS,
  COUNTRIES_MEKONG,
  NINE_ESTUARIES
} from '../data/mekongData';
import { RiverStation, EstuaryInfo } from '../types/mekong';
import { 
  Droplets, 
  Mountain, 
  Zap, 
  Fish, 
  Layers, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingDown,
  Info,
  Compass,
  MapPin,
  CheckCircle2,
  Lock,
  HelpCircle,
  Eye,
  School,
  Globe
} from 'lucide-react';

export const RiverMapInteractive: React.FC<{
  onSelectVietnam: () => void;
  onOpenGlobe?: () => void;
}> = ({ onSelectVietnam, onOpenGlobe }) => {
  const [selectedStation, setSelectedStation] = useState<RiverStation>(RIVER_STATIONS[0]);
  const [selectedEstuary, setSelectedEstuary] = useState<EstuaryInfo>(NINE_ESTUARIES[0]);
  const [viewMode, setViewMode] = useState<'basin' | 'delta9'>('basin');
  const [activeLayer, setActiveLayer] = useState<'all' | 'dams' | 'biodiversity'>('all');
  const [seasonMode, setSeasonMode] = useState<'normal' | 'flood' | 'dry'>('normal');

  const handleSelectCountry = (countryId: string) => {
    if (countryId === 'cn') {
      setSelectedStation(RIVER_STATIONS[0]);
      setViewMode('basin');
    } else if (countryId === 'mm' || countryId === 'th') {
      setSelectedStation(RIVER_STATIONS[2]);
      setViewMode('basin');
    } else if (countryId === 'la') {
      setSelectedStation(RIVER_STATIONS[3]);
      setViewMode('basin');
    } else if (countryId === 'kh') {
      setSelectedStation(RIVER_STATIONS[4]);
      setViewMode('basin');
    } else if (countryId === 'vn') {
      setSelectedStation(RIVER_STATIONS[5]);
      setViewMode('delta9');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Stats */}
      <div className="bg-gradient-to-r from-sky-900 via-sky-800 to-teal-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-teal-500/10 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-500/30 text-sky-200 border border-sky-400/30">
                Chuyên đề Địa lí 11 - Sông Mê Công & Liên Hệ Việt Nam
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
                Hành Trình Sông Mê Công: Mạch Sống 6 Quốc Gia & 9 Cửa Sông Cửu Long
              </h1>
              <p className="text-sky-200 text-sm max-w-3xl mt-1">
                Dòng sông dài 4.763 km chảy qua 6 quốc gia: Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và Việt Nam, 
                trước khi đổ ra Biển Đông qua <strong>9 cửa sông huyền thoại</strong> (6 cửa sông Tiền và 3 cửa sông Hậu).
              </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              {onOpenGlobe && (
                <button
                  onClick={onOpenGlobe}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-teal-400 hover:from-sky-300 hover:to-teal-300 text-slate-950 font-black text-xs shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Globe className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '16s' }} />
                  <span>Quả Địa Cầu 3D</span>
                </button>
              )}
              <button
                onClick={() => setViewMode('delta9')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-colors shadow-xs ${
                  viewMode === 'delta9' 
                    ? 'bg-emerald-500 text-slate-950 ring-2 ring-white' 
                    : 'bg-white/15 hover:bg-white/25 text-white'
                }`}
              >
                <span>🐉 Phóng To 9 Cửa Sông</span>
              </button>
              <button
                onClick={onSelectVietnam}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-transform hover:scale-105 active:scale-95"
              >
                <span>Chuyên Đề Việt Nam</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 4 Stat Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-3 border-t border-sky-700/60 text-xs">
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3">
              <span className="text-sky-300 block">Tổng Chiều Dài</span>
              <span className="text-base font-bold text-white">4.763 km</span>
              <span className="text-sky-300 block text-[11px]">Hạng 12 Thế Giới, 3 Châu Á</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3">
              <span className="text-sky-300 block">Diện Tích Lưu Vực</span>
              <span className="text-base font-bold text-white">810.000 km²</span>
              <span className="text-sky-300 block text-[11px]">6 Quốc gia cùng chia sẻ</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3">
              <span className="text-sky-300 block">Lưu Lượng Dòng Chảy</span>
              <span className="text-base font-bold text-white">475 tỉ m³/năm</span>
              <span className="text-sky-300 block text-[11px]">Mùa lũ chiếm 70% - 80%</span>
            </div>
            <div className="bg-white/10 backdrop-blur-xs rounded-xl p-3">
              <span className="text-sky-300 block">Cửa Sông Tại Việt Nam</span>
              <span className="text-base font-bold text-white">9 Cửa (Cửu Long)</span>
              <span className="text-sky-300 block text-[11px]">6 Cửa Sông Tiền + 3 Cửa Sông Hậu</span>
            </div>
          </div>
        </div>
      </div>

      {/* 6 Countries Flow Guide Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-sky-600" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              6 Quốc Gia Sông Mê Công Chảy Qua (Theo Chiều Xuôi Dòng Từ Thượng Đến Hạ Lưu):
            </span>
          </div>
          <span className="text-[11px] text-slate-600 italic">Nhấp vào từng quốc gia để định vị trạm trên bản đồ</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {COUNTRIES_MEKONG.map((c) => {
            const isSelected = selectedStation.country.toLowerCase().includes(c.country.toLowerCase()) ||
              (c.id === 'th' && selectedStation.id === 'station-3') ||
              (c.id === 'mm' && selectedStation.id === 'station-3') ||
              (c.id === 'vn' && viewMode === 'delta9');

            return (
              <button
                key={c.id}
                onClick={() => handleSelectCountry(c.id)}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-sky-50 border-sky-400 ring-2 ring-sky-300 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg leading-none">{c.flag}</span>
                  <span className="font-bold text-xs text-slate-900 truncate">{c.country}</span>
                </div>
                <div className="text-[11px] text-slate-600 space-y-0.5">
                  <div className="flex justify-between">
                    <span>Chiều dài:</span>
                    <span className="font-semibold text-sky-700">{c.lengthInCountry} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lưu vực:</span>
                    <span className="font-semibold text-emerald-700">{c.basinPercentage}%</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Map & Interactive Station Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left / Interactive River Visual & Elevation (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* View Mode Tabs */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              <button
                onClick={() => setViewMode('basin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === 'basin'
                    ? 'bg-white text-sky-800 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                🗺️ Toàn Lưu Vực (6 Nước)
              </button>
              <button
                onClick={() => setViewMode('delta9')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                  viewMode === 'delta9'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-emerald-700'
                }`}
              >
                <span>🐉 Phóng To 9 Cửa Sông (Việt Nam)</span>
              </button>
            </div>

            {/* Layer Filter Buttons (for basin mode) */}
            {viewMode === 'basin' && (
              <div className="flex items-center gap-1.5 text-xs bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveLayer('all')}
                  className={`px-2 py-1 rounded-md font-medium transition-colors ${
                    activeLayer === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setActiveLayer('dams')}
                  className={`px-2 py-1 rounded-md font-medium transition-colors ${
                    activeLayer === 'dams' ? 'bg-amber-100 text-amber-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ⚡ Đập Thủy Điện
                </button>
                <button
                  onClick={() => setActiveLayer('biodiversity')}
                  className={`px-2 py-1 rounded-md font-medium transition-colors ${
                    activeLayer === 'biodiversity' ? 'bg-emerald-100 text-emerald-900 font-semibold' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🐟 Sinh Thái
                </button>
              </div>
            )}
          </div>

          {/* Seasonal Simulation Slider/Toggle */}
          <div className="bg-sky-50/70 border border-sky-100 rounded-xl p-3 flex items-center justify-between text-xs">
            <span className="font-semibold text-sky-900 flex items-center gap-1.5">
              <Droplets className="w-4 h-4 text-sky-600" />
              Chế Độ Thủy Văn Theo Mùa:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSeasonMode('normal')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  seasonMode === 'normal' ? 'bg-sky-600 text-white font-medium' : 'text-slate-600 hover:bg-sky-100'
                }`}
              >
                Bình Thường
              </button>
              <button
                onClick={() => setSeasonMode('flood')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  seasonMode === 'flood' ? 'bg-blue-700 text-white font-medium' : 'text-slate-600 hover:bg-sky-100'
                }`}
              >
                🌊 Mùa Lũ (Nước Nổi)
              </button>
              <button
                onClick={() => setSeasonMode('dry')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  seasonMode === 'dry' ? 'bg-amber-600 text-white font-medium' : 'text-slate-600 hover:bg-sky-100'
                }`}
              >
                ☀️ Mùa Khô (Hạn Mặn)
              </button>
            </div>
          </div>

          {/* MAP CANVAS CONTAINER */}
          {viewMode === 'basin' ? (
            /* VIEW 1: FULL BASIN MAP WITH EXPLICIT COUNTRY NAMES & 9 VIETNAM ESTUARIES */
            <div className="relative w-full h-[460px] bg-gradient-to-b from-slate-100 via-sky-50/40 to-emerald-50/30 rounded-xl border border-slate-200 overflow-hidden select-none">
              <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />

              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="riverFlowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="25%" stopColor="#38bdf8" />
                    <stop offset="55%" stopColor="#0284c7" />
                    <stop offset="80%" stopColor="#0369a1" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                </defs>

                {/* Country Boundary / Territory Tint Patches */}
                <path d="M 10 5 L 45 5 L 42 32 L 15 32 Z" fill="#f8fafc" fillOpacity="0.6" stroke="#cbd5e1" strokeDasharray="1,1" strokeWidth="0.3" />
                <path d="M 42 32 L 65 32 L 68 64 L 38 64 Z" fill="#f1f5f9" fillOpacity="0.4" stroke="#cbd5e1" strokeDasharray="1,1" strokeWidth="0.3" />
                <path d="M 38 64 L 75 64 L 72 82 L 40 82 Z" fill="#f8fafc" fillOpacity="0.5" stroke="#cbd5e1" strokeDasharray="1,1" strokeWidth="0.3" />
                <path d="M 60 82 L 95 82 L 95 99 L 60 99 Z" fill="#ecfdf5" fillOpacity="0.6" stroke="#a7f3d0" strokeWidth="0.5" />

                {/* MAIN RIVER PATH: Tibet -> Yunnan -> Golden Triangle -> Laos -> Cambodia -> Vietnam entry */}
                <path
                  d="M 22 10 
                     Q 26 18, 34 24 
                     T 44 38 
                     Q 48 46, 52 55 
                     T 58 72 
                     Q 63 80, 68 86"
                  fill="none"
                  stroke="url(#riverFlowGrad)"
                  strokeWidth={seasonMode === 'flood' ? 5 : seasonMode === 'dry' ? 2.5 : 3.8}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Tonle Sap Lake & Branch in Cambodia */}
                <path
                  d="M 58 72 Q 51 68, 48 70 Q 45 74, 58 72"
                  fill="#38bdf8"
                  fillOpacity="0.45"
                  stroke="#0284c7"
                  strokeWidth="1.2"
                />
                <text x="46" y="67" className="text-[2.6px] font-bold fill-sky-800">Biển Hồ Tonle Sap (Cam-pu-chia)</text>

                {/* VIETNAM ENTRY (x: 68, y: 86): SPLIT INTO SÔNG TIỀN & SÔNG HẬU */}
                {/* 1. Sông Tiền Branch */}
                <path
                  d="M 68 86 Q 74 87, 78 89"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* 2. Sông Hậu Branch */}
                <path
                  d="M 68 86 Q 70 91, 73 94"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* 6 CỬA SÔNG TIỀN FANNING OUT TO EAST SEA */}
                {/* Cửa 1: Tiểu */}
                <path d="M 78 89 Q 83 88, 88 88" fill="none" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
                {/* Cửa 2: Đại */}
                <path d="M 78 89 Q 84 90, 89 90" fill="none" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
                {/* Cửa 3: Ba Lai (đắp cống đập ngăn mặn) */}
                <path d="M 78 89 Q 83 91, 88 92" fill="none" stroke="#059669" strokeWidth="1" strokeDasharray="1,0.6" strokeLinecap="round" />
                {/* Cửa 4: Hàm Luông */}
                <path d="M 78 89 Q 82 92, 86 94" fill="none" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
                {/* Cửa 5: Cổ Chiên */}
                <path d="M 78 89 Q 81 93, 84 96" fill="none" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />
                {/* Cửa 6: Cung Hầu */}
                <path d="M 78 89 Q 80 94, 82 97" fill="none" stroke="#059669" strokeWidth="1.2" strokeLinecap="round" />

                {/* 3 CỬA SÔNG HẬU FANNING OUT TO EAST SEA */}
                {/* Cửa 7: Định An */}
                <path d="M 73 94 Q 76 96, 79 98" fill="none" stroke="#0284c7" strokeWidth="1.4" strokeLinecap="round" />
                {/* Cửa 8: Bát Xắc (Bassac - bị bồi lấp) */}
                <path d="M 73 94 Q 74 96, 76 97" fill="none" stroke="#94a3b8" strokeWidth="1" strokeDasharray="0.8,0.8" strokeLinecap="round" />
                {/* Cửa 9: Trần Đề */}
                <path d="M 73 94 Q 73 95, 73 96" fill="none" stroke="#0284c7" strokeWidth="1.4" strokeLinecap="round" />

                {/* COUNTRY NAME PROMINENT LABELS ON THE MAP */}
                <g className="font-extrabold select-none">
                  {/* Trung Quốc */}
                  <rect x="11" y="8" width="22" height="5" rx="1" fill="#fee2e2" stroke="#fca5a5" strokeWidth="0.3" />
                  <text x="12" y="11.5" className="text-[2.6px] font-bold fill-red-800">🇨🇳 TRUNG QUỐC (Lan Thương)</text>

                  {/* Myanmar & Thái Lan */}
                  <rect x="23" y="36" width="20" height="5" rx="1" fill="#fef3c7" stroke="#fcd34d" strokeWidth="0.3" />
                  <text x="24" y="39.5" className="text-[2.4px] font-bold fill-amber-900">🇲🇲 MYANMAR & 🇹🇭 THÁI LAN</text>

                  {/* Lào */}
                  <rect x="53" y="47" width="16" height="5" rx="1" fill="#dbeafe" stroke="#93c5fd" strokeWidth="0.3" />
                  <text x="54" y="50.5" className="text-[2.6px] font-bold fill-blue-900">🇱🇦 LÀO (Mê Kông)</text>

                  {/* Campuchia */}
                  <rect x="58" y="66" width="19" height="5" rx="1" fill="#e0e7ff" stroke="#a5b4fc" strokeWidth="0.3" />
                  <text x="59" y="69.5" className="text-[2.6px] font-bold fill-indigo-900">🇰🇭 CAMPUCHIA (Tôn-lê Thơm)</text>

                  {/* Việt Nam */}
                  <rect x="67" y="81" width="22" height="5" rx="1" fill="#d1fae5" stroke="#6ee7b7" strokeWidth="0.4" />
                  <text x="68" y="84.5" className="text-[2.8px] font-extrabold fill-emerald-900">🇻🇳 VIỆT NAM: 9 CỬA SÔNG</text>
                </g>

                {/* Biển Đông Water Label */}
                <text x="84" y="99" className="text-[2.6px] font-bold fill-sky-700 italic">BIỂN ĐÔNG</text>

                {/* Dam markers if layer is dams or all */}
                {(activeLayer === 'all' || activeLayer === 'dams') && (
                  <g>
                    <circle cx="28" cy="18" r="1.3" fill="#f59e0b" stroke="#78350f" strokeWidth="0.4" />
                    <circle cx="34" cy="24" r="1.3" fill="#f59e0b" stroke="#78350f" strokeWidth="0.4" />
                    <circle cx="49" cy="49" r="1.3" fill="#f59e0b" stroke="#78350f" strokeWidth="0.4" />
                    <circle cx="54" cy="62" r="1.3" fill="#f59e0b" stroke="#78350f" strokeWidth="0.4" />
                  </g>
                )}

                {/* 9 ESTUARIES NUMBERED NODES ON BASIN MAP */}
                {NINE_ESTUARIES.map((est) => {
                  const coords = est.coordinates || { x: 80, y: 90 };
                  const isSelected = selectedEstuary.id === est.id;
                  const isTien = est.riverBranch === 'Tiền';

                  return (
                    <g 
                      key={est.id} 
                      className="cursor-pointer group"
                      onClick={() => {
                        setSelectedEstuary(est);
                        setSelectedStation(RIVER_STATIONS[5]);
                      }}
                    >
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={isSelected ? 1.8 : 1.3}
                        fill={est.status === 'dammed' ? '#f59e0b' : est.status === 'silted' ? '#94a3b8' : isTien ? '#059669' : '#0284c7'}
                        stroke="#ffffff"
                        strokeWidth="0.4"
                      />
                      <text
                        x={coords.x + 1.8}
                        y={coords.y + 0.6}
                        className={`text-[1.9px] font-bold ${
                          isSelected ? 'fill-amber-900 font-extrabold text-[2.2px]' : isTien ? 'fill-emerald-800' : 'fill-sky-800'
                        }`}
                      >
                        {est.order}. {est.name.replace('Cửa ', '')}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* 6 RIVER STATIONS WITH EXPLICIT COUNTRY NAMES */}
              {RIVER_STATIONS.map((station, idx) => {
                const isSelected = selectedStation.id === station.id;
                return (
                  <div
                    key={station.id}
                    style={{
                      left: `${station.coordinates.x}%`,
                      top: `${station.coordinates.y}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                    onClick={() => {
                      setSelectedStation(station);
                      if (station.countryCode === 'VN') {
                        // User can inspect estuaries
                      }
                    }}
                  >
                    {isSelected && (
                      <span className="absolute -inset-2 rounded-full bg-sky-500/30 animate-ping" />
                    )}

                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold shadow-md transition-all duration-200 ${
                        isSelected
                          ? 'bg-sky-700 text-white scale-110 ring-2 ring-white shadow-sky-600/50'
                          : 'bg-white/95 text-slate-800 hover:bg-sky-50 hover:scale-105 border border-slate-300'
                      }`}
                    >
                      <span>{station.flag}</span>
                      <span className="text-[11px] font-extrabold text-slate-900">
                        {station.country.includes('Lào -') ? 'Lào-MM-TH' : station.country}
                      </span>
                      <span className="hidden sm:inline text-[10px] text-slate-500 font-normal">
                        • {station.name.split('(')[0].trim()}
                      </span>
                    </div>

                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-1.5 bg-slate-900 text-white text-[11px] rounded-md px-2.5 py-1.5 whitespace-nowrap shadow-lg transition-opacity z-30">
                      <p className="font-bold text-amber-300">
                        {station.flag} {station.country}: {station.name}
                      </p>
                      <p className="text-sky-300 text-[10px]">
                        Độ cao: {station.elevation}m | Cách nguồn: {station.distanceFromSource}km
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* Map Legend Overlay */}
              <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-lg p-2 text-[10px] sm:text-[11px] text-slate-700 space-y-1 shadow-xs max-w-[210px]">
                <div className="flex items-center gap-1 font-bold text-slate-900">
                  <Info className="w-3.5 h-3.5 text-sky-600" />
                  <span>Chú Giải 9 Cửa Sông (Việt Nam):</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                  <span><strong>Sông Tiền</strong> (6 cửa: 1-6)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-600 inline-block" />
                  <span><strong>Sông Hậu</strong> (3 cửa: 7-9)</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500 pt-0.5 border-t border-slate-100">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" /> Đập Ba Lai | 
                  <span className="w-2 h-2 rounded-full bg-slate-400 inline-block ml-1" /> Bát Xắc bồi lấp
                </div>
              </div>
            </div>
          ) : (
            /* VIEW 2: ZOOMED DETAILED 9 ESTUARIES MAP IN VIETNAM (CỬU LONG DELTA) */
            <div className="relative w-full h-[460px] bg-gradient-to-br from-emerald-50/50 via-sky-50/50 to-teal-50/60 rounded-xl border border-emerald-200 overflow-hidden select-none p-2">
              <div className="flex items-center justify-between px-2 py-1 mb-1 bg-white/80 rounded-lg border border-emerald-100 text-xs">
                <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  Sơ Đồ Phân Nhánh 9 Cửa Sông Cửu Long (Chuyên Đề Địa Lí 11)
                </span>
                <button
                  onClick={() => setViewMode('basin')}
                  className="text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1"
                >
                  <span>← Trở lại toàn lưu vực</span>
                </button>
              </div>

              <svg className="w-full h-[380px]" viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="tienGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                  <linearGradient id="hauGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" />
                    <stop offset="100%" stopColor="#0369a1" />
                  </linearGradient>
                </defs>

                {/* Land background hint */}
                <path d="M 5 5 L 95 5 L 95 95 L 5 95 Z" fill="#f0fdf4" fillOpacity="0.5" />

                {/* Entry from Cambodia border: Tân Châu & Châu Đốc */}
                <path d="M 12 10 L 22 18" stroke="#0284c7" strokeWidth="4" strokeLinecap="round" />
                <text x="5" y="10" className="text-[2.8px] font-bold fill-slate-700">TỪ CAMPUCHIA VÀO</text>
                <text x="14" y="16" className="text-[2.6px] font-bold fill-slate-800">Tân Châu / Châu Đốc (An Giang)</text>

                {/* SÔNG TIỀN MAIN TRUNK: (22, 18) -> (48, 28) -> (65, 36) */}
                <path
                  d="M 22 18 Q 36 22, 48 28 Q 58 32, 65 36"
                  fill="none"
                  stroke="url(#tienGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <text x="40" y="24" className="text-[3.2px] font-extrabold fill-emerald-800">NHÁNH SÔNG TIỀN (6 CỬA)</text>

                {/* SÔNG HẬU MAIN TRUNK: (22, 18) -> (36, 44) -> (52, 62) */}
                <path
                  d="M 22 18 Q 28 32, 36 44 Q 44 54, 52 62"
                  fill="none"
                  stroke="url(#hauGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <text x="24" y="46" className="text-[3.2px] font-extrabold fill-sky-800">NHÁNH SÔNG HẬU (3 CỬA)</text>

                {/* KÊNH XÁNG XÀ NO & TRƯỜNG FPT HẬU GIANG (Gần Cần Thơ / Hậu Giang) */}
                <path d="M 46 56 Q 40 65, 35 72" fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="1.5,1" />
                <circle cx="38" cy="67" r="1.5" fill="#ea580c" />
                <text x="24" y="65" className="text-[2.4px] font-bold fill-orange-800">Kênh Xáng Xà No</text>
                <text x="18" y="69" className="text-[2.4px] font-bold fill-orange-950">🏫 FPT Hậu Giang (61C ấp 6, Vị Thủy)</text>

                {/* 6 ESTUARIES OF SÔNG TIỀN */}
                {/* 1. Cửa Tiểu */}
                <path d="M 65 36 Q 76 34, 88 34" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                {/* 2. Cửa Đại */}
                <path d="M 65 36 Q 76 39, 89 42" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                {/* 3. Cửa Ba Lai (cống đập ngọt hóa) */}
                <path d="M 65 36 Q 75 46, 88 49" fill="none" stroke="#059669" strokeWidth="1.6" strokeDasharray="1.5,1" strokeLinecap="round" />
                {/* 4. Cửa Hàm Luông */}
                <path d="M 65 36 Q 74 52, 86 58" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                {/* 5. Cửa Cổ Chiên */}
                <path d="M 65 36 Q 72 60, 83 67" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />
                {/* 6. Cửa Cung Hầu */}
                <path d="M 65 36 Q 70 66, 80 74" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" />

                {/* 3 ESTUARIES OF SÔNG HẬU */}
                {/* 7. Cửa Định An */}
                <path d="M 52 62 Q 62 72, 75 82" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />
                {/* 8. Cửa Bát Xắc (Bassac - bị bồi lấp) */}
                <path d="M 52 62 Q 58 76, 68 87" fill="none" stroke="#94a3b8" strokeWidth="1.6" strokeDasharray="1,1" strokeLinecap="round" />
                {/* 9. Cửa Trần Đề */}
                <path d="M 52 62 Q 54 80, 60 92" fill="none" stroke="#0284c7" strokeWidth="2.5" strokeLinecap="round" />

                {/* Biển Đông Shoreline Arc */}
                <path d="M 88 20 Q 95 55, 60 98" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="2,1" />
                <text x="89" y="55" className="text-[3.2px] font-extrabold fill-sky-800 rotate-90">BIỂN ĐÔNG</text>

                {/* INTERACTIVE PINS FOR 9 ESTUARIES IN ZOOMED VIEW */}
                {[
                  { est: NINE_ESTUARIES[0], x: 88, y: 34 },
                  { est: NINE_ESTUARIES[1], x: 89, y: 42 },
                  { est: NINE_ESTUARIES[2], x: 88, y: 49 },
                  { est: NINE_ESTUARIES[3], x: 86, y: 58 },
                  { est: NINE_ESTUARIES[4], x: 83, y: 67 },
                  { est: NINE_ESTUARIES[5], x: 80, y: 74 },
                  { est: NINE_ESTUARIES[6], x: 75, y: 82 },
                  { est: NINE_ESTUARIES[7], x: 68, y: 87 },
                  { est: NINE_ESTUARIES[8], x: 60, y: 92 },
                ].map(({ est, x, y }) => {
                  const isSelected = selectedEstuary.id === est.id;
                  const isTien = est.riverBranch === 'Tiền';

                  return (
                    <g
                      key={est.id}
                      className="cursor-pointer group"
                      onClick={() => setSelectedEstuary(est)}
                    >
                      <circle
                        cx={x}
                        cy={y}
                        r={isSelected ? 3.5 : 2.5}
                        fill={est.status === 'dammed' ? '#f59e0b' : est.status === 'silted' ? '#64748b' : isTien ? '#059669' : '#0284c7'}
                        stroke="#ffffff"
                        strokeWidth="0.6"
                      />
                      <text
                        x={x}
                        y={y + 0.9}
                        textAnchor="middle"
                        className="text-[2.2px] font-extrabold fill-white"
                      >
                        {est.order}
                      </text>
                      <text
                        x={x - 2}
                        y={y - 3.5}
                        className={`text-[2.5px] font-extrabold ${
                          isSelected ? 'fill-amber-900 font-black' : isTien ? 'fill-emerald-900' : 'fill-sky-900'
                        }`}
                      >
                        {est.name} ({est.riverBranch})
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Bottom Quick Indicator */}
              <div className="mt-1 p-2 bg-white/90 rounded-lg border border-slate-200 text-xs flex flex-wrap items-center justify-between gap-2">
                <span className="font-semibold text-slate-800">
                  Đang chọn: <strong className="text-emerald-700">{selectedEstuary.name}</strong> ({selectedEstuary.province})
                </span>
                <span className="text-slate-500 text-[11px]">
                  Tình trạng: {selectedEstuary.status === 'dammed' ? '🔒 Đắp đập Ba Lai (2002)' : selectedEstuary.status === 'silted' ? '⏳ Đã bồi lắng' : '🟢 Đang lưu thông biển'}
                </span>
              </div>
            </div>
          )}

          {/* Elevation Profile Visual (Trắc diện độ cao từ 5000m -> 0m) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-slate-800 flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-emerald-600" />
                Trắc Diện Độ Cao Lưu Vực (Từ Tây Tạng ~5.000m Đến 9 Cửa Sông 2m)
              </span>
              <span className="text-slate-600 text-[11px]">Độ dốc giảm dần từ thượng nguồn về ĐBSCL</span>
            </div>

            <div className="grid grid-cols-6 gap-1.5 text-center">
              {RIVER_STATIONS.map((st, i) => {
                const isCur = selectedStation.id === st.id;
                const heightPercent = Math.max(12, Math.round((st.elevation / 5000) * 100));
                return (
                  <button
                    key={st.id}
                    onClick={() => {
                      setSelectedStation(st);
                      if (st.countryCode === 'VN') setViewMode('delta9');
                    }}
                    className={`group flex flex-col items-center justify-end h-24 rounded-lg p-1 transition-all ${
                      isCur ? 'bg-sky-100 ring-2 ring-sky-500' : 'hover:bg-slate-200/70'
                    }`}
                  >
                    <span className="text-[10px] font-bold text-slate-700 mb-1">{st.elevation}m</span>
                    <div 
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t-md transition-all ${
                        isCur 
                          ? 'bg-gradient-to-t from-sky-600 to-sky-400' 
                          : 'bg-gradient-to-t from-slate-400 to-slate-300 group-hover:from-sky-400 group-hover:to-sky-300'
                      }`}
                    />
                    <span className="text-[10px] font-bold text-slate-700 truncate w-full mt-1">
                      {st.flag} {st.country.split(' ')[0]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right / Station Detail or Estuary Information Card (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Detailed Selected Estuary Card if in Delta View */}
          {viewMode === 'delta9' ? (
            <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-xs space-y-3">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-emerald-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      Cửa Sông Thứ {selectedEstuary.order} / 9
                    </span>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      selectedEstuary.riverBranch === 'Tiền' ? 'bg-emerald-50 text-emerald-700' : 'bg-sky-50 text-sky-700'
                    }`}>
                      Nhánh Sông {selectedEstuary.riverBranch}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-1.5 flex items-center gap-2">
                    <span>{selectedEstuary.name}</span>
                    {selectedEstuary.status === 'dammed' && (
                      <span className="text-xs font-normal text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Có cống đập
                      </span>
                    )}
                    {selectedEstuary.status === 'silted' && (
                      <span className="text-xs font-normal text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                        ⏳ Bị bồi lắng
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Địa phận hành chính: <strong>{selectedEstuary.province}</strong>
                  </p>
                </div>
              </div>

              <div className="text-xs text-slate-700 leading-relaxed space-y-2">
                <p className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-100">
                  {selectedEstuary.description}
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wide">
                    📜 Lịch Sử & Đặc Điểm Địa Lí 11:
                  </span>
                  <p className="text-slate-600 text-xs">
                    {selectedEstuary.historicalNote}
                  </p>
                </div>
              </div>

              {/* 9 Estuaries Quick Switcher Grid */}
              <div className="pt-2">
                <span className="text-[11px] font-bold text-slate-700 block mb-2">
                  Chọn Nhanh Trong 9 Cửa Sông (Cửu Long):
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {NINE_ESTUARIES.map((est) => (
                    <button
                      key={est.id}
                      onClick={() => setSelectedEstuary(est)}
                      className={`p-1.5 rounded-lg text-xs font-medium text-left border transition-all ${
                        selectedEstuary.id === est.id
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <div className="font-bold text-[11px] truncate">
                        {est.order}. {est.name}
                      </div>
                      <div className={`text-[10px] truncate ${selectedEstuary.id === est.id ? 'text-emerald-100' : 'text-slate-500'}`}>
                        Sông {est.riverBranch}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Selected River Station Card */
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
              {/* Station Header */}
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{selectedStation.flag}</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                      {selectedStation.country}
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900 mt-1">
                    {selectedStation.name}
                  </h3>
                  <p className="text-xs text-sky-700 font-medium italic">
                    Tên bản địa: "{selectedStation.localName}"
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-600 block">Độ cao</span>
                  <span className="text-base font-bold text-slate-800">{selectedStation.elevation} m</span>
                  <span className="text-[11px] text-slate-600 block">{selectedStation.distanceFromSource} km từ nguồn</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed my-3.5">
                {selectedStation.description}
              </p>

              {/* Core Geographic Features */}
              <div className="space-y-2 mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5 text-sky-600" />
                  Đặc Điểm Địa Hình & Thủy Văn (Địa lí 11):
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedStation.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sky-600 font-bold mt-0.5">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Biodiversity Highlight */}
              <div className="bg-emerald-50 border border-emerald-200/80 rounded-xl p-3 mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
                  <Fish className="w-4 h-4 text-emerald-600" />
                  <span>Sinh Vật Biểu Trưng & Đa Dạng Sinh Học:</span>
                </div>
                <p className="text-xs text-emerald-800 leading-normal">
                  {selectedStation.biodiversityHighlight}
                </p>
              </div>

              {/* Hydropower & Human Activity */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>Thủy Điện & Hoạt Động Của Con Người:</span>
                </div>
                <p className="text-xs text-amber-800 mb-1.5 leading-normal">
                  {selectedStation.humanImpact}
                </p>
                {selectedStation.hydropowerDams.length > 0 && (
                  <div className="text-[11px] text-amber-900 font-medium">
                    <span className="font-semibold">Công trình tiêu biểu: </span>
                    {selectedStation.hydropowerDams.join(', ')}
                  </div>
                )}
              </div>

              {/* Bottom context action */}
              {selectedStation.countryCode === 'VN' ? (
                <button
                  onClick={() => setViewMode('delta9')}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <span>Xem Chi Tiết Sơ Đồ 9 Cửa Sông (Cửu Long)</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="text-center text-[11px] text-slate-500 pt-1">
                  Nhấp vào các trạm khác trên bản đồ để tiếp tục hành trình xuôi dòng.
                </div>
              )}
            </div>
          )}

          {/* 9 Estuaries Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-600" />
                Phân Loại 9 Cửa Sông Cửu Long (Địa Lí 11)
              </span>
              <button
                onClick={() => setViewMode('delta9')}
                className="text-[11px] text-emerald-700 font-semibold hover:underline"
              >
                Mở bản đồ
              </button>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                <span className="font-bold text-emerald-900 block mb-1">
                  🌿 Nhánh Sông Tiền (6 Cửa Sông):
                </span>
                <p className="text-emerald-800 text-[11px] leading-relaxed">
                  1. Cửa Tiểu • 2. Cửa Đại • 3. Cửa Ba Lai (cống đập ngọt hóa) • 4. Cửa Hàm Luông • 5. Cửa Cổ Chiên • 6. Cửa Cung Hầu.
                </p>
              </div>

              <div className="p-2.5 bg-sky-50/70 border border-sky-200 rounded-xl">
                <span className="font-bold text-sky-900 block mb-1">
                  🌊 Nhánh Sông Hậu (3 Cửa Sông):
                </span>
                <p className="text-sky-800 text-[11px] leading-relaxed">
                  7. Cửa Định An (luồng tàu lớn Cần Thơ) • 8. Cửa Bát Xắc (Bassac - bị bồi lấp) • 9. Cửa Trần Đề (cảng cá & tàu Côn Đảo).
                </p>
              </div>

              <div className="text-[11px] text-slate-600 italic pt-1">
                * Giải thích Địa lí: Tên gọi "Cửu Long" tượng trưng cho 9 con rồng đổ ra biển, nhưng ngày nay thực tế chỉ còn 7 - 8 cửa hoạt động do cửa Ba Lai được đắp đập ngăn mặn và cửa Bát Xắc bị bồi lắng tự nhiên.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FULL COMPARISON TABLE OF THE 9 ESTUARIES (TIỀN & HẬU) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <span>🐉 Bảng Chi Tiết 9 Cửa Sông Cửu Long (Địa Lí 11 - Kết Nối Tri Thức)</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Hệ thống phân lưu của dòng sông Mê Kông khi chảy vào vùng đồng bằng Nam Bộ Việt Nam
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
              6 Cửa Sông Tiền
            </span>
            <span className="px-2.5 py-1 rounded-full bg-sky-100 text-sky-800 font-semibold">
              3 Cửa Sông Hậu
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {NINE_ESTUARIES.map((est) => {
            const isTien = est.riverBranch === 'Tiền';
            const isSelected = selectedEstuary.id === est.id;

            return (
              <div
                key={est.id}
                onClick={() => {
                  setSelectedEstuary(est);
                  setViewMode('delta9');
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-400 ring-2 ring-emerald-300 shadow-xs'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      isTien ? 'bg-emerald-600' : 'bg-sky-600'
                    }`}>
                      {est.order}
                    </span>
                    <span className="font-extrabold text-slate-900 text-sm">{est.name}</span>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                    est.status === 'dammed'
                      ? 'bg-amber-100 text-amber-800'
                      : est.status === 'silted'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {est.status === 'dammed' ? 'Đắp đập' : est.status === 'silted' ? 'Bồi lấp' : 'Hoạt động'}
                  </span>
                </div>

                <div className="text-xs text-slate-600 space-y-1">
                  <div>
                    <span className="font-medium text-slate-700">Nhánh:</span> Sông {est.riverBranch} | <span className="font-medium text-slate-700">Tỉnh:</span> {est.province}
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {est.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
