import React, { useState, useMemo } from 'react';
import { 
  MEKONG_KEY_STATS, 
  BASIN_SHARE_DATA, 
  MRC_FIVE_PROCEDURES, 
  TEXTBOOK_SECTIONS, 
  TEXTBOOK_REVIEW_QUESTIONS,
  CORE_COMPETENCIES_5_STANDARDS,
  CoreCompetencyStandard
} from '../data/mekongKnowledgeData';
import { 
  BookOpen, 
  Search, 
  CheckCircle2, 
  Layers, 
  MapPin, 
  TrendingUp, 
  Ruler, 
  Waves, 
  Fish, 
  Users, 
  ShieldCheck, 
  Database, 
  Gauge, 
  FileCheck, 
  Droplet, 
  HelpCircle, 
  Sparkles, 
  Printer, 
  School, 
  ExternalLink, 
  ArrowRight, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Award,
  Compass,
  AlertCircle,
  Globe,
  Target,
  Volume2,
  Check,
  GraduationCap
} from 'lucide-react';

interface MekongKnowledgeHubProps {
  onOpenAssistantHelp?: (prompt?: string) => void;
  onNavigateTab?: (tab: any) => void;
}

export const MekongKnowledgeHub: React.FC<MekongKnowledgeHubProps> = ({
  onOpenAssistantHelp,
  onNavigateTab
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'standards' | 'all' | 'sec-1' | 'sec-2' | 'sec-3' | 'sec-4' | 'questions'>('standards');
  const [selectedCountry, setSelectedCountry] = useState<string | null>('Việt Nam');
  const [selectedStandardId, setSelectedStandardId] = useState<string>('comp-1');
  const [expandedStandards, setExpandedStandards] = useState<{ [key: string]: boolean }>({
    'comp-1': true,
    'comp-2': true,
    'comp-3': true,
    'comp-4': true,
    'comp-5': true
  });
  const [expandedQuestions, setExpandedQuestions] = useState<{ [key: string]: boolean }>({
    'q-1': true
  });
  const [expandedSubsections, setExpandedSubsections] = useState<{ [key: string]: boolean }>({
    'sec-1-0': true,
    'sec-2-2': true, // 5 procedures
    'sec-3-1': true  // Resolution 120
  });

  const toggleStandard = (id: string) => {
    setExpandedStandards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleQuestion = (id: string) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleSubsection = (key: string) => {
    setExpandedSubsections(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      if (activeCategory === 'all') return TEXTBOOK_SECTIONS;
      if (activeCategory === 'questions') return [];
      return TEXTBOOK_SECTIONS.filter(s => s.id === activeCategory);
    }

    const q = searchQuery.toLowerCase();
    return TEXTBOOK_SECTIONS.map(sec => {
      const matchInSec = sec.title.toLowerCase().includes(q) || sec.summary.toLowerCase().includes(q);
      const filteredSubs = sec.subsections.filter(sub => 
        sub.subtitle.toLowerCase().includes(q) || 
        sub.content.some(c => c.toLowerCase().includes(q)) ||
        (sub.highlightNotes && sub.highlightNotes.some(n => n.toLowerCase().includes(q)))
      );

      if (matchInSec || filteredSubs.length > 0) {
        return {
          ...sec,
          subsections: filteredSubs.length > 0 ? filteredSubs : sec.subsections
        };
      }
      return null;
    }).filter(Boolean) as typeof TEXTBOOK_SECTIONS;
  }, [searchQuery, activeCategory]);

  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return TEXTBOOK_REVIEW_QUESTIONS;
    const q = searchQuery.toLowerCase();
    return TEXTBOOK_REVIEW_QUESTIONS.filter(quest => 
      quest.question.toLowerCase().includes(q) || 
      quest.standardAnswer.toLowerCase().includes(q) ||
      quest.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  const filteredStandards = useMemo(() => {
    if (!searchQuery.trim()) return CORE_COMPETENCIES_5_STANDARDS;
    const q = searchQuery.toLowerCase();
    return CORE_COMPETENCIES_5_STANDARDS.filter(s => 
      s.title.toLowerCase().includes(q) ||
      s.curriculumGoal.toLowerCase().includes(q) ||
      s.summary.toLowerCase().includes(q) ||
      s.bulletPoints.some(b => b.heading.toLowerCase().includes(q) || b.details.toLowerCase().includes(q)) ||
      s.reviewQuestion.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const activeStandard = useMemo(() => {
    return CORE_COMPETENCIES_5_STANDARDS.find(s => s.id === selectedStandardId) || CORE_COMPETENCIES_5_STANDARDS[0];
  }, [selectedStandardId]);

  const activeCountryData = useMemo(() => {
    return BASIN_SHARE_DATA.find(c => c.country === selectedCountry) || BASIN_SHARE_DATA[4];
  }, [selectedCountry]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Textbook Authority Header Banner */}
      <div className="bg-gradient-to-br from-sky-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-9 shadow-xl border border-sky-700/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-md">
              <BookOpen className="w-3.5 h-3.5" />
              CHUYÊN ĐỀ HỌC TẬP ĐỊA LÍ 11
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-sky-900/80 text-sky-200 border border-sky-700/50">
              Bộ Sách: Kết Nối Tri Thức Với Cuộc Sống (NXB Giáo Dục Việt Nam)
            </span>
            <span className="text-xs text-slate-300 flex items-center gap-1">
              <School className="w-3.5 h-3.5 text-amber-400" />
              TH, THCS, THPT FPT Hậu Giang (61C Vị Thủy)
            </span>
          </div>

          <div className="space-y-2 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Cẩm Nang Tri Thức Sông Mê Công & Uỷ Hội MRC
            </h1>
            <p className="text-xs sm:text-sm text-sky-100/90 leading-relaxed">
              Toàn bộ dữ liệu số học, tỉ lệ lưu vực, cơ chế pháp lí 5 thủ tục kỹ thuật và vai trò chiến lược của Việt Nam 
              được đối chiếu chuẩn xác 100% theo nội dung <strong>Chuyên đề 11.1 (Trang 5 – 19)</strong> SGK Địa lí 11.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 shadow-xs cursor-pointer"
            >
              <Printer className="w-4 h-4 text-sky-300" />
              <span>In Bản Tóm Tắt Ôn Tập</span>
            </button>

            {onOpenAssistantHelp && (
              <button
                onClick={() => onOpenAssistantHelp('Giải đáp thắc mắc về số liệu SGK Địa lí 11 sông Mê Kông')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer hover:scale-105"
              >
                <Sparkles className="w-4 h-4" />
                <span>Hỏi Chatbot Kiến Sáng Về Số Liệu</span>
              </button>
            )}

            {onNavigateTab && (
              <>
                <button
                  onClick={() => onNavigateTab('globe')}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-slate-950 text-xs font-black transition-all shadow-md cursor-pointer hover:scale-105"
                >
                  <Globe className="w-4 h-4 animate-spin" style={{ animationDuration: '16s' }} />
                  <span>Quả Địa Cầu 3D (6 Nước)</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 6 Key Statistics Bar (Số Liệu Vàng SGK Trang 5-14) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {MEKONG_KEY_STATS.map((stat, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-sky-300 transition-all group"
          >
            <div>
              <span className="text-[11px] font-bold text-slate-500 block leading-tight mb-1">
                {stat.label}
              </span>
              <span className="text-base sm:text-lg font-black text-sky-950 block tracking-tight group-hover:text-sky-600 transition-colors">
                {stat.value}
              </span>
            </div>
            <div className="pt-2 border-t border-slate-100 mt-2">
              <span className="text-[10px] text-slate-600 leading-tight block">
                {stat.subtext}
              </span>
              <span className="text-[9px] font-bold text-sky-700 block mt-1">
                📖 {stat.source}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Basin Share Visualizer (Hình 2 - Trang 6 SGK) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-sky-100 text-sky-800 text-[11px] font-black uppercase">
                Hình 2 • Trang 6 SGK
              </span>
              <span className="text-xs text-slate-500">Nguồn: Uỷ hội sông Mê Công, 2022</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Biểu Đồ Tỉ Lệ Diện Tích Lưu Vực Sông Mê Công Theo Quốc Gia (%)
            </h2>
          </div>
          <span className="text-xs font-bold text-slate-600">
            Tổng diện tích lưu vực: <strong className="text-sky-700">810.000 km²</strong>
          </span>
        </div>

        {/* Progress Bar Visualization of percentages */}
        <div className="space-y-2">
          <div className="h-6 rounded-full overflow-hidden flex shadow-inner bg-slate-100 p-0.5">
            {BASIN_SHARE_DATA.map((c) => (
              <button
                key={c.country}
                style={{ width: `${c.percentage}%` }}
                onClick={() => setSelectedCountry(c.country)}
                title={`${c.country}: ${c.percentage}% (${c.areaKm2.toLocaleString('vi-VN')} km²)`}
                className={`h-full transition-transform hover:scale-y-110 cursor-pointer first:rounded-l-full last:rounded-r-full flex items-center justify-center text-[11px] font-black ${
                  c.country === 'Lào' ? 'bg-amber-400 text-slate-950' :
                  c.country === 'Thái Lan' ? 'bg-sky-500 text-white' :
                  c.country === 'Trung Quốc' ? 'bg-rose-500 text-white' :
                  c.country === 'Cam-pu-chia' ? 'bg-indigo-500 text-white' :
                  c.country === 'Việt Nam' ? 'bg-emerald-600 text-white' :
                  'bg-purple-500 text-white'
                }`}
              >
                {c.percentage >= 8 ? `${c.country} ${c.percentage}%` : `${c.percentage}%`}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 px-1">
            <span>Thượng nguồn: Trung Quốc (21%), Myanmar (3%)</span>
            <span>Hạ lưu: Lào (25%), Thái Lan (23%), Campuchia (20%), Việt Nam (8%)</span>
          </div>
        </div>

        {/* Interactive Country Grid Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {BASIN_SHARE_DATA.map((c) => {
            const isSelected = selectedCountry === c.country;
            return (
              <button
                key={c.country}
                onClick={() => setSelectedCountry(c.country)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-md scale-[1.03]'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black">{c.country}</span>
                  <span className={`text-xs font-black px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {c.percentage}%
                  </span>
                </div>
                <span className="text-[10px] opacity-80 block mt-1 truncate">
                  {c.localName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Country Dossier Card */}
        {activeCountryData && (
          <div className="p-5 rounded-2xl bg-sky-50/80 border border-sky-200/90 text-slate-800 space-y-3 animate-in fade-in">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-600" />
                <h3 className="text-sm sm:text-base font-black text-sky-950">
                  {activeCountryData.vietnameseName} ({activeCountryData.country})
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-white border border-sky-300 text-sky-900">
                Diện tích trong lưu vực: {activeCountryData.areaKm2.toLocaleString('vi-VN')} km² ({activeCountryData.percentage}%)
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-sky-100 space-y-1">
                <span className="font-bold text-sky-900 block">Tên Gọi Văn Hóa Bản Địa:</span>
                <p className="text-slate-700">
                  Được người dân địa phương gọi là <strong>"{activeCountryData.localName}"</strong> (nghĩa là <em>"{activeCountryData.localMeaning}"</em>).
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-sky-100 space-y-1">
                <span className="font-bold text-sky-900 block">Đặc Điểm Địa Lí & Lưu Vực:</span>
                <p className="text-slate-700">
                  {activeCountryData.role}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 5 Technical Procedures of MRC (Hình 6 - Trang 10 SGK) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-black uppercase">
                Hình 6 • Trang 10 SGK
              </span>
              <span className="text-xs text-slate-500">Khuôn khổ kỹ thuật và pháp lí của MRC</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              Năm Thủ Tục Về Chất Lượng Nước Và Dòng Chảy Của Uỷ Hội Sông Mê Công
            </h2>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            Thông qua nhằm triển khai Hiệp định sông Mê Công năm 1995
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {MRC_FIVE_PROCEDURES.map((proc, idx) => {
            const colors = [
              { border: 'border-emerald-300', bg: 'bg-emerald-50/70', badge: 'bg-emerald-600 text-white', text: 'text-emerald-950' },
              { border: 'border-amber-300', bg: 'bg-amber-50/70', badge: 'bg-amber-600 text-white', text: 'text-amber-950' },
              { border: 'border-sky-300', bg: 'bg-sky-50/70', badge: 'bg-sky-600 text-white', text: 'text-sky-950' },
              { border: 'border-indigo-300', bg: 'bg-indigo-50/70', badge: 'bg-indigo-600 text-white', text: 'text-indigo-950' },
              { border: 'border-cyan-300', bg: 'bg-cyan-50/70', badge: 'bg-cyan-600 text-white', text: 'text-cyan-950' },
            ][idx % 5];

            return (
              <div
                key={proc.code}
                className={`p-4 rounded-2xl border ${colors.border} ${colors.bg} flex flex-col justify-between space-y-3 shadow-2xs hover:shadow-md transition-all`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-black ${colors.badge}`}>
                      {proc.code}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500">
                      Năm {proc.approvedYear}
                    </span>
                  </div>

                  <h3 className={`text-xs font-black ${colors.text} leading-snug`}>
                    {proc.fullNameVi}
                  </h3>

                  <p className="text-[11px] italic text-slate-500 font-sans leading-tight">
                    {proc.fullNameEn}
                  </p>

                  <p className="text-xs text-slate-700 leading-relaxed pt-1">
                    {proc.purpose}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/60 text-[10px] text-slate-500 font-medium">
                  <strong>Đối tượng:</strong> {proc.targetWaterBody}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Tabs & Search Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Search box */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm: 4.763 km, PNPCA, NQ 120, Cần Thơ..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
            />
          </div>

          {/* Quick Categories Filter */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { id: 'standards', label: '🎯 5 Yêu Cầu Cần Đạt (Mục Tiêu Địa Lí 11)' },
              { id: 'all', label: 'Tất Cả Tri Thức' },
              { id: 'sec-1', label: 'Phần 1: Lưu Vực' },
              { id: 'sec-2', label: 'Phần 2: Uỷ Hội MRC' },
              { id: 'sec-3', label: 'Phần 3: Việt Nam & ĐBSCL' },
              { id: 'sec-4', label: 'Phần 4: Biển Đông' },
              { id: 'questions', label: 'Bộ Câu Hỏi SGK' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  if (cat.id === 'questions') {
                    setSearchQuery('');
                  }
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* VIEW 1: 5 Core Curriculum Standards (Mục Tiêu Cần Đạt Chuyên Đề Địa Lí 11) */}
      {activeCategory === 'standards' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Top Quick Navigation Bar across the 5 Standards */}
          <div className="bg-gradient-to-r from-sky-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-md border border-sky-700/40">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-amber-400 text-slate-950 uppercase inline-flex items-center gap-1">
                  <Target className="w-3.5 h-3.5" />
                  Chuẩn Năng Lực Chương Trình GDPT 2018
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white mt-1">
                  5 Yêu Cầu Cần Đạt Trọng Tâm - Chuyên Đề 11.1 Sông Mê Công
                </h2>
                <p className="text-xs text-sky-200 max-w-3xl mt-0.5">
                  Đối chiếu toàn diện kiến thức địa lí tự nhiên, kinh tế - xã hội, thể chế pháp lí MRC và thực tiễn Đồng bằng sông Cửu Long / Tỉnh Hậu Giang.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const allOpen = Object.values(expandedStandards).every(Boolean);
                    setExpandedStandards({
                      'comp-1': !allOpen,
                      'comp-2': !allOpen,
                      'comp-3': !allOpen,
                      'comp-4': !allOpen,
                      'comp-5': !allOpen
                    });
                  }}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer"
                >
                  {Object.values(expandedStandards).every(Boolean) ? 'Thu gọn tất cả' : 'Mở rộng tất cả 5 chuẩn'}
                </button>
              </div>
            </div>

            {/* Quick 5 Tabs Pill Selector */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2 pt-2 border-t border-sky-800/60">
              {CORE_COMPETENCIES_5_STANDARDS.map((std, idx) => {
                const isSelected = selectedStandardId === std.id;
                return (
                  <button
                    key={std.id}
                    onClick={() => {
                      setSelectedStandardId(std.id);
                      setExpandedStandards(prev => ({ ...prev, [std.id]: true }));
                      const el = document.getElementById(std.id);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className={`p-2.5 rounded-2xl text-left transition-all cursor-pointer flex flex-col justify-between gap-1 border ${
                      isSelected 
                        ? 'bg-amber-400 text-slate-950 font-black border-amber-300 shadow-md scale-[1.02]' 
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/10 text-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                        isSelected ? 'bg-slate-950 text-amber-300' : 'bg-white/20 text-sky-200'
                      }`}>
                        Mục tiêu {idx + 1}
                      </span>
                      <span className="text-xs">
                        {idx === 0 ? '🧭' : idx === 1 ? '🌊' : idx === 2 ? '⚠️' : idx === 3 ? '🏛️' : '🌾'}
                      </span>
                    </div>
                    <span className="text-xs font-bold leading-tight line-clamp-2">
                      {std.shortTitle}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Render All 5 Competency Cards */}
          <div className="space-y-6">
            {filteredStandards.map((std, idx) => {
              const isExpanded = expandedStandards[std.id] ?? true;
              const isSelected = selectedStandardId === std.id;

              const themeGradients = [
                'from-sky-950 via-slate-900 to-indigo-950 border-sky-700/50',
                'from-emerald-950 via-slate-900 to-teal-950 border-emerald-700/50',
                'from-rose-950 via-slate-900 to-amber-950 border-amber-700/50',
                'from-indigo-950 via-slate-900 to-blue-950 border-indigo-700/50',
                'from-teal-950 via-slate-900 to-emerald-950 border-teal-700/50'
              ][idx % 5];

              const badgeColors = [
                'bg-sky-400 text-slate-950',
                'bg-emerald-400 text-slate-950',
                'bg-amber-400 text-slate-950',
                'bg-indigo-300 text-slate-950',
                'bg-teal-400 text-slate-950'
              ][idx % 5];

              return (
                <div
                  key={std.id}
                  id={std.id}
                  className={`bg-white rounded-3xl border shadow-xs overflow-hidden transition-all scroll-mt-24 ${
                    isSelected ? 'ring-2 ring-amber-400/80 border-amber-300 shadow-md' : 'border-slate-200'
                  }`}
                >
                  {/* Card Header Banner */}
                  <div className={`p-6 sm:p-7 bg-gradient-to-br ${themeGradients} text-white border-b relative overflow-hidden`}>
                    <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
                      <div className="space-y-2 max-w-4xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-black uppercase shadow-xs ${badgeColors}`}>
                            {std.badge}
                          </span>
                          <span className="text-xs text-slate-300 font-semibold flex items-center gap-1">
                            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                            Chuẩn Địa Lí 11 - Bộ GD&ĐT
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                          {std.order}. {std.title}
                        </h3>

                        {/* Exact Curriculum Bullet Quote */}
                        <div className="bg-white/10 rounded-xl p-3 border border-white/20 backdrop-blur-xs">
                          <p className="text-xs sm:text-sm font-bold text-amber-300 flex items-start gap-2">
                            <span className="text-base leading-none">🎯</span>
                            <span>Yêu cầu cần đạt chuẩn: <em>"{std.curriculumGoal}"</em></span>
                          </p>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed pt-1">
                          {std.summary}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleStandard(std.id)}
                          className="px-3 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-all border border-white/20 flex items-center gap-1 cursor-pointer"
                        >
                          <span>{isExpanded ? 'Thu gọn' : 'Xem chi tiết'}</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expandable Body Content */}
                  {isExpanded && (
                    <div className="p-6 sm:p-8 space-y-6 animate-in fade-in duration-200">
                      {/* 4 Key Stats Bar for this Standard */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {std.keyStats.map((st, sIdx) => (
                          <div 
                            key={sIdx}
                            className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 flex flex-col justify-between"
                          >
                            <span className="text-[11px] font-bold text-slate-500 block">
                              {st.label}
                            </span>
                            <span className="text-base sm:text-lg font-black text-slate-900 mt-1">
                              {st.value}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* 4 Thematic Core Breakdown Points with Evidence */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <BookOpen className="w-4 h-4 text-sky-600" />
                          <span>Luận Cứ Địa Lí Chi Tiết & Bằng Chứng Số Liệu:</span>
                        </h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                          {std.bulletPoints.map((bp, bIdx) => (
                            <div 
                              key={bIdx}
                              className="bg-sky-50/50 rounded-2xl p-4 border border-sky-100/90 flex flex-col justify-between space-y-2 hover:bg-sky-50 transition-colors"
                            >
                              <div className="space-y-1.5">
                                <span className="text-xs font-black text-sky-950 flex items-center gap-1.5">
                                  <span className="w-2 h-2 rounded-full bg-sky-600" />
                                  {bp.heading}
                                </span>
                                <p className="text-xs text-slate-700 leading-relaxed">
                                  {bp.details}
                                </p>
                              </div>

                              {bp.evidence && (
                                <div className="pt-2 border-t border-sky-200/60 text-[11px] text-sky-800 font-bold flex items-center gap-1">
                                  <span>📖</span>
                                  <span>{bp.evidence}</span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Critical Geographic Analysis Box */}
                      <div className="bg-amber-50/80 rounded-2xl p-4.5 border border-amber-200 space-y-1.5">
                        <div className="flex items-center gap-2 text-xs font-black text-amber-950 uppercase tracking-wider">
                          <AlertCircle className="w-4 h-4 text-amber-700" />
                          <span>Điểm Nhấn Tư Duy Địa Lí & Phản Biện Sâu Sắc:</span>
                        </div>
                        <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                          {std.criticalAnalysis}
                        </p>
                      </div>

                      {/* Official Exam Question & Standard Model Answer */}
                      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5 space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                            <HelpCircle className="w-4 h-4 text-emerald-700" />
                            <span>Câu Hỏi Ôn Tập Kiểm Tra & Đáp Án Mẫu Đạt Điểm Tuyệt Đối:</span>
                          </span>
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            Chuẩn Barem Địa Lí 11
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-bold text-slate-900">
                          ❓ {std.reviewQuestion}
                        </p>

                        <div className="bg-white p-3.5 rounded-xl border border-emerald-200 text-xs sm:text-sm text-slate-700 leading-relaxed">
                          <strong className="text-emerald-800 block mb-1">Gợi ý trả lời chuẩn xác 100%:</strong>
                          {std.modelAnswer}
                        </div>
                      </div>

                      {/* Action Bar: Ask AI Tutor or Listen */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          {onOpenAssistantHelp && (
                            <button
                              onClick={() => onOpenAssistantHelp(`Đọc và phân tích chuyên sâu Chuẩn Năng Lực ${std.order}: "${std.curriculumGoal}". Giải thích câu hỏi kiểm tra: "${std.reviewQuestion}"`)}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer hover:scale-105"
                            >
                              <Volume2 className="w-4 h-4" />
                              <span>Nghe AI Kiến Sáng Giảng Chuẩn 100%</span>
                            </button>
                          )}

                          {onOpenAssistantHelp && (
                            <button
                              onClick={() => onOpenAssistantHelp(`Tôi muốn làm bài tập trắc nghiệm và tự luận ôn tập về "${std.title}" theo Chuyên đề Địa lí 11.`)}
                              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                              <span>Luyện Đề Nhanh Với AI</span>
                            </button>
                          )}
                        </div>

                        {onNavigateTab && (
                          <div className="flex items-center gap-2">
                            {idx === 0 && (
                              <button
                                onClick={() => onNavigateTab('globe')}
                                className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
                              >
                                <span>Xem trên Quả Địa Cầu 3D</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {(idx === 2 || idx === 4) && (
                              <button
                                onClick={() => onNavigateTab('vietnam')}
                                className="text-xs font-bold text-emerald-700 hover:text-emerald-900 flex items-center gap-1 cursor-pointer"
                              >
                                <span>Xem Thực Tiễn ĐBSCL & NQ 120</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Content Sections Accordions */}
      {activeCategory !== 'standards' && activeCategory !== 'questions' && (
        <div className="space-y-6">
          {filteredSections.map((section) => (
            <div 
              key={section.id} 
              className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden"
            >
              {/* Section Header */}
              <div className="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-black bg-amber-400 text-slate-950 uppercase">
                      {section.number}
                    </span>
                    <span className="text-xs text-sky-200 font-semibold">
                      {section.pageRange}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {section.title}
                  </h3>
                  <p className="text-xs text-slate-300 max-w-3xl">
                    {section.summary}
                  </p>
                </div>
              </div>

              {/* Subsections Grid */}
              <div className="p-6 space-y-4">
                {section.subsections.map((sub, sIdx) => {
                  const subKey = `${section.id}-${sIdx}`;
                  const isExpanded = expandedSubsections[subKey] ?? true;

                  return (
                    <div 
                      key={sIdx}
                      className="border border-slate-200 rounded-2xl overflow-hidden transition-all"
                    >
                      <button
                        onClick={() => toggleSubsection(subKey)}
                        className="w-full p-4 text-left bg-slate-50/80 hover:bg-slate-100 flex items-center justify-between gap-3 transition-colors cursor-pointer"
                      >
                        <span className="text-xs sm:text-sm font-black text-slate-900 flex items-center gap-2">
                          <Compass className="w-4 h-4 text-sky-600 shrink-0" />
                          {sub.subtitle}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 font-bold hidden sm:inline">
                            {sub.evidence}
                          </span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-5 bg-white space-y-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed border-t border-slate-200/80 animate-in fade-in">
                          {sub.content.map((paragraph, pIdx) => (
                            <p key={pIdx} className="leading-relaxed">
                              {paragraph}
                            </p>
                          ))}

                          {sub.highlightNotes && sub.highlightNotes.length > 0 && (
                            <div className="mt-3 p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 space-y-1.5">
                              <span className="text-[11px] font-black uppercase text-amber-900 flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                                Tóm Lược Trọng Tâm Kiểm Tra:
                              </span>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs text-amber-950 font-semibold">
                                {sub.highlightNotes.map((note, nIdx) => (
                                  <li key={nIdx} className="flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                                    <span>{note}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="pt-2 text-right">
                            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
                              Trích dẫn chuẩn: {sub.evidence}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Review Questions Section (Ôn Luyện Chuẩn SGK) */}
      {(activeCategory === 'all' || activeCategory === 'questions') && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-100 text-emerald-900 text-[11px] font-black uppercase">
                  ÔN TẬP ĐỊA LÍ 11
                </span>
                <span className="text-xs text-slate-500">Các câu hỏi tự luận chính thức trong SGK</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                Bộ Câu Hỏi Trọng Tâm & Barem Trả Lời Chuẩn SGK
              </h3>
            </div>
            <span className="text-xs text-slate-600 font-semibold">
              {filteredQuestions.length} câu hỏi chuẩn
            </span>
          </div>

          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const isOpened = expandedQuestions[q.id] ?? false;

              return (
                <div 
                  key={q.id}
                  className="rounded-2xl border border-slate-200 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => toggleQuestion(q.id)}
                    className="w-full p-4 text-left bg-slate-50/90 hover:bg-slate-100 flex items-start justify-between gap-3 transition-colors cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-900 text-[10px] font-black">
                          SGK {q.page}
                        </span>
                        {q.tags.map((t, idx) => (
                          <span key={idx} className="text-[10px] text-slate-500 font-semibold">
                            • {t}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 leading-snug">
                        {q.question}
                      </h4>
                    </div>

                    <div className="shrink-0 pt-1">
                      {isOpened ? (
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-500" />
                      )}
                    </div>
                  </button>

                  {isOpened && (
                    <div className="p-5 bg-white space-y-3 border-t border-slate-200/80 animate-in fade-in">
                      <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Gợi Ý Trả Lời Đạt Điểm Tối Đa:</span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-emerald-50/50 p-4 rounded-xl border border-emerald-200">
                        {q.standardAnswer}
                      </p>

                      <div className="flex justify-end pt-1">
                        {onOpenAssistantHelp && (
                          <button
                            onClick={() => onOpenAssistantHelp(`Giải thích sâu hơn câu hỏi SGK ${q.page}: "${q.question}"`)}
                            className="text-xs text-sky-700 hover:text-sky-900 font-bold flex items-center gap-1 underline"
                          >
                            <span>Hỏi Kiến Sáng mở rộng ý này</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* School Pedagogical Footer Connection */}
      <div className="p-5 rounded-3xl bg-slate-900 text-slate-300 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0">
            <School className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-white">Trường TH, THCS, THPT FPT Hậu Giang</p>
            <p className="text-[11px] text-slate-400">
              📍 61C ấp 6, xã Vị Thủy, TP.Cần Thơ • Giáo Dục Địa Lí 11 Gắn Liền Với Thực Tiễn Sông Nước Miền Tây
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('vietnam')}
              className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors cursor-pointer"
            >
              Xem Liên Hệ Việt Nam
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
