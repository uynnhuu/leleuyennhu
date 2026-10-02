import React, { useState } from 'react';
import { MASTER_PROMPTS } from '../data/promptGuide';
import { 
  Copy, 
  Check, 
  BookOpen, 
  Sparkles, 
  GraduationCap, 
  Clock, 
  Layers, 
  Terminal,
  FileText,
  Lightbulb
} from 'lucide-react';

export const PromptLessonGuide: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedPromptTab, setSelectedPromptTab] = useState(0);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const activePrompt = MASTER_PROMPTS[selectedPromptTab];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-violet-900 via-indigo-900 to-sky-950 text-white rounded-2xl p-6 shadow-md">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-violet-500/30 text-violet-200 border border-violet-400/30">
              Công Cụ Sư Phạm Số • Google AI Studio
            </span>
            <h1 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
              Bộ Prompt Chuẩn & Kế Hoạch Bài Dạy Địa Lí 11
            </h1>
            <p className="text-indigo-200 text-xs sm:text-sm max-w-2xl mt-1 leading-relaxed">
              Dành cho giáo viên và học sinh: Copy ngay prompt tối ưu để tái lập hoặc mở rộng webapp trên Google AI Studio, 
              kèm kịch bản dạy học tương tác 45 phút chuẩn GDPT 2018.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleCopy(activePrompt.content, activePrompt.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-transform hover:scale-105"
            >
              {copiedId === activePrompt.id ? (
                <>
                  <Check className="w-4 h-4 text-emerald-800" />
                  <span>Đã Sao Chép Prompt!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Sao Chép Prompt Này</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 mt-5 pt-4 border-t border-indigo-800/60 overflow-x-auto">
          {MASTER_PROMPTS.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedPromptTab(idx)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedPromptTab === idx
                  ? 'bg-white text-indigo-950 shadow-xs'
                  : 'text-indigo-200 hover:bg-white/10'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Prompt Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-indigo-600" />
              {activePrompt.title}
            </h2>
            <p className="text-xs text-slate-700 mt-0.5">
              Đối tượng sử dụng: <strong>{activePrompt.targetAudience}</strong> • {activePrompt.description}
            </p>
          </div>

          <button
            onClick={() => handleCopy(activePrompt.content, activePrompt.id)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-colors"
          >
            {copiedId === activePrompt.id ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Đã chép</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Prompt</span>
              </>
            )}
          </button>
        </div>

        {/* Prompt Content Terminal/Textarea style */}
        <div className="relative">
          <pre className="p-4 rounded-xl bg-slate-900 text-slate-100 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-96 overflow-y-auto border border-slate-800 select-all">
            {activePrompt.content}
          </pre>
        </div>
      </div>

      {/* Lesson Plan Structure (Giáo án 45 phút chuẩn GDPT 2018) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-indigo-600" />
          <h2 className="font-extrabold text-slate-900 text-base">
            Kịch Bản Tổ Chức Tiết Học Tương Tác 45 Phút (Giáo Án Môn Địa Lí 11)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Phase 1 */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-sky-950 text-xs">1. KHỞI ĐỘNG</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-sky-200 text-sky-900">5 Phút</span>
            </div>
            <p className="text-xs text-sky-900 leading-relaxed">
              Cho cả lớp chơi nhanh mini-game <strong>"Nối 6 Quốc Gia Ven Sông Mê Kông"</strong>. 
              Giáo viên chiếu màn hình, gọi ngẫu nhiên học sinh lên bảng ghép tên dòng sông tại từng nước.
            </p>
          </div>

          {/* Phase 2 */}
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-indigo-950 text-xs">2. HÌNH THÀNH KIẾN THỨC</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900">20 Phút</span>
            </div>
            <p className="text-xs text-indigo-900 leading-relaxed">
              Học sinh hoạt động nhóm khám phá <strong>Bản Đồ Lưu Vực</strong> & tab <strong>Liên Hệ Việt Nam</strong>: 
              Phân tích vai trò Biển Hồ, chuỗi đập thủy điện bậc thang và sự thay đổi của 9 cửa sông Cửu Long.
            </p>
          </div>

          {/* Phase 3 */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-emerald-950 text-xs">3. LUYỆN TẬP THỰC TẾ</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">15 Phút</span>
            </div>
            <p className="text-xs text-emerald-900 leading-relaxed">
              Thi đấu mô phỏng <strong>"Chiến Lược Gia Cửu Long"</strong>: 
              Các nhóm đóng vai nhà quản lý đưa ra quyết định ứng phó hạn mặn, ngập lũ; so sánh xem nhóm nào đạt chỉ số Sinh Thái cao nhất.
            </p>
          </div>

          {/* Phase 4 */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-amber-950 text-xs">4. VẬN DỤNG & ĐÁNH GIÁ</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">5 Phút</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              Học sinh hoàn thành <strong>Đấu Trí Địa Lí 11</strong>, 
              tải về hoặc in Giấy chứng nhận "Đại Sứ Sông Mê Công" để cộng điểm hoạt động học tập môn Địa lí.
            </p>
          </div>
        </div>

        {/* Competencies developed */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-700 flex items-start gap-2.5">
          <Lightbulb className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <span className="font-bold text-slate-900">Yêu cầu cần đạt phát triển phẩm chất & năng lực (GDPT 2018):</span>
            <ul className="list-disc list-inside mt-1 space-y-0.5 text-slate-600">
              <li><strong>Năng lực nhận thức khoa học địa lí:</strong> Trình bày được đặc điểm lưu vực và ý nghĩa kinh tế - sinh thái của sông Mê Công.</li>
              <li><strong>Năng lực tìm hiểu địa lí:</strong> Sử dụng thành thạo bản đồ số tương tác, số liệu thống kê và biểu đồ trắc diện.</li>
              <li><strong>Phẩm chất yêu nước & trách nhiệm:</strong> Nâng cao ý thức bảo vệ an ninh nguồn nước, tiết kiệm nước ngọt và thích ứng biến đổi khí hậu tại ĐBSCL.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
