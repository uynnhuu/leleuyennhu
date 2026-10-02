export const MASTER_PROMPTS = [
  {
    id: 'full-app-prompt',
    title: 'Prompt Chuẩn Tạo Webapp Giáo Dục Hoàn Chỉnh Trên Google AI Studio',
    targetAudience: 'Giáo viên & Học sinh THPT Địa lí 11',
    description: 'Prompt tối ưu hóa với đầy đủ cấu trúc: Mục tiêu GDPT 2018, Thông tin địa lí chuẩn xác, Mô hình game tương tác, UI/UX hiện đại.',
    content: `Hãy xây dựng một Web Application tương tác chuyên đề Địa lí 11 về "Sông Mê Công và Mối Liên Hệ Với Đồng Bằng Sông Cửu Long (Việt Nam)" dành cho học sinh THPT và giáo viên Địa lí.

1. MỤC TIÊU SƯ PHẠM (CHƯƠNG TRÌNH GDPT 2018):
- Kiến thức: Giúp học sinh nắm vững đặc điểm dòng chảy, lưu vực sông Mê Công (qua 6 quốc gia: Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia, Việt Nam).
- Phân tích vai trò sống còn của sông Mê Kông đối với ĐBSCL (vựa lúa, trái cây, thủy sản, "mùa nước nổi", phù sa).
- Đánh giá các thách thức an ninh nguồn nước: Đập thủy điện thượng nguồn, biến đổi khí hậu, xâm nhập mặn, sạt lở, thiếu hụt trầm tích.
- Định hướng giải pháp: Triết lý "Thuận thiên" (Nghị quyết 120/NQ-CP), chuyển đổi mô hình Lúa - Tôm, vai trò của Ủy ban sông Mê Kông quốc tế (MRC).

2. CÁC TÍNH NĂNG VÀ GAME TƯƠNG TÁC CẦN CÓ:
- Bản đồ tương tác SVG: Thể hiện dòng chảy từ Tây Tạng qua 6 quốc gia tới 9 cửa sông Cửu Long. Cho phép học sinh click từng trạm để xem trắc diện độ cao, lưu lượng, đập thủy điện, hệ sinh thái.
- Game 1: "Chiến Lược Gia Cửu Long" (Mekong Eco-Management Simulator) - Học sinh đóng vai nhà quản lý tài nguyên nước ĐBSCL, ra quyết định ứng phó 5 vòng thử thách: Mùa lũ, đập thượng nguồn tích nước, xâm nhập mặn 4‰ lấn sâu 80km, sạt lở bờ sông, thực hiện Nghị quyết 120. Cân bằng 3 chỉ số: Nông nghiệp, An ninh nước ngọt, Sinh thái.
- Game 2: "Khám Phá 9 Cửa Sông Cửu Long" (Nine Estuaries Puzzle) - Trò chơi phân loại, định vị 9 cửa sông (Cửa Tiểu, Cửa Đại, Ba Lai, Hàm Luông, Cổ Chiên, Cung Hầu thuộc sông Tiền; Định An, Bát Xắc, Trần Đề thuộc sông Hậu) kèm giải thích lý do cửa Ba Lai có đập và cửa Bát Xắc bị bồi lấp.
- Game 3: "Đấu Trí Địa Lí 11 - Vượt Sóng Cửu Long" - Bộ câu hỏi trắc nghiệm bấm giờ theo 3 cấp độ: Nhận biết, Thông hiểu, Vận dụng, có giải thích đáp án sư phạm chi tiết và xếp hạng huy hiệu.
- Game 4: "Nối Nhanh 6 Quốc Gia Ven Sông" - Tương tác ghép tên gọi địa phương, chiều dài và vai trò của từng quốc gia.

3. THIẾT KẾ VÀ TRẢI NGHIỆM HỌC TẬP (UI/UX):
- Ngôn ngữ: 100% Tiếng Việt chuẩn mực thuật ngữ Địa lí THPT.
- Giao diện: Tươi sáng, phối màu xanh sông nước và màu phù sa đặc trưng, font chữ rõ ràng, hỗ trợ đầy đủ thiết bị máy tính bảng, điện thoại và máy chiếu lớp học.
- Tích hợp hiệu ứng ăn mừng (Confetti) khi hoàn thành thử thách, cấp chứng chỉ "Đại Sứ Sông Mê Kông".`
  },
  {
    id: 'lesson-activity-prompt',
    title: 'Prompt Thiết Kế Hoạt Động Giờ Học 45 Phút (Giáo Án Tích Hợp CNTT)',
    targetAudience: 'Giáo viên tổ chức dạy học trên lớp',
    description: 'Prompt gợi ý kịch bản tổ chức tiết học Địa lí 11 kết hợp webapp để phát triển phẩm chất & năng lực học sinh.',
    content: `Thiết kế kế hoạch bài dạy (giáo án) 45 phút môn Địa lí 11 - Chuyên đề: "Tác động của việc sử dụng tài nguyên nước sông Mê Công đến Việt Nam":
- Khởi động (5 phút): Cho học sinh chơi mini-game "Nối tên 6 quốc gia ven sông Mê Kông".
- Hình thành kiến thức (20 phút):
  + Trạm 1: Khám phá bản đồ dòng chảy từ Tây Tạng đến Campuchia (học sinh tìm hiểu vai trò Biển Hồ và đập thủy điện).
  + Trạm 2: Tìm hiểu 9 cửa sông Cửu Long và sự thay đổi tự nhiên (cửa Ba Lai, cửa Bát Xắc).
  + Trạm 3: Mối liên hệ với ĐBSCL (phù sa, xâm nhập mặn, mô hình lúa - tôm).
- Luyện tập & Trải nghiệm (15 phút): Cho các nhóm học sinh thi đấu "Chiến Lược Gia Cửu Long" xem nhóm nào đạt chỉ số Phát Triển Bền Vững cao nhất.
- Vận dụng & Củng cố (5 phút): Trắc nghiệm nhanh 5 câu và trao chứng chỉ "Đại sứ Sông Mê Kông".`
  }
];

export const GEOGRAPHY_TUTOR_FAQS = [
  {
    q: 'Sông Mê Kông có tổng chiều dài bao nhiêu và bắt nguồn từ đâu?',
    a: 'Sông Mê Kông có chiều dài khoảng 4.350 - 4.763 km (dài thứ 12 thế giới và thứ 7 châu Á). Sông bắt nguồn từ vùng núi tuyết cao nguyên Thanh Tạng (tỉnh Thanh Hải, Trung Quốc) ở độ cao gần 5.000m với tên gọi Lan Thương Giang (Lancang Jiang).'
  },
  {
    q: 'Tại sao nói Biển Hồ (Tonle Sap) là "quả tim điều hòa" của hạ lưu sông Mê Kông?',
    a: 'Vì vào mùa mưa lũ (tháng 6 - 10), lưu lượng sông Mê Kông rất lớn, nước chảy ngược vào Biển Hồ giúp tích trữ lượng nước khổng lồ và giảm áp lực ngập lụt cho ĐBSCL. Khi vào mùa khô (tháng 11 - 5), nước từ Biển Hồ chảy ngược lại sông Mê Kông, bổ sung nguồn nước ngọt quý giá đẩy mặn cho vùng châu thổ Việt Nam.'
  },
  {
    q: 'Vì sao gọi là sông "Cửu Long" nhưng hiện nay chỉ còn 7 - 8 cửa sông?',
    a: 'Theo truyền thống, sông Tiền có 6 cửa (Tiểu, Đại, Ba Lai, Hàm Luông, Cổ Chiên, Cung Hầu) và sông Hậu có 3 cửa (Định An, Bát Xắc, Trần Đề), tổng cộng là 9 cửa tượng trưng cho 9 con rồng. Tuy nhiên, theo biến đổi tự nhiên và con người: Cửa Bát Xắc (Bassac) đã bị phù sa bồi lấp hoàn toàn thành đất liền ở Cù Lao Dung; còn Cửa Ba Lai đã được xây cống đập ngăn mặn kiên cố từ năm 2002. Vì vậy thực tế hiện nay chỉ còn 7 - 8 cửa lưu thông tự do với biển.'
  },
  {
    q: 'Đập thủy điện ở thượng nguồn tác động như thế nào đến Việt Nam?',
    a: 'Chuỗi đập thủy điện bậc thang giữ lại đến 50 - 70% lượng bùn cát phù sa mịn và cát đáy, làm ĐBSCL bị "đói phù sa", gây sạt lở nghiêm trọng bờ sông bờ biển. Đồng thời, việc tích nước vào mùa khô và xả nước đột ngột làm đảo lộn chế độ dòng chảy tự nhiên, khiến xâm nhập mặn lấn sâu hơn vào nội đồng.'
  },
  {
    q: 'Triết lý "Thuận thiên" trong Nghị quyết 120/NQ-CP nghĩa là gì?',
    a: '"Thuận thiên" là tôn trọng quy luật tự nhiên, phù hợp với điều kiện thực tế, tránh can thiệp thô bạo vào tự nhiên. Thay vì tốn kém ngăn mặn bằng mọi giá để trồng độc canh cây lúa ngọt, ta chủ động chuyển đổi mô hình linh hoạt: Vùng ngọt trồng lúa đặc sản/trái cây; Vùng lợ và mặn nuôi tôm sinh thái, trồng rừng ngập mặn, biến nước mặn thành tài nguyên kinh tế.'
  }
];
