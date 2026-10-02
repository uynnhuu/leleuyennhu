export interface MekongModuleProgress {
  waterDrop: boolean;     // 1. Một giọt nước Mê Công
  manager: boolean;       // 2. Quản lý dòng sông
  simulator: boolean;     // 3. Mô phỏng nếu Mê Công thay đổi
  doctor: boolean;        // 4. Bác sĩ Mê Công
  summit: boolean;        // 5. Hội nghị Mê Công
  vietnamHauGiang: boolean;// 6. ĐBSCL & Hậu Giang
}

export interface MekongBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  requiredModule: keyof MekongModuleProgress;
  unlocked: boolean;
}

const STORAGE_KEY = 'mekong_learning_progress_v2';

export const DEFAULT_PROGRESS: MekongModuleProgress = {
  waterDrop: false,
  manager: false,
  simulator: false,
  doctor: false,
  summit: false,
  vietnamHauGiang: false
};

export function getMekongProgress(): MekongModuleProgress {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    return { ...DEFAULT_PROGRESS, ...JSON.parse(raw) };
  } catch (e) {
    return DEFAULT_PROGRESS;
  }
}

export function saveMekongProgress(progress: MekongModuleProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    // Dispatch custom event so all mounted components can update reactive state
    window.dispatchEvent(new CustomEvent('mekong-progress-updated', { detail: progress }));
  } catch (e) {
    console.error('Error saving progress', e);
  }
}

export function markModuleCompleted(moduleKey: keyof MekongModuleProgress): void {
  const current = getMekongProgress();
  if (!current[moduleKey]) {
    current[moduleKey] = true;
    saveMekongProgress(current);
  }
}

export function calculateProgressPercentage(progress: MekongModuleProgress): number {
  const total = Object.keys(progress).length;
  const completed = Object.values(progress).filter(Boolean).length;
  return Math.round((completed / total) * 100);
}

export function getMekongBadges(progress: MekongModuleProgress): MekongBadge[] {
  return [
    {
      id: 'badge-explorer',
      name: '💧 Nhà Khám Phá',
      icon: '💧',
      description: 'Hoàn thành hành trình 4.763km của "Một Giọt Nước Mê Công" từ Tây Tạng ra biển.',
      requiredModule: 'waterDrop',
      unlocked: progress.waterDrop
    },
    {
      id: 'badge-protector',
      name: '🌱 Người Bảo Vệ Dòng Sông',
      icon: '🌱',
      description: 'Khám phá và chẩn đoán các bệnh lý sinh thái cùng "Bác Sĩ Mê Công".',
      requiredModule: 'doctor',
      unlocked: progress.doctor
    },
    {
      id: 'badge-manager',
      name: '🌾 Người Quản Lý Nguồn Nước',
      icon: '🌾',
      description: 'Hoàn thành mô phỏng ra quyết định và nhận Báo cáo quản lý dòng sông.',
      requiredModule: 'manager',
      unlocked: progress.manager
    },
    {
      id: 'badge-diplomat',
      name: '🤝 Nhà Hợp Tác Mê Công',
      icon: '🤝',
      description: 'Tham gia mô phỏng đàm phán đa phương tại "Hội Nghị Mê Công (MRC)".',
      requiredModule: 'summit',
      unlocked: progress.summit
    },
    {
      id: 'badge-expert',
      name: '🇻🇳 Chuyên Gia ĐBSCL & Hậu Giang',
      icon: '🇻🇳',
      description: 'Nắm vững kiến thức chuỗi liên hệ thực tiễn Mê Kông - ĐBSCL - Hậu Giang.',
      requiredModule: 'vietnamHauGiang',
      unlocked: progress.vietnamHauGiang
    }
  ];
}
