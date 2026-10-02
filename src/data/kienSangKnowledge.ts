export interface KienSangResponse {
  id?: string;
  keywords: string[];
  reply: string;
  category: string;
  quickAction?: {
    label: string;
    actionType: 'navigate' | 'game' | 'support';
    target: string;
  };
}

export const KIEN_SANG_INFO = {
  name: 'Chatbot Kiến Sáng',
  fullName: 'Trợ Lý Học Tập & Hỗ Trợ Kỹ Thuật Kiến Sáng',
  school: 'Trường TH, THCS, THPT FPT Hậu Giang',
  address: '61C ấp 6, xã Vị Thủy, TP.Cần Thơ',
  version: '2.5 Smart AI Edition',
  mission: 'Đồng hành cùng học sinh TH, THCS, THPT FPT Hậu Giang chinh phục Chuyên đề Địa lí 11 - Sông Mê Công & Đồng bằng sông Cửu Long.'
};

export const KIEN_SANG_KNOWLEDGE_BASE: KienSangResponse[] = [
  {
    id: 'comp-1-knowledge',
    keywords: ['vị trí', 'phạm vi', 'lưu vực', 'các quốc gia', 'quốc gia liên quan', 'tây tạng', 'bắt nguồn', 'chuẩn 1'],
    category: 'Yêu Cầu Cần Đạt 1 (Chuẩn Địa Lí 11)',
    reply: `📍 **Yêu Cầu Cần Đạt 1: Xác định vị trí, phạm vi lưu vực và các quốc gia liên quan:**
1. **Vị trí khởi nguồn & Dòng chảy:** Bắt nguồn từ sơn nguyên Tây Tạng (Trung Quốc) ở độ cao gần 5.000 m, chảy qua 6 quốc gia theo hướng đông nam và nam ra Biển Đông với tổng chiều dài 4.763 km (thứ 12 thế giới, thứ 3 châu Á).
2. **Phạm vi diện tích lưu vực:** Đạt 810.000 km², chia thành 2 khu vực: Thượng lưu (núi cao, hẻm sâu hiểm trở) và Hạ lưu (châu thổ rộng, bồn trũng trù phú).
3. **Tỉ lệ lưu vực 6 quốc gia (MRC 2022):**
   - 🇱🇦 Lào: 25% (202.500 km² - lớn nhất)
   - 🇹🇭 Thái Lan: 23% (186.300 km²)
   - 🇨🇳 Trung Quốc: 21% (170.100 km²)
   - 🇰🇭 Cam-pu-chia: 20% (162.000 km²)
   - 🇻🇳 Việt Nam: 8% (64.800 km², nhưng chiếm 20% diện tích nước ta)
   - 🇲🇲 Mi-an-ma: 3% (24.300 km²)
4. **Tên gọi văn hóa:** Lan Thương Giang (Trung Quốc), Mê-nam Khong (Lào, Thái Lan), Tôn-lê Thơm (Campuchia), Sông Cửu Long - Tiền & Hậu (Việt Nam).`,
    quickAction: {
      label: 'Xem Chi Tiết 6 Nước Lưu Vực',
      actionType: 'navigate',
      target: 'knowledge'
    }
  },
  {
    id: 'comp-2-knowledge',
    keywords: ['vai trò', 'tự nhiên', 'kinh tế', 'xã hội', 'kinh tế xã hội', 'đa dạng sinh học', 'chuẩn 2'],
    category: 'Yêu Cầu Cần Đạt 2 (Chuẩn Địa Lí 11)',
    reply: `🌊 **Yêu Cầu Cần Đạt 2: Vai trò của sông Mê Công đối với tự nhiên và kinh tế – xã hội:**
1. **Đối với tự nhiên:**
   - Cung cấp nguồn nước ngọt khổng lồ (475 tỉ m³/năm), duy trì mạng lưới kênh rạch và điều hòa tiểu khí hậu.
   - Bồi đắp phù sa tạo nên đồng bằng châu thổ ĐBSCL trù phú bậc nhất Đông Nam Á.
   - Duy trì hệ sinh thái đất ngập nước và đa dạng sinh học thủy sinh xếp thứ 2 thế giới (sau Amazon): hơn 1.000 loài cá nước ngọt, 20.000 loài thực vật, 1.200 loài chim.
2. **Đối với kinh tế – xã hội:**
   - An ninh lương thực: Nuôi sống hơn 65 triệu dân hạ lưu (60% làm nông nghiệp), cấp nước tưới cho 10 triệu ha lúa.
   - Ngư trường nội địa số 1 thế giới: Sản lượng khai thác đạt ~4 triệu tấn/năm (chiếm 18% sản lượng nước ngọt toàn cầu).
   - Thủy điện: Tổng trữ năng tiềm năng ước tính 60.000 MW.
   - Giao thông thủy & Du lịch: Kết nối vận tải thủy quốc tế và phát triển du lịch sinh thái miệt vườn, văn hóa chợ nổi độc đáo.`,
    quickAction: {
      label: 'Mở Cẩm Nang Tự Nhiên & Kinh Tế',
      actionType: 'navigate',
      target: 'knowledge'
    }
  },
  {
    id: 'comp-3-knowledge',
    keywords: ['khai thác', 'sử dụng nguồn nước', 'vấn đề', 'thách thức', 'đập thủy điện', 'thiếu phù sa', 'sạt lở', 'hạn mặn', 'nước đói', 'chuẩn 3'],
    category: 'Yêu Cầu Cần Đạt 3 (Chuẩn Địa Lí 11)',
    reply: `⚠️ **Yêu Cầu Cần Đạt 3: Phân tích các vấn đề trong khai thác, sử dụng nguồn nước:**
1. **Tác động của chuỗi đập thủy điện thượng nguồn:**
   - Làm biến đổi chế độ dòng chảy tự nhiên, suy giảm đỉnh lũ và chậm nhịp nước nổi.
   - Giữ lại hơn 70% lượng bùn cát mịn và phù sa, gây ra hiện tượng "nước đói" làm xói lở dữ dội hàng ngàn điểm bờ sông Tiền, sông Hậu và bờ biển.
   - Ngăn chặn đường di cư sinh sản của các loài cá bản địa quý hiếm (cá tra dầu, cá hô...).
2. **Biến đổi khí hậu & Xâm nhập mặn lịch sử:**
   - Mùa khô kiệt kết hợp hiện tượng El Nino khiến ranh mặn 4‰ lấn sâu 70 - 100 km (các năm 2016, 2019-2020), làm tê liệt cấp nước sinh hoạt và hủy hoại nông nghiệp.
3. **Khai thác cát quá mức & Sụt lún đồng bằng:**
   - Hạ thấp cao trình lòng dẫn sông, sụt lún địa tầng trung bình 1 - 3 cm/năm (nhanh hơn tốc độ nước biển dâng).
4. **Mâu thuẫn lợi ích xuyên biên giới:**
   - Xung đột giữa nhu cầu phát điện, tích nước tưới tiêu ở thượng nguồn với nhu cầu an ninh nguồn nước, sinh kế hạ nguồn.`,
    quickAction: {
      label: 'Xem Thách Thức Nguồn Nước ĐBSCL',
      actionType: 'navigate',
      target: 'vietnam'
    }
  },
  {
    id: 'comp-4-knowledge',
    keywords: ['vai trò của ủy hội', 'ủy hội sông mê công', 'mrc', 'sự tham gia của việt nam', 'vai trò việt nam', '5 thủ tục', 'chuẩn 4'],
    category: 'Yêu Cầu Cần Đạt 4 (Chuẩn Địa Lí 11)',
    reply: `🏛️ **Yêu Cầu Cần Đạt 4: Vai trò của Ủy hội sông Mê Công (MRC) và sự tham gia của Việt Nam:**
1. **Vai trò của Ủy hội MRC:**
   - Thành lập ngày 5-4-1995 (Hiệp định Mê Công) giữa 4 nước: Việt Nam, Lào, Thái Lan, Campuchia; Trung Quốc và Myanmar là đối tác đối thoại.
   - Là cơ chế pháp lý liên chính phủ duy nhất điều phối phát triển bền vững tài nguyên nước lưu vực.
   - Ban hành và giám sát 5 Thủ tục kỹ thuật bắt buộc: PDIES (chia sẻ số liệu), PWUM (giám sát dùng nước), PNPCA (thông báo tham vấn thỏa thuận dự án dòng chính), PMFM (duy trì dòng chảy tối thiểu), PWQ (bảo vệ chất lượng nước).
2. **Sự tham gia và đóng góp của Việt Nam:**
   - Thành lập Ủy ban sông Mê Công Việt Nam từ năm 1978.
   - Đăng cai tổ chức thành công Hội nghị Cấp cao MRC lần thứ 2 (2014) tại TP.HCM.
   - Đảm nhiệm thành công vai trò Chủ tịch Hội đồng MRC vào các năm 2018 và 2022.
   - Chủ trì 2 dự án song phương xuyên biên giới quản lý nước với Campuchia (Sê San - Srêpôk và ĐBSCL).
   - Tiên phong tham gia Công ước Quốc tế Liên Hợp Quốc về nguồn nước xuyên biên giới 1997.`,
    quickAction: {
      label: 'Khám Phá 5 Thủ Tục MRC',
      actionType: 'navigate',
      target: 'knowledge'
    }
  },
  {
    id: 'comp-5-knowledge',
    keywords: ['liên hệ thực tiễn', 'thực tiễn', 'đbscl', 'đồng bằng sông cửu long', 'hậu giang', 'xà no', 'thuận thiên', '120', 'chuẩn 5'],
    category: 'Yêu Cầu Cần Đạt 5 (Chuẩn Địa Lí 11)',
    reply: `🌾 **Yêu Cầu Cần Đạt 5: Liên hệ thực tiễn Đồng bằng sông Cửu Long & Tỉnh Hậu Giang:**
1. **Thực tiễn ĐBSCL:**
   - Chiếm 12% GDP cả nước, cung ứng 90% gạo và 53% thủy sản xuất khẩu của Việt Nam.
   - Đột phá tư duy với **Nghị quyết 120/NQ-CP (2017)** của Chính phủ: Chuyển sang triết lý **"Thuận thiên"**, coi cả nước ngọt, lợ, mặn đều là tài nguyên quý giá để quy hoạch 3 vùng sinh thái (Ngọt - Chuyển tiếp - Mặn lợ).
   - Vận hành hệ thống cống ngăn mặn thông minh kiểm soát nguồn nước Cái Lớn - Cái Bé.
2. **Thực tiễn Tỉnh Hậu Giang:**
   - Là tâm điểm sông nước miền Tây, hưởng lợi trực tiếp từ **Kênh xáng Xà No** (đào 1901 - 1903): "Con đường lúa gạo miền Tây" lấy nước ngọt từ sông Hậu (Cần Thơ) thau chua rửa phèn cho Hậu Giang, Kiên Giang.
   - Chịu thách thức kép xâm nhập mặn từ 2 phía: Biển Đông (theo sông Hậu) và Biển Tây (theo sông Cái Lớn).
   - Tiên phong thực hiện Đề án 1 triệu ha lúa chất lượng cao phát thải thấp của Chính phủ.
3. **Dấu ấn Trường FPT Hậu Giang (61C ấp 6, xã Vị Thủy):**
   - Đưa kiến thức Chuyên đề Địa lí 11 vào bài giảng số hóa và AI Kiến Sáng, giáo dục học sinh bảo vệ môi trường nước sông ngòi quê hương!`,
    quickAction: {
      label: 'Xem Vị Trí Hậu Giang & NQ 120',
      actionType: 'navigate',
      target: 'vietnam'
    }
  },
  {
    keywords: ['hỗ trợ', 'help', 'giúp', 'cứu', 'hướng dẫn', 'làm sao', 'sử dụng'],
    category: 'Hỗ Trợ Kỹ Thuật & Sử Dụng',
    reply: `Chào bạn! Mình là Chatbot Kiến Sáng của Trường TH, THCS, THPT FPT Hậu Giang (địa chỉ: 61C ấp 6, xã Vị Thủy, TP.Cần Thơ). Mình có thể hỗ trợ bạn các nội dung sau:
1. 📖 Giải đáp kiến thức SGK Địa lí 11 (Ủy hội MRC, 5 thủ tục nước, chuỗi đập thủy điện, ĐBSCL).
2. 🌊 Khám phá 5 Yêu cầu cần đạt và bản đồ lưu vực Mê Kông.
3. 🗺️ Khám phá bản đồ số hóa và các địa điểm du lịch sinh thái ĐBSCL.
4. 🏆 Hướng dẫn nhận Giấy chứng nhận "Đại Sứ Sông Mê Công".
5. 🛠️ Reset điểm thám hiểm hoặc giải quyết lỗi hiển thị.
Bạn đang cần hỗ trợ vấn đề nào cụ thể?`,
    quickAction: {
      label: 'Mở Cẩm Nang SGK 11',
      actionType: 'navigate',
      target: 'knowledge'
    }
  },
  {
    keywords: ['trường', 'fpt', 'hậu giang', 'địa chỉ', 'vị thủy', 'cần thơ', '61c'],
    category: 'Thông Tin Nhà Trường',
    reply: `Dự án "Sông Mê Công" được phát triển phục vụ học tập tại:
🏫 Trường: TH, THCS, THPT FPT Hậu Giang
📍 Địa chỉ cập nhật: 61C ấp 6, xã Vị Thủy, TP.Cần Thơ (tọa lạc trên trục đường huyết mạch 61C nối liền Cần Thơ và Hậu Giang).
🌿 Trường nằm ngay cạnh dòng kênh xáng Xà No lịch sử - tuyến vận tải lúa gạo huyết mạch của Đồng bằng sông Cửu Long, mang đến không gian học tập công nghệ cao giữa thiên nhiên miệt vườn xanh mát!`,
    quickAction: {
      label: 'Xem Vị Trí Vị Thủy & ĐBSCL',
      actionType: 'navigate',
      target: 'tourism'
    }
  },
  {
    keywords: ['du lịch', 'hình ảnh', 'ảnh đẹp', 'cái răng', 'trà sư', 'sunset', 'hoàng hôn', 'miệt vườn'],
    category: 'Du Lịch Sinh Thái ĐBSCL',
    reply: `📸 Sông Mê Kông khi chảy vào Việt Nam đã tạo nên bức tranh du lịch sinh thái ĐBSCL vô cùng thơ mộng và trù phú:
1. Chợ nổi Cái Răng (Cần Thơ): Bức tranh giao thương rực rỡ buổi bình minh với hàng trăm ghe xuồng chở hoa quả nhiệt đới.
2. Rừng tràm Trà Sư (An Giang): Thảm bèo xanh biếc ngút ngàn của hệ sinh thái đất ngập nước mùa lũ.
3. Kênh xáng Xà No & Vị Thủy (Hậu Giang): Tuyến kênh lúa gạo trăm năm ngay cạnh trường FPT Hậu Giang với cảnh hoàng hôn vàng óng ả.
4. Cồn Phụng & Xứ Dừa Bến Tre: Trải nghiệm chèo xuồng rặng dừa nước và đờn ca tài tử.
Bạn hãy mở tab "Du Lịch ĐBSCL" trên thanh menu để chiêm ngưỡng bộ sưu tập ảnh do Google AI Studio tạo nhé!`,
    quickAction: {
      label: 'Xem Bộ Ảnh Du Lịch',
      actionType: 'navigate',
      target: 'tourism'
    }
  },
  {
    keywords: ['mrc', 'uỷ hội', 'ủy hội', 'thành lập', '1995', 'hiệp định'],
    category: 'Kiến Thức SGK Địa Lí 11',
    reply: `🏛️ Ủy hội sông Mê Công (Mekong River Commission - MRC):
- Tiền thân: Ủy ban Mê Công (1957) và Ủy ban Lâm thời (1978).
- Thành lập: Ngày 5-4-1995 tại Chiang Rai (Thái Lan), 4 quốc gia ký Hiệp định Hợp tác phát triển bền vững: Campuchia, Lào, Thái Lan, Việt Nam.
- Hai đối tác đối thoại: Trung Quốc và Myanmar.
- Mục tiêu: Thúc đẩy, phối hợp quản lý và phát triển bền vững tài nguyên nước và các tài nguyên liên quan vì lợi ích chung và an sinh cộng đồng (tr.9 SGK).`,
    quickAction: {
      label: 'Khám Phá Bản Đồ MRC',
      actionType: 'navigate',
      target: 'map'
    }
  },
  {
    keywords: ['5 thủ tục', 'thủ tục', 'pdies', 'pwum', 'pnpca', 'pmfm', 'pwq'],
    category: 'Kiến Thức SGK Địa Lí 11',
    reply: `📋 5 Thủ tục quan trọng của Ủy hội sông Mê Công (Hình 6, trang 10 SGK):
1. PDIES (2001): Trao đổi và chia sẻ thông tin số liệu.
2. PWUM (2003): Giám sát sử dụng nước trên dòng chính và nhánh sông.
3. PNPCA (2003): Thông báo, tham vấn trước và thoả thuận cho các dự án xây dựng hạ tầng nguồn nước lớn.
4. PMFM (2006): Duy trì dòng chảy thích hợp trên dòng chính (đặc biệt hồ Tôn-lê Sáp).
5. PWQ (2011): Giám sát và giữ gìn chất lượng nước sông Mê Công và sông Bát Xắc.`,
    quickAction: {
      label: 'Xem Chi Tiết 5 Thủ Tục',
      actionType: 'navigate',
      target: 'knowledge'
    }
  },
  {
    keywords: ['chiều dài', 'diện tích', 'lưu vực', '4763', '810000', '475'],
    category: 'Số Liệu Trọng Tâm SGK',
    reply: `📊 Các số liệu "nằm lòng" của sông Mê Công (SGK Địa lí 11):
- Chiều dài: khoảng 4.763 km (đứng thứ 12 thế giới, thứ 3 châu Á).
- Diện tích lưu vực: 810.000 km² (Lào 25%, Thái Lan 23%, Trung Quốc 21%, Campuchia 20%, Việt Nam 8%, Myanmar 3%).
- Tổng lượng dòng chảy hàng năm: 475 tỉ m³.
- Mùa lũ: tháng 6 đến tháng 11, chiếm tới 70 - 80% tổng lượng dòng chảy cả năm.
- Đa dạng sinh học: hơn 20.000 loài thực vật, 1.000 loài cá nước ngọt, 1.200 loài chim, 800 loài bò sát/lưỡng cư, 430 loài thú (lớn thứ 2 thế giới sau sông Amazon).`,
    quickAction: {
      label: 'Xem Trắc Diện & Bản Đồ',
      actionType: 'navigate',
      target: 'map'
    }
  },
  {
    keywords: ['nghị quyết 120', 'thuận thiên', '120/nq-cp', '120'],
    category: 'Chính Sách & Giải Pháp ĐBSCL',
    reply: `🌱 Nghị quyết 120/NQ-CP (ban hành năm 2017):
- Đánh dấu bước ngoặt tư duy: Chuyển từ "chống chọi, kiểm soát cực đoan" sang "Thuận thiên" (Living with nature).
- Coi nước mặn, nước lợ cũng là nguồn tài nguyên có giá trị kinh tế.
- Phân chia 3 vùng sinh thái: Vùng ngọt thượng nguồn (lúa chất lượng cao, cây ăn trái); Vùng chuyển tiếp (hồ trữ nước, cây hoa màu chịu hạn); Vùng ven biển mặn lợ (mô hình thông minh Lúa - Tôm và rừng ngập mặn).`,
    quickAction: {
      label: 'Xem Phân Tích Việt Nam',
      actionType: 'navigate',
      target: 'vietnam'
    }
  },
  {
    keywords: ['kiến thức', 'tài liệu', 'số liệu chuẩn', 'sgk', 'địa lí 11', 'kết nối tri thức', 'chuyên đề', 'trang 5', 'trang 6', 'trang 10', 'trang 14'],
    category: 'Cẩm Nang Tri Thức Chuẩn SGK Địa Lí 11',
    reply: `📖 Toàn bộ kiến thức và số liệu chuẩn xác 100% từ Chuyên đề học tập Địa lí 11 (bộ sách Kết nối tri thức với cuộc sống - NXB Giáo Dục Việt Nam, trang 5 – 19):
- Chiều dài: 4.763 km (thứ 12 thế giới, thứ 3 châu Á).
- Diện tích lưu vực: 810.000 km² (Lào 25%, Thái Lan 23%, TQ 21%, Campuchia 20%, VN 8%, Myanmar 3%).
- Lưu lượng dòng chảy: 475 tỉ m³/năm (mùa lũ chiếm 70-80%).
- Đa dạng sinh học: >1.000 loài cá ngọt (thứ 2 thế giới sau Amazon).
- 5 thủ tục kỹ thuật MRC: PDIES (2001), PWUM (2003), PNPCA (2003), PMFM (2006), PWQ (2011).
- Vai trò Việt Nam: ĐBSCL nuôi sống >17 triệu người, đóng góp 12% GDP, 90% gạo & 53% tôm cá xuất khẩu (năm 2020); Nghị quyết 120/NQ-CP triết lý "Thuận thiên".
Mời bạn bấm xem ngay mục "Kiến Thức SGK 11" trên thanh điều hướng!`,
    quickAction: {
      label: 'Mở Cẩm Nang Kiến Thức SGK',
      actionType: 'navigate',
      target: 'knowledge'
    }
  },
  {
    keywords: ['đọc tiếng việt', 'nói tiếng việt', 'giọng tiếng việt', 'chatbot đọc tiếng việt', 'tiếng việt', 'đọc giọng tiếng việt'],
    category: 'Giọng Đọc Tiếng Việt',
    reply: `Dạ, Kiến Sáng xin kính chào bạn! Mình đang đọc hoàn toàn bằng giọng nói tiếng Việt chuẩn, phát âm tự nhiên, tròn vành rõ chữ đây ạ.

Dưới đây là một số thông tin tiêu biểu về Chuyên đề Địa lí 11 Sông Mê Công:
Thứ nhất: Chiều dài toàn tuyến sông là 4.763 km, bắt nguồn từ cao nguyên Tây Tạng ở độ cao trên 5.000 m.
Thứ hai: Lưu vực rộng 810.000 km², chảy qua sáu quốc gia gồm Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và Việt Nam.
Thứ ba: Tại Việt Nam, sông chia thành nhánh Sông Tiền và Sông Hậu, đổ ra Biển Đông qua hệ thống 9 cửa sông Cửu Long huyền thoại.

Bạn có thể bấm nút Tạm dừng, Tiếp tục, hoặc nói "Đọc chậm hơn", "Đọc nhanh hơn" để điều chỉnh giọng đọc theo ý muốn nhé!`,
    quickAction: {
      label: 'Nghe Đọc Tiếng Việt Mẫu',
      actionType: 'support',
      target: 'test_voice'
    }
  },
  {
    keywords: ['reset', 'làm lại điểm', 'xóa điểm', 'cài lại'],
    category: 'Quản Lý Dữ Liệu Học Tập',
    reply: `🔄 Bạn muốn làm mới dữ liệu học tập? Bạn có thể đặt lại số Điểm Thám Hiểm về mức chào mừng 100 điểm bất kỳ lúc nào bằng nút "Làm mới điểm" hoặc chọn chơi lại trong từng mini-game nhé!`,
    quickAction: {
      label: 'Reset 100 Điểm Thám Hiểm',
      actionType: 'support',
      target: 'reset_points'
    }
  }
];

export const QUICK_SUPPORT_CHIPS = [
  '🎯 5 Chuẩn Yêu Cầu Cần Đạt',
  '📍 1. Vị trí & 6 Quốc Gia Lưu Vực',
  '🌊 2. Vai Trò Tự Nhiên & KTXH',
  '⚠️ 3. Vấn Đề Khai Thác Nguồn Nước',
  '🏛️ 4. Ủy Hội MRC & Việt Nam',
  '🌾 5. Thực Tiễn ĐBSCL & Hậu Giang',
  '🔊 Chatbot đọc tiếng Việt',
  '📖 Kiến thức SGK Địa lí 11',
  '📋 5 thủ tục Ủy hội MRC',
  '📊 Số liệu chuẩn xác lưu vực',
  '🌱 Nghị quyết 120 "Thuận thiên"',
  '🏫 TH, THCS, THPT FPT Hậu Giang'
];
