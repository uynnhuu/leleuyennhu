import React, { useState } from 'react';
import { 
  MEKONG_DOCTOR_DISEASES, 
  EcoDoctorDisease 
} from '../data/mekongDoctorData';
import { markModuleCompleted } from '../data/progressManager';
import { 
  Stethoscope, 
  AlertCircle, 
  CheckCircle2, 
  Activity, 
  FileText, 
  Pill, 
  MapPin, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  ChevronRight,
  ShieldCheck,
  TreePine,
  Layers,
  Thermometer,
  Waves,
  Wheat,
  Share2
} from 'lucide-react';

interface MekongDoctorProps {
  onAddPoints?: (pts: number) => void;
  onNavigateTab?: (tab: string) => void;
}

export const MekongDoctor: React.FC<MekongDoctorProps> = ({ 
  onAddPoints,
  onNavigateTab 
}) => {
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>('salinity');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [consultNotes, setConsultNotes] = useState<Record<string, boolean>>({});

  const disease: EcoDoctorDisease = MEKONG_DOCTOR_DISEASES.find(d => d.id === selectedDiseaseId) || MEKONG_DOCTOR_DISEASES[0];

  const handleSelectDisease = (id: string) => {
    // Stop any ongoing speech
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    setSelectedDiseaseId(id);
    if (!consultNotes[id]) {
      setConsultNotes(prev => ({ ...prev, [id]: true }));
      markModuleCompleted('doctor');
      if (onAddPoints) onAddPoints(40);
    }
  };

  // Text-To-Speech for Vietnamese Doctor Diagnosis
  const handleToggleSpeak = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Trình duyệt của bạn chưa hỗ trợ chức năng đọc giọng nói Web Speech.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = `Bác sĩ Mê Kông chẩn đoán bệnh án: ${disease.name}. ${disease.definition}. Về nguyên nhân: Yếu tố tự nhiên bao gồm: ${disease.causes.natural.join('. ')}. Hoạt động con người bao gồm: ${disease.causes.humanActivity.join('. ')}. Biến đổi khí hậu gồm: ${disease.causes.climateChange.join('. ')}. Liên hệ Hậu Giang: ${disease.hauGiangConnection}. Đơn thuốc điều trị thuận thiên: ${disease.treatmentPrescription.thuanThienModel}`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Pick a Vietnamese voice if available
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
    if (viVoice) utterance.voice = viVoice;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-800/60">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-400 text-slate-950 flex items-center gap-1.5 shadow-xs">
                <Stethoscope className="w-3.5 h-3.5 text-slate-950" />
                Phòng Khám Sinh Thái Mê Kông
              </span>
              <span className="text-xs text-emerald-200 hidden sm:inline">Chẩn đoán 8 bệnh lý sinh thái</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Bác Sĩ Mê Công</span>
              <span className="text-xl sm:text-2xl text-emerald-300">🩺</span>
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
              Dòng sông Mê Kông như một cơ thể sống vĩ đại đang đối mặt với nhiều "bệnh lý" nghiêm trọng. 
              Hãy cùng Bác sĩ Mê Công khám bệnh, bóc tách nguyên nhân đa chiều và kê đơn thuốc thích ứng "Thuận thiên" cho từng căn bệnh!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleSpeak}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold text-xs shadow-md transition-all cursor-pointer border ${
                isSpeaking
                  ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 border-emerald-400'
              }`}
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-4 h-4" />
                  <span>Dừng Đọc Bệnh Án</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4" />
                  <span>🔊 Nghe Bác Sĩ Đọc Bệnh Án</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 8 Clinical River Issues Selector Grid */}
        <div className="mt-8 pt-5 border-t border-emerald-800/70">
          <span className="text-xs font-black text-emerald-200 uppercase tracking-wider block mb-3">
            Chọn 1 trong 8 Bệnh Lý Cần Hội Chẩn:
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {MEKONG_DOCTOR_DISEASES.map(d => {
              const isSelected = selectedDiseaseId === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => handleSelectDisease(d.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-black border-emerald-300 shadow-lg scale-102 ring-2 ring-emerald-400'
                      : 'bg-white/10 text-white border-white/10 hover:bg-white/15'
                  }`}
                >
                  <span className="text-xl shrink-0">{d.icon}</span>
                  <div className="truncate">
                    <div className="text-xs font-bold truncate">{d.name}</div>
                    <div className="text-[10px] opacity-75">{d.ecoCode}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Medical Record / Diagnosis Dossier */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
        {/* Record Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-3xl flex items-center justify-center text-emerald-900 shadow-xs">
              {disease.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[10px] font-bold">
                  Mã ICD-Eco: {disease.ecoCode}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[11px] font-extrabold">
                  {disease.severityLevel}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-1">
                {disease.name}
              </h2>
              <p className="text-xs text-slate-500">
                Tổn thương chính: <strong className="text-slate-700">{disease.patientOrgan}</strong>
              </p>
            </div>
          </div>

          <div className="bg-emerald-50 text-emerald-900 px-4 py-2.5 rounded-2xl border border-emerald-200 text-right">
            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Trạng Thái Khám</span>
            <span className="text-xs font-black flex items-center gap-1 text-emerald-950">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Đã Hoàn Tất Hồ Sơ Bệnh Án
            </span>
          </div>
        </div>

        {/* 1. Vấn Đề Là Gì? (Definition) */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-600" />
            1. Vấn Đề Là Gì? (Định Nghĩa & Bản Chất Khoa Học)
          </h3>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
            {disease.definition}
          </p>
        </div>

        {/* 2. Nguyên Nhân Đa Chiều (Multi-Factor Causes) */}
        <div className="space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Activity className="w-4 h-4 text-teal-600" />
            2. Phân Tích Nguyên Nhân Đa Chiều (Không Quy Kết Một Chiều)
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* Natural Causes */}
            <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-sky-950 flex items-center gap-1.5">
                <Waves className="w-4 h-4 text-sky-600" />
                Yếu Tố Tự Nhiên (Vốn Có):
              </span>
              <ul className="text-xs text-sky-900 space-y-1.5 list-disc pl-4">
                {disease.causes.natural.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Human Activity Causes */}
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Hoạt Động Của Con Người:
              </span>
              <ul className="text-xs text-amber-900 space-y-1.5 list-disc pl-4">
                {disease.causes.humanActivity.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Climate Change Causes */}
            <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-4 space-y-2">
              <span className="text-xs font-bold text-rose-950 flex items-center gap-1.5">
                <Thermometer className="w-4 h-4 text-rose-600" />
                Tác Động Biến Đổi Khí Hậu:
              </span>
              <ul className="text-xs text-rose-900 space-y-1.5 list-disc pl-4">
                {disease.causes.climateChange.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. Triệu Chứng / Biểu Hiện Lâm Sàng */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-2">
          <h3 className="text-xs font-black uppercase tracking-wider text-cyan-300 flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            3. Biểu Hiện & Triệu Chứng Nhận Biết Trên Dòng Sông
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {disease.symptoms.map((s, i) => (
              <div key={i} className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 text-xs text-slate-200">
                <span className="text-amber-400 font-bold block mb-1">Dấu hiệu {i + 1}:</span>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* 4 & 5. Tác Động Đến Tự Nhiên & Kinh Tế - Xã Hội */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
            <h4 className="text-xs font-black text-emerald-950 uppercase flex items-center gap-1.5">
              <TreePine className="w-4 h-4 text-emerald-700" />
              4. Tác Động Đến Tự Nhiên & Sinh Thái:
            </h4>
            <p className="text-xs sm:text-sm text-emerald-900 leading-relaxed">
              {disease.naturalImpact}
            </p>
          </div>

          <div className="bg-indigo-50/60 border border-indigo-200 rounded-2xl p-4 space-y-1.5">
            <h4 className="text-xs font-black text-indigo-950 uppercase flex items-center gap-1.5">
              <Wheat className="w-4 h-4 text-indigo-700" />
              5. Tác Động Đến Kinh Tế – Xã Hội:
            </h4>
            <p className="text-xs sm:text-sm text-indigo-900 leading-relaxed">
              {disease.socioEconomicImpact}
            </p>
          </div>
        </div>

        {/* 6. Ảnh Hưởng Đến ĐBSCL */}
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5 space-y-1.5">
          <h4 className="text-xs font-black text-teal-950 uppercase flex items-center gap-1.5">
            <Waves className="w-4 h-4 text-teal-700" />
            6. Ảnh Hưởng Trực Tiếp Đến Đồng Bằng Sông Cửu Long:
          </h4>
          <p className="text-xs sm:text-sm text-teal-900 leading-relaxed">
            {disease.deltaImpact}
          </p>
        </div>

        {/* 7. Liên Hệ Hậu Giang Cụ Thể (Địa chỉ FPT Vị Thủy) */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 rounded-2xl p-5 space-y-2 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xs">
              📍
            </span>
            <h4 className="text-xs sm:text-sm font-black text-amber-950">
              7. Liên Hệ Thực Tế Tỉnh Hậu Giang (Trường FPT Hậu Giang - 61C ấp 6, Vị Thủy):
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed bg-white/70 p-3.5 rounded-xl border border-amber-200">
            {disease.hauGiangConnection}
          </p>
        </div>

        {/* 8. Đơn Thuốc & Phác Đồ Điều Trị Thích Ứng (Solutions & Prescription) */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Pill className="w-5 h-5 text-emerald-400" />
              <h3 className="text-sm sm:text-base font-black text-white">
                8. Đơn Thuốc & Phác Đồ Điều Trị Thích Ứng Của Bác Sĩ Mê Kông
              </h3>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono">NQ 120/NQ-CP</span>
          </div>

          {/* Model Thuan Thien Highlight Box */}
          <div className="bg-emerald-950/70 border border-emerald-500/60 p-4 rounded-2xl space-y-1.5">
            <span className="text-xs font-black text-emerald-300 flex items-center gap-1.5 uppercase">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              Mô Hình "Thuận Thiên" Cốt Lõi Được Bác Sĩ Khuyên Dùng:
            </span>
            <p className="text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed">
              {disease.treatmentPrescription.thuanThienModel}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Structural Solutions */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-cyan-300 block">
                🏗️ Giải Pháp Công Trình (Cứng):
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                {disease.treatmentPrescription.structural.map((sol, i) => (
                  <li key={i}>{sol}</li>
                ))}
              </ul>
            </div>

            {/* Non-structural Solutions */}
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-2">
              <span className="text-xs font-bold text-amber-300 block">
                📜 Giải Pháp Phi Công Trình & Chính Sách (Mềm):
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
                {disease.treatmentPrescription.nonStructural.map((sol, i) => (
                  <li key={i}>{sol}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Navigation to next module */}
        {onNavigateTab && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => onNavigateTab('summit')}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-105 cursor-pointer"
            >
              <span>Tham Gia Mô Phỏng 5: Hội Nghị Mê Công (MRC)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
