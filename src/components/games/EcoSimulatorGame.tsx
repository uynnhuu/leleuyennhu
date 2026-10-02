import React, { useState } from 'react';
import { SIMULATION_EVENTS } from '../../data/simulationEvents';
import { 
  Trophy, 
  RotateCcw, 
  Sparkles, 
  Droplets, 
  Wheat, 
  Leaf, 
  ChevronRight, 
  AlertCircle,
  Award,
  CheckCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface EcoSimulatorGameProps {
  onAddPoints: (pts: number) => void;
}

export const EcoSimulatorGame: React.FC<EcoSimulatorGameProps> = ({ onAddPoints }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [stats, setStats] = useState({
    agriculture: 50,
    waterSecurity: 50,
    ecology: 50
  });
  const [history, setHistory] = useState<{
    roundTitle: string;
    choiceText: string;
    feedback: string;
  }[]>([]);
  const [selectedChoiceFeedback, setSelectedChoiceFeedback] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  const event = SIMULATION_EVENTS[currentRound];

  const handleSelectChoice = (choiceIndex: number) => {
    const choice = event.choices[choiceIndex];

    const newAgri = Math.min(100, Math.max(5, stats.agriculture + choice.impact.agriculture));
    const newWater = Math.min(100, Math.max(5, stats.waterSecurity + choice.impact.waterSecurity));
    const newEco = Math.min(100, Math.max(5, stats.ecology + choice.impact.ecology));

    setStats({
      agriculture: newAgri,
      waterSecurity: newWater,
      ecology: newEco
    });

    setSelectedChoiceFeedback(choice.feedback);
    setHistory(prev => [
      ...prev,
      {
        roundTitle: event.title,
        choiceText: choice.text,
        feedback: choice.feedback
      }
    ]);
  };

  const handleNextRound = () => {
    setSelectedChoiceFeedback(null);
    if (currentRound + 1 < SIMULATION_EVENTS.length) {
      setCurrentRound(prev => prev + 1);
    } else {
      setIsGameOver(true);
      const totalScore = stats.agriculture + stats.waterSecurity + stats.ecology;
      onAddPoints(Math.round(totalScore / 3));
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentRound(0);
    setStats({ agriculture: 50, waterSecurity: 50, ecology: 50 });
    setHistory([]);
    setSelectedChoiceFeedback(null);
    setIsGameOver(false);
  };

  // Calculate rating title
  const averageScore = Math.round((stats.agriculture + stats.waterSecurity + stats.ecology) / 3);
  let rankBadge = 'Nhà Quản Trị Đang Học Hỏi';
  let rankDesc = 'Bạn cần cân bằng tốt hơn giữa phát triển kinh tế và bảo vệ nguồn tài nguyên tự nhiên.';
  if (averageScore >= 75) {
    rankBadge = 'Chiến Lược Gia "Thuận Thiên" Xuất Sắc';
    rankDesc = 'Tư duy quản trị vượt trội! Bạn đã áp dụng thành công triết lý thích ứng tự nhiên của Nghị quyết 120/NQ-CP.';
  } else if (averageScore >= 55) {
    rankBadge = 'Chuyên Viên Tài Nguyên Nước Bản Lĩnh';
    rankDesc = 'Kết quả khá tốt! Bạn đã vượt qua các đợt xâm nhập mặn và lũ lụt mà không gây tổn thất nghiêm trọng.';
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
            Mô Phỏng Thực Tế • Chuyên Đề Địa Lí 11
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-1">
            Chiến Lược Gia Cửu Long: Ứng Phó Hạn Mặn & Nguồn Nước
          </h2>
          <p className="text-xs text-slate-700 mt-0.5">
            Vào vai Giám đốc Điều phối Tài nguyên Nước ĐBSCL, đưa ra quyết định sống còn để cân bằng 3 chỉ số phát triển bền vững!
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Làm lại</span>
        </button>
      </div>

      {/* 3 Metrics Status Bar */}
      <div className="grid grid-cols-3 gap-3">
        {/* Nông nghiệp */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-amber-950 flex items-center gap-1">
              <Wheat className="w-3.5 h-3.5 text-amber-700" />
              🌾 Nông Nghiệp
            </span>
            <span className="font-extrabold text-amber-900">{stats.agriculture}%</span>
          </div>
          <div className="w-full h-2 bg-amber-200/60 rounded-full overflow-hidden">
            <div 
              style={{ width: `${stats.agriculture}%` }}
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* An ninh nước */}
        <div className="bg-sky-50/80 border border-sky-200 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-sky-950 flex items-center gap-1">
              <Droplets className="w-3.5 h-3.5 text-sky-700" />
              💧 An Ninh Nước
            </span>
            <span className="font-extrabold text-sky-900">{stats.waterSecurity}%</span>
          </div>
          <div className="w-full h-2 bg-sky-200/60 rounded-full overflow-hidden">
            <div 
              style={{ width: `${stats.waterSecurity}%` }}
              className="h-full bg-sky-600 rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Đa dạng sinh thái */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-3">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-emerald-950 flex items-center gap-1">
              <Leaf className="w-3.5 h-3.5 text-emerald-700" />
              🌿 Sinh Thái
            </span>
            <span className="font-extrabold text-emerald-900">{stats.ecology}%</span>
          </div>
          <div className="w-full h-2 bg-emerald-200/60 rounded-full overflow-hidden">
            <div 
              style={{ width: `${stats.ecology}%` }}
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
            />
          </div>
        </div>
      </div>

      {/* Main Simulation Gameplay Area */}
      {!isGameOver ? (
        <div className="space-y-4">
          {/* Round Marker */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">
              Tình Huống {currentRound + 1}/{SIMULATION_EVENTS.length}
            </span>
            <span className="px-2.5 py-0.5 rounded-full font-medium bg-slate-100 text-slate-700">
              {event.season}
            </span>
          </div>

          {/* Event Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5 space-y-2">
            <h3 className="text-base font-extrabold text-slate-900">
              {event.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Choices Options or Current Feedback */}
          {!selectedChoiceFeedback ? (
            <div className="space-y-2.5">
              <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                Chọn phương án chỉ đạo của bạn:
              </span>
              <div className="grid grid-cols-1 gap-2.5">
                {event.choices.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectChoice(idx)}
                    className="group text-left p-3.5 rounded-xl border border-slate-200 bg-white hover:border-sky-500 hover:bg-sky-50/40 transition-all shadow-2xs"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-slate-100 group-hover:bg-sky-600 group-hover:text-white flex items-center justify-center text-xs font-bold text-slate-700 shrink-0 transition-colors">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-sky-900">
                          {c.text}
                        </h4>
                        <p className="text-xs text-slate-700 mt-0.5">
                          {c.description}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Selected Choice Result & Explanation */
            <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4.5 space-y-3 animate-in fade-in">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-5 h-5 text-sky-700 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-sky-950">
                    Đánh Giá Kết Quả Quyết Định Của Bạn:
                  </h4>
                  <p className="text-xs sm:text-sm text-sky-900 mt-1 leading-relaxed">
                    {selectedChoiceFeedback}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextRound}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <span>{currentRound + 1 < SIMULATION_EVENTS.length ? 'Tiếp tục tình huống sau' : 'Xem kết quả chung cuộc'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Game Over / Final Evaluation Card */
        <div className="bg-gradient-to-br from-emerald-50 via-white to-sky-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-in fade-in zoom-in">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-800 shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest">
              Tổng Kết Nhiệm Kỳ Quản Lý
            </span>
            <h3 className="text-xl font-black text-slate-900 mt-1">
              Danh Hiệu: {rankBadge}
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto mt-2 leading-relaxed">
              {rankDesc}
            </p>
          </div>

          <div className="inline-flex items-center gap-4 bg-white px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
            <span>🌾 Nông nghiệp: {stats.agriculture}%</span>
            <span>💧 Nước ngọt: {stats.waterSecurity}%</span>
            <span>🌿 Sinh thái: {stats.ecology}%</span>
          </div>

          <div className="pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Chơi Lại Kịch Bản Khác
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
