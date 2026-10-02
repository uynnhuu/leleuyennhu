import { QuizQuestion } from '../types/mekong';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Sông Mê Công bắt nguồn từ khu vực địa hình nào và thuộc quốc gia nào?',
    options: [
      'Dãy Himalaya (Ấn Độ)',
      'Cao nguyên Tây Tạng (Trung Quốc)',
      'Dãy núi Hoàng Liên Sơn (Việt Nam)',
      'Sơn nguyên Đê-can (Nam Á)'
    ],
    correctAnswer: 1,
    explanation: 'Sông Mê Công bắt nguồn từ vùng núi tuyết cao nguyên Thanh Tạng (tỉnh Thanh Hải, Trung Quốc) ở độ cao gần 5.000m, tại đây sông có tên gọi là Lan Thương Giang.',
    curriculumTopic: 'Vị trí & Lưu vực',
    difficulty: 'Nhận biết'
  },
  {
    id: 2,
    question: 'Quốc gia nào có tỉ lệ đóng góp lượng nước lớn nhất cho toàn bộ dòng chảy sông Mê Công?',
    options: [
      'Trung Quốc (~16%)',
      'Thái Lan (~18%)',
      'Lào (~35%)',
      'Việt Nam (~11%)'
    ],
    correctAnswer: 2,
    explanation: 'Lào là quốc gia đóng góp lượng nước lớn nhất cho sông Mê Kông (khoảng 35% tổng lưu lượng) nhờ hệ thống phụ lưu phong phú bắt nguồn từ sườn tây dãy Trường Sơn có lượng mưa nhiệt đới rất dồi dào.',
    curriculumTopic: 'Chế độ nước & Thủy văn',
    difficulty: 'Thông hiểu'
  },
  {
    id: 3,
    question: 'Hồ nước ngọt tự nhiên lớn nhất Đông Nam Á đóng vai trò điều tiết lũ tự nhiên cho hạ lưu sông Mê Công là:',
    options: [
      'Hồ Ba Bể',
      'Biển Hồ (Tonle Sap)',
      'Hồ Songkhla',
      'Hồ Toba'
    ],
    correctAnswer: 1,
    explanation: 'Biển Hồ (Tonle Sap, Campuchia) là hồ nước ngọt lớn nhất Đông Nam Á. Mùa lũ, nước sông Mê Kông chảy ngược vào Biển Hồ giúp hạ mức nước lũ ở ĐBSCL; mùa khô, nước từ Biển Hồ chảy ngược ra sông tiếp nước cho vùng hạ lưu.',
    curriculumTopic: 'Chế độ nước & Thủy văn',
    difficulty: 'Nhận biết'
  },
  {
    id: 4,
    question: 'Khi chảy vào lãnh thổ Việt Nam, sông Mê Công phân thành hai nhánh chính nào?',
    options: [
      'Sông Hồng và Sông Thái Bình',
      'Sông Tiền và Sông Hậu',
      'Sông Đồng Nai và Sông Sài Gòn',
      'Sông Vàm Cỏ Đông và Sông Vàm Cỏ Tây'
    ],
    correctAnswer: 1,
    explanation: 'Sông Mê Công khi chảy vào Việt Nam tại tỉnh An Giang và Đồng Tháp thì tách thành 2 nhánh sông lớn là sông Tiền (Tiền Giang) và sông Hậu (Hậu Giang), hay còn gọi chung là sông Cửu Long.',
    curriculumTopic: 'Vị trí & Lưu vực',
    difficulty: 'Nhận biết'
  },
  {
    id: 5,
    question: 'Tại sao người dân Đồng bằng sông Cửu Long không gọi mùa nước lên hàng năm là "lũ lụt" mà gọi là "mùa nước nổi"?',
    options: [
      'Vì nước lên rất nhanh và gây tàn phá nghiêm trọng',
      'Vì nước dâng từ từ, mang theo phù sa màu mỡ và nguồn lợi thủy sản, ít gây ngập lụt thảm họa',
      'Vì người dân muốn đổi tên để tránh tâm lý sợ hãi',
      'Vì nước chỉ ngập vài giờ rồi rút ngay ra biển'
    ],
    correctAnswer: 1,
    explanation: 'Nước lũ ở ĐBSCL dâng lên từ từ nhờ sự điều tiết của Biển Hồ và đồng bằng bằng phẳng. Mùa nước nổi mang lại phù sa thau chua rửa phèn và tôm cá dồi dào, là một nét sinh thái văn hóa nông nghiệp đặc sắc chứ không đơn thuần là thiên tai.',
    curriculumTopic: 'Tác động tới ĐBSCL',
    difficulty: 'Thông hiểu'
  },
  {
    id: 6,
    question: 'Trong 9 cửa sông truyền thống của sông Cửu Long, cửa sông nào hiện nay đã bị bồi lấp hoàn toàn do quy luật tự nhiên?',
    options: [
      'Cửa Tiểu',
      'Cửa Hàm Luông',
      'Cửa Bát Xắc (Bassac)',
      'Cửa Trần Đề'
    ],
    correctAnswer: 2,
    explanation: 'Cửa Bát Xắc (thuộc huyện Cù Lao Dung, tỉnh Sóc Trăng) qua nhiều thế kỷ bồi tụ phù sa và biển thoái đã bị bồi lắng nghẽn dòng hoàn toàn. Hiện nay sông Cửu Long thực tế chỉ còn 8 cửa thông ra biển (trong đó cửa Ba Lai có cống đập ngăn mặn).',
    curriculumTopic: 'Vị trí & Lưu vực',
    difficulty: 'Vận dụng'
  },
  {
    id: 7,
    question: 'Tác động tiêu cực lớn nhất của chuỗi đập thủy điện thượng nguồn đối với Đồng bằng sông Cửu Long là gì?',
    options: [
      'Làm gia tăng hiện tượng bão nhiệt đới',
      'Giữ lại lượng lớn bùn cát phù sa và làm thay đổi quy luật dòng chảy tự nhiên',
      'Làm giảm lượng mưa trung bình năm tại ĐBSCL',
      'Khiến cho dòng sông bị cạn trơ đáy quanh năm'
    ],
    correctAnswer: 1,
    explanation: 'Các đập thủy điện giữ lại tới 50-70% lượng phù sa trầm tích, khiến ĐBSCL bị "đói phù sa", gây sạt lở nghiêm trọng bờ sông bờ biển, đồng thời việc xả nước bất thường làm xáo trộn sinh thái và gia tăng xâm nhập mặn mùa khô.',
    curriculumTopic: 'An ninh nguồn nước & Giải pháp',
    difficulty: 'Thông hiểu'
  },
  {
    id: 8,
    question: 'Nghị quyết 120/NQ-CP của Chính phủ Việt Nam về phát triển bền vững ĐBSCL nhấn mạnh quan điểm cốt lõi nào?',
    options: [
      'Đắp đê ngăn mặn toàn bộ diện tích đồng bằng',
      'Phát triển "Thuận thiên", tôn trọng quy luật tự nhiên, coi nước mặn - lợ cũng là tài nguyên',
      'Chuyển đổi toàn bộ đất trồng lúa sang nuôi trồng thủy sản công nghiệp',
      'Ngừng khai thác nước ngầm và di dời dân cư khỏi vùng ven biển'
    ],
    correctAnswer: 1,
    explanation: 'Quan điểm trung tâm của Nghị quyết 120 là phát triển "Thuận thiên" (Living with Nature) – lấy tài nguyên nước làm cốt lõi, chuyển đổi thích ứng linh hoạt: vùng ngọt, vùng lợ, vùng mặn, biến nguy cơ thành cơ hội.',
    curriculumTopic: 'An ninh nguồn nước & Giải pháp',
    difficulty: 'Vận dụng'
  },
  {
    id: 9,
    question: 'Tổ chức liên chính phủ quốc tế nào phụ trách điều phối, quản lý và thúc đẩy phát triển bền vững lưu vực sông Mê Công?',
    options: [
      'Ủy hội Sông Mê Công quốc tế (MRC - Mekong River Commission)',
      'Hiệp hội các quốc gia Đông Nam Á (ASEAN)',
      'Tổ chức Nông Lương Liên Hiệp Quốc (FAO)',
      'Ngân hàng Phát triển Châu Á (ADB)'
    ],
    correctAnswer: 0,
    explanation: 'Ủy hội Sông Mê Công quốc tế (MRC) được thành lập theo Hiệp định Mê Kông năm 1995 giữa 4 nước hạ lưu (Lào, Thái Lan, Campuchia, Việt Nam), cùng 2 đối tác đối thoại là Trung Quốc và Myanmar.',
    curriculumTopic: 'An ninh nguồn nước & Giải pháp',
    difficulty: 'Nhận biết'
  },
  {
    id: 10,
    question: 'Mô hình kinh tế nông nghiệp nào dưới đây thể hiện rõ nhất sự thích ứng "Thuận thiên" với xâm nhập mặn ở các tỉnh duyên hải ĐBSCL?',
    options: [
      'Trồng độc canh 3 vụ lúa cao sản quanh năm',
      'Mô hình luân canh thông minh "Lúa - Tôm" (mùa mưa trồng lúa ngọt, mùa khô nuôi tôm nước lợ)',
      'Trồng cao su và cà phê ven biển',
      'Đắp đê bao bê tông khép kín vĩnh viễn không cho nước vào'
    ],
    correctAnswer: 1,
    explanation: 'Mô hình Lúa - Tôm là sáng kiến thích ứng tuyệt vời: Mùa mưa có nước ngọt thì trồng lúa đặc sản (hút bớt muối, làm sạch bùn); mùa khô khi nước mặn xâm nhập thì nuôi tôm sinh thái chất lượng cao đem lại thu nhập lớn.',
    curriculumTopic: 'Tác động tới ĐBSCL',
    difficulty: 'Vận dụng'
  }
];
