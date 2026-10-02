import React, { useState } from 'react';
import { WaterDropJourney } from './WaterDropJourney';
import { MekongManagerSim } from './MekongManagerSim';
import { WhatIfSimulator } from './WhatIfSimulator';
import { MekongDoctor } from './MekongDoctor';
import { MekongSummit } from './MekongSummit';
import { MekongKnowledgeQA } from './MekongKnowledgeQA';
import { MekongProgressTracker } from './MekongProgressTracker';
import { 
  Droplet, 
  Scale, 
  Sliders, 
  Stethoscope, 
  Handshake, 
  BrainCircuit, 
  Sparkles,
  Trophy,
  Compass
} from 'lucide-react';

export type InteractiveModuleKey = 'water_drop' | 'manager' | 'simulator' | 'clinic' | 'summit' | 'qa';

interface MekongInteractiveHubProps {
  initialModule?: InteractiveModuleKey;
  userPoints: number;
  onAddPoints: (pts: number) => void;
  onNavigateTab?: (tab: string) => void;
}

export const MekongInteractiveHub: React.FC<MekongInteractiveHubProps> = ({
  initialModule = 'water_drop',
  userPoints,
  onAddPoints,
  onNavigateTab
}) => {
  const [activeModule, setActiveModule] = useState<InteractiveModuleKey>(initialModule);

  const modules = [
    {
      id: 'water_drop' as InteractiveModuleKey,
      title: 'Một Giọt Nước Mê Công',
      icon: '💧',
      badge: 'Chặng 1',
      desc: 'Đóng vai giọt nước vượt 4.763km từ Tây Tạng đến Biển Đông'
    },
    {
      id: 'manager' as InteractiveModuleKey,
      title: 'Người Quản Lý Mê Công',
      icon: '🎮',
      badge: 'Chặng 2',
      desc: 'Ra quyết định điều tiết nước, năng lượng và cân bằng sinh thái'
    },
    {
      id: 'simulator' as InteractiveModuleKey,
      title: 'Nếu Mê Công Đổi Thay?',
      icon: '🔮',
      badge: 'Chặng 3',
      desc: 'Mô phỏng tương tác 7 thông số: hạn, mặn, sạt lở, phù sa'
    },
    {
      id: 'clinic' as InteractiveModuleKey,
      title: 'Bác Sĩ Mê Công',
      icon: '🩺',
      badge: 'Chặng 4',
      desc: 'Chẩn đoán 8 bệnh lý sinh thái & phác đồ Thuận thiên NQ 120'
    },
    {
      id: 'summit' as InteractiveModuleKey,
      title: 'Hội Nghị Mê Công (MRC)',
      icon: '🤝',
      badge: 'Chặng 5',
      desc: 'Mô phỏng ngoại giao nguồn nước giữa 6 quốc gia lưu vực'
    },
    {
      id: 'qa' as InteractiveModuleKey,
      title: 'AI Hỏi Đáp & Voice',
      icon: '🧠',
      badge: 'Chặng 6',
      desc: 'Hỏi đáp chuyên sâu có ví dụ & tương tác giọng nói tiếng Việt'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Universal Progress Tracker */}
      <MekongProgressTracker onNavigateTab={(tab) => {
        if (tab === 'water_drop' || tab === 'manager' || tab === 'simulator' || tab === 'clinic' || tab === 'summit' || tab === 'qa') {
          setActiveModule(tab as InteractiveModuleKey);
        } else if (onNavigateTab) {
          onNavigateTab(tab);
        }
      }} />

      {/* Sub navigation bar for the 6 interactive modules */}
      <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-xs">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {modules.map((m) => {
            const isSelected = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-sky-600 to-blue-700 text-white font-bold border-sky-500 shadow-md scale-102 ring-2 ring-sky-300'
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-xl">{m.icon}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {m.badge}
                  </span>
                </div>
                <div className="text-xs font-black truncate">
                  {m.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Render active module */}
      <div>
        {activeModule === 'water_drop' && (
          <WaterDropJourney 
            onAddPoints={onAddPoints} 
            onNavigateTab={(tab) => setActiveModule(tab as InteractiveModuleKey)} 
          />
        )}

        {activeModule === 'manager' && (
          <MekongManagerSim 
            onAddPoints={onAddPoints} 
            onNavigateTab={(tab) => setActiveModule(tab as InteractiveModuleKey)} 
          />
        )}

        {activeModule === 'simulator' && (
          <WhatIfSimulator 
            onAddPoints={onAddPoints} 
            onNavigateTab={(tab) => setActiveModule(tab as InteractiveModuleKey)} 
          />
        )}

        {activeModule === 'clinic' && (
          <MekongDoctor 
            onAddPoints={onAddPoints} 
            onNavigateTab={(tab) => setActiveModule(tab as InteractiveModuleKey)} 
          />
        )}

        {activeModule === 'summit' && (
          <MekongSummit 
            onAddPoints={onAddPoints} 
            onNavigateTab={(tab) => {
              if (tab === 'vietnam') {
                if (onNavigateTab) onNavigateTab('vietnam');
              } else {
                setActiveModule(tab as InteractiveModuleKey);
              }
            }} 
          />
        )}

        {activeModule === 'qa' && (
          <MekongKnowledgeQA 
            onAddPoints={onAddPoints} 
            onNavigateTab={onNavigateTab} 
          />
        )}
      </div>
    </div>
  );
};
