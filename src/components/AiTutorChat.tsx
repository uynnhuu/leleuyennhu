import React, { useState, useEffect, useRef } from 'react';
import { 
  KIEN_SANG_INFO, 
  KIEN_SANG_KNOWLEDGE_BASE, 
  QUICK_SUPPORT_CHIPS 
} from '../data/kienSangKnowledge';
import {
  VIETNAMESE_PRACTICE_EXERCISES,
  PracticeExercise,
  normalizeVietnameseForSpeech,
  splitIntoExactSpeechChunks,
  checkExactReadingRequest,
  evaluatePronunciation,
  WordEvaluation
} from '../data/vietnameseSpeechHelper';
import { 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Square, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  User,
  Settings,
  Info,
  Radio,
  Copy,
  Check,
  Headphones,
  School,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  Play,
  Pause,
  SkipForward,
  Rewind,
  BookOpen,
  Volume1,
  GraduationCap,
  FileText,
  Sliders,
  Award,
  Layers,
  HelpCircle
} from 'lucide-react';
import kienSangAvatarImg from '../assets/images/kien_sang_avatar_1789694565810.jpg';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isExactReading?: boolean;
  quickAction?: {
    label: string;
    actionType: 'navigate' | 'game' | 'support';
    target: string;
  };
}

interface AiTutorChatProps {
  onNavigateTab?: (tab: 'knowledge' | 'globe' | 'map' | 'vietnam' | 'games' | 'tourism' | 'prompts' | 'assistant') => void;
  onResetPoints?: () => void;
}

type ChatbotState = 'idle' | 'listening' | 'processing' | 'speaking';
type MainAppMode = 'chat' | 'reading_studio' | 'speaking_coach';

// Recognize voice commands in natural Vietnamese
function detectVoiceCommand(query: string): string | null {
  const norm = query.toLowerCase().trim().replace(/[.,!?;:]/g, '');
  
  if (
    norm === 'dừng đọc' || 
    norm === 'dừng lại' || 
    norm === 'ngừng đọc' || 
    norm === 'dừng' || 
    norm === 'im lặng' || 
    norm === 'thôi không đọc nữa' || 
    norm === 'stop'
  ) {
    return 'STOP';
  }
  if (norm === 'tạm dừng' || norm === 'pause' || norm === 'dừng một lát' || norm === 'tạm ngưng') {
    return 'PAUSE';
  }
  if (norm === 'tiếp tục' || norm === 'resume' || norm === 'đọc tiếp' || norm === 'tiếp tục đọc') {
    return 'RESUME';
  }
  if (norm === 'đọc lại' || norm === 'đọc lại câu trả lời' || norm === 'nghe lại' || norm === 'đọc lại đi') {
    return 'REPLAY_LAST';
  }
  if (norm === 'đọc từ đầu' || norm === 'từ đầu' || norm === 'đọc lại từ đầu' || norm === 'bắt đầu lại') {
    return 'RESTART_CURRENT';
  }
  if (norm === 'bỏ qua đoạn này' || norm === 'bỏ qua' || norm === 'đoạn tiếp theo' || norm === 'qua đoạn này' || norm === 'tiếp theo' || norm === 'skip') {
    return 'SKIP_CHUNK';
  }
  if (norm === 'đọc chậm hơn' || norm === 'nói chậm lại' || norm === 'chậm hơn' || norm === 'nói chậm hơn' || norm === 'đọc chậm lại') {
    return 'SLOWER';
  }
  if (norm === 'đọc nhanh hơn' || norm === 'nói nhanh lên' || norm === 'nhanh hơn' || norm === 'nói nhanh hơn' || norm === 'đọc nhanh lên') {
    return 'FASTER';
  }
  if (norm === 'đọc thông tin này' || norm === 'đọc nội dung này' || norm === 'đọc cái này' || norm === 'đọc bài này') {
    return 'READ_CURRENT';
  }
  return null;
}

export const AiTutorChat: React.FC<AiTutorChatProps> = ({ 
  onNavigateTab,
  onResetPoints 
}) => {
  // Mode selection: 'chat' | 'reading_studio' | 'speaking_coach'
  const [activeMode, setActiveMode] = useState<MainAppMode>('chat');

  // Messages in Chat Mode
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Xin chào bạn! Mình là **Kiến Sáng** 🐜 – Trợ lý AI học tập tiếng Việt của **Trường TH, THCS, THPT FPT Hậu Giang** (61C ấp 6, xã Vị Thủy, TP.Cần Thơ).

Mình được thiết kế để trò chuyện tự nhiên, đọc chuẩn xác văn bản và hỗ trợ bạn luyện phát âm tiếng Việt:
• 💬 **Hội thoại Tự nhiên**: Hỏi đáp kiến thức Địa lí 11 Sông Mê Công & ĐBSCL, trò chuyện thân mật như người Việt Nam.
• 📖 **Đọc Văn Bản 100% Nguyên Bản**: Khi bạn yêu cầu *"Đọc: ..."* hoặc gửi văn bản, mình sẽ đọc chuẩn xác toàn bộ, giữ trọn dấu câu, không tự ý sửa, thêm từ hay dịch sang tiếng Anh.
• 🗣️ **Chế Độ Luyện Nói**: Luyện các cặp âm dễ nhầm (*s/x, ch/tr, d/gi/r, l/n, n/ng, t/c, p/b*) và 6 thanh điệu, có chấm điểm và nhận xét chi tiết.
• 🎤 **Điều khiển Giọng Nói**: Hỗ trợ lệnh *"Tạm dừng"*, *"Tiếp tục"*, *"Dừng đọc"*, *"Đọc chậm hơn"*, *"Đọc lại"*.

Bạn muốn trò chuyện, yêu cầu mình đọc một đoạn văn hay cùng luyện phát âm nhé?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickAction: {
        label: '🔊 Nghe Kiến Sáng đọc tiếng Việt mẫu',
        actionType: 'support',
        target: 'test_voice'
      }
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [botState, setBotState] = useState<ChatbotState>('idle');
  const [isAutoSpeak, setIsAutoSpeak] = useState(true);
  const [speechPitch, setSpeechPitch] = useState(1.0);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [supportStatus, setSupportStatus] = useState<string | null>(null);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [micError, setMicError] = useState<string | null>(null);
  const [isTtsSupported, setIsTtsSupported] = useState(true);

  // Audio Queue, Voice Engine & Playback State
  const [voiceEngine, setVoiceEngine] = useState<'cloud' | 'webspeech'>('cloud');
  const [availableVnVoices, setAvailableVnVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceName, setSelectedVoiceName] = useState<string>('');
  const [readingQueue, setReadingQueue] = useState<string[]>([]);
  const [currentChunkIndex, setCurrentChunkIndex] = useState<number>(0);
  const [isReadingPaused, setIsReadingPaused] = useState<boolean>(false);
  const [currentlyReadingMsgId, setCurrentlyReadingMsgId] = useState<string | null>(null);
  const [currentSpokenSnippet, setCurrentSpokenSnippet] = useState<string>('');
  const [voiceCommandFeedback, setVoiceCommandFeedback] = useState<string | null>(null);

  // Studio Mode State (Dedicated Exact Reading Mode)
  const [studioText, setStudioText] = useState<string>(
    'Xin chào, hôm nay bạn có khỏe không? Sông Mê Kông dài 4.763 km, bắt nguồn từ cao nguyên Tây Tạng ở độ cao gần 5.000 m và đổ ra Biển Đông qua hệ thống 9 cửa sông Cửu Long màu mỡ.'
  );

  // Speaking Coach State (Pronunciation Practice Mode)
  const [selectedExercise, setSelectedExercise] = useState<PracticeExercise>(VIETNAMESE_PRACTICE_EXERCISES[0]);
  const [customPracticeText, setCustomPracticeText] = useState<string>('');
  const [isCoachListening, setIsCoachListening] = useState<boolean>(false);
  const [coachSpokenTranscript, setCoachSpokenTranscript] = useState<string>('');
  const [coachEvaluation, setCoachEvaluation] = useState<{
    score: number;
    wordEvaluations: WordEvaluation[];
    feedback: string;
  } | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const queueRef = useRef<string[]>([]);
  const chunkIndexRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const activeMsgIdRef = useRef<string | null>(null);
  const speechRateRef = useRef<number>(1.0);
  const speechPitchRef = useRef<number>(1.0);
  const voiceEngineRef = useRef<'cloud' | 'webspeech'>('cloud');

  // Sync refs with states
  useEffect(() => {
    queueRef.current = readingQueue;
  }, [readingQueue]);

  useEffect(() => {
    chunkIndexRef.current = currentChunkIndex;
  }, [currentChunkIndex]);

  useEffect(() => {
    isPausedRef.current = isReadingPaused;
  }, [isReadingPaused]);

  useEffect(() => {
    activeMsgIdRef.current = currentlyReadingMsgId;
  }, [currentlyReadingMsgId]);

  useEffect(() => {
    speechRateRef.current = speechRate;
  }, [speechRate]);

  useEffect(() => {
    speechPitchRef.current = speechPitch;
  }, [speechPitch]);

  useEffect(() => {
    voiceEngineRef.current = voiceEngine;
  }, [voiceEngine]);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeMode === 'chat') {
      scrollToBottom();
    }
  }, [messages, botState, interimTranscript, activeMode]);

  // Check TTS Support and initialize Web Speech voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const voices = window.speechSynthesis.getVoices();
        const vnVoices = voices.filter(v => 
          v.lang.toLowerCase().startsWith('vi') || 
          v.name.toLowerCase().includes('vietnam') ||
          v.name.toLowerCase().includes('tiếng việt') ||
          v.name.toLowerCase().includes('hoaimy') ||
          v.name.toLowerCase().includes('an') ||
          v.name.toLowerCase().includes('namminh') ||
          v.name.toLowerCase().includes('linh')
        );
        setAvailableVnVoices(vnVoices);
        if (vnVoices.length > 0 && !selectedVoiceName) {
          setSelectedVoiceName(vnVoices[0].name);
        }
      }
    };

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      setIsTtsSupported(true);
      window.speechSynthesis.onvoiceschanged = updateVoices;
      updateVoices();
    } else {
      setIsTtsSupported(false);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Web Speech playback chunk
  const playChunkWebSpeech = (chunks: string[], index: number, msgId: string, textToSpeak: string) => {
    if (!synthRef.current) {
      setIsTtsSupported(false);
      return;
    }

    synthRef.current.cancel();

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'vi-VN';
    utterance.rate = speechRateRef.current;
    utterance.pitch = speechPitchRef.current;

    const voices = synthRef.current.getVoices();
    let vietnameseVoice = selectedVoiceName 
      ? voices.find(v => v.name === selectedVoiceName)
      : null;

    if (!vietnameseVoice) {
      vietnameseVoice = voices.find(v => 
        v.lang.toLowerCase().startsWith('vi') || 
        v.name.toLowerCase().includes('vietnam') ||
        v.name.toLowerCase().includes('tiếng việt') ||
        v.name.toLowerCase().includes('hoaimy') ||
        v.name.toLowerCase().includes('an') ||
        v.name.toLowerCase().includes('namminh') ||
        v.name.toLowerCase().includes('linh')
      );
    }

    // If no Vietnamese voice is available in the browser/OS, automatically use Cloud Vietnamese Engine
    if (!vietnameseVoice) {
      playChunkCloud(chunks, index, msgId, textToSpeak);
      return;
    }

    utterance.voice = vietnameseVoice;

    utterance.onstart = () => {
      setBotState('speaking');
      setIsReadingPaused(false);
      setCurrentChunkIndex(index);
      setCurrentlyReadingMsgId(msgId);
      setCurrentSpokenSnippet(textToSpeak);
    };

    utterance.onend = () => {
      if (isPausedRef.current) return;
      setTimeout(() => {
        if (!isPausedRef.current && activeMsgIdRef.current === msgId) {
          playChunk(queueRef.current, index + 1, msgId);
        }
      }, 250);
    };

    utterance.onerror = (e) => {
      if (e.error !== 'canceled' && e.error !== 'interrupted') {
        console.warn('Web Speech API note:', e.error);
      }
      if (!isPausedRef.current && activeMsgIdRef.current === msgId && index + 1 < chunks.length) {
        setTimeout(() => playChunk(queueRef.current, index + 1, msgId), 200);
      } else {
        stopReading();
      }
    };

    synthRef.current.speak(utterance);
  };

  // Cloud Natural Vietnamese playback chunk
  const playChunkCloud = (chunks: string[], index: number, msgId: string, textToSpeak: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const encoded = encodeURIComponent(textToSpeak.trim().slice(0, 180));
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encoded}`;
      const audio = new Audio(audioUrl);
      audio.playbackRate = speechRateRef.current;
      audioRef.current = audio;

      audio.onplay = () => {
        setBotState('speaking');
        setIsReadingPaused(false);
        setCurrentChunkIndex(index);
        setCurrentlyReadingMsgId(msgId);
        setCurrentSpokenSnippet(textToSpeak);
      };

      audio.onended = () => {
        if (isPausedRef.current) return;
        setTimeout(() => {
          if (!isPausedRef.current && activeMsgIdRef.current === msgId) {
            playChunk(queueRef.current, index + 1, msgId);
          }
        }, 220);
      };

      audio.onerror = (err) => {
        console.warn('Cloud audio fallback to Web Speech:', err);
        playChunkWebSpeech(chunks, index, msgId, textToSpeak);
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Autoplay restricted by browser, attempting fallback:', err);
          playChunkWebSpeech(chunks, index, msgId, textToSpeak);
        });
      }
    } catch (e) {
      playChunkWebSpeech(chunks, index, msgId, textToSpeak);
    }
  };

  // Play a specific chunk from the queue (Router between Cloud and Web Speech)
  const playChunk = (chunks: string[], index: number, msgId: string) => {
    if (index >= chunks.length) {
      // Finished all chunks
      stopReading();
      return;
    }

    const textToSpeak = chunks[index];
    if (!textToSpeak.trim()) {
      // Skip empty chunk
      playChunk(chunks, index + 1, msgId);
      return;
    }

    // Cancel existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }

    setBotState('speaking');
    setIsReadingPaused(false);
    setCurrentChunkIndex(index);
    setCurrentlyReadingMsgId(msgId);
    setCurrentSpokenSnippet(textToSpeak);

    if (voiceEngineRef.current === 'cloud') {
      playChunkCloud(chunks, index, msgId, textToSpeak);
    } else {
      playChunkWebSpeech(chunks, index, msgId, textToSpeak);
    }
  };

  // Start reading a full message from a given chunk index (Preserving 100% text!)
  const startReadingMessage = (rawText: string, msgId: string, startIndex: number = 0) => {
    const chunks = splitIntoExactSpeechChunks(rawText);
    setReadingQueue(chunks);
    setCurrentChunkIndex(startIndex);
    setCurrentlyReadingMsgId(msgId);
    setIsReadingPaused(false);

    playChunk(chunks, startIndex, msgId);
  };

  // Pause reading
  const pauseReading = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsReadingPaused(true);
    setBotState('idle');
    triggerFeedback('⏸️ Đã tạm dừng đọc');
  };

  // Resume reading
  const resumeReading = () => {
    setIsReadingPaused(false);
    if (readingQueue.length > 0 && currentlyReadingMsgId) {
      if (voiceEngineRef.current === 'cloud' && audioRef.current && audioRef.current.paused && audioRef.current.currentTime > 0 && !audioRef.current.ended) {
        audioRef.current.play().then(() => {
          setBotState('speaking');
          triggerFeedback('▶️ Đang tiếp tục đọc...');
        }).catch(() => {
          playChunk(readingQueue, currentChunkIndex, currentlyReadingMsgId);
        });
      } else {
        playChunk(readingQueue, currentChunkIndex, currentlyReadingMsgId);
        triggerFeedback('▶️ Đang tiếp tục đọc...');
      }
    } else {
      // Find latest bot message
      const latestBot = [...messages].reverse().find(m => m.sender === 'bot');
      if (latestBot) {
        startReadingMessage(latestBot.text, latestBot.id, 0);
        triggerFeedback('▶️ Đang đọc câu trả lời...');
      }
    }
  };

  // Stop reading
  const stopReading = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setBotState('idle');
    setCurrentlyReadingMsgId(null);
    setCurrentSpokenSnippet('');
    setIsReadingPaused(false);
    triggerFeedback('⏹️ Đã dừng đọc giọng nói');
  };

  // Skip to next chunk
  const skipToNextChunk = () => {
    if (readingQueue.length > 0 && currentlyReadingMsgId) {
      const nextIndex = currentChunkIndex + 1;
      if (nextIndex < readingQueue.length) {
        playChunk(readingQueue, nextIndex, currentlyReadingMsgId);
        triggerFeedback(`⏩ Chuyển sang đoạn ${nextIndex + 1}/${readingQueue.length}`);
      } else {
        stopReading();
        triggerFeedback('✅ Đã đọc xong toàn bộ nội dung');
      }
    }
  };

  // Restart from beginning
  const restartFromBeginning = () => {
    if (readingQueue.length > 0 && currentlyReadingMsgId) {
      playChunk(readingQueue, 0, currentlyReadingMsgId);
      triggerFeedback('⏪ Đọc lại từ đầu nội dung');
    } else {
      const latestBot = [...messages].reverse().find(m => m.sender === 'bot');
      if (latestBot) {
        startReadingMessage(latestBot.text, latestBot.id, 0);
        triggerFeedback('⏪ Đọc lại từ đầu');
      }
    }
  };

  // Adjust reading speed
  const adjustSpeechRate = (newRate: number) => {
    const clamped = Math.min(1.5, Math.max(0.7, +newRate.toFixed(2)));
    setSpeechRate(clamped);
    speechRateRef.current = clamped;
    if (audioRef.current) {
      audioRef.current.playbackRate = clamped;
    }
    triggerFeedback(`⚡ Tốc độ đọc: ${clamped}x`);

    // If currently speaking, re-read current chunk with new rate
    if (botState === 'speaking' && readingQueue.length > 0 && currentlyReadingMsgId) {
      playChunk(readingQueue, currentChunkIndex, currentlyReadingMsgId);
    }
  };

  // Quick feedback toast
  const triggerFeedback = (msg: string) => {
    setVoiceCommandFeedback(msg);
    setTimeout(() => {
      setVoiceCommandFeedback(null);
    }, 2800);
  };

  // Speech-To-Text helper (Chat Mode)
  const startListening = async () => {
    setMicError(null);
    stopReading();

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMicError('Trình duyệt của bạn chưa hỗ trợ nhận diện giọng nói trực tiếp. Bạn có thể nhập câu hỏi bằng bàn phím hoặc dùng Chrome / Edge.');
      return;
    }

    if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
      } catch (permErr: any) {
        setMicError('Chưa được cấp quyền Microphone. Hãy bấm vào biểu tượng 🔒 hoặc 🎙️ trên thanh địa chỉ để Cho phép (Allow) hoặc bấm "Thử câu hỏi mẫu" bên dưới.');
        setBotState('idle');
        return;
      }
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {
          // ignore
        }
      }

      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;

      recognition.lang = 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setBotState('listening');
        setInterimTranscript('');
      };

      recognition.onresult = (event: any) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setInterimTranscript(currentText);

        if (event.results[0] && event.results[0].isFinal) {
          const finalPrompt = event.results[0][0].transcript.trim();
          if (finalPrompt) {
            handleProcessInput(finalPrompt);
          }
        }
      };

      recognition.onspeechend = () => {
        try {
          recognition.stop();
        } catch (e) {
          // ignore
        }
      };

      recognition.onend = () => {
        if (botState === 'listening') {
          setBotState('idle');
        }
      };

      recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') {
          setMicError('Microphone đang bị chặn hoặc chưa được cấp quyền. Bạn có thể cấp quyền trên thanh địa chỉ để trò chuyện bằng giọng nói.');
        } else if (event.error === 'no-speech') {
          setMicError('Chưa nhận được âm thanh giọng nói. Bạn hãy thử bấm micro và nói lại nhé!');
        } else if (event.error === 'aborted') {
          // ignore
        } else {
          setMicError(`Thông báo nhận diện giọng nói: ${event.error}`);
        }
        setBotState('idle');
      };

      recognition.start();
    } catch (err: any) {
      setMicError('Không thể kích hoạt micro vào lúc này. Bạn hãy thử tải lại trang hoặc nhập câu hỏi.');
      setBotState('idle');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setBotState('idle');
    }
  };

  // Master handler for Voice Command or Question Input
  const handleProcessInput = (rawInput: string) => {
    const query = rawInput.trim();
    if (!query) return;

    // 1. Check if user input is a Voice Control Command
    const command = detectVoiceCommand(query);

    if (command) {
      if (command === 'STOP') {
        stopReading();
      } else if (command === 'PAUSE') {
        pauseReading();
      } else if (command === 'RESUME') {
        resumeReading();
      } else if (command === 'REPLAY_LAST') {
        const latestBot = [...messages].reverse().find(m => m.sender === 'bot');
        if (latestBot) {
          startReadingMessage(latestBot.text, latestBot.id, 0);
          triggerFeedback('🔄 Đang đọc lại câu trả lời gần nhất');
        }
      } else if (command === 'RESTART_CURRENT') {
        restartFromBeginning();
      } else if (command === 'SKIP_CHUNK') {
        skipToNextChunk();
      } else if (command === 'SLOWER') {
        adjustSpeechRate(speechRate - 0.15);
      } else if (command === 'FASTER') {
        adjustSpeechRate(speechRate + 0.15);
      } else if (command === 'READ_CURRENT') {
        const latestBot = [...messages].reverse().find(m => m.sender === 'bot');
        if (latestBot) {
          startReadingMessage(latestBot.text, latestBot.id, 0);
          triggerFeedback('🔊 Đang đọc nội dung câu trả lời');
        }
      }
      setInputValue('');
      setInterimTranscript('');
      return;
    }

    // 2. Otherwise, standard or exact-reading generation
    handleSendMessage(query);
  };

  // Generate Intelligent Response adhering strictly to the 9 Vietnamese AI Chatbot Guidelines
  const generateAiAnswer = (query: string): { reply: string; isExactReading?: boolean; action?: any } => {
    const lower = query.toLowerCase().trim();

    // -------------------------------------------------------------
    // RULE 2, 6, 9: EXACT READING REQUEST CHECK
    // If user explicitly asks to read, or provides text e.g. "Xin chào, hôm nay bạn có khỏe không?"
    // MUST keep 100% exact content, NO translation, NO summarizing, NO alterations!
    // -------------------------------------------------------------
    const readingCheck = checkExactReadingRequest(query);
    if (readingCheck.isReading) {
      return {
        reply: readingCheck.exactText,
        isExactReading: true
      };
    }

    // Casual Greeting & Conversational Intention (Rule 1, 8: Natural Vietnamese Native Conversationalist)
    const casualGreetingKeywords = [
      'xin chào', 'chào bạn', 'chào kiến sáng', 'chào bạn ơi', 'hôm nay thế nào', 
      'bạn có khỏe không', 'bạn khỏe không', 'bạn tên gì', 'bạn là ai', 'giới thiệu bản thân'
    ];
    if (casualGreetingKeywords.some(kw => lower === kw || lower.startsWith(kw))) {
      return {
        reply: `Dạ chào bạn! Mình rất khỏe và vui khi được trò chuyện cùng bạn hôm nay. 

Mình là **Kiến Sáng** – trợ lý AI của **Trường TH, THCS, THPT FPT Hậu Giang**. Mình có thể:
1. 📖 **Đọc chính xác 100% văn bản**: Bạn chỉ cần gõ *"Đọc: [đoạn văn]"* hoặc sang tab "Đọc Văn Bản", mình sẽ đọc chuẩn xác toàn bộ bằng tiếng Việt rõ ràng, giữ trọn dấu câu.
2. 🗣️ **Cùng bạn luyện nói**: Luyện phát âm các âm dễ nhầm (*s/x, ch/tr, d/gi/r, l/n, n/ng, t/c, p/b*) và 6 thanh điệu tiếng Việt.
3. 🌊 **Giải đáp Chuyên đề Địa lí 11**: Sông Mê Kông 4.763 km, hệ thống 9 cửa sông Cửu Long, 5 thủ tục kỹ thuật của MRC.

Hôm nay bạn muốn cùng mình học tập hay đọc đoạn văn nào nè?`
      };
    }

    // Structured Knowledge Base Search
    const matched = KIEN_SANG_KNOWLEDGE_BASE.find(k => 
      k.keywords.some(kw => lower.includes(kw))
    );

    if (matched) {
      return { reply: matched.reply, action: matched.quickAction };
    }

    // Specific Domain Intents (Geography 11 - Mekong)
    if (lower.includes('9 cửa') || lower.includes('chín cửa') || lower.includes('cửa sông') || lower.includes('cửu long')) {
      return {
        reply: `🐉 **Hệ thống 9 Cửa Sông Cửu Long tại Việt Nam (Chuyên đề Địa lí 11)**:

Khi sông Mê Kông chảy vào lãnh thổ Việt Nam tại An Giang, dòng sông phân thành hai nhánh chính:
• **Nhánh Sông Tiền (6 cửa sông)**:
1. Cửa Tiểu (Tiền Giang)
2. Cửa Đại (Tiền Giang và Bến Tre)
3. Cửa Ba Lai (năm 2002 đã xây cống đập ngăn mặn ngọt hóa Bến Tre)
4. Cửa Hàm Luông (Bến Tre)
5. Cửa Cổ Chiên (Bến Tre và Trà Vinh)
6. Cửa Cung Hầu (Trà Vinh)

• **Nhánh Sông Hậu (3 cửa sông)**:
7. Cửa Định An (Trà Vinh và Sóc Trăng, luồng tàu biển trọng tải lớn ra vào cảng Cần Thơ)
8. Cửa Bát Xắc (Bassac, nay đã bị phù sa bồi lắng tự nhiên thành đất liền)
9. Cửa Trần Đề (Sóc Trăng, cảng cá và bến tàu cao tốc đi Côn Đảo)

*Ý nghĩa địa lí*: Dù mang tên Cửu Long (9 con rồng), hiện nay thực tế chỉ còn 7 đến 8 cửa thông ra biển. Bạn có thể mở mục "Bản Đồ Lưu Vực" để xem sơ đồ trực quan!`,
        action: {
          label: 'Xem Sơ Đồ 9 Cửa Sông',
          actionType: 'navigate',
          target: 'map'
        }
      };
    }

    if (lower.includes('fpt') || lower.includes('trường') || lower.includes('hậu giang') || lower.includes('vị thủy')) {
      return {
        reply: `🏫 **Trường TH, THCS, THPT FPT Hậu Giang**:
• **Địa chỉ**: 61C ấp 6, xã Vị Thủy, TP.Cần Thơ.
• Trường nằm bên cạnh dòng kênh xáng Xà No lịch sử – trục giao thương lúa gạo trọng yếu của vùng châu thổ miền Tây.
• Dự án bản đồ và trợ lý học tập này được xây dựng để giúp các bạn học sinh khối 11 tiếp thu Chuyên đề Sông Mê Công một cách trực quan, hiện đại nhất!`,
        action: {
          label: 'Xem Điểm Du Lịch Kênh Xà No',
          actionType: 'navigate',
          target: 'tourism'
        }
      };
    }

    // Natural Conversational Assistant Fallback
    return {
      reply: `Cảm ơn bạn đã hỏi Kiến Sáng về: "${query}".

Dựa trên Chuyên đề Địa lí 11 về **Sông Mê Kông & Đồng Bằng Sông Cửu Long**:
• Chiều dài toàn tuyến: **4.763 km** (xếp hạng 12 thế giới, thứ 3 châu Á).
• Lưu vực: **810.000 km²** qua 6 quốc gia: Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và Việt Nam.
• Hạ lưu: Đổ ra Biển Đông qua hệ thống 9 cửa sông Cửu Long (6 cửa sông Tiền và 3 cửa sông Hậu).
• Hợp tác quốc tế: Ủy hội MRC giám sát 5 thủ tục kỹ thuật bắt buộc để bảo đảm an ninh tài nguyên nước.

Nếu bạn muốn nghe mình đọc câu này hoặc muốn luyện nói tiếng Việt, hãy bấm nút nghe hoặc chuyển sang tab "Luyện Nói" nhé!`
    };
  };

  // Handle Send Message
  const handleSendMessage = (queryText: string) => {
    const query = queryText.trim();
    if (!query) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setInterimTranscript('');
    setBotState('processing');

    setTimeout(() => {
      const { reply, isExactReading, action } = generateAiAnswer(query);

      const botMsgId = `bot-${Date.now()}`;
      const botMsg: ChatMessage = {
        id: botMsgId,
        sender: 'bot',
        text: reply,
        isExactReading,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction: action
      };

      setMessages(prev => [...prev, botMsg]);

      // Automatically read response if enabled or if user explicitly requested reading
      const userAskedToRead = isExactReading || query.toLowerCase().includes('đọc') || query.toLowerCase().includes('nói') || query.toLowerCase().includes('tiếng việt');
      if (isAutoSpeak || userAskedToRead) {
        startReadingMessage(reply, botMsgId, 0);
      } else {
        setBotState('idle');
      }
    }, 500);
  };

  const handleTriggerAction = (action: { label: string; actionType: 'navigate' | 'game' | 'support'; target: string }) => {
    if (action.actionType === 'navigate' || action.actionType === 'game') {
      if (action.target === 'knowledge') {
        if (onNavigateTab) onNavigateTab('knowledge');
      } else if (action.target === 'globe') {
        if (onNavigateTab) onNavigateTab('globe');
      } else if (action.target === 'tourism') {
        if (onNavigateTab) onNavigateTab('tourism');
      } else if (action.target === 'map') {
        if (onNavigateTab) onNavigateTab('map');
      } else if (action.target === 'vietnam') {
        if (onNavigateTab) onNavigateTab('vietnam');
      }
    } else if (action.actionType === 'support' && action.target === 'reset_points') {
      if (onResetPoints) onResetPoints();
      setSupportStatus('Đã khôi phục 100 Điểm Thám Hiểm Chào Mừng thành công!');
      setTimeout(() => setSupportStatus(null), 3000);
    } else if (action.actionType === 'support' && action.target === 'test_voice') {
      const sampleText = "Dạ, Kiến Sáng kính chào bạn! Mình là trợ lý AI học tập Trường FPT Hậu Giang, đang đọc bằng giọng nói tiếng Việt chuẩn, phát âm tự nhiên và truyền cảm.";
      startReadingMessage(sampleText, `voice-test-${Date.now()}`, 0);
      triggerFeedback('🔊 Đang đọc mẫu bằng giọng tiếng Việt');
    }
  };

  // Dedicated Studio: Start Exact Reading
  const handleStartStudioReading = () => {
    if (!studioText.trim()) return;
    startReadingMessage(studioText.trim(), 'studio-reading', 0);
    triggerFeedback('🔊 Đang đọc chính xác 100% văn bản');
  };

  // Speaking Coach: Start Model Pronunciation Reading
  const handlePlayModelPronunciation = (speed: number = speechRate) => {
    const textToSpeak = customPracticeText.trim() || selectedExercise.targetSentence;
    // Set custom speech rate for this practice session
    speechRateRef.current = speed;
    startReadingMessage(textToSpeak, 'coach-model', 0);
    triggerFeedback(`🔊 Đọc mẫu phát âm (${speed}x)`);
  };

  // Speaking Coach: Start User Speaking Recognition
  const handleStartCoachListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Trình duyệt chưa hỗ trợ ghi âm trực tiếp. Hãy sử dụng Google Chrome hoặc Microsoft Edge.');
      return;
    }

    stopReading();
    setCoachSpokenTranscript('');
    setCoachEvaluation(null);

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setIsCoachListening(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setCoachSpokenTranscript(transcript);

        if (event.results[0] && event.results[0].isFinal) {
          const finalSpoken = event.results[0][0].transcript.trim();
          setIsCoachListening(false);
          const target = customPracticeText.trim() || selectedExercise.targetSentence;
          const evalResult = evaluatePronunciation(target, finalSpoken);
          setCoachEvaluation(evalResult);
        }
      };

      recognition.onerror = () => {
        setIsCoachListening(false);
      };

      recognition.onend = () => {
        setIsCoachListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsCoachListening(false);
    }
  };

  const sampleApiIntegrationCode = `// Tích hợp Gemini 3.8 Flash & TTS Tiếng Việt Chuẩn (9 Quy Tắc Chatbot)
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function askKienSang(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.8-flash",
    contents: prompt,
    config: {
      systemInstruction: \`Bạn là AI chatbot giao tiếp bằng tiếng Việt của Trường TH, THCS, THPT FPT Hậu Giang.
Nhiệm vụ: Trò chuyện tự nhiên, đọc văn bản và phát âm tiếng Việt rõ ràng, chuẩn và dễ nghe.
- Luôn ưu tiên tiếng Việt, không tự ý chuyển sang tiếng Anh.
- Khi người dùng yêu cầu đọc đoạn văn: giữ nguyên 100% nội dung, không dịch, không tóm tắt, không sửa câu.
- Phát âm đầy đủ 6 dấu thanh: ngang, sắc, huyền, hỏi, ngã, nặng.
- Phân biệt rõ các âm dễ nhầm: s/x, ch/tr, d/gi/r, l/n, n/ng, t/c, p/b.\`
    }
  });
  return response.text;
}`;

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      {/* Voice Command Feedback Toast */}
      {voiceCommandFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold border border-orange-500/50 animate-bounce">
          <Radio className="w-4 h-4 text-orange-400 animate-pulse" />
          <span>{voiceCommandFeedback}</span>
        </div>
      )}

      {/* Top Mode Navigation Tabs: Chat, Exact Reading Studio, Speaking Coach */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setActiveMode('chat')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'chat'
                ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>💬 Hội Thoại Tự Nhiên</span>
          </button>

          <button
            onClick={() => setActiveMode('reading_studio')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'reading_studio'
                ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>📖 Đọc Văn Bản 100% Nguyên Bản</span>
          </button>

          <button
            onClick={() => setActiveMode('speaking_coach')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeMode === 'speaking_coach'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>🗣️ Chế Độ Luyện Nói & Phát Âm</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowConfigModal(true)}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5 text-orange-600" />
            <span>Cấu hình Giọng Đọc</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: CHATBOT GIAO TIẾP TỰ NHIÊN                                        */}
      {/* ========================================================================= */}
      {activeMode === 'chat' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden flex flex-col h-[650px] sm:h-[720px]">
          {/* Header with Mascot & Status */}
          <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 p-4 text-white flex items-center justify-between shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              {/* Mascot Avatar with Active Ring */}
              <div className="relative">
                <img 
                  src={kienSangAvatarImg} 
                  alt="Kiến Sáng FPT" 
                  className={`w-12 h-12 rounded-full object-cover border-2 border-white shadow-md ring-2 transition-all ${
                    botState === 'speaking'
                      ? 'ring-white scale-105 shadow-orange-300 animate-pulse'
                      : 'ring-orange-300'
                  }`}
                />
                {/* Animated Status Dot */}
                <span 
                  className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full ring-2 ring-white ${
                    botState === 'listening' 
                      ? 'bg-red-500 animate-ping' 
                      : botState === 'speaking' 
                      ? 'bg-emerald-400 animate-pulse ring-emerald-200' 
                      : botState === 'processing' 
                      ? 'bg-amber-300 animate-bounce' 
                      : 'bg-emerald-400'
                  }`} 
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-black text-base sm:text-lg tracking-tight flex items-center gap-1.5">
                    <span>Chatbot Kiến Sáng</span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">
                      Chuẩn Tiếng Việt
                    </span>
                  </h2>
                </div>
                <p className="text-orange-100 text-xs">
                  Trường TH, THCS, THPT FPT Hậu Giang (61C ấp 6, xã Vị Thủy)
                </p>
              </div>
            </div>

            {/* Right Status Indicator & Audio Controls */}
            <div className="flex items-center gap-2">
              {/* Current State Badge */}
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all shadow-2xs ${
                botState === 'listening'
                  ? 'bg-red-500 text-white animate-pulse'
                  : botState === 'processing'
                  ? 'bg-amber-400 text-slate-950'
                  : botState === 'speaking'
                  ? 'bg-emerald-600 text-white animate-pulse'
                  : isReadingPaused
                  ? 'bg-amber-500 text-white'
                  : 'bg-white/20 text-white'
              }`}>
                {botState === 'listening' && <Mic className="w-3.5 h-3.5 animate-spin" />}
                {botState === 'processing' && <Sparkles className="w-3.5 h-3.5 animate-spin" />}
                {botState === 'speaking' && <Radio className="w-3.5 h-3.5 animate-pulse" />}
                {isReadingPaused && <Pause className="w-3.5 h-3.5" />}
                {botState === 'idle' && !isReadingPaused && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />}
                <span>
                  {botState === 'listening' ? 'Đang nghe...' : 
                   botState === 'processing' ? 'Đang xử lý...' : 
                   botState === 'speaking' ? `🔊 Đang đọc... (${currentChunkIndex + 1}/${readingQueue.length || 1})` : 
                   isReadingPaused ? '⏸️ Tạm dừng' : 'Sẵn sàng'}
                </span>
              </div>

              {/* Auto Speak Toggle */}
              <button
                onClick={() => {
                  if (botState === 'speaking') stopReading();
                  setIsAutoSpeak(!isAutoSpeak);
                  triggerFeedback(isAutoSpeak ? '🔇 Đã tắt tự động đọc' : '🔊 Đã bật tự động đọc');
                }}
                title={isAutoSpeak ? "Tắt tự động đọc giọng nói" : "Bật tự động đọc giọng nói"}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isAutoSpeak 
                    ? 'bg-white text-orange-600 border-white hover:bg-orange-50' 
                    : 'bg-white/20 text-white border-white/30 hover:bg-white/30'
                }`}
              >
                {isAutoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* PERSISTENT AUDIO PLAYBACK CONTROL BAR (WHEN READING OR PAUSED) */}
          {(currentlyReadingMsgId !== null || isReadingPaused) && (
            <div className="bg-orange-600 text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-md border-b border-orange-700 animate-fadeIn">
              {/* Left info & progress */}
              <div className="flex items-center gap-2.5 min-w-0 flex-1">
                <div className="p-1.5 rounded-lg bg-white/20">
                  {botState === 'speaking' ? (
                    <Radio className="w-4 h-4 text-amber-200 animate-pulse" />
                  ) : (
                    <Pause className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xs">
                      {botState === 'speaking' ? '🔊 Đang phát âm thanh tiếng Việt' : '⏸️ Đang tạm dừng'}
                    </span>
                    <span className="text-[11px] bg-white/20 px-2 py-0.2 rounded-full font-bold">
                      Đoạn {currentChunkIndex + 1} / {readingQueue.length}
                    </span>
                    <span className="text-[11px] text-orange-200 hidden sm:inline">
                      ({speechRate}x)
                    </span>
                  </div>
                  {currentSpokenSnippet && (
                    <p className="text-[11px] text-orange-100 truncate mt-0.5 italic">
                      "{currentSpokenSnippet}"
                    </p>
                  )}
                </div>
              </div>

              {/* Reading Action Buttons: Restart, Play/Pause, Next, Stop, Speed */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={restartFromBeginning}
                  title="Đọc lại từ đầu (Nói 'Đọc từ đầu')"
                  className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                >
                  <Rewind className="w-4 h-4" />
                </button>

                {botState === 'speaking' ? (
                  <button
                    onClick={pauseReading}
                    title="Tạm dừng đọc (Nói 'Tạm dừng')"
                    className="px-3 py-1.5 rounded-lg bg-white text-orange-700 font-extrabold text-xs flex items-center gap-1 shadow-sm hover:bg-orange-50 cursor-pointer"
                  >
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Tạm dừng</span>
                  </button>
                ) : (
                  <button
                    onClick={resumeReading}
                    title="Tiếp tục đọc (Nói 'Tiếp tục')"
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1 shadow-sm hover:bg-emerald-600 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Tiếp tục</span>
                  </button>
                )}

                <button
                  onClick={skipToNextChunk}
                  title="Bỏ qua đoạn này (Nói 'Bỏ qua đoạn này')"
                  className="p-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors cursor-pointer"
                >
                  <SkipForward className="w-4 h-4" />
                </button>

                <button
                  onClick={stopReading}
                  title="Dừng đọc (Nói 'Dừng đọc')"
                  className="p-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white transition-colors ml-1 cursor-pointer"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>

                {/* Speed Controls */}
                <div className="flex items-center bg-white/15 rounded-lg p-0.5 ml-1 text-[11px]">
                  <button
                    onClick={() => adjustSpeechRate(speechRate - 0.15)}
                    title="Đọc chậm hơn"
                    className="px-1.5 py-0.5 hover:bg-white/20 rounded font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-1 font-bold">{speechRate}x</span>
                  <button
                    onClick={() => adjustSpeechRate(speechRate + 0.15)}
                    title="Đọc nhanh hơn"
                    className="px-1.5 py-0.5 hover:bg-white/20 rounded font-bold cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Suggestion Chips */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2.5 overflow-x-auto flex items-center gap-2 shrink-0 scrollbar-none">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide shrink-0">
              Gợi ý:
            </span>
            <button
              onClick={() => handleProcessInput('Xin chào, hôm nay bạn có khỏe không?')}
              className="px-3 py-1 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-300 text-xs font-bold whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
            >
              📖 "Xin chào, hôm nay bạn có khỏe không?"
            </button>
            <button
              onClick={() => handleProcessInput('Đọc: Sông Mê Kông dài 4.763 km, lưu vực 810.000 km².')}
              className="px-3 py-1 rounded-full bg-white hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 border border-slate-200 text-slate-700 text-xs font-medium whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
            >
              📖 Yêu cầu đọc văn bản mẫu
            </button>
            {QUICK_SUPPORT_CHIPS.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleProcessInput(chip)}
                className="px-3 py-1 rounded-full bg-white hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 border border-slate-200 text-slate-700 text-xs font-medium whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Status banner when listening */}
          {botState === 'listening' && (
            <div className="bg-red-50 border-b border-red-200 px-4 py-2.5 flex items-center justify-between text-xs text-red-700 animate-pulse">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-600 animate-ping" />
                <span className="font-bold">Đang nghe bạn nói... (Nói câu hỏi hoặc lệnh: "Tạm dừng", "Đọc lại", "Dừng đọc")</span>
                {interimTranscript && (
                  <span className="italic text-slate-700 font-medium">"{interimTranscript}"</span>
                )}
              </div>
              <button
                onClick={stopListening}
                className="px-2.5 py-0.5 rounded-md bg-red-600 text-white font-bold text-[11px] hover:bg-red-700 cursor-pointer"
              >
                Dừng lại & Gửi
              </button>
            </div>
          )}

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
            {messages.map((m) => {
              const isUser = m.sender === 'user';
              const isThisMsgReading = currentlyReadingMsgId === m.id && (botState === 'speaking' || isReadingPaused);

              return (
                <div
                  key={m.id}
                  className={`flex gap-3 max-w-[88%] sm:max-w-[82%] ${
                    isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  {/* Avatar Icon */}
                  {isUser ? (
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 font-bold text-xs shadow-xs">
                      <User className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="relative shrink-0">
                      <img
                        src={kienSangAvatarImg}
                        alt="Kiến Sáng"
                        className={`w-8 h-8 rounded-full object-cover border border-orange-300 shadow-xs transition-all ${
                          isThisMsgReading ? 'ring-2 ring-orange-500 scale-110' : ''
                        }`}
                      />
                      {isThisMsgReading && botState === 'speaking' && (
                        <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full ring-1 ring-white animate-ping" />
                      )}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`rounded-2xl p-4 text-xs sm:text-sm shadow-xs transition-all ${
                      isUser
                        ? 'bg-orange-600 text-white rounded-tr-none'
                        : `bg-white text-slate-800 border rounded-tl-none ${
                            isThisMsgReading 
                              ? 'border-orange-500 ring-2 ring-orange-200 bg-orange-50/10' 
                              : 'border-slate-200'
                          }`
                    }`}
                  >
                    {!isUser && (
                      <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-slate-100">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="font-extrabold text-orange-600 text-[11px]">
                            Kiến Sáng (FPT Schools)
                          </span>
                          {m.isExactReading && (
                            <span className="text-[10px] text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full font-bold border border-teal-200">
                              📖 Đọc nguyên mẫu 100%
                            </span>
                          )}
                          {isThisMsgReading && (
                            <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full font-bold">
                              {botState === 'speaking' ? '🔊 Đang đọc...' : '⏸️ Tạm dừng'}
                            </span>
                          )}
                        </div>

                        {/* Read this message button */}
                        <div className="flex items-center gap-1">
                          {isThisMsgReading ? (
                            <>
                              <button
                                onClick={isReadingPaused ? resumeReading : pauseReading}
                                className="px-2 py-1 rounded-md text-[11px] bg-orange-100 text-orange-800 font-bold flex items-center gap-1 hover:bg-orange-200 transition-colors cursor-pointer"
                              >
                                {isReadingPaused ? <Play className="w-3 h-3 fill-current" /> : <Pause className="w-3 h-3 fill-current" />}
                                <span>{isReadingPaused ? 'Tiếp tục' : 'Tạm dừng'}</span>
                              </button>
                              <button
                                onClick={stopReading}
                                className="p-1 rounded-md text-[11px] bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"
                              >
                                <Square className="w-3 h-3 fill-current" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => startReadingMessage(m.text, m.id, 0)}
                              className="px-2 py-1 rounded-md text-[11px] text-slate-600 hover:text-orange-700 hover:bg-orange-50 font-medium flex items-center gap-1 border border-slate-200 transition-colors cursor-pointer"
                            >
                              <Volume2 className="w-3.5 h-3.5 text-orange-600" />
                              <span>Đọc câu này</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Message Body Content */}
                    <div className="whitespace-pre-line leading-relaxed">
                      {m.text}
                    </div>

                    {/* Quick Action Button if provided */}
                    {m.quickAction && (
                      <div className="mt-3 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => handleTriggerAction(m.quickAction!)}
                          className="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-800 font-bold text-xs border border-orange-200 transition-colors cursor-pointer"
                        >
                          <span>{m.quickAction.label}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
                        </button>
                      </div>
                    )}

                    <div className={`text-[10px] mt-1.5 text-right ${isUser ? 'text-orange-200' : 'text-slate-400'}`}>
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {botState === 'processing' && (
              <div className="flex items-center gap-3 mr-auto max-w-[80%]">
                <img
                  src={kienSangAvatarImg}
                  alt="Kiến Sáng"
                  className="w-8 h-8 rounded-full object-cover border border-orange-300 animate-pulse ring-2 ring-orange-300"
                />
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-3 shadow-xs flex items-center gap-2 text-xs text-orange-700 font-medium">
                  <Sparkles className="w-4 h-4 text-orange-600 animate-spin" />
                  <span>Kiến Sáng đang lắng nghe và chuẩn bị phản hồi...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Bar & Voice Controls */}
          <div className="p-3 sm:p-4 bg-white border-t border-slate-200 shrink-0 space-y-2">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleProcessInput(inputValue);
              }}
              className="flex items-center gap-2"
            >
              {/* Microphone Button */}
              <button
                type="button"
                onClick={botState === 'listening' ? stopListening : startListening}
                title={botState === 'listening' ? "Dừng ghi âm" : "Nói câu hỏi hoặc yêu cầu đọc bằng giọng nói"}
                className={`p-3 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer ${
                  botState === 'listening'
                    ? 'bg-red-600 text-white animate-pulse shadow-md ring-4 ring-red-200'
                    : 'bg-orange-50 text-orange-600 hover:bg-orange-100 border border-orange-200'
                }`}
              >
                {botState === 'listening' ? (
                  <MicOff className="w-5 h-5 text-white" />
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>

              {/* Text Input Field */}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  botState === 'listening'
                    ? 'Đang nghe bạn nói... (Nói câu hỏi hoặc lệnh: "Tạm dừng", "Đọc lại", "Dừng đọc")'
                    : 'Nhập câu hỏi hoặc yêu cầu đọc (ví dụ: "Đọc: Xin chào hôm nay bạn có khỏe không?")...'
                }
                className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-slate-50"
              />

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputValue.trim() || botState === 'processing'}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-colors ${
                  inputValue.trim() && botState !== 'processing'
                    ? 'bg-orange-600 hover:bg-orange-700 text-white shadow-xs cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <span>Gửi</span>
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 px-1 gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold text-orange-700 flex items-center gap-1">
                  <Radio className="w-3.5 h-3.5" /> Lệnh giọng nói:
                </span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">"Tạm dừng"</span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">"Tiếp tục"</span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">"Dừng đọc"</span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">"Đọc lại"</span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">"Đọc chậm hơn"</span>
                <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">"Đọc nhanh hơn"</span>
              </div>
              <span className="hidden lg:inline text-slate-400">Trường FPT Hậu Giang • 61C ấp 6, Vị Thủy</span>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: ĐỌC VĂN BẢN 100% NGUYÊN BẢN (EXACT READING STUDIO)                 */}
      {/* ========================================================================= */}
      {activeMode === 'reading_studio' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-teal-600" />
                <span>Phòng Đọc Văn Bản Chuẩn 100% Nguyên Bản</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tuân thủ nghiêm ngặt Quy tắc 2, 6 và 9: Đọc chính xác từng từ, bảo toàn toàn bộ dấu câu và số liệu, không dịch, không tóm tắt hay thêm bớt.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Tốc độ đọc:</span>
              {[
                { label: '0.7x (Chậm)', val: 0.7 },
                { label: '1.0x (Chuẩn)', val: 1.0 },
                { label: '1.25x (Nhanh)', val: 1.25 }
              ].map((sp) => (
                <button
                  key={sp.val}
                  onClick={() => adjustSpeechRate(sp.val)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    Math.abs(speechRate - sp.val) < 0.05
                      ? 'bg-teal-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>

          {/* Textarea Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-700 font-semibold">
              <label>Nhập hoặc dán văn bản tiếng Việt bạn muốn AI đọc:</label>
              <span className="text-slate-400">{studioText.length} ký tự</span>
            </div>
            <textarea
              rows={5}
              value={studioText}
              onChange={(e) => setStudioText(e.target.value)}
              placeholder="Nhập bất kỳ đoạn văn tiếng Việt nào vào đây. AI sẽ đọc chính xác từng từ..."
              className="w-full p-4 rounded-xl border border-slate-300 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 text-sm leading-relaxed bg-slate-50 font-sans"
            />
          </div>

          {/* Quick preset texts */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Mẫu văn bản tiêu biểu:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setStudioText('Xin chào, hôm nay bạn có khỏe không?')}
                className="px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 border border-teal-200 text-xs font-semibold hover:bg-teal-100 transition-colors cursor-pointer"
              >
                Mẫu 1: "Xin chào, hôm nay bạn có khỏe không?"
              </button>
              <button
                onClick={() => setStudioText('Sông Mê Kông dài 4.763 km, bắt nguồn từ cao nguyên Tây Tạng ở độ cao gần 5.000 m. Diện tích lưu vực là 810.000 km², tổng lưu lượng nước bình quân đạt 475 tỉ m³ mỗi năm.')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                Mẫu 2: Đoạn văn Địa lí 11 có số liệu, km, m³, km²
              </button>
              <button
                onClick={() => setStudioText('Trường TH, THCS, THPT FPT Hậu Giang tọa lạc tại số 61C ấp 6, xã Vị Thủy, thành phố Cần Thơ, ngay bên dòng kênh xáng Xà No trăm năm lịch sử.')}
                className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-xs font-medium transition-colors cursor-pointer"
              >
                Mẫu 3: Giới thiệu Trường FPT Hậu Giang
              </button>
            </div>
          </div>

          {/* Player controls */}
          <div className="bg-teal-900 text-white p-4 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <button
                onClick={botState === 'speaking' ? pauseReading : handleStartStudioReading}
                className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs flex items-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
              >
                {botState === 'speaking' ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                <span>{botState === 'speaking' ? 'Tạm Dừng Đọc' : 'Bắt Đầu Đọc Văn Bản'}</span>
              </button>

              {currentlyReadingMsgId === 'studio-reading' && (
                <button
                  onClick={stopReading}
                  className="px-3 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Square className="w-3.5 h-3.5 fill-current" />
                  <span>Dừng hẳn</span>
                </button>
              )}
            </div>

            <div className="text-xs text-teal-200 flex items-center gap-3">
              <span>Động cơ: <strong className="text-white">{voiceEngine === 'cloud' ? 'Google Natural Cloud HD' : 'Web Speech Tiếng Việt'}</strong></span>
              <span>Tốc độ: <strong className="text-white">{speechRate}x</strong></span>
            </div>
          </div>

          {/* Visual Reading Segment Tracker */}
          {currentlyReadingMsgId === 'studio-reading' && readingQueue.length > 0 && (
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Tiến trình đọc ({currentChunkIndex + 1}/{readingQueue.length}):</span>
                <span className="text-teal-700">{Math.round(((currentChunkIndex + 1) / readingQueue.length) * 100)}%</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                {readingQueue.map((chunk, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      idx === currentChunkIndex
                        ? 'bg-teal-600 text-white font-black shadow-sm scale-105 animate-pulse'
                        : idx < currentChunkIndex
                        ? 'bg-emerald-100 text-emerald-800 line-through opacity-80'
                        : 'bg-white border border-slate-200 text-slate-600'
                    }`}
                  >
                    {chunk}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: CHẾ ĐỘ LUYỆN NÓI & PHÁT ÂM TIẾNG VIỆT (SPEAKING COACH)            */}
      {/* ========================================================================= */}
      {activeMode === 'speaking_coach' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-5 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h3 className="font-black text-slate-900 text-lg sm:text-xl flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-indigo-600" />
                <span>Huấn Luyện Viên Phát Âm & Luyện Nói Tiếng Việt</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Tuân thủ Quy tắc 3, 4 và 5: AI đọc mẫu trước ➔ Bạn nói lại qua micro ➔ Hệ thống so sánh đối chiếu âm khó và dấu thanh ➔ Nhận xét phát âm chi tiết.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-600">Tốc độ luyện:</span>
              {[
                { label: 'Chậm (0.7x)', val: 0.7 },
                { label: 'Chuẩn (1.0x)', val: 1.0 },
                { label: 'Nhanh (1.25x)', val: 1.25 }
              ].map((sp) => (
                <button
                  key={sp.val}
                  onClick={() => setSpeechRate(sp.val)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    Math.abs(speechRate - sp.val) < 0.05
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sp.label}
                </button>
              ))}
            </div>
          </div>

          {/* 8 Pronunciation Categories */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              Chọn nhóm âm luyện phát âm:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {VIETNAMESE_PRACTICE_EXERCISES.map((ex) => (
                <button
                  key={ex.id}
                  onClick={() => {
                    setSelectedExercise(ex);
                    setCustomPracticeText('');
                    setCoachEvaluation(null);
                    setCoachSpokenTranscript('');
                    stopReading();
                  }}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedExercise.id === ex.id && !customPracticeText
                      ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-300 text-indigo-950 font-bold shadow-xs'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="text-xs font-bold text-indigo-900">{ex.category}</div>
                  <div className="text-[11px] text-slate-500 truncate mt-0.5">{ex.title}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Active Exercise Card */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-5 rounded-2xl border border-indigo-200 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-indigo-800 uppercase tracking-wide">
                  Câu luyện tập mẫu:
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-200 text-indigo-900">
                  {selectedExercise.focusSound}
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 mt-1 leading-snug">
                "{customPracticeText.trim() || selectedExercise.targetSentence}"
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-white/80 backdrop-blur-xs p-3.5 rounded-xl border border-indigo-100">
              <div>
                <strong className="text-indigo-900 block mb-0.5">Khẩu hình & Cách phát âm:</strong>
                <p className="text-slate-600 leading-relaxed">{selectedExercise.explanation}</p>
              </div>
              <div>
                <strong className="text-indigo-900 block mb-0.5">Mẹo nói tự nhiên:</strong>
                <p className="text-slate-600 leading-relaxed">{selectedExercise.tips}</p>
              </div>
            </div>

            {/* Interactive Actions: Step 1 (AI Reads) and Step 2 (User Speaks) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {/* Step 1: AI Model Pronunciation */}
              <button
                onClick={() => handlePlayModelPronunciation(speechRate)}
                className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>1. Nghe AI Đọc Mẫu ({speechRate}x)</span>
              </button>

              {/* Step 2: User Speaks */}
              <button
                onClick={isCoachListening ? () => setIsCoachListening(false) : handleStartCoachListening}
                className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer ${
                  isCoachListening
                    ? 'bg-red-600 text-white animate-pulse ring-4 ring-red-200'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
              >
                {isCoachListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                <span>{isCoachListening ? 'Đang ghi âm... (Bấm để kết thúc)' : '2. Bắt Đầu Nói Theo'}</span>
              </button>

              <button
                onClick={() => {
                  const input = prompt('Nhập câu tiếng Việt tùy chọn bạn muốn luyện nói:', selectedExercise.targetSentence);
                  if (input && input.trim()) {
                    setCustomPracticeText(input.trim());
                    setCoachEvaluation(null);
                    setCoachSpokenTranscript('');
                  }
                }}
                className="px-3 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-xs cursor-pointer"
              >
                Tùy chọn câu khác...
              </button>
            </div>
          </div>

          {/* Real-time speech transcript from User */}
          {coachSpokenTranscript && (
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase">Âm thanh bạn vừa nói:</span>
              <p className="text-sm font-semibold text-slate-900 italic">
                "{coachSpokenTranscript}"
              </p>
            </div>
          )}

          {/* Pronunciation Evaluation & Phonetic Feedback */}
          {coachEvaluation && (
            <div className="p-5 rounded-2xl bg-white border-2 border-indigo-200 shadow-md space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <h5 className="font-black text-slate-900 text-sm">
                    Kết Quả Đánh Giá Phát Âm Tiếng Việt
                  </h5>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Độ chuẩn xác:</span>
                  <span className={`text-base font-black px-3 py-0.5 rounded-full ${
                    coachEvaluation.score >= 80 
                      ? 'bg-emerald-100 text-emerald-800' 
                      : coachEvaluation.score >= 50 
                      ? 'bg-amber-100 text-amber-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {coachEvaluation.score}%
                  </span>
                </div>
              </div>

              {/* Word-by-word visual breakdown */}
              <div>
                <span className="text-xs font-bold text-slate-600 block mb-1.5">
                  Chi tiết từng từ trong câu:
                </span>
                <div className="flex flex-wrap gap-2">
                  {coachEvaluation.wordEvaluations.map((w, idx) => (
                    <span
                      key={idx}
                      className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                        w.status === 'correct'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : w.status === 'near'
                          ? 'bg-amber-100 text-amber-800 border border-amber-300'
                          : 'bg-red-100 text-red-800 border border-red-300'
                      }`}
                    >
                      {w.word} {w.status === 'correct' ? '✓' : w.status === 'near' ? '⚠️' : '✗'}
                    </span>
                  ))}
                </div>
              </div>

              {/* Constructive feedback */}
              <div className="p-3.5 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950 font-medium leading-relaxed">
                <strong>Nhận xét từ Kiến Sáng:</strong> {coachEvaluation.feedback}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* CONFIGURATION & VOICE GUIDE MODAL                                         */}
      {/* ========================================================================= */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-orange-100 text-orange-700">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Cấu Hình Giọng Nói Tiếng Việt & Chuẩn 9 Quy Tắc
                  </h3>
                  <p className="text-xs text-slate-500">
                    Tùy chỉnh tốc độ, cao độ giọng đọc và động cơ phát âm tiếng Việt
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowConfigModal(false)}
                className="text-slate-400 hover:text-slate-700 font-bold text-lg px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Voice Control Settings */}
            <div className="space-y-4 bg-orange-50/60 p-4 rounded-xl border border-orange-200">
              <h4 className="font-bold text-xs uppercase tracking-wider text-orange-900 flex items-center gap-1.5">
                <Headphones className="w-4 h-4 text-orange-600" />
                Tùy Chỉnh Giọng Đọc Kiến Sáng:
              </h4>

              {/* Engine Selector */}
              <div className="space-y-2">
                <label className="text-xs text-slate-800 font-semibold block">
                  Động Cơ Giọng Đọc Tiếng Việt:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setVoiceEngine('cloud')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      voiceEngine === 'cloud'
                        ? 'bg-orange-100 border-orange-500 ring-2 ring-orange-300 text-orange-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-orange-900">
                      <span>🇻🇳 Giọng Tiếng Việt Tự Nhiên (Cloud HD)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-normal mt-1 leading-relaxed">
                      ★ Khuyên dùng: Phát âm chuẩn 100% tiếng Việt, ngắt nghỉ mượt mà, không phụ thuộc cấu hình máy.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVoiceEngine('webspeech')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      voiceEngine === 'webspeech'
                        ? 'bg-orange-100 border-orange-500 ring-2 ring-orange-300 text-orange-950 font-bold shadow-xs'
                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <span>🎙️ Giọng Thiết Bị (Web Speech API)</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-normal mt-1 leading-relaxed">
                      {availableVnVoices.length > 0 
                        ? `Tìm thấy ${availableVnVoices.length} giọng tiếng Việt trên hệ điều hành của bạn.` 
                        : 'Sử dụng bộ tổng hợp giọng nói của trình duyệt/thiết bị.'}
                    </p>
                  </button>
                </div>

                {voiceEngine === 'webspeech' && availableVnVoices.length > 0 && (
                  <div className="mt-2 bg-white p-2.5 rounded-lg border border-slate-200">
                    <label className="text-xs text-slate-700 font-medium block mb-1">
                      Chọn gói giọng đọc thiết bị:
                    </label>
                    <select
                      value={selectedVoiceName}
                      onChange={(e) => setSelectedVoiceName(e.target.value)}
                      className="w-full text-xs p-2 rounded-md border border-slate-300 bg-white"
                    >
                      {availableVnVoices.map((v) => (
                        <option key={v.name} value={v.name}>
                          {v.name} ({v.lang})
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-orange-200/60">
                <div>
                  <div className="flex justify-between text-slate-700 font-medium mb-1">
                    <span>Tốc độ đọc (Rate):</span>
                    <span className="font-bold text-orange-700">{speechRate}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.7"
                    max="1.5"
                    step="0.05"
                    value={speechRate}
                    onChange={(e) => adjustSpeechRate(parseFloat(e.target.value))}
                    className="w-full accent-orange-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>0.7x (Chậm)</span>
                    <span>1.0x (Chuẩn)</span>
                    <span>1.5x (Nhanh)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 font-medium mb-1">
                    <span>Cao độ giọng (Pitch):</span>
                    <span className="font-bold text-orange-700">{speechPitch}</span>
                  </div>
                  <input
                    type="range"
                    min="0.8"
                    max="1.3"
                    step="0.05"
                    value={speechPitch}
                    onChange={(e) => setSpeechPitch(parseFloat(e.target.value))}
                    className="w-full accent-orange-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                    <span>0.8 (Trầm)</span>
                    <span>1.0 (Chuẩn)</span>
                    <span>1.3 (Trong trẻo)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 9 Guidelines Summary */}
            <div className="space-y-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                9 Quy Tắc Cốt Lõi AI Chatbot Tiếng Việt:
              </h4>
              <ul className="space-y-1 text-[11px] list-disc list-inside text-slate-600">
                <li><strong>1. Ngôn ngữ:</strong> Ưu tiên tiếng Việt, không tự ý chuyển sang tiếng Anh.</li>
                <li><strong>2. Khả năng đọc:</strong> Đọc chính xác 100% nội dung, không bỏ từ, thêm từ, sửa câu.</li>
                <li><strong>3. Phát âm:</strong> Giọng Việt Nam chuẩn, giữ đủ 6 dấu thanh, phân biệt s/x, ch/tr, d/gi/r, l/n, n/ng, t/c, p/b.</li>
                <li><strong>4. Chế độ luyện nói:</strong> Đọc mẫu trước, yêu cầu nói lại, có chế độ chậm/chuẩn/nhanh.</li>
                <li><strong>5. Ngữ điệu:</strong> Ngắt nghỉ tự nhiên theo dấu câu, câu hỏi lên giọng nhẹ, câu kể rõ ràng.</li>
                <li><strong>6. Khi đọc văn bản:</strong> Giữ nguyên văn, không giải thích trước/sau, không đọc tên dấu câu.</li>
                <li><strong>7. Xử lý số & ngày tháng:</strong> Đọc km, m³/s, ha, % và ngày tháng theo tiếng Việt tự nhiên.</li>
                <li><strong>8. Phong cách:</strong> Thân thiện, tự nhiên như người Việt đang trò chuyện trực tiếp.</li>
                <li><strong>9. Nguyên tắc vàng:</strong> Giữ nguyên 100% nội dung khi được yêu cầu đọc.</li>
              </ul>
            </div>

            {/* Code Snippet for developers */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Mã Tích Hợp Gemini 3.8 Flash SDK:
                </h4>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(sampleApiIntegrationCode);
                    setCopiedCode(true);
                    setTimeout(() => setCopiedCode(false), 2000);
                  }}
                  className="flex items-center gap-1 text-xs text-orange-600 hover:text-orange-800 font-semibold cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedCode ? 'Đã sao chép!' : 'Sao chép mã'}</span>
                </button>
              </div>

              <pre className="p-3.5 bg-slate-900 text-sky-200 rounded-xl text-xs overflow-x-auto font-mono leading-relaxed max-h-40">
                {sampleApiIntegrationCode}
              </pre>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowConfigModal(false)}
                className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs cursor-pointer"
              >
                Đã Hiểu & Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
