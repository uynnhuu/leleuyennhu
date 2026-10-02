export interface RiverStation {
  id: string;
  name: string;
  localName: string;
  country: string;
  countryCode: string;
  flag: string;
  distanceFromSource: number; // km
  elevation: number; // m
  description: string;
  features: string[];
  biodiversityHighlight: string;
  humanImpact: string;
  hydropowerDams: string[];
  coordinates: { x: number; y: number }; // Relative SVG % coordinates (0-100)
}

export interface EstuaryInfo {
  id: string;
  name: string;
  riverBranch: 'Tiền' | 'Hậu';
  province: string;
  status: 'active' | 'dammed' | 'silted';
  description: string;
  historicalNote: string;
  order: number;
  coordinates?: { x: number; y: number }; // Relative coordinates for map rendering
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  curriculumTopic: 'Vị trí & Lưu vực' | 'Chế độ nước & Thủy văn' | 'Tác động tới ĐBSCL' | 'An ninh nguồn nước & Giải pháp';
  difficulty: 'Nhận biết' | 'Thông hiểu' | 'Vận dụng';
}

export interface SimulatorEvent {
  id: string;
  title: string;
  season: 'Mùa lũ (Nước nổi)' | 'Mùa khô (Hạn mặn)' | 'Giai đoạn chuyển mùa';
  description: string;
  severity: 'low' | 'medium' | 'high';
  choices: {
    text: string;
    description: string;
    impact: {
      waterSecurity: number; // -30 to +30
      agriculture: number;
      ecology: number;
    };
    feedback: string;
  }[];
}

export interface CountryMekong {
  id: string;
  country: string;
  localName: string;
  flag: string;
  lengthInCountry: number; // km
  basinPercentage: number; // %
  flowContribution: number; // %
  keyRole: string;
  mainIssue: string;
}

export interface TourismDestination {
  id: string;
  title: string;
  location: string;
  province: string;
  distanceFromFpt: string; // Distance from FPT Hậu Giang
  imageSrc: string;
  aiGenerated?: boolean;
  tag: string;
  seasonHighlight: string;
  description: string;
  ecoActivities: string[];
  geographySignificance: string;
}

export interface SupportTicketOrQuery {
  id: string;
  category: 'textbook' | 'game_l2' | 'school_info' | 'system_support' | 'tourism';
  title: string;
  prompt: string;
}

