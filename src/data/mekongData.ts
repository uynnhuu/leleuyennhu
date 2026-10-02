import { RiverStation, EstuaryInfo, CountryMekong } from '../types/mekong';

export const MEKONG_GENERAL_STATS = {
  lengthKm: '4.350 - 4.763 km',
  lengthRankWorld: 12,
  lengthRankAsia: 7,
  basinAreaKm2: '795.000 km²',
  annualDischarge: '475 tỉ m³/năm',
  averageDischarge: '15.000 m³/s',
  countriesCount: 6,
  populationInBasin: 'Hơn 65 triệu người',
  fishSpecies: 'Hơn 1.100 loài cá',
  sedimentHistorical: 'Khoảng 160 triệu tấn/năm (hiện nay giảm còn dưới 40 triệu tấn do các đập thủy điện)',
  vietnamContributionDelta: '50% sản lượng lúa, 70% trái cây, 65% thủy sản cả nước',
};

export const RIVER_STATIONS: RiverStation[] = [
  {
    id: 'station-1',
    name: 'Khởi nguồn Tây Tạng (Trung Quốc)',
    localName: 'Lan Thương Giang (Lancang Jiang)',
    country: 'Trung Quốc',
    countryCode: 'CN',
    flag: '🇨🇳',
    distanceFromSource: 0,
    elevation: 4968,
    description: 'Bắt nguồn từ vùng núi tuyết cao nguyên Thanh Tạng (độ cao gần 5.000m). Nguồn nước chủ yếu do băng tuyết tan chảy vào mùa hè.',
    features: [
      'Nằm ở đầu nguồn thuộc tỉnh Thanh Hải & Khu tự trị Tây Tạng',
      'Độ dốc địa hình cực lớn, lòng sông hẹp, nhiều hẻm vực sâu thăm thẳm',
      'Đóng góp khoảng 16 - 18% tổng lượng dòng chảy toàn lưu vực',
      'Chảy qua hẻm núi Tam Giang Tịnh Lưu (Di sản thế giới UNESCO)'
    ],
    biodiversityHighlight: 'Báo tuyết, cừu xanh Himalaya, các loài cá thích nghi lạnh vùng núi cao.',
    humanImpact: 'Ít dân cư sinh sống, tuy nhiên băng tuyết đang tan nhanh do hiện tượng nóng lên toàn cầu.',
    hydropowerDams: ['Đập Thủy điện Tiểu Loan (Xiaowan - 292m)', 'Đập Nọa Trát Độ (Nuozhadu - 5.850 MW)'],
    coordinates: { x: 22, y: 10 }
  },
  {
    id: 'station-2',
    name: 'Hẻm vực Vân Nam (Trung Quốc)',
    localName: 'Trung Thượng lưu Lan Thương',
    country: 'Trung Quốc',
    countryCode: 'CN',
    flag: '🇨🇳',
    distanceFromSource: 1500,
    elevation: 1800,
    description: 'Dòng sông len lỏi qua các dãy núi cao thuộc tỉnh Vân Nam. Đây là đoạn có mật độ đập thủy điện bậc thang dày đặc nhất lưu vực.',
    features: [
      'Địa hình dốc đứng, tiềm năng thủy điện khổng lồ',
      'Chuỗi 11 đập thủy điện bậc thang lớn đã vận hành',
      'Khả năng giữ lại hơn 50% lượng phù sa thô của toàn bộ thượng nguồn'
    ],
    biodiversityHighlight: 'Hệ thực vật cận nhiệt đới núi cao, rừng hỗn giao Tây Nam Á.',
    humanImpact: 'Tích nước phát điện thay đổi hoàn toàn quy luật dòng chảy tự nhiên và chu kỳ xả nước xuống hạ du.',
    hydropowerDams: ['Mạn Loan (Manwan)', 'Đại Chiêu (Dachaoshan)', 'Cảnh Hồng (Jinghong)'],
    coordinates: { x: 34, y: 24 }
  },
  {
    id: 'station-3',
    name: 'Tam Giác Vàng & Biên giới 3 nước',
    localName: 'Vùng giáp ranh Myanmar - Lào - Thái Lan',
    country: 'Lào - Myanmar - Thái Lan',
    countryCode: 'LA-MM-TH',
    flag: '🇱🇦🇲🇲🇹🇭',
    distanceFromSource: 2150,
    elevation: 360,
    description: 'Điểm giao thoa lịch sử giữa 3 quốc gia. Dòng sông bắt đầu mở rộng lòng chảy và đóng vai trò đường biên giới tự nhiên.',
    features: [
      'Biên giới tự nhiên giữa Myanmar và Lào dài 234 km',
      'Biên giới tự nhiên giữa Lào và Thái Lan dài 976 km',
      'Chuyển từ địa hình hẻm vực dốc sang vùng đồi lượn sóng'
    ],
    biodiversityHighlight: 'Hơn 100 loài cá di cư sinh sản qua vùng giáp ranh.',
    humanImpact: 'Phát triển giao thương đường thủy quốc tế, cảng cạn Chiềng Saen và du lịch sinh thái.',
    hydropowerDams: ['Dự án thủy điện Pak Beng (Lào - đang triển khai)'],
    coordinates: { x: 44, y: 38 }
  },
  {
    id: 'station-4',
    name: 'Luang Prabang & Thác Khone (Lào)',
    localName: 'Mè Khóng (Mẹ Nước)',
    country: 'Lào',
    countryCode: 'LA',
    flag: '🇱🇦',
    distanceFromSource: 3100,
    elevation: 120,
    description: 'Lào là quốc gia đóng góp nhiều nước nhất cho lưu vực Mê Kông (~35%). Thác Khone là thác nước rộng nhất thế giới, chia cắt giao thông thủy.',
    features: [
      'Đóng góp tới 35% tổng lưu lượng nước của toàn sông Mê Công',
      'Thác Khone (Si Phan Don - 4000 đảo) tạo ra rào cản địa hình hùng vĩ',
      'Lào theo đuổi chiến lược "Bình ắc quy của Đông Nam Á"'
    ],
    biodiversityHighlight: 'Môi trường sống của Cá Heo nước ngọt Irrawaddy và loài Cá Tra Dầu khổng lồ (nặng tới 300kg).',
    humanImpact: 'Các đập thủy điện Xayaburi và Don Sahong gây tranh cãi vì chặn đường di cư của cá.',
    hydropowerDams: ['Đập Xayaburi (1.285 MW)', 'Đập Don Sahong (260 MW)'],
    coordinates: { x: 52, y: 55 }
  },
  {
    id: 'station-5',
    name: 'Biển Hồ Tonle Sap & Phnom Penh (Campuchia)',
    localName: 'Tonle Thom & Tonle Sap',
    country: 'Campuchia',
    countryCode: 'KH',
    flag: '🇰🇭',
    distanceFromSource: 3900,
    elevation: 15,
    description: 'Biển Hồ là "quả tim sinh thái" của hạ lưu. Mùa lũ nước sông Mê Kông dồn ngược vào Biển Hồ tích trữ; mùa khô nước chảy ngược lại tiếp tế cho ĐBSCL.',
    features: [
      'Hồ nước ngọt tự nhiên lớn nhất Đông Nam Á, di sản sinh quyển UNESCO',
      'Cơ chế "Đảo chiều dòng chảy" kỳ diệu giữa sông Tonle Sap và Mê Kông',
      'Cung cấp hơn 60% lượng protein từ thủy sản cho nhân dân Campuchia',
      'Đóng vai trò máy điều hòa nước tự nhiên giúp ĐBSCL giảm bớt hạn mặn mùa khô'
    ],
    biodiversityHighlight: 'Vựa cá khổng lồ, điểm di cư của hàng trăm triệu con cá giống đổ về ĐBSCL trong mùa nước nổi.',
    humanImpact: 'Nạn chặt phá rừng ngập nước, đánh bắt cạn kiệt, lượng nước đảo chiều giảm sút đáng báo động.',
    hydropowerDams: ['Đập Sambor (tạm hoãn nghiên cứu đánh giá)'],
    coordinates: { x: 58, y: 72 }
  },
  {
    id: 'station-6',
    name: 'Đồng Bằng Sông Cửu Long (Việt Nam)',
    localName: 'Sông Tiền & Sông Hậu (Cửu Long Giang)',
    country: 'Việt Nam',
    countryCode: 'VN',
    flag: '🇻🇳',
    distanceFromSource: 4350,
    elevation: 2,
    description: 'Nơi con sông Mê Kông tách làm 2 nhánh Tiền Giang và Hậu Giang, bồi đắp nên vùng châu thổ phì nhiêu bậc nhất hành tinh trước khi đổ ra Biển Đông.',
    features: [
      'Vựa lúa, vựa trái cây và thủy sản lớn nhất Việt Nam',
      'Hệ thống kênh rạch chằng chịt, văn hóa chợ nổi độc đáo (Cái Răng, Ngã Bảy)',
      'Chế độ mùa nước nổi (tháng 9-11) mang lại phù sa và thau chua rửa mặn',
      'Đang chịu tác động nặng nề bởi biến đổi khí hậu, sạt lở và xâm nhập mặn'
    ],
    biodiversityHighlight: 'Hệ sinh thái rừng tràm Trà Sư, rừng ngập mặn Cà Mau, cá linh, tôm càng xanh, chim di cư.',
    humanImpact: 'Áp dụng định hướng "Thuận thiên" theo Nghị quyết 120/NQ-CP: mô hình Lúa - Tôm, cống Cái Lớn - Cái Bé.',
    hydropowerDams: ['Không xây đập (vùng hạ lưu thấp, tập trung công trình thủy lợi ngăn mặn trữ ngọt)'],
    coordinates: { x: 68, y: 88 }
  }
];

export const NINE_ESTUARIES: EstuaryInfo[] = [
  {
    id: 'estuary-1',
    name: 'Cửa Tiểu',
    riverBranch: 'Tiền',
    province: 'Tiền Giang',
    status: 'active',
    description: 'Một trong hai cửa sông chính của nhánh sông Tiền đổ ra vịnh Gành Rái / Biển Đông tại Gò Công Đông.',
    historicalNote: 'Cửa biển sầm uất gắn liền với lịch sử thông thương Nam Bộ.',
    order: 1,
    coordinates: { x: 88, y: 88 }
  },
  {
    id: 'estuary-2',
    name: 'Cửa Đại',
    riverBranch: 'Tiền',
    province: 'Tiền Giang & Bến Tre',
    status: 'active',
    description: 'Ranh giới tự nhiên giữa huyện Gò Công Đông (Tiền Giang) và huyện Bình Đại (Bến Tre). Lòng sông rất rộng.',
    historicalNote: 'Tên "Đại" thể hiện sự rộng lớn của lòng sông trước khi hòa vào biển khơi.',
    order: 2,
    coordinates: { x: 89, y: 90 }
  },
  {
    id: 'estuary-3',
    name: 'Cửa Ba Lai',
    riverBranch: 'Tiền',
    province: 'Bến Tre',
    status: 'dammed',
    description: 'Nằm trên sông Ba Lai. Hiện nay đã được đắp cống đập ngăn mặn Ba Lai khép kín từ năm 2002 để giữ ngọt cho tỉnh Bến Tre.',
    historicalNote: 'Cửa sông đã bị thay đổi diện mạo do công trình thủy lợi phục vụ ngọt hóa.',
    order: 3,
    coordinates: { x: 88, y: 92 }
  },
  {
    id: 'estuary-4',
    name: 'Cửa Hàm Luông',
    riverBranch: 'Tiền',
    province: 'Bến Tre',
    status: 'active',
    description: 'Nằm giữa hai huyện Ba Tri và Thạnh Phú của xứ dừa Bến Tre. Nước sâu và lưu lượng dòng chảy mạnh mẽ.',
    historicalNote: 'Tuyến hàng hải quan trọng, quanh năm dập dềnh sóng gió biển Đông.',
    order: 4,
    coordinates: { x: 86, y: 94 }
  },
  {
    id: 'estuary-5',
    name: 'Cửa Cổ Chiên',
    riverBranch: 'Tiền',
    province: 'Bến Tre & Trà Vinh',
    status: 'active',
    description: 'Ranh giới giữa huyện Thạnh Phú (Bến Tre) và huyện Châu Thành (Trà Vinh). Có cồn bãi màu mỡ.',
    historicalNote: 'Huyền tích chúa Nguyễn Ánh gắn với trận thủy chiến và tiếng súng cỗ đại bác/cổ chiên.',
    order: 5,
    coordinates: { x: 84, y: 96 }
  },
  {
    id: 'estuary-6',
    name: 'Cửa Cung Hầu',
    riverBranch: 'Tiền',
    province: 'Trà Vinh',
    status: 'active',
    description: 'Tách ra từ sông Cổ Chiên bao bọc cù lao Hòa Minh - Long Hòa, chảy qua Cầu Ngang đổ ra biển.',
    historicalNote: 'Cửa sông cuối cùng của nhánh sông Tiền phía đông nam.',
    order: 6,
    coordinates: { x: 82, y: 97 }
  },
  {
    id: 'estuary-7',
    name: 'Cửa Định An',
    riverBranch: 'Hậu',
    province: 'Trà Vinh & Sóc Trăng',
    status: 'active',
    description: 'Cửa sông lớn nhất của sông Hậu đổ ra biển. Là luồng tàu biển trọng tải lớn ra vào cảng Cần Thơ và sông Hậu.',
    historicalNote: 'Cửa sông tấp nập thuyền bè giao thương viễn duyên.',
    order: 7,
    coordinates: { x: 79, y: 98 }
  },
  {
    id: 'estuary-8',
    name: 'Cửa Bát Xắc (Bassac)',
    riverBranch: 'Hậu',
    province: 'Sóc Trăng',
    status: 'silted',
    description: 'Từng là một cửa biển lớn của sông Hậu thuộc huyện Cù Lao Dung (Sóc Trăng). Do lượng phù sa bồi đắp và biến động hải lưu qua hàng trăm năm, cửa sông đã bị bồi lắng hoàn toàn.',
    historicalNote: 'Minh chứng sống động cho quy luật tự nhiên: Cửu Long xưa có 9 cửa, nay thực tế chỉ còn 7 - 8 cửa hoạt động!',
    order: 8,
    coordinates: { x: 76, y: 97 }
  },
  {
    id: 'estuary-9',
    name: 'Cửa Trần Đề',
    riverBranch: 'Hậu',
    province: 'Sóc Trăng',
    status: 'active',
    description: 'Nằm tại huyện Trần Đề (Sóc Trăng). Điểm xuất phát của các tuyến tàu cao tốc ra Côn Đảo và trung tâm cảng cá sầm uất.',
    historicalNote: 'Đang được định hướng quy hoạch Cảng nước sâu quốc tế Trần Đề tương lai.',
    order: 9,
    coordinates: { x: 73, y: 96 }
  }
];

export const COUNTRIES_MEKONG: CountryMekong[] = [
  {
    id: 'cn',
    country: 'Trung Quốc',
    localName: 'Lan Thương Giang (Láncāng Jiāng)',
    flag: '🇨🇳',
    lengthInCountry: 2130,
    basinPercentage: 21,
    flowContribution: 16,
    keyRole: 'Thượng nguồn, địa hình dốc cao, phát triển chuỗi thủy điện bậc thang khổng lồ.',
    mainIssue: 'Giữ lại phù sa trầm tích và điều tiết xả lũ / tích nước đơn phương ảnh hưởng hạ du.'
  },
  {
    id: 'mm',
    country: 'Myanmar',
    localName: 'Mae Khaung',
    flag: '🇲🇲',
    lengthInCountry: 234,
    basinPercentage: 3,
    flowContribution: 2,
    keyRole: 'Ranh giới tự nhiên phía đông giáp với Lào tại khu vực Tam giác Vàng.',
    mainIssue: 'Bảo tồn rừng đầu nguồn và ổn định vùng giáp biên.'
  },
  {
    id: 'la',
    country: 'Lào',
    localName: 'Nam Khong (Mẹ Của Mọi Dòng Sông)',
    flag: '🇱🇦',
    lengthInCountry: 1875,
    basinPercentage: 25,
    flowContribution: 35,
    keyRole: 'Đóng góp lượng nước lớn nhất (35%), nhiều phụ lưu dồi dào, chiến lược thủy điện xuất khẩu.',
    mainIssue: 'Đập dòng chính (Xayaburi, Don Sahong) cản trở đường di cư của loài cá.'
  },
  {
    id: 'th',
    country: 'Thái Lan',
    localName: 'Mae Nam Khong',
    flag: '🇹🇭',
    lengthInCountry: 976,
    basinPercentage: 23,
    flowContribution: 18,
    keyRole: 'Nguồn nước tưới tiêu sống còn cho vùng nông nghiệp đông bắc (Isan).',
    mainIssue: 'Dự án chuyển nước và tình trạng hạn hán mùa khô kéo dài.'
  },
  {
    id: 'kh',
    country: 'Campuchia',
    localName: 'Tonle Thom (Sông Lớn)',
    flag: '🇰🇭',
    lengthInCountry: 500,
    basinPercentage: 19,
    flowContribution: 18,
    keyRole: 'Trái tim sinh thái Biển Hồ (Tonle Sap) điều tiết nước và cung cấp protein cá cho hàng triệu dân.',
    mainIssue: 'Suy giảm nguồn cá tự nhiên, rừng ngập nước bị thu hẹp, dòng chảy ngược suy yếu.'
  },
  {
    id: 'vn',
    country: 'Việt Nam',
    localName: 'Sông Cửu Long (Tiền Giang & Hậu Giang)',
    flag: '🇻🇳',
    lengthInCountry: 230,
    basinPercentage: 8,
    flowContribution: 11,
    keyRole: 'Cửa ngõ cuối cùng đổ ra biển Đông, bồi đắp vựa lúa - nông thủy sản ĐBSCL nuôi sống cả nước.',
    mainIssue: 'Xâm nhập mặn, sạt lở bờ sông, thiếu hụt trầm tích, sụt lún mặt đất do biến đổi khí hậu & đập thượng nguồn.'
  }
];

export const VIETNAM_IMPACT_SECTIONS = [
  {
    id: 'nature',
    title: '🌾 Món quà Phù Sa & "Mùa Nước Nổi"',
    icon: 'Wheat',
    summary: 'Mùa lũ ở ĐBSCL không phải thiên tai mà là phúc lành mang tính chu kỳ sinh thái.',
    points: [
      'Mỗi năm sông Mê Kông mang theo hàng chục triệu tấn phù sa màu mỡ bồi đắp đồng ruộng, thau rửa chua phèn cho Đồng Tháp Mười và Tứ Giác Long Xuyên.',
      'Mùa nước nổi (tháng 9 - tháng 11) đem về nguồn lợi thủy sản dồi dào: cá linh non, bông điên điển, tôm tép, tạo sinh kế phong phú cho hàng triệu nông dân.',
      'ĐBSCL đóng góp 50% sản lượng lúa, 90% sản lượng gạo xuất khẩu, 70% trái cây và 65% thủy sản của cả nước Việt Nam.'
    ]
  },
  {
    id: 'challenges',
    title: '⚠️ 4 Thách Thức Sống Còn Của ĐBSCL',
    icon: 'AlertTriangle',
    summary: 'Tác động kép từ đập thủy điện thượng lưu và biến đổi khí hậu toàn cầu.',
    points: [
      'Thiếu hụt phù sa trầm tích: Các đập thượng nguồn chặn hơn 70% lượng bùn cát, khiến bờ sông, bờ biển sạt lở dữ dội (hàng trăm km sạt lở mỗi năm).',
      'Xâm nhập mặn khốc liệt: Mùa khô dòng chảy ngọt bị suy giảm, nước biển lấn sâu từ 50 - 90 km vào nội đồng (Bến Tre, Tiền Giang, Sóc Trăng).',
      'Sụt lún mặt đất & hạ thấp tầng nước ngầm: ĐBSCL đang chìm nhanh hơn tốc độ nước biển dâng do khai thác nước ngầm quá mức.',
      'Suy giảm nguồn lợi thủy sản: Cá linh, cá tra tự nhiên giảm sút mạnh do mất bãi đẻ và chu kỳ lũ bị gián đoạn.'
    ]
  },
  {
    id: 'solutions',
    title: '🛡️ Nghị Quyết 120 & Triết Lý "Thuận Thiên"',
    icon: 'ShieldCheck',
    summary: 'Chuyển hóa thách thức thành cơ hội phát triển bền vững theo quy luật tự nhiên.',
    points: [
      'Chiến lược "Thuận thiên": Không cưỡng lại tự nhiên, chủ động thích ứng, coi nước mặn - nước lợ là tài nguyên quý giá.',
      'Chuyển đổi mô hình sản xuất: Vùng ngọt (lúa chất lượng cao, trái cây) - Vùng lợ/mặn (mô hình thông minh Lúa - Tôm sinh thái, nuôi cua, rừng ngập mặn).',
      'Công trình thủy lợi hiện đại: Vận hành cống siêu lớn Cái Lớn - Cái Bé kiểm soát nguồn nước linh hoạt đa mục tiêu.',
      'Hợp tác quốc tế trong Ủy ban sông Mê Kông (MRC): Đẩy mạnh chia sẻ dữ liệu thủy văn thời gian thực và đàm phán bảo đảm an ninh nguồn nước xuyên biên giới.'
    ]
  }
];
