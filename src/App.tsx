/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Mekong3DGlobe } from './components/Mekong3DGlobe';
import { RiverMapInteractive } from './components/RiverMapInteractive';
import { VietnamConnection } from './components/VietnamConnection';
import { GameHub } from './components/GameHub';
import { MekongKnowledgeHub } from './components/MekongKnowledgeHub';
import { MekongTourismGallery } from './components/MekongTourismGallery';
import { PromptLessonGuide } from './components/PromptLessonGuide';
import { AiTutorChat } from './components/AiTutorChat';
import { MekongInteractiveHub } from './components/MekongInteractiveHub';
import { MekongProgressTracker } from './components/MekongProgressTracker';
import kienSangAvatarImg from './assets/images/kien_sang_avatar_1789694565810.jpg';
import { 
  Compass, 
  MapPin, 
  Waves, 
  BookOpen, 
  School, 
  Camera, 
  Lightbulb, 
  Sparkles 
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'knowledge' | 'globe' | 'map' | 'vietnam' | 'games' | 'interactive' | 'tourism' | 'prompts' | 'assistant'>('knowledge');
  const [selectedGame, setSelectedGame] = useState<'simulator' | 'estuary' | 'quiz' | 'country'>('simulator');
  const [userPoints, setUserPoints] = useState<number>(() => {
    const saved = localStorage.getItem('mekong_geo_points');
    return saved ? parseInt(saved, 10) : 100; // start with welcome 100 points
  });

  const handleAddPoints = (pts: number) => {
    setUserPoints(prev => {
      const updated = prev + pts;
      localStorage.setItem('mekong_geo_points', updated.toString());
      return updated;
    });
  };

  const handleResetPoints = () => {
    setUserPoints(100);
    localStorage.setItem('mekong_geo_points', '100');
  };

  const handleSelectVietnam = () => {
    setActiveTab('vietnam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayGame = (gameId: 'simulator' | 'estuary' | 'quiz' | 'country') => {
    setSelectedGame(gameId);
    setActiveTab('games');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAssistant = () => {
    setActiveTab('assistant');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-sky-200 selection:text-sky-900">
      {/* Top Main Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userPoints={userPoints} 
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Universal Learning Progress Tracker Bar across the app */}
        {activeTab !== 'interactive' && (
          <MekongProgressTracker onNavigateTab={(tab) => {
            if (tab === 'vietnam') {
              setActiveTab('vietnam');
            } else {
              setActiveTab('interactive');
            }
          }} />
        )}

        {/* Render Tab Views */}
        {activeTab === 'interactive' && (
          <MekongInteractiveHub 
            userPoints={userPoints} 
            onAddPoints={handleAddPoints} 
            onNavigateTab={setActiveTab} 
          />
        )}

        {activeTab === 'knowledge' && (
          <MekongKnowledgeHub 
            onOpenAssistantHelp={handleOpenAssistant} 
            onNavigateTab={setActiveTab} 
          />
        )}

        {activeTab === 'globe' && (
          <Mekong3DGlobe 
            onOpenAssistantHelp={handleOpenAssistant} 
            onNavigateTab={setActiveTab} 
          />
        )}

        {activeTab === 'map' && (
          <RiverMapInteractive 
            onSelectVietnam={handleSelectVietnam} 
            onOpenGlobe={() => setActiveTab('globe')}
          />
        )}

        {activeTab === 'vietnam' && (
          <VietnamConnection onPlayGame={(g) => handlePlayGame(g as any)} />
        )}

        {activeTab === 'games' && (
          <GameHub 
            userPoints={userPoints} 
            onAddPoints={handleAddPoints}
            defaultGame={selectedGame}
            onOpenAssistantHelp={handleOpenAssistant}
          />
        )}

        {activeTab === 'tourism' && (
          <MekongTourismGallery />
        )}

        {activeTab === 'prompts' && (
          <PromptLessonGuide />
        )}

        {activeTab === 'assistant' && (
          <AiTutorChat 
            onNavigateTab={setActiveTab}
            onResetPoints={handleResetPoints}
          />
        )}
      </main>

      {/* Floating Quick Support Assistant Widget */}
      {activeTab !== 'assistant' && (
        <button
          onClick={handleOpenAssistant}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 text-white font-bold text-xs shadow-xl hover:shadow-2xl hover:scale-105 transition-all border-2 border-white/40 group cursor-pointer"
          title="Mở Chatbot AI Kiến Sáng (Hỗ trợ giọng nói tiếng Việt)"
        >
          <div className="relative">
            <img
              src={kienSangAvatarImg}
              alt="Kiến Sáng FPT"
              className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-md ring-2 ring-orange-200"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-400 rounded-full ring-2 ring-white animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <span className="text-[10px] text-orange-100 block font-medium leading-none">Trợ Lý AI Giọng Nói 🎤</span>
            <span className="text-xs font-black leading-tight text-white">Chatbot Kiến Sáng</span>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-white/20 text-[10px] text-white font-extrabold hidden md:inline">
            FPT Schools
          </span>
        </button>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-white border-t border-slate-800 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-6 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-700 flex items-center justify-center text-white font-bold shadow-md">
                <Compass className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-black text-lg tracking-tight">
                    Sông Mê Công
                  </h3>
                  <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-amber-400 text-slate-950">
                    Địa Lí 11
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5 flex items-center gap-1.5">
                  <School className="w-3.5 h-3.5 text-sky-400" />
                  Trường TH, THCS, THPT FPT Hậu Giang
                </p>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  Địa chỉ cập nhật: 61C ấp 6, xã Vị Thủy, TP.Cần Thơ
                </p>
              </div>
            </div>

            {/* Fast Links */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-300">
              <button onClick={() => setActiveTab('knowledge')} className="hover:text-amber-300 transition-colors">
                Kiến Thức SGK 11
              </button>
              <button onClick={() => setActiveTab('globe')} className="hover:text-cyan-400 transition-colors text-cyan-300 font-bold flex items-center gap-1">
                <span>Quả Địa Cầu 3D</span>
              </button>
              <button onClick={() => setActiveTab('map')} className="hover:text-sky-400 transition-colors">
                Bản Đồ Lưu Vực
              </button>
              <button onClick={() => setActiveTab('vietnam')} className="hover:text-sky-400 transition-colors">
                Liên Hệ ĐBSCL
              </button>
              <button onClick={() => setActiveTab('tourism')} className="hover:text-sky-400 transition-colors">
                Du Lịch ĐBSCL
              </button>
              <button onClick={() => setActiveTab('assistant')} className="hover:text-sky-400 transition-colors flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-amber-400" />
                Chatbot Kiến Sáng
              </button>
              <button onClick={() => setActiveTab('prompts')} className="hover:text-sky-400 transition-colors">
                Giáo Án & Prompt
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 text-[11px] text-slate-500">
            <p>© 2026 Sông Mê Công • Dự án học tập tương tác số hóa Trường TH, THCS, THPT FPT Hậu Giang.</p>
            <p className="flex items-center gap-1.5">
              <span>Được thiết kế trên Google AI Studio Build</span>
              <span>•</span>
              <span className="text-sky-400">Nghị quyết 120/NQ-CP "Thuận thiên"</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
