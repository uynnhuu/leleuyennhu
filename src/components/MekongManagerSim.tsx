import React, { useState } from 'react';
import { 
  MANAGER_SCENARIOS, 
  INITIAL_MANAGER_INDICATORS,
  ManagerIndicators,
  ManagerChoice,
  generateManagementReport,
  ManagementReportResult
} from '../data/mekongManagerData';
import { markModuleCompleted } from '../data/progressManager';
import confetti from 'canvas-confetti';
import { 
  Shield, 
  Droplet, 
  Wheat, 
  Fish, 
  Zap, 
  TreePine, 
  Users, 
  ArrowRight, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle, 
  Scale, 
  FileText, 
  Award, 
  ChevronRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Layers
} from 'lucide-react';

interface MekongManagerSimProps {
  onAddPoints?: (pts: number) => void;
  onNavigateTab?: (tab: string) => void;
}

export const MekongManagerSim: React.FC<MekongManagerSimProps> = ({ 
  onAddPoints,
  onNavigateTab 
}) => {
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [indicators, setIndicators] = useState<ManagerIndicators>({ ...INITIAL_MANAGER_INDICATORS });
  const [historyChoices, setHistoryChoices] = useState<Record<string, string>>({});
  const [selectedChoice, setSelectedChoice] = useState<ManagerChoice | null>(null);
  const [isDecisionMade, setIsDecisionMade] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [report, setReport] = useState<ManagementReportResult | null>(null);

  const scenario = MANAGER_SCENARIOS[currentScenarioIndex];

  const handleMakeDecision = (choice: ManagerChoice) => {
    setSelectedChoice(choice);
    setIsDecisionMade(true);

    // Apply indicators with bounds 0-100
    setIndicators(prev => ({
      water: Math.max(0, Math.min(100, prev.water + choice.indicatorChanges.water)),
      agriculture: Math.max(0, Math.min(100, prev.agriculture + choice.indicatorChanges.agriculture)),
      fisheries: Math.max(0, Math.min(100, prev.fisheries + choice.indicatorChanges.fisheries)),
      energy: Math.max(0, Math.min(100, prev.energy + choice.indicatorChanges.energy)),
      environment: Math.max(0, Math.min(100, prev.environment + choice.indicatorChanges.environment)),
      livelihood: Math.max(0, Math.min(100, prev.livelihood + choice.indicatorChanges.livelihood)),
    }));

    setHistoryChoices(prev => ({
      ...prev,
      [scenario.id]: choice.title
    }));

    if (onAddPoints) onAddPoints(40);
  };

  const handleProceedNext = () => {
    if (currentScenarioIndex < MANAGER_SCENARIOS.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      setSelectedChoice(null);
      setIsDecisionMade(false);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      // Completed all 6 scenarios
      const finalReport = generateManagementReport(indicators, historyChoices);
      setReport(finalReport);
      setIsFinished(true);
      markModuleCompleted('manager');
      if (onAddPoints) onAddPoints(120);
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setIndicators({ ...INITIAL_MANAGER_INDICATORS });
    setCurrentScenarioIndex(0);
    setHistoryChoices({});
    setSelectedChoice(null);
    setIsDecisionMade(false);
    setIsFinished(false);
    setReport(null);
  };

  const getIndicatorColor = (val: number) => {
    if (val >= 70) return 'text-emerald-600 bg-emerald-500';
    if (val >= 40) return 'text-amber-600 bg-amber-500';
    return 'text-rose-600 bg-rose-500';
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-teal-800/60">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-xs">
                <Scale className="w-3.5 h-3.5 text-slate-950" />
                Mô Phỏng Quản Trị Ra Quyết Định
              </span>
              <span className="text-xs text-teal-200 hidden sm:inline">6 Tình huống nan giải thực tế</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Bạn Là Người Quản Lý Mê Công</span>
              <span className="text-xl sm:text-2xl text-emerald-300">🎮</span>
            </h1>
            <p className="text-teal-100 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
              Bạn giữ cương vị lãnh đạo điều phối tài nguyên nước lưu vực sông Mê Kông. Mọi quyết định của bạn đều 
              ảnh hưởng trực tiếp đến 6 chỉ số sống còn: Nguồn nước, Nông nghiệp, Thủy sản, Năng lượng, Môi trường và Đời sống nhân dân!
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-right">
            <span className="text-[10px] text-teal-300 block uppercase font-bold tracking-wider">Tiến Độ Tình Huống</span>
            <span className="text-base sm:text-lg font-black text-emerald-300">
              {isFinished ? '6 / 6 Đã Xong' : `Tình huống ${currentScenarioIndex + 1} / ${MANAGER_SCENARIOS.length}`}
            </span>
          </div>
        </div>

        {/* 6 Vital Indicators Dashboard Bar */}
        <div className="mt-8 pt-6 border-t border-teal-800/80">
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="font-extrabold uppercase tracking-wider text-teal-200 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" />
              6 Chỉ Số Sức Khỏe Lưu Vực Mê Kông (0 - 100%)
            </span>
            <span className="text-[11px] text-teal-300">Được đo đạc tự động sau mỗi quyết định</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {/* 1. Nguồn nước */}
            <div className="bg-slate-900/80 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-bold flex items-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                  Nước
                </span>
                <span className="font-black text-cyan-300">{indicators.water}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 transition-all duration-500 rounded-full" 
                  style={{ width: `${indicators.water}%` }}
                />
              </div>
            </div>

            {/* 2. Nông nghiệp */}
            <div className="bg-slate-900/80 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-bold flex items-center gap-1">
                  <Wheat className="w-3.5 h-3.5 text-amber-400" />
                  Nông nghiệp
                </span>
                <span className="font-black text-amber-300">{indicators.agriculture}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-amber-400 transition-all duration-500 rounded-full" 
                  style={{ width: `${indicators.agriculture}%` }}
                />
              </div>
            </div>

            {/* 3. Thủy sản */}
            <div className="bg-slate-900/80 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-bold flex items-center gap-1">
                  <Fish className="w-3.5 h-3.5 text-blue-400" />
                  Thủy sản
                </span>
                <span className="font-black text-blue-300">{indicators.fisheries}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-blue-400 transition-all duration-500 rounded-full" 
                  style={{ width: `${indicators.fisheries}%` }}
                />
              </div>
            </div>

            {/* 4. Năng lượng */}
            <div className="bg-slate-900/80 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-bold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-yellow-400" />
                  Năng lượng
                </span>
                <span className="font-black text-yellow-300">{indicators.energy}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-yellow-400 transition-all duration-500 rounded-full" 
                  style={{ width: `${indicators.energy}%` }}
                />
              </div>
            </div>

            {/* 5. Môi trường */}
            <div className="bg-slate-900/80 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-bold flex items-center gap-1">
                  <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                  Môi trường
                </span>
                <span className="font-black text-emerald-300">{indicators.environment}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 transition-all duration-500 rounded-full" 
                  style={{ width: `${indicators.environment}%` }}
                />
              </div>
            </div>

            {/* 6. Đời sống */}
            <div className="bg-slate-900/80 backdrop-blur-xs p-3 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-bold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-rose-400" />
                  Đời sống
                </span>
                <span className="font-black text-rose-300">{indicators.livelihood}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div 
                  className="h-full bg-rose-400 transition-all duration-500 rounded-full" 
                  style={{ width: `${indicators.livelihood}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Scenario Simulation View */}
      {!isFinished ? (
        <div className="space-y-6">
          {/* Situation Context Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-900 flex items-center justify-center font-black text-xs">
                  {scenario.number}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-800">
                  Tình Huống Thực Tế Số {scenario.number}
                </span>
              </div>
              <span className="text-xs text-slate-500 italic">
                {scenario.subtitle}
              </span>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {scenario.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {scenario.context}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="text-amber-950">Vấn đề cấp bách:</strong> {scenario.urgentNotice}
              </div>
            </div>

            {/* Decision Choices */}
            <div className="pt-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
                Lựa Chọn Quyết Sách Của Bạn:
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {scenario.choices.map((choice) => {
                  const isSelected = selectedChoice?.id === choice.id;
                  return (
                    <div
                      key={choice.id}
                      className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between ${
                        isSelected
                          ? 'bg-teal-50/70 border-teal-500 shadow-md ring-2 ring-teal-400'
                          : 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-xs'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900">
                            {choice.title}
                          </h4>
                          {isSelected && (
                            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {choice.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100">
                        <button
                          disabled={isDecisionMade}
                          onClick={() => handleMakeDecision(choice)}
                          className={`w-full py-2.5 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-600 text-white'
                              : isDecisionMade
                              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                              : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                          }`}
                        >
                          {isSelected ? 'Đã Chọn Quyết Sách Này' : 'Ban Hành Quyết Sách Này'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Deep Trade-offs and Impact Analysis (Shown after making decision) */}
          {isDecisionMade && selectedChoice && (
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Scale className="w-5 h-5 text-emerald-400" />
                <h3 className="font-black text-sm sm:text-base text-white">
                  Phân Tích Tác Động & Đánh Đổi (Trade-Offs Analysis)
                </h3>
              </div>

              {/* Indicator Deltas */}
              <div className="bg-slate-800/90 rounded-2xl p-4 border border-slate-700/80">
                <span className="text-xs font-bold text-slate-300 uppercase block mb-2">
                  Biến Động Các Chỉ Số Lưu Vực Sau Quyết Định:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60">
                    <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Nước:</span>
                    <strong className={selectedChoice.indicatorChanges.water >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {selectedChoice.indicatorChanges.water > 0 ? `+${selectedChoice.indicatorChanges.water}` : selectedChoice.indicatorChanges.water}
                    </strong>
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60">
                    <Wheat className="w-3.5 h-3.5 text-amber-400" />
                    <span>N.Nghiệp:</span>
                    <strong className={selectedChoice.indicatorChanges.agriculture >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {selectedChoice.indicatorChanges.agriculture > 0 ? `+${selectedChoice.indicatorChanges.agriculture}` : selectedChoice.indicatorChanges.agriculture}
                    </strong>
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60">
                    <Fish className="w-3.5 h-3.5 text-blue-400" />
                    <span>T.Sản:</span>
                    <strong className={selectedChoice.indicatorChanges.fisheries >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {selectedChoice.indicatorChanges.fisheries > 0 ? `+${selectedChoice.indicatorChanges.fisheries}` : selectedChoice.indicatorChanges.fisheries}
                    </strong>
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60">
                    <Zap className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Điện:</span>
                    <strong className={selectedChoice.indicatorChanges.energy >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {selectedChoice.indicatorChanges.energy > 0 ? `+${selectedChoice.indicatorChanges.energy}` : selectedChoice.indicatorChanges.energy}
                    </strong>
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60">
                    <TreePine className="w-3.5 h-3.5 text-emerald-400" />
                    <span>M.Trường:</span>
                    <strong className={selectedChoice.indicatorChanges.environment >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {selectedChoice.indicatorChanges.environment > 0 ? `+${selectedChoice.indicatorChanges.environment}` : selectedChoice.indicatorChanges.environment}
                    </strong>
                  </div>

                  <div className="flex items-center gap-1.5 p-2 rounded-xl bg-slate-900/60">
                    <Users className="w-3.5 h-3.5 text-rose-400" />
                    <span>Dân sinh:</span>
                    <strong className={selectedChoice.indicatorChanges.livelihood >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {selectedChoice.indicatorChanges.livelihood > 0 ? `+${selectedChoice.indicatorChanges.livelihood}` : selectedChoice.indicatorChanges.livelihood}
                    </strong>
                  </div>
                </div>
              </div>

              {/* Cause and Mechanism */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-amber-300 block">
                  🔍 Giải Thích Nguyên Nhân Sâu Xa:
                </span>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-800/50 p-3.5 rounded-xl border border-slate-700/60">
                  {selectedChoice.causeExplanation}
                </p>
              </div>

              {/* Trade-off Columns: Gains vs Sacrifices */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="bg-emerald-950/50 border border-emerald-500/40 p-4 rounded-2xl space-y-2">
                  <span className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    Những Lợi Ích Thu Được (Gains):
                  </span>
                  <ul className="text-xs text-emerald-100 space-y-1.5 list-disc pl-4">
                    {selectedChoice.tradeOffAnalysis.gains.map((g, i) => (
                      <li key={i}>{g}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-rose-950/50 border border-rose-500/40 p-4 rounded-2xl space-y-2">
                  <span className="text-xs font-extrabold text-rose-300 flex items-center gap-1.5">
                    <TrendingDown className="w-4 h-4 text-rose-400" />
                    Những Đánh Đổi / Mất Mát (Sacrifices):
                  </span>
                  <ul className="text-xs text-rose-100 space-y-1.5 list-disc pl-4">
                    {selectedChoice.tradeOffAnalysis.sacrifices.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Policy Real-world Context */}
              <div className="text-xs text-slate-400 italic pt-1 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Liên hệ thực tiễn chính sách: {selectedChoice.policyContext}</span>
              </div>

              {/* Proceed Button */}
              <div className="pt-3 flex justify-end">
                <button
                  onClick={handleProceedNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-emerald-400/25 transition-transform hover:scale-105 cursor-pointer"
                >
                  <span>
                    {currentScenarioIndex < MANAGER_SCENARIOS.length - 1
                      ? 'Tiếp Tục Xử Lý Tình Huống Kế Tiếp'
                      : 'Hoàn Thành Toàn Bộ & Xuất Báo Cáo Quản Lý!'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Executive Management Report Screen */
        report && (
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-teal-500 to-emerald-600 flex items-center justify-center text-4xl shadow-xl shadow-teal-500/25">
                📜
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-black bg-teal-100 text-teal-900 border border-teal-300">
                BÁO CÁO TỔNG KẾT QUẢN LÝ LƯU VỰC
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
                {report.title}
              </h2>
              <p className="text-xs sm:text-sm font-bold text-teal-700">
                Phong cách: {report.leadershipStyle}
              </p>
            </div>

            {/* Final Indicators Summary */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-3">
              <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider">
                Kết Quả Chỉ Số Sau 6 Quyết Sách Của Bạn:
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Nước</span>
                  <strong className="text-lg font-black text-cyan-700">{indicators.water}%</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Nông nghiệp</span>
                  <strong className="text-lg font-black text-amber-700">{indicators.agriculture}%</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Thủy sản</span>
                  <strong className="text-lg font-black text-blue-700">{indicators.fisheries}%</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Năng lượng</span>
                  <strong className="text-lg font-black text-yellow-700">{indicators.energy}%</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Môi trường</span>
                  <strong className="text-lg font-black text-emerald-700">{indicators.environment}%</strong>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-[11px] text-slate-500 block">Dân sinh</span>
                  <strong className="text-lg font-black text-rose-700">{indicators.livelihood}%</strong>
                </div>
              </div>
            </div>

            {/* Assessment & Feedback */}
            <div className="p-5 rounded-2xl bg-teal-50 border border-teal-200 space-y-2">
              <h4 className="font-extrabold text-sm text-teal-950 flex items-center gap-2">
                <FileText className="w-4 h-4 text-teal-700" />
                Đánh Giá Tổng Quan Từ Hội Đồng Khoa Học Lưu Vực:
              </h4>
              <p className="text-xs sm:text-sm text-teal-900 leading-relaxed">
                {report.summaryFeedback}
              </p>
            </div>

            {/* Strengths & Vulnerabilities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                <h5 className="font-black text-xs text-emerald-950 uppercase flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Điểm Mạnh Trong Quản Lý:
                </h5>
                <ul className="text-xs text-emerald-900 space-y-1 list-disc pl-4">
                  {report.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <h5 className="font-black text-xs text-amber-950 uppercase flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  Những Điểm Cần Cân Nhắc / Dễ Tổn Thương:
                </h5>
                <ul className="text-xs text-amber-900 space-y-1 list-disc pl-4">
                  {report.vulnerabilities.map((v, i) => (
                    <li key={i}>{v}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
              <h5 className="font-black text-xs text-cyan-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Khuyến Nghị Chính Sách Căn Cơ (Dựa trên NQ 120 & MRC):
              </h5>
              <ul className="text-xs text-slate-200 space-y-1.5 list-disc pl-4">
                {report.recommendations.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>

            {/* Certificate Box */}
            <div className="p-4 rounded-2xl border-2 border-dashed border-emerald-400 bg-emerald-50/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Award className="w-8 h-8 text-amber-500 shrink-0" />
                <div>
                  <h5 className="font-black text-xs sm:text-sm text-slate-900">
                    Huy Hiệu Mở Khóa: {report.badge}
                  </h5>
                  <p className="text-[11px] text-slate-600">
                    Đã hoàn thành 6 kịch bản cân bằng tài nguyên nước Mê Kông
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-emerald-800 bg-emerald-200 px-3 py-1 rounded-full shrink-0">
                +120 Điểm
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRestart}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Thử Lại Với Quyết Sách Mới</span>
              </button>

              {onNavigateTab && (
                <button
                  onClick={() => onNavigateTab('simulator')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-600 text-white font-bold text-xs transition-transform hover:scale-105 cursor-pointer shadow-md"
                >
                  <span>Khám Phá Mô Phỏng 3: Nếu Mê Công Thay Đổi?</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
};
