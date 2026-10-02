import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  HelpCircle, 
  BookOpen, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  School,
  Lightbulb,
  Droplets,
  Layers
} from 'lucide-react';
import kienSangAvatarImg from '../assets/images/kien_sang_avatar_1789694565810.jpg';

interface QAItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  example: string;
  followUpSuggestions: string[];
}

export const MEKONG_QA_KNOWLEDGE: QAItem[] = [
  {
    id: 'geo-basics',
    category: 'Địa lí sông Mê Kông',
    question: 'Sông Mê Kông dài bao nhiêu km và bắt nguồn từ đâu, chảy qua những quốc gia nào?',
    answer: 'Sông Mê Kông có tổng chiều dài 4.763 km (xếp thứ 12 thế giới và thứ 3 châu Á). Dòng sông bắt nguồn từ các dải băng tuyết của dãy núi Tanggula trên cao nguyên Tây Tạng ở độ cao khoảng 5.000m, sau đó chảy qua 6 quốc gia theo hướng Bắc - Nam: Trung Quốc (gọi là sông Lan Thương), Myanmar, Lào, Thái Lan, Campuchia và Việt Nam (gọi là sông Cửu Long) trước khi đổ ra Biển Đông.',
    example: 'Ví dụ: Đoạn sông chảy trong lãnh thổ Trung Quốc dài tới 2.161 km (gần một nửa chiều dài dòng sông), còn đoạn hạ lưu tại Việt Nam dài hơn 230 km nhưng là nơi hội tụ nuôi sống hơn 20 triệu người dân.',
    followUpSuggestions: [
      'Tại sao sông Mê Kông ở Việt Nam lại có tên gọi là sông Cửu Long?',
      'Chế độ nước sông Mê Kông thay đổi như thế nào giữa mùa lũ và mùa cạn?'
    ]
  },
  {
    id: 'water-regime',
    category: 'Chế độ nước',
    question: 'Chế độ nước của sông Mê Kông có những đặc điểm nổi bật nào?',
    answer: 'Chế độ nước sông Mê Kông điều hòa theo mùa rõ rệt gắn liền với gió mùa Đông Nam Á: mùa lũ kéo dài từ tháng 6 đến tháng 11 (chiếm 80-90% tổng lượng dòng chảy cả năm), đỉnh lũ thường xuất hiện vào tháng 9-10. Mùa cạn từ tháng 12 đến tháng 5 năm sau (chỉ chiếm 10-20% lưu lượng). Điểm đặc biệt nhất là Biển Hồ (Tonle Sap) ở Campuchia đóng vai trò như một "hồ điều hòa tự nhiên khổng lồ": mùa lũ nhận nước ngược từ sông Mê Kông vào dự trữ, mùa cạn xả nước ngược ra đẩy mặn cho hạ lưu ĐBSCL.',
    example: 'Ví dụ: Dung tích Biển Hồ trong mùa lũ có thể phình to gấp 4-5 lần (từ 2.700 km² lên hơn 16.000 km²), giúp giảm nguy cơ ngập lụt thảm khốc cho vùng An Giang, Đồng Tháp của Việt Nam.',
    followUpSuggestions: [
      'Hiện tượng đảo dòng nước ở sông Tonle Sap diễn ra vào thời điểm nào?',
      'Biến đổi khí hậu đang làm chế độ dòng chảy mùa cạn thay đổi ra sao?'
    ]
  },
  {
    id: 'sediment',
    category: 'Phù sa & Bùn cát',
    question: 'Lượng phù sa sông Mê Kông có vai trò gì và hiện nay suy giảm ra sao?',
    answer: 'Phù sa sông Mê Kông là nguồn sống kiến tạo nên vùng đồng bằng châu thổ ĐBSCL trù phú, cung cấp dinh dưỡng tự nhiên thau chua rửa phèn và hạn chế xói lở bờ sông bờ biển. Trước năm 1990, dòng sông vận chuyển khoảng 160 triệu tấn phù sa/năm. Tuy nhiên, hiện nay lượng phù sa đã sụt giảm nghiêm trọng xuống chỉ còn khoảng 45-47 triệu tấn/năm (giảm hơn 70%) do bị các hồ thủy điện bậc thang giữ lại và nạn khai thác cát lòng sông quá mức.',
    example: 'Ví dụ: Người nông dân trồng lúa ở miền Tây ngày nay phải tăng lượng phân bón hóa học (NPK) gấp đôi so với trước đây để bù đắp lượng dinh dưỡng thiếu hụt từ nước lũ phù sa.',
    followUpSuggestions: [
      'Khái niệm "nước đói phù sa" (Hungry Water) là gì và gây sạt lở như thế nào?',
      'Tại sao việc mở đê bao đón lũ lấy phù sa lại quan trọng đối với ĐBSCL?'
    ]
  },
  {
    id: 'hydropower',
    category: 'Thủy điện',
    question: 'Hệ thống đập thủy điện trên dòng chính tác động thế nào đến hạ lưu?',
    answer: 'Việc xây dựng chuỗi đại thủy điện trên dòng Lan Thương (Trung Quốc) và dòng chính tại Lào làm thay đổi nhịp lũ tự nhiên: tích nước vào đầu mùa khô làm hạ lưu cạn kiệt, chặn đường di cư sinh sản của hơn 70% các loài cá trắng quý hiếm, và giam giữ phần lớn bùn cát đáy. Khi các đập vận hành phát điện theo nhu cầu phụ tải thương mại, mực nước sông lên xuống thất thường trong ngày, gây mất an toàn cho người dân ven sông.',
    example: 'Ví dụ: Đập Xayaburi tại Lào với công suất 1.285 MW đã phải đầu tư hàng trăm triệu USD xây dựng hệ thống bậc thang cá và cửa xả bùn đáy sau các cuộc tham vấn kỹ thuật căng thẳng tại MRC.',
    followUpSuggestions: [
      'Quy trình PNPCA của Ủy hội Sông Mê Kông có vai trò gì trong các dự án thủy điện?',
      'Năng lượng gió và mặt trời có thể thay thế thủy điện ở tiểu vùng Mê Kông như thế nào?'
    ]
  },
  {
    id: 'salinity-drought',
    category: 'Hạn hán & Xâm nhập mặn',
    question: 'Tại sao hạn hán và xâm nhập mặn ở ĐBSCL ngày càng gay gắt?',
    answer: 'Đây là hệ quả tổng hợp của 3 nhóm nguyên nhân: (1) Yếu tố tự nhiên: hiện tượng El Niño làm nắng nóng kéo dài, mùa khô không mưa và gió chướng đẩy triều cường; (2) Yếu tố con người thượng nguồn: các hồ chứa tích nước làm giảm dòng chảy mùa kiệt; khai thác cát làm hạ thấp đáy sông; (3) Biến đổi khí hậu toàn cầu làm nước biển dâng cao hơn. Ranh mặn 4 g/l trong các năm hạn lịch sử (2016, 2020, 2024) đã thâm nhập sâu tới 70-90 km trên sông Tiền và sông Hậu.',
    example: 'Ví dụ: Tại Bến Tre và Tiền Giang, sầu riêng và bưởi da xanh là cây nhạy cảm với mặn (chỉ chịu được dưới 0,5 g/l). Nước mặn tràn vào mương vườn đã làm chết hàng vạn cây ăn trái đặc sản hàng chục năm tuổi.',
    followUpSuggestions: [
      'Mô hình kinh tế "Lúa - Tôm" thích ứng với xâm nhập mặn như thế nào?',
      'Công trình thủy lợi Cái Lớn - Cái Bé hoạt động ra sao để kiểm soát mặn?'
    ]
  },
  {
    id: 'mrc-cooperation',
    category: 'Hợp tác quốc tế',
    question: 'Ủy hội Sông Mê Kông Quốc tế (MRC) giữ vai trò gì trong quản lý nguồn nước?',
    answer: 'MRC (thành lập theo Hiệp định Mê Kông năm 1995 gồm 4 thành viên chính thức: Campuchia, Lào, Thái Lan, Việt Nam cùng 2 đối tác đối thoại là Trung Quốc và Myanmar) là diễn đàn ngoại giao nước liên chính phủ duy nhất trong lưu vực. MRC điều phối thực thi 5 thủ tục kỹ thuật: trao đổi dữ liệu thủy văn (PDIES), giám sát sử dụng nước (PWUM), tham vấn dự án xây đập (PNPCA), duy trì dòng chảy tối thiểu (PMFM) và bảo đảm chất lượng nước (PWQ).',
    example: 'Ví dụ: Nhờ sự điều phối và chia sẻ dữ liệu của MRC và kênh hợp tác Lan Thương - Mê Kông, các trạm quan trắc tại Tân Châu và Châu Đốc (Việt Nam) có thể dự báo sớm trước 10-15 ngày thời điểm nước xả từ thượng lưu tràn về.',
    followUpSuggestions: [
      'Năm 1995 Hiệp định Mê Kông được ký kết tại đâu và có ý nghĩa gì?',
      'Tại sao Trung Quốc và Myanmar lại tham gia với tư cách đối tác đối thoại?'
    ]
  },
  {
    id: 'haugiang-delta',
    category: 'ĐBSCL & Hậu Giang',
    question: 'Tỉnh Hậu Giang và tuyến Kênh xáng Xà No có mối liên hệ cụ thể gì với sông Mê Kông?',
    answer: 'Hậu Giang nằm ở vùng Tây sông Hậu, nhận nước ngọt từ dòng sông Hậu qua mạng lưới kênh rạch chằng chịt, trong đó Kênh xáng Xà No (dài khoảng 40km, đào từ năm 1901-1903) là trục xương sống dẫn nước ngọt thau chua rửa phèn cho toàn vùng U Minh. Hậu Giang đối mặt với nguy cơ xâm nhập mặn kép: mặn từ Biển Đông qua sông Hậu và mặn từ Biển Tây theo sông Cái Lớn tràn vào huyện Long Mỹ, Vị Thủy. Tỉnh đang chủ động thích ứng bằng giải pháp đắp đập ngăn mặn thời vụ, phát triển vùng chuyên canh lúa chất lượng cao, khóm Cầu Đúc và nuôi cá thắt lát đặc sản.',
    example: 'Ví dụ: Trường FPT Hậu Giang tại đường 61C ấp 6, xã Vị Thủy nằm ngay cạnh hành lang kênh Xà No, là minh chứng cho sự kết hợp giữa giáo dục công nghệ hiện đại và tinh thần bảo vệ dòng nước quê hương.',
    followUpSuggestions: [
      'Đề án 1 triệu hecta lúa chất lượng cao phát thải thấp tại Hậu Giang có ý nghĩa gì?',
      'Tại sao huyện Long Mỹ của Hậu Giang lại chịu ảnh hưởng xâm nhập mặn sớm hơn các huyện khác?'
    ]
  }
];

export const MekongKnowledgeQA: React.FC<{
  onAddPoints?: (pts: number) => void;
  onNavigateTab?: (tab: string) => void;
}> = ({ onAddPoints, onNavigateTab }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [activeQA, setActiveQA] = useState<QAItem>(MEKONG_QA_KNOWLEDGE[0]);
  const [userQuery, setUserQuery] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'bot'; text: string; example?: string; followUps?: string[] }>>([
    {
      sender: 'bot',
      text: 'Xin chào bạn! Mình là Trợ lý AI Chuyên đề Địa lí 11 sông Mê Kông. Bạn có thể chọn các câu hỏi trọng tâm bên dưới hoặc gõ/nói trực tiếp bất kỳ câu hỏi nào về địa lí, thủy điện, xâm nhập mặn và thực tiễn Hậu Giang!',
      example: 'Ví dụ: "Tại sao ĐBSCL lại bị đói phù sa?", "Kênh xáng Xà No có ý nghĩa gì đối với Hậu Giang?"',
      followUps: [
        'Sông Mê Kông dài bao nhiêu km và bắt nguồn từ đâu?',
        'Hệ thống đập thủy điện tác động thế nào đến hạ lưu?',
        'Kênh xáng Xà No có ý nghĩa gì đối với Hậu Giang?'
      ]
    }
  ]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const categories = ['Tất cả', 'Địa lí sông Mê Kông', 'Chế độ nước', 'Phù sa & Bùn cát', 'Thủy điện', 'Hạn hán & Xâm nhập mặn', 'Hợp tác quốc tế', 'ĐBSCL & Hậu Giang'];

  const filteredQAs = selectedCategory === 'Tất cả' 
    ? MEKONG_QA_KNOWLEDGE 
    : MEKONG_QA_KNOWLEDGE.filter(q => q.category === selectedCategory);

  // Natural Vietnamese Text-To-Speech
  const speakText = (text: string) => {
    if (!soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VI'));
    if (viVoice) utterance.voice = viVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Speech Recognition (Voice Input)
  const toggleListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói (SpeechRecognition). Hãy dùng Google Chrome để có trải nghiệm tốt nhất!');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setUserQuery(transcript);
        handleSendQuery(transcript);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
    }
  };

  const handleSendQuery = (queryText: string) => {
    const trimmed = queryText.trim();
    if (!trimmed) return;

    // Search best matching QA
    const norm = trimmed.toLowerCase();
    let matched = MEKONG_QA_KNOWLEDGE.find(q => 
      norm.includes(q.category.toLowerCase()) || 
      q.question.toLowerCase().includes(norm) ||
      norm.includes(q.question.toLowerCase().slice(0, 15))
    );

    if (!matched) {
      // Keyword fallback
      if (norm.includes('hậu giang') || norm.includes('xà no')) matched = MEKONG_QA_KNOWLEDGE[6];
      else if (norm.includes('mặn') || norm.includes('hạn')) matched = MEKONG_QA_KNOWLEDGE[4];
      else if (norm.includes('thủy điện') || norm.includes('đập')) matched = MEKONG_QA_KNOWLEDGE[3];
      else if (norm.includes('phù sa') || norm.includes('cát')) matched = MEKONG_QA_KNOWLEDGE[2];
      else if (norm.includes('biển hồ') || norm.includes('mùa lũ')) matched = MEKONG_QA_KNOWLEDGE[1];
      else if (norm.includes('mrc') || norm.includes('hợp tác')) matched = MEKONG_QA_KNOWLEDGE[5];
      else matched = MEKONG_QA_KNOWLEDGE[0];
    }

    const newBotMsg = {
      sender: 'bot' as const,
      text: matched.answer,
      example: matched.example,
      followUps: matched.followUpSuggestions
    };

    setChatHistory(prev => [
      ...prev,
      { sender: 'user', text: trimmed },
      newBotMsg
    ]);

    setUserQuery('');
    setActiveQA(matched);
    if (onAddPoints) onAddPoints(30);

    // Speak answer if sound enabled
    if (soundEnabled) {
      speakText(`${matched.answer} ${matched.example}`);
    }
  };

  const handleSelectPredefinedQA = (qa: QAItem) => {
    setActiveQA(qa);
    handleSendQuery(qa.question);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-800/60">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-cyan-400 text-slate-950 flex items-center gap-1.5 shadow-xs">
                <Lightbulb className="w-3.5 h-3.5 text-slate-950" />
                Hỏi Đáp Chuyên Sâu & AI Voice
              </span>
              <span className="text-xs text-sky-200 hidden sm:inline">Chuẩn kiến thức SGK Địa lí 11</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2.5">
              <span>AI Hỏi Đáp Kiến Thức Sông Mê Công</span>
              <span className="text-xl sm:text-2xl text-cyan-300">🧠</span>
            </h1>
            <p className="text-sky-100 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
              Trợ lý chuyên gia giải đáp mọi thắc mắc về thủy văn, phù sa, đập thủy điện, hạn mặn và liên hệ ĐBSCL – Hậu Giang. 
              Hỗ trợ tương tác bằng giọng nói tiếng Việt tự nhiên và gợi ý câu hỏi tiếp theo!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (isSpeaking) stopSpeaking();
                setSoundEnabled(!soundEnabled);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                soundEnabled
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/40 hover:bg-cyan-500/30'
                  : 'bg-white/10 text-slate-400 border-white/20'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-300" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
              <span>{soundEnabled ? 'Giọng Nói: BẬT' : 'Giọng Nói: TẮT'}</span>
            </button>

            {isSpeaking && (
              <button
                onClick={stopSpeaking}
                className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md animate-pulse cursor-pointer"
              >
                <VolumeX className="w-4 h-4" />
                <span>Dừng Đọc</span>
              </button>
            )}
          </div>
        </div>

        {/* Categories Bar */}
        <div className="mt-6 pt-4 border-t border-indigo-800/70 flex gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-400 text-slate-950 font-black shadow-xs'
                  : 'bg-white/10 text-slate-300 hover:bg-white/15'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Preset Questions List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-black uppercase text-slate-500 tracking-wider">
              Chủ Đề & Câu Hỏi Trọng Tâm:
            </span>
            <span className="text-[11px] text-cyan-700 font-bold">{filteredQAs.length} câu</span>
          </div>

          <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredQAs.map(qa => {
              const isSelected = activeQA.id === qa.id;
              return (
                <button
                  key={qa.id}
                  onClick={() => handleSelectPredefinedQA(qa)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-sky-50 border-sky-400 shadow-xs ring-1 ring-sky-300 text-sky-950'
                      : 'bg-slate-50/70 border-slate-200 hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                    <span className="px-2 py-0.5 rounded-md bg-white border border-slate-200">
                      {qa.category}
                    </span>
                    {isSelected && <span className="text-sky-600 font-black">● Đang xem</span>}
                  </div>
                  <h4 className="text-xs sm:text-sm font-extrabold leading-snug">
                    {qa.question}
                  </h4>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Interactive Chat & Detailed Answer Box (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col justify-between space-y-4 min-h-[580px]">
          {/* Messages Stream */}
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[460px] pr-2">
            {chatHistory.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <img
                    src={kienSangAvatarImg}
                    alt="AI Kiến Sáng"
                    className="w-9 h-9 rounded-full object-cover border border-sky-200 shrink-0 mt-0.5 shadow-xs"
                  />
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm space-y-2.5 ${
                    msg.sender === 'user'
                      ? 'bg-sky-600 text-white font-medium rounded-br-none shadow-xs'
                      : 'bg-slate-50 text-slate-800 border border-slate-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                  {/* Concrete Example Box */}
                  {msg.example && (
                    <div className="bg-amber-50/90 border border-amber-200 p-3 rounded-xl text-xs text-amber-950">
                      <strong className="text-amber-900 block mb-0.5">📌 Ví dụ cụ thể trong thực tế:</strong>
                      {msg.example}
                    </div>
                  )}

                  {/* Follow-up suggestions */}
                  {msg.followUps && msg.followUps.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      <span className="text-[11px] font-black text-sky-800 uppercase block">
                        💡 Gợi ý câu hỏi đào sâu tiếp theo:
                      </span>
                      <div className="space-y-1">
                        {msg.followUps.map((f, i) => (
                          <button
                            key={i}
                            onClick={() => handleSendQuery(f)}
                            className="w-full text-left p-2 rounded-lg bg-white border border-sky-200 hover:bg-sky-50 text-[11px] text-sky-950 font-bold transition-colors flex items-center justify-between cursor-pointer"
                          >
                            <span>{f}</span>
                            <ArrowRight className="w-3 h-3 text-sky-600 shrink-0 ml-1" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {msg.sender === 'bot' && soundEnabled && (
                    <button
                      onClick={() => speakText(`${msg.text} ${msg.example || ''}`)}
                      className="text-[10px] text-sky-600 hover:text-sky-800 font-bold flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Nghe đọc lại câu trả lời này</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Voice Input & Query Input Box */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                  isListening
                    ? 'bg-rose-600 text-white border-rose-500 animate-pulse shadow-md ring-2 ring-rose-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
                title={isListening ? 'Đang lắng nghe... bấm để dừng' : 'Nói câu hỏi bằng micro (Voice Input)'}
              >
                {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5 text-sky-700" />}
              </button>

              <input
                type="text"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendQuery(userQuery);
                }}
                placeholder={isListening ? 'Đang lắng nghe giọng nói của bạn...' : 'Đặt câu hỏi về sông Mê Kông, phù sa, hạn mặn, Hậu Giang...'}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 text-slate-900"
              />

              <button
                onClick={() => handleSendQuery(userQuery)}
                className="p-3 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl transition-transform hover:scale-105 shadow-md cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span>🎙️ Hỗ trợ Voice Input (nhận diện giọng nói) & Voice Output (đọc tiếng Việt)</span>
              <span className="font-semibold text-sky-700">FPT Hậu Giang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
