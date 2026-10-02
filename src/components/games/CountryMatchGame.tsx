import React, { useState } from 'react';
import { COUNTRIES_MEKONG } from '../../data/mekongData';
import { CountryMekong } from '../../types/mekong';
import { 
  CheckCircle2, 
  RotateCcw, 
  Trophy, 
  Sparkles, 
  Link2,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CountryMatchGameProps {
  onAddPoints: (pts: number) => void;
}

export const CountryMatchGame: React.FC<CountryMatchGameProps> = ({ onAddPoints }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryMekong | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ isSuccess: boolean; text: string } | null>(null);

  // Shuffled names for matching
  const [shuffledNames] = useState(() => 
    [...COUNTRIES_MEKONG].map(c => ({ id: c.id, localName: c.localName })).sort(() => Math.random() - 0.5)
  );

  const handleCountryClick = (c: CountryMekong) => {
    if (matchedPairs.includes(c.id)) return;
    setSelectedCountry(c);
    setFeedback(null);
  };

  const handleNameClick = (item: { id: string; localName: string }) => {
    if (matchedPairs.includes(item.id)) return;
    if (!selectedCountry) {
      setFeedback({ isSuccess: false, text: 'Vui lòng chọn quốc gia ở cột bên trái trước!' });
      return;
    }

    if (selectedCountry.id === item.id) {
      // Matched!
      const newMatched = [...matchedPairs, item.id];
      setMatchedPairs(newMatched);
      setFeedback({ isSuccess: true, text: `Chính xác! Tại ${selectedCountry.country}, sông có tên gọi là "${item.localName}".` });
      setSelectedCountry(null);

      if (newMatched.length === COUNTRIES_MEKONG.length) {
        onAddPoints(40);
        confetti({
          particleCount: 70,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } else {
      setFeedback({ isSuccess: false, text: `Chưa đúng rồi! "${item.localName}" không phải tên gọi sông Mê Kông tại ${selectedCountry.country}.` });
    }
  };

  const handleReset = () => {
    setMatchedPairs([]);
    setSelectedCountry(null);
    setFeedback(null);
  };

  const isAllMatched = matchedPairs.length === COUNTRIES_MEKONG.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-teal-100 text-teal-800">
            Mini Game 4 • Địa Lí 11
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-1">
            Nối Tên 6 Quốc Gia Ven Sông Mê Kông
          </h2>
          <p className="text-xs text-slate-700 mt-0.5">
            Ghép đúng tên gọi bản địa của dòng sông với quốc gia mà nó chảy qua!
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Làm lại</span>
        </button>
      </div>

      {/* Alert Feedback */}
      {feedback && (
        <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
          feedback.isSuccess
            ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
            : 'bg-amber-50 text-amber-900 border border-amber-200'
        }`}>
          {feedback.isSuccess ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          ) : (
            <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* 2 Matching Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Column 1: Countries */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            1. Danh sách Quốc gia ({matchedPairs.length}/6 đã ghép):
          </span>
          <div className="space-y-2">
            {COUNTRIES_MEKONG.map((c) => {
              const isMatched = matchedPairs.includes(c.id);
              const isSelected = selectedCountry?.id === c.id;

              return (
                <button
                  key={c.id}
                  onClick={() => handleCountryClick(c)}
                  disabled={isMatched}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 opacity-80 cursor-default'
                      : isSelected
                      ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-300 text-sky-950 font-bold shadow-xs'
                      : 'bg-white border-slate-200 hover:border-sky-300 hover:bg-slate-50 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{c.flag}</span>
                    <span className="font-bold text-sm">{c.country}</span>
                  </div>

                  {isMatched && (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Đã ghép
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Column 2: Local River Names */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
            2. Tên gọi bản địa tương ứng:
          </span>
          <div className="space-y-2">
            {shuffledNames.map((item) => {
              const isMatched = matchedPairs.includes(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => handleNameClick(item)}
                  disabled={isMatched}
                  className={`w-full p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 opacity-80 cursor-default'
                      : 'bg-white border-slate-200 hover:border-teal-500 hover:bg-teal-50/40 text-slate-800'
                  }`}
                >
                  <span className="font-bold text-sm text-slate-800">
                    "{item.localName}"
                  </span>

                  {isMatched ? (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" />
                      Đã ghép
                    </span>
                  ) : (
                    <Link2 className="w-4 h-4 text-slate-400 group-hover:text-teal-600" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Completion Banner */}
      {isAllMatched && (
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-2xl p-5 shadow-md flex items-center justify-between gap-4 animate-in fade-in zoom-in">
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8 text-amber-300 animate-bounce" />
            <div>
              <h3 className="text-base font-extrabold">Xuất Sắc! Bạn Đã Ghép Đúng Toàn Bộ 6 Quốc Gia</h3>
              <p className="text-xs text-white/90">
                Nhận thêm <strong>+40 Điểm Thám Hiểm</strong> vào tài khoản!
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-white/90 transition-colors shadow-xs"
          >
            Chơi Lại
          </button>
        </div>
      )}
    </div>
  );
};
