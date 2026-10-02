import React, { useState } from 'react';
import { 
  SUMMIT_COUNTRIES, 
  MRC_PROCEDURES_INFO, 
  SUMMIT_SCENARIOS,
  SummitCountryRole,
  SummitScenario,
  SummitScenarioProposal
} from '../data/mekongSummitData';
import { markModuleCompleted } from '../data/progressManager';
import { 
  Users, 
  Globe, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  RotateCcw, 
  ChevronRight, 
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  Layers,
  FileCheck2,
  Handshake
} from 'lucide-react';

interface MekongSummitProps {
  onAddPoints?: (pts: number) => void;
  onNavigateTab?: (tab: string) => void;
}

export const MekongSummit: React.FC<MekongSummitProps> = ({ 
  onAddPoints,
  onNavigateTab 
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('vietnam');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('summit-scen-1');
  const [activeProposal, setActiveProposal] = useState<SummitScenarioProposal | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [showMrcProcedures, setShowMrcProcedures] = useState<boolean>(false);

  const country = SUMMIT_COUNTRIES.find(c => c.id === selectedCountryId) || SUMMIT_COUNTRIES[0];
  const scenario = SUMMIT_SCENARIOS.find(s => s.id === selectedScenarioId) || SUMMIT_SCENARIOS[0];

  // Retrieve proposals for the selected country (or fallback to Vietnam if none specific)
  const availableProposals = scenario.proposalsByCountry[country.id] || scenario.proposalsByCountry['vietnam'];

  const handleSelectCountry = (cId: string) => {
    setSelectedCountryId(cId);
    setActiveProposal(null);
    setHasSubmitted(false);
  };

  const handleSelectScenario = (sId: string) => {
    setSelectedScenarioId(sId);
    setActiveProposal(null);
    setHasSubmitted(false);
  };

  const handleSubmitProposal = (proposal: SummitScenarioProposal) => {
    setActiveProposal(proposal);
    setHasSubmitted(true);
    markModuleCompleted('summit');
    if (onAddPoints) onAddPoints(50);
  };

  const handleReset = () => {
    setActiveProposal(null);
    setHasSubmitted(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-blue-800/60">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-400 text-slate-950 flex items-center gap-1.5 shadow-xs">
                <Handshake className="w-3.5 h-3.5 text-slate-950" />
                Mô Phỏng Ngoại Giao Nguồn Nước Đa Phương
              </span>
              <span className="text-xs text-blue-200 hidden sm:inline">Ủy hội Sông Mê Kông Quốc tế (MRC)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Hội Nghị Mê Công</span>
              <span className="text-xl sm:text-2xl text-blue-300">🤝</span>
            </h1>
            <p className="text-blue-100 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
              Nhập vai đại diện phái đoàn của 1 trong 6 quốc gia lưu vực sông Mê Kông: tham gia thảo luận các tình huống gay cấn 
              về đập thủy điện, xả lũ, hạn mặn và cùng tìm kiếm tiếng nói chung vì hòa bình và an ninh nguồn nước bền vững.
            </p>
          </div>

          <button
            onClick={() => setShowMrcProcedures(!showMrcProcedures)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-blue-300" />
            <span>{showMrcProcedures ? 'Đóng 5 Thủ Tục MRC' : 'Xem 5 Thủ Tục Của MRC'}</span>
          </button>
        </div>

        {/* Mandatory Educational Disclaimer Banner */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-xs text-amber-200 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-amber-300 block uppercase font-bold text-[11px] mb-0.5">
              ⚠️ QUAN TRỌNG - THÔNG BÁO MÔ PHỎNG GIÁO DỤC:
            </strong>
            “Đây là mô phỏng giáo dục, không phải phát biểu chính thức của bất kỳ quốc gia, chính phủ hoặc tổ chức nào.”
          </div>
        </div>
      </div>

      {/* MRC Procedures Drawer Card (Expandable) */}
      {showMrcProcedures && (
        <div className="bg-white rounded-3xl p-6 border border-blue-200 shadow-md space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
              <Scale className="w-4 h-4 text-blue-600" />
              <span>5 Thủ Tục Trụ Cột Quản Lý Nguồn Nước Của MRC (Hiệp Định Mê Kông 1995)</span>
            </h3>
            <span className="text-xs text-blue-600 font-bold">Nền tảng pháp lý quốc tế</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {MRC_PROCEDURES_INFO.map(proc => (
              <div key={proc.code} className="bg-blue-50/60 p-3.5 rounded-2xl border border-blue-100 space-y-1">
                <span className="font-black text-xs text-blue-900 block">{proc.code}</span>
                <span className="text-[11px] font-bold text-blue-800 block">{proc.fullName}</span>
                <p className="text-[11px] text-slate-600 leading-snug">{proc.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Role Selector: 6 Basin Countries */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
        <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
          Bước 1: Chọn Vai Trò Quốc Gia Đại Diện Tại Hội Nghị:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {SUMMIT_COUNTRIES.map(c => {
            const isSelected = selectedCountryId === c.id;
            return (
              <button
                key={c.id}
                onClick={() => handleSelectCountry(c.id)}
                className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-600 text-white font-black border-blue-400 shadow-md scale-102 ring-2 ring-blue-300'
                    : 'bg-slate-50 border-slate-200 hover:bg-white text-slate-800'
                }`}
              >
                <div className="text-2xl mb-1">{c.flag}</div>
                <div className="text-xs font-bold truncate">{c.name}</div>
                <div className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                  {c.flowContribution}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Country Profile Dossier */}
        <div className="mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
            <span className="font-bold text-slate-800">
              {country.flag} Hồ Sơ Phái Đoàn: <strong>{country.name}</strong> ({country.mrcStatus})
            </span>
            <span className="text-slate-500">
              Chiếm {country.basinAreaShare} • Đóng góp {country.flowContribution}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            <div>
              <strong className="text-emerald-800 block mb-1">🎯 Lợi ích cốt lõi quốc gia:</strong>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                {country.nationalInterests.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong className="text-rose-800 block mb-1">⚠️ Mối lo ngại hàng đầu:</strong>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                {country.coreConcerns.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Scenario Selector */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
            Bước 2: Chọn Tình Huống Nghị Sự Đàm Phán:
          </span>
          <span className="text-[11px] text-blue-700 font-bold">
            Thủ tục áp dụng: {scenario.mrcProcedureApplied}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SUMMIT_SCENARIOS.map(s => {
            const isSelected = selectedScenarioId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleSelectScenario(s.id)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 border-blue-500 shadow-xs ring-1 ring-blue-400 text-blue-950 font-bold'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="text-xs sm:text-sm font-extrabold">{s.title}</div>
                <div className="text-[11px] text-slate-500 mt-1">{s.topic}</div>
              </button>
            );
          })}
        </div>

        <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs sm:text-sm text-blue-950 leading-relaxed">
          <strong className="block text-blue-900 mb-1">Bối cảnh tình huống chi tiết:</strong>
          {scenario.situationContext}
        </div>

        {/* Proposals for Current Role */}
        <div className="pt-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
            Bước 3: Chọn Quan Điểm / Đề Xuất Của Phái Đoàn {country.name}:
          </h4>

          <div className="space-y-3">
            {availableProposals.map(prop => {
              const isSelected = activeProposal?.id === prop.id;
              return (
                <div
                  key={prop.id}
                  className={`p-5 rounded-2xl border transition-all text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-blue-50 border-blue-500 shadow-md ring-2 ring-blue-400'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-blue-100 text-blue-900">
                        {prop.stanceType}
                      </span>
                      <h5 className="font-extrabold text-sm sm:text-base text-slate-900">
                        {prop.title}
                      </h5>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prop.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleSubmitProposal(prop)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    {isSelected ? 'Đang Trình Bày' : 'Đưa Ra Quan Điểm Này'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Dynamic Multi-lateral Analysis Panel */}
      {hasSubmitted && activeProposal && (
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <h3 className="font-black text-sm sm:text-base text-white">
                Phân Tích Đa Phương Của Ban Thư Ký MRC & AI:
              </h3>
            </div>
            <span className="text-xs text-emerald-400 font-mono">
              Phái đoàn: {country.name}
            </span>
          </div>

          {/* 1. Lợi ích quốc gia & 2. Tác động xuyên biên giới */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-emerald-950/50 border border-emerald-500/40 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-extrabold text-emerald-300 flex items-center gap-1.5 uppercase">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                1. Lợi Ích Của Quốc Gia Bạn Thu Được:
              </span>
              <ul className="text-xs text-emerald-100 space-y-1.5 list-disc pl-4">
                {activeProposal.aiAnalysis.nationalBenefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-950/50 border border-blue-500/40 p-4 rounded-2xl space-y-2">
              <span className="text-xs font-extrabold text-blue-300 flex items-center gap-1.5 uppercase">
                <Globe className="w-4 h-4 text-blue-400" />
                2. Tác Động Xuyên Biên Giới Tới Các Nước Láng Giềng:
              </span>
              <ul className="text-xs text-blue-100 space-y-1.5 list-disc pl-4">
                {activeProposal.aiAnalysis.transboundaryImpacts.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* 3. Xung đột lợi ích cốt lõi */}
          <div className="bg-rose-950/50 border border-rose-500/40 p-4 rounded-2xl space-y-2">
            <span className="text-xs font-extrabold text-rose-300 flex items-center gap-1.5 uppercase">
              <TrendingDown className="w-4 h-4 text-rose-400" />
              3. Những Điểm Có Thể Xung Đột Lợi Ích & Khó Khăn Đàm Phán:
            </span>
            <ul className="text-xs text-rose-100 space-y-1.5 list-disc pl-4">
              {activeProposal.aiAnalysis.conflictPoints.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>

          {/* 4. Gợi ý nội dung cần hợp tác */}
          <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
            <span className="text-xs font-extrabold text-amber-300 flex items-center gap-1.5 uppercase">
              <Handshake className="w-4 h-4 text-amber-400" />
              4. Gợi Ý Nội Dung Thỏa Hiệp & Hợp Tác Win-Win Cùng Có Lợi:
            </span>
            <ul className="text-xs text-slate-200 space-y-1.5 list-disc pl-4">
              {activeProposal.aiAnalysis.cooperationRecommendations.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>

          {/* 5. Vai trò trao đổi dữ liệu thủy văn */}
          <div className="bg-indigo-950/70 p-4 rounded-2xl border border-indigo-500/50 text-xs text-indigo-100 space-y-1">
            <strong className="text-cyan-300 block font-bold text-xs uppercase flex items-center gap-1.5">
              <FileCheck2 className="w-4 h-4 text-cyan-400" />
              5. Vai Trò Sống Còn Của Trao Đổi Dữ Liệu & Phối Hợp Quản Lý Nguồn Nước:
            </strong>
            <p className="leading-relaxed opacity-95">
              {activeProposal.aiAnalysis.dataSharingRole}
            </p>
          </div>

          {/* Next Navigation */}
          {onNavigateTab && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => onNavigateTab('vietnam')}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-105 cursor-pointer"
              >
                <span>Chuyển Sang Chức Năng 6: ĐBSCL & Hậu Giang</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
