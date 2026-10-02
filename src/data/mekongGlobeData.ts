export interface GlobeCountryTransit {
  id: string;
  order: number;
  country: string;
  localName: string;
  flag: string;
  capital: string;
  lengthKm: number;
  basinPercent: number;
  waterContributionPercent: number;
  drySeasonDischarge: string; // m³/s
  floodSeasonDischarge: string; // m³/s
  averageDischarge: string; // m³/s
  lat: number;
  lon: number;
  zoomLevel: number;
  elevationM: string;
  riverTerrainDesc: string;
  hydrologicalRole: string;
  majorDams: string[];
  majorPorts: string[];
  keyBridges: string[];
  ecologicalHighlights: string[];
  borderFeatures: string;
  speechSummary: string;
}

export interface GlobeRiverPoint {
  lat: number;
  lon: number;
  name: string;
  country: string;
  elevation: number;
  discharge: number; // m³/s average
  floodDischarge: number; // m³/s flood peak
  dryDischarge: number; // m³/s dry season
  type: 'source' | 'river' | 'dam' | 'confluence' | 'waterfall' | 'delta' | 'estuary';
  desc: string;
}

export interface GlobeTransportHub {
  id: string;
  name: string;
  type: 'port' | 'bridge' | 'dam' | 'shipping-route';
  country: string;
  lat: number;
  lon: number;
  capacityOrSpecs: string;
  desc: string;
}

// 6 Countries Flow Journey along the Mekong River
export const MEKONG_6_COUNTRIES_TRANSIT: GlobeCountryTransit[] = [
  {
    id: 'cn',
    order: 1,
    country: 'Trung Quốc',
    localName: 'Lan Thương Giang (Láncāng Jiāng)',
    flag: '🇨🇳',
    capital: 'Bắc Kinh (Đoạn sông qua Thanh Hải & Vân Nam)',
    lengthKm: 2130,
    basinPercent: 21,
    waterContributionPercent: 16,
    drySeasonDischarge: '800 - 1.200 m³/s',
    floodSeasonDischarge: '3.500 - 5.000 m³/s',
    averageDischarge: '2.140 m³/s',
    lat: 27.5,
    lon: 99.5,
    zoomLevel: 2.2,
    elevationM: '4.968m (Tây Tạng) xuống 500m (Vân Nam)',
    riverTerrainDesc: 'Địa hình thượng nguồn dốc đứng hiểm trở, hẻm vực sâu thăm thẳm, dòng nước siết quanh năm nuôi dưỡng bởi băng tuyết tan.',
    hydrologicalRole: 'Cung cấp 16% tổng lượng nước cả năm, nhưng vào mùa khô đóng góp tới 40% dòng chảy cho hạ du.',
    majorDams: ['Tiểu Loan (Xiaowan - 292m)', 'Nọa Trát Độ (Nuozhadu - 5.850 MW)', 'Cảnh Hồng (Jinghong)'],
    majorPorts: ['Cảng Cảnh Hồng (Jinghong Port)', 'Cảng Tư Mao (Simao)'],
    keyBridges: ['Cầu dây văng Lan Thương Giang', 'Cầu đường sắt Vân Nam - Lào'],
    ecologicalHighlights: ['Hệ sinh thái tuyết núi cao Himalaya', 'Báo tuyết, cừu lam', 'Rừng lá kim ôn đới'],
    borderFeatures: 'Nằm hoàn toàn trong nội địa Trung Quốc trước khi trở thành biên giới với Myanmar và Lào.',
    speechSummary: 'Điểm khởi đầu của sông Mê Công tại Trung Quốc có tên Lan Thương Giang, bắt nguồn từ độ cao gần 5.000 mét ở cao nguyên Tây Tạng, dài hơn 2.130 km, đóng góp 16% tổng lượng nước và phát triển nhiều đập thủy điện bậc thang.'
  },
  {
    id: 'mm',
    order: 2,
    country: 'Myanmar',
    localName: 'Mae Khaung (မဲခေါင်မြစ်)',
    flag: '🇲🇲',
    capital: 'Naypyidaw (Biên giới bang Shan)',
    lengthKm: 234,
    basinPercent: 3,
    waterContributionPercent: 2,
    drySeasonDischarge: '950 - 1.400 m³/s',
    floodSeasonDischarge: '4.000 - 6.000 m³/s',
    averageDischarge: '2.400 m³/s',
    lat: 21.0,
    lon: 100.8,
    zoomLevel: 2.3,
    elevationM: '360m - 280m',
    riverTerrainDesc: 'Đoạn sông ngắn giữ vai trò đường biên giới tự nhiên giữa bang Shan (Myanmar) và Bắc Lào, lòng sông mở rộng dần.',
    hydrologicalRole: 'Đóng góp 2% lượng nước toàn lưu vực, duy trì chất lượng nguồn nước nguyên sinh từ các cánh rừng mưa đầu nguồn.',
    majorDams: ['Không xây dựng đập lớn trên dòng chính'],
    majorPorts: ['Cảng cạn Wan Pong (Bang Shan)'],
    keyBridges: ['Cầu hữu nghị Myanmar - Lào (Wan Pong Bridge)'],
    ecologicalHighlights: ['Hành lang rừng tự nhiên nguyên sinh', 'Khu sinh thái rừng mưa gió mùa', 'Khu bảo tồn gấu đen'],
    borderFeatures: 'Đường biên giới tự nhiên kéo dài 234 km với Lào, tạo thành tam giác kết nối giao thương tiểu vùng.',
    speechSummary: 'Tại Myanmar, sông Mê Công chảy dọc theo 234 km đường biên giới tự nhiên giáp với Lào, đi qua khu vực rừng nguyên sinh bang Shan và đóng góp khoảng 2% lượng nước.'
  },
  {
    id: 'la',
    order: 3,
    country: 'Lào',
    localName: 'Nam Khong (ແມ່ນ້ຳຂອງ - Mẹ Của Mọi Dòng Sông)',
    flag: '🇱🇦',
    capital: 'Viêng Chăn (Vientiane)',
    lengthKm: 1875,
    basinPercent: 25,
    waterContributionPercent: 35,
    drySeasonDischarge: '1.800 - 3.200 m³/s',
    floodSeasonDischarge: '15.000 - 26.000 m³/s',
    averageDischarge: '5.270 m³/s',
    lat: 18.2,
    lon: 102.6,
    zoomLevel: 2.1,
    elevationM: '300m xuống 80m (Thác Khone)',
    riverTerrainDesc: 'Dòng sông là xương sống địa lý của đất nước Lào, uốn lượn qua các dãy núi đá vôi, đồi lượn sóng và ghềnh thác Si Phan Don hùng vĩ.',
    hydrologicalRole: 'Quốc gia đóng góp lớn nhất vào dòng chảy Mê Công (35%), mạng lưới phụ lưu phong phú như Nam Ou, Nam Ngum, Nam Theun.',
    majorDams: ['Đập Xayaburi (1.285 MW)', 'Đập Don Sahong (260 MW)', 'Pak Beng (dự án)'],
    majorPorts: ['Cảng Luang Prabang', 'Cảng hàng hóa Vientiane', 'Cảng Pakse'],
    keyBridges: ['Cầu Hữu nghị Lào - Thái Lan 1 (Vientiane - Nong Khai)', 'Cầu Hữu nghị 2, 3, 4'],
    ecologicalHighlights: ['Cá Tra Dầu khổng lồ (Pangasianodon gigas)', 'Cá heo nước ngọt Irrawaddy tại Thác Khone', 'Quần đảo Si Phan Don (4.000 đảo)'],
    borderFeatures: 'Chảy qua các cố đô lịch sử và tạo thành đường biên giới dài hơn 976 km với Thái Lan.',
    speechSummary: 'Lào là trái tim thủy văn của Mê Công, đóng góp tới 35% tổng lưu lượng nước. Sông chảy qua chiều dài 1.875 km từ Luang Prabang, thủ đô Viêng Chăn cho tới thác nước Khone rộng nhất thế giới.'
  },
  {
    id: 'th',
    order: 4,
    country: 'Thái Lan',
    localName: 'Mae Nam Khong (แม่น้ำโขง)',
    flag: '🇹🇭',
    capital: 'Bangkok (Vùng Đông Bắc - Isan)',
    lengthKm: 976,
    basinPercent: 23,
    waterContributionPercent: 18,
    drySeasonDischarge: '2.100 - 4.500 m³/s',
    floodSeasonDischarge: '18.000 - 28.000 m³/s',
    averageDischarge: '5.800 m³/s',
    lat: 16.5,
    lon: 103.5,
    zoomLevel: 2.1,
    elevationM: '180m - 110m',
    riverTerrainDesc: 'Chảy dọc bờ hữu ngạn, nuôi dưỡng vùng bình nguyên nông nghiệp rộng lớn Isan thuộc 8 tỉnh Đông Bắc Thái Lan.',
    hydrologicalRole: 'Đóng góp 18% tổng lượng nước, phụ lưu chính là hệ thống sông Mun - Chi hội tụ dòng nước mát.',
    majorDams: ['Đập Pak Mun (trên phụ lưu sông Mun)', 'Hồ chứa Ubol Ratana'],
    majorPorts: ['Cảng quốc tế Chiang Saen', 'Cảng Chiang Khong', 'Cảng Nong Khai'],
    keyBridges: ['Cầu Hữu nghị Thái - Lào 1, 2 (Mukdahan), 3 (Nakhon Phanom), 4 (Chiang Khong)'],
    ecologicalHighlights: ['Vùng đất ngập nước Ramsar Songkhram', 'Bãi đẻ tự nhiên của hàng trăm loài cá trắng di cư'],
    borderFeatures: 'Biên giới sông nước hữu nghị, phát triển mạnh mẽ giao lưu thương mại và du lịch văn hóa hai bờ.',
    speechSummary: 'Tại Thái Lan, sông Mê Công ôm trọn vùng Đông Bắc Isan dọc theo chiều dài 976 km, đóng góp 18% lượng nước và là nguồn tưới tiêu sống còn cho vựa nông sản của vương quốc.'
  },
  {
    id: 'kh',
    order: 5,
    country: 'Campuchia',
    localName: 'Tonle Thom (ទន្លេធំ - Sông Lớn)',
    flag: '🇰🇭',
    capital: 'Phnom Penh',
    lengthKm: 500,
    basinPercent: 19,
    waterContributionPercent: 18,
    drySeasonDischarge: '3.000 - 5.500 m³/s',
    floodSeasonDischarge: '28.000 - 42.000 m³/s',
    averageDischarge: '13.200 m³/s',
    lat: 12.2,
    lon: 105.0,
    zoomLevel: 2.2,
    elevationM: '50m xuống 10m',
    riverTerrainDesc: 'Vùng trũng đồng bằng rộng lớn, nơi diễn ra hiện tượng đảo chiều dòng chảy kỳ diệu qua sông Tonle Sap vào Biển Hồ.',
    hydrologicalRole: 'Trái tim điều tiết sinh thái: Mùa lũ tiếp nhận nước vào Biển Hồ (dung tích lên đến 80 tỉ m³), mùa khô xả nước ngược lại điều tiết cho ĐBSCL.',
    majorDams: ['Hạ Sesan 2 (trên phụ lưu 3S: Sesan - Srepok - Sekong)'],
    majorPorts: ['Cảng tự trị Phnom Penh (Phnom Penh Autonomous Port)', 'Cảng Kampong Cham'],
    keyBridges: ['Cầu Kizuna (Kampong Cham)', 'Cầu Tsubasa (Neak Loeung - Quốc lộ 1)'],
    ecologicalHighlights: ['Khu dự trữ sinh quyển Biển Hồ Tonle Sap', 'Vựa cá nước ngọt năng suất hàng đầu hành tinh', 'Rừng ngập nước flooded forest'],
    borderFeatures: 'Hợp lưu với dòng sông Tonle Sap tại Ngã tư sông Chaktomuk ngay trung tâm thủ đô Phnom Penh trước khi tách nhánh vào Việt Nam.',
    speechSummary: 'Đến Campuchia, sông Mê Công mang tên Tonle Thom, kết nối với Biển Hồ Tonle Sap qua cơ chế đảo chiều dòng chảy độc nhất vô nhị trên thế giới, đóng vai trò hồ điều hòa tự nhiên khổng lồ.'
  },
  {
    id: 'vn',
    order: 6,
    country: 'Việt Nam',
    localName: 'Sông Cửu Long (Sông Tiền & Sông Hậu)',
    flag: '🇻🇳',
    capital: 'Hà Nội (Đoạn sông qua Đồng Bằng Sông Cửu Long)',
    lengthKm: 230,
    basinPercent: 8,
    waterContributionPercent: 11,
    drySeasonDischarge: '2.500 - 4.500 m³/s (Nguy cơ mặn)',
    floodSeasonDischarge: '25.000 - 38.000 m³/s',
    averageDischarge: '15.000 m³/s',
    lat: 10.2,
    lon: 105.8,
    zoomLevel: 2.3,
    elevationM: 'Dưới 2m (Rất nhạy cảm với mực nước biển)',
    riverTerrainDesc: 'Vùng hạ châu thổ phì nhiêu với mạng lưới sông rạch chằng chịt, chia thành 2 dòng chính là sông Tiền và sông Hậu, đổ ra biển qua 9 cửa sông Cửu Long.',
    hydrologicalRole: 'Cửa ngõ cuối cùng thoát nước ra Biển Đông; đón nhận lượng nước dồi dào tạo nên mùa nước nổi, đồng thời chịu áp lực xâm nhập mặn vào mùa khô.',
    majorDams: ['Không xây đập (ưu tiên hệ thống cống thủy lợi Cái Lớn - Cái Bé, cống Ba Lai điều tiết mặn - ngọt)'],
    majorPorts: ['Cảng Cần Thơ (Cái Cui)', 'Cảng biển quốc tế Trần Đề (quy hoạch)', 'Cảng Mỹ Tho'],
    keyBridges: ['Cầu Mỹ Thuận 1 & 2', 'Cầu Cần Thơ', 'Cầu Rạch Miễu 1 & 2', 'Cầu Vàm Cống', 'Cầu Cao Lãnh'],
    ecologicalHighlights: ['Vườn quốc gia Tràm Chim (Sếu đầu đỏ)', 'Rừng tràm Trà Sư', 'Cá linh mùa nước nổi', 'Rừng ngập mặn Cà Mau'],
    borderFeatures: 'Sông chảy vào Việt Nam tại Vĩnh Xương (An Giang) và Thường Phước (Đồng Tháp), tạo nên cái nôi kinh tế nông nghiệp lớn nhất nước.',
    speechSummary: 'Điểm dừng chân cuối cùng của Mê Công tại Việt Nam chính là Đồng Bằng Sông Cửu Long. Sông chia thành sông Tiền và sông Hậu, tỏa ra 9 cửa sông huyền thoại ra Biển Đông, bồi đắp vựa lúa và thủy sản nuôi sống hàng chục triệu người.'
  }
];

// Coordinates along the real Mekong River path for 3D Globe Spline
export const MEKONG_RIVER_3D_PATH: GlobeRiverPoint[] = [
  // 1. Tibet Source & High Plateau (China)
  { lat: 33.71, lon: 94.68, name: 'Khởi nguồn Lasagongma (Tây Tạng)', country: 'Trung Quốc', elevation: 4968, discharge: 15, floodDischarge: 80, dryDischarge: 5, type: 'source', desc: 'Bắt nguồn từ sông băng tuyết trên dãy Đăng Đát Lạp Lĩnh' },
  { lat: 32.85, lon: 96.12, name: 'Za Qu (Tây Tạng)', country: 'Trung Quốc', elevation: 4200, discharge: 95, floodDischarge: 350, dryDischarge: 30, type: 'river', desc: 'Hẻm núi cao nguyên đá phiến' },
  { lat: 31.42, lon: 97.45, name: 'Xương Đô (Chamdo)', country: 'Trung Quốc', elevation: 3240, discharge: 320, floodDischarge: 1100, dryDischarge: 120, type: 'confluence', desc: 'Nơi hợp lưu của sông Za Qu và Ngom Qu thành dòng Lan Thương' },
  { lat: 28.52, lon: 98.78, name: 'Đức Khâm (Deqin - Hẻm Tam Giang)', country: 'Trung Quốc', elevation: 2200, discharge: 680, floodDischarge: 2100, dryDischarge: 290, type: 'river', desc: 'Vùng di sản thế giới Tam Giang Tịnh Lưu của UNESCO' },
  { lat: 26.25, lon: 99.35, name: 'Đập Tiểu Loan (Xiaowan)', country: 'Trung Quốc', elevation: 1240, discharge: 1220, floodDischarge: 3200, dryDischarge: 650, type: 'dam', desc: 'Đập vòm bê tông cao 292m, công suất 4.200 MW' },
  { lat: 24.38, lon: 100.42, name: 'Đập Nọa Trát Độ (Nuozhadu)', country: 'Trung Quốc', elevation: 810, discharge: 1650, floodDischarge: 4300, dryDischarge: 820, type: 'dam', desc: 'Nhà máy thủy điện lớn nhất lưu vực (5.850 MW)' },
  { lat: 22.01, lon: 100.80, name: 'Cảnh Hồng (Jinghong - Xishuangbanna)', country: 'Trung Quốc', elevation: 535, discharge: 1850, floodDischarge: 4800, dryDischarge: 910, type: 'river', desc: 'Cửa ngõ vận tải đường thủy của Trung Quốc hướng xuống ASEAN' },

  // 2. Myanmar - Laos Border (Golden Triangle)
  { lat: 21.25, lon: 100.95, name: 'Giao điểm Myanmar - Lào', country: 'Myanmar - Lào', elevation: 420, discharge: 2100, floodDischarge: 5200, dryDischarge: 1020, type: 'river', desc: 'Đường biên giới nước tự nhiên dài 234 km' },
  { lat: 20.35, lon: 100.08, name: 'Tam Giác Vàng (Sop Ruak)', country: 'Thái Lan - Lào - Myanmar', elevation: 360, discharge: 2350, floodDischarge: 5600, dryDischarge: 1100, type: 'confluence', desc: 'Nơi sông Ruak nhập dòng vào Mê Kông' },

  // 3. Northern Laos
  { lat: 20.26, lon: 100.41, name: 'Chiang Saen / Chiang Khong', country: 'Thái Lan - Lào', elevation: 350, discharge: 2450, floodDischarge: 5900, dryDischarge: 1150, type: 'river', desc: 'Trạm quan trắc thủy văn MRC then chốt vùng giáp ranh' },
  { lat: 20.08, lon: 101.55, name: 'Pak Beng (Bắc Lào)', country: 'Lào', elevation: 310, discharge: 2800, floodDischarge: 7200, dryDischarge: 1300, type: 'river', desc: 'Hẻm núi đá vôi miền Bắc Lào' },
  { lat: 19.89, lon: 102.14, name: 'Cố đô Luang Prabang', country: 'Lào', elevation: 280, discharge: 3900, floodDischarge: 12000, dryDischarge: 1600, type: 'river', desc: 'Hợp lưu với sông Nam Ou, di sản văn hóa thế giới' },
  { lat: 19.42, lon: 101.85, name: 'Đập Xayaburi', country: 'Lào', elevation: 240, discharge: 4100, floodDischarge: 13500, dryDischarge: 1700, type: 'dam', desc: 'Đập thủy điện dòng chính 1.285 MW' },

  // 4. Vientiane & Middle Mekong (Laos - Thailand border)
  { lat: 17.96, lon: 102.61, name: 'Thủ đô Viêng Chăn & Nong Khai', country: 'Lào - Thái Lan', elevation: 165, discharge: 4600, floodDischarge: 16000, dryDischarge: 1850, type: 'river', desc: 'Cầu Hữu nghị Lào - Thái Lan số 1' },
  { lat: 17.40, lon: 104.78, name: 'Nakhon Phanom & Thakhek', country: 'Thái Lan - Lào', elevation: 140, discharge: 6800, floodDischarge: 21000, dryDischarge: 2200, type: 'river', desc: 'Dòng sông rộng trên 1.200m' },
  { lat: 16.54, lon: 104.74, name: 'Mukdahan & Savannakhet', country: 'Thái Lan - Lào', elevation: 125, discharge: 7900, floodDischarge: 24000, dryDischarge: 2500, type: 'river', desc: 'Hành lang kinh tế Đông - Tây (EWEC)' },
  { lat: 15.31, lon: 105.50, name: 'Hợp lưu sông Mun (Pak Mun)', country: 'Thái Lan - Lào', elevation: 105, discharge: 9200, floodDischarge: 27000, dryDischarge: 2800, type: 'confluence', desc: 'Hấp thu dòng chảy từ toàn bộ vùng Đông Bắc Thái Lan' },
  { lat: 15.12, lon: 105.80, name: 'Pakse (Nam Lào)', country: 'Lào', elevation: 90, discharge: 10100, floodDischarge: 29500, dryDischarge: 3100, type: 'river', desc: 'Trung tâm kinh tế miền Nam Lào' },
  { lat: 13.95, lon: 105.94, name: 'Thác Khone & Si Phan Don', country: 'Lào', elevation: 70, discharge: 11000, floodDischarge: 32000, dryDischarge: 3300, type: 'waterfall', desc: 'Thác ghềnh lớn nhất thế giới, biên giới tự nhiên với Campuchia' },

  // 5. Cambodia
  { lat: 13.52, lon: 105.97, name: 'Stung Treng', country: 'Campuchia', elevation: 45, discharge: 12500, floodDischarge: 35000, dryDischarge: 3600, type: 'confluence', desc: 'Hợp lưu của lưu vực phụ lưu 3S (Sesan, Srepok, Sekong)' },
  { lat: 12.48, lon: 106.02, name: 'Kratie (Trạm thủy văn mốc MRC)', country: 'Campuchia', elevation: 20, discharge: 13500, floodDischarge: 38500, dryDischarge: 3800, type: 'river', desc: 'Trạm thủy văn kiểm soát lưu lượng quan trọng nhất của MRC' },
  { lat: 11.99, lon: 105.46, name: 'Kampong Cham', country: 'Campuchia', elevation: 15, discharge: 14000, floodDischarge: 40000, dryDischarge: 3900, type: 'river', desc: 'Vùng phù sa đồng bằng trung tâm Campuchia' },
  { lat: 11.57, lon: 104.94, name: 'Thủ đô Phnom Penh (Chaktomuk)', country: 'Campuchia', elevation: 10, discharge: 14800, floodDischarge: 43000, dryDischarge: 4100, type: 'confluence', desc: 'Ngã tư sông: Mê Kông trên, Mê Kông dưới, Bassac và Tonle Sap' },
  { lat: 12.50, lon: 104.20, name: 'Biển Hồ Tonle Sap (Hồ tích nước)', country: 'Campuchia', elevation: 8, discharge: 3500, floodDischarge: 9500, dryDischarge: 1200, type: 'confluence', desc: 'Hồ tự nhiên điều hòa dòng chảy: tích lũ mùa mưa và xả nước mùa khô' },

  // 6. Vietnam (Mekong Delta & 9 Estuaries)
  { lat: 10.82, lon: 105.15, name: 'Tân Châu & Châu Đốc (Cửa ngõ ĐBSCL)', country: 'Việt Nam', elevation: 3.5, discharge: 15000, floodDischarge: 39000, dryDischarge: 4200, type: 'delta', desc: 'Sông Mê Kông vào Việt Nam chia thành 2 nhánh: Sông Tiền và Sông Hậu' },
  { lat: 10.45, lon: 105.63, name: 'Cao Lãnh (Sông Tiền) & Sa Đéc', country: 'Việt Nam', elevation: 2.0, discharge: 8500, floodDischarge: 22000, dryDischarge: 2400, type: 'river', desc: 'Vùng hoa kiểng và vựa lúa Đồng Tháp Mười' },
  { lat: 10.03, lon: 105.78, name: 'Thành phố Cần Thơ (Sông Hậu)', country: 'Việt Nam', elevation: 1.5, discharge: 6500, floodDischarge: 17000, dryDischarge: 1800, type: 'river', desc: 'Thủ phủ miền Tây, Chợ nổi Cái Răng và cảng Cái Cui' },
  { lat: 10.35, lon: 106.36, name: 'Mỹ Tho - Bến Tre (Châu thổ Sông Tiền)', country: 'Việt Nam', elevation: 1.2, discharge: 4500, floodDischarge: 12000, dryDischarge: 1300, type: 'river', desc: 'Xứ dừa và phân nhánh sông Ba Lai, Cổ Chiên, Hàm Luông' },
  
  // 9 Estuaries to East Sea
  { lat: 10.27, lon: 106.75, name: 'Cửa Tiểu & Cửa Đại (Tiền Giang)', country: 'Việt Nam', elevation: 0, discharge: 2200, floodDischarge: 5500, dryDischarge: 600, type: 'estuary', desc: 'Cửa sông Tiền đổ ra biển Đông tại Gò Công Đông' },
  { lat: 10.05, lon: 106.68, name: 'Cửa Ba Lai & Hàm Luông (Bến Tre)', country: 'Việt Nam', elevation: 0, discharge: 1800, floodDischarge: 4800, dryDischarge: 500, type: 'estuary', desc: 'Cửa sông Ba Lai đã đắp đập ngăn mặn; Cửa Hàm Luông sâu rộng' },
  { lat: 9.85, lon: 106.58, name: 'Cửa Cổ Chiên & Cung Hầu (Trà Vinh)', country: 'Việt Nam', elevation: 0, discharge: 2600, floodDischarge: 6800, dryDischarge: 750, type: 'estuary', desc: 'Đổ ra biển bao bọc cù lao Hòa Minh' },
  { lat: 9.53, lon: 106.28, name: 'Cửa Định An & Trần Đề (Sóc Trăng)', country: 'Việt Nam', elevation: 0, discharge: 3900, floodDischarge: 9800, dryDischarge: 1150, type: 'estuary', desc: 'Hai cửa biển khổng lồ của sông Hậu đưa nước Cửu Long ra Biển Đông' }
];

// Transport Hubs & Navigation on Globe
export const MEKONG_TRANSPORT_HUBS: GlobeTransportHub[] = [
  {
    id: 'port-jinghong',
    name: 'Cảng Cảnh Hồng (Jinghong)',
    type: 'port',
    country: 'Trung Quốc',
    lat: 22.01,
    lon: 100.80,
    capacityOrSpecs: 'Tàu hàng 500 tấn',
    desc: 'Đầu mối hàng hải quốc tế thượng nguồn Mê Kông nối Trung Quốc với ASEAN.'
  },
  {
    id: 'port-chiangsaen',
    name: 'Cảng Chiềng Saen (Chiang Saen)',
    type: 'port',
    country: 'Thái Lan',
    lat: 20.27,
    lon: 100.09,
    capacityOrSpecs: 'Tàu hàng 300-500 tấn',
    desc: 'Cửa ngõ logistics đường sông trọng điểm của miền Bắc Thái Lan.'
  },
  {
    id: 'bridge-friendship-1',
    name: 'Cầu Hữu Nghị Lào - Thái Lan 1',
    type: 'bridge',
    country: 'Lào - Thái Lan',
    lat: 17.88,
    lon: 102.71,
    capacityOrSpecs: 'Dài 1.170m (Đường bộ & Đường sắt)',
    desc: 'Cầu xuyên biên giới nối Nong Khai và thủ đô Viêng Chăn, khánh thành năm 1994.'
  },
  {
    id: 'dam-xiaowan',
    name: 'Thủy điện Tiểu Loan (Xiaowan Dam)',
    type: 'dam',
    country: 'Trung Quốc',
    lat: 24.70,
    lon: 100.09,
    capacityOrSpecs: 'Công suất 4.200 MW, cao 292m',
    desc: 'Đập vòm cao thứ hai thế giới, dung tích hồ chứa gần 15 tỉ m³.'
  },
  {
    id: 'dam-xayaburi',
    name: 'Thủy điện Xayaburi',
    type: 'dam',
    country: 'Lào',
    lat: 19.25,
    lon: 101.81,
    capacityOrSpecs: 'Công suất 1.285 MW',
    desc: 'Đập dâng dòng chính đầu tiên tại hạ lưu Mê Kông, trang bị hệ thống âu thuyền và thang cá.'
  },
  {
    id: 'port-phnompenh',
    name: 'Cảng Tự Trị Phnom Penh (PPAP)',
    type: 'port',
    country: 'Campuchia',
    lat: 11.58,
    lon: 104.93,
    capacityOrSpecs: 'Tiếp nhận tàu container sông biển 5.000 DWT',
    desc: 'Cảng nước ngọt trung tâm kết nối trực tiếp với cụm cảng Cái Mép - Thị Vải của Việt Nam.'
  },
  {
    id: 'port-cantho',
    name: 'Cảng Cái Cui (Cần Thơ)',
    type: 'port',
    country: 'Việt Nam',
    lat: 10.01,
    lon: 105.82,
    capacityOrSpecs: 'Tàu biển trọng tải tới 20.000 tấn',
    desc: 'Đầu mối cảng biển lớn nhất vùng kinh tế trọng điểm ĐBSCL.'
  },
  {
    id: 'bridge-my-thuan',
    name: 'Cụm Cầu Mỹ Thuận 1 & 2',
    type: 'bridge',
    country: 'Việt Nam',
    lat: 10.28,
    lon: 105.98,
    capacityOrSpecs: 'Cầu dây văng cao tốc Bắc - Nam',
    desc: 'Huyết mạch giao thông đường bộ vượt sông Tiền nối Tiền Giang và Vĩnh Long.'
  }
];

export interface RiverWaypoint {
  lat: number;
  lon: number;
  name: string;
  country: string;
  elevation: number;
  flowNormal: number;
  flowFlood: number;
  flowDry: number;
  description: string;
}

export interface GlobeStation {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  flag: string;
  lat: number;
  lon: number;
  elevation: number;
  flowNormal: number;
  flowFlood: number;
  flowDry: number;
  flowContribution: string;
  velocity: string;
  sediment: string;
  role: string;
  keyFeature: string;
}

export interface NavigationPort {
  id: string;
  name: string;
  country: string;
  lat: number;
  lon: number;
  type: 'port' | 'bridge' | 'checkpoint' | 'dam' | 'shipping-route';
  capacity: string;
  significance: string;
}

export const MEKONG_RIVER_COORDINATES: RiverWaypoint[] = MEKONG_RIVER_3D_PATH.map((p) => ({
  lat: p.lat,
  lon: p.lon,
  name: p.name,
  country: p.country,
  elevation: p.elevation,
  flowNormal: p.discharge,
  flowFlood: p.floodDischarge,
  flowDry: p.dryDischarge,
  description: p.desc
}));

export const TONLE_SAP_COORDINATES = [
  { lat: 11.57, lon: 104.94 },
  { lat: 11.90, lon: 104.65 },
  { lat: 12.30, lon: 104.30 },
  { lat: 12.75, lon: 104.05 },
  { lat: 13.20, lon: 103.75 }
];

export const GLOBE_STATIONS: GlobeStation[] = [
  {
    id: 'st-tibet',
    name: 'Khởi Nguồn Tây Tạng',
    country: 'Trung Quốc',
    countryCode: 'CN',
    flag: '🇨🇳',
    lat: 33.71,
    lon: 94.68,
    elevation: 4968,
    flowNormal: 320,
    flowFlood: 1100,
    flowDry: 120,
    flowContribution: 'Thượng nguồn chiếm 16% tổng dòng chảy năm (mùa khô tới 40%)',
    velocity: '2.5 m/s (Dòng chảy hẻm núi rất xiết)',
    sediment: '120 ppm (Chủ yếu nước băng tuyết tan trong vắt)',
    role: 'Nguồn nước khởi sinh của toàn bộ dòng sông',
    keyFeature: 'Bắt nguồn từ các sông băng trên dãy Đăng Lực La (Tangla), độ cao gần 5.000m.'
  },
  {
    id: 'st-jinghong',
    name: 'Cảnh Hồng (Vân Nam)',
    country: 'Trung Quốc',
    countryCode: 'CN',
    flag: '🇨🇳',
    lat: 22.01,
    lon: 100.80,
    elevation: 535,
    flowNormal: 1850,
    flowFlood: 4800,
    flowDry: 910,
    flowContribution: 'Hạ lưu chuỗi 11 đập thủy điện bậc thang Lan Thương',
    velocity: '1.8 m/s',
    sediment: '320 ppm (Giảm mạnh do hồ chứa giữ phù sa thô)',
    role: 'Cửa ngõ xả nước thủy điện & cảng xuất nhập khẩu',
    keyFeature: 'Điểm giao lưu thương mại hàng hải quốc tế đầu nguồn của Trung Quốc với ASEAN.'
  },
  {
    id: 'st-chiangsaen',
    name: 'Chiang Saen (Tam Giác Vàng)',
    country: 'Thái Lan',
    countryCode: 'TH',
    flag: '🇹🇭🇱🇦🇲🇲',
    lat: 20.27,
    lon: 100.09,
    elevation: 350,
    flowNormal: 2450,
    flowFlood: 5900,
    flowDry: 1150,
    flowContribution: 'Vùng giáp ranh 3 nước Thái Lan - Lào - Myanmar',
    velocity: '1.5 m/s',
    sediment: '410 ppm',
    role: 'Trạm kiểm soát thủy văn then chốt của MRC',
    keyFeature: 'Khu vực địa chính trị lịch sử, lòng sông bắt đầu mở rộng sang vùng đồi thấp.'
  },
  {
    id: 'st-luangprabang',
    name: 'Cố Đô Luang Prabang',
    country: 'Lào',
    countryCode: 'LA',
    flag: '🇱🇦',
    lat: 19.89,
    lon: 102.14,
    elevation: 280,
    flowNormal: 3900,
    flowFlood: 12000,
    flowDry: 1600,
    flowContribution: 'Bắc Lào tiếp nhận nước từ rừng nguyên sinh & phụ lưu Nam Ou',
    velocity: '1.4 m/s',
    sediment: '490 ppm',
    role: 'Trung tâm văn hóa & đập Xayaburi hạ du',
    keyFeature: 'Cố đô di sản thế giới UNESCO, thuyền độc mộc và du lịch sinh thái sông nước.'
  },
  {
    id: 'st-vientiane',
    name: 'Thủ Đô Viêng Chăn / Nong Khai',
    country: 'Lào - Thái Lan',
    countryCode: 'LA-TH',
    flag: '🇱🇦🇹🇭',
    lat: 17.96,
    lon: 102.61,
    elevation: 165,
    flowNormal: 4600,
    flowFlood: 16000,
    flowDry: 1850,
    flowContribution: 'Ranh giới tự nhiên giữa Lào và Đông Bắc Thái Lan',
    velocity: '1.2 m/s',
    sediment: '530 ppm',
    role: 'Cung cấp nguồn nước sinh hoạt & kinh tế hai bờ',
    keyFeature: 'Lòng sông phẳng rộng tới 1.500m, Cầu Hữu nghị 1 nối hai thủ đô.'
  },
  {
    id: 'st-pakse',
    name: 'Pakse & Thác Khone (Nam Lào)',
    country: 'Lào',
    countryCode: 'LA',
    flag: '🇱🇦',
    lat: 15.12,
    lon: 105.80,
    elevation: 90,
    flowNormal: 10100,
    flowFlood: 29500,
    flowDry: 3100,
    flowContribution: 'Lào đóng góp lớn nhất (35%) toàn lưu vực Mê Kông',
    velocity: '2.2 m/s (Gần ghềnh thác)',
    sediment: '610 ppm',
    role: 'Điểm hội tụ dòng chảy từ cao nguyên Bolaven và sông Mun (Thái Lan)',
    keyFeature: 'Thác Khone rộng 10km hùng vĩ, sinh cảnh cá heo Irrawaddy và 4.000 đảo.'
  },
  {
    id: 'st-kratie',
    name: 'Kratie (Cửa Ngõ Campuchia)',
    country: 'Campuchia',
    countryCode: 'KH',
    flag: '🇰🇭',
    lat: 12.48,
    lon: 106.02,
    elevation: 20,
    flowNormal: 13500,
    flowFlood: 38500,
    flowDry: 3800,
    flowContribution: 'Hợp lưu phụ lưu 3S (Sesan - Srepok - Sekong)',
    velocity: '1.1 m/s',
    sediment: '660 ppm (Phù sa giàu dinh dưỡng)',
    role: 'Trạm quan trắc thủy văn trọng yếu nhất của MRC',
    keyFeature: 'Khu bảo tồn loài Cá Heo Mê Kông nước ngọt quý hiếm, dòng sông tiến vào vùng trũng bằng phẳng.'
  },
  {
    id: 'st-phnompenh',
    name: 'Phnom Penh & Biển Hồ Tonle Sap',
    country: 'Campuchia',
    countryCode: 'KH',
    flag: '🇰🇭',
    lat: 11.57,
    lon: 104.94,
    elevation: 10,
    flowNormal: 14800,
    flowFlood: 43000,
    flowDry: 4100,
    flowContribution: 'Hiện tượng Đảo chiều dòng chảy Biển Hồ tự nhiên',
    velocity: '0.9 m/s',
    sediment: '710 ppm',
    role: 'Trái tim điều hòa nước và vựa cá nước ngọt cho toàn vùng',
    keyFeature: 'Ngã tư sông Chaktomuk: mùa lũ nước chảy ngược vào Biển Hồ, mùa khô nước xả ra cứu hạn ĐBSCL.'
  },
  {
    id: 'st-tanchau',
    name: 'Tân Châu & Châu Đốc (ĐBSCL)',
    country: 'Việt Nam',
    countryCode: 'VN',
    flag: '🇻🇳',
    lat: 10.82,
    lon: 105.15,
    elevation: 3.5,
    flowNormal: 15000,
    flowFlood: 39000,
    flowDry: 4200,
    flowContribution: 'Phân chia thành Sông Tiền (~80%) và Sông Hậu (~20%)',
    velocity: '0.8 m/s',
    sediment: '760 ppm (Phù sa màu mỡ bồi đắp cánh đồng lúa)',
    role: 'Cửa ngõ đón lũ đầu nguồn và cá tôm mùa nước nổi',
    keyFeature: 'Khu nuôi cá lồng bè danh tiếng An Giang, Đồng Tháp Mười và Tứ giác Long Xuyên.'
  },
  {
    id: 'st-cuulong',
    name: '9 Cửa Sông Cửu Long Đổ Biển Đông',
    country: 'Việt Nam',
    countryCode: 'VN',
    flag: '🇻🇳',
    lat: 10.05,
    lon: 106.68,
    elevation: 0,
    flowNormal: 15000,
    flowFlood: 45000,
    flowDry: 2000,
    flowContribution: 'Tổng lưu lượng xả 475 tỉ m³/năm ra Biển Đông',
    velocity: '0.5 m/s (Chế độ nhật triều và bán nhật triều)',
    sediment: 'Bồi lắng hàng năm tạo nên Mũi Cà Mau vươn ra biển',
    role: 'Điểm kết thúc kỳ vĩ của sông Mê Kông sau 4.763 km',
    keyFeature: '6 cửa sông Tiền + 3 cửa sông Hậu, bồi đắp vựa lúa, trái cây và thủy sản lớn nhất Việt Nam.'
  }
];

export const NAVIGATION_PORTS: NavigationPort[] = MEKONG_TRANSPORT_HUBS.map(hub => ({
  id: hub.id,
  name: hub.name,
  country: hub.country,
  lat: hub.lat,
  lon: hub.lon,
  type: hub.type,
  capacity: hub.capacityOrSpecs,
  significance: hub.desc
}));

export const COUNTRY_FLY_TARGETS = [
  { id: 'all', name: 'Toàn Lưu Vực (6 Nước)', flag: '🌏', lat: 18.5, lon: 103.5, zoom: 2.1, desc: 'Hành trình 4.763 km từ cao nguyên Thanh Tạng đến 9 cửa sông Cửu Long.' },
  { id: 'cn', name: '1. Trung Quốc (Lan Thương)', flag: '🇨🇳', lat: 27.5, lon: 99.5, zoom: 1.5, desc: 'Dài 2.130 km. Băng tuyết Tây Tạng, hẻm núi Tam Giang Tịnh Lưu & chuỗi 11 đập bậc thang.' },
  { id: 'mm', name: '2. Myanmar (Bang Shan)', flag: '🇲🇲', lat: 21.0, lon: 100.8, zoom: 1.6, desc: 'Dài 234 km đường biên giới tự nhiên nguyên sinh với nước bạn Lào.' },
  { id: 'la', name: '3. Lào (Mè Khóng)', flag: '🇱🇦', lat: 18.2, lon: 102.6, zoom: 1.5, desc: 'Dài 1.875 km. Đóng góp 35% lượng nước, thủy điện Xayaburi và Thác Khone 4.000 đảo.' },
  { id: 'th', name: '4. Thái Lan (Isan)', flag: '🇹🇭', lat: 16.5, lon: 103.5, zoom: 1.5, desc: 'Dài 976 km đường biên giới, hệ thống sông Mun - Chi và cao nguyên Khorat phì nhiêu.' },
  { id: 'kh', name: '5. Campuchia (Biển Hồ)', flag: '🇰🇭', lat: 12.2, lon: 105.0, zoom: 1.4, desc: 'Dài 500 km. Biển Hồ Tonle Sap đóng vai trò trái tim điều hòa lũ lụt và vựa cá khổng lồ.' },
  { id: 'vn', name: '6. Việt Nam (Cửu Long)', flag: '🇻🇳', lat: 10.2, lon: 105.8, zoom: 1.3, desc: 'Dài 230 km chia 9 cửa sông. Vựa lúa, trái cây và thủy sản nuôi sống hàng chục triệu người.' }
];

