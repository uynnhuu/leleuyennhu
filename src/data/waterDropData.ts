export interface WaterDropStage {
  id: string;
  stageNumber: number;
  name: string;
  regionTitle: string;
  riverSection: string;
  spanDistance: string;
  altitude: string;
  dropletForm: string;
  avatarIcon: string;
  geographicInfo: string;
  waterRole: string;
  economicActivities: string;
  environmentalIssues: string;
  vietnamConnection: string;
  challenge: {
    question: string;
    scenario: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
    hint: string;
  };
  funFact: string;
}

export const WATER_DROP_STAGES: WaterDropStage[] = [
  {
    id: 'stage-1-upstream',
    stageNumber: 1,
    name: 'Thượng Nguồn Mê Kông',
    regionTitle: 'Cao Nguyên Thanh Tạng & Thung Lũng Lan Thương (Trung Quốc)',
    riverSection: 'Đoạn sông Lan Thương (Lancang Jiang)',
    spanDistance: '0 km → 2.161 km',
    altitude: '5.000 m → 1.000 m',
    dropletForm: '💧 Giọt nước băng tan tinh khiết, mát lạnh, dồi dào khoáng chất',
    avatarIcon: '🏔️',
    geographicInfo: 'Khởi nguồn từ các khối băng vĩnh cửu trên dãy núi Đường Cổ Lạp (Tanggula), cao hơn 5.000m trên cao nguyên Tây Tạng. Dòng sông chảy qua hẻm núi sâu thăm thẳm của tỉnh Vân Nam (Trung Quốc), lòng sông hẹp, dòng chảy xiết và độ dốc cực lớn.',
    waterRole: 'Cung cấp khoảng 16% tổng lượng nước cả năm cho toàn lưu vực Mê Kông (nhưng vào mùa khô có thể chiếm tới 40% dòng chảy tới đoạn hạ lưu do băng tuyết tan chảy liên tục). Mang theo động năng khổng lồ và nguồn nước mát đầu nguồn.',
    economicActivities: 'Xây dựng chuỗi đại thủy điện bậc thang quy mô hàng đầu thế giới (đập Tiểu Loan cao 292m, đập Nọa Trát Độ,...), khai khoáng, du lịch thám hiểm hẻm núi Tam Giang Song Hành (Di sản UNESCO).',
    environmentalIssues: 'Hệ thống đập thủy điện bậc thang giữ lại lượng bùn cát thô khổng lồ (>60-70% lượng phù sa thượng nguồn), làm thay đổi chu kỳ thủy văn tự nhiên, xói lở hạ du và gây biến động bất thường mực nước các nước phía dưới.',
    vietnamConnection: 'Dòng nước băng tan thượng nguồn này sẽ mất khoảng 2-3 tuần để di chuyển 4.763km về tới kênh rạch Hậu Giang và tưới mát cho ruộng lúa miền Tây.',
    challenge: {
      question: 'Tại sao vào mùa khô, lượng nước từ phần thượng nguồn Lan Thương lại đóng vai trò cực kỳ quan trọng đối với các nước hạ lưu?',
      scenario: 'Bạn là giọt nước băng vừa tan chảy từ đỉnh núi Tây Tạng giữa tiết trời nắng ấm mùa khô...',
      options: [
        'Vì mùa khô ở hạ lưu ít mưa, trong khi băng tuyết Tây Tạng tan liên tục bổ sung nguồn nước ngọt quý giá',
        'Vì sông Lan Thương nhận thêm nước từ đại dương chảy ngược lên',
        'Vì các đập thủy điện Trung Quốc hút sạch nước mùa mưa rồi mới xả vào mùa khô',
        'Vì vùng hạ lưu sông Mê Kông không hề có các nhánh sông phụ lưu'
      ],
      correctAnswer: 0,
      explanation: 'Chính xác! Vào mùa khô (tháng 12 đến tháng 5 năm sau), vùng hạ lưu ít mưa, nguồn nước băng tuyết tan từ cao nguyên Tây Tạng trở thành nguồn duy trì dòng chảy cơ bản vô cùng quan trọng (chiếm đến 40% lưu lượng tại Vientiane và Kratie).',
      hint: 'Hãy nhớ lại đặc điểm nguồn cấp nước của sông: có nguồn mưa và nguồn băng tuyết tan.'
    },
    funFact: 'Tại Trung Quốc, sông Mê Kông được gọi là Lan Thương Giang (澜沧江), có nghĩa là "Dòng sông cuộn sóng dữ dội".'
  },
  {
    id: 'stage-2-middle',
    stageNumber: 2,
    name: 'Trung Lưu Mê Kông',
    regionTitle: 'Tam Giác Vàng & Hẻm Núi Lào - Myanmar - Thái Lan',
    riverSection: 'Đoạn sông biên giới & dòng chính qua Lào',
    spanDistance: '2.161 km → 3.600 km',
    altitude: '1.000 m → 200 m',
    dropletForm: '🌊 Giọt nước phù sa đỏ quạch, cuốn theo vô số sinh vật phù du và bơi cùng đàn cá di cư',
    avatarIcon: '🏞️',
    geographicInfo: 'Sông rời Trung Quốc tạo thành biên giới tự nhiên giữa Myanmar - Lào, Lào - Thái Lan, sau đó chảy hoàn toàn qua đất Lào. Sông uốn lượn qua các dãy núi đá vôi, nhận thêm nước từ các phụ lưu lớn hùng vĩ như Nam Ou, Nam Ngum, sông Mun-Chi.',
    waterRole: 'Lào đóng góp lượng nước lớn nhất cho lưu vực Mê Kông (~35% tổng lưu lượng). Dòng nước nuôi dưỡng các cánh rừng nhiệt đới trù phú, tạo điều kiện phát triển mạng lưới thủy điện và tưới tiêu cho vùng cao nguyên Khorat (Thái Lan).',
    economicActivities: 'Phát triển thủy điện dòng chính (Sayaboury, Don Sahong) và dòng nhánh với mục tiêu trở thành "Bình ắc quy của Đông Nam Á"; nghề cá nước ngọt truyền thống; vận tải đường sông kết nối các nước ASEAN; du lịch Cố đô Luang Prabang.',
    environmentalIssues: 'Các con đập trên dòng chính ngăn chặn đường di cư sinh sản của các loài cá nước ngọt khổng lồ (như cá tra dầu Mê Kông); phá rừng đầu nguồn làm gia tăng xói mòn và sạt lở đất.',
    vietnamConnection: 'Lượng nước dồi dào từ các phụ lưu của Lào là nguồn cung chủ lực giúp duy trì dòng chảy đổ về sông Tiền và sông Hậu của Việt Nam.',
    challenge: {
      question: 'Quốc gia nào đóng góp tỷ lệ lưu lượng dòng chảy (lượng nước) lớn nhất cho toàn bộ sông Mê Kông?',
      scenario: 'Bạn trôi qua Luang Prabang và hòa vào dòng nước cuồn cuộn từ các nhánh sông Nam Ou đổ vào...',
      options: [
        'Lào (khoảng 35% tổng lưu lượng)',
        'Trung Quốc (khoảng 60% tổng lưu lượng)',
        'Việt Nam (khoảng 45% tổng lưu lượng)',
        'Thái Lan (khoảng 50% tổng lưu lượng)'
      ],
      correctAnswer: 0,
      explanation: 'Chính xác! Theo số liệu SGK Địa lí 11, Lào đóng góp khoảng 35% tổng lượng dòng chảy hàng năm của sông Mê Kông nhờ địa hình đồi núi đón gió mùa mưa dồi dào và hệ thống phụ lưu dày đặc.',
      hint: 'Quốc gia này có biệt danh là "Xứ sở Triệu Voi" và đặt mục tiêu trở thành "Bình ắc quy Đông Nam Á".'
    },
    funFact: 'Đoạn sông qua Lào và Campuchia là nơi sinh sống của cá tra dầu Mê Kông - loài cá nước ngọt có thể nặng tới 300kg và dài hơn 3 mét!'
  },
  {
    id: 'stage-3-cambodia',
    stageNumber: 3,
    name: 'Campuchia & Trái Tim Biển Hồ',
    regionTitle: 'Hạ Lưu Campuchia, Biển Hồ Tôn-lê Sáp & Ngã Tư Chaktomuk',
    riverSection: 'Đoạn Kratie, Kampong Cham, Tonle Sap, Phnom Penh',
    spanDistance: '3.600 km → 4.540 km',
    altitude: '200 m → 10 m',
    dropletForm: '🌀 Giọt nước trải qua hiện tượng "đảo dòng" kỳ vĩ, tưới mát vựa cá nước ngọt lớn nhất Đông Nam Á',
    avatarIcon: '🐟',
    geographicInfo: 'Sông chảy vào vùng đồng bằng Campuchia rộng lớn phẳng lặng. Tại thủ đô Phnôm Pênh, sông Mê Kông gặp sông Tonle Sap tại ngã tư sông Chaktomuk (Bốn Mặt). Mùa lũ (tháng 6-10), nước dâng cao chảy ngược vào Biển Hồ (Tonle Sap); mùa khô, nước từ hồ chảy xuôi trở lại.',
    waterRole: 'Biển Hồ như một chiếc "van giảm xóc thủy văn" khổng lồ tự nhiên: chứa nước lũ mùa mưa giúp hạ lưu Việt Nam bớt ngập lụt thảm khốc; xả nước trữ vào mùa khô giúp Đồng bằng sông Cửu Long duy trì dòng chảy đẩy mặn.',
    economicActivities: 'Nghề đánh bắt cá nước ngọt quy mô khổng lồ (cung cấp hơn 70% đạm động vật cho người dân Campuchia); trồng lúa nước dựa vào phù sa ngập lũ; làng bè nổi và du lịch sinh thái Biển Hồ.',
    environmentalIssues: 'Mực nước lũ sụt giảm khiến lượng nước đảo ngược vào Biển Hồ giảm kỷ lục; suy giảm nghiêm trọng sản lượng cá giống và lượng phù sa lắng đọng; nguy cơ hồ bị cạn kiệt đáy bùn.',
    vietnamConnection: 'Sức khỏe thủy văn của Biển Hồ quyết định trực tiếp đến mùa nước nổi và mức độ hạn mặn ở An Giang, Đồng Tháp và Hậu Giang!',
    challenge: {
      question: 'Hiện tượng "nước chảy ngược dòng" vào Biển Hồ (Tonle Sap) diễn ra vào khoảng thời gian nào và có tác dụng gì?',
      scenario: 'Đến ngã tư Chaktomuk, bạn cảm nhận lực đẩy cực mạnh đưa bạn rẽ nhánh vào hồ...',
      options: [
        'Vào mùa lũ (tháng 6-10), giúp hồ tích nước giảm ngập lụt cho hạ lưu ĐBSCL',
        'Vào mùa khô (tháng 1-4), giúp hồ lấy nước biển đẩy mặn',
        'Xảy ra hàng ngày theo chu kỳ thủy triều sáng tối',
        'Chỉ xảy ra khi có bão lớn đổ bộ từ vịnh Thái Lan'
      ],
      correctAnswer: 0,
      explanation: 'Xuất sắc! Vào mùa lũ (tháng 6-10), lưu lượng sông Mê Kông quá lớn làm mực nước dâng cao hơn hồ, ép nước chảy ngược từ sông Mê Kông vào Biển Hồ. Hồ tích trữ hàng chục tỷ m³ nước, làm giảm đỉnh lũ ngập lụt cho ĐBSCL của Việt Nam.',
      hint: 'Hãy chú ý đến cơ chế tích lũy nước mùa mưa lũ.'
    },
    funFact: 'Diện tích Biển Hồ có thể co giãn kỳ diệu từ 2.500 km² vào mùa khô lên tới hơn 16.000 km² vào mùa lũ!'
  },
  {
    id: 'stage-4-vietnam',
    stageNumber: 4,
    name: 'Đồng Bằng Sông Cửu Long',
    regionTitle: 'Việt Nam: Sông Tiền, Sông Hậu & Mạng Lưới Kênh Xáng Hậu Giang',
    riverSection: 'Cửa ngõ Tân Châu, Châu Đốc, Cần Thơ, Hậu Giang, Bến Tre',
    spanDistance: '4.540 km → 4.740 km',
    altitude: '10 m → 1 m',
    dropletForm: '🌾 Giọt nước ngọt ngào hòa cùng bùn son phù sa, len lỏi qua kênh rạch bồi đắp mùa vàng',
    avatarIcon: '🇻🇳',
    geographicInfo: 'Sông Mê Kông chảy vào Việt Nam tại An Giang và Đồng Tháp, lập tức chia tách thành hai nhánh lớn: Sông Tiền và Sông Hậu. Đồng bằng châu thổ rộng khoảng 40.000 km² với địa hình trũng thấp bằng phẳng và mạng lưới kênh rạch nhân tạo dài hàng chục nghìn cây số.',
    waterRole: 'Nuôi sống hơn 20 triệu người dân; bồi đắp hàng triệu tấn phù sa màu mỡ; rửa chua, rửa phèn cho đất; tạo vựa lúa chiếm hơn 50% sản lượng lúa và 95% gạo xuất khẩu, 65% thủy sản và 70% trái cây cả nước.',
    economicActivities: 'Trồng lúa chất lượng cao (đặc sản ST25), cây ăn trái nhiệt đới (sầu riêng, xoài cát, bưởi da xanh), nuôi cá tra, tôm xuất khẩu; giao thương chợ nổi Cái Răng; chế biến nông sản tại Hậu Giang.',
    environmentalIssues: 'Hạn hán và xâm nhập mặn khốc liệt mùa khô (ranh mặn 4g/l lấn sâu 70-90km); sạt lở bờ sông nghiêm trọng do thiếu phù sa cát; sụt lún nền đất do khai thác nước ngầm quá mức.',
    vietnamConnection: 'Dòng nước chảy qua kênh xáng Xà No và vùng đất Vị Thủy (Hậu Giang) - nơi Trường TH, THCS, THPT FPT Hậu Giang tọa lạc, gắn liền với mô hình nông nghiệp "Thuận thiên" theo Nghị quyết 120/NQ-CP.',
    challenge: {
      question: 'Nghị quyết 120/NQ-CP năm 2017 của Chính phủ Việt Nam đã mở ra định hướng phát triển bền vững ĐBSCL với quan điểm cốt lõi nào?',
      scenario: 'Bạn len lỏi vào các kênh mương tưới tiêu ở Hậu Giang giữa mùa khô...',
      options: [
        '"Thuận thiên" - tôn trọng quy luật tự nhiên, coi nước mặn và lợ cũng là tài nguyên để chuyển đổi kinh tế',
        'Xây đê bê tông cao 10m ngăn toàn bộ nước sông đổ ra biển',
        'Bỏ hoang toàn bộ đất đai và chuyển dân cư lên vùng Tây Nguyên',
        'Bơm cạn nước ngầm để thay thế hoàn toàn nước mặt sông Cửu Long'
      ],
      correctAnswer: 0,
      explanation: 'Hoàn toàn chính xác! Nghị quyết 120/NQ-CP mang tính bước ngoặt lịch sử: chuyển từ tư duy "chống chọi, can thiệp thô bạo" sang "Thuận thiên" (sống hài hòa với tự nhiên), xem nước ngọt, lợ, mặn đều là tài nguyên quý giá để tổ chức mô hình kinh tế phù hợp (như mô hình Lúa - Tôm thông minh).',
      hint: 'Hãy nhớ lại phương châm nổi tiếng "sống chung với lũ, sống chung với hạn mặn".'
    },
    funFact: 'Kênh xáng Xà No chảy qua Hậu Giang được đào từ năm 1901-1903, từng được người Pháp mệnh danh là "con đường lúa gạo miền Tây" lớn nhất Đông Dương!'
  },
  {
    id: 'stage-5-ocean',
    stageNumber: 5,
    name: 'Biển Đông & Cửu Long Khơi Xa',
    regionTitle: '9 Cửa Sông Cửu Long & Dải Rừng Ngập Mặn Ven Biển Đông',
    riverSection: 'Các cửa sông: Tiểu, Đại, Ba Lai, Hàm Luông, Cổ Chiên, Cung Hầu, Định An, Bát Xắc, Trần Đề',
    spanDistance: '4.740 km → 4.763 km',
    altitude: '1 m → 0 m (Mực nước biển)',
    dropletForm: '✨ Giọt nước đại dương lấp lánh sóng biếc, hoàn thành sứ mệnh 4.763km vẻ vang từ đỉnh tuyết',
    avatarIcon: '🌊',
    geographicInfo: 'Điểm kết thúc hành trình 4.763km hùng tráng của dòng sông Mẹ. Sông Tiền tỏa ra 6 cửa, sông Hậu tỏa ra 3 cửa (tổng cộng 9 nhánh rồng bay "Cửu Long") đổ ra Biển Đông qua dải bờ biển dài hàng trăm cây số.',
    waterRole: 'Cung cấp nguồn dinh dưỡng sinh học dồi dào tạo thành ngư trường biển trù phú bậc nhất vịnh Thái Lan và Biển Đông; bồi đắp bãi triều mở rộng lãnh thổ đất liền hàng chục mét mỗi năm tại Mũi Cà Mau.',
    economicActivities: 'Khai thác và nuôi trồng hải sản biển; phát triển kinh tế biển, cảng biển nước sâu (Trần Đề); điện gió ngoài khơi Bến Tre, Bạc Liêu, Sóc Trăng; bảo tồn rừng ngập mặn Ramsar Mũi Cà Mau.',
    environmentalIssues: 'Cửa sông Ba Lai đã bị ngăn ngọt bằng cống đập, cửa Bát Xắc bị bồi lấp; xói lở bờ biển nghiêm trọng do sóng biển đánh trực diện khi thiếu hụt phù sa bùn cát bổ sung; nước biển dâng.',
    vietnamConnection: 'Tại đây, bạn đã hoàn thành trọn vẹn hành trình của một giọt nước Mê Kông xuyên qua 6 quốc gia và hội tụ tại biển trời thiêng liêng của Tổ quốc Việt Nam!',
    challenge: {
      question: 'Sông Mê Kông khi đổ ra Biển Đông qua lãnh thổ Việt Nam trên thực tế hiện nay có bao nhiêu cửa sông đang thông dòng tự nhiên?',
      scenario: 'Bạn chuẩn bị hòa mình vào làn sóng xanh của Biển Đông tại cửa Định An và Trần Đề...',
      options: [
        '7 cửa (cửa Ba Lai đã bị chặn bởi cống đập, cửa Bát Xắc bị bồi lấp tự nhiên)',
        'Vẫn đủ nguyên vẹn 9 cửa như truyền thuyết xưa',
        'Chỉ còn đúng 1 cửa duy nhất',
        'Không còn cửa nào vì bị đập thủy điện chặn hết'
      ],
      correctAnswer: 0,
      explanation: 'Chính xác! Tên gọi "Cửu Long" tượng trưng cho 9 rồng (9 cửa sông). Tuy nhiên ngày nay trên thực tế chỉ còn 7 cửa thông dòng tự nhiên ra biển, do cửa Ba Lai đã được xây cống đập ngăn mặn trữ ngọt (năm 2002) và cửa Bát Xắc (Bassac) đã bị bồi lắng tự nhiên theo thời gian.',
      hint: '9 trừ đi 2 cửa đã bị biến đổi hình thái sẽ bằng bao nhiêu?'
    },
    funFact: 'Dù chỉ còn 7 cửa thông dòng tự nhiên, hình tượng "Chín Rồng" vẫn mãi là biểu tượng văn hóa thiêng liêng, kiêu hãnh của đồng bào Tây Nam Bộ!'
  }
];
