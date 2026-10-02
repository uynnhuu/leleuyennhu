export interface StatFact {
  label: string;
  value: string;
  subtext: string;
  source: string;
  iconName: string;
}

export interface BasinShareCountry {
  country: string;
  vietnameseName: string;
  percentage: number;
  areaKm2: number;
  localName: string;
  localMeaning: string;
  color: string;
  role: string;
}

export interface TextbookSection {
  id: string;
  number: string;
  title: string;
  pageRange: string;
  summary: string;
  subsections: {
    subtitle: string;
    content: string[];
    highlightNotes?: string[];
    evidence: string;
  }[];
}

export interface MrcProcedure {
  code: string;
  fullNameVi: string;
  fullNameEn: string;
  approvedYear: number;
  purpose: string;
  targetWaterBody: string;
  icon: string;
}

export interface CoreCompetencyStandard {
  id: string;
  order: number;
  title: string;
  shortTitle: string;
  iconName: string;
  curriculumGoal: string;
  badge: string;
  summary: string;
  keyStats: { label: string; value: string }[];
  bulletPoints: {
    heading: string;
    details: string;
    evidence?: string;
  }[];
  criticalAnalysis: string;
  practicalConnection?: string;
  reviewQuestion: string;
  modelAnswer: string;
}

export const MEKONG_KEY_STATS: StatFact[] = [
  {
    label: 'Chiều Dài Toàn Tuyến',
    value: '4.763 km',
    subtext: 'Dài thứ 12 trên thế giới và dài thứ 3 châu Á',
    source: 'SGK Địa lí 11 - Trang 5',
    iconName: 'Ruler'
  },
  {
    label: 'Tổng Diện Tích Lưu Vực',
    value: '810.000 km²',
    subtext: 'Trải dài qua 6 quốc gia từ Tây Tạng đến Biển Đông',
    source: 'SGK Địa lí 11 - Trang 6',
    iconName: 'Map'
  },
  {
    label: 'Tổng Dòng Chảy Thường Niên',
    value: '475 tỉ m³',
    subtext: 'Lũ mùa mưa (tháng 6-11) chiếm 70% - 80% tổng dòng chảy',
    source: 'SGK Địa lí 11 - Trang 6',
    iconName: 'Waves'
  },
  {
    label: 'Đa Dạng Sinh Học Thuỷ Sinh',
    value: 'Hơn 1.000 loài cá',
    subtext: 'Xếp thứ 2 thế giới sau sông Amazon; ~20.000 loài thực vật',
    source: 'SGK Địa lí 11 - Trang 7',
    iconName: 'Fish'
  },
  {
    label: 'Dân Số Hạ Lưu & Sinh Kế',
    value: 'Hơn 65 triệu dân',
    subtext: 'Thuộc hơn 100 nhóm dân tộc; 60% dân số sống nhờ nông nghiệp',
    source: 'SGK Địa lí 11 - Trang 7',
    iconName: 'Users'
  },
  {
    label: 'Vị Thế Xuất Khẩu Của ĐBSCL',
    value: '90% gạo & 53% tôm cá',
    subtext: 'Chiếm 90% gạo & 53% thuỷ sản xuất khẩu của Việt Nam (năm 2020)',
    source: 'SGK Địa lí 11 - Trang 14',
    iconName: 'TrendingUp'
  }
];

export const BASIN_SHARE_DATA: BasinShareCountry[] = [
  {
    country: 'Lào',
    vietnameseName: 'Cộng hòa Dân chủ Nhân dân Lào',
    percentage: 25,
    areaKm2: 202500,
    localName: 'Mê-nam Khong',
    localMeaning: 'Sông Mẹ',
    color: 'bg-amber-500 text-slate-950 border-amber-400',
    role: 'Quốc gia có diện tích lưu vực lớn nhất (25%). Thủy điện dòng chính và các nhánh sông lớn.'
  },
  {
    country: 'Thái Lan',
    vietnameseName: 'Vương quốc Thái Lan',
    percentage: 23,
    areaKm2: 186300,
    localName: 'Mê-nam Khong',
    localMeaning: 'Sông Mẹ',
    color: 'bg-sky-500 text-white border-sky-400',
    role: 'Chiếm 23% lưu vực (đứng thứ hai). Nhu cầu tưới tiêu nông nghiệp vùng Đông Bắc khô hạn.'
  },
  {
    country: 'Trung Quốc',
    vietnameseName: 'Cộng hòa Nhân dân Trung Hoa',
    percentage: 21,
    areaKm2: 170100,
    localName: 'Lan Thương Giang',
    localMeaning: 'Con sông cuộn sóng',
    color: 'bg-rose-500 text-white border-rose-400',
    role: 'Chiếm 21% lưu vực. Thượng nguồn núi cao, hệ thống siêu đập thủy điện bậc thang Vân Nam.'
  },
  {
    country: 'Cam-pu-chia',
    vietnameseName: 'Vương quốc Cam-pu-chia',
    percentage: 20,
    areaKm2: 162000,
    localName: 'Tôn-lê Thơm',
    localMeaning: 'Sông Lớn',
    color: 'bg-indigo-500 text-white border-indigo-400',
    role: 'Chiếm 20% lưu vực. Trái tim Biển Hồ Tonle Sap điều tiết dòng chảy tự nhiên độc nhất vô nhị.'
  },
  {
    country: 'Việt Nam',
    vietnameseName: 'Cộng hòa Xã hội Chủ nghĩa Việt Nam',
    percentage: 8,
    areaKm2: 64800,
    localName: 'Sông Cửu Long (Tiền & Hậu)',
    localMeaning: 'Chín con rồng đổ ra Biển Đông',
    color: 'bg-emerald-600 text-white border-emerald-500',
    role: 'Chiếm 8% lưu vực nhưng chiếm ~20% lãnh thổ Việt Nam. Vựa lúa gạo & thủy sản xuất khẩu số 1.'
  },
  {
    country: 'Mi-an-ma',
    vietnameseName: 'Cộng hòa Liên bang Mi-an-ma',
    percentage: 3,
    areaKm2: 24300,
    localName: 'Mekong River',
    localMeaning: 'Dòng sông biên giới',
    color: 'bg-purple-500 text-white border-purple-400',
    role: 'Chiếm 3% diện tích lưu vực. Đoạn biên giới với Lào, tham gia đối tác đối thoại MRC.'
  }
];

export const MRC_FIVE_PROCEDURES: MrcProcedure[] = [
  {
    code: 'PDIES',
    fullNameVi: 'Thủ tục Trao đổi và chia sẻ thông tin số liệu',
    fullNameEn: 'Procedures for Data and Information Exchange and Sharing',
    approvedYear: 2001,
    purpose: 'Thiết lập hệ thống trao đổi và chia sẻ thông tin, số liệu về các chỉ số quan trọng liên quan đến tài nguyên nước giữa bốn quốc gia Mê Công.',
    targetWaterBody: 'Toàn bộ dữ liệu khí tượng, thủy văn và tài nguyên nước lưu vực',
    icon: 'Database'
  },
  {
    code: 'PWUM',
    fullNameVi: 'Thủ tục Giám sát sử dụng nước',
    fullNameEn: 'Procedures for Water Use Monitoring',
    approvedYear: 2003,
    purpose: 'Thiết lập mạng lưới giám sát hiệu quả việc lấy và sử dụng nguồn nước trên dòng chính và các sông nhánh phục vụ sinh hoạt, nông nghiệp tưới tiêu và thủy điện.',
    targetWaterBody: 'Dòng chính sông Mê Công và hệ thống sông nhánh',
    icon: 'Gauge'
  },
  {
    code: 'PNPCA',
    fullNameVi: 'Thủ tục Thông báo, tham vấn trước và thoả thuận',
    fullNameEn: 'Procedures for Notification, Prior Consultation and Agreement',
    approvedYear: 2003,
    purpose: 'Tạo thuận lợi cho hợp tác sử dụng nước với bộ ba quy trình bắt buộc cụ thể cho các dự án phát triển cơ sở hạ tầng có khả năng ảnh hưởng xuyên biên giới.',
    targetWaterBody: 'Các dự án đập thủy điện, chuyển nước trên dòng chính và các chi lưu lớn',
    icon: 'FileCheck'
  },
  {
    code: 'PMFM',
    fullNameVi: 'Thủ tục Duy trì dòng chảy trên dòng chính',
    fullNameEn: 'Procedures for the Maintenance of Flows on the Mainstream',
    approvedYear: 2006,
    purpose: 'Đặt ra các tiêu chuẩn định lượng và quy trình kiểm soát chặt chẽ nhằm duy trì lưu lượng dòng chảy tối thiểu trong mùa kiệt và phân lũ hợp lí trong mùa mưa.',
    targetWaterBody: 'Dòng chính sông Mê Công và dòng chảy đảo chiều hồ Tôn-lê Sáp',
    icon: 'Waves'
  },
  {
    code: 'PWQ',
    fullNameVi: 'Thủ tục Chất lượng nước',
    fullNameEn: 'Procedures for Water Quality',
    approvedYear: 2011,
    purpose: 'Củng cố khuôn khổ hợp tác giám sát thường xuyên và bảo vệ chất lượng nước, ngăn ngừa ô nhiễm nguồn nước mặt và suy thoái hệ sinh thái.',
    targetWaterBody: 'Sông Mê Công và sông Bát Xắc (Bassac) theo bộ tiêu chí thống nhất',
    icon: 'Droplet'
  }
];

export const TEXTBOOK_SECTIONS: TextbookSection[] = [
  {
    id: 'sec-1',
    number: 'Phần 1',
    title: 'Khái Quát Về Lưu Vực Sông Mê Công',
    pageRange: 'Trang 5 - 8',
    summary: 'Vị trí địa lí, chiều dài 4.763 km, 6 quốc gia ven sông, tên gọi bản địa, cấu trúc địa hình và phân bố diện tích lưu vực 810.000 km².',
    subsections: [
      {
        subtitle: 'a) Vị trí, phạm vi và tên gọi bản địa',
        content: [
          'Sông Mê Công bắt nguồn từ sơn nguyên Tây Tạng của Trung Quốc (ở độ cao gần 5.000 m) và chảy qua sáu quốc gia: Trung Quốc, Mi-an-ma, Lào, Thái Lan, Cam-pu-chia và Việt Nam.',
          'Đây là con sông dài thứ 12 thế giới và dài thứ ba châu Á với tổng chiều dài khoảng 4.763 km.',
          'Tên gọi văn hóa đa dạng theo từng chặng:',
          '• Ở thượng nguồn, sông được người Trung Quốc gọi là Lan Thương Giang (có nghĩa là "con sông cuộn sóng").',
          '• Người Lào và người Thái Lan gọi là Mê-nam Khong (có nghĩa là "sông Mẹ").',
          '• Người Cam-pu-chia sử dụng tên gọi Tôn-lê Thơm (có nghĩa là "sông Lớn").',
          '• Về đến Việt Nam, sông Mê Công chia thành hai nhánh lớn là sông Tiền và sông Hậu, đổ ra biển ở chín cửa nên còn gọi là sông Cửu Long.'
        ],
        highlightNotes: [
          'Bắt nguồn Tây Tạng ~5.000m',
          'Dài 4.763 km (thứ 12 thế giới, thứ 3 châu Á)',
          'Chảy qua 6 quốc gia'
        ],
        evidence: 'SGK Địa lí 11 - Trang 5, Mục 1.a & Hộp Em có biết?'
      },
      {
        subtitle: 'b) Đặc điểm địa hình và diện tích lưu vực',
        content: [
          'Sông Mê Công thường được chia thành khu vực thượng nguồn (ở Trung Quốc, Mi-an-ma) và khu vực hạ lưu (ở Lào, Thái Lan, Cam-pu-chia, Việt Nam).',
          'Gần một nửa chiều dài sông chảy trên lãnh thổ Trung Quốc, qua nhiều hẻm núi sâu, địa hình chia cắt hiểm trở. Khi chảy vào Cam-pu-chia và Việt Nam, sông có địa hình tương đối bằng phẳng với vùng châu thổ rộng lớn và nhiều vùng trũng ngập nước.',
          'Tổng diện tích lưu vực là 810.000 km², trải dài từ sơn nguyên Tây Tạng đến hết đồng bằng sông Cửu Long.',
          'Tỉ lệ diện tích lưu vực theo quốc gia (Nguồn: Uỷ hội sông Mê Công, 2022): Lào chiếm 25%, Thái Lan chiếm 23%, Trung Quốc chiếm 21%, Cam-pu-chia chiếm 20%, Việt Nam chiếm 8% và Mi-an-ma chiếm 3%.'
        ],
        highlightNotes: [
          'Tổng lưu vực: 810.000 km²',
          'Lào chiếm tỉ lệ lớn nhất: 25%',
          'Việt Nam chiếm 8% lưu vực'
        ],
        evidence: 'SGK Địa lí 11 - Trang 6, Mục 1.b & Hình 2'
      },
      {
        subtitle: 'c) Thủy văn, chế độ nước và Đa dạng sinh học',
        content: [
          'Tổng lượng dòng chảy trung bình năm của sông Mê Công là 475 tỉ m³, nhưng có sự phân mùa sâu sắc:',
          '• Thượng nguồn: mùa lũ vào mùa xuân hoặc đầu hạ do nguồn cung cấp nước chủ yếu là nước băng tuyết tan.',
          '• Hạ lưu: mùa lũ kéo dài từ tháng 6 đến tháng 11, trùng với mùa mưa gió mùa Tây Nam và chiếm khoảng 70% - 80% tổng lượng dòng chảy cả năm.',
          'Hệ sinh thái phong phú bậc nhất: Lưu vực có khoảng 20.000 loài thực vật, hơn 1.000 loài cá nước ngọt, 1.200 loài chim, 800 loài bò sát và lưỡng cư, 430 loài động vật có vú.',
          'Đây là lưu vực có mức độ đa dạng sinh học lớn thứ hai thế giới, chỉ sau lưu vực sông A-ma-dôn (Nam Mỹ). Vòng đời của nhiều loài cá phụ thuộc trực tiếp vào nhịp điệu mùa lũ.'
        ],
        highlightNotes: [
          'Tổng dòng chảy: 475 tỉ m³/năm',
          'Mùa lũ hạ lưu chiếm 70% - 80% dòng chảy',
          'Đa dạng sinh học thủy sinh xếp thứ 2 thế giới'
        ],
        evidence: 'SGK Địa lí 11 - Trang 6 & 7, Mục 1.b & Hộp Em có biết?'
      },
      {
        subtitle: 'd) Dân cư, xã hội và kinh tế lưu vực',
        content: [
          'Hạ lưu sông Mê Công là nơi sinh sống của hơn 65 triệu người thuộc hơn 100 nhóm dân tộc khác nhau, hình thành nên một nền văn hóa sông nước vô cùng đa dạng.',
          'Tốc độ đô thị hóa diễn ra nhanh chóng. Các đô thị lớn nhất ven sông gồm: Phnôm Pênh (Cam-pu-chia), Viêng Chăn (Lào) và Cần Thơ (Việt Nam).',
          'Kinh tế nông nghiệp: Đảm bảo an ninh lương thực và sinh kế cho khoảng 60% dân số lưu vực, đóng góp khoảng 14% GDP các nước ven sông. Cây lương thực chính là lúa gạo, tưới tiêu cho khoảng 10 triệu ha.',
          'Thủy sản nước ngọt: Ngư trường nội địa lớn nhất hành tinh, sản lượng khai thác chiếm ~18% tổng sản lượng thủy sản nước ngọt toàn cầu (khoảng 4 triệu tấn).',
          'Thủy điện & Thách thức dòng chảy: Tổng trữ năng thủy điện ước tính 60.000 MW. Năm 2020 có hơn 10 nhà máy thủy điện đang vận hành và nhiều dự án đang triển khai. Năm 2019 và 2020, mực nước tại ĐBSCL đã giảm xuống mức thấp nhất trong vòng 100 năm qua do biến đổi dòng chảy và giữ phù sa thượng nguồn.'
        ],
        highlightNotes: [
          'Dân số hạ lưu: >65 triệu người (>100 dân tộc)',
          'Nông nghiệp nuôi sống 60% dân số',
          'Trữ năng thủy điện: ~60.000 MW',
          'Năm 2019-2020: Mực nước thấp nhất 100 năm'
        ],
        evidence: 'SGK Địa lí 11 - Trang 7 & 8, Mục 1.b & Hộp Em có biết?'
      }
    ]
  },
  {
    id: 'sec-2',
    number: 'Phần 2',
    title: 'Uỷ Hội Sông Mê Công (MRC) & Hợp Tác Khu Vực',
    pageRange: 'Trang 8 - 14',
    summary: 'Lịch sử hình thành từ 1957, Hiệp định Mê Công 1995, cơ chế 5 thủ tục quản lí nguồn nước, 7 thành tựu lớn và các dự án xuyên biên giới.',
    subsections: [
      {
        subtitle: 'a) Lí do ra đời và lịch sử thành lập MRC',
        content: [
          'Sự suy giảm số lượng và chất lượng nước, tốc độ đô thị hóa nhanh, việc xây dựng đập thủy điện trên dòng chính và biến đổi khí hậu ảnh hưởng trực tiếp đến sinh kế hơn 65 triệu dân hạ lưu.',
          'Các quốc gia cần một giải pháp hợp tác cân bằng giữa phát triển kinh tế và duy trì tính bền vững sinh thái.',
          'Các mốc lịch sử quan trọng:',
          '• Năm 1957: Thành lập Uỷ ban Mê Công (Mekong Committee).',
          '• Năm 1978: Đổi tên thành Uỷ ban Lâm thời về điều phối nghiên cứu hạ lưu lưu vực sông Mê Công.',
          '• Ngày 5/4/1995: Bốn quốc gia (Cam-pu-chia, Lào, Thái Lan, Việt Nam) kí kết "Hiệp định hợp tác phát triển bền vững lưu vực sông Mê Công", thành lập Uỷ hội sông Mê Công (Mekong River Commission - MRC).',
          '• Mi-an-ma và Trung Quốc tham gia Uỷ hội với tư cách Đối tác đối thoại (Dialogue Partners).'
        ],
        highlightNotes: [
          'Hiệp định Mê Công ký năm 1995',
          '4 nước thành viên chính thức: VN, Lào, Thái Lan, Campuchia',
          'Trung Quốc & Myanmar là đối tác đối thoại'
        ],
        evidence: 'SGK Địa lí 11 - Trang 8 & 9, Mục 2.a'
      },
      {
        subtitle: 'b) Cơ cấu tổ chức và Hội nghị Cấp cao MRC',
        content: [
          'Cơ cấu của Uỷ hội sông Mê Công gồm: Hội đồng (cấp Bộ trưởng phụ trách tài nguyên môi trường), Uỷ ban liên hợp (cấp Thứ trưởng/Cục trưởng) và Ban thư ký (cơ quan điều hành kỹ thuật quốc tế).',
          'Mỗi quốc gia thành viên đều thành lập Uỷ ban sông Mê Công Quốc gia để triển khai nhiệm vụ.',
          'Từ năm 2010, Uỷ hội quyết định tổ chức Hội nghị Cấp cao định kỳ 4 năm một lần:',
          '• Lần 1 (tháng 4/2010): Tổ chức tại Hua Hin (Thái Lan).',
          '• Lần 2 (tháng 4/2014): Tổ chức tại Thành phố Hồ Chí Minh (Việt Nam).',
          '• Lần 3 (tháng 4/2018): Tổ chức tại Xiêm Riệp (Cam-pu-chia).'
        ],
        highlightNotes: [
          'Hội nghị Cấp cao tổ chức 4 năm một lần',
          'Việt Nam đăng cai Cấp cao lần 2 (2014 tại TP.HCM)'
        ],
        evidence: 'SGK Địa lí 11 - Trang 9, Mục 2.a & Hộp Em có biết?'
      },
      {
        subtitle: 'c) Năm thủ tục kỹ thuật bắt buộc của MRC',
        content: [
          'Nhằm cụ thể hóa Hiệp định 1995 và tối đa hóa thịnh vượng kinh tế - xã hội mà không làm tổn hại đến sinh thái, MRC đã thông qua 5 thủ tục mang tính pháp lý kỹ thuật:',
          '1. Thủ tục PDIES (2001): Trao đổi và chia sẻ thông tin số liệu.',
          '2. Thủ tục PWUM (2003): Giám sát sử dụng nước trên dòng chính và sông nhánh.',
          '3. Thủ tục PNPCA (2003): Thông báo, tham vấn trước và thoả thuận cho các dự án can thiệp dòng chính.',
          '4. Thủ tục PMFM (2006): Duy trì dòng chảy thích hợp trên dòng chính và Biển Hồ Tôn-lê Sáp.',
          '5. Thủ tục PWQ (2011): Giám sát và gìn giữ chất lượng nước sông Mê Công và sông Bát Xắc.'
        ],
        highlightNotes: [
          'Bộ 5 thủ tục: PDIES, PWUM, PNPCA, PMFM, PWQ',
          'PNPCA là chìa khóa tham vấn trước các công trình đập thủy điện'
        ],
        evidence: 'SGK Địa lí 11 - Trang 10, Hình 6'
      },
      {
        subtitle: 'd) Các dự án xuyên biên giới và hợp tác đối ngoại',
        content: [
          'Năm dự án song phương quản lí tài nguyên nước xuyên biên giới:',
          '• (1) Quản lí thủy sản trên dòng chính và sông Sê Công (Lào - Cam-pu-chia).',
          '• (2) Quản lí tổng hợp tài nguyên nước xuyên biên giới tại Tiểu lưu vực sông Sê San và Srêpôk (Việt Nam - Cam-pu-chia).',
          '• (3) Quản lí tổng hợp tài nguyên nước tại đồng bằng sông Mê Công (Việt Nam - Cam-pu-chia).',
          '• (4) Quản lí bãi ngập lũ và đất ngập nước (Lào - Thái Lan).',
          '• (5) Hợp tác truyền thông giữa hồ Tôn-lê Sáp - Song-kha (Cam-pu-chia - Thái Lan).',
          'Các sáng kiến lớn: Sáng kiến thích ứng biến đổi khí hậu (CCAI), Sáng kiến phát triển thủy điện bền vững (ISH), Chương trình nông nghiệp thủy lợi (AIP), Quản lí hạn hán (DMP), Môi trường (EP), Thủy sản (FP), Giao thông thủy (NAP).',
          'Hợp tác đa phương rộng mở: Hợp tác Mê Công - Lan Thương (2016), Mê Công - Hoa Kỳ (2009), Mê Công - Nhật Bản (2007), Mê Công - Hàn Quốc (2011), Mê Công - Sông Hằng Ấn Độ (2000).'
        ],
        highlightNotes: [
          'Hai dự án trọng điểm giữa Việt Nam - Cam-pu-chia (Sê San-Srêpôk & ĐBSCL)',
          'Hợp tác Mê Công - Lan Thương ra đời 2016 có cả 6 nước tham gia'
        ],
        evidence: 'SGK Địa lí 11 - Trang 11-14, Mục 3.b & 3.c'
      }
    ]
  },
  {
    id: 'sec-3',
    number: 'Phần 3',
    title: 'Vai Trò Của Việt Nam & Phát Triển Bền Vững ĐBSCL',
    pageRange: 'Trang 14 - 16',
    summary: 'Chiếm 20% lãnh thổ trong lưu vực, ĐBSCL với 17 triệu dân, Nghị quyết 120/NQ-CP triết lý Thuận thiên và sự kiện Việt Nam làm Chủ tịch Hội đồng MRC.',
    subsections: [
      {
        subtitle: 'a) Vị thế và tầm quan trọng của lưu vực đối với Việt Nam',
        content: [
          'Khoảng 20% lãnh thổ Việt Nam nằm trong lưu vực sông Mê Công (gồm vùng Đồng bằng sông Cửu Long và khu vực Tây Nguyên).',
          'Đồng bằng sông Cửu Long là vùng kinh tế trọng điểm đặc biệt của cả nước:',
          '• Là nơi sinh sống của hơn 17 triệu người.',
          '• Đóng góp khoảng 12% tổng GDP toàn quốc.',
          '• Sản xuất tới 90% lượng gạo xuất khẩu và 53% lượng tôm, cá xuất khẩu của Việt Nam (số liệu năm 2020).',
          'Việt Nam thành lập Uỷ ban sông Mê Công Việt Nam vào ngày 18 - 9 - 1978 để điều phối quản lí tài nguyên nước theo tiểu lưu vực sông Cửu Long và sông Sê San - Srêpôk.'
        ],
        highlightNotes: [
          '20% lãnh thổ Việt Nam nằm trong lưu vực',
          'ĐBSCL: >17 triệu dân, 12% GDP, 90% gạo & 53% tôm cá xuất khẩu',
          'Thành lập Uỷ ban sông Mê Công VN: 18-9-1978'
        ],
        evidence: 'SGK Địa lí 11 - Trang 14 & 15, Mục 4'
      },
      {
        subtitle: 'b) Nghị quyết 120/NQ-CP & Triết lý "Thuận thiên"',
        content: [
          'Nghị quyết số 120/NQ-CP (năm 2017) của Chính phủ Việt Nam về phát triển bền vững Đồng bằng sông Cửu Long thích ứng với biến đổi khí hậu là một dấu mốc đột phá lớn trong tư duy chiến lược.',
          'Chuyển từ tư duy "chống chọi" sang chủ động "thích ứng", tôn trọng quy luật tự nhiên, coi nước ngọt, nước lợ và nước mặn đều là tài nguyên quý giá để phát triển kinh tế.',
          'Việt Nam chuyển đổi mạnh mẽ sang mô hình kinh tế xanh và kinh tế tuần hoàn, thể chế hóa qua Luật Bảo vệ Môi trường và Luật Tài nguyên Nước 2020.',
          'Thực tiễn giáo dục: Trường TH, THCS, THPT FPT Hậu Giang (tại 61C ấp 6, xã Vị Thủy, Hậu Giang - Cần Thơ) là trung tâm đào tạo công nghệ và giáo dục sinh thái gắn liền với kênh xáng Xà No và văn hóa sông nước ĐBSCL.'
        ],
        highlightNotes: [
          'Nghị quyết 120/NQ-CP (2017): Triết lý "Thuận thiên"',
          'Coi cả nước ngọt, lợ, mặn đều là tài nguyên',
          'Gắn kết giáo dục FPT Hậu Giang tại kênh xáng Xà No'
        ],
        evidence: 'SGK Địa lí 11 - Trang 15 & 16, Mục 4'
      },
      {
        subtitle: 'c) Đóng góp quốc tế tiêu biểu của Việt Nam tại MRC',
        content: [
          'Năm 2014: Việt Nam đăng cai tổ chức thành công Hội nghị Cấp cao lần thứ hai của Uỷ hội sông Mê Công tại TP. Hồ Chí Minh với chủ đề "An ninh nguồn nước, năng lượng, lương thực trong bối cảnh biến đổi khí hậu".',
          'Các năm 2018 và 2022: Việt Nam đảm nhiệm xuất sắc vai trò Chủ tịch Hội đồng Uỷ hội sông Mê Công.',
          'Việt Nam là quốc gia đi đầu trong việc thúc đẩy mở rộng hợp tác liên lưu vực với sông Hằng (Ấn Độ), sông Đa-nuýp (Châu Âu), sông Nin (Châu Phi), sông A-ma-dôn (Nam Mỹ) và sông Mi-xi-xi-pi (Bắc Mỹ).',
          'Tích cực tham gia Công ước Liên hợp quốc về Luật sử dụng các nguồn nước xuyên biên giới vì các mục đích phi giao thông, thủy điện năm 1997.'
        ],
        highlightNotes: [
          'Chủ tịch Hội đồng MRC năm 2018 và 2022',
          'Đăng cai Cấp cao lần 2 (2014 tại TP.HCM)',
          'Thành viên tích cực Công ước Quốc tế Nguồn nước 1997'
        ],
        evidence: 'SGK Địa lí 11 - Trang 15 & 16, Hình 8 & Mục 4'
      }
    ]
  },
  {
    id: 'sec-4',
    number: 'Phần 4',
    title: 'Hợp Tác Hòa Bình Trong Khai Thác Biển Đông',
    pageRange: 'Trang 16 - 19',
    summary: 'Biển Đông rộng 3,44 triệu km², khai thác thủy sản chiếm 7-8% sản lượng toàn cầu, Hiệp định nghề cá Vịnh Bắc Bộ năm 2000 và hợp tác phân định biển.',
    subsections: [
      {
        subtitle: 'a) Vị trí chiến lược và tài nguyên thiên nhiên Biển Đông',
        content: [
          'Biển Đông có diện tích khoảng 3,44 triệu km², là một trong những khu vực biển chiến lược quan trọng bậc nhất thế giới.',
          'Trải rộng từ khoảng vĩ tuyến 3°N tới 26°B, nối thông Thái Bình Dương và Ấn Độ Dương qua eo biển Ma-lắc-ca.',
          'Tài nguyên sinh vật dồi dào: Trên 100 loài cá có giá trị kinh tế cao, sản lượng khai thác tại Biển Đông chiếm khoảng 7% - 8% tổng sản lượng cá khai thác của toàn thế giới.',
          'Ngoài ra còn có trữ lượng dầu mỏ, khí tự nhiên lớn dưới thềm lục địa và tuyến đường hàng hải quốc tế nhộn nhịp.'
        ],
        highlightNotes: [
          'Diện tích Biển Đông: ~3,44 triệu km²',
          'Khai thác thủy sản chiếm 7% - 8% toàn cầu',
          'Vị trí cửa ngõ thoát nước và giao thương của Mê Kông'
        ],
        evidence: 'SGK Địa lí 11 - Trang 16-18, Mục II.1'
      },
      {
        subtitle: 'b) Các hiệp định hợp tác biển hòa bình của Việt Nam',
        content: [
          'Hiệp định hợp tác nghề cá ở vịnh Bắc Bộ: Kí ngày 25 - 12 - 2000 tại Bắc Kinh giữa Việt Nam và Trung Quốc, thiết lập vùng đánh cá chung trên nguyên tắc bình đẳng năng lực tàu thuyền và bảo tồn nguồn lợi.',
          'Hiệp định về vùng nước lịch sử Việt Nam - Cam-pu-chia: Kí năm 1982 cho phép ngư dân hai nước duy trì tập quán đánh bắt truyền thống.',
          'Hiệp định phân định ranh giới trên biển giữa Việt Nam và Thái Lan: Kí ngày 9 - 8 - 1997 giải quyết tranh chấp trong vịnh Thái Lan trên tinh thần hòa bình, hữu nghị.'
        ],
        highlightNotes: [
          'Hiệp định nghề cá Vịnh Bắc Bộ ký ngày 25-12-2000',
          'Hiệp ước phân định biển Việt Nam - Thái Lan ký ngày 9-8-1997'
        ],
        evidence: 'SGK Địa lí 11 - Trang 19, Mục II.1'
      }
    ]
  }
];

export const TEXTBOOK_REVIEW_QUESTIONS = [
  {
    id: 'q-1',
    page: 'Trang 8',
    question: 'Dựa vào thông tin mục 1 và hình 1, hãy nêu khái quát về lưu vực sông Mê Công (chiều dài, diện tích, các quốc gia và đặc điểm dòng chảy)?',
    standardAnswer: 'Sông Mê Công dài khoảng 4.763 km (thứ 12 thế giới, thứ 3 châu Á), bắt nguồn từ sơn nguyên Tây Tạng (~5.000m), chảy qua 6 quốc gia: Trung Quốc, Mi-an-ma, Lào, Thái Lan, Cam-pu-chia, Việt Nam. Tổng diện tích lưu vực 810.000 km² (Lào 25%, Thái Lan 23%, TQ 21%, Campuchia 20%, VN 8%, Myanmar 3%). Tổng lượng dòng chảy trung bình năm 475 tỉ m³, mùa lũ kéo dài tháng 6 - 11 chiếm 70-80% dòng chảy cả năm.',
    tags: ['Khái quát', 'Số liệu cốt lõi']
  },
  {
    id: 'q-2',
    page: 'Trang 9',
    question: 'Dựa vào thông tin mục 2, hãy trình bày lí do ra đời và mục tiêu của Uỷ hội sông Mê Công (MRC)?',
    standardAnswer: 'Lí do ra đời: Do sự suy giảm số lượng, chất lượng nước, đô thị hóa nhanh, tác động của chuỗi đập thủy điện dòng chính và biến đổi khí hậu đe dọa sinh kế hơn 65 triệu dân hạ lưu, đòi hỏi các nước phải hợp tác cân bằng lợi ích kinh tế và duy trì sinh thái bền vững. Mục tiêu MRC: Thúc đẩy, phối hợp quản lí và phát triển bền vững tài nguyên nước và các tài nguyên liên quan vì lợi ích chung và an sinh của cộng đồng các quốc gia ven sông.',
    tags: ['MRC', 'Mục tiêu & Lí do']
  },
  {
    id: 'q-3',
    page: 'Trang 10',
    question: 'Kể tên và nêu nội dung cơ bản của 5 thủ tục kỹ thuật được Uỷ hội sông Mê Công thông qua nhằm thực hiện Hiệp định 1995?',
    standardAnswer: 'Năm thủ tục: (1) PDIES (2001): Trao đổi và chia sẻ thông tin số liệu; (2) PWUM (2003): Giám sát sử dụng nước; (3) PNPCA (2003): Thông báo, tham vấn trước và thoả thuận cho các dự án dòng chính; (4) PMFM (2006): Duy trì dòng chảy thích hợp trên dòng chính và Biển Hồ; (5) PWQ (2011): Giám sát và bảo vệ chất lượng nước sông Mê Công và sông Bát Xắc.',
    tags: ['5 Thủ tục', 'Quy trình kỹ thuật']
  },
  {
    id: 'q-4',
    page: 'Trang 14',
    question: 'Hãy giới thiệu một số hoạt động tiêu biểu của Uỷ hội sông Mê Công (các dự án song phương và sáng kiến chương trình hợp tác)?',
    standardAnswer: 'Hoạt động tiêu biểu gồm: Diễn đàn ngoại giao nước; 5 dự án song phương xuyên biên giới (như Sê San - Srêpôk, quản lí nước ĐBSCL giữa VN - Cam-pu-chia); các sáng kiến lớn: CCAI (thích ứng BĐKH), ISH (thủy điện bền vững), AIP (nông nghiệp thủy lợi), DMP (hạn hán), EP (môi trường), FP (thủy sản), NAP (giao thông thủy); cùng các cơ chế hợp tác mở rộng: Mê Công - Lan Thương, Mê Công - Hoa Kỳ, Mê Công - Nhật Bản, Mê Công - Hàn Quốc, Mê Công - Sông Hằng.',
    tags: ['Hoạt động MRC', 'Dự án xuyên biên giới']
  },
  {
    id: 'q-5',
    page: 'Trang 16',
    question: 'Dựa vào thông tin mục 4, hãy nêu vai trò của Việt Nam trong các lĩnh vực khác nhau của Uỷ hội sông Mê Công?',
    standardAnswer: 'Việt Nam đóng vai trò then chốt: (1) Thành lập Uỷ ban sông Mê Công VN năm 1978 quản lí lưu vực sông Cửu Long và Sê San - Srêpôk; (2) Thực hiện dự án song phương quản lí nước với Cam-pu-chia; (3) Đăng cai Hội nghị Cấp cao lần 2 năm 2014 tại TP.HCM; (4) Đảm nhiệm Chủ tịch Hội đồng MRC năm 2018 và 2022; (5) Tiên phong ban hành Nghị quyết 120/NQ-CP với triết lý "Thuận thiên" thích ứng BĐKH, chuyển đổi kinh tế xanh và tuần hoàn.',
    tags: ['Vai trò Việt Nam', 'Nghị quyết 120']
  }
];

export const CORE_COMPETENCIES_5_STANDARDS: CoreCompetencyStandard[] = [
  {
    id: 'comp-1',
    order: 1,
    title: 'Vị Trí, Phạm Vi Lưu Vực & Các Quốc Gia Liên Quan',
    shortTitle: 'Vị Trí & Lưu Vực (6 Quốc Gia)',
    iconName: 'Compass',
    curriculumGoal: 'Xác định được vị trí, phạm vi lưu vực và các quốc gia liên quan.',
    badge: 'Yêu Cầu Cần Đạt 1',
    summary: 'Sông Mê Kông dài 4.763 km (thứ 12 thế giới, thứ 3 châu Á), bắt nguồn từ sơn nguyên Tây Tạng ở độ cao gần 5.000 m và chảy qua 6 quốc gia với tổng diện tích lưu vực 810.000 km².',
    keyStats: [
      { label: 'Chiều dài', value: '4.763 km' },
      { label: 'Diện tích lưu vực', value: '810.000 km²' },
      { label: 'Số quốc gia', value: '6 quốc gia' },
      { label: 'Độ cao khởi nguồn', value: '~5.000 m (Tây Tạng)' }
    ],
    bulletPoints: [
      {
        heading: 'Vị trí khởi nguồn và hướng dòng chảy',
        details: 'Khởi nguồn từ vùng núi cao tuyết phủ sơn nguyên Tây Tạng (Trung Quốc) ở độ cao gần 5.000 m, sông chảy theo hướng đông nam và nam qua các vực sâu hiểm trở, tiến vào bán đảo Đông Dương trước khi tỏa thành 9 cửa đổ ra Biển Đông.',
        evidence: 'SGK Địa lí 11 - Trang 5, Mục 1.a'
      },
      {
        heading: 'Phạm vi lưu vực và 2 khu vực địa hình',
        details: 'Tổng diện tích lưu vực là 810.000 km². Lưu vực chia thành hai khu vực rõ rệt: Thượng lưu (Trung Quốc, Mi-an-ma) địa hình đồi núi dốc đứng, vực sâu hiểm trở; Hạ lưu (Lào, Thái Lan, Cam-pu-chia, Việt Nam) địa hình mở rộng, bằng phẳng với các bồn trũng và châu thổ màu mỡ.',
        evidence: 'SGK Địa lí 11 - Trang 6, Mục 1.b'
      },
      {
        heading: 'Tỉ lệ diện tích lưu vực của 6 quốc gia ven sông',
        details: 'Lào chiếm 25% (202.500 km² - lớn nhất), Thái Lan chiếm 23% (186.300 km²), Trung Quốc chiếm 21% (170.100 km²), Cam-pu-chia chiếm 20% (162.000 km²), Việt Nam chiếm 8% (64.800 km²), Mi-an-ma chiếm 3% (24.300 km²).',
        evidence: 'Số liệu Uỷ hội sông Mê Công (MRC) 2022, SGK Địa lí 11 Trang 6'
      },
      {
        heading: 'Tên gọi văn hóa bản địa qua từng chặng',
        details: 'Trung Quốc gọi là Lan Thương Giang ("con sông cuộn sóng"); Lào & Thái Lan gọi là Mê-nam Khong ("sông Mẹ"); Cam-pu-chia gọi là Tôn-lê Thơm ("sông Lớn"); Việt Nam gọi là sông Cửu Long (nhánh sông Tiền và sông Hậu, chín con rồng).',
        evidence: 'SGK Địa lí 11 - Trang 5, Hộp Em có biết?'
      }
    ],
    criticalAnalysis: 'Mặc dù Việt Nam chỉ chiếm 8% diện tích lưu vực chung, nhưng diện tích này lại chiếm tới ~20% lãnh thổ đất nước (vùng ĐBSCL và Tây Nguyên). Vì nằm ở hạ lưu cùng, Việt Nam phụ thuộc trực tiếp vào dòng chảy và lượng bùn cát từ 5 quốc gia thượng nguồn.',
    reviewQuestion: 'Dựa vào lược đồ lưu vực sông Mê Kông, hãy xác định tọa độ xuất phát, phạm vi 6 quốc gia và so sánh tỉ lệ lưu vực giữa các nước?',
    modelAnswer: 'Sông Mê Kông dài 4.763 km, bắt nguồn Tây Tạng (~5.000m), chảy qua 6 nước: Trung Quốc (21%), Mi-an-ma (3%), Lào (25%), Thái Lan (23%), Cam-pu-chia (20%), Việt Nam (8%). Lào là nước có tỉ lệ diện tích lưu vực lớn nhất (25%), Mi-an-ma nhỏ nhất (3%). Hạ lưu chiếm 76% diện tích toàn lưu vực.'
  },
  {
    id: 'comp-2',
    order: 2,
    title: 'Vai Trò Của Sông Mê Công Đối Với Tự Nhiên & Kinh Tế – Xã Hội',
    shortTitle: 'Vai Trò Tự Nhiên & Kinh Tế – Xã Hội',
    iconName: 'Waves',
    curriculumGoal: 'Trình bày được vai trò của sông Mê Công đối với tự nhiên và kinh tế – xã hội.',
    badge: 'Yêu Cầu Cần Đạt 2',
    summary: 'Sông Mê Kông bồi đắp châu thổ màu mỡ, duy trì hệ sinh thái thủy sinh đa dạng thứ 2 thế giới, cung cấp nguồn nước ngọt 475 tỉ m³/năm, bảo đảm sinh kế nông - thủy sản cho hơn 65 triệu dân hạ lưu.',
    keyStats: [
      { label: 'Dòng chảy năm', value: '475 tỉ m³' },
      { label: 'Đa dạng thủy sinh', value: '>1.000 loài cá' },
      { label: 'Dân số hưởng lợi', value: '>65 triệu người' },
      { label: 'Trữ năng thủy điện', value: '~60.000 MW' }
    ],
    bulletPoints: [
      {
        heading: 'Vai trò kiến tạo tự nhiên và điều hòa môi trường',
        details: 'Hàng năm sông mang theo lượng phù sa khổng lồ bồi đắp châu thổ hạ lưu và ĐBSCL; cung cấp 475 tỉ m³ nước ngọt duy trì mạng lưới kênh rạch, thau chua rửa mặn đất đai; tạo điều kiện mở rộng diện tích rừng ngập mặn, rừng tràm và đất ngập nước Ramsar (Tràm Chim, Láng Sen).',
        evidence: 'SGK Địa lí 11 - Trang 6 & 7, Mục 1.b'
      },
      {
        heading: 'Đa dạng sinh học phong phú thứ hai thế giới',
        details: 'Sở hữu hơn 1.000 loài cá nước ngọt (chỉ đứng sau sông A-ma-dôn), 20.000 loài thực vật, 1.200 loài chim, 800 loài bò sát lưỡng cư và 430 loài thú. Nhịp điệu mùa lũ tự nhiên quyết định chu kỳ sinh sản và di cư của các loài thủy sản quý hiếm (cá tra dầu, cá hô, cá bông lau).',
        evidence: 'SGK Địa lí 11 - Trang 7, Hộp Em có biết?'
      },
      {
        heading: 'Bảo đảm an ninh lương thực và sinh kế nông nghiệp',
        details: 'Đảm bảo nguồn sống cho hơn 65 triệu dân hạ lưu thuộc hơn 100 nhóm dân tộc; nuôi sống 60% lực lượng lao động nông nghiệp. Hệ thống sông tưới tiêu cho hơn 10 triệu ha đất canh tác lúa, đưa ĐBSCL thành vựa lúa gạo lớn nhất Việt Nam.',
        evidence: 'SGK Địa lí 11 - Trang 7, Mục 1.b'
      },
      {
        heading: 'Khai thác thủy sản, giao thông thủy và tiềm năng thủy điện',
        details: 'Là ngư trường nội địa lớn nhất thế giới với sản lượng khai thác đạt ~4 triệu tấn/năm (chiếm 18% tổng sản lượng nước ngọt toàn cầu). Trữ năng thủy điện tiềm năng đạt 60.000 MW. Giao thông thủy kết nối thông thương giữa các đô thị lớn: Phnôm Pênh, Viêng Chăn, Cần Thơ.',
        evidence: 'SGK Địa lí 11 - Trang 7 & 8, Mục 1.b'
      }
    ],
    criticalAnalysis: 'Vai trò kinh tế - xã hội gắn bó hữu cơ với đặc điểm thủy văn mùa lũ (tháng 6-11 chiếm 70-80% dòng chảy). Nhờ có mùa lũ, đồng bằng nhận được phù sa, nguồn lợi cá tôm và vệ sinh đồng ruộng. Nếu mùa lũ biến mất hoặc lũ cực đoan, toàn bộ chuỗi sinh kế sẽ bị đứt gãy.',
    reviewQuestion: 'Tại sao nói sông Mê Kông là huyết mạch sinh tồn của hơn 65 triệu dân cư hạ lưu?',
    modelAnswer: 'Vì sông cung cấp 475 tỉ m³ nước ngọt tưới cho 10 triệu ha lúa, đảm bảo sinh kế cho 60% dân số nông nghiệp, cung cấp nguồn đạm cá nước ngọt lớn nhất hành tinh (4 triệu tấn/năm, 18% toàn cầu), hỗ trợ giao thông thủy và mở ra tiềm năng thủy điện 60.000 MW.'
  },
  {
    id: 'comp-3',
    order: 3,
    title: 'Phân Tích Một Số Vấn Đề Trong Khai Thác, Sử Dụng Nguồn Nước',
    shortTitle: 'Vấn Đề Khai Thác Nguồn Nước',
    iconName: 'AlertCircle',
    curriculumGoal: 'Phân tích được một số vấn đề trong khai thác, sử dụng nguồn nước.',
    badge: 'Yêu Cầu Cần Đạt 3',
    summary: 'Chuỗi đập thủy điện thượng nguồn làm biến đổi dòng chảy và giữ lại hơn 70% bùn cát; biến đổi khí hậu gây hạn mặn kỷ lục lấn sâu 70-100 km; nạn khai thác cát sỏi quá mức gây sạt lở và sụt lún nghiêm trọng.',
    keyStats: [
      { label: 'Phù sa bị giữ lại', value: '>70% lượng bùn cát' },
      { label: 'Hạn mặn kỷ lục', value: 'Xâm nhập 70 - 100 km' },
      { label: 'Hạ thấp lòng dẫn', value: 'Sụt lún 1 - 3 cm/năm' },
      { label: 'Mực nước thấp kỷ lục', value: 'Thấp nhất trong 100 năm' }
    ],
    bulletPoints: [
      {
        heading: 'Xây dựng chuỗi đập thủy điện bậc thang thượng nguồn',
        details: 'Việc xây dựng hàng loạt đập thủy điện lớn trên dòng chính và chi lưu (như các đập ở Vân Nam - Trung Quốc và dòng chính ở Lào) đã làm thay đổi chế độ thủy văn tự nhiên, suy giảm đỉnh lũ mùa mưa, làm chậm nhịp nước nổi và chặn đứng đường bơi di cư sinh sản của các loài thủy sản.',
        evidence: 'SGK Địa lí 11 - Trang 7 & 8, Mục 1.b'
      },
      {
        heading: 'Hiện tượng "nước đói" giữ phù sa & xói lở bờ sông nghiêm trọng',
        details: 'Các hồ chứa thủy điện giữ lại hơn 70% lượng bùn cát mịn và cát thạch anh. Nước xả ra trong vắt nhưng có động năng lớn ("nước đói phù sa"), gây xói lở dữ dội dọc hai bờ sông Tiền, sông Hậu và làm biến mất dần các bãi bồi ven biển.',
        evidence: 'SGK Địa lí 11 - Trang 8 & 14'
      },
      {
        heading: 'Hạn hán cực đoan và xâm nhập mặn lịch sử vào mùa khô',
        details: 'Mùa khô dòng chảy cạn kiệt kết hợp hiện tượng El Nino đã khiến ranh mặn 4‰ lấn sâu 70 - 100 km vào đất liền (các năm 2016, 2019-2020), làm tê liệt nguồn nước ngọt sinh hoạt của hàng triệu dân và hư hại hàng chục ngàn ha cây ăn trái, lúa hè thu.',
        evidence: 'SGK Địa lí 11 - Trang 8, Hộp Em có biết?'
      },
      {
        heading: 'Khai thác cát sỏi quá mức và nguy cơ sụt lún đất',
        details: 'Hoạt động nạo vét cát thương mại trên dòng chính làm lòng dẫn hạ thấp nghiêm trọng, gia tăng độ dốc bờ sông gây sạt lở bờ kè, đường giao thông và nhà cửa. Thiếu nước mặt buộc người dân khai thác nước ngầm quá mức, khiến đồng bằng sụt lún trung bình 1 - 3 cm/năm.',
        evidence: 'SGK Địa lí 11 - Trang 14, Mục 4'
      }
    ],
    criticalAnalysis: 'Vấn đề cốt lõi là sự xung đột lợi ích xuyên biên giới: các nước thượng lưu ưu tiên phát điện và chuyển nước tưới tiêu nội địa, trong khi các nước hạ lưu (đặc biệt là Việt Nam) phải gánh chịu toàn bộ hệ quả tiêu cực về thiếu nước, thiếu phù sa, xâm nhập mặn và xói lở.',
    reviewQuestion: 'Phân tích tác động kép của các đập thủy điện thượng nguồn và biến đổi khí hậu đối với nguồn nước hạ lưu sông Mê Kông?',
    modelAnswer: 'Thủy điện thượng nguồn giữ lại hơn 70% phù sa, làm biến dạng nhịp lũ tự nhiên, gây sạt lở bờ sông và chặn cá di cư. Kết hợp biến đổi khí hậu (nắng nóng, El Nino, nước biển dâng), lưu lượng mùa kiệt giảm sâu khiến mặn lấn sâu 70-100 km, đe dọa trực tiếp an ninh nguồn nước và sinh kế của cư dân hạ lưu.'
  },
  {
    id: 'comp-4',
    order: 4,
    title: 'Vai Trò Của Ủy Hội Sông Mê Công (MRC) & Sự Tham Gia Của Việt Nam',
    shortTitle: 'Ủy Hội MRC & Vai Trò Việt Nam',
    iconName: 'ShieldCheck',
    curriculumGoal: 'Nêu được vai trò của Ủy hội sông Mê Công và sự tham gia của Việt Nam.',
    badge: 'Yêu Cầu Cần Đạt 4',
    summary: 'MRC được thành lập năm 1995 theo Hiệp định Mê Công nhằm phát triển bền vững lưu vực thông qua 5 thủ tục kỹ thuật bắt buộc. Việt Nam là thành viên sáng lập, chủ động, tích cực và có trách nhiệm cao nhất.',
    keyStats: [
      { label: 'Hiệp định Mê Công', value: 'Ký kết 5/4/1995' },
      { label: '4 Nước thành viên', value: 'VN, Lào, Thái, Campuchia' },
      { label: 'Bộ quy chuẩn kỹ thuật', value: '5 Thủ tục bắt buộc' },
      { label: 'Chủ tịch Hội đồng MRC', value: 'Việt Nam (2018, 2022)' }
    ],
    bulletPoints: [
      {
        heading: 'Sự ra đời và sứ mệnh điều phối hòa bình của MRC',
        details: 'Được thành lập ngày 5/4/1995 tại Chiang Rai (Thái Lan) bởi 4 nước hạ lưu. MRC là cơ quan liên chính phủ duy nhất có nhiệm vụ thúc đẩy, phối hợp quản lý và phát triển bền vững tài nguyên nước; Trung Quốc và Mi-an-ma tham gia với tư cách Đối tác đối thoại.',
        evidence: 'SGK Địa lí 11 - Trang 8 & 9, Mục 2.a'
      },
      {
        heading: 'Thực thi bộ 5 thủ tục kỹ thuật pháp lý cốt lõi',
        details: 'Gồm: (1) PDIES (2001 - Chia sẻ thông tin số liệu); (2) PWUM (2003 - Giám sát sử dụng nước); (3) PNPCA (2003 - Thông báo, tham vấn trước và thỏa thuận cho các dự án dòng chính); (4) PMFM (2006 - Duy trì dòng chảy tối thiểu); (5) PWQ (2011 - Giám sát chất lượng nước).',
        evidence: 'SGK Địa lí 11 - Trang 10, Hình 6'
      },
      {
        heading: 'Việt Nam đi đầu trong tổ chức và ngoại giao nước đa phương',
        details: 'Thành lập Ủy ban sông Mê Công Việt Nam năm 1978. Đăng cai thành công Hội nghị Cấp cao MRC lần 2 (năm 2014 tại TP.HCM). Đảm nhiệm xuất sắc vai trò Chủ tịch Hội đồng MRC vào các năm 2018 và 2022, bảo vệ quyền lợi hợp pháp của vùng hạ lưu.',
        evidence: 'SGK Địa lí 11 - Trang 9 & 15, Mục 2.a & Mục 4'
      },
      {
        heading: 'Thực hiện dự án xuyên biên giới và công ước quốc tế',
        details: 'Chủ trì 2 dự án song phương quản lý nước với Cam-pu-chia (Tiểu lưu vực sông Sê San - Srêpôk và ĐBSCL). Tích cực tham gia Công ước Liên Hợp Quốc về Luật sử dụng nguồn nước xuyên biên giới phi giao thông thủy năm 1997.',
        evidence: 'SGK Địa lí 11 - Trang 11 & 16, Mục 3.b & Mục 4'
      }
    ],
    criticalAnalysis: 'MRC hoạt động trên nguyên tắc đồng thuận và tham vấn, chưa có cơ chế tài phán chế tài xử phạt vi phạm. Do đó, vai trò chủ động, kiên trì của Việt Nam trên bàn đàm phán quốc tế và hợp tác tiểu vùng (Mê Công - Lan Thương, Mê Công - Hoa Kỳ, Mê Công - Nhật Bản) là nhân tố quyết định bảo vệ nguồn nước ĐBSCL.',
    reviewQuestion: 'Nêu nội dung cơ bản của 5 thủ tục kỹ thuật của MRC và chứng minh vai trò tích cực của Việt Nam trong Ủy hội?',
    modelAnswer: 'Năm thủ tục: PDIES (chia sẻ số liệu), PWUM (giám sát dùng nước), PNPCA (tham vấn dự án dòng chính), PMFM (duy trì dòng chảy), PWQ (chất lượng nước). Việt Nam đóng vai trò tích cực: thành viên sáng lập, đăng cai Cấp cao lần 2 (2014), Chủ tịch Hội đồng MRC 2018 và 2022, triển khai dự án song phương với Cam-pu-chia và tham gia Công ước Quốc tế 1997.'
  },
  {
    id: 'comp-5',
    order: 5,
    title: 'Liên Hệ Thực Tiễn Đồng Bằng Sông Cửu Long & Tỉnh Hậu Giang',
    shortTitle: 'Thực Tiễn ĐBSCL & Hậu Giang',
    iconName: 'GraduationCap',
    curriculumGoal: 'Có liên hệ thực tiễn Đồng bằng sông Cửu Long/Hậu Giang.',
    badge: 'Yêu Cầu Cần Đạt 5',
    summary: 'ĐBSCL chịu tác động kép hạn mặn và thiếu phù sa; Nghị quyết 120/NQ-CP mở đường triết lý "Thuận thiên" coi nước ngọt, lợ, mặn là tài nguyên; Tỉnh Hậu Giang gắn liền với kênh xáng Xà No lịch sử và trường FPT Hậu Giang đào tạo công nghệ xanh.',
    keyStats: [
      { label: 'Dân số ĐBSCL', value: '>17 triệu người' },
      { label: 'Gạo xuất khẩu VN', value: 'Chiếm 90% cả nước' },
      { label: 'Thủy sản xuất khẩu', value: 'Chiếm 53% cả nước' },
      { label: 'Kênh xáng Xà No', value: 'Đào năm 1901 - 1903' }
    ],
    bulletPoints: [
      {
        heading: 'Vị thế chiến lược và "tác động kép" tại ĐBSCL',
        details: 'ĐBSCL chiếm 12% GDP, sản xuất 90% gạo và 53% thủy sản xuất khẩu của Việt Nam. Tuy nhiên, vùng đang chịu tác động kép nguy hiểm: thiếu nước ngọt, đói phù sa do đập thượng nguồn kết hợp biến đổi khí hậu, nước biển dâng và sạt lở từ biển.',
        evidence: 'SGK Địa lí 11 - Trang 14 & 15, Mục 4'
      },
      {
        heading: 'Nghị quyết 120/NQ-CP: Đột phá chiến lược triết lý "Thuận thiên"',
        details: 'Nghị quyết 120 (năm 2017) chuyển từ tư duy "chống chọi" sang "chủ động thích ứng theo quy luật tự nhiên". Quy hoạch 3 vùng sinh thái: Vùng ngọt thượng lưu (lúa chất lượng cao, cây ăn quả), Vùng chuyển tiếp ngọt - lợ trung tâm, Vùng mặn - lợ ven biển (mô hình lúa - tôm, tôm rừng sinh thái).',
        evidence: 'SGK Địa lí 11 - Trang 15, Mục 4'
      },
      {
        heading: 'Hậu Giang và Kênh xáng Xà No – Trục dẫn ngọt thau chua rửa phèn',
        details: 'Kênh xáng Xà No (hoàn thành năm 1903) là công trình thủy nông nhân tạo vĩ đại được mệnh danh "Con đường lúa gạo miền Tây", lấy nước ngọt sông Hậu dẫn qua Cần Thơ, Hậu Giang, Kiên Giang thau chua rửa phèn, biến vùng lau sậy hoang hóa thành đồng lúa trù phú.',
        evidence: 'Thực tiễn địa phương Hậu Giang & Lịch sử khai phá Tây Nam Bộ'
      },
      {
        heading: 'Thực tiễn giáo dục công nghệ tại FPT Hậu Giang (61C Vị Thủy)',
        details: 'Trường TH, THCS, THPT FPT Hậu Giang (tại 61C ấp 6, xã Vị Thủy) tiên phong ứng dụng công nghệ số, trợ lý AI Kiến Sáng và bản đồ trực quan vào giảng dạy Chuyên đề Địa lí 11, nâng cao ý thức bảo vệ tài nguyên nước và tình yêu quê hương cho học sinh.',
        evidence: 'Hệ sinh thái giáo dục FPT Edu & Dự án số hóa Địa lí 11'
      }
    ],
    criticalAnalysis: 'Tỉnh Hậu Giang chịu nguy cơ xâm nhập mặn từ cả 2 hướng: mặn từ biển Đông tràn theo sông Hậu và mặn từ biển Tây theo sông Cái Lớn. Vì vậy, việc điều tiết hệ sinh thái kênh rạch, liên kết vùng và giáo dục thế hệ trẻ tư duy kinh tế xanh "Thuận thiên" là giải pháp sống còn.',
    reviewQuestion: 'Trình bày ý nghĩa của triết lý "Thuận thiên" trong Nghị quyết 120/NQ-CP và liên hệ vai trò của kênh xáng Xà No đối với kinh tế - xã hội tỉnh Hậu Giang?',
    modelAnswer: 'Triết lý Thuận thiên (NQ 120) coi nước ngọt, lợ, mặn đều là tài nguyên quý, chuyển từ đối phó sang chủ động thích ứng theo 3 vùng sinh thái. Tại Hậu Giang, kênh xáng Xà No là mạch máu dẫn nước ngọt từ sông Hậu thau chua rửa phèn, tạo nền tảng cho vùng lúa gạo chất lượng cao và phát triển du lịch văn hóa sông nước.'
  }
];

