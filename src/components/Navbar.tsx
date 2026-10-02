import React from 'react';
import { 
  Compass, 
  MapPin, 
  Waves, 
  Sparkles, 
  BookOpen, 
  Trophy, 
  Camera, 
  School, 
  Lightbulb, 
  Globe 
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'knowledge' | 'globe' | 'map' | 'vietnam' | 'games' | 'interactive' | 'tourism' | 'prompts' | 'assistant';
  setActiveTab: (tab: 'knowledge' | 'globe' | 'map' | 'vietnam' | 'games' | 'interactive' | 'tourism' | 'prompts' | 'assistant') => void;
  userPoints: number;
}

interface NavItem {
  id: 'knowledge' | 'interactive' | 'globe' | 'map' | 'vietnam' | 'tourism' | 'prompts' | 'assistant';
  label: string;
  icon: React.ElementType;
  highlight?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, userPoints }) => {
  const navItems: NavItem[] = [
    { id: 'knowledge', label: 'Kiến Thức SGK 11', icon: BookOpen },
    { id: 'interactive', label: 'Mô Phỏng & Tương Tác', icon: Sparkles, highlight: true },
    { id: 'globe', label: 'Quả Địa Cầu 3D', icon: Globe },
    { id: 'map', label: 'Bản Đồ Lưu Vực', icon: MapPin },
    { id: 'vietnam', label: 'Liên Hệ Việt Nam', icon: Waves },
    { id: 'tourism', label: 'Du Lịch ĐBSCL', icon: Camera },
    { id: 'assistant', label: 'Chatbot Kiến Sáng', icon: Lightbulb },
    { id: 'prompts', label: 'Giáo Án & Prompt', icon: Sparkles },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-sky-100 shadow-xs">
      {/* Top micro-bar for school location info */}
      <div className="bg-slate-900 text-slate-300 text-[11px] py-1 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <School className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-semibold text-white">Trường TH, THCS, THPT FPT Hậu Giang</span>
            <span className="text-slate-500 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline flex items-center gap-1">
              <MapPin className="w-3 h-3 text-sky-400" />
              61C ấp 6, xã Vị Thủy, TP.Cần Thơ
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400 text-[11px]">
            <span className="text-amber-300 font-medium">Chuyên đề Địa lí 11 • SGK Kết nối tri thức</span>
            <span className="hidden md:inline">|</span>
            <span className="hidden md:inline text-sky-300">Uỷ hội Sông Mê Công (MRC)</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Title: SÔNG MÊ CÔNG */}
          <div 
            onClick={() => setActiveTab('map')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-sky-600 via-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform duration-200">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                  Sông Mê Công
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  FPT Hậu Giang
                </span>
              </div>
              <p className="text-xs text-slate-600 hidden sm:block font-medium">
                Hành trình 4.763 km từ Tây Tạng đến 9 Cửa Sông Cửu Long (Việt Nam)
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1 rounded-xl border border-slate-200/70">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-tab-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs xl:text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive 
                      ? 'bg-white text-sky-800 shadow-xs font-bold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-sky-600' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Gamification Points Badge */}
          <div className="flex items-center gap-2.5">
            <div 
              id="header-user-points"
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 shadow-xs"
              title="Điểm thám hiểm tích lũy qua các bài học và tương tác"
            >
              <Trophy className="w-4 h-4 text-amber-600" />
              <div className="text-left">
                <span className="text-[10px] text-amber-700 font-semibold block leading-none">Điểm Thám Hiểm</span>
                <span className="text-sm font-black text-amber-900 leading-none">{userPoints} pts</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Navigation bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 gap-1 border-t border-slate-100 no-scrollbar">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap font-medium transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-sky-600 text-white font-bold' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
