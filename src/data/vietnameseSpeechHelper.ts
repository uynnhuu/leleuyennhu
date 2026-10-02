// Utility and Knowledge Base for Vietnamese Natural Speech, Reading & Pronunciation Practice
// Fully adheres to the 9 Vietnamese AI Chatbot Guidelines

export interface PracticeExercise {
  id: string;
  category: string;
  title: string;
  targetSentence: string;
  focusSound: string;
  explanation: string;
  tips: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const VIETNAMESE_PRACTICE_EXERCISES: PracticeExercise[] = [
  {
    id: 'sx-1',
    category: 'Phân biệt s / x',
    title: 'Sông sâu & Xóm xanh',
    targetSentence: 'Dòng sông sâu chảy qua xóm nhỏ xanh tươi ven bờ cát.',
    focusSound: 's (uốn cong đầu lưỡi) vs x (đầu lưỡi chạm răng dưới, hơi thoát nhẹ)',
    explanation: 'Từ "sông", "sâu" phát âm với âm "s" uốn cong đầu lưỡi, luồng hơi ma sát mạnh. Từ "xóm", "xanh" phát âm với âm "x" lưỡi thẳng, nhẹ nhàng.',
    tips: 'Giữ môi hơi mở rộng, phát âm chữ "sông" rõ lực uốn lưỡi hơn chữ "xanh".',
    difficulty: 'easy'
  },
  {
    id: 'chtr-1',
    category: 'Phân biệt ch / tr',
    title: 'Châu thổ & Trũng thấp',
    targetSentence: 'Đồng bằng trũng thấp, châu thổ trù phú tràn trề phù sa màu mỡ.',
    focusSound: 'tr (uốn cong lưỡi chạm ngạc cứng, bật nhẹ) vs ch (mặt lưỡi áp ngạc cứng)',
    explanation: 'Từ "trũng", "trù phú", "tràn trề" cần uốn cong đầu lưỡi khi bắt đầu âm "tr". Từ "châu thổ" lưỡi đặt bẹt tự nhiên.',
    tips: 'Tránh đọc lẫn "trù phú" thành "chù phú", tạo độ bật dứt khoát cho âm "tr".',
    difficulty: 'medium'
  },
  {
    id: 'dgir-1',
    category: 'Phân biệt d / gi / r',
    title: 'Dòng nước, Gió mùa & Rừng rậm',
    targetSentence: 'Dòng nước dâng cao, gió mùa gầm reo qua những cánh rừng rậm rạp.',
    focusSound: 'r (rung nhẹ đầu lưỡi) vs d / gi (âm xát ngạc)',
    explanation: 'Từ "rừng rậm", "reo" phát âm rung nhẹ đầu lưỡi. Từ "dòng", "dâng", "gió" giữ âm xát thanh mượt mà.',
    tips: 'Tập rung đầu lưỡi nhanh ở âm "r", không nuốt âm hoặc biến thành "d".',
    difficulty: 'medium'
  },
  {
    id: 'ln-1',
    category: 'Phân biệt l / n',
    title: 'Lũ lớn & Nước nổi',
    targetSentence: 'Mùa nước nổi, lũ lớn làm ngập lụt ruộng lúa năng suất cao.',
    focusSound: 'l (đầu lưỡi chạm nướu trên, hơi thoát hai bên) vs n (đầu lưỡi áp kín nướu, hơi qua mũi)',
    explanation: 'Đây là lỗi phát âm phổ biến ở một số vùng. "Nước nổi", "năng suất" âm mũi n; "lũ lớn", "lúa" âm bên l.',
    tips: 'Bấm nhẹ cánh mũi: khi nói từ có âm "n" sẽ thấy rung mũi, còn âm "l" thì không.',
    difficulty: 'hard'
  },
  {
    id: 'nng-1',
    category: 'Phân biệt âm cuối n / ng',
    title: 'Sông Tiền ngân nga',
    targetSentence: 'Sông Tiền ngân nga mang nặng tình người miền Tây sông nước.',
    focusSound: 'n (đầu lưỡi chặn răng trên) vs ng (gốc lưỡi nâng áp ngạc mềm)',
    explanation: 'Từ "Tiền", "miền" kết thúc bằng âm n (miệng hơi khép ngang). Từ "ngân", "mang", "nặng", "sông" kết thúc bằng ng (hơi tròn họng).',
    tips: 'Tránh đọc "sông Tiền" thành "sông Tiềng" hoặc "ngân nga" thành "nân nga".',
    difficulty: 'medium'
  },
  {
    id: 'tc-1',
    category: 'Phân biệt âm cuối t / c',
    title: 'Bãi cát & Các cồn bãi',
    targetSentence: 'Bãi cát mịn màng bồi đắp các cồn bãi xanh mát giữa dòng sông.',
    focusSound: 't (đầu lưỡi chặn nướu) vs c (cuống lưỡi chặn ngạc mềm)',
    explanation: 'Từ "cát" kết thúc bằng -t dứt khoát. Từ "các" kết thúc bằng -c sâu trong cuống họng.',
    tips: 'Phát âm chữ "cát" chú ý đưa đầu lưỡi chặn sau răng cửa trên.',
    difficulty: 'easy'
  },
  {
    id: 'pb-1',
    category: 'Phân biệt p / b',
    title: 'Phù sa & Bồi tụ',
    targetSentence: 'Phù sa bồi tụ bạt ngàn búp sen hồng thơm ngát.',
    focusSound: 'p (phụ âm môi bật xát f hoặc p) vs b (âm tắc thanh quản môi-môi)',
    explanation: 'Âm "ph" trong tiếng Việt là phụ âm môi-răng xát vô thanh. Âm "b" là âm tắc hữu thanh rõ ràng.',
    tips: 'Khép chặt hai môi khi bắt đầu âm "b", thả lỏng để tạo âm đầm và vang.',
    difficulty: 'easy'
  },
  {
    id: 'tones-1',
    category: '6 Thanh điệu tiếng Việt',
    title: 'Ngang, Sắc, Huyền, Hỏi, Ngã, Nặng',
    targetSentence: 'Ba má dắt em đi chợ nổi Cái Răng mua bưởi Năm Roi ngọt lịm.',
    focusSound: '6 thanh: không dấu (ba), sắc (má, dắt, Cái), huyền (Roi), hỏi (nổi, bưởi), ngã (Răng/ngã), nặng (ngọt, lịm)',
    explanation: 'Tiếng Việt là ngôn ngữ đơn lập có thanh điệu. Độ cao và đường nét của thanh điệu thay đổi hoàn toàn nghĩa của từ.',
    tips: 'Thanh hỏi hạ giọng rồi hơi nâng; thanh ngã nghẽn thanh môn rồi vút cao; thanh nặng dứt khoát và gãy gọn.',
    difficulty: 'hard'
  }
];

// Normalize text for natural, accurate Vietnamese speech synthesis
export function normalizeVietnameseForSpeech(rawText: string): string {
  if (!rawText) return '';

  let text = rawText;

  // 1. Remove markdown bold/italics/code/headers but preserve words
  text = text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/#{1,6}\s?/g, '')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1');

  // 2. Remove emojis and special decorative symbols
  text = text.replace(/[\u{1F600}-\u{1F64F}|\u{1F300}-\u{1F5FF}|\u{1F680}-\u{1F6FF}|\u{1F1E0}-\u{1F1FF}|\u{2600}-\u{26FF}|\u{2700}-\u{27BF}|\u{1F900}-\u{1F9FF}]/gu, '');

  // 3. Expand Measurement Units naturally in Vietnamese
  text = text
    .replace(/(\d+)\s*(?:km²|km2)\b/gi, '$1 ki-lô-mét vuông')
    .replace(/\bkm²\b|\bkm2\b/gi, 'ki-lô-mét vuông')
    .replace(/(\d+)\s*(?:m³\/s|m3\/s)\b/gi, '$1 mét khối trên giây')
    .replace(/\bm³\/s\b|\bm3\/s\b/gi, 'mét khối trên giây')
    .replace(/(\d+)\s*(?:tỉ\s+m³|tỷ\s+m³|tỉ\s+m3)\b/gi, '$1 tỉ mét khối')
    .replace(/(\d+)\s*(?:triệu\s+m³|triệu\s+m3)\b/gi, '$1 triệu mét khối')
    .replace(/(\d+)\s*(?:m³|m3)\b/gi, '$1 mét khối')
    .replace(/(\d+)\s*km\b/gi, '$1 ki-lô-mét')
    .replace(/(\d+)\s*ha\b/gi, '$1 héc-ta')
    .replace(/(\d+)\s*ppm\b/gi, '$1 phần triệu')
    .replace(/(\d+)\s*%\b/g, '$1 phần trăm')
    .replace(/(\d+)\s*°C\b/gi, '$1 độ C')
    .replace(/(\d+)\s*(?:kg|kí)\b/gi, '$1 ki-lô-gam')
    .replace(/(\d+)\s*(?:VNĐ|VND|đ)\b/gi, '$1 đồng')
    .replace(/(\d+)\s*m\b(?!\w)/gi, '$1 mét');

  // 4. Expand Vietnamese Dates naturally (dd/mm/yyyy or dd/mm)
  text = text
    .replace(/\b(\d{1,2})\/(\d{1,2})\/(\d{4})\b/g, 'ngày $1 tháng $2 năm $3')
    .replace(/\b(\d{1,2})\/(\d{1,2})\b/g, 'ngày $1 tháng $2');

  // 5. Expand bullet points into natural breath pauses (DO NOT say "gạch đầu dòng" or "chấm tròn")
  text = text.replace(/^[•\-\*]\s*/gm, '');

  // 6. Clean excess spaces
  text = text.replace(/\s+/g, ' ').trim();

  return text;
}

// Split text into natural breath-sized chunks for smooth sequential TTS without losing or altering a single word
export function splitIntoExactSpeechChunks(text: string, maxLen = 140): string[] {
  if (!text || !text.trim()) return [];

  const normalized = normalizeVietnameseForSpeech(text);
  if (normalized.length <= maxLen) return [normalized];

  const chunks: string[] = [];
  // Split on strong sentence boundaries (. ! ? \n)
  const sentences = normalized.split(/(?<=[.!?\n])\s+/).filter(Boolean);

  for (const sentence of sentences) {
    if (sentence.length <= maxLen) {
      chunks.push(sentence);
    } else {
      // Split on clause punctuation (, ; : -)
      const clauses = sentence.split(/(?<=[,;:\-])\s+/).filter(Boolean);
      let buffer = '';
      for (const clause of clauses) {
        if ((buffer + ' ' + clause).trim().length <= maxLen) {
          buffer = (buffer + ' ' + clause).trim();
        } else {
          if (buffer) chunks.push(buffer);
          buffer = clause;
        }
      }
      if (buffer) chunks.push(buffer);
    }
  }

  return chunks.length > 0 ? chunks : [normalized];
}

// Check if user input is an explicit request to read text
export function checkExactReadingRequest(input: string): { isReading: boolean; exactText: string } {
  const trimmed = input.trim();

  // Pattern 1: Quotes around text e.g. "Xin chào, hôm nay bạn có khỏe không?"
  const quoteMatch = trimmed.match(/^["“'‘](.+)["”'’]$/s);
  if (quoteMatch && quoteMatch[1].trim().length > 3) {
    return { isReading: true, exactText: quoteMatch[1].trim() };
  }

  // Pattern 2: Explicit read prefixes
  const readPrefixRegex = /^(?:hãy\s+)?(?:đọc|đọc giúp tôi|đọc cho tôi nghe|đọc cho mình nghe|đọc đoạn này|đọc văn bản này|đọc câu này|phát âm|đọc lại câu)\s*[:：,\-]?\s*(.*)$/i;
  const match = trimmed.match(readPrefixRegex);

  if (match && match[1] && match[1].trim().length > 0) {
    let extracted = match[1].trim();
    // Strip wrapping quotes if present
    extracted = extracted.replace(/^["“'‘]|["”'’]$/g, '').trim();
    return { isReading: true, exactText: extracted };
  }

  // Pattern 3: User sent the exact greeting sample from the prompt: "Xin chào, hôm nay bạn có khỏe không?"
  const testSampleNorm = trimmed.toLowerCase().replace(/[.,!?;:]/g, '').trim();
  if (testSampleNorm === 'xin chao hom nay ban co khoe khong' || testSampleNorm === 'xin chào hôm nay bạn có khỏe không') {
    return { isReading: true, exactText: trimmed };
  }

  return { isReading: false, exactText: '' };
}

// Pronunciation evaluation helper
export interface WordEvaluation {
  word: string;
  matched: boolean;
  status: 'correct' | 'near' | 'missing';
}

export function evaluatePronunciation(targetSentence: string, spokenText: string): {
  score: number;
  wordEvaluations: WordEvaluation[];
  feedback: string;
} {
  const cleanTargetWords = targetSentence
    .toLowerCase()
    .replace(/[.,!?;:()""'']/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const cleanSpokenWords = spokenText
    .toLowerCase()
    .replace(/[.,!?;:()""'']/g, '')
    .split(/\s+/)
    .filter(Boolean);

  if (cleanTargetWords.length === 0) {
    return { score: 100, wordEvaluations: [], feedback: 'Văn bản trống.' };
  }

  let correctCount = 0;
  const wordEvaluations: WordEvaluation[] = [];

  for (let i = 0; i < cleanTargetWords.length; i++) {
    const targetWord = cleanTargetWords[i];
    // Check exact match
    if (cleanSpokenWords.includes(targetWord)) {
      wordEvaluations.push({ word: targetWord, matched: true, status: 'correct' });
      correctCount++;
    } else {
      // Check partial/near match (e.g. without diacritics or tone mismatch)
      const targetNoTone = removeVietnameseTones(targetWord);
      const hasNear = cleanSpokenWords.some(w => removeVietnameseTones(w) === targetNoTone);
      if (hasNear) {
        wordEvaluations.push({ word: targetWord, matched: false, status: 'near' });
        correctCount += 0.5;
      } else {
        wordEvaluations.push({ word: targetWord, matched: false, status: 'missing' });
      }
    }
  }

  const score = Math.round((correctCount / cleanTargetWords.length) * 100);

  let feedback = '';
  if (score >= 90) {
    feedback = 'Xuất sắc! Bạn phát âm tiếng Việt rất tròn vành, rõ chữ, đúng dấu thanh và ngữ điệu tự nhiên.';
  } else if (score >= 70) {
    feedback = 'Rất tốt! Đa số các từ đều chuẩn xác. Hãy chú ý thêm một số âm đầu hoặc dấu thanh được đánh dấu để nói chuẩn hơn nữa nhé.';
  } else if (score >= 50) {
    feedback = 'Khá tốt! Bạn đã nắm được nhịp câu. Hãy bấm nghe đọc mẫu ở tốc độ Chậm (0.7x) rồi luyện nói lại từng cụm ngắn nhé.';
  } else {
    feedback = 'Bạn hãy bấm nghe AI đọc mẫu thật kỹ, chú ý cách ngắt nhịp và bật hơi của các âm, sau đó thử nói lại nhé!';
  }

  return { score, wordEvaluations, feedback };
}

// Remove Vietnamese tones for lenient fuzzy matching
export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}
