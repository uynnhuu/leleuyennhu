import { TourismDestination } from '../types/mekong';
import cairangImg from '../assets/images/mekong_cairang_market_1789089868182.jpg';
import trasuImg from '../assets/images/mekong_trasu_forest_1789089880473.jpg';
import sunsetImg from '../assets/images/mekong_delta_sunset_1789089894553.jpg';

export const MEKONG_TOURISM_DESTINATIONS: TourismDestination[] = [
  {
    id: 'cai-rang',
    title: 'Chợ Nổi Cái Răng - Nét Đẹp Thương Hồ Sông Hậu',
    location: 'Sông Cần Thơ (Nhánh sông Hậu), Quận Cái Răng, TP. Cần Thơ',
    province: 'Cần Thơ',
    distanceFromFpt: 'Cách trường FPT Hậu Giang ~15 km (qua tuyến Quốc lộ 61C)',
    imageSrc: cairangImg,
    aiGenerated: true,
    tag: 'Di Sản Văn Hóa Phi Vật Thể',
    seasonHighlight: 'Đẹp nhất từ 5:30 - 8:00 sáng hàng ngày; nhộn nhịp nhất vụ trái cây hè tháng 5 - 8',
    description: 'Chợ nổi Cái Răng là biểu tượng du lịch sông nước độc đáo bậc nhất lưu vực sông Mê Kông tại ĐBSCL. Hàng trăm ghe xuồng chở đầy ắp nông sản miền Tây từ thơm (dứa), dưa hấu, xoài cát, vú sữa... quy tụ giao thương tấp nập. Nét văn hóa "cây bẹo" (treo gì bán nấy) là sáng tạo dân gian truyền đời của người dân miền Tây Nam Bộ.',
    ecoActivities: [
      'Đi thuyền ngắm bình minh phản chiếu trên sông Cần Thơ',
      'Thưởng thức hủ tiếu nước lèo, cà phê kho trên ghe nổi bập bềnh',
      'Tìm hiểu văn hóa giao thương "cây bẹo" truyền thống miền sông nước',
      'Ghé thăm các bè nổi làm hủ tiếu truyền thống ven sông'
    ],
    geographySignificance: 'Minh chứng sống động cho vai trò giao thông đường thủy và kinh tế thương mại của mạng lưới chi lưu sông Hậu theo chương trình Địa lí 11.'
  },
  {
    id: 'tra-su',
    title: 'Rừng Tràm Trà Sư - Ốc Đảo Sinh Thái Ngập Nước Mùa Nước Nổi',
    location: 'Thị xã Tịnh Biên, Tỉnh An Giang (Vùng Tứ giác Long Xuyên)',
    province: 'An Giang',
    distanceFromFpt: 'Khoảng 110 km về phía Tây Bắc từ FPT Hậu Giang',
    imageSrc: trasuImg,
    aiGenerated: true,
    tag: 'Khu Bảo Tồn Đất Ngập Nước Tiêu Biểu',
    seasonHighlight: 'Rực rỡ nhất vào Mùa nước nổi (Tháng 9 - 11) khi bèo cám phủ xanh mướt lòng kênh',
    description: 'Được mệnh danh là "thiên đường xanh ngập nước", Trà Sư sở hữu diện tích 845 ha rừng tràm nguyên sinh thuộc hệ thống rừng đặc dụng lưu vực sông Mê Kông. Du khách được xuồng ba lá đưa sâu vào lòng rừng ngắm thảm bèo hoa dâu xanh ngút ngàn, lắng nghe tiếng chim chao liệng và ngắm nhìn các loài cò, giang sen quý hiếm.',
    ecoActivities: [
      'Chèo xuồng ba lá luồn lách dưới tán tràm cổ thụ xanh ngắt',
      'Lên tháp quan sát ngắm toàn cảnh rừng tràm và dãy Thất Sơn hùng vĩ',
      'Chiêm ngưỡng vũ điệu hàng ngàn loài chim nước mùa lũ',
      'Thưởng thức cá linh non kho mía, bông điên điển mùa nước nổi'
    ],
    geographySignificance: 'Hệ sinh thái đất ngập nước nội địa đặc trưng của lưu vực Mê Kông, có chức năng giữ nước ngọt mùa lũ, lọc phèn và bảo tồn đa dạng sinh học.'
  },
  {
    id: 'xa-no-vi-thuy',
    title: 'Kênh Xáng Xà No & Miệt Vườn Vị Thủy Hậu Giang',
    location: 'Huyện Vị Thủy và TP. Vị Thanh, Tỉnh Hậu Giang',
    province: 'Hậu Giang',
    distanceFromFpt: 'Tọa lạc ngay cạnh khuôn viên Trường TH, THCS, THPT FPT Hậu Giang (61C ấp 6, xã Vị Thủy)',
    imageSrc: sunsetImg,
    aiGenerated: true,
    tag: 'Con Đường Lúa Gạo Trăm Năm',
    seasonHighlight: 'Hoàng hôn từ 17:00 - 18:30 và mùa lúa trúng chín vàng hai bên bờ kênh',
    description: 'Kênh xáng Xà No được đào từ đầu thế kỷ 20, nối dòng sông Cần Thơ (sông Hậu) vươn ra biển Tây, được mệnh danh là "Con đường lúa gạo miền Tây". Cảnh hoàng hôn buông xuống dòng kênh tĩnh lặng, bóng dừa nước in nghiêng và những chuyến ghe chở trấu, lúa gạo tấp nập tạo nên bức tranh quê thanh bình tuyệt đẹp.',
    ecoActivities: [
      'Tản bộ và ngắm hoàng hôn rực rỡ dọc tuyến đường 61C và bờ kênh Xà No',
      'Khám phá vùng trồng tràm và khu sinh thái rừng tràm Vị Thủy',
      'Trải nghiệm văn hóa làng nghề trồng khóm (dứa) Cầu Đúc nổi tiếng Hậu Giang',
      'Thăm trường FPT Hậu Giang với khuôn viên hiện đại giữa lòng thiên nhiên miệt vườn'
    ],
    geographySignificance: 'Hệ thống kênh rạch nhân tạo điều tiết thủy lợi, tiêu úng thoát phèn và vận chuyển hơn 90% lượng gạo xuất khẩu cả nước ra các cảng biển lớn.'
  },
  {
    id: 'dong-sen-thap-muoi',
    title: 'Đồng Sen & Khu Đất Ngập Nước Tràm Chim Tam Nông',
    location: 'Huyện Tam Nông, Tỉnh Đồng Tháp (Vùng Đồng Tháp Mười)',
    province: 'Đồng Tháp',
    distanceFromFpt: 'Khoảng 90 km về phía Bắc',
    imageSrc: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1200&q=80',
    aiGenerated: false,
    tag: 'Khu Ramsar Quốc Tế Số 2000',
    seasonHighlight: 'Mùa sen nở thơm ngát (tháng 6 - 9) và mùa Sếu đầu đỏ di cư trú đông (tháng 12 - 4)',
    description: 'Khu Ramsar Tràm Chim là hình mẫu sinh thái tiêu biểu cuối cùng của vùng ngập lũ Đồng Tháp Mười trũng thấp. Nơi đây nuôi dưỡng thảm thực vật sen trắng, súng đỏ, cỏ năng kim và là nơi cư ngụ của loài Sếu đầu đỏ (Grus antigone) cực kỳ quý hiếm trong Sách Đỏ thế giới.',
    ecoActivities: [
      'Ngắm chim bằng ống nhòm chuyên dụng tại các trạm vọng cảnh',
      'Trải nghiệm tự tay hái sen, thưởng thức trà sen và hạt sen nướng',
      'Đi tắc ráng lướt sóng qua những trảng cỏ năng xanh mướt'
    ],
    geographySignificance: 'Vùng trũng thoát lũ tự nhiên khổng lồ của sông Tiền, có vai trò trữ nước ngọt khổng lồ cho ĐBSCL trong mùa khô.'
  },
  {
    id: 'con-phung-ben-tre',
    title: 'Cồn Phụng & Du Lịch Sinh Thái Miệt Vườn Cửa Sông Tiền',
    location: 'Xã Tân Thạch, Huyện Châu Thành, Tỉnh Bến Tre (Cửa sông Tiền)',
    province: 'Bến Tre',
    distanceFromFpt: 'Khoảng 85 km theo Quốc lộ 1A và Cầu Rạch Miễu',
    imageSrc: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80',
    aiGenerated: false,
    tag: 'Xứ Dừa Miệt Vườn Ven Sông',
    seasonHighlight: 'Quanh năm mát mẻ; mùa thu hoạch chôm chôm, sầu riêng, nhãn từ tháng 5 - 7',
    description: 'Nằm giữa dòng sông Tiền thơ mộng, Cồn Phụng (cùng với Cồn Thới Sơn, Cồn Quy, Cồn Lân tạo thành bộ tứ linh Long - Lân - Quy - Phụng). Nơi đây mang đậm dấu ấn văn hóa miệt vườn xứ dừa, với nghề làm kẹo dừa thủ công, trại nuôi ong mật hoa nhãn và các buổi đờn ca tài tử Nam Bộ mộc mạc.',
    ecoActivities: [
      'Chèo xuồng ba lá len lỏi dưới rặng dừa nước rợp bóng mát',
      'Thưởng thức trái cây tươi ngọt và nghe Đờn ca tài tử Nam Bộ',
      'Tham quan quy trình nấu kẹo dừa truyền thống và làm đồ thủ công mỹ nghệ từ dừa',
      'Thử thách đi cầu khỉ và tát mương bắt cá đồng'
    ],
    geographySignificance: 'Minh chứng cho quá trình bồi tụ phù sa tạo thành các cù lao (cồn cát) màu mỡ ở hạ lưu cửa sông Tiền.'
  },
  {
    id: 'khone-falls',
    title: 'Thác Khone Phapheng & Biển Hồ Tonle Sap (Thượng - Trung Lưu)',
    location: 'Biên giới Lào - Campuchia & Tỉnh Siem Reap',
    province: 'Lào & Campuchia',
    distanceFromFpt: 'Lưu vực quốc tế sông Mê Kông',
    imageSrc: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=80',
    aiGenerated: false,
    tag: 'Kỳ Quan Dòng Sông Mẹ',
    seasonHighlight: 'Mùa nước lớn tháng 8 - 10 khi dòng thác đổ ầm ào dữ dội nhất',
    description: 'Thác Khone (Lào) là thác nước lớn nhất Đông Nam Á về lượng nước đổ dồn và là rào cản tự nhiên khiến tàu bè không thể thông hành lên Trung Quốc. Tiếp đó, Biển Hồ Tonle Sap (Campuchia) là hồ nước ngọt lớn nhất Đông Nam Á, đóng vai trò "trái tim" điều hòa dòng chảy mùa lũ - mùa cạn cho toàn bộ ĐBSCL của Việt Nam.',
    ecoActivities: [
      'Chiêm ngưỡng thác ghềnh hùng vĩ nhất dòng Mê Kông',
      'Khám phá các ngôi làng nổi trên Biển Hồ Tonle Sap',
      'Quan sát loài cá heo nước ngọt Irrawaddy quý hiếm'
    ],
    geographySignificance: 'Cơ chế điều tiết lũ tự nhiên quan trọng nhất của lưu vực Mê Kông (giảm lũ cho Việt Nam mùa mưa, bổ sung nước mùa kiệt).'
  }
];
