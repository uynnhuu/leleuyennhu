import { SimulatorEvent } from '../types/mekong';

export const SIMULATION_EVENTS: SimulatorEvent[] = [
  {
    id: 'sim-1',
    title: 'Mùa Lũ Về (Mùa Nước Nổi Tháng 9 - 10)',
    season: 'Mùa lũ (Nước nổi)',
    severity: 'medium',
    description: 'Nước lũ từ thượng nguồn đổ về kết hợp Biển Hồ tràn nước. Nông dân Đồng Tháp Mười và Tứ Giác Long Xuyên đang chuẩn bị đồng ruộng. Bạn quyết định kịch bản điều tiết như thế nào?',
    choices: [
      {
        text: 'Mở rộng đê bao, chủ động đón lũ mang phù sa vào đồng ruộng',
        description: 'Cho nước lũ tràn vào bồi bổ lớp đất mặt, thau rửa chua phèn và khai thác cá tôm tự nhiên.',
        impact: {
          waterSecurity: 15,
          agriculture: 15,
          ecology: 25
        },
        feedback: 'Xuất sắc! Phương châm "sống chung với lũ" giúp đồng ruộng nhận hàng triệu tấn phù sa màu mỡ và sinh kế cá linh trù phú.'
      },
      {
        text: 'Gia cố đê bao khép kín 100% để ép trồng thêm vụ lúa thứ 3',
        description: 'Ngăn lũ tuyệt đối để thu hoạch thêm một vụ lúa thu đông thương phẩm.',
        impact: {
          waterSecurity: -15,
          agriculture: 5,
          ecology: -25
        },
        feedback: 'Hệ lụy tiêu cực: Đất bị bạc màu do thiếu phù sa, cạn kiệt nguồn tôm cá, và nước lũ bị dồn sang vùng hạ du gây ngập úng đô thị Cần Thơ.'
      },
      {
        text: 'Vận hành xả lũ chậm theo chu kỳ kiểm soát',
        description: 'Chỉ cho nước vào các ô bao chỉ định, hạn chế một phần phù sa để bảo vệ nhà cửa vùng trũng thấp.',
        impact: {
          waterSecurity: 5,
          agriculture: 10,
          ecology: 5
        },
        feedback: 'Giải pháp dung hòa an toàn, bảo vệ được khu dân cư nhưng chưa tối ưu hóa nguồn lợi sinh thái tự nhiên.'
      }
    ]
  },
  {
    id: 'sim-2',
    title: 'Thượng Nguồn Tích Nước & Hạn Hán Mùa Khô (Tháng 2 - 3)',
    season: 'Mùa khô (Hạn mặn)',
    severity: 'high',
    description: 'Vào cao điểm mùa khô, lượng mưa giảm mạnh, các đập thủy điện thượng lưu đồng loạt tích nước. Lưu lượng về Tân Châu và Châu Đốc giảm xuống mức kỷ lục.',
    choices: [
      {
        text: 'Chủ động ngoại giao qua MRC đề nghị xả nước khẩn cấp + Khuyến cáo trữ nước ngọt hộ gia đình',
        description: 'Kích hoạt cơ chế chia sẻ dữ liệu thủy văn khẩn cấp của MRC và phát động chiến dịch đào ao phân tán.',
        impact: {
          waterSecurity: 20,
          agriculture: 15,
          ecology: 10
        },
        feedback: 'Rất chính xác! Hợp tác đa phương kết hợp tính chủ động của người dân đã giúp các vườn cây ăn trái thoát hạn ngoạn mục.'
      },
      {
        text: 'Khoan giếng tầng sâu ồ ạt để bơm nước ngầm tưới tiêu',
        description: 'Khai thác tối đa nguồn nước ngầm ngầm dưới lòng đất để bù đắp lượng nước mặt thiếu hụt.',
        impact: {
          waterSecurity: -20,
          agriculture: 5,
          ecology: -30
        },
        feedback: 'Báo động đỏ! Khai thác nước ngầm quá mức làm hạ tụt mực nước ngầm, đẩy nhanh sụt lún đất ĐBSCL từ 1-3cm mỗi năm.'
      },
      {
        text: 'Hạn chế tưới và cắt giảm diện tích lúa hè thu sớm',
        description: 'Khuyến cáo nông dân giãn vụ, chỉ duy trì nguồn nước thiết yếu cho sinh hoạt.',
        impact: {
          waterSecurity: 10,
          agriculture: -10,
          ecology: 5
        },
        feedback: 'Bảo toàn được nguồn nước sinh hoạt nhưng nông dân chịu thiệt hại kinh tế do giảm diện tích canh tác.'
      }
    ]
  },
  {
    id: 'sim-3',
    title: 'Ranh Mặn 4‰ Lấn Sâu 80km Vào Nội Đồng',
    season: 'Mùa khô (Hạn mặn)',
    severity: 'high',
    description: 'Nước biển dâng theo triều cường biển Đông. Nồng độ mặn 4‰ đã lấn sâu vào Tiền Giang, Bến Tre, đe dọa các vùng trồng sầu riêng, chôm chôm và nguồn nước nhà máy sinh hoạt.',
    choices: [
      {
        text: 'Đóng hệ thống siêu cống Cái Lớn - Cái Bé và các cống ngăn mặn trọng yếu',
        description: 'Vận hành đóng cống khép kín giữ ngọt bên trong, mở cống khi triều rút để xả phèn rửa mặn.',
        impact: {
          waterSecurity: 25,
          agriculture: 20,
          ecology: 10
        },
        feedback: 'Tuyệt vời! Công trình thủy lợi Cái Lớn - Cái Bé phát huy sức mạnh, cứu vãn hàng trăm ngàn héc-ta vườn cây trái đặc sản.'
      },
      {
        text: 'Cố gắng bơm nước sông pha loãng để tưới cho cây ăn trái',
        description: 'Vẫn lấy nước sông vì thấy màu nước trong, chưa qua kiểm định độ mặn.',
        impact: {
          waterSecurity: -25,
          agriculture: -30,
          ecology: -15
        },
        feedback: 'Thảm họa nông nghiệp! Sầu riêng và cây có múi rất nhạy cảm với độ mặn > 1‰, hàng ngàn ha cây ăn trái bị rụng lá chết cháy.'
      },
      {
        text: 'Chở nước ngọt bằng xà lan và cung ứng điểm cấp nước miễn phí cho dân',
        description: 'Ưu tiên tuyệt đối nước sinh hoạt cho bệnh viện, trường học và hộ nghèo ven biển.',
        impact: {
          waterSecurity: 20,
          agriculture: -5,
          ecology: 5
        },
        feedback: 'Hành động nhân văn kịp thời! Đảm bảo an sinh xã hội vững chắc trong những ngày hạn mặn đỉnh điểm.'
      }
    ]
  },
  {
    id: 'sim-4',
    title: 'Báo Động Sạt Lở Bờ Sông & Thiếu Hụt Phù Sa',
    season: 'Giai đoạn chuyển mùa',
    severity: 'medium',
    description: 'Hàng trăm điểm sạt lở xuất hiện dọc bờ sông Tiền và sông Hậu (An Giang, Đồng Tháp, Cần Thơ). Nguyên nhân do lòng sông bị thiếu cát trầm tích và dòng chảy siết.',
    choices: [
      {
        text: 'Cấm triệt để nạn khai thác cát lậu + Trồng cây bần, dừa nước chắn sóng bảo vệ bờ sông tự nhiên',
        description: 'Quy hoạch lại mỏ cát, áp dụng giải pháp công trình xanh sinh thái kết hợp kè mềm bản địa.',
        impact: {
          waterSecurity: 10,
          agriculture: 15,
          ecology: 25
        },
        feedback: 'Tầm nhìn chiến lược! Giải pháp sinh thái bền vững giúp giảm 60% chi phí kè cứng và bảo vệ hệ sinh thái lưỡng cư.'
      },
      {
        text: 'Đổ đá xây bờ kè bê tông kiên cố toàn bộ bờ sông',
        description: 'Đầu tư ngân sách khổng lồ để bê tông hóa hàng trăm km bờ sông.',
        impact: {
          waterSecurity: 5,
          agriculture: -10,
          ecology: -20
        },
        feedback: 'Chi phí quá tốn kém và bờ kè bê tông làm biến mất các bãi bồi sinh sản của tôm cá bản địa.'
      },
      {
        text: 'Di dời khẩn cấp các cụm dân cư sát mép sạt lở vào khu tái định cư an toàn',
        description: 'Ưu tiên bảo toàn tính mạng người dân, giải tỏa hành lang an toàn ven sông.',
        impact: {
          waterSecurity: 15,
          agriculture: 5,
          ecology: 10
        },
        feedback: 'Quyết định đúng đắn, kịp thời bảo vệ tính mạng và tài sản cho bà con miền Tây.'
      }
    ]
  },
  {
    id: 'sim-5',
    title: 'Thực Hiện Nghị Quyết 120: Tái Cơ Cấu "Thuận Thiên" Dài Hạn',
    season: 'Giai đoạn chuyển mùa',
    severity: 'low',
    description: 'Chính phủ triển khai chiến lược phát triển ĐBSCL đến năm 2030, tầm nhìn 2050. Bạn chọn phương án phân vùng sinh thái nào cho tương lai?',
    choices: [
      {
        text: 'Quy hoạch 3 vùng: Thượng nguồn (Ngọt - Lúa/Cây trái), Vùng giữa (Ngọt/Lợ linh hoạt), Vùng ven biển (Lúa - Tôm & Rừng mặn sinh thái)',
        description: 'Tôn trọng quy luật tự nhiên, biến nước mặn và nước lợ thành nguồn lợi kinh tế giá trị cao.',
        impact: {
          waterSecurity: 30,
          agriculture: 30,
          ecology: 30
        },
        feedback: 'Đỉnh cao quản trị! ĐBSCL chuyển mình ngoạn mục trở thành trung tâm kinh tế nông nghiệp sinh thái hiện đại, bền vững.'
      },
      {
        text: 'Tiếp tục theo đuổi mục tiêu sản lượng lúa tối đa trên toàn bộ diện tích',
        description: 'Cố gắng giữ ĐBSCL thuần ngọt bằng mọi giá với hệ thống cống đê khổng lồ.',
        impact: {
          waterSecurity: -20,
          agriculture: -15,
          ecology: -30
        },
        feedback: 'Mâu thuẫn với quy luật tự nhiên! Chi phí duy tu công trình quá lớn và không ứng phó nổi với biến đổi khí hậu.'
      },
      {
        text: 'Đẩy mạnh phát triển công nghiệp nặng và cảng nước sâu ven biển ồ ạt',
        description: 'Chuyển hướng kinh tế không phụ thuộc nông nghiệp mà dựa vào khu công nghiệp.',
        impact: {
          waterSecurity: -15,
          agriculture: -20,
          ecology: -25
        },
        feedback: 'Gây ô nhiễm nguồn nước và phá vỡ cấu trúc không gian sinh thái truyền thống của miền sông nước.'
      }
    ]
  }
];
