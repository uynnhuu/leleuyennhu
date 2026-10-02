import React, { useState, useEffect } from 'react';
import { 
  getMekongProgress, 
  getMekongBadges, 
  calculateProgressPercentage,
  MekongModuleProgress,
  MekongBadge
} from '../data/progressManager';
import { 
  Award, 
  CheckCircle2, 
  Droplet, 
  Layers, 
  Sparkles, 
  ChevronRight, 
  Compass, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';

interface MekongProgressTrackerProps {
  onNavigateTab?: (tab: string) => void;
}

export const MekongProgressTracker: React.FC<MekongProgressTrackerProps> = ({ 
  onNavigateTab 
}) => {
  const [progress, setProgress] = useState<MekongModuleProgress>(getMekongProgress());
  const [badges, setBadges] = useState<MekongBadge[]>(getMekongBadges(progress));
  const [showDetailModal, setShowDetailModal] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      const p = getMekongProgress();
      setProgress(p);
      setBadges(getMekongBadges(p));
    };

    window.addEventListener('mekong-progress-updated', handleUpdate);
    return () => window.removeEventListener('mekong-progress-updated', handleUpdate);
  }, []);

  const pct = calculateProgressPercentage(progress);
  const completedCount = Object.values(progress).filter(Boolean).length;

  const modulesList = [
    { key: 'waterDrop', label: '1. Một Giọt Nước Mê Công', tab: 'water_drop', icon: '💧' },
    { key: 'manager', label: '2. Quản Lý Dòng Sông', tab: 'manager', icon: '🌾' },
    { key: 'simulator', label: '3. Mô Phỏng Đổi Thay', tab: 'simulator', icon: '🔮' },
    { key: 'doctor', label: '4. Bác Sĩ Mê Công', tab: 'clinic', icon: '🩺' },
    { key: 'summit', label: '5. Hội Nghị Mê Công', tab: 'summit', icon: '🤝' },
    { key: 'vietnamHauGiang', label: '6. ĐBSCL & Hậu Giang', tab: 'vietnam', icon: '🇻🇳' },
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-sky-200/80 p-3 sm:p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Left: Overall Title & Progress Bar */}
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-white flex items-center justify-center font-black shadow-xs shrink-0">
            🌊
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-extrabold text-slate-800 flex items-center gap-1.5">
                <span>Khám Phá Mê Công:</span>
                <span className="text-cyan-700 font-bold">{completedCount}/6 Mục Đã Học</span>
              </span>
              <span className="font-black text-blue-700 font-mono text-xs">{pct}%</span>
            </div>
            {/* Progress Track */}
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden border border-slate-200/60">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-blue-600 transition-all duration-700 rounded-full"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>

        {/* Center: 5 Badges Visual Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {badges.map(b => (
            <div
              key={b.id}
              title={`${b.name}: ${b.description} (${b.unlocked ? 'Đã đạt' : 'Chưa mở'})`}
              className={`px-2 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1 border transition-all ${
                b.unlocked
                  ? 'bg-amber-100/90 text-amber-900 border-amber-300 shadow-xs'
                  : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60'
              }`}
            >
              <span>{b.icon}</span>
              <span className="hidden md:inline">{b.name.split(' ')[1] || b.name}</span>
            </div>
          ))}
        </div>

        {/* Right: Quick Review Button */}
        <button
          onClick={() => setShowDetailModal(!showDetailModal)}
          className="px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-xs border border-sky-200 transition-colors cursor-pointer shrink-0"
        >
          {showDetailModal ? 'Thu Gọn Tiến Độ' : 'Chi Tiết 6 Chặng 🏆'}
        </button>
      </div>

      {/* Expanded Progress Detail Modal / Drawer */}
      {showDetailModal && (
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
          {modulesList.map((m) => {
            const isDone = progress[m.key as keyof MekongModuleProgress];
            return (
              <button
                key={m.key}
                onClick={() => {
                  if (onNavigateTab) onNavigateTab(m.tab);
                }}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{m.icon}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="text-[10px] text-slate-400">Chưa xong</span>
                  )}
                </div>
                <div className="text-[11px] font-extrabold truncate">
                  {m.label}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
