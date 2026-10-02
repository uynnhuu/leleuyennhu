import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/quizData';
import { QuizQuestion } from '../../types/mekong';
import { 
  Trophy, 
  RotateCcw, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Award,
  Sparkles,
  Timer
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface GeoQuizGameProps {
  onAddPoints: (pts: number) => void;
}

export const GeoQuizGame: React.FC<GeoQuizGameProps> = ({ onAddPoints }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [showCertificate, setShowCertificate] = useState(false);

  const question: QuizQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleConfirmAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === question.correctAnswer) {
      setScore(s => s + 10);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(i => i + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsQuizCompleted(true);
      const earned = Math.round(score * 1.5);
      onAddPoints(earned);
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsQuizCompleted(false);
    setShowCertificate(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-sky-100 text-sky-800">
            Trắc Nghiệm Chuẩn Ma Trận • Địa Lí 11
          </span>
          <h2 className="text-lg font-black text-slate-900 mt-1">
            Đấu Trí Địa Lí 11: Vượt Sóng Cửu Long
          </h2>
          <p className="text-xs text-slate-700 mt-0.5">
            10 câu hỏi ôn luyện chuyên sâu về lưu vực sông Mê Công và mối liên hệ với ĐBSCL Việt Nam.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <span className="text-xs text-slate-600 block leading-none">Điểm hiện tại</span>
            <span className="text-base font-extrabold text-sky-700 leading-none">{score} / 100</span>
          </div>
          <button
            onClick={handleRestart}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Làm lại</span>
          </button>
        </div>
      </div>

      {!isQuizCompleted ? (
        <div className="space-y-4">
          {/* Progress Bar & Topic Pill */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800">
              Câu hỏi {currentIdx + 1} / {QUIZ_QUESTIONS.length}
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium">
                {question.curriculumTopic}
              </span>
              <span className={`px-2 py-0.5 rounded-md font-semibold text-[11px] ${
                question.difficulty === 'Nhận biết'
                  ? 'bg-emerald-100 text-emerald-800'
                  : question.difficulty === 'Thông hiểu'
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {question.difficulty}
              </span>
            </div>
          </div>

          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              className="h-full bg-sky-600 rounded-full transition-all duration-300"
            />
          </div>

          {/* Question Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4.5">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-900 leading-snug">
              {question.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 gap-2.5">
            {question.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              let btnStyle = 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50/30 text-slate-800';

              if (isSubmitted) {
                if (idx === question.correctAnswer) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-300';
                } else if (isSelected && idx !== question.correctAnswer) {
                  btnStyle = 'border-red-500 bg-red-50 text-red-950 font-medium';
                } else {
                  btnStyle = 'border-slate-200 bg-slate-50 text-slate-400 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'border-sky-600 bg-sky-50 text-sky-950 font-bold ring-2 ring-sky-300 shadow-xs';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between text-xs sm:text-sm ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {isSubmitted && idx === question.correctAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && idx !== question.correctAnswer && (
                    <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action or Explanation */}
          {!isSubmitted ? (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleConfirmAnswer}
                disabled={selectedOption === null}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  selectedOption !== null
                    ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Xác Nhận Đáp Án
              </button>
            </div>
          ) : (
            <div className="bg-sky-50/80 border border-sky-200 rounded-2xl p-4.5 space-y-3 animate-in fade-in">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5 mb-1">
                  <HelpCircle className="w-3.5 h-3.5 text-sky-700" />
                  Giải thích kiến thức Địa lí 11:
                </h4>
                <p className="text-xs sm:text-sm text-sky-950 leading-relaxed">
                  {question.explanation}
                </p>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNextQuestion}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <span>{currentIdx + 1 < QUIZ_QUESTIONS.length ? 'Câu tiếp theo' : 'Xem kết quả tổng kết'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Quiz Final Summary & Certificate Generator */
        <div className="space-y-5 animate-in fade-in zoom-in">
          <div className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 border border-sky-200 rounded-2xl p-6 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 shadow-md">
              <Trophy className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-black text-slate-900">
              Hoàn Thành Đấu Trí Địa Lí 11!
            </h3>
            <p className="text-xs sm:text-sm text-slate-700">
              Bạn đạt được: <strong className="text-sky-700 text-base">{score} / 100 Điểm</strong> ({score / 10} câu đúng)
            </p>

            <div className="max-w-md mx-auto pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-1.5 text-left">
                Nhập họ và tên học sinh để nhận Giấy Chứng Nhận:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Ví dụ: Nguyễn Văn An - Lớp 11A1"
                  className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-sky-500 bg-white"
                />
                <button
                  onClick={() => setShowCertificate(true)}
                  disabled={!studentName.trim()}
                  className={`px-4 py-2 rounded-xl font-bold text-xs transition-colors ${
                    studentName.trim()
                      ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-xs'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  Cấp Chứng Nhận
                </button>
              </div>
            </div>
          </div>

          {/* Certificate Display */}
          {showCertificate && studentName.trim() && (
            <div className="relative bg-gradient-to-r from-amber-50 via-white to-amber-50 border-4 border-amber-300 rounded-2xl p-8 text-center space-y-4 shadow-lg animate-in fade-in">
              <div className="flex justify-center items-center gap-2 text-amber-700">
                <Award className="w-8 h-8 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                  CHỨNG NHẬN ĐẠT CHUẨN KIẾN THỨC ĐỊA LÍ 11
                </span>
              </div>

              <h4 className="text-2xl font-black text-slate-900 font-serif">
                ĐẠI SỨ SÔNG MÊ CÔNG & ĐỒNG BẰNG CỬU LONG
              </h4>

              <p className="text-xs text-slate-600">Trao tặng cho học sinh:</p>
              <p className="text-xl font-black text-sky-800 underline decoration-amber-400 decoration-2">
                {studentName}
              </p>

              <p className="text-xs text-slate-700 max-w-lg mx-auto leading-relaxed">
                Đã hoàn thành xuất sắc chuyên đề Địa lí 11: Tìm hiểu đặc điểm dòng chảy sông Mê Công, 
                phân tích mối liên hệ sâu sắc với kinh tế - sinh thái Đồng bằng sông Cửu Long và định hướng phát triển "Thuận thiên" bền vững.
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-amber-200/80 text-[11px] text-slate-700">
                <span>Điểm kiểm tra: <strong>{score}/100</strong></span>
                <span>Chương trình GDPT 2018 - Địa lí 11</span>
                <span>Ngày cấp: {new Date().toLocaleDateString('vi-VN')}</span>
              </div>
            </div>
          )}

          <div className="text-center pt-2">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs transition-colors"
            >
              Chơi Lại Trắc Nghiệm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
