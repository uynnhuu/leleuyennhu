import React, { useState, useEffect } from 'react';
import { 
  WATER_DROP_STAGES, 
  WaterDropStage 
} from '../data/waterDropData';
import { markModuleCompleted } from '../data/progressManager';
import confetti from 'canvas-confetti';
import { 
  Droplets, 
  Compass, 
  MapPin, 
  Waves, 
  Mountain, 
  Fish, 
  Wheat, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  RotateCcw,
  Volume2,
  VolumeX,
  Award,
  ChevronRight,
  Info,
  Building2,
  TreePine,
  ShieldCheck
} from 'lucide-react';

interface WaterDropJourneyProps {
  onAddPoints?: (pts: number) => void;
  onNavigateTab?: (tab: string) => void;
}

export const WaterDropJourney: React.FC<WaterDropJourneyProps> = ({ 
  onAddPoints,
  onNavigateTab 
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const stage: WaterDropStage = WATER_DROP_STAGES[currentStageIndex];

  // Play river water audio tone if enabled
  const playWaterChime = (frequency = 440) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.6);
    } catch (e) {
      // AudioContext may be restricted by autoplay policy
    }
  };

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);

    if (idx === stage.challenge.correctAnswer) {
      playWaterChime(660);
      if (onAddPoints) onAddPoints(50);
    } else {
      playWaterChime(320);
    }
  };

  const handleNextStage = () => {
    setIsTransitioning(true);
    playWaterChime(550);

    setTimeout(() => {
      if (currentStageIndex < WATER_DROP_STAGES.length - 1) {
        setCurrentStageIndex(prev => prev + 1);
        setSelectedOption(null);
        setHasAnswered(false);
        setShowHint(false);
        setIsTransitioning(false);
        window.scrollTo({ top: 120, behavior: 'smooth' });
      } else {
        // Complete the entire journey
        setIsCompleted(true);
        setIsTransitioning(false);
        markModuleCompleted('waterDrop');
        if (onAddPoints) onAddPoints(100);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 450);
  };

  const handleRestartJourney = () => {
    setCurrentStageIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setShowHint(false);
    setIsCompleted(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 via-teal-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-sky-800/60">
        {/* Animated Background Water Ripple Simulation */}
        <div className="absolute -right-16 -top-16 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute right-1/3 -bottom-20 w-80 h-80 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-xs">
                <Droplets className="w-3.5 h-3.5 text-blue-950 fill-blue-950" />
                Trải Nghiệm Tương Tác Số 1
              </span>
              <span className="text-xs text-sky-200 hidden sm:inline">Hành trình dòng nước 4.763 km</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>Một Giọt Nước Mê Công</span>
              <span className="text-xl sm:text-2xl text-cyan-300">💧</span>
            </h1>
            <p className="text-sky-100 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
              Bạn chính là một giọt nước trên sông Mê Kông! Hãy bắt đầu hành trình từ những dải sông băng Tây Tạng ở độ cao 5.000m, 
              vượt qua 6 quốc gia và hòa vào Biển Đông qua 9 cửa rồng Cửu Long.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
              title={soundEnabled ? 'Tắt âm thanh sông nước' : 'Bật âm thanh sông nước'}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 text-cyan-300" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
            </button>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 text-right">
              <span className="text-[10px] text-sky-300 block uppercase font-bold tracking-wider">Chặng Hiện Tại</span>
              <span className="text-base sm:text-lg font-black text-cyan-200">
                {isCompleted ? 'Hoàn Thành!' : `Chặng ${currentStageIndex + 1} / ${WATER_DROP_STAGES.length}`}
              </span>
            </div>
          </div>
        </div>

        {/* 5-Stage Step Indicator */}
        <div className="mt-8 pt-5 border-t border-sky-800/70">
          <div className="grid grid-cols-5 gap-1.5 sm:gap-3">
            {WATER_DROP_STAGES.map((s, idx) => {
              const isPassed = currentStageIndex > idx || isCompleted;
              const isCurrent = currentStageIndex === idx && !isCompleted;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentStageIndex(idx);
                    setSelectedOption(null);
                    setHasAnswered(false);
                    setShowHint(false);
                    setIsCompleted(false);
                  }}
                  className={`text-left p-2 sm:p-3 rounded-xl transition-all border cursor-pointer ${
                    isCurrent
                      ? 'bg-cyan-500 text-slate-950 font-black border-cyan-300 shadow-lg scale-102 ring-2 ring-cyan-400'
                      : isPassed
                      ? 'bg-teal-900/60 text-white border-teal-500/40 hover:bg-teal-800/60'
                      : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] sm:text-xs mb-1">
                    <span className="font-bold opacity-80">Chặng {idx + 1}</span>
                    <span>{s.avatarIcon}</span>
                  </div>
                  <div className="text-[11px] sm:text-xs font-bold truncate">
                    {s.name}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage Body */}
      {!isCompleted ? (
        <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-30 translate-y-2' : 'opacity-100'}`}>
          {/* Current Droplet Persona Status Card */}
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border border-cyan-200 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-cyan-600 text-white text-3xl flex items-center justify-center shadow-md animate-bounce">
                {stage.avatarIcon}
              </div>
              <div>
                <span className="text-xs font-extrabold text-cyan-800 uppercase tracking-wide block">
                  Trạng Thái Của Bạn Hiện Tại:
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-800">
                  {stage.dropletForm}
                </p>
                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <Compass className="w-3.5 h-3.5 text-cyan-600" />
                    Độ cao: {stage.altitude}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                    Khoảng cách: {stage.spanDistance}
                  </span>
                </div>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-xl bg-white border border-cyan-200 text-xs font-semibold text-cyan-900 shadow-xs">
              📍 {stage.regionTitle}
            </div>
          </div>

          {/* 4 Core Educational Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* 1. Thông Tin Địa Lí */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-sky-300 transition-colors">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center font-black">
                  <Mountain className="w-5 h-5 text-sky-700" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    1. Thông Tin Địa Lí Khu Vực
                  </h3>
                  <span className="text-[11px] text-slate-500">Đặc điểm hình thái dòng sông</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                {stage.geographicInfo}
              </p>
            </div>

            {/* 2. Vai Trò Của Dòng Nước */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-teal-300 transition-colors">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center font-black">
                  <Waves className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    2. Sứ Mệnh & Vai Trò Của Dòng Nước
                  </h3>
                  <span className="text-[11px] text-slate-500">Giá trị nuôi sống lưu vực</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-teal-50/50 p-3.5 rounded-xl border border-teal-100">
                {stage.waterRole}
              </p>
            </div>

            {/* 3. Hoạt Động Kinh Tế Liên Quan */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-amber-300 transition-colors">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black">
                  <Wheat className="w-5 h-5 text-amber-700" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    3. Hoạt Động Kinh Tế Liên Quan
                  </h3>
                  <span className="text-[11px] text-slate-500">Nông nghiệp, năng lượng, thủy sản</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-amber-50/50 p-3.5 rounded-xl border border-amber-100">
                {stage.economicActivities}
              </p>
            </div>

            {/* 4. Vấn Đề Môi Trường & Nguồn Nước */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-red-300 transition-colors">
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center font-black">
                  <AlertTriangle className="w-5 h-5 text-rose-700" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                    4. Vấn Đề Môi Trường & Nguồn Nước
                  </h3>
                  <span className="text-[11px] text-slate-500">Thách thức đập, hạn mặn, sạt lở</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-rose-50/50 p-3.5 rounded-xl border border-rose-100">
                {stage.environmentalIssues}
              </p>
            </div>
          </div>

          {/* Vietnam / Hau Giang Connection Callout */}
          <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200 rounded-2xl p-4 sm:p-5 shadow-xs flex items-start gap-3 mt-4">
            <span className="text-2xl mt-0.5">🌾</span>
            <div className="flex-1">
              <h4 className="text-xs sm:text-sm font-bold text-emerald-950 flex items-center gap-1.5">
                <span>Liên Hệ Thực Tiễn Việt Nam & Hậu Giang:</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 font-extrabold">SGK Địa lí 11</span>
              </h4>
              <p className="text-xs sm:text-sm text-emerald-900 mt-1 leading-relaxed">
                {stage.vietnamConnection}
              </p>
            </div>
          </div>

          {/* Interactive Challenge Question To Proceed */}
          <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 mt-6 shadow-xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-cyan-400 text-slate-950 flex items-center justify-center font-black text-sm">
                  ❓
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-white">
                    Thử Thách Vượt Dòng Để Tiếp Tục Hành Trình
                  </h3>
                  <p className="text-xs text-slate-400">
                    Trả lời chính xác để giọt nước có đủ năng lượng xuôi dòng về chặng kế tiếp
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-cyan-300 hover:text-cyan-200 flex items-center gap-1 cursor-pointer bg-white/10 px-3 py-1.5 rounded-xl border border-white/15"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showHint ? 'Ẩn Gợi Ý' : 'Gợi Ý Của Kiến Sáng'}</span>
              </button>
            </div>

            {showHint && (
              <div className="mb-4 p-3.5 rounded-2xl bg-cyan-950/60 border border-cyan-500/40 text-xs text-cyan-200 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-cyan-300 block">Gợi ý dành cho bạn:</strong>
                  {stage.challenge.hint}
                </div>
              </div>
            )}

            <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-700/80 mb-5">
              <p className="text-xs text-amber-300 italic mb-1.5">
                "{stage.challenge.scenario}"
              </p>
              <p className="text-sm sm:text-base font-extrabold text-white leading-relaxed">
                {stage.challenge.question}
              </p>
            </div>

            {/* Answer Options */}
            <div className="space-y-2.5">
              {stage.challenge.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === stage.challenge.correctAnswer;
                let btnStyle = 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-750 hover:border-slate-600';

                if (hasAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600 text-white border-emerald-400 shadow-md ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-700 text-white border-rose-400';
                  } else {
                    btnStyle = 'bg-slate-800/50 text-slate-500 border-slate-800 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm font-medium transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-black/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-relaxed">{option}</span>
                    {hasAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Proceed Button */}
            {hasAnswered && (
              <div className="mt-5 pt-5 border-t border-slate-800 space-y-4">
                <div className={`p-4 rounded-2xl border text-xs sm:text-sm ${
                  selectedOption === stage.challenge.correctAnswer
                    ? 'bg-emerald-950/70 border-emerald-500/50 text-emerald-100'
                    : 'bg-rose-950/70 border-rose-500/50 text-rose-100'
                }`}>
                  <p className="font-extrabold mb-1 flex items-center gap-1.5">
                    {selectedOption === stage.challenge.correctAnswer ? '🎉 Tuyệt vời! Bạn đã chọn chính xác:' : '💡 Hãy chú ý phần giải thích sau:'}
                  </p>
                  <p className="leading-relaxed opacity-95">
                    {stage.challenge.explanation}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 italic">
                    💡 Thú vị: {stage.funFact}
                  </div>

                  <button
                    onClick={handleNextStage}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-cyan-400/25 transition-transform hover:scale-105 cursor-pointer ml-auto"
                  >
                    <span>
                      {currentStageIndex < WATER_DROP_STAGES.length - 1
                        ? 'Tiếp Tục Xuôi Dòng Chặng Tiếp Theo'
                        : 'Hòa Mình Vào Biển Đông & Hoàn Thành!'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Journey Complete Celebration Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 text-center border border-slate-200 shadow-xl space-y-6">
          <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-5xl shadow-xl shadow-cyan-500/30 animate-pulse">
            🌊
          </div>

          <div className="max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-100 text-cyan-900 border border-cyan-300">
              💧 SỨ MỆNH HOÀN THÀNH VẺ VANG
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Chúc Mừng! Giọt Nước Đã Vượt 4.763 km Về Đến Biển Đông
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Bạn đã hoàn thành trọn vẹn hành trình của một giọt nước trên dòng sông Mê Kông: 
              từ đỉnh tuyết Tây Tạng qua Lào, Myanmar, Thái Lan, Campuchia, bồi đắp mùa vàng ĐBSCL và tưới mát kênh xáng Hậu Giang trước khi hòa vào đại dương bao la!
            </p>
          </div>

          {/* Certificate Badge Card */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-gradient-to-r from-sky-50 to-teal-50 border-2 border-dashed border-cyan-400 text-left space-y-3 shadow-xs">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-amber-500 shrink-0" />
              <div>
                <h4 className="font-black text-sm text-slate-900">
                  Huy Hiệu Đã Mở Khóa: 💧 Nhà Khám Phá
                </h4>
                <p className="text-xs text-slate-600">
                  Ghi nhận hoàn thành chuyên đề học tập thực địa tương tác số 1
                </p>
              </div>
            </div>
            <div className="text-[11px] text-slate-500 border-t border-cyan-200 pt-2 flex items-center justify-between">
              <span>Trường TH, THCS, THPT FPT Hậu Giang</span>
              <span className="font-bold text-cyan-800">+100 Điểm Thám Hiểm</span>
            </div>
          </div>

          {/* Action Navigation */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestartJourney}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Trải Nghiệm Lại Hành Trình</span>
            </button>

            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('manager')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-transform hover:scale-105 cursor-pointer shadow-md"
              >
                <span>Sang Mô Phỏng 2: Bạn Là Người Quản Lý</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
