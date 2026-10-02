import React, { useState, useMemo } from 'react';
import { 
  WhatIfParameters, 
  WHAT_IF_PRESETS, 
  calculateWhatIfImpacts 
} from '../data/whatIfData';
import { markModuleCompleted } from '../data/progressManager';
import { 
  Sparkles, 
  Sliders, 
  Droplets, 
  Wheat, 
  Fish, 
  TreePine, 
  AlertTriangle, 
  Waves, 
  Sun, 
  Thermometer, 
  Info, 
  Compass, 
  ChevronRight, 
  RotateCcw,
  CheckCircle2,
  BookmarkCheck,
  Building2,
  Users
} from 'lucide-react';

interface WhatIfSimulatorProps {
  onAddPoints?: (pts: number) => void;
  onNavigateTab?: (tab: string) => void;
}

export const WhatIfSimulator: React.FC<WhatIfSimulatorProps> = ({ 
  onAddPoints,
  onNavigateTab 
}) => {
  const [params, setParams] = useState<WhatIfParameters>({
    ...WHAT_IF_PRESETS[0].params
  });
  const [selectedPresetId, setSelectedPresetId] = useState<string>('baseline-2026');
  const [hasInteracted, setHasInteracted] = useState(false);

  // Compute impacts dynamically in real time
  const impacts = useMemo(() => calculateWhatIfImpacts(params), [params]);

  const handleParamChange = (field: keyof WhatIfParameters, val: number) => {
    setParams(prev => ({ ...prev, [field]: val }));
    setSelectedPresetId('custom');
    if (!hasInteracted) {
      setHasInteracted(true);
      markModuleCompleted('simulator');
      if (onAddPoints) onAddPoints(50);
    }
  };

  const handleSelectPreset = (presetId: string) => {
    const found = WHAT_IF_PRESETS.find(p => p.id === presetId);
    if (found) {
      setParams({ ...found.params });
      setSelectedPresetId(presetId);
      if (!hasInteracted) {
        setHasInteracted(true);
        markModuleCompleted('simulator');
        if (onAddPoints) onAddPoints(50);
      }
    }
  };

  const handleResetToBaseline = () => {
    handleSelectPreset('baseline-2026');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-purple-800/60">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-400 text-slate-950 flex items-center gap-1.5 shadow-xs">
                <Sliders className="w-3.5 h-3.5 text-slate-950" />
                Mô Phỏng Tương Tác Sandbox
              </span>
              <span className="text-xs text-purple-200 hidden sm:inline">Phân tích mối liên hệ đa biến</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Nếu Mê Công Đổi Thay?</span>
              <span className="text-xl sm:text-2xl text-purple-300">🔮</span>
            </h1>
            <p className="text-purple-100 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
              Tự do điều chỉnh 7 thanh thông số môi trường - con người và quan sát phản ứng tức thì của dòng sông 
              đối với dòng chảy, phù sa, xâm nhập mặn, sạt lở và sinh kế người dân ĐBSCL.
            </p>
          </div>

          <button
            onClick={handleResetToBaseline}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-purple-300" />
            <span>Mặc Định Hiện Trạng</span>
          </button>
        </div>

        {/* Mandatory Educational Disclaimer Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-amber-300 block uppercase font-bold text-[11px] mb-0.5">
              ⚠️ QUAN TRỌNG - THÔNG BÁO MÔ PHỎNG GIÁO DỤC:
            </strong>
            “Các kết quả trong mô phỏng nhằm mục đích giáo dục và minh họa mối quan hệ giữa các yếu tố, không phải dự báo khoa học.”
          </div>
        </div>
      </div>

      {/* Preset Scenario Selector Buttons */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2">
        <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
          Chọn Nhanh Kịch Bản Mẫu (Presets):
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          {WHAT_IF_PRESETS.map(preset => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-purple-50 border-purple-500 shadow-xs ring-1 ring-purple-400 text-purple-950 font-bold'
                    : 'bg-slate-50/70 border-slate-200 hover:bg-white text-slate-700 font-medium'
                }`}
              >
                <div className="text-xs font-extrabold truncate">
                  {preset.name}
                </div>
                <div className="text-[10px] text-slate-500 line-clamp-2 mt-1">
                  {preset.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Two-Column Layout: Sliders on Left, Real-Time Dynamic Impacts on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: 7 Interactive Controls (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Sliders className="w-4 h-4 text-purple-600" />
              <span>7 Thanh Điều Khiển Thông Số</span>
            </h3>
            <span className="text-[11px] text-slate-400 italic">Kéo để thử nghiệm</span>
          </div>

          <div className="space-y-4">
            {/* 1. Lượng nước thượng nguồn */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                  💧 Lượng Nước Thượng Nguồn
                </span>
                <span className="font-black text-cyan-700 font-mono">
                  {params.waterDischarge > 0 ? `+${params.waterDischarge}%` : `${params.waterDischarge}%`}
                </span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                step="5"
                value={params.waterDischarge}
                onChange={(e) => handleParamChange('waterDischarge', Number(e.target.value))}
                className="w-full accent-cyan-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Cạn kiệt (-50%)</span>
                <span>Bình thường (0%)</span>
                <span>Lũ lớn (+50%)</span>
              </div>
            </div>

            {/* 2. Nhu cầu sử dụng nước */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Wheat className="w-3.5 h-3.5 text-amber-600" />
                  🌾 Nhu Cầu Nước Tưới & Đô Thị
                </span>
                <span className="font-black text-amber-700 font-mono">{params.waterDemand}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={params.waterDemand}
                onChange={(e) => handleParamChange('waterDemand', Number(e.target.value))}
                className="w-full accent-amber-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Tiết kiệm (10%)</span>
                <span>Vừa phải (50%)</span>
                <span>Thâm canh cao (100%)</span>
              </div>
            </div>

            {/* 3. Lượng phù sa */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span className="text-sm">🪨</span>
                  Lượng Phù Sa Bồi Đắp
                </span>
                <span className="font-black text-amber-900 font-mono">{params.sedimentLoad}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={params.sedimentLoad}
                onChange={(e) => handleParamChange('sedimentLoad', Number(e.target.value))}
                className="w-full accent-amber-900 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Đói phù sa (10%)</span>
                <span>Hiện nay (35%)</span>
                <span>Nguyên sơ (100%)</span>
              </div>
            </div>

            {/* 4. Mức độ đập thủy điện tích nước */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-700" />
                  🏗️ Đập Thủy Điện Tích Trữ
                </span>
                <span className="font-black text-slate-800 font-mono">{params.damExtraction}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={params.damExtraction}
                onChange={(e) => handleParamChange('damExtraction', Number(e.target.value))}
                className="w-full accent-slate-800 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Xả tự nhiên (0%)</span>
                <span>Trung bình (50%)</span>
                <span>Giữ nước tối đa (100%)</span>
              </div>
            </div>

            {/* 5. Cường độ hạn hán */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Sun className="w-3.5 h-3.5 text-orange-600" />
                  ☀️ Cường Độ Hạn Hán (El Niño)
                </span>
                <span className="font-black text-orange-700 font-mono">{params.droughtIntensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={params.droughtIntensity}
                onChange={(e) => handleParamChange('droughtIntensity', Number(e.target.value))}
                className="w-full accent-orange-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Năm mưa nhiều (0%)</span>
                <span>Hạn vừa (50%)</span>
                <span>Siêu hạn hán (100%)</span>
              </div>
            </div>

            {/* 6. Mực nước biển dâng */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Waves className="w-3.5 h-3.5 text-blue-600" />
                  🌊 Nước Biển Dâng Cao
                </span>
                <span className="font-black text-blue-700 font-mono">+{params.seaLevelRise} cm</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={params.seaLevelRise}
                onChange={(e) => handleParamChange('seaLevelRise', Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Hiện nay (0cm)</span>
                <span>Năm 2050 (+50cm)</span>
                <span>Năm 2100 (+100cm)</span>
              </div>
            </div>

            {/* 7. Tác động của biến đổi khí hậu */}
            <div className="space-y-1.5 bg-slate-50 p-3 rounded-2xl border border-slate-100">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Thermometer className="w-3.5 h-3.5 text-rose-600" />
                  🌡️ Biến Đổi Khí Hậu & Nắng Nóng
                </span>
                <span className="font-black text-rose-700 font-mono">{params.climateChangeImpact}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={params.climateChangeImpact}
                onChange={(e) => handleParamChange('climateChangeImpact', Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>Êm dịu (0%)</span>
                <span>Ấm dần (50%)</span>
                <span>Cực đoan gay gắt (100%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 8 Dynamic Real-Time Impacts (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 text-white rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="font-black text-xs sm:text-sm text-white uppercase tracking-wider">
                Phản Ứng Của Lưu Vực & ĐBSCL (Cập Nhật Thời Gian Thực)
              </h3>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono animate-pulse">● Đồng bộ tức thì</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* 1. Dòng chảy */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Droplets className="w-3.5 h-3.5 text-cyan-600" />
                  Dòng Chảy Sông Chính
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                  impacts.riverFlow.levelPct >= 55 ? 'bg-cyan-100 text-cyan-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {impacts.riverFlow.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {impacts.riverFlow.explanation}
              </p>
            </div>

            {/* 2. Xâm nhập mặn */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <span className="text-sm">🧂</span>
                  Xâm Nhập Mặn (4g/l)
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                  impacts.salinityIntrusion.reachKm <= 45 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  Sâu ~{impacts.salinityIntrusion.reachKm} km
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {impacts.salinityIntrusion.explanation}
              </p>
            </div>

            {/* 3. Sạt lở */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  Sạt Lở Bờ Sông & Bờ Biển
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                  impacts.riverbankErosion.levelPct < 40 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {impacts.riverbankErosion.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {impacts.riverbankErosion.explanation}
              </p>
            </div>

            {/* 4. Nông nghiệp */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Wheat className="w-3.5 h-3.5 text-amber-600" />
                  Sản Xuất Nông Nghiệp
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                  impacts.agriculture.levelPct >= 65 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {impacts.agriculture.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {impacts.agriculture.explanation}
              </p>
            </div>

            {/* 5. Thủy sản */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Fish className="w-3.5 h-3.5 text-blue-600" />
                  Nguồn Lợi Thủy Sản
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                  impacts.fisheries.levelPct >= 65 ? 'bg-blue-100 text-blue-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {impacts.fisheries.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {impacts.fisheries.explanation}
              </p>
            </div>

            {/* 6. Hệ sinh thái */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <TreePine className="w-3.5 h-3.5 text-emerald-600" />
                  Hệ Sinh Thái Đất Ngập Nước
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                  impacts.ecosystem.levelPct >= 65 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {impacts.ecosystem.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {impacts.ecosystem.explanation}
              </p>
            </div>

            {/* 7. Đồng Bằng Sông Cửu Long */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-teal-600" />
                  Tổn Thương Của ĐBSCL
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                  impacts.mekongDelta.status.includes('Trù Phú') ? 'bg-teal-100 text-teal-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {impacts.mekongDelta.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {impacts.mekongDelta.explanation}
              </p>
            </div>

            {/* 8. Đời sống người dân */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-indigo-600" />
                  Đời Sống & Nước Sinh Hoạt
                </span>
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-black ${
                  impacts.livelihoods.levelPct >= 65 ? 'bg-indigo-100 text-indigo-800' : 'bg-rose-100 text-rose-800'
                }`}>
                  {impacts.livelihoods.status}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                {impacts.livelihoods.explanation}
              </p>
            </div>
          </div>

          {/* Action Next Step Banner */}
          <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-xs text-teal-900">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Đã ghi nhận thử nghiệm mô phỏng tương tác thành công vào hệ thống tiến độ!
              </span>
            </div>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('clinic')}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs transition-transform hover:scale-105 cursor-pointer shadow-xs"
              >
                <span>Chuyển Sang Chức Năng 4: Bác Sĩ Mê Công</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
