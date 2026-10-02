export interface ManagerIndicators {
  water: number;       // 💧 Nguồn nước
  agriculture: number; // 🌾 Nông nghiệp
  fisheries: number;   // 🐟 Thủy sản
  energy: number;      // ⚡ Năng lượng
  environment: number; // 🌱 Môi trường
  livelihood: number;  // 👥 Đời sống người dân
}

export interface ManagerChoice {
  id: string;
  title: string;
  description: string;
  indicatorChanges: {
    water: number;
    agriculture: number;
    fisheries: number;
    energy: number;
    environment: number;
    livelihood: number;
  };
  impactSummary: string;
  causeExplanation: string;
  tradeOffAnalysis: {
    gains: string[];
    sacrifices: string[];
  };
  policyContext: string;
}

export interface ManagerScenario {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  context: string;
  urgentNotice: string;
  choices: ManagerChoice[];
}

export const INITIAL_MANAGER_INDICATORS: ManagerIndicators = {
  water: 70,
  agriculture: 75,
  fisheries: 65,
  energy: 60,
  environment: 65,
  livelihood: 70
};

export const MANAGER_SCENARIOS: ManagerScenario[] = [
  {
    id: 'scenario-1-dam',
    number: 1,
    title: 'Phát Triển Thủy Điện Dòng Chính & Dòng Nhánh',
    subtitle: 'Nhu cầu điện năng tăng vọt phục vụ công nghiệp hóa',
    context: 'Các quốc gia lưu vực thượng nguồn và trung lưu đề xuất phê duyệt dự án thủy điện quy mô lớn mới trên dòng chính sông Mê Kông để xuất khẩu điện và đảm bảo an ninh năng lượng khu vực.',
    urgentNotice: 'Hạ lưu lo ngại mất phù sa bùn cát và cắt đứt đường di cư của các loài cá quý hiếm.',
    choices: [
      {
        id: 'dam-opt-a',
        title: 'Phê duyệt tối đa dự án thủy điện dòng chính để tăng tốc kinh tế',
        description: 'Tận dụng triệt để nguồn thủy năng dồi dào, biến lưu vực thành trung tâm năng lượng sạch của khu vực.',
        indicatorChanges: {
          water: -15,
          agriculture: -10,
          fisheries: -25,
          energy: +30,
          environment: -20,
          livelihood: +5
        },
        impactSummary: 'Năng lượng tăng vọt (+30) nhưng hệ sinh thái (-20) và thủy sản (-25) bị suy thoái nghiêm trọng do đập chắn đường di cư.',
        causeExplanation: 'Đập thủy điện trên dòng chính tạo ra nguồn điện lớn giá rẻ nhưng giữ lại hơn 70% bùn cát phù sa và làm biến đổi dòng chảy tự nhiên, triệt tiêu môi trường đẻ trứng của cá.',
        tradeOffAnalysis: {
          gains: ['Tự chủ năng lượng giá rẻ', 'Tạo nguồn thu ngân sách lớn từ xuất khẩu điện', 'Thúc đẩy công nghiệp hóa đô thị'],
          sacrifices: ['Mất mát nguồn đạm cá tự nhiên của hàng triệu người', 'Hạ lưu ĐBSCL bị thiếu hụt phù sa gây sạt lở bờ sông', 'Nguy cơ cạn kiệt đáy hồ Tonle Sap']
        },
        policyContext: 'Bài học thực tế từ các dự án đập Sayaboury và Don Sahong trên dòng chính tại Lào.'
      },
      {
        id: 'dam-opt-b',
        title: 'Tạm hoãn thủy điện dòng chính, ưu tiên điện mặt trời và điện gió phân tán',
        description: 'Bảo lưu dòng chảy tự nhiên của dòng chính; hỗ trợ tài chính để chuyển đổi sang năng lượng mặt trời áp mái và điện gió ven biển.',
        indicatorChanges: {
          water: +10,
          agriculture: +5,
          fisheries: +20,
          energy: -5,
          environment: +25,
          livelihood: +10
        },
        impactSummary: 'Bảo vệ toàn vẹn hệ sinh thái và nguồn lợi cá (+25), nhưng đòi hỏi chi phí đầu tư ban đầu cao cho lưới điện thông minh.',
        causeExplanation: 'Giữ thông thoáng dòng chính giúp bảo tồn dòng bùn cát phù sa tự nhiên về nuôi dưỡng ĐBSCL và duy trì chu kỳ sinh sản tự nhiên của loài thủy sản.',
        tradeOffAnalysis: {
          gains: ['Bảo vệ phù sa bồi đắp đồng bằng', 'Bảo tồn loài cá quý hiếm và nghề cá truyền thống', 'Giảm thiểu xung đột ngoại giao xuyên biên giới'],
          sacrifices: ['Chi phí đầu tư năng lượng mặt trời/gió ban đầu cao', 'Cần giải pháp lưu trữ pin tích năng', 'Tăng trưởng sản lượng điện chậm hơn so với thủy điện']
        },
        policyContext: 'Chiến lược năng lượng xanh bền vững được MRC khuyến nghị trong Tầm nhìn Lưu vực 2030 - 2040.'
      }
    ]
  },
  {
    id: 'scenario-2-agriculture',
    number: 2,
    title: 'Khai Thác Nước Nông Nghiệp & Mở Rộng Vụ Mùa',
    subtitle: 'Mở rộng diện tích lúa vụ 3 thâm canh hay xả lũ lấy phù sa?',
    context: 'Nhu cầu xuất khẩu gạo tăng cao, nhiều địa phương kiến nghị đắp đê bao triệt để làm lúa vụ 3 thâm canh quanh năm, đòi hỏi lượng nước ngọt tưới tiêu khổng lồ.',
    urgentNotice: 'Hệ thống đê bao khép kín ngăn lũ khiến đất đai bị bạc màu và nước lũ tràn sang các vùng xung quanh gây ngập úng.',
    choices: [
      {
        id: 'agri-opt-a',
        title: 'Mở rộng tối đa hệ thống đê bao khép kín làm lúa 3 vụ',
        description: 'Tận dụng triệt để đất đai, tăng sản lượng lúa gạo tối đa để đảm bảo kim ngạch xuất khẩu và thu nhập tức thì của hộ nông dân.',
        indicatorChanges: {
          water: -20,
          agriculture: +20,
          fisheries: -15,
          energy: -5,
          environment: -15,
          livelihood: +10
        },
        impactSummary: 'Sản lượng lúa tăng mạnh (+20) nhưng tài nguyên nước mặt kiệt quệ (-20) và đất đai dần suy thoái vì không được nước lũ rửa phèn bồi sa.',
        causeExplanation: 'Canh tác lúa liên tục 3 vụ/năm tiêu hao lượng nước mặt rất lớn, phải sử dụng nhiều phân bón hóa học và thuốc bảo vệ thực vật, làm giảm khả năng tự làm sạch của sông rạch.',
        tradeOffAnalysis: {
          gains: ['Gia tăng sản lượng lương thực tức thời', 'Thu nhập ngắn hạn của nông dân trồng lúa tăng', 'Khẳng định vị thế xuất khẩu gạo'],
          sacrifices: ['Đất đai chai cứng, cạn kiệt dinh dưỡng tự nhiên', 'Mất không gian trữ lũ tự nhiên ở Đồng Tháp Mười và Tứ giác Long Xuyên', 'Chi phí đắp đê và bảo dưỡng công trình rất lớn']
        },
        policyContext: 'Thực tiễn xây dựng đê bao chống lũ triệt để ở An Giang, Đồng Tháp giai đoạn 2000 - 2015.'
      },
      {
        id: 'agri-opt-b',
        title: 'Mô hình 2 lúa 1 cá/xả lũ sinh thái theo tinh thần Nghị quyết 120',
        description: 'Không làm lúa vụ 3; chủ động mở cửa cống đón lũ vào đồng ruộng để lấy phù sa bồi đắp, diệt trừ sâu bệnh và nuôi thủy sản mùa nước nổi.',
        indicatorChanges: {
          water: +15,
          agriculture: +5,
          fisheries: +20,
          energy: 0,
          environment: +20,
          livelihood: +15
        },
        impactSummary: 'Môi trường hồi sinh (+20), đất đai được trẻ hóa phù sa tự nhiên và tạo thêm sinh kế cá tôm mùa lũ cho người nghèo (+15).',
        causeExplanation: 'Mô hình "Thuận thiên" giúp các vùng trũng đón nhận 3-5 cm bùn phù sa màu mỡ mỗi mùa lũ, giảm 50% chi phí phân bón cho vụ đông xuân tiếp theo.',
        tradeOffAnalysis: {
          gains: ['Tiết kiệm nước tưới và phân bón hóa học', 'Đồng ruộng được rửa chua, rửa phèn sạch sẽ', 'Tạo nguồn lợi thủy sản đồng ruộng tự nhiên'],
          sacrifices: ['Sản lượng thóc thô trong năm giảm 1 vụ', 'Cần tổ chức chuyển đổi ngành nghề cho lao động trong mùa ngập lũ', 'Phụ thuộc vào mức độ lũ hàng năm']
        },
        policyContext: 'Mô hình chuyển đổi sinh thái bền vững được Thủ tướng Chính phủ chỉ đạo theo Nghị quyết 120/NQ-CP.'
      }
    ]
  },
  {
    id: 'scenario-3-drought',
    number: 3,
    title: 'Ứng Phó Siêu Hạn Hán Mùa Khô & Thiếu Nước Toàn Lưu Vực',
    subtitle: 'Năm El Niño kỷ lục khiến mực nước sông Mê Kông tụt xuống mức đáy lịch sử',
    context: 'Lưu lượng nước từ thượng nguồn đổ về hạ du giảm hơn 50%. Các cánh đồng khát nước, sông rạch nội đồng trơ đáy và người dân thiếu nước sinh hoạt trầm trọng.',
    urgentNotice: 'Hàng trăm nghìn héc-ta lúa và cây ăn trái đặc sản có nguy cơ chết khô nếu không có nguồn nước bổ sung khẩn cấp.',
    choices: [
      {
        id: 'drought-opt-a',
        title: 'Khai thác tối đa nguồn nước ngầm tầng sâu để cấp nước cứu cây trồng',
        description: 'Khoan hàng loạt giếng ngầm dã chiến công suất lớn để bơm nước tưới cho vườn sầu riêng, cây ăn quả và lúa.',
        indicatorChanges: {
          water: -25,
          agriculture: +15,
          fisheries: -10,
          energy: -10,
          environment: -25,
          livelihood: +5
        },
        impactSummary: 'Cứu được vụ mùa nông nghiệp trước mắt (+15) nhưng làm tụt mực nước ngầm và gây sụt lún nền đất ĐBSCL nghiêm trọng (-25).',
        causeExplanation: 'Nước ngầm tầng sâu được tích tụ qua hàng triệu năm. Khai thác ồ ạt làm rỗng các tầng chứa nước, gây sụt lún mặt đất với tốc độ 2-5 cm/năm (nhanh hơn tốc độ nước biển dâng).',
        tradeOffAnalysis: {
          gains: ['Cứu khẩn cấp các vườn cây ăn trái giá trị cao', 'Chủ động nguồn nước ngọt tại chỗ không phụ thuộc sông', 'Chi phí thiết bị bơm ban đầu tương đối rẻ'],
          sacrifices: ['Gây sụt lún nền đất không thể phục hồi', 'Ô nhiễm asen và nhiễm mặn tầng nước ngầm quý giá', 'Làm cho tình trạng ngập triều cường đô thị càng tồi tệ hơn']
        },
        policyContext: 'Cảnh báo của Bộ Tài nguyên & Môi trường về tốc độ sụt lún nền đất tại Cần Thơ, Hậu Giang và Cà Mau.'
      },
      {
        id: 'drought-opt-b',
        title: 'Kích hoạt ngoại giao nước MRC yêu cầu xả hồ chứa & Xây hồ trữ nước ngọt phân tán',
        description: 'Vận dụng cơ chế thỏa thuận MRC đề nghị các hồ thủy điện xả nước điều tiết; đồng thời nạo vét lòng kênh, làm túi trữ nước ngọt phân tán trong vườn nhà.',
        indicatorChanges: {
          water: +15,
          agriculture: +10,
          fisheries: +10,
          energy: +5,
          environment: +15,
          livelihood: +15
        },
        impactSummary: 'Khắc phục hạn hán bài bản (+15), nâng cao tinh thần tự cường và thúc đẩy tinh thần hợp tác quốc tế trên toàn lưu vực.',
        causeExplanation: 'Sự phối hợp điều tiết nước từ các hồ chứa thượng nguồn kết hợp tích trữ nước mưa và nước ngọt cục bộ là giải pháp căn cơ, bảo vệ an toàn cho cả dòng sông và nguồn ngầm.',
        tradeOffAnalysis: {
          gains: ['Bảo vệ an toàn tầng nước ngầm và nền đất', 'Nâng cao năng lực quản trị nguồn nước cộng đồng', 'Thắt chặt tình hữu nghị hợp tác lưu vực sông Mê Kông'],
          sacrifices: ['Cần thời gian đàm phán ngoại giao và nước di chuyển mất 1-2 tuần', 'Đòi hỏi đầu tư nạo vét hệ sinh thái kênh mương', 'Người dân phải tập thói quen tiết kiệm nước khắt khe']
        },
        policyContext: 'Thực tiễn Việt Nam đề nghị Trung Quốc và Lào xả nước đập thủy điện giúp ĐBSCL chống hạn mặn lịch sử năm 2016 và 2020.'
      }
    ]
  },
  {
    id: 'scenario-4-salinity',
    number: 4,
    title: 'Xâm Nhập Mặn Gia Tăng & Lựa Chọn Mô Hình Sinh Kế',
    subtitle: 'Ranh mặn 4g/l lấn sâu 70-90km vào nội đồng sông Tiền, sông Hậu',
    context: 'Nước biển dâng kết hợp dòng chảy thượng nguồn kiệt quệ đẩy nước mặn thọc sâu vào tận Hậu Giang, Vĩnh Long, Bến Tre, đe dọa các vùng ngọt hóa truyền thống.',
    urgentNotice: 'Xây hệ thống đê cống bê tông khép kín ngăn mặn hay chuyển đổi mô hình kinh tế mặn - lợ?',
    choices: [
      {
        id: 'sal-opt-a',
        title: 'Xây dựng siêu hệ thống cống đập bê tông ngăn mặn khép kín toàn diện',
        description: 'Đầu tư hàng chục nghìn tỷ đồng xây các cống âu thuyền siêu lớn (như Cái Lớn - Cái Bé) để ngăn triệt để mặn, giữ nước ngọt tối đa.',
        indicatorChanges: {
          water: +10,
          agriculture: +15,
          fisheries: -15,
          energy: -5,
          environment: -10,
          livelihood: +5
        },
        impactSummary: 'Bảo vệ được vùng lúa và cây ăn trái ngọt (+15), nhưng làm tù đọng nguồn nước bên trong và cản trở hệ sinh thái cá tôm nước lợ (-15).',
        causeExplanation: 'Công trình ngăn mặn bảo vệ an toàn diện tích lúa nhưng nếu đóng kín quá lâu sẽ làm nước kênh rạch không lưu thông, gây ô nhiễm cục bộ và triệt tiêu nghề nuôi trồng nước mặn, lợ.',
        tradeOffAnalysis: {
          gains: ['Giữ ngọt cho hàng trăm nghìn héc-ta cây ăn trái', 'Chủ động nguồn nước ngọt trong mùa khô', 'Bảo vệ đời sống đô thị hạ lưu'],
          sacrifices: ['Vốn đầu tư và bảo trì công trình rất lớn', 'Làm giảm đa dạng sinh học hệ sinh thái cửa sông', 'Xung đột lợi ích giữa nông dân trồng lúa ngọt và người nuôi tôm nước lợ']
        },
        policyContext: 'Vận hành hệ thống thủy lợi cống Cái Lớn - Cái Bé tại Kiên Giang và Hậu Giang.'
      },
      {
        id: 'sal-opt-b',
        title: 'Chuyển đổi linh hoạt mô hình sinh thái Lúa - Tôm thông minh và cây chịu mặn',
        description: 'Vùng ven biển mùa mưa trồng lúa ngọt, mùa khô đón nước mặn nuôi tôm sinh thái; đưa giống khóm Cầu Đúc, mãng cầu xiêm ghép gốc bình bát thích ứng mặn.',
        indicatorChanges: {
          water: +10,
          agriculture: +15,
          fisheries: +25,
          energy: 0,
          environment: +20,
          livelihood: +25
        },
        impactSummary: 'Tối ưu hóa kinh tế sinh thái (+25), người dân làm giàu từ tôm sạch và cây đặc sản thích ứng mặn, môi trường được bảo vệ bền vững.',
        causeExplanation: 'Coi nước mặn là tài nguyên thay vì hiểm họa. Đất trồng lúa hấp thu chất thải của tôm, và chất hữu cơ từ gốc rạ làm thức ăn tự nhiên cho tôm, tạo ra chuỗi giá trị cao.',
        tradeOffAnalysis: {
          gains: ['Giá trị kinh tế của tôm sinh thái cao gấp 3-5 lần trồng lúa đơn thuần', 'Thích ứng hoàn hảo với quy luật nước mặn mùa khô', 'Giảm thiểu ô nhiễm môi trường'],
          sacrifices: ['Đòi hỏi nông dân nắm vững kỹ thuật kiểm soát độ mặn', 'Rủi ro dịch bệnh thủy sản nếu thời tiết biến động đột ngột', 'Cần tái cơ cấu chuỗi cung ứng thị trường']
        },
        policyContext: 'Mô hình kinh tế lúa - tôm đạt chứng nhận quốc tế tại Sóc Trăng, Bạc Liêu, Kiên Giang và Hậu Giang.'
      }
    ]
  },
  {
    id: 'scenario-5-sand',
    number: 5,
    title: 'Khai Thác Cát Lòng Sông vs Chống Sạt Lở Bờ Sông',
    subtitle: 'Nhu cầu cát khổng lồ đắp nền các tuyến đường cao tốc trục dọc - ngang ĐBSCL',
    context: 'Các dự án cao tốc trọng điểm miền Tây cần hàng chục triệu mét khối cát đắp nền, trong khi lượng phù sa cát từ thượng nguồn sông Mê Kông đã sụt giảm hơn 70%.',
    urgentNotice: 'Sạt lở bờ sông Tiền, sông Hậu và kênh rạch nội đồng liên tiếp làm sập nhà cửa, đường sá của người dân.',
    choices: [
      {
        id: 'sand-opt-a',
        title: 'Cấp phép tối đa nạo vét cát lòng sông Mê Kông để hoàn thành đúng tiến độ cao tốc',
        description: 'Ưu tiên kết nối giao thông hạ tầng để giải phóng tiềm năng kinh tế vùng, chấp nhận rủi ro sạt lở cục bộ ở một số khúc sông.',
        indicatorChanges: {
          water: -15,
          agriculture: -10,
          fisheries: -15,
          energy: +10,
          environment: -30,
          livelihood: -10
        },
        impactSummary: 'Giao thông được đẩy nhanh nhưng lòng sông bị khoét sâu, gây ra làn sóng sạt lở bờ sông nghiêm trọng (-30) đe dọa sinh mạng người dân.',
        causeExplanation: 'Khai thác cát làm hạ thấp đáy sông, tạo ra các hố sâu hút nước. Dòng nước xoáy chân bờ gây hàm ếch và đổ ụp hàng loạt khu dân cư, trường học ven sông.',
        tradeOffAnalysis: {
          gains: ['Các tuyến đường cao tốc thông xe đúng kế hoạch', 'Tăng cường lưu thông hàng hóa nông sản liên vùng', 'Tạo công ăn việc làm xây dựng ngắn hạn'],
          sacrifices: ['Hàng nghìn hộ dân mất nhà cửa vì sạt lở bờ sông', 'Mất bãi đẻ của thủy sản đáy sông', 'Sông bị hạ thấp đáy làm nước mặn thâm nhập sâu hơn vào nội đồng']
        },
        policyContext: 'Thực trạng sạt lở bờ sông nghiêm trọng tại An Giang, Đồng Tháp, Cần Thơ, Hậu Giang và Vĩnh Long.'
      },
      {
        id: 'sand-opt-b',
        title: 'Cấm khai thác cát lòng sông tại các điểm xung yếu, sử dụng vật liệu thay thế',
        description: 'Quy hoạch nghiêm ngặt mỏ cát, cấm khai thác trên sông chính; nghiên cứu sử dụng cát biển đã rửa mặn, tro xỉ nhiệt điện và cầu cạn bê tông đúc sẵn cho cao tốc.',
        indicatorChanges: {
          water: +10,
          agriculture: +5,
          fisheries: +15,
          energy: -5,
          environment: +25,
          livelihood: +15
        },
        impactSummary: 'Bảo vệ an toàn bờ sông và sinh thái (+25), người dân an tâm sinh sống, định hình tư duy phát triển hạ tầng bền vững lâu dài.',
        causeExplanation: 'Lòng sông được ổn định giúp duy trì chế độ thủy văn tự nhiên, ngăn chặn hiện tượng sụt trượt taluy bờ sông và hạn chế gia tăng xâm nhập mặn.',
        tradeOffAnalysis: {
          gains: ['Bảo vệ an toàn tài sản và tính mạng của cư dân ven sông', 'Ổn định hình thái lòng dẫn sông Mê Kông', 'Thúc đẩy nghiên cứu phát triển công nghệ vật liệu mới xanh'],
          sacrifices: ['Chi phí xây dựng cao tốc có thể đội lên cao hơn', 'Thời gian hoàn thành dự án cần kéo dài để kiểm nghiệm vật liệu', 'Cần nguồn vốn ngân sách ban đầu lớn']
        },
        policyContext: 'Nghiên cứu của Bộ Giao thông Vận tải và Bộ Xây dựng về vật liệu cát biển thay thế cát sông đắp nền đường cao tốc.'
      }
    ]
  },
  {
    id: 'scenario-6-data',
    number: 6,
    title: 'Chia Sẻ Dữ Liệu Thủy Văn & Minh Bạch Quản Trị MRC',
    subtitle: 'Áp dụng thủ tục PDIES (Chia sẻ thông tin số liệu) và giám sát dòng chảy thời gian thực',
    context: 'Hạ lưu thường xuyên đối mặt với sự thay đổi mực nước đột ngột trong ngày mà không rõ nguyên nhân từ mưa tự nhiên hay do đập thượng nguồn tích xả nước.',
    urgentNotice: 'Hạ lưu đề xuất thiết lập hệ thống quan trắc tự động và chia sẻ bắt buộc dữ liệu xả lũ hồ chứa 24/7 trên toàn bộ 6 quốc gia.',
    choices: [
      {
        id: 'data-opt-a',
        title: 'Thúc đẩy cơ chế hiệp định bắt buộc chia sẻ số liệu thời gian thực và bồi thường thiệt hại',
        description: 'Ký kết nghị định thư có tính ràng buộc pháp lý: mọi đập thủy điện phải báo trước lịch xả/tích nước tối thiểu 72 giờ và kết nối dữ liệu vệ tinh trực tiếp về MRC.',
        indicatorChanges: {
          water: +20,
          agriculture: +15,
          fisheries: +15,
          energy: +10,
          environment: +20,
          livelihood: +25
        },
        impactSummary: 'Quản trị nguồn nước đạt đỉnh cao minh bạch (+25), người dân hạ du chủ động né hạn mặn và lũ quét nhân tạo, hợp tác lưu vực bền vững.',
        causeExplanation: 'Khi biết trước lưu lượng dòng chảy sắp về, các trạm thủy nông có thể chủ động đóng/mở cống lấy nước ngọt, người dân chuẩn bị nông lịch, giảm thiểu 90% rủi ro bất ngờ.',
        tradeOffAnalysis: {
          gains: ['Chủ động phòng chống thiên tai và hạn mặn hiệu quả', 'Nâng cao sự tin cậy ngoại giao giữa 6 quốc gia ven sông', 'Tối ưu hóa sản lượng điện và sản xuất nông nghiệp toàn vùng'],
          sacrifices: ['Đòi hỏi sự nhượng bộ chủ quyền vận hành của các nhà đầu tư đập', 'Chi phí lắp đặt và duy trì mạng lưới trạm đo viễn thám cao', 'Quá trình phê chuẩn hiệp ước pháp lý quốc tế mất nhiều thời gian']
        },
        policyContext: 'Thủ tục PDIES (2001) và Sáng kiến Giám sát Đập Thủy điện Mê Kông (Mekong Dam Monitor).'
      },
      {
        id: 'data-opt-b',
        title: 'Chỉ chia sẻ dữ liệu tự nguyện trong các đợt thiên tai nghiêm trọng',
        description: 'Tôn trọng quyền bảo mật dữ liệu an ninh năng lượng riêng của từng quốc gia, chỉ yêu cầu cung cấp số liệu khi có hạn hán hoặc lũ lụt vượt ngưỡng khẩn cấp.',
        indicatorChanges: {
          water: -10,
          agriculture: -10,
          fisheries: -10,
          energy: +15,
          environment: -10,
          livelihood: -10
        },
        impactSummary: 'Dễ đạt được đồng thuận ngoại giao trước mắt nhưng hạ lưu vẫn luôn trong tình thế bị động trước những đợt cạn kiệt hoặc dâng nước bất thường (-10).',
        causeExplanation: 'Chia sẻ tự nguyện dẫn đến dữ liệu ngắt quãng, thiếu kịp thời, không thể xây dựng mô hình dự báo hạn mặn và xói lở chính xác cho người dân ĐBSCL.',
        tradeOffAnalysis: {
          gains: ['Tránh căng thẳng tranh chấp chủ quyền thông tin', 'Không tốn chi phí triển khai hệ thống quan trắc bắt buộc', 'Bảo toàn tối đa lợi nhuận kinh doanh của các nhà máy điện'],
          sacrifices: ['Hạ lưu tiếp tục chịu thiệt hại bất ngờ về mùa màng', 'Xói mòn lòng tin hợp tác giữa các quốc gia thành viên MRC', 'Tài nguyên nước lưu vực tiếp tục bị suy thoái']
        },
        policyContext: 'Hạn chế của cơ chế trao đổi số liệu không bắt buộc trước năm 2020 trên lưu vực Mê Kông.'
      }
    ]
  }
];

export interface ManagementReportResult {
  title: string;
  badge: string;
  leadershipStyle: string;
  summaryFeedback: string;
  strengths: string[];
  vulnerabilities: string[];
  recommendations: string[];
}

export function generateManagementReport(indicators: ManagerIndicators, choicesSelected: Record<string, string>): ManagementReportResult {
  const avg = (indicators.water + indicators.agriculture + indicators.fisheries + indicators.energy + indicators.environment + indicators.livelihood) / 6;

  if (indicators.environment >= 75 && indicators.water >= 75 && indicators.livelihood >= 75) {
    return {
      title: 'Nhà Quản Lý Sinh Thái Thuận Thiên & Bền Vững (Eco-Visionary Leader)',
      badge: '🌱 Người Bảo Vệ Dòng Sông Mẹ',
      leadershipStyle: 'Tư duy "Thuận thiên" xuất sắc theo tinh thần Nghị quyết 120/NQ-CP',
      summaryFeedback: 'Bạn đã xuất sắc cân bằng giữa việc bảo tồn dòng chảy tự nhiên của dòng sông Mê Kông và bảo vệ sinh kế trù phú của đồng bào hạ lưu. Các quyết định của bạn ưu tiên giải pháp thích ứng thông minh, bảo tồn phù sa và tôn trọng quy luật thiên nhiên.',
      strengths: [
        'Giữ gìn tối đa lượng phù sa và đa dạng sinh học thủy sản',
        'Nâng cao khả năng thích ứng lâu dài của Đồng bằng sông Cửu Long',
        'Thúc đẩy hợp tác minh bạch dữ liệu theo chuẩn mực MRC quốc tế'
      ],
      vulnerabilities: [
        'Tăng trưởng sản lượng điện và thâm canh nông nghiệp ngắn hạn có thể chậm hơn',
        'Cần nguồn vốn đầu tư ban đầu cho công nghệ chuyển đổi xanh'
      ],
      recommendations: [
        'Tiếp tục đẩy mạnh nhân rộng mô hình Lúa - Tôm sinh thái tại Hậu Giang và các tỉnh ven biển',
        'Khuyến khích hợp tác công tư (PPP) trong phát triển năng lượng tái tạo phân tán'
      ]
    };
  } else if (indicators.energy >= 75 && indicators.agriculture >= 70) {
    return {
      title: 'Nhà Quản Trị Tăng Tốc Kinh Tế & Công Nghiệp Hóa',
      badge: '⚡ Nhà Quản Trị Động Lực',
      leadershipStyle: 'Tập trung tối đa hóa sản lượng năng lượng và an ninh lương thực',
      summaryFeedback: 'Các quyết định của bạn đã tạo ra nguồn năng lượng dồi dào và sản lượng lúa gạo dồi dào cho khu vực. Tuy nhiên, cái giá phải trả là sự suy giảm nghiêm trọng của hệ sinh thái, lượng phù sa bồi đắp và nguy cơ sạt lở gia tăng.',
      strengths: [
        'Đáp ứng nhanh chóng nhu cầu điện năng cho đô thị và khu công nghiệp',
        'Tối ưu hóa sản lượng thóc gạo xuất khẩu phục vụ an ninh lương thực'
      ],
      vulnerabilities: [
        'Hệ sinh thái thủy sản suy thoái do thiếu phù sa và đập chắn đường cá',
        'Sạt lở bờ sông và xâm nhập mặn ngày càng phức tạp tại hạ du ĐBSCL'
      ],
      recommendations: [
        'Bổ sung ngay các bậc thang cá và hệ thống xả bùn đáy cho các công trình thủy điện',
        'Chuyển đổi dần diện tích đê bao khép kín sang trữ lũ sinh thái để giảm suy kiệt đất'
      ]
    };
  } else {
    return {
      title: 'Nhà Ngoại Giao Quản Trị Lưu Vực Cân Bằng (Balanced Diplomat)',
      badge: '🤝 Nhà Hợp Tác Mê Kông',
      leadershipStyle: 'Tìm kiếm sự dung hòa giữa phát triển kinh tế và bảo vệ nguồn nước',
      summaryFeedback: 'Bạn đã thể hiện sự khéo léo trong việc cân nhắc những đánh đổi phức tạp trên một dòng sông chảy qua 6 quốc gia. Bạn hiểu rõ rằng trong quản trị nguồn nước xuyên biên giới, không bao giờ có một đáp án duy nhất đúng tuyệt đối mà luôn cần sự thỏa hiệp và chia sẻ lợi ích.',
      strengths: [
        'Tránh được các cú sốc cực đoan đối với cả nền kinh tế lẫn môi trường',
        'Duy trì sự đồng thuận và hợp tác giữa các quốc gia lưu vực sông'
      ],
      vulnerabilities: [
        'Các giải pháp trung hòa đôi khi đòi hỏi thời gian thực thi dài và chi phí giám sát cao'
      ],
      recommendations: [
        'Tăng cường các cơ chế chia sẻ số liệu quan trắc thời gian thực qua MRC',
        'Đẩy mạnh các mô hình thích ứng tại chỗ cho vùng lõi hạn mặn như Hậu Giang'
      ]
    };
  }
}
