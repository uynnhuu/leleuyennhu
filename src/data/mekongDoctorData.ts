export interface EcoDoctorDisease {
  id: string;
  name: string;
  ecoCode: string;
  icon: string;
  severityLevel: 'Khẩn Cấp' | 'Rất Nghiêm Trọng' | 'Mãn Tính Nguy Hiểm';
  patientOrgan: string; // Vị trí tổn thương chính trên dòng sông
  shortSummary: string;
  
  // Structured Medical-Eco Diagnosis
  definition: string; // Vấn đề là gì?
  causes: {
    natural: string[];      // Yếu tố tự nhiên
    humanActivity: string[]; // Hoạt động của con người
    climateChange: string[]; // Biến đổi khí hậu
  };
  symptoms: string[]; // Biểu hiện lâm sàng
  naturalImpact: string; // Tác động đến tự nhiên
  socioEconomicImpact: string; // Tác động đến kinh tế - xã hội
  deltaImpact: string; // Ảnh hưởng đến Đồng bằng sông Cửu Long
  hauGiangConnection: string; // Liên hệ cụ thể Hậu Giang
  treatmentPrescription: {
    structural: string[];    // Giải pháp công trình
    nonStructural: string[]; // Giải pháp phi công trình & chính sách
    thuanThienModel: string; // Mô hình "Thuận thiên" thích ứng cụ thể
  };
}

export const MEKONG_DOCTOR_DISEASES: EcoDoctorDisease[] = [
  {
    id: 'salinity',
    name: 'Xâm Nhập Mặn Vùng Châu Thổ',
    ecoCode: 'MED-SAL-01',
    icon: '🧂',
    severityLevel: 'Rất Nghiêm Trọng',
    patientOrgan: 'Các cửa sông Cửu Long và hệ thống kênh rạch nội đồng duyên hải',
    shortSummary: 'Nước biển mặn thọc sâu vào nội đồng tới 70-90km trong mùa khô do thiếu nước ngọt thượng nguồn đẩy mặn.',
    definition: 'Hiện tượng nước biển mặn (với độ mặn đo bằng g/l hoặc phần nghìn ‰) theo các cửa sông và kênh rạch thâm nhập sâu vào các vùng ngọt hóa nội địa trong mùa khô, vượt quá ngưỡng chịu mặn của cây trồng và nguồn nước sinh hoạt (ngưỡng 1-4 g/l).',
    causes: {
      natural: [
        'Đặc điểm mùa khô kéo dài (tháng 12 đến tháng 5) với lượng mưa cực thấp',
        'Địa hình châu thổ bằng phẳng và trũng thấp (độ cao trung bình < 1-2m)',
        'Chế độ bán nhật triều không đều của Biển Đông và nhật triều Biển Tây đẩy nước mặn sâu vào nội địa'
      ],
      humanActivity: [
        'Hệ thống đập thủy điện thượng nguồn tích nước làm giảm lưu lượng xả về hạ du mùa kiệt',
        'Gia tăng nhu cầu bơm hút nước tưới cho nông nghiệp thâm canh dọc lưu vực',
        'Khai thác cát làm lòng sông sâu thêm 1.5 - 3m, hạ thấp đáy sông khiến thủy triều đưa nước mặn vào xa hơn'
      ],
      climateChange: [
        'Nước biển dâng làm tăng áp lực thủy tĩnh đẩy mặn từ đại dương',
        'Hiện tượng El Niño làm nền nhiệt độ tăng cao, bốc hơi nước mạnh và nắng nóng kéo dài kỷ lục'
      ]
    },
    symptoms: [
      'Ranh mặn 4 g/l lấn sâu cách cửa sông 70-90km trên sông Tiền, sông Hậu, sông Cổ Chiên, Hàm Luông',
      'Nước sông rạch đổi màu trong xanh ngắt bất thường, lá cây ăn trái bị cháy vàng và rụng hàng loạt',
      'Độ mặn nước mặt vượt ngưỡng cho phép của các nhà máy cấp nước sinh hoạt'
    ],
    naturalImpact: 'Làm biến đổi đột ngột tính chất lý hóa của nước ngọt, làm suy thoái thảm thực vật nước ngọt ven sông, triệt tiêu vi sinh vật có ích và làm thoái hóa đất phèn, đất phù sa.',
    socioEconomicImpact: 'Gây thiệt hại hàng ngàn tỷ đồng cho các vùng chuyên canh cây ăn trái đặc sản (sầu riêng, chôm chôm, xoài cát); hàng trăm nghìn hộ dân thiếu nước sinh hoạt; tê liệt sản xuất công nghiệp và chế biến.',
    deltaImpact: 'Khoảng 10/13 tỉnh thành ĐBSCL bị ảnh hưởng trực tiếp (nặng nề nhất tại Bến Tre, Tiền Giang, Sóc Trăng, Trà Vinh, Kiên Giang, Bạc Liêu, Cà Mau, Hậu Giang).',
    hauGiangConnection: 'Tại Hậu Giang, xâm nhập mặn xảy ra theo 2 hướng bất lợi: từ Biển Đông qua sông Hậu và từ Biển Tây qua sông Cái Lớn (huyện Long Mỹ, TX Long Mỹ, Vị Thủy). Mặn xuất hiện sớm vào tháng 2-4, đe dọa các vùng lúa đông xuân và vùng trồng khóm Cầu Đúc.',
    treatmentPrescription: {
      structural: [
        'Vận hành hiệu quả hệ thống thủy lợi Cái Lớn - Cái Bé và đập cống Vũng Liêm, Ba Lai',
        'Đắp các đập tạm bằng cừ tràm dã chiến tại các đầu kênh dẫn ngọt ở Hậu Giang',
        'Xây dựng các hồ trữ nước ngọt phân tán trong vườn nhà và nạo vét kênh mương'
      ],
      nonStructural: [
        'Chuyển đổi thời vụ gieo sạ lúa sớm (né mặn trước Tết Nguyên đán)',
        'Quan trắc tự động và cảnh báo độ mặn 24/7 qua ứng dụng di động cho nông dân',
        'Ngoại giao nước với MRC yêu cầu các hồ thượng nguồn xả nước đẩy mặn vào cao điểm'
      ],
      thuanThienModel: 'Thực hiện mô hình "Thuận thiên" theo Nghị quyết 120: phát triển vùng chuyên canh lúa chất lượng cao ở thượng lưu ngọt, mô hình Lúa - Tôm thông minh và cây trồng chịu mặn (khóm, mãng cầu xiêm) ở vùng mặn lợ.'
    }
  },
  {
    id: 'drought',
    name: 'Hạn Hán & Thiếu Nước Ngọt Thủy Văn',
    ecoCode: 'MED-DRO-02',
    icon: '☀️',
    severityLevel: 'Rất Nghiêm Trọng',
    patientOrgan: 'Mạng lưới sông rạch nhánh và ao hồ nội đồng toàn lưu vực',
    shortSummary: 'Dòng chảy kiệt quệ, mưa ít và nắng nóng kéo dài làm cạn kiệt tầng nước mặt và nguồn nước ngầm.',
    definition: 'Tình trạng thiếu hụt nghiêm trọng nguồn nước mặt trên sông Mê Kông so với giá trị trung bình nhiều năm kéo dài nhiều tháng liên tiếp, dẫn đến cạn kiệt nguồn cung cấp cho tưới tiêu, sinh hoạt và duy trì sinh thái.',
    causes: {
      natural: [
        'Mùa khô ở Đông Nam Á không có mưa kéo dài 5-6 tháng',
        'Sự bất thường của hoàn lưu khí quyển khu vực nhiệt đới gió mùa'
      ],
      humanActivity: [
        'Hệ thống đập thủy điện tích trữ hàng chục tỷ mét khối nước vào đầu mùa khô để chạy máy phát điện',
        'Chuyển hướng nguồn nước ở một số phụ lưu phục vụ tưới tiêu quy mô lớn ở thượng du',
        'Phá rừng đầu nguồn làm suy giảm khả năng giữ nước tự nhiên của lưu vực'
      ],
      climateChange: [
        'Tần suất và cường độ các đợt El Niño ngày càng gia tăng và kéo dài bất thường',
        'Nhiệt độ trung bình tăng khiến lượng bốc thoát hơi nước tăng từ 10-15%'
      ]
    },
    symptoms: [
      'Mực nước tại các trạm đầu nguồn Tân Châu và Châu Đốc tụt xuống dưới 1 mét',
      'Hàng trăm tuyến kênh rạch nội đồng trơ đáy, bùn nứt nẻ chân chim',
      'Giao thông đường thủy bị tê liệt, ghe xuồng mắc cạn đáy kênh'
    ],
    naturalImpact: 'Hệ thống đất ngập nước bị khô kiệt, nguy cơ cháy rừng tràm Tràm Chim, U Minh Thượng và U Minh Hạ ở mức cực kỳ nguy hiểm; các loài thủy sản không còn nơi trú ngụ.',
    socioEconomicImpact: 'Chi phí bơm chuyền nước cứu lúa tăng vọt; giá nước sinh hoạt sạch tăng gấp 5-10 lần bình thường; nguy cơ bùng phát dịch bệnh do nguồn nước tù đọng ô nhiễm.',
    deltaImpact: 'Ảnh hưởng trực tiếp đến toàn bộ 40.000 km² diện tích đồng bằng, đe dọa an ninh lương thực quốc gia và vị thế xuất khẩu gạo của Việt Nam.',
    hauGiangConnection: 'Huyện Long Mỹ, Phụng Hiệp và Vị Thủy (Hậu Giang) nằm sâu trong nội đồng, xa dòng chính sông Hậu nên chịu khô hạn gay gắt khi kênh rạch kiệt nước; nguy cơ cháy rừng tràm sinh thái và khô cạn kênh xáng Xà No.',
    treatmentPrescription: {
      structural: [
        'Nạo vét khơi thông hệ thống kênh trục và kênh sườn để đón nước',
        'Xây dựng các bể, bồn trữ nước mưa hợp vệ sinh cho từng hộ gia đình',
        'Đầu tư mạng lưới nhà máy cấp nước liên xã bằng nguồn nước thô mặt sông lớn'
      ],
      nonStructural: [
        'Áp dụng quy trình tưới lúa "Nông - Lộ - Phơi" (tiết kiệm nước ướt - khô xen kẽ AWD)',
        'Cắt giảm diện tích lúa vụ xuân hè ở những vùng có nguy cơ hạn cao',
        'Hợp tác ngoại giao lưu vực MRC điều tiết các hồ chứa xả nước khẩn cấp'
      ],
      thuanThienModel: 'Mô hình chuyển đổi đất trồng lúa kém hiệu quả sang trồng cây ăn trái có múi, mít, mãng cầu và nuôi thủy sản bán thâm canh ít tiêu hao nước mặt.'
    }
  },
  {
    id: 'erosion',
    name: 'Sạt Lở Bờ Sông & Xói Mòn Bờ Biển',
    ecoCode: 'MED-ERO-03',
    icon: '🌊',
    severityLevel: 'Khẩn Cấp',
    patientOrgan: 'Hai bên bờ sông Tiền, sông Hậu và dải rừng phòng hộ ven biển',
    shortSummary: 'Lòng sông bị khoét sâu vì thiếu cát phù sa, dòng nước xoáy hàm ếch kéo đổ nhà cửa và đê bao.',
    definition: 'Hiện tượng dòng nước sông và sóng biển phá hủy, cuốn trôi bờ đất, đê kè và công trình ven sông ven biển do mất cân bằng bùn cát và động lực dòng chảy.',
    causes: {
      natural: [
        'Địa chất nền đất đồng bằng trẻ, cấu tạo chủ yếu từ sét, bùn phù sa mềm yếu dễ tan rã',
        'Dòng chảy uốn lượn tự nhiên tạo bờ lõm bị xói lở và bờ lồi được bồi tụ',
        'Thủy triều lên xuống với biên độ lớn (2.5 - 3.5m) gây chênh lệch áp lực nước tác động vào bờ'
      ],
      humanActivity: [
        'Khai thác cát lòng sông quá mức làm hạ thấp cao trình đáy sông, tạo các hố sâu hút xoáy',
        'Xây dựng nhà cửa, nhà kho nặng tải trọng đè trực tiếp lên mép bờ sông yếu',
        'Giao thông tàu thuyền công suất lớn tạo sóng lớn đánh trực diện vào bờ kênh'
      ],
      climateChange: [
        'Biến đổi khí hậu làm gia tăng cường độ các đợt bão, áp thấp nhiệt đới và gió chướng mạnh',
        'Nước biển dâng làm xói lở chân đê biển và rừng ngập mặn phòng hộ'
      ]
    },
    symptoms: [
      'Xuất hiện các vết nứt dọc bờ sông, sụt lún taluy đê kè',
      'Đất bờ sông đổ ụp xuống nước chỉ trong vài chục giây kéo theo nhà cửa, đường giao thông',
      'Dải rừng đước phòng hộ ven biển Cà Mau, Bạc Liêu bị sóng bứng gốc trơ trọi'
    ],
    naturalImpact: 'Làm mất đi hàng trăm héc-ta diện tích đất ngập nước tự nhiên mỗi năm; phá vỡ dải hành lang sinh thái ven bờ sông và bờ biển.',
    socioEconomicImpact: 'Gây thiệt hại sinh mạng và hàng trăm tỷ đồng tài sản mỗi năm; hàng chục nghìn hộ dân phải di dời khẩn cấp; đứt gãy các tuyến giao thông huyết mạch nông thôn.',
    deltaImpact: 'Toàn ĐBSCL có hơn 500 điểm sạt lở nguy hiểm với tổng chiều dài hàng trăm kilômét dọc sông Tiền, sông Hậu, sông Cổ Chiên, sông Vàm Nao.',
    hauGiangConnection: 'Hậu Giang có hàng trăm điểm sạt lở mỗi mùa mưa dọc theo sông Cái Lớn, kênh xáng Xà No, kênh Quản Lộ - Phụng Hiệp và sông Mái Dầm (Châu Thành), đe dọa các tuyến đường liên ấp liên xã.',
    treatmentPrescription: {
      structural: [
        'Xây dựng kè mềm sinh thái (trồng dừa nước, lục bình, cừ tràm kết hợp lưới địa kỹ thuật)',
        'Kè kiên cố bê tông tự chèn bảo vệ các khu đô thị và chợ đông dân cư',
        'Nạo vét chỉnh trị dòng chảy nắn dòng tách xa bờ bị xói mòn'
      ],
      nonStructural: [
        'Cấm triệt để việc khai thác cát lậu và cấp phép khai thác cát tại các khúc sông xung yếu',
        'Quy hoạch cắm mốc hành lang an toàn bảo vệ bờ sông, không cho xây nhà sát mép nước',
        'Quy hoạch cụm tuyến dân cư an toàn để di dời người dân khỏi vùng sạt lở'
      ],
      thuanThienModel: 'Mô hình "Kè sinh học Thuận thiên": tạo bãi bồi tự nhiên bằng cọc tre, hàng rào giảm sóng và phục hồi dải cây bần, dừa nước bản địa giữ đất vững chắc.'
    }
  },
  {
    id: 'sediment',
    name: 'Suy Giảm Bùn Cát & Phù Sa (Bệnh Đói Phù Sa)',
    ecoCode: 'MED-SED-04',
    icon: '🪨',
    severityLevel: 'Mãn Tính Nguy Hiểm',
    patientOrgan: 'Toàn bộ lòng dẫn và bề mặt bồi tụ của châu thổ sông Mê Kông',
    shortSummary: 'Hơn 70% bùn cát bị chặn lại sau các đập thủy điện, khiến dòng nước trở nên "đói", gây xói lở và mất dinh dưỡng đất.',
    definition: 'Sự sụt giảm nghiêm trọng tổng lượng phù sa lơ lửng và bùn cát đáy di chuyển từ thượng nguồn sông Mê Kông về hạ lưu châu thổ, từ khoảng 160 triệu tấn/năm trước đây giảm xuống còn dưới 45-47 triệu tấn/năm hiện nay.',
    causes: {
      natural: [
        'Sự biến thiên theo chu kỳ năm khô hạn và năm lũ thấp của dòng chảy'
      ],
      humanActivity: [
        'Hệ thống đập thủy điện bậc thang ở Trung Quốc và Lào giữ lại phần lớn bùn cát thô và cát đáy',
        'Khai thác cát ồ ạt với khối lượng hàng chục triệu m³/năm dọc suốt 6 quốc gia',
        'Đắp đê bao khép kín ở vùng lũ ĐBSCL ngăn không cho phù sa tràn vào đồng ruộng'
      ],
      climateChange: [
        'Biến đổi lượng mưa và cường độ xói mòn trên các lưu vực nhánh'
      ]
    },
    symptoms: [
      'Nước sông Mê Kông mùa lũ không còn màu đỏ quạch phù sa đậm đặc như xưa',
      'Hiện tượng "nước đói phù sa" (Hungry Water) mang năng lượng dư thừa cắn phá lòng sông',
      'Đất đai đồng ruộng bạc màu, suy kiệt hàm lượng mùn hữu cơ tự nhiên'
    ],
    naturalImpact: 'Làm mất đi nguồn dinh dưỡng nuôi dưỡng vi sinh vật và chuỗi thức ăn thủy sản; chấm dứt quá trình bồi tụ mở rộng tự nhiên của Mũi Cà Mau.',
    socioEconomicImpact: 'Nông dân phải tăng gấp đôi lượng phân bón hóa học (NPK) để bù đắp dinh dưỡng cho lúa, làm tăng chi phí sản xuất và ô nhiễm đất; sạt lở bờ sông gia tăng gấp nhiều lần.',
    deltaImpact: 'ĐBSCL đối mặt với nguy cơ bị chìm dần và "teo tóp" do tốc độ sụt lún đất và xói lở nhanh hơn nhiều so với tốc độ bồi đắp phù sa.',
    hauGiangConnection: 'Hậu Giang có vùng đất trũng ngập phèn ở Vị Thủy và Phụng Hiệp vốn phụ thuộc lớn vào lớp phù sa sông Hậu đưa vào bồi đắp cải tạo phèn hàng năm. Thiếu phù sa khiến đất chua hơn và tốn nhiều chi phí vôi khử phèn.',
    treatmentPrescription: {
      structural: [
        'Yêu cầu các đập thủy điện thiết kế và vận hành cửa xả đáy bùn cát định kỳ',
        'Xây dựng các công trình chỉnh trị giảm bẫy cát cục bộ'
      ],
      nonStructural: [
        'Xây dựng Ngân hàng dữ liệu bùn cát lưu vực Mê Kông (Sediment Budget) qua MRC',
        'Quy hoạch cấm khai thác cát lòng sông và tìm kiếm vật liệu thay thế (cát biển, tro xỉ)',
        'Mở đê bao đón lũ định kỳ để lấy phù sa theo chu kỳ 3 năm 1 lần'
      ],
      thuanThienModel: 'Mô hình "Nông nghiệp tái sinh": sử dụng phân bón hữu cơ vi sinh, rơm rạ ủ mục trả lại cho đất thay cho phân hóa học, chủ động mở đồng đón lũ sinh thái.'
    }
  },
  {
    id: 'depletion',
    name: 'Suy Thoái An Ninh Nguồn Nước Ngọt',
    ecoCode: 'MED-WAT-05',
    icon: '💧',
    severityLevel: 'Rất Nghiêm Trọng',
    patientOrgan: 'Hệ thống thủy nông, hồ chứa và tầng nước ngầm ĐBSCL',
    shortSummary: 'Mất cân đối nghiêm trọng giữa nguồn cung cấp nước sông suy giảm và nhu cầu sử dụng nước ngọt gia tăng.',
    definition: 'Tình trạng thiếu hụt nguồn nước ngọt bảo đảm chất lượng để đáp ứng các nhu cầu thiết yếu: sinh hoạt, trồng trọt, chăn nuôi, nuôi trồng thủy sản và duy trì dòng chảy môi trường.',
    causes: {
      natural: [
        'Mùa khô kéo dài với vũ lượng chỉ chiếm dưới 10% tổng lượng mưa cả năm'
      ],
      humanActivity: [
        'Tăng diện tích lúa vụ 3 và diện tích cây ăn trái thâm canh đòi hỏi nước liên tục',
        'Khai thác quá mức nước ngầm cho nuôi tôm và cấp nước đô thị',
        'Tổ chức quy hoạch thủy lợi chưa đồng bộ, thất thoát nước trên đường ống dẫn'
      ],
      climateChange: [
        'Nhiệt độ ấm lên làm tăng lượng bốc hơi bề mặt; mùa mưa đến muộn và kết thúc sớm hơn'
      ]
    },
    symptoms: [
      'Các hồ chứa nước ngọt nội địa cạn kiệt đến mực nước chết',
      'Hàng chục ngàn hộ dân phải dùng xe bồn, ghe chở nước ngọt với chi phí đắt đỏ',
      'Tranh chấp nguồn nước giữa người trồng trọt phía trên và người nuôi thủy sản phía dưới'
    ],
    naturalImpact: 'Hạ thấp mực nước ngầm tự nhiên, gây ra các hang rỗng địa chất làm sụt lún mặt đất châu thổ với tốc độ 1-3 cm/năm.',
    socioEconomicImpact: 'Tăng chi phí sản xuất, suy giảm chất lượng cuộc sống người dân nghèo nông thôn, đe dọa sự phát triển công nghiệp và du lịch.',
    deltaImpact: 'Bán đảo Cà Mau và vùng ven biển (Bến Tre, Sóc Trăng, Bạc Liêu, Hậu Giang) là những khu vực chịu tổn thương nặng nề nhất vì nằm xa hai trục sông chính.',
    hauGiangConnection: 'Hậu Giang có nhiều xã vùng sâu của huyện Vị Thủy, Long Mỹ cách xa nguồn sông Hậu, nguồn nước mặt kênh rạch bị ô nhiễm và nhiễm mặn cục bộ khiến nước sinh hoạt trở thành bài toán cấp thiết mùa khô.',
    treatmentPrescription: {
      structural: [
        'Xây dựng các cụm hồ trữ nước ngọt nhân tạo quy mô lớn tại các vùng đất trũng ngập',
        'Mở rộng mạng lưới cấp nước sạch tập trung từ các nhà máy nước mặt sông Hậu',
        'Lắp đặt hệ thống lọc nước RO năng lượng mặt trời tại các trường học và trạm y tế'
      ],
      nonStructural: [
        'Áp dụng biểu giá nước sạch lũy tiến để khuyến khích sử dụng tiết kiệm',
        'Ban hành quy chế hạn chế tối đa việc khoan giếng khai thác nước ngầm tầng sâu',
        'Tuyên truyền nâng cao nhận thức cộng đồng về bảo vệ nguồn nước ngọt'
      ],
      thuanThienModel: 'Mô hình "Vườn cây - ao trữ nước sinh thái": mỗi trang trại gia đình dành 10-15% diện tích đào ao sâu trữ nước mưa mùa lũ để dùng cho mùa khô.'
    }
  },
  {
    id: 'fisheries',
    name: 'Suy Giảm Nguồn Lợi Thủy Sản & Cá Di Cư',
    ecoCode: 'MED-FIS-06',
    icon: '🐟',
    severityLevel: 'Khẩn Cấp',
    patientOrgan: 'Các bãi đẻ ngập lũ, hành lang di cư và ngư trường Biển Hồ - ĐBSCL',
    shortSummary: 'Các đập thủy điện chặn đứng đường di cư sinh sản của loài cá, kết hợp đánh bắt quá mức làm cạn kiệt vựa đạm tự nhiên.',
    definition: 'Sự suy sụp nhanh chóng về số lượng cá thể, sinh khối và số loài cá nước ngọt bản địa, đặc biệt là nhóm cá trắng (cá di cư đường dài như cá tra dầu, cá hô, cá bông lau) trên toàn lưu vực.',
    causes: {
      natural: [
        'Chu kỳ lũ thấp khiến diện tích ngập lũ tự nhiên bị thu hẹp'
      ],
      humanActivity: [
        'Hàng loạt đập thủy điện trên dòng chính và nhánh không có bậc thang cá hiệu quả, cắt đứt đường di cư',
        'Khai thác mang tính hủy diệt: đánh bắt bằng xung điện, lưới cào mắt nhỏ, kích điện',
        'Mất đi các vùng đất ngập nước tự nhiên do đắp đê bao thâm canh lúa'
      ],
      climateChange: [
        'Nhiệt độ nước sông tăng làm giảm nồng độ oxy hòa tan và thay đổi tín hiệu sinh sản tự nhiên của cá'
      ]
    },
    symptoms: [
      'Sản lượng đánh bắt cá tự nhiên mùa nước nổi giảm hơn 70-80% so với thập niên 1990',
      'Các loài cá quý khổng lồ (cá tra dầu, cá vồ cờ, cá hô) gần như biến mất ngoài tự nhiên',
      'Kích thước trung bình của các loài cá đánh bắt được ngày càng nhỏ đi'
    ],
    naturalImpact: 'Phá vỡ mắt xích quan trọng trong chuỗi thức ăn thủy sinh, suy giảm đa dạng sinh học của lưu vực sông có độ phong phú loài cá đứng thứ 2 thế giới sau sông Amazon.',
    socioEconomicImpact: 'Mất nguồn protein động vật giá rẻ nuôi sống hàng triệu người dân nghèo; ngư dân làng chài truyền thống mất sinh kế phải bán ghe chuyển nghề.',
    deltaImpact: 'Văn hóa mùa nước nổi của miền Tây (với biểu tượng cá linh, hoa điên điển, cá lóc đồng) đứng trước nguy cơ chỉ còn trong ký ức.',
    hauGiangConnection: 'Hậu Giang trước đây có nguồn lợi cá đồng dồi dào qua vùng ngập nước Phụng Hiệp và kênh xáng Xà No. Hiện nay sản lượng cá tự nhiên giảm mạnh, tỉnh phải khuyến khích chuyển sang nuôi cá thắt lát đặc sản Hậu Giang thương phẩm.',
    treatmentPrescription: {
      structural: [
        'Bắt buộc xây dựng đường dẫn cá (Fish Pass/Fish Ladder) hiện đại tại tất cả các công trình cống đập',
        'Thành lập các khu bảo tồn bãi đẻ thủy sản ngập nước ven sông Hậu và sông Tiền'
      ],
      nonStructural: [
        'Thả hàng triệu con cá giống bản địa tái tạo nguồn lợi thủy sản hàng năm',
        'Nghiêm cấm tuyệt đối đánh bắt bằng xung điện, cào đáy mùa cá đẻ trứng',
        'Ban hành mùa cấm đánh bắt cá linh non vào đầu mùa lũ'
      ],
      thuanThienModel: 'Mô hình "Bảo tồn cá đồng mùa nước nổi": bảo tồn các lung trũng tự nhiên trong vườn tràm để cá sinh sôi tự nhiên trong mùa lũ.'
    }
  },
  {
    id: 'pollution',
    name: 'Ô Nhiễm Nguồn Nước & Rác Thải Nhựa',
    ecoCode: 'MED-POL-07',
    icon: '🏭',
    severityLevel: 'Rất Nghiêm Trọng',
    patientOrgan: 'Dòng nước mặt kênh rạch đô thị, làng nghề và khu công nghiệp',
    shortSummary: 'Nước thải sinh hoạt, phân bón hóa học dư thừa và rác thải nhựa làm suy kiệt khả năng tự làm sạch của dòng sông.',
    definition: 'Hiện tượng dòng nước mặt bị ô nhiễm bởi các chất hữu cơ, chất dinh dưỡng dư thừa (gây hiện tượng phú dưỡng), thuốc trừ sâu, kim loại nặng và hạt vi nhựa vượt ngưỡng an toàn.',
    causes: {
      natural: [
        'Rửa trôi tự nhiên đất phèn chua trong các cơn mưa đầu mùa'
      ],
      humanActivity: [
        'Nước thải sinh hoạt từ các đô thị và khu dân cư ven sông chưa qua xử lý xả thẳng ra nguồn nước',
        'Lạm dụng phân bón vô cơ và thuốc bảo vệ thực vật trong nông nghiệp thâm canh',
        'Nước thải từ các ao nuôi cá tra thâm canh và lò mổ gia súc ven sông xả trực tiếp'
      ],
      climateChange: [
        'Dòng chảy mùa khô giảm làm giảm thể tích pha loãng chất thải tự nhiên của dòng sông'
      ]
    },
    symptoms: [
      'Nước kênh rạch nội đồng có màu đen, bốc mùi hôi thối trong các ngày triều kiệt',
      'Lục bình phát triển bùng phát bịt kín mặt nước kết hợp rác thải nhựa bồng bềnh',
      'Hiện tượng cá chết hàng loạt ở các kênh nhánh sau những cơn mưa đầu mùa xả chua'
    ],
    naturalImpact: 'Gây suy giảm nồng độ oxy hòa tan (DO), bùng phát tảo độc, làm chết các loài thủy sản nhạy cảm và phá hủy cân bằng vi sinh vật.',
    socioEconomicImpact: 'Tăng chi phí xử lý nước của các nhà máy cấp nước sạch; ảnh hưởng xấu đến sức khỏe cộng đồng (bệnh tiêu hóa, ngoài da); làm xấu cảnh quan du lịch sinh thái.',
    deltaImpact: 'Hệ thống sông ngòi ĐBSCL từ một dòng sông nước chảy thông thoáng biến thành nguy cơ lưu giữ rác thải nhựa đổ ra đại dương hàng đầu Đông Nam Á.',
    hauGiangConnection: 'Kênh xáng Xà No và các tuyến kênh qua Vị Thanh, Ngã Bảy, Châu Thành chịu áp lực ô nhiễm từ nước thải đô thị, chế biến nông sản và vỏ chai thuốc bảo vệ thực vật vứt trên đồng ruộng.',
    treatmentPrescription: {
      structural: [
        'Xây dựng hệ thống thu gom và trạm xử lý nước thải tập trung cho tất cả đô thị loại 3 trở lên',
        'Lắp đặt các rào chắn nổi thu gom rác tự động tại các cửa kênh đổ ra sông lớn',
        'Đầu tư hệ thống xử lý nước thải tuần hoàn khép kín cho các trang trại thủy sản'
      ],
      nonStructural: [
        'Chiến dịch thu gom vỏ bao bì thuốc bảo vệ thực vật sau sử dụng trên đồng ruộng',
        'Phạt nặng các hành vi xả thải lén lút của doanh nghiệp và khu công nghiệp',
        'Phát động phong trào "Nói không với túi nilon và rác thải nhựa một lần" tại trường học'
      ],
      thuanThienModel: 'Mô hình "Hệ thống đất ngập nước nhân tạo lọc nước sinh học": sử dụng thảm cỏ vetiver, lau sậy và bèo tây lọc sạch chất hữu cơ tự nhiên trước khi xả ra sông.'
    }
  },
  {
    id: 'climate',
    name: 'Sốt Biến Đổi Khí Hậu & Nước Biển Dâng',
    ecoCode: 'MED-CLI-08',
    icon: '🌡️',
    severityLevel: 'Mãn Tính Nguy Hiểm',
    patientOrgan: 'Toàn bộ sinh thái và địa hình cao trình thấp của đồng bằng',
    shortSummary: 'Nhiệt độ nóng lên, cực đoan hóa thời tiết và nước biển dâng đe dọa làm ngập lụt vĩnh viễn các vùng đất thấp.',
    definition: 'Tác động tổng thể của sự biến đổi khí hậu toàn cầu lên lưu vực sông Mê Kông, biểu hiện qua xu thế nhiệt độ tăng, lượng mưa biến động cực đoan (lũ lớn hơn, hạn sâu hơn) và mực nước biển dâng cao.',
    causes: {
      natural: [
        'Các chu kỳ biến động tự nhiên của hệ thống khí quyển - đại dương toàn cầu'
      ],
      humanActivity: [
        'Phát thải khí nhà kính (CO₂, CH₄) từ hoạt động công nghiệp và sử dụng nhiên liệu hóa thạch toàn cầu',
        'Nạn phá rừng nhiệt đới làm suy giảm khả năng hấp thụ carbon'
      ],
      climateChange: [
        'Băng tan ở hai cực và các rặng núi cao làm gia tăng thể tích nước biển toàn cầu',
        'Sự giãn nở nhiệt của các đại dương khi nhiệt độ nước biển tăng'
      ]
    },
    symptoms: [
      'Triều cường mùa gió chướng dâng cao kỷ lục, làm ngập sâu nhiều tuyến phố tại Cần Thơ, Hậu Giang, Vĩnh Long',
      'Hiện tượng thời tiết cực đoan (dông lốc, mưa đá, nắng nóng trên 38°C) xuất hiện thường xuyên hơn',
      'Đường bờ biển tại Gành Hào (Bạc Liêu) và U Minh (Cà Mau) bị sóng lấn sâu hàng chục mét mỗi năm'
    ],
    naturalImpact: 'Làm biến đổi ranh giới các hệ sinh thái tự nhiên; rừng tràm ngọt bị mặn hóa; thu hẹp môi trường sống của các loài động thực vật nhiệt đới đặc hữu.',
    socioEconomicImpact: 'Làm giảm năng suất cây trồng từ 5-10%; đe dọa cơ sở hạ tầng giao thông đô thị; chi phí nâng cấp đê biển và công trình phòng chống thiên tai lên đến hàng tỷ USD.',
    deltaImpact: 'ĐBSCL là một trong 3 đồng bằng châu thổ trên thế giới dễ bị tổn thương nhất trước biến đổi khí hậu (theo đánh giá của Ủy ban Liên chính phủ về BĐKH - IPCC).',
    hauGiangConnection: 'Hậu Giang có cao trình đất thấp (0.8 - 1.5m), khi triều cường kết hợp nước biển dâng dồn vào sông Hậu sẽ gây ngập úng các vườn cây ăn trái và các tuyến quốc lộ huyết mạch như Quốc lộ 1A, Quốc lộ 61C.',
    treatmentPrescription: {
      structural: [
        'Nâng cấp hệ thống đê biển, đê sông kết hợp đường giao thông tránh lũ',
        'Xây dựng các công trình trữ lũ và tiêu thoát nước đô thị thông minh',
        'Xây dựng nhà ở chống chịu thiên tai và thích ứng với ngập lụt'
      ],
      nonStructural: [
        'Chuyển đổi cơ cấu kinh tế theo quy hoạch vùng ĐBSCL thời kỳ 2021-2030, tầm nhìn 2050',
        'Thực hiện nghiêm túc cam kết Net Zero (phát thải ròng bằng 0) vào năm 2050 của Việt Nam',
        'Trồng và phục hồi rừng ngập mặn phòng hộ chắn sóng ven biển'
      ],
      thuanThienModel: 'Mô hình "Nông nghiệp các-bon thấp": áp dụng quy trình canh tác lúa 1 triệu héc-ta chất lượng cao phát thải thấp tại ĐBSCL (đề án của Bộ NN&PTNT đang triển khai tại Hậu Giang).'
    }
  }
];
