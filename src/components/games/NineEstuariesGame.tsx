import React, { useState } from 'react';
import { NINE_ESTUARIES } from '../../data/mekongData';
import { EstuaryInfo } from '../../types/mekong';
import { 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy, 
  Sparkles, 
  Info,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface NineEstuariesGameProps {
  onAddPoints: (pts: number) => void;
}

export const NineEstuariesGame: React.FC<NineEstuariesGameProps> = ({ onAddPoints }) => {
  // Shuffle or list the 9 estuaries
  const [unassigned, setUnassigned] = useState<EstuaryInfo[]>([...NINE_ESTUARIES].sort(() => Math.random() - 0.5));
  const [tienBranch, setTienBranch] = useState<EstuaryInfo[]>([]);
  const [hauBranch, setHauBranch] = useState<EstuaryInfo[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);

  const handleAssign = (estuary: EstuaryInfo, target: 'Tiền' | 'Hậu') => {
    if (estuary.riverBranch === target) {
      // Correct
      if (target === 'Tiền') {
        setTienBranch(prev => [...prev, estuary]);
      } else {
        setHauBranch(prev => [...prev, estuary]);
      }
      const newUnassigned = unassigned.filter(item => item.id !== estuary.id);
      setUnassigned(newUnassigned);
      setFeedbackMsg(`Chính xác! ${estuary.name} thuộc nhánh Sông ${target}.`);

      // Check if all assigned
      if (newUnassigned.length === 0) {
        setGameCompleted(true);
        onAddPoints(50);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      // Incorrect
      setAttempts(a => a + 1);
      setFeedbackMsg(`Chưa đúng! ${estuary.name} không thuộc nhánh Sông ${target}. Hãy thử lại nhé!`);
    }
  };

  const handleReset = () => {
    setUnassigned([...NINE_ESTUARIES].sort(() => Math.random() - 0.5));
    setTienBranch([]);
    setHauBranch([]);
    setGameCompleted(false);
    setFeedbackMsg(null);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
      {/* Title & Rules */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
            Mini Game 1 • Địa Lí 11
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-1">
            Thử Thách: Phân Loại 9 Cửa Sông Cửu Long
          </h2>
          <p className="text-xs text-slate-700 mt-0.5">
            Sông Tiền có 6 cửa sông, Sông Hậu có 3 cửa sông. Hãy xếp từng cửa sông vào đúng nhánh sông của nó!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Chơi lại</span>
          </button>
        </div>
      </div>

      {/* Progress & Alert */}
      {feedbackMsg && (
        <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
          feedbackMsg.includes('Chính xác')
            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
            : 'bg-amber-50 text-amber-900 border border-amber-200'
        }`}>
          {feedbackMsg.includes('Chính xác') ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <XCircle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Unassigned Estuaries Pool */}
      {!gameCompleted && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center justify-between">
            <span>Danh Sách Cửa Sông Chờ Phân Loại ({unassigned.length}/9):</span>
            <span className="text-sky-700 normal-case font-medium">Bấm vào mũi tên để chuyển vào Sông Tiền hoặc Sông Hậu</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {unassigned.map((est) => (
              <div 
                key={est.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-white hover:border-sky-300 transition-all shadow-2xs"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-extrabold text-sm text-slate-900">{est.name}</span>
                  <span className="text-[11px] font-medium text-slate-600">{est.province}</span>
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-1 mb-2">
                  {est.description}
                </p>

                <div className="grid grid-cols-2 gap-1.5 pt-1 border-t border-slate-200/60">
                  <button
                    onClick={() => handleAssign(est, 'Tiền')}
                    className="py-1 px-2 rounded-lg bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-700 font-bold text-[11px] transition-colors border border-blue-200"
                  >
                    ← Sông Tiền
                  </button>
                  <button
                    onClick={() => handleAssign(est, 'Hậu')}
                    className="py-1 px-2 rounded-lg bg-teal-50 hover:bg-teal-600 hover:text-white text-teal-700 font-bold text-[11px] transition-colors border border-teal-200"
                  >
                    Sông Hậu →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Target Branches Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sông Tiền (6 cửa) */}
        <div className="bg-blue-50/60 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-blue-200/80">
            <div>
              <span className="text-xs font-bold text-blue-900 uppercase">Nhánh Sông Tiền</span>
              <h4 className="text-sm font-extrabold text-blue-950">Gồm 6 Cửa Sông ({tienBranch.length}/6)</h4>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-md bg-blue-200 text-blue-900">
              {tienBranch.length === 6 ? 'Đủ 6 cửa' : `Còn thiếu ${6 - tienBranch.length}`}
            </span>
          </div>

          <div className="space-y-2 min-h-[140px]">
            {tienBranch.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-blue-600 italic py-6">
                Chưa có cửa sông nào được phân loại vào đây.
              </div>
            ) : (
              tienBranch.map((item) => (
                <div key={item.id} className="p-2.5 rounded-lg bg-white border border-blue-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{item.name}</span>
                    <span className="text-slate-600 ml-2">({item.province})</span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${
                    item.status === 'dammed' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.status === 'dammed' ? '🔒 Đã đắp cống đập' : '🌊 Đang lưu thông'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Sông Hậu (3 cửa) */}
        <div className="bg-teal-50/60 border border-teal-200 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-teal-200/80">
            <div>
              <span className="text-xs font-bold text-teal-900 uppercase">Nhánh Sông Hậu</span>
              <h4 className="text-sm font-extrabold text-teal-950">Gồm 3 Cửa Sông ({hauBranch.length}/3)</h4>
            </div>
            <span className="text-xs font-bold px-2 py-1 rounded-md bg-teal-200 text-teal-900">
              {hauBranch.length === 3 ? 'Đủ 3 cửa' : `Còn thiếu ${3 - hauBranch.length}`}
            </span>
          </div>

          <div className="space-y-2 min-h-[140px]">
            {hauBranch.length === 0 ? (
              <div className="h-full flex items-center justify-center text-xs text-teal-600 italic py-6">
                Chưa có cửa sông nào được phân loại vào đây.
              </div>
            ) : (
              hauBranch.map((item) => (
                <div key={item.id} className="p-2.5 rounded-lg bg-white border border-teal-200 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900">{item.name}</span>
                    <span className="text-slate-600 ml-2">({item.province})</span>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-sm ${
                    item.status === 'silted' ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    {item.status === 'silted' ? '⚠️ Đã bị bồi lấp' : '🌊 Đang lưu thông'}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Completion Celebration Card */}
      {gameCompleted && (
        <div className="bg-gradient-to-r from-emerald-500 via-teal-600 to-sky-600 text-white rounded-2xl p-5 shadow-md flex flex-wrap items-center justify-between gap-4 animate-in fade-in zoom-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Trophy className="w-7 h-7 text-amber-300 animate-bounce" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Chúc mừng bạn đã hoàn thành!
              </span>
              <h3 className="text-lg font-black">
                Bậc Thầy Địa Lí: Thông Thạo 9 Cửa Sông Cửu Long!
              </h3>
              <p className="text-xs text-white/90">
                Bạn đã nhận được <strong>+50 Điểm Thám Hiểm</strong> vào tài khoản học tập.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-white/90 transition-colors shadow-xs"
            >
              Chơi Lại Lần Nữa
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
