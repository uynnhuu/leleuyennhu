export interface CascadeStep {
  level: 'mekong' | 'delta' | 'haugiang';
  badgeTitle: string;
  name: string;
  subtitle: string;
  icon: string;
  overview: string;
  keyStats: { label: string; value: string; note?: string }[];
  waterRoles: { title: string; desc: string; icon: string }[];
  challenges: { title: string; desc: string; severity: string; icon: string }[];
  adaptationSolutions: { title: string; desc: string; type: 'Công trình' | 'Phi công trình' | 'Thuận thiên' }[];
  officialSourceCitations: string[];
}

export const MEKONG_CASCADE_DATA: Record<'mekong' | 'delta' | 'haugiang', CascadeStep> = {
  mekong: {
    level: 'mekong',
    badgeTitle: 'TẦNG 1: DÒNG CHẢY HUYẾT MẠCH XUYÊN QUỐC GIA',
    name: 'Sông Mê Kông (Dòng Sông Mẹ - Mae Nam Khong)',
    subtitle: 'Hành trình 4.763 km bắt nguồn từ Tây Tạng chảy qua 6 quốc gia',
    icon: '🌊',
    overview: 'Là một trong những dòng sông lớn nhất thế giới, giữ vai trò huyết mạch kết nối sinh thái và kinh tế của 6 quốc gia: Trung Quốc, Myanmar, Lào, Thái Lan, Campuchia và Việt Nam. Với tổng lượng nước hàng năm khoảng 475 tỉ m³ và diện tích lưu vực 810.000 km², dòng sông là nguồn sống nuôi dưỡng hơn 70 triệu dân.',
    keyStats: [
      { label: 'Chiều dài', value: '4.763 km', note: 'Thứ 12 thế giới, thứ 3 châu Á' },
      { label: 'Diện tích lưu vực', value: '810.000 km²', note: '6 quốc gia ven sông' },
      { label: 'Tổng lưu lượng dòng chảy', value: '475 tỉ m³/năm', note: 'Xếp thứ 8 thế giới' },
      { label: 'Đa dạng sinh học', value: '> 1.000 loài cá', note: 'Xếp thứ 2 thế giới sau Amazon' }
    ],
    waterRoles: [
      { title: 'Tạo động năng & Thủy điện', desc: 'Cung cấp nguồn thủy năng khổng lồ cho các quốc gia thượng lưu và trung lưu phát triển công nghiệp.', icon: '⚡' },
      { title: 'Vận chuyển phù sa & Dinh dưỡng', desc: 'Mang hàng trăm triệu tấn khoáng chất và bùn cát bồi tụ kiến tạo các vùng châu thổ trù phú bậc nhất.', icon: '🪨' },
      { title: 'Nuôi dưỡng chuỗi đạm cá tự nhiên', desc: 'Hệ sinh thái di cư độc nhất vô nhị cung cấp nguồn thực phẩm sống còn cho người dân tiểu vùng.', icon: '🐟' }
    ],
    challenges: [
      { title: 'Chuỗi đập thủy điện bậc thang', desc: 'Giữ lại hơn 70% lượng bùn cát phù sa và làm biến đổi quy luật thủy văn tự nhiên của cả lưu vực.', severity: 'Nghiêm trọng', icon: '🏗️' },
      { title: 'Biến đổi khí hậu cực đoan', desc: 'Tần suất hạn hán El Niño gia tăng làm dòng chảy mùa kiệt sụt giảm sâu kỷ lục.', severity: 'Khẩn cấp', icon: '🌡️' }
    ],
    adaptationSolutions: [
      { title: 'Thực thi 5 Thủ tục của MRC', desc: 'Tuân thủ nghiêm ngặt các thủ tục PDIES, PWUM, PNPCA, PMFM và PWQ giữa các quốc gia thành viên.', type: 'Phi công trình' },
      { title: 'Chia sẻ dữ liệu thủy văn 24/7', desc: 'Kết nối mạng lưới quan trắc tự động và chia sẻ thông tin xả lũ hồ chứa cả mùa mưa lẫn mùa khô.', type: 'Phi công trình' }
    ],
    officialSourceCitations: [
      'Ủy hội Sông Mê Công Quốc tế (MRC - State of the Basin Report 2023)',
      'SGK Chuyên đề học tập Địa lí 11 - Bộ sách Kết nối tri thức với cuộc sống (trang 5 - 19, NXB Giáo dục Việt Nam)'
    ]
  },
  delta: {
    level: 'delta',
    badgeTitle: 'TẦNG 2: TRÁI TIM CHÂU THỔ HẠ LƯU VIỆT NAM',
    name: 'Đồng Bằng Sông Cửu Long (ĐBSCL)',
    subtitle: 'Châu thổ rộng khoảng 40.000 km² - Vựa lúa, trái cây và thủy sản số 1 Việt Nam',
    icon: '🌾',
    overview: 'Khi chảy vào lãnh thổ Việt Nam tại An Giang và Đồng Tháp, sông Mê Kông tách thành hai dòng chính là Sông Tiền và Sông Hậu. Trải qua hàng ngàn năm bồi đắp, dòng sông đã kiến tạo nên đồng bằng trù phú bậc nhất Đông Nam Á, nuôi dưỡng hơn 20 triệu người dân và đóng vai trò an ninh lương thực sống còn của quốc gia.',
    keyStats: [
      { label: 'Diện tích đồng bằng', value: '~40.000 km²', note: 'Chiếm 12% diện tích cả nước' },
      { label: 'Sản lượng lúa gạo', value: '> 50%', note: 'Đóng góp 95% lượng gạo xuất khẩu' },
      { label: 'Sản lượng thủy sản', value: '> 65%', note: 'Cá tra, tôm xuất khẩu chủ lực' },
      { label: 'Trái cây nhiệt đới', value: '> 70%', note: 'Vựa cây ăn trái lớn nhất nước' },
      { label: 'Lượng phù sa hiện nay', value: '~47 triệu tấn/năm', note: 'Giảm hơn 70% so với trước 1990' }
    ],
    waterRoles: [
      { title: 'Bồi đắp màu mỡ & Cải tạo đất', desc: 'Lũ hàng năm đưa phù sa bồi đắp đồng ruộng, rửa sạch chua phèn và tiêu diệt mầm mống sâu bệnh hại.', icon: '🌱' },
      { title: 'Ngọt hóa & Đẩy mặn', desc: 'Dòng chảy mùa khô là tấm lá chắn sống còn ngăn chặn sự xâm nhập của nước mặn từ biển vào các vùng chuyên canh.', icon: '💧' },
      { title: 'Giao thông & Văn hóa sông nước', desc: 'Mạng lưới sông rạch tạo nên văn hóa chợ nổi độc đáo và hệ thống vận tải thủy lúa gạo lớn nhất cả nước.', icon: '🛶' }
    ],
    challenges: [
      { title: 'Xâm nhập mặn khốc liệt', desc: 'Ranh mặn 4g/l thọc sâu 70-90km vào nội đồng trong các năm hạn lịch sử 2016, 2020 và 2024.', severity: 'Khẩn cấp', icon: '🧂' },
      { title: 'Sạt lở bờ sông, bờ biển', desc: 'Thiếu hụt trầm tích bùn cát cùng với khai thác cát làm xuất hiện hơn 500 điểm sạt lở nguy hiểm.', severity: 'Khẩn cấp', icon: '🌊' },
      { title: 'Sụt lún nền đất do hút nước ngầm', desc: 'Tốc độ sụt lún trung bình 1-3 cm/năm, nhanh hơn tốc độ nước biển dâng do khai thác quá mức nước dưới đất.', severity: 'Rất nghiêm trọng', icon: '📉' }
    ],
    adaptationSolutions: [
      { title: 'Nghị quyết 120/NQ-CP về Phát triển bền vững ĐBSCL', desc: 'Chuyển đổi tư duy sang "Thuận thiên", tôn trọng quy luật tự nhiên, coi nước mặn, lợ cũng là tài nguyên để phát triển kinh tế.', type: 'Thuận thiên' },
      { title: 'Mô hình kinh tế Lúa - Tôm thông minh', desc: 'Mùa mưa trồng lúa ngọt, mùa khô đưa nước mặn nuôi tôm sinh thái, nâng cao thu nhập gấp 3-5 lần.', type: 'Thuận thiên' },
      { title: 'Công trình kiểm soát mặn Cái Lớn - Cái Bé', desc: 'Vận hành hệ thống cống âu thuyền hiện đại để điều tiết linh hoạt nguồn nước ngọt - lợ cho hàng trăm ngàn ha đất.', type: 'Công trình' }
    ],
    officialSourceCitations: [
      'Nghị quyết số 120/NQ-CP ngày 17/11/2017 của Chính phủ về phát triển bền vững ĐBSCL thích ứng với biến đổi khí hậu',
      'Báo cáo Quy hoạch vùng ĐBSCL thời kỳ 2021-2030, tầm nhìn đến năm 2050 (Bộ Kế hoạch & Đầu tư)',
      'Viện Quy hoạch Thủy lợi Miền Nam (Báo cáo thường niên dòng chảy và xâm nhập mặn ĐBSCL)'
    ]
  },
  haugiang: {
    level: 'haugiang',
    badgeTitle: 'TẦNG 3: LIÊN HỆ ĐỊA PHƯƠNG CỤ THỂ',
    name: 'Tỉnh Hậu Giang & Điểm Trường FPT Vị Thủy',
    subtitle: 'Tọa độ: 61C ấp 6, xã Vị Thủy, TP.Cần Thơ - Trung tâm chuyển tiếp nguồn nước bán đảo Cà Mau',
    icon: '📍',
    overview: 'Nằm ở vị trí trung tâm của vùng Tây sông Hậu thuộc bán đảo Cà Mau, Hậu Giang có diện tích tự nhiên 1.621,7 km² và dân số khoảng 730.000 người. Tỉnh sở hữu hệ thống kênh rạch chằng chịt với tổng chiều dài hàng nghìn km, nổi bật là dòng Kênh xáng Xà No lịch sử - tuyến vận tải lúa gạo huyết mạch kết nối Hậu Giang với Cần Thơ và cả vùng Tây Nam Bộ.',
    keyStats: [
      { label: 'Diện tích tự nhiên', value: '1.621,7 km²', note: 'Chiếm 4% diện tích toàn vùng ĐBSCL' },
      { label: 'Hệ thống kênh rạch', value: '> 2.300 tuyến', note: 'Mật độ sông rạch cao bậc nhất vùng (1.5 - 2 km/km²)' },
      { label: 'Kênh xáng Xà No', value: 'Dài ~40 km', note: 'Khởi công đào 1901-1903, "Con đường lúa gạo miền Tây"' },
      { label: 'Trục đường 61C', value: 'Tuyến nối Cần Thơ - Vị Thanh', note: 'Địa chỉ Trường TH, THCS, THPT FPT Hậu Giang tại Vị Thủy' },
      { label: 'Đặc sản nông nghiệp', value: 'Khóm Cầu Đúc, Mãng cầu xiêm', note: 'Cá thắt lát Hậu Giang, Lúa chất lượng cao' }
    ],
    waterRoles: [
      { title: 'Tưới tiêu nông nghiệp & Vựa lúa', desc: 'Nguồn nước ngọt từ sông Hậu dẫn qua kênh rạch Châu Thành và Châu Thành A tưới cho hơn 75.000 ha đất trồng lúa.', icon: '🌾' },
      { title: 'Phát triển thủy sản nước ngọt & cá thắt lát', desc: 'Nguồn nước mặt dồi dào là cái nôi nuôi dưỡng loài cá thắt lát cườm trứ danh Hậu Giang (sản phẩm OCOP 4-5 sao).', icon: '🐟' },
      { title: 'Vận tải thủy & Du lịch sinh thái', desc: 'Kênh xáng Xà No vừa là trục giao thông thủy vừa là tuyến du lịch sinh thái nông thôn gắn liền văn hóa chợ quê.', icon: '🛶' }
    ],
    challenges: [
      { title: 'Xâm nhập mặn kép từ 2 hướng', desc: 'Chịu ảnh hưởng mặn từ cả hướng Biển Đông (qua sông Hậu lấn vào Châu Thành) và từ hướng Biển Tây (theo sông Cái Lớn tràn vào huyện Long Mỹ, thị xã Long Mỹ và một phần Vị Thủy với độ mặn đo được từ 1.5 - 4.5‰).', severity: 'Khẩn cấp', icon: '🧂' },
      { title: 'Sạt lở bờ sông, kênh rạch nội đồng', desc: 'Mỗi năm xảy ra 40 - 60 điểm sạt lở nghiêm trọng trên sông Cái Lớn, kênh xáng Xà No và các tuyến kênh cấp 1, cấp 2 do dòng nước chảy siết và nền đất yếu.', severity: 'Rất nghiêm trọng', icon: '🌊' },
      { title: 'Khô hạn & Ô nhiễm nguồn nước mùa kiệt', desc: 'Các xã vùng sâu của Vị Thủy, Long Mỹ cách xa nguồn sông lớn, vào cao điểm mùa khô dòng chảy lưu thông chậm dễ bị tù đọng và nhiễm phèn chua.', severity: 'Nghiêm trọng', icon: '💧' }
    ],
    adaptationSolutions: [
      { title: 'Hệ thống đập tạm dã chiến & Đập kiên cố', desc: 'Hàng năm Sở NN&PTNT Hậu Giang chủ động đắp từ 30 đến 50 đập tạm ngăn mặn cục bộ tại huyện Long Mỹ và TP. Vị Thanh để bảo vệ lúa đông xuân.', type: 'Công trình' },
      { title: 'Xây dựng hồ trữ nước ngọt phân tán', desc: 'Triển khai mô hình nạo vét mương vườn, đào ao lót bạt trữ nước mưa và nước ngọt mùa lũ phục vụ tưới tiêu mùa khô.', type: 'Công trình' },
      { title: 'Mô hình chuyển đổi giống cây trồng chịu mặn', desc: 'Mở rộng diện tích trồng khóm Cầu Đúc (chịu được phèn mặn), mãng cầu xiêm ghép gốc bình bát thích ứng ngập mặn tại huyện Long Mỹ và Vị Thủy.', type: 'Thuận thiên' },
      { title: 'Quan trắc mặn tự động & Báo tin qua tin nhắn', desc: 'Lắp đặt 10 trạm đo mặn tự động truyền dữ liệu liên tục 24/7 đến điện thoại thông minh của cán bộ và nông dân địa phương.', type: 'Phi công trình' }
    ],
    officialSourceCitations: [
      'Sở Nông nghiệp và Phát triển nông thôn tỉnh Hậu Giang (Báo cáo tổng kết công tác phòng chống hạn mặn và thiên tai hàng năm)',
      'Đài Khí tượng Thủy văn tỉnh Hậu Giang (Bản tin dự báo xâm nhập mặn mùa khô)',
      'Niên giám Thống kê tỉnh Hậu Giang năm 2023 - 2024',
      'Đề án Phát triển nông nghiệp bền vững thích ứng với biến đổi khí hậu tỉnh Hậu Giang giai đoạn 2021-2025, định hướng đến năm 2030'
    ]
  }
};
