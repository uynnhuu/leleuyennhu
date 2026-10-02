import React, { useState, useEffect } from 'react';
import { 
  VIETNAM_IMPACT_SECTIONS, 
  NINE_ESTUARIES 
} from '../data/mekongData';
import { 
  MEKONG_CASCADE_DATA, 
  CascadeStep 
} from '../data/hauGiangData';
import { markModuleCompleted } from '../data/progressManager';
import { 
  Wheat, 
  AlertTriangle, 
  ShieldCheck, 
  Waves, 
  Compass, 
  Gamepad2, 
  Info,
  Droplets,
  Calendar,
  CheckCircle2,
  School,
  Sparkles,
  MapPin,
  ArrowRight,
  ChevronDown,
  BookOpen,
  FileText
} from 'lucide-react';

export const VietnamConnection: React.FC<{
  onPlayGame: (gameId: 'estuary' | 'simulator' | 'quiz') => void;
}> = ({ onPlayGame }) => {
  const [selectedEstuary, setSelectedEstuary] = useState(NINE_ESTUARIES[0]);
  const [activeTab, setActiveTab] = useState<'cascade' | 'overview' | 'estuaries' | 'challenges' | 'thuanthien' | 'haugiang'>('cascade');
  const [activeCascadeStep, setActiveCascadeStep] = useState<'mekong' | 'delta' | 'haugiang'>('haugiang');

  useEffect(() => {
    markModuleCompleted('vietnamHauGiang');
  }, []);

  const cascadeData: CascadeStep = MEKONG_CASCADE_DATA[activeCascadeStep];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-sky-950 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Trọng tâm Chuyên đề Địa lí 11 - Sông Mê Công & Việt Nam
              </span>
              <h1 className="text-2xl sm:text-3xl font-black mt-2 tracking-tight">
                Sông Cửu Long & Mạch Sống Đồng Bằng Tây Nam Bộ
              </h1>
              <p className="text-emerald-100 text-xs sm:text-sm max-w-3xl mt-1.5 leading-relaxed">
                Khi chảy vào Việt Nam qua địa phận An Giang và Đồng Tháp, sông Mê Kông phân thành 
                <strong> Sông Tiền</strong> và <strong>Sông Hậu</strong>, kiến tạo nên đồng bằng châu thổ trù phú bậc nhất, 
                nuôi dưỡng hơn 20 triệu người dân Việt Nam.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onPlayGame('simulator')}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-transform hover:scale-105"
              >
                <Gamepad2 className="w-4 h-4" />
                <span>Thử Thách Điều Phối Nước</span>
              </button>
            </div>
          </div>

          {/* Sub Navigation */}
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-emerald-800/60">
            <button
              onClick={() => setActiveTab('cascade')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-black transition-all shadow-xs ${
                activeTab === 'cascade' ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300' : 'bg-emerald-800/70 text-amber-200 hover:bg-emerald-700/80 border border-amber-400/40'
              }`}
            >
              🌊 Chuỗi: Mê Kông ↓ ĐBSCL ↓ Hậu Giang 📍
            </button>
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'overview' ? 'bg-white text-emerald-950' : 'text-emerald-200 hover:bg-white/10'
              }`}
            >
              🌿 Vị Thế & Mùa Nước Nổi
            </button>
            <button
              onClick={() => setActiveTab('estuaries')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'estuaries' ? 'bg-white text-emerald-950' : 'text-emerald-200 hover:bg-white/10'
              }`}
            >
              🐉 Huyền Thoại 9 Cửa Sông (Cửu Long)
            </button>
            <button
              onClick={() => setActiveTab('challenges')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'challenges' ? 'bg-white text-emerald-950' : 'text-emerald-200 hover:bg-white/10'
              }`}
            >
              ⚠️ Nguy Cơ Xâm Nhập Mặn & Thiếu Phù Sa
            </button>
            <button
              onClick={() => setActiveTab('thuanthien')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                activeTab === 'thuanthien' ? 'bg-white text-emerald-950' : 'text-emerald-200 hover:bg-white/10'
              }`}
            >
              🛡️ Triết Lý "Thuận Thiên" (NQ 120)
            </button>
            <button
              onClick={() => setActiveTab('haugiang')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'haugiang' ? 'bg-white text-slate-950 shadow-xs' : 'text-emerald-200 hover:bg-white/10'
              }`}
            >
              🌾 Kênh Xáng Xà No & FPT Vị Thủy
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content 0: The 3-Tier Cascade: Sông Mê Kông ↓ ĐBSCL ↓ Hậu Giang */}
      {activeTab === 'cascade' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* 3 Step Interactive Stepper */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="text-center max-w-2xl mx-auto space-y-1">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-100 text-emerald-900 border border-emerald-300">
                CHUYÊN ĐỀ ĐỊA LÍ 11 • CHUỖI LIÊN HỆ THỰC TIỄN
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Sông Mê Kông ↓ Đồng Bằng Sông Cửu Long ↓ Tỉnh Hậu Giang
              </h2>
              <p className="text-xs text-slate-600">
                Nhấp chọn từng tầng để phân tích chi tiết vai trò nước, thách thức, giải pháp và số liệu chính thống.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              {/* Tier 1 */}
              <button
                onClick={() => setActiveCascadeStep('mekong')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  activeCascadeStep === 'mekong'
                    ? 'bg-sky-50 border-sky-500 shadow-md ring-2 ring-sky-400'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-sky-800">TẦNG 1: QUỐC TẾ</span>
                  <span className="text-xl">🌊</span>
                </div>
                <h3 className="font-black text-sm text-slate-900">Sông Mê Kông</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  Dòng sông Mẹ 4.763km kết nối 6 quốc gia và 70 triệu dân
                </p>
              </button>

              {/* Tier 2 */}
              <button
                onClick={() => setActiveCascadeStep('delta')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  activeCascadeStep === 'delta'
                    ? 'bg-emerald-50 border-emerald-500 shadow-md ring-2 ring-emerald-400'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-emerald-800">TẦNG 2: VÙNG CHÂU THỔ</span>
                  <span className="text-xl">🌾</span>
                </div>
                <h3 className="font-black text-sm text-slate-900">Đồng Bằng Sông Cửu Long</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  Châu thổ 40.000 km², vựa lúa, thủy sản và trái cây số 1 Việt Nam
                </p>
              </button>

              {/* Tier 3 */}
              <button
                onClick={() => setActiveCascadeStep('haugiang')}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  activeCascadeStep === 'haugiang'
                    ? 'bg-amber-50 border-amber-500 shadow-md ring-2 ring-amber-400'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-extrabold text-amber-900">TẦNG 3: ĐỊA PHƯƠNG</span>
                  <span className="text-xl">📍</span>
                </div>
                <h3 className="font-black text-sm text-slate-900">Tỉnh Hậu Giang</h3>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">
                  Kênh xáng Xà No, FPT Vị Thủy, ứng phó mặn kép và sạt lở
                </p>
              </button>
            </div>
          </div>

          {/* Active Tier Detailed Display */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{cascadeData.icon}</span>
                <div>
                  <span className="text-xs font-black text-emerald-700 tracking-wider uppercase block">
                    {cascadeData.badgeTitle}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    {cascadeData.name}
                  </h3>
                  <p className="text-xs text-slate-500">{cascadeData.subtitle}</p>
                </div>
              </div>

              <div className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200">
                Dữ liệu chính thống có trích dẫn nguồn
              </div>
            </div>

            {/* Overview */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
              {cascadeData.overview}
            </p>

            {/* Key Statistics Grid */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
                Số Liệu Then Chốt Chính Thống:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {cascadeData.keyStats.map((stat, i) => (
                  <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <span className="text-[11px] text-slate-500 block truncate">{stat.label}</span>
                    <strong className="text-sm sm:text-base font-black text-slate-900 block my-0.5">
                      {stat.value}
                    </strong>
                    {stat.note && (
                      <span className="text-[10px] text-slate-500 block truncate">{stat.note}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Roles of Water */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
                Vai Trò Của Dòng Nước & Sinh Thái:
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {cascadeData.waterRoles.map((role, i) => (
                  <div key={i} className="p-4 bg-sky-50/60 rounded-2xl border border-sky-100 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{role.icon}</span>
                      <h4 className="font-extrabold text-xs text-sky-950">{role.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{role.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Challenges & Issues */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
                Các Thách Thức Về Nguồn Nước (Hạn, Mặn, Sạt Lở, Phù Sa):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {cascadeData.challenges.map((c, i) => (
                  <div key={i} className="p-4 bg-rose-50/60 rounded-2xl border border-rose-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-base">{c.icon}</span>
                        <h4 className="font-extrabold text-xs sm:text-sm text-rose-950">{c.title}</h4>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-rose-200 text-rose-900 text-[10px] font-black">
                        {c.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Adaptation Solutions */}
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-slate-500 tracking-wider block">
                Giải Pháp Thích Ứng & Mô Hình "Thuận Thiên" (NQ 120):
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {cascadeData.adaptationSolutions.map((sol, i) => (
                  <div key={i} className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs sm:text-sm text-emerald-950">{sol.title}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-black">
                        {sol.type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">{sol.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Official Source Citations (Required by User Instructions) */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <h4 className="font-black text-xs uppercase tracking-wider text-amber-300">
                  Nguồn Dữ Liệu Chính Thống (Không Tự Bịa Số Liệu):
                </h4>
              </div>
              <ul className="text-xs text-slate-300 space-y-1 list-disc pl-4">
                {cascadeData.officialSourceCitations.map((source, i) => (
                  <li key={i}>{source}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 1: Overview & Mùa nước nổi */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {VIETNAM_IMPACT_SECTIONS.map((sec) => {
              return (
                <div 
                  key={sec.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-colors"
                >
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1.5 flex items-center gap-2">
                      {sec.title}
                    </h3>
                    <p className="text-xs text-sky-700 font-medium mb-3">
                      {sec.summary}
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700">
                      {sec.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Deep Dive: Mùa Nước Nổi miền Tây */}
          <div className="bg-gradient-to-br from-sky-50 via-white to-emerald-50 rounded-2xl border border-sky-200/80 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-sky-700" />
                <h3 className="font-extrabold text-slate-900 text-base">
                  Đặc Trưng Địa Lí: "Mùa Nước Nổi" Không Phải Là Thiên Tai
                </h3>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-200 text-sky-800">
                Tháng 9 - Tháng 11 Hàng Năm
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
              Khác với đồng bằng sông Hồng phải đắp hệ thống đê điều kiên cố hàng ngàn năm để chống lũ dữ, 
              đồng bằng sông Cửu Long có địa hình bằng phẳng và được "túi nước" Biển Hồ điều tiết nhịp nhàng. 
              Do đó, nước lũ dâng lên rất từ tốn (mỗi ngày chỉ vài cm), được người miền Tây đón nhận như một 
              <strong> mùa bội thu tôm cá và nguồn phù sa vô giá</strong>.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="font-bold text-emerald-900 block mb-1">🌾 Rửa Chua & Rửa Phèn</span>
                <p className="text-slate-600 leading-normal">
                  Nước lũ tràn vào vùng Đồng Tháp Mười và Tứ Giác Long Xuyên, hòa tan và cuốn trôi độc chất axit sulphate (phèn) ra biển, làm ngọt hóa đất đai.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="font-bold text-sky-900 block mb-1">🐟 Nguồn Lợi Cá Linh & Bông Điên Điển</span>
                <p className="text-slate-600 leading-normal">
                  Hàng triệu con cá linh non từ Biển Hồ theo dòng lũ tràn về, tạo sinh kế giăng câu, thả lưới và hình thành văn hóa ẩm thực Nam Bộ trứ danh.
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <span className="font-bold text-amber-900 block mb-1">🛶 Văn Hóa Chợ Nổi Độc Đáo</span>
                <p className="text-slate-600 leading-normal">
                  Chợ nổi Cái Răng, Phong Điền, Ngã Năm... với "cây bẹo" treo sản vật đặc trưng, thể hiện nếp sống gắn liền với sông nước của người dân Nam Bộ.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 2: 9 Cửa Sông Cửu Long */}
      {activeTab === 'estuaries' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                  <Waves className="w-5 h-5 text-sky-600" />
                  Huyền Thoại 9 Cửa Sông (Cửu Long) & Sự Thật Địa Lí
                </h2>
                <p className="text-xs text-slate-700 mt-1">
                  Sông Tiền có 6 cửa, sông Hậu có 3 cửa đổ ra Biển Đông. Hiện nay trên thực tế còn bao nhiêu cửa?
                </p>
              </div>

              <button
                onClick={() => onPlayGame('estuary')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs transition-colors"
              >
                <Gamepad2 className="w-3.5 h-3.5" />
                <span>Chơi Game Xếp 9 Cửa Sông</span>
              </button>
            </div>

            {/* Geographical Reality Card */}
            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 mb-4 flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <span className="font-bold">Sự thật Địa lí quan trọng cho học sinh THPT:</span>
                <p className="mt-0.5 text-amber-800">
                  Tuy dân gian gọi là "Cửu Long" (9 rồng), nhưng ngày nay chỉ còn <strong>7 đến 8 cửa lưu thông tự nhiên ra biển</strong>. 
                  Lý do: <strong>Cửa Bát Xắc</strong> (sông Hậu) đã bị phù sa bồi đắp biến thành cồn bãi đất liền tại Sóc Trăng; 
                  còn <strong>Cửa Ba Lai</strong> (sông Tiền) đã được xây cống đập ngăn mặn kiên cố vào năm 2002.
                </p>
              </div>
            </div>

            {/* Grid of 9 Estuaries */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {NINE_ESTUARIES.map((est) => {
                const isSelected = selectedEstuary.id === est.id;
                return (
                  <button
                    key={est.id}
                    onClick={() => setSelectedEstuary(est)}
                    className={`text-left p-3.5 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-sky-50 border-sky-500 ring-2 ring-sky-300 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-extrabold text-sm text-slate-900">
                        {est.order}. {est.name}
                      </span>
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        est.riverBranch === 'Tiền' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-teal-100 text-teal-800'
                      }`}>
                        Sông {est.riverBranch}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-700 flex items-center justify-between mb-1">
                      <span>Tỉnh: {est.province}</span>
                      <span className={`font-semibold ${
                        est.status === 'dammed' ? 'text-amber-700' : est.status === 'silted' ? 'text-red-700' : 'text-emerald-700'
                      }`}>
                        {est.status === 'dammed' ? '🔒 Đã đắp đập' : est.status === 'silted' ? '⚠️ Đã bồi lấp' : '🌊 Đang hoạt động'}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                      {est.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Estuary Detailed View */}
          {selectedEstuary && (
            <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4.5">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h4 className="text-base font-extrabold text-sky-950">
                  Chi Tiết: {selectedEstuary.name} (Cửa Sông Số {selectedEstuary.order})
                </h4>
                <span className="text-xs font-semibold px-2.5 py-1 bg-white rounded-lg border border-sky-200 text-sky-800">
                  Thuộc Nhánh: Sông {selectedEstuary.riverBranch} • Tỉnh {selectedEstuary.province}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-2">
                {selectedEstuary.description}
              </p>
              <div className="bg-white/80 rounded-xl p-3 border border-sky-100 text-xs text-slate-700">
                <span className="font-bold text-sky-900">Ý nghĩa lịch sử & hiện tại: </span>
                {selectedEstuary.historicalNote}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab Content 3: Challenges (Xâm nhập mặn & Đập thủy điện) */}
      {activeTab === 'challenges' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              Thách Thức An Ninh Nguồn Nước ĐBSCL (Chuyên đề Địa lí 11)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50/70 border border-red-200 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-red-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-600" />
                  1. Giảm sút phù sa & Sạt lở bờ sông
                </h3>
                <p className="text-xs text-red-950 leading-relaxed">
                  Trước đây, sông Mê Kông mang lại khoảng 160 triệu tấn phù sa/năm cho ĐBSCL. Hiện nay, chuỗi đập thủy điện bậc thang ở thượng lưu đã giữ lại hơn 70% lượng bùn cát mịn. 
                  Hiện tượng "nước đói" (nước chảy siết nhưng thiếu phù sa bù đắp) gây sạt lở dữ dội hàng ngàn điểm tại An Giang, Đồng Tháp, Cần Thơ, Vĩnh Long và xói lở bờ biển Cà Mau.
                </p>
              </div>

              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-600" />
                  2. Xâm nhập mặn khốc liệt mùa khô
                </h3>
                <p className="text-xs text-amber-950 leading-relaxed">
                  Vào các năm El Nino (2016, 2020), dòng chảy nước ngọt từ thượng nguồn suy kiệt trùng thời điểm triều cường biển Đông. 
                  Ranh mặn 4‰ đã lấn sâu từ 70 - 100km vào các nhánh sông Tiền và sông Hậu, làm tê liệt nhà máy cấp nước sạch và làm thiệt hại hàng chục ngàn héc-ta sầu riêng, chôm chôm, lúa hè thu.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-slate-600" />
                  3. Sụt lún đất do khai thác nước ngầm
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Do thiếu nước mặt ngọt trong mùa khô, người dân và doanh nghiệp khoan giếng ngầm tràn lan. 
                  Tốc độ sụt lún trung bình từ 1 - 3 cm/năm, nhanh hơn nhiều so với tốc độ nước biển dâng do biến đổi khí hậu (khoảng 3 - 5 mm/năm).
                </p>
              </div>

              <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-teal-900 mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-teal-600" />
                  4. Suy giảm đa dạng sinh học thủy sản
                </h3>
                <p className="text-xs text-teal-950 leading-relaxed">
                  Các loài cá di cư sinh sản như cá tra dầu, cá hô, cá bông lau... bị chặn đường bơi do đập thủy điện Xayaburi, Don Sahong. 
                  Lượng cá linh non trong mùa nước nổi giảm sút đáng kể, ảnh hưởng nặng nề đến sinh kế của hàng trăm ngàn hộ gia đình nghèo.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 4: Thuan Thien (Nghị Quyết 120) */}
      {activeTab === 'thuanthien' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <h2 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              Nghị Quyết 120/NQ-CP: Tầm Nhìn Chiến Lược "Thuận Thiên"
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Nghị quyết 120 được Chính phủ ban hành năm 2017 là một bước ngoặt tư duy phát triển mang tính lịch sử: 
              <strong> Chuyển từ tư duy "chống lại thiên tai" sang chủ động "sống chung và thích ứng linh hoạt theo quy luật tự nhiên"</strong>, 
              coi nước mặn, nước lợ và nước ngọt đều là tài nguyên kinh tế quý giá.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                <span className="text-xs font-bold text-emerald-900 block mb-1">1. Vùng Thượng Nguồn (Ngọt quanh năm)</span>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  An Giang, Đồng Tháp, Long An: Tập trung sản xuất lúa chất lượng cao, lúa phát thải thấp (đề án 1 triệu ha lúa chất lượng cao), cây ăn trái và đón lũ tích trữ nước tự nhiên.
                </p>
              </div>

              <div className="bg-sky-50 rounded-xl p-4 border border-sky-200">
                <span className="text-xs font-bold text-sky-900 block mb-1">2. Vùng Trung Tâm (Ngọt - Lợ chuyển tiếp)</span>
                <p className="text-xs text-sky-800 leading-relaxed">
                  Tiền Giang, Bến Tre, Vĩnh Long, Cần Thơ: Vùng cây ăn trái đặc sản lớn nhất cả nước kết hợp công nghệ tưới tiết kiệm, hồ chứa nước phân tán phục vụ sinh hoạt.
                </p>
              </div>

              <div className="bg-teal-50 rounded-xl p-4 border border-teal-200">
                <span className="text-xs font-bold text-teal-900 block mb-1">3. Vùng Ven Biển (Lợ - Mặn sinh thái)</span>
                <p className="text-xs text-teal-800 leading-relaxed">
                  Bạc Liêu, Sóc Trăng, Cà Mau, Kiên Giang: Áp dụng mô hình thông minh "Lúa - Tôm" (mùa mưa lúa, mùa khô tôm), nuôi tôm dưới tán rừng ngập mặn đạt chứng chỉ quốc tế.
                </p>
              </div>
            </div>

            {/* Huge Infrastructure: Cai Lon - Cai Be */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs text-slate-700">
              <span className="font-bold text-slate-900 block text-sm mb-1">
                Công trình kiểm soát nguồn nước Cái Lớn - Cái Bé:
              </span>
              <p className="leading-relaxed">
                Hệ thống cống thủy lợi lớn nhất Việt Nam khánh thành tại Kiên Giang, giúp kiểm soát mặn ngọt chủ động cho hàng trăm ngàn ha đất nông nghiệp, 
                đảm bảo linh hoạt mở cửa đón nước mặn khi cần nuôi tôm và đóng cống giữ ngọt cho cây lúa.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content 5: Practical Connection - Tỉnh Hậu Giang & Kênh Xáng Xà No */}
      {activeTab === 'haugiang' && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-black uppercase inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-700" />
                  Yêu Cầu Cần Đạt 5 • Liên Hệ Thực Tiễn Địa Phương
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                  Tỉnh Hậu Giang, Tuyến Kênh Xáng Xà No & Trường FPT Hậu Giang
                </h2>
                <p className="text-xs text-slate-600 max-w-3xl">
                  Minh chứng thực tiễn sinh động nhất về vai trò dẫn ngọt từ sông Hậu, bài toán thích ứng hạn mặn 2 hướng và khát vọng công nghệ xanh tại miền Tây.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 flex items-center gap-1">
                  <School className="w-3.5 h-3.5 text-emerald-600" />
                  TH, THCS, THPT FPT Hậu Giang
                </span>
              </div>
            </div>

            {/* 4 Practical Pillar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Card 1: Kênh xáng Xà No */}
              <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-sky-600 text-white uppercase">
                    Thủy Nông Lịch Sử
                  </span>
                  <span className="text-xs font-bold text-sky-800">1901 – 1903</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-sky-950">
                  1. Kênh Xáng Xà No – "Con Đường Lúa Gạo Miền Tây"
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Được đào từ năm 1901 đến 1903 bằng xáng cạp cơ giới hiện đại bậc nhất Đông Nam Á thời bấy giờ, kênh dài khoảng 40 km, rộng 60 m, nối ngã ba Vàm Xáng (sông Cần Thơ, chi lưu sông Hậu) xuyên qua Châu Thành A, Vị Thủy, Vị Thanh đổ vào sông Cái Lớn ra biển Tây.
                </p>
                <div className="bg-white/80 p-3 rounded-xl border border-sky-100 text-xs text-sky-900">
                  <strong>Ý nghĩa địa lí:</strong> Trục dẫn dòng nước ngọt trù phú của sông Hậu thau chua rửa phèn cho hàng trăm ngàn héc-ta đất hoang hóa U Minh, biến Hậu Giang thành vựa lúa nức tiếng và tuyến xuất khẩu gạo huyết mạch.
                </div>
              </div>

              {/* Card 2: Nguy cơ mặn 2 hướng */}
              <div className="bg-rose-50/70 border border-rose-200 rounded-2xl p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-rose-600 text-white uppercase">
                    Thách Thức Đặc Thù
                  </span>
                  <span className="text-xs font-bold text-rose-800">Xâm Nhập Mặn Kép</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-rose-950">
                  2. Thách Thức Xâm Nhập Mặn Từ Cả 2 Hướng Đông – Tây
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Khác với các tỉnh đầu nguồn hay ven biển thuần túy, Hậu Giang nằm ở thế "gọng kìm" kẹp giữa hai biển:
                  mặn từ <strong>Biển Đông</strong> đẩy theo sông Hậu qua cửa Định An, Trần Đề; đồng thời mặn từ <strong>Biển Tây</strong> theo sông Cái Lớn xâm nhập qua kênh Xà No.
                </p>
                <div className="bg-white/80 p-3 rounded-xl border border-rose-100 text-xs text-rose-950">
                  <strong>Thiệt hại thực tế:</strong> Vào các đợt hạn mặn khốc liệt (2016, 2020), nước mặn có lúc đe dọa các vùng chuyên canh đặc sản khóm Cầu Đúc, mãng cầu xiêm Thuận Hòa, quýt đường Long Trị và lúa chất lượng cao Vị Thủy.
                </div>
              </div>

              {/* Card 3: Thích ứng Thuận thiên & 1 triệu ha lúa */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-emerald-600 text-white uppercase">
                    Mô Hình Thích Ứng
                  </span>
                  <span className="text-xs font-bold text-emerald-800">Nghị Quyết 120</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-emerald-950">
                  3. Nông Nghiệp Xanh & Đề Án 1 Triệu Héc-Ta Lúa Chất Lượng Cao
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Hậu Giang là một trong những tỉnh tiên phong được Chính phủ lựa chọn phát động Đề án 1 triệu ha chuyên canh lúa chất lượng cao, phát thải thấp gắn với tăng trưởng xanh vùng ĐBSCL đến năm 2030.
                </p>
                <div className="bg-white/80 p-3 rounded-xl border border-emerald-100 text-xs text-emerald-950">
                  <strong>Giải pháp công trình & phi công trình:</strong> Vận hành nhịp nhàng hệ thống cống đập ngăn mặn tạm thời vụ, tăng cường trữ nước phân tán mương vườn, xen canh lúa - màu chịu mặn, phát triển du lịch tàu thuyền sinh thái trên kênh Xà No.
                </div>
              </div>

              {/* Card 4: FPT Hậu Giang (61C Vị Thủy) */}
              <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-amber-500 text-slate-950 uppercase">
                    Giáo Dục & Trí Tuệ Nhân Tạo
                  </span>
                  <span className="text-xs font-bold text-amber-900">61C Vị Thủy</span>
                </div>
                <h3 className="text-sm sm:text-base font-black text-amber-950">
                  4. Dấu Ấn Trường TH, THCS, THPT FPT Hậu Giang
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Tọa lạc tại địa chỉ <strong>61C ấp 6, xã Vị Thủy, TP.Cần Thơ (trục đường 61C Hậu Giang - Cần Thơ)</strong> ngay cạnh dòng kênh xáng Xà No lịch sử.
                </p>
                <div className="bg-white/80 p-3 rounded-xl border border-amber-100 text-xs text-amber-950">
                  <strong>Ứng dụng công nghệ:</strong> Nhà trường tích hợp nền tảng số, trợ lý AI Kiến Sáng, bản đồ tương tác 3D để học sinh tiếp thu Chuyên đề Địa lí 11 sinh động, khơi dậy niềm tự hào đất phù sa và hành động bảo vệ nguồn nước Mê Kông!
                </div>
              </div>
            </div>

            {/* Quick action buttons */}
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-800">Thực hành học tập:</span>
                <span className="text-slate-600">Thử thách ngay khả năng điều phối nguồn nước ngọt - mặn qua mini-game mô phỏng!</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPlayGame('simulator')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Gamepad2 className="w-3.5 h-3.5" />
                  <span>Vào Game Điều Phối Nước ĐBSCL</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
