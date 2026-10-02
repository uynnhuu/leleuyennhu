export interface SummitCountryRole {
  id: string;
  name: string;
  flag: string;
  geographicPosition: string; // Vị trí địa lí trong lưu vực
  basinAreaShare: string;     // % diện tích lưu vực
  flowContribution: string;   // % đóng góp dòng chảy
  nationalInterests: string[];// Lợi ích cốt lõi của quốc gia
  coreConcerns: string[];     // Mối lo ngại hàng đầu
  mrcStatus: string;          // Tư cách trong MRC (Thành viên chính thức hay đối tác đối thoại)
}

export interface SummitScenarioProposal {
  id: string;
  title: string;
  description: string;
  stanceType: 'Lợi Ích Dân Tộc Tối Đa' | 'Thỏa Hiệp Đôi Bên Cùng Có Lợi' | 'Ưu Tiên Sinh Thái Toàn Lưu Vực';
  aiAnalysis: {
    nationalBenefits: string[];
    transboundaryImpacts: string[];
    conflictPoints: string[];
    cooperationRecommendations: string[];
    dataSharingRole: string;
  };
}

export interface SummitScenario {
  id: string;
  title: string;
  topic: string;
  situationContext: string;
  mrcProcedureApplied: string;
  proposalsByCountry: Record<string, SummitScenarioProposal[]>;
}

export const SUMMIT_COUNTRIES: SummitCountryRole[] = [
  {
    id: 'vietnam',
    name: 'Việt Nam',
    flag: '🇻🇳',
    geographicPosition: 'Hạ lưu cuối cùng của dòng sông (cửa ngõ ra Biển Đông với ĐBSCL)',
    basinAreaShare: '8% diện tích lưu vực',
    flowContribution: '11% tổng lượng dòng chảy',
    nationalInterests: [
      'Đảm bảo dòng chảy mùa khô ổn định để đẩy lùi xâm nhập mặn bảo vệ hơn 20 triệu dân',
      'Duy trì nguồn phù sa màu mỡ để bồi đắp đồng bằng và chống sạt lở bờ sông',
      'Bảo vệ an ninh lương thực và an ninh nguồn nước vùng kinh tế trọng điểm ĐBSCL'
    ],
    coreConcerns: [
      'Các đập thủy điện thượng nguồn giữ nước mùa kiệt làm mặn xâm nhập sâu 70-90km',
      'Mất hơn 70% bùn cát phù sa gây xói lở dữ dội bờ sông và bờ biển',
      'Thiếu hụt dữ liệu xả lũ hồ chứa thượng nguồn dẫn đến bị động trong vận hành nông lịch'
    ],
    mrcStatus: 'Thành viên sáng lập chính thức của MRC (ký Hiệp định Mê Kông năm 1995)'
  },
  {
    id: 'laos',
    name: 'Lào',
    flag: '🇱🇦',
    geographicPosition: 'Thượng trung lưu và trung lưu (địa hình đồi núi dốc đón gió mùa)',
    basinAreaShare: '25% diện tích lưu vực (lớn nhất)',
    flowContribution: '35% tổng lượng dòng chảy (lớn nhất)',
    nationalInterests: [
      'Khai thác tiềm năng thủy điện khổng lồ để trở thành "Bình ắc quy của Đông Nam Á"',
      'Xuất khẩu điện năng sang Thái Lan, Việt Nam và Campuchia để tăng nguồn thu ngân sách xóa đói giảm nghèo',
      'Phát triển giao thông đường thủy thương mại kết nối không giáp biển ra đại dương'
    ],
    coreConcerns: [
      'Chi phí đền bù tái định cư và áp lực phản đối từ các tổ chức bảo vệ môi trường quốc tế',
      'Yêu cầu kỹ thuật tốn kém về bậc thang cho cá và cửa xả bùn đáy của các con đập',
      'Cần cân bằng giữa tăng trưởng năng lượng và bảo tồn văn hóa du lịch sinh thái'
    ],
    mrcStatus: 'Thành viên sáng lập chính thức của MRC (ký Hiệp định Mê Kông năm 1995)'
  },
  {
    id: 'cambodia',
    name: 'Campuchia',
    flag: '🇰🇭',
    geographicPosition: 'Hạ lưu đồng bằng trũng thấp và trái tim Biển Hồ (Tonle Sap)',
    basinAreaShare: '20% diện tích lưu vực',
    flowContribution: '18% tổng lượng dòng chảy',
    nationalInterests: [
      'Bảo vệ chu kỳ lũ tự nhiên và hiện tượng đảo dòng nuôi dưỡng Biển Hồ (Tonle Sap)',
      'Duy trì nguồn lợi thủy sản nước ngọt (chiếm hơn 70% lượng đạm động vật của người dân)',
      'Phát triển dự án kênh đào giao thông thủy kết nối nội địa ra biển'
    ],
    coreConcerns: [
      'Mực nước lũ suy giảm làm Biển Hồ không nhận đủ nước, đe dọa trực tiếp vựa cá quốc gia',
      'Đập thủy điện thượng nguồn cắt đứt đường cá di cư từ Biển Hồ lên thượng lưu đẻ trứng',
      'Nguy cơ ô nhiễm và cạn kiệt nguồn nước sinh hoạt của các làng chài nổi'
    ],
    mrcStatus: 'Thành viên sáng lập chính thức của MRC (ký Hiệp định Mê Kông năm 1995)'
  },
  {
    id: 'thailand',
    name: 'Thái Lan',
    flag: '🇹🇭',
    geographicPosition: 'Vùng hữu ngạn sông Mê Kông và toàn bộ cao nguyên Khorat (Isan)',
    basinAreaShare: '23% diện tích lưu vực',
    flowContribution: '18% tổng lượng dòng chảy',
    nationalInterests: [
      'Chuyển nước từ sông Mê Kông và các nhánh (Mun-Chi) để tưới cho vùng nông nghiệp khô hạn Isan',
      'Nhập khẩu nguồn điện giá rẻ từ các đập thủy điện của Lào để phục vụ công nghiệp hóa',
      'Phát triển thương mại biên giới và cảng sông quốc tế dọc sông Mê Kông'
    ],
    coreConcerns: [
      'Nguy cơ xung đột lợi ích với các nước hạ lưu khi thực hiện các dự án chuyển nước quy mô lớn',
      'Tác động của sự biến động mực nước sông bất thường đối với đời sống cư dân bờ hữu ngạn',
      'Cân đối giữa an ninh năng lượng công nghiệp và cam kết môi trường quốc tế'
    ],
    mrcStatus: 'Thành viên sáng lập chính thức của MRC (ký Hiệp định Mê Kông năm 1995)'
  },
  {
    id: 'china',
    name: 'Trung Quốc',
    flag: '🇨🇳',
    geographicPosition: 'Thượng nguồn tối cao tại cao nguyên Tây Tạng và tỉnh Vân Nam (Lan Thương Giang)',
    basinAreaShare: '21% diện tích lưu vực',
    flowContribution: '16% tổng dòng chảy cả năm (nhưng lên tới 40% dòng chảy mùa khô)',
    nationalInterests: [
      'Vận hành chuỗi đại thủy điện bậc thang để tạo nguồn năng lượng sạch phục vụ phát triển kinh tế nội địa',
      'Kiểm soát và điều tiết lũ mùa mưa, dự trữ nước ngọt cho an ninh quốc gia',
      'Mở rộng tuyến hành lang thương mại đường thủy sông Lan Thương - Mê Kông kết nối xuống ASEAN'
    ],
    coreConcerns: [
      'Bảo vệ quyền chủ quyền quốc gia trong việc quản lý và khai thác tài nguyên trên phần lãnh thổ của mình',
      'Áp lực từ dư luận quốc tế quy trách nhiệm hạn hán ở hạ lưu cho chuỗi đập Lan Thương',
      'Cân nhắc mức độ bảo mật dữ liệu an ninh năng lượng và thông tin thủy văn'
    ],
    mrcStatus: 'Đối tác đối thoại của MRC (từ năm 1996) và là thành viên trụ cột của Khung Hợp tác Lan Thương - Mê Kông (LMC)'
  },
  {
    id: 'myanmar',
    name: 'Myanmar',
    flag: '🇲🇲',
    geographicPosition: 'Đoạn sông biên giới phía Tây vùng Tam Giác Vàng (tiếp giáp Lào và Thái Lan)',
    basinAreaShare: '3% diện tích lưu vực',
    flowContribution: '2% tổng lượng dòng chảy',
    nationalInterests: [
      'Phát triển giao thương hàng hải tiểu vùng và du lịch sinh thái sông biên giới',
      'Bảo tồn tài nguyên rừng nhiệt đới nguyên sinh và hệ sinh thái đầu nguồn',
      'Tăng cường hợp tác an ninh biên giới và quản lý nguồn nước bền vững'
    ],
    coreConcerns: [
      'Ô nhiễm nguồn nước từ khai thác khoáng sản và hoạt động nông nghiệp ven sông',
      'Thiếu hụt nguồn vốn và công nghệ để lắp đặt các trạm quan trắc thủy văn tự động',
      'Nguy cơ xói lở đường biên giới tự nhiên do biến đổi dòng chảy'
    ],
    mrcStatus: 'Đối tác đối thoại của MRC (từ năm 1996) và tham gia Khung Hợp tác Lan Thương - Mê Kông (LMC)'
  }
];

export const MRC_PROCEDURES_INFO = [
  {
    code: 'PDIES (2001)',
    fullName: 'Thủ tục Trao đổi và Chia sẻ Thông tin, Số liệu',
    purpose: 'Quy định các quốc gia thành viên thường xuyên chia sẻ dữ liệu thủy văn, khí tượng, chất lượng nước và hiện trạng sử dụng đất.'
  },
  {
    code: 'PWUM (2003)',
    fullName: 'Thủ tục Giám sát Sử dụng Nước',
    purpose: 'Thiết lập mạng lưới quan trắc và giám sát các hoạt động lấy nước từ dòng chính và các phụ lưu lớn trong mùa mưa và mùa khô.'
  },
  {
    code: 'PNPCA (2003)',
    fullName: 'Thủ tục Thông báo, Tham vấn trước và Thỏa thuận',
    purpose: 'Bắt buộc mọi dự án xây đập trên dòng chính phải thông báo và tham vấn kỹ thuật tối thiểu 6 tháng với các nước láng giềng trước khi khởi công.'
  },
  {
    code: 'PMFM (2006)',
    fullName: 'Thủ tục Duy trì Dòng chảy trên Dòng chính',
    purpose: 'Quy định lưu lượng dòng chảy tối thiểu cần duy trì trong mùa kiệt để ngăn chặn xâm nhập mặn và bảo vệ dòng chảy ngược vào Biển Hồ.'
  },
  {
    code: 'PWQ (2011)',
    fullName: 'Thủ tục Chất lượng Nước',
    purpose: 'Đặt ra các quy chuẩn kỹ thuật chung về hóa học, sinh học để bảo vệ nguồn nước không bị ô nhiễm độc hại xuyên biên giới.'
  }
];

export const SUMMIT_SCENARIOS: SummitScenario[] = [
  {
    id: 'summit-scen-1',
    title: 'Tình Huống 1: Đề Xuất Xả Nước Khẩn Cấp Trong Đợt Siêu Hạn Mùa Khô',
    topic: 'Cân đối giữa việc giữ nước phát điện ở thượng nguồn và cứu hạn mặn ở hạ lưu ĐBSCL',
    situationContext: 'Một đợt El Niño khốc liệt khiến mực nước sông Mê Kông xuống thấp nhất trong 100 năm. Vùng ĐBSCL của Việt Nam bị mặn lấn sâu 85km làm cháy khô hàng vạn héc-ta lúa và cây ăn trái. Việt Nam đề nghị Trung Quốc và Lào tăng cường xả nước từ các hồ chứa thủy điện.',
    mrcProcedureApplied: 'Thủ tục PMFM (Duy trì dòng chảy dòng chính) và PDIES (Chia sẻ thông tin số liệu)',
    proposalsByCountry: {
      vietnam: [
        {
          id: 'vn-prop-1',
          title: 'Đề nghị Trung Quốc và Lào xả bổ sung 1.500 m³/s liên tục trong 30 ngày',
          description: 'Khẩn thiết kêu gọi tinh thần láng giềng hữu nghị và trách nhiệm quốc tế, đề nghị các hồ thủy điện thượng lưu xả khẩn cấp dòng chảy đáy để tạo lực đẩy mặn ra xa các cửa sông ĐBSCL.',
          stanceType: 'Thỏa Hiệp Đôi Bên Cùng Có Lợi',
          aiAnalysis: {
            nationalBenefits: [
              'Cứu sống trực tiếp hơn 100.000 ha vườn cây ăn trái và lúa đông xuân',
              'Đẩy lùi ranh mặn 4g/l từ 85km về dưới 50km, các nhà máy nước sạch lấy được nước ngọt',
              'Giảm thiểu thiệt hại kinh tế ước tính hàng trăm triệu USD'
            ],
            transboundaryImpacts: [
              'Các nhà máy thủy điện thượng nguồn phải vận hành lệch khỏi kế hoạch phát điện thương mại tối ưu',
              'Mực nước dọc sông qua Lào và Thái Lan dâng lên giúp tàu thuyền giao thông thuận lợi hơn',
              'Campuchia cũng nhận thêm nước tưới cho mùa vụ ven sông Mê Kông'
            ],
            conflictPoints: [
              'Doanh nghiệp vận hành đập tư nhân tại Lào và Trung Quốc có thể phản ứng vì mất cơ hội tích nước bán điện giá cao vào giờ cao điểm',
              'Thời gian nước chảy từ thượng nguồn về tới ĐBSCL mất khoảng 10-15 ngày, đòi hỏi phối hợp điều tiết cực kỳ chính xác'
            ],
            cooperationRecommendations: [
              'Việt Nam có thể đề xuất cơ chế hỗ trợ chi phí vận hành hoặc cam kết mua điện ổn định dài hạn',
              'Thiết lập đường dây nóng điều phối thủy văn thời gian thực giữa Bộ Nông nghiệp các nước và Ban Thư ký MRC'
            ],
            dataSharingRole: 'Dữ liệu đo đạc thủy văn tại trạm Chiang Saen, Vientiane, Pakse, Kratie và Tân Châu phải được cập nhật từng giờ để kiểm chứng lưu lượng thực tế về đồng bằng.'
          }
        },
        {
          id: 'vn-prop-2',
          title: 'Kích hoạt điều khoản bồi thường thiệt hại xuyên biên giới theo luật pháp quốc tế',
          description: 'Cương quyết yêu cầu xem xét trách nhiệm pháp lý của việc tích nước đập thủy điện trong thời điểm hạn hán tự nhiên.',
          stanceType: 'Lợi Ích Dân Tộc Tối Đa',
          aiAnalysis: {
            nationalBenefits: [
              'Thể hiện lập trường đanh thép bảo vệ quyền lợi chính đáng của hàng triệu nông dân hạ lưu',
              'Thu hút sự chú ý và ủng hộ của các tổ chức quốc tế'
            ],
            transboundaryImpacts: [
              'Gây căng thẳng ngoại giao với các nước láng giềng thượng nguồn',
              'Làm đình trệ các kênh đàm phán hợp tác kỹ thuật thực chất đang diễn ra trong MRC'
            ],
            conflictPoints: [
              'Khó chứng minh định lượng rạch ròi tỷ lệ hạn hán do thiên tai El Niño gây ra so với do đập tích nước',
              'Các nước thượng nguồn có thể từ chối đối thoại hoặc đóng băng cơ chế chia sẻ số liệu tự nguyện'
            ],
            cooperationRecommendations: [
              'Nên ưu tiên phương thức ngoại giao nước mềm dẻo dựa trên cơ sở khoa học và tinh thần xây dựng'
            ],
            dataSharingRole: 'Cần có số liệu quan trắc độc lập được các bên thừa nhận thay vì các cáo buộc một chiều.'
          }
        }
      ],
      laos: [
        {
          id: 'laos-prop-1',
          title: 'Sẵn sàng xả nước hỗ trợ theo lộ trình kỹ thuật an toàn của hồ đập',
          description: 'Lào đồng ý phối hợp với các chủ đập để điều chỉnh lịch phát điện, xả lưu lượng hỗ trợ hạ du với điều kiện không làm rỗng hồ chứa gây nguy cơ sập bờ đập.',
          stanceType: 'Thỏa Hiệp Đôi Bên Cùng Có Lợi',
          aiAnalysis: {
            nationalBenefits: [
              'Khẳng định vị thế thành viên có trách nhiệm cao của cộng đồng ASEAN và MRC',
              'Tăng cường sự tin cậy chiến lược lâu dài với người anh em Việt Nam và Campuchia'
            ],
            transboundaryImpacts: [
              'Giúp hạ lưu giảm bớt cơn khát nước ngọt và áp lực mặn xâm nhập',
              'Lượng điện sản xuất vẫn có thể bán sang lưới điện Việt Nam theo hợp đồng mua bán điện PPA'
            ],
            conflictPoints: [
              'Cần thỏa thuận kỹ thuật với các công ty đầu tư BOT để bù đắp các tổn thất phát sinh'
            ],
            cooperationRecommendations: [
              'Ký kết quy trình vận hành liên hồ chứa lưu vực Mê Kông theo mùa khô hạn khẩn cấp'
            ],
            dataSharingRole: 'Cung cấp công khai biểu đồ xả nước của đập Sayaboury và Don Sahong cho Ban Thư ký MRC.'
          }
        }
      ],
      china: [
        {
          id: 'china-prop-1',
          title: 'Mở cửa xả khẩn cấp tại đập Cảnh Hồng (Jinghong) và chia sẻ số liệu thủy văn',
          description: 'Trung Quốc quyết định kích hoạt cơ chế hợp tác nhân đạo Lan Thương - Mê Kông, xả tăng cường lưu lượng từ đập Cảnh Hồng giúp các nước hạ lưu đẩy mặn.',
          stanceType: 'Thỏa Hiệp Đôi Bên Cùng Có Lợi',
          aiAnalysis: {
            nationalBenefits: [
              'Nâng cao hình ảnh quốc gia thượng nguồn có trách nhiệm và hữu nghị với các nước láng giềng phía nam',
              'Thắt chặt quan hệ đối tác kinh tế trong khuôn khổ Hợp tác Lan Thương - Mê Kông (LMC)'
            ],
            transboundaryImpacts: [
              'Lưu lượng nước tăng vọt dọc 4.763km giúp cải thiện toàn diện mực nước sông mùa khô',
              'Cứu vãn hàng triệu hecta hoa màu và nguồn nước sinh hoạt của nhân dân ĐBSCL'
            ],
            conflictPoints: [
              'Hồ Cảnh Hồng giảm dung tích trữ nước phục vụ phát điện mùa hè của tỉnh Vân Nam'
            ],
            cooperationRecommendations: [
              'Nâng cấp cơ chế chia sẻ số liệu thủy văn Lan Thương từ "chỉ trong mùa lũ" sang "toàn bộ cả năm 365 ngày"'
            ],
            dataSharingRole: 'Cực kỳ then chốt: Dữ liệu xả từ Vân Nam giúp các trạm thủy văn của Lào, Thái Lan, Campuchia và Việt Nam tính toán chính xác ngày giờ nước về.'
          }
        }
      ]
    }
  },
  {
    id: 'summit-scen-2',
    title: 'Tình Huống 2: Tham Vấn Dự Án Thủy Điện Mới Trên Dòng Chính',
    topic: 'Thực thi thủ tục PNPCA đối với các dự án xây dựng đập thủy điện dòng chính',
    situationContext: 'Một quốc gia thành viên đệ trình hồ sơ dự án đập thủy điện công suất 1.400 MW trên dòng chính sông Mê Kông. Các nước hạ lưu bày tỏ quan ngại sâu sắc về việc chia cắt đường di cư của cá và sụt giảm lượng bùn cát nuôi dưỡng đồng bằng châu thổ.',
    mrcProcedureApplied: 'Thủ tục PNPCA (Thông báo, Tham vấn trước và Thỏa thuận)',
    proposalsByCountry: {
      vietnam: [
        {
          id: 'vn-pnpca-1',
          title: 'Đề nghị hoãn dự án để hoàn thiện đánh giá tác động môi trường xuyên biên giới (TbEIA)',
          description: 'Yêu cầu kéo dài thời gian tham vấn kỹ thuật của MRC; chỉ xem xét thông qua khi chủ đầu tư bổ sung thiết kế đường dẫn cá hiện đại và cửa xả bùn cát đáy độc lập.',
          stanceType: 'Thỏa Hiệp Đôi Bên Cùng Có Lợi',
          aiAnalysis: {
            nationalBenefits: [
              'Bảo vệ quyền lợi sống còn về nguồn cá và lượng phù sa của ĐBSCL',
              'Đảm bảo các tiêu chuẩn kỹ thuật quốc tế được áp dụng nghiêm ngặt'
            ],
            transboundaryImpacts: [
              'Tạo tiền lệ chuẩn mực pháp lý cao cho mọi dự án công trình trên dòng chính sau này',
              'Khuyến khích công nghệ xây đập sinh thái ít phát thải và thân thiện với tự nhiên'
            ],
            conflictPoints: [
              'Chủ đầu tư có thể phàn nàn vì tiến độ giải ngân dự án bị chậm lại và đội vốn đầu tư thiết kế'
            ],
            cooperationRecommendations: [
              'Thành lập Hội đồng chuyên gia quốc tế độc lập của MRC để giám sát thiết kế kỹ thuật'
            ],
            dataSharingRole: 'Minh bạch toàn bộ báo cáo khảo sát địa chất và mô phỏng thủy lực dòng bùn cát.'
          }
        }
      ],
      laos: [
        {
          id: 'laos-pnpca-1',
          title: 'Cam kết đầu tư thêm 200 triệu USD thiết kế bậc thang cá và xả bùn hiện đại',
          description: 'Lào lắng nghe các ý kiến đóng góp chân thành của các quốc gia láng giềng và các nhà khoa học, cam kết nâng cấp thiết kế để giảm thiểu tác động xuyên biên giới xuống mức thấp nhất.',
          stanceType: 'Thỏa Hiệp Đôi Bên Cùng Có Lợi',
          aiAnalysis: {
            nationalBenefits: [
              'Vừa bảo đảm quyền phát triển kinh tế quốc gia, vừa giữ vững tình đoàn kết với các nước hạ du',
              'Tiếp cận các nguồn vốn vay xanh ưu đãi từ các định chế tài chính quốc tế (WB, ADB)'
            ],
            transboundaryImpacts: [
              'Giảm thiểu đáng kể tỷ lệ cá chết khi di cư qua thân đập',
              'Khoảng 40-50% lượng phù sa lơ lửng có thể đi qua cửa xả đáy về hạ du'
            ],
            conflictPoints: [
              'Các bậc thang cá nhân tạo vẫn không thể thay thế hoàn hảo 100% dòng sông tự nhiên đối với các loài cá khổng lồ'
            ],
            cooperationRecommendations: [
              'Ký kết biên bản ghi nhớ chung về việc kiểm toán sinh thái định kỳ sau khi công trình đi vào vận hành'
            ],
            dataSharingRole: 'Chia sẻ dữ liệu cảm biến giám sát di cư của cá và hàm lượng phù sa thời gian thực.'
          }
        }
      ]
    }
  }
];
