export interface WhatIfParameters {
  waterDischarge: number;      // -50% to +50% (0 is normal baseline)
  waterDemand: number;         // 0% to 100% (50% is baseline)
  sedimentLoad: number;        // 10% to 100% (100% is historic, 30% is current)
  damExtraction: number;       // 0% to 100% (50% is current)
  droughtIntensity: number;    // 0% to 100% (0 is wet year, 100 is severe El Niño)
  seaLevelRise: number;        // 0 cm to 100 cm (0 is current, 50cm is mid-century)
  climateChangeImpact: number; // 0% to 100% (extreme heat & unpredictable rainfall)
}

export interface WhatIfImpacts {
  riverFlow: {
    status: 'Rất Dồi Dào' | 'Bình Thường' | 'Cạn Kiệt Đáng Báo Động' | 'Nguy Cơ Lũ Bất Thường';
    levelPct: number;
    explanation: string;
  };
  agriculture: {
    status: 'Thuận Lợi' | 'Khá Ổn Định' | 'Thiệt Hại Nặng' | 'Khủng Hoảng Mùa Vụ';
    levelPct: number;
    explanation: string;
  };
  fisheries: {
    status: 'Trù Phú' | 'Suy Giảm Nhẹ' | 'Suy Thoái Nghiêm Trọng' | 'Cạn Kiệt Cá Tự Nhiên';
    levelPct: number;
    explanation: string;
  };
  ecosystem: {
    status: 'Khỏe Mạnh' | 'Bị Suy Giảm' | 'Mất Cân Bằng Sinh Thái' | 'Báo Động Đỏ';
    levelPct: number;
    explanation: string;
  };
  mekongDelta: {
    status: 'Trù Phú Phát Triển' | 'Chịu Áp Lực Lớn' | 'Bị Tổn Thương Cao' | 'Nguy Cơ Ngập Chìm & Mất Đất';
    levelPct: number;
    explanation: string;
  };
  salinityIntrusion: {
    status: 'Kiểm Soát Tốt (<30km)' | 'Mức Trung Bình (40-55km)' | 'Lấn Sâu Nghiêm Trọng (60-80km)' | 'Thảm Họa Hạn Mặn (>90km)';
    reachKm: number;
    explanation: string;
  };
  riverbankErosion: {
    status: 'Thấp' | 'Trung Bình' | 'Rất Cao' | 'Báo Động Cực Độ';
    levelPct: number;
    explanation: string;
  };
  livelihoods: {
    status: 'An Cư Lạc Nghiệp' | 'Bấp Bênh Vụ Mùa' | 'Khó Khăn Nước Sinh Hoạt' | 'Nguy Cơ Di Cư Khí Hậu';
    levelPct: number;
    explanation: string;
  };
}

export const WHAT_IF_PRESETS: {
  id: string;
  name: string;
  description: string;
  params: WhatIfParameters;
}[] = [
  {
    id: 'baseline-2026',
    name: '1. Hiện Trạng Lưu Vực (Baseline)',
    description: 'Điều kiện thủy văn tương đối bình thường, các đập hoạt động theo công suất hiện có, lượng phù sa giảm khoảng 60-70% so với trước thập niên 1990.',
    params: {
      waterDischarge: 0,
      waterDemand: 50,
      sedimentLoad: 35,
      damExtraction: 50,
      droughtIntensity: 30,
      seaLevelRise: 15,
      climateChangeImpact: 40
    }
  },
  {
    id: 'mega-drought',
    name: '2. Siêu Hạn El Niño & Đập Tích Nước',
    description: 'Hạn hán kỷ lục, dòng chảy thượng nguồn sụt giảm 40%, các hồ chứa tăng cường tích nước làm hạ lưu kiệt quệ.',
    params: {
      waterDischarge: -40,
      waterDemand: 80,
      sedimentLoad: 20,
      damExtraction: 85,
      droughtIntensity: 90,
      seaLevelRise: 25,
      climateChangeImpact: 85
    }
  },
  {
    id: 'sea-rise-sediment-drop',
    name: '3. Nước Biển Dâng 60cm & Đói Phù Sa',
    description: 'Biển dâng cao theo kịch bản biến đổi khí hậu kết hợp đập giữ lại 85% phù sa bùn cát, bờ biển và bờ sông xói lở dữ dội.',
    params: {
      waterDischarge: -10,
      waterDemand: 60,
      sedimentLoad: 15,
      damExtraction: 70,
      droughtIntensity: 50,
      seaLevelRise: 60,
      climateChangeImpact: 75
    }
  },
  {
    id: 'eco-thuan-thien',
    name: '4. Kịch Bản Thuận Thiên & Hợp Tác Bền Vững',
    description: 'Các đập thủy điện vận hành xả nước điều tiết theo thỏa thuận MRC, ĐBSCL áp dụng mô hình Lúa - Tôm sinh thái và giảm khai thác nước ngầm.',
    params: {
      waterDischarge: +15,
      waterDemand: 30,
      sedimentLoad: 60,
      damExtraction: 25,
      droughtIntensity: 20,
      seaLevelRise: 20,
      climateChangeImpact: 30
    }
  }
];

export function calculateWhatIfImpacts(params: WhatIfParameters): WhatIfImpacts {
  // 1. River flow calculation
  // Base water discharge (-50 to +50), minus dam extraction, minus drought intensity
  const netFlow = params.waterDischarge - (params.damExtraction * 0.4) - (params.droughtIntensity * 0.35) + 30;
  const flowPct = Math.max(10, Math.min(100, Math.round(50 + netFlow)));
  let flowStatus: WhatIfImpacts['riverFlow']['status'] = 'Bình Thường';
  let flowExp = 'Dòng chảy sông Tiền và sông Hậu duy trì ở mức trung bình của năm.';
  if (flowPct < 35) {
    flowStatus = 'Cạn Kiệt Đáng Báo Động';
    flowExp = 'Dòng chảy mùa khô sụt giảm kỷ lục, mực nước tại trạm Tân Châu và Châu Đốc tụt xuống đáy lịch sử, sông rạch nội đồng trơ đáy.';
  } else if (flowPct > 75) {
    flowStatus = 'Nguy Cơ Lũ Bất Thường';
    flowExp = 'Lưu lượng nước dâng cao đột biến, nguy cơ xuất hiện các đợt ngập lũ nhân tạo hoặc lũ quét bất thường phía hạ du.';
  } else if (flowPct >= 55) {
    flowStatus = 'Rất Dồi Dào';
    flowExp = 'Dòng nước ngọt cuồn cuộn chảy về, tạo điều kiện thuận lợi cho mùa nước nổi và đẩy lùi nước mặn ra xa các cửa sông.';
  }

  // 2. Salinity intrusion
  // Higher drought, higher dam extraction, higher sea level, lower flow = deeper salinity reach
  const baseSalinityKm = 40;
  const extraFromSea = (params.seaLevelRise / 100) * 25; // up to +25km
  const extraFromLowFlow = Math.max(0, (50 - flowPct) * 0.6); // up to +30km
  const extraFromDrought = (params.droughtIntensity / 100) * 15;
  const totalSalReach = Math.min(105, Math.round(baseSalinityKm + extraFromSea + extraFromLowFlow + extraFromDrought));

  let salStatus: WhatIfImpacts['salinityIntrusion']['status'] = 'Mức Trung Bình (40-55km)';
  let salExp = `Ranh mặn 4g/l xâm nhập cách cửa sông khoảng ${totalSalReach} km, các trạm bơm ven biển cần theo dõi triều để lấy nước.`;
  if (totalSalReach < 35) {
    salStatus = 'Kiểm Soát Tốt (<30km)';
    salExp = `Nhờ dòng chảy ngọt dồi dào đẩy mặn, ranh mặn 4g/l chỉ dừng lại ở các cửa sông ven biển (<35 km), toàn bộ vùng nội đồng an toàn.`;
  } else if (totalSalReach >= 75) {
    salStatus = 'Thảm Họa Hạn Mặn (>90km)';
    salExp = `Báo động thảm họa: Lưỡi mặn tiến sâu ${totalSalReach} km vào tận Vị Thủy (Hậu Giang), Vĩnh Long, Cần Thơ; tê liệt các nhà máy cấp nước sạch sinh hoạt!`;
  } else if (totalSalReach >= 58) {
    salStatus = 'Lấn Sâu Nghiêm Trọng (60-80km)';
    salExp = `Ranh mặn 4g/l thọc sâu ${totalSalReach} km, đe dọa trực tiếp các vùng chuyên canh cây ăn trái đặc sản Bến Tre, Tiền Giang và Hậu Giang.`;
  }

  // 3. Riverbank erosion
  // Low sediment load + high water extraction + high flow fluctuation = higher erosion
  const erosionScore = Math.round(
    ((100 - params.sedimentLoad) * 0.45) +
    (params.seaLevelRise * 0.3) +
    (params.climateChangeImpact * 0.25)
  );
  let erStatus: WhatIfImpacts['riverbankErosion']['status'] = 'Trung Bình';
  let erExp = 'Xói lở xuất hiện cục bộ tại các đoạn uốn khúc quanh co của sông Tiền và sông Hậu.';
  if (erosionScore > 75) {
    erStatus = 'Báo Động Cực Độ';
    erExp = 'Hiện tượng "nước đói phù sa" cắn ngoạm lòng sông sâu hút, tạo hố xói chân bờ gây sụp đổ hàng loạt nhà dân, đê kè và công trình giao thông ven sông!';
  } else if (erosionScore > 50) {
    erStatus = 'Rất Cao';
    erExp = 'Thiếu hụt hơn 70% bùn cát khiến bờ sông và dải rừng ngập mặn ven biển Cà Mau, Bạc Liêu bị sóng biển đánh sập với tốc độ 20-30m/năm.';
  } else if (erosionScore < 30) {
    erStatus = 'Thấp';
    erExp = 'Lượng phù sa bồi đắp dồi dào giúp ổn định lòng dẫn và tiếp tục bồi lắng mở rộng bãi bồi ven biển.';
  }

  // 4. Agriculture
  const agriScore = Math.max(10, Math.min(100, Math.round(
    flowPct * 0.4 +
    (100 - totalSalReach) * 0.35 +
    (100 - params.climateChangeImpact) * 0.25
  )));
  let agriStatus: WhatIfImpacts['agriculture']['status'] = 'Khá Ổn Định';
  let agriExp = 'Nông nghiệp ĐBSCL duy trì được năng suất bình quân, nông dân chủ động né hạn.';
  if (agriScore < 35) {
    agriStatus = 'Khủng Hoảng Mùa Vụ';
    agriExp = 'Thiếu nước tưới kết hợp mặn thâm nhập làm hàng chục nghìn héc-ta lúa cháy khô, vườn sầu riêng rụng lá chết cây, thiệt hại hàng ngàn tỷ đồng.';
  } else if (agriScore < 55) {
    agriStatus = 'Thiệt Hại Nặng';
    agriExp = 'Các vùng cuối nguồn bị cắt giảm diện tích gieo sạ vụ 3, chi phí nạo vét và bơm nước cứu lúa tăng vọt.';
  } else if (agriScore >= 75) {
    agriStatus = 'Thuận Lợi';
    agriExp = 'Nguồn nước ngọt và phù sa màu mỡ giúp các cánh đồng lúa và vựa trái cây ĐBSCL bội thu đạt chất lượng xuất khẩu cao.';
  }

  // 5. Fisheries
  const fishScore = Math.max(10, Math.min(100, Math.round(
    flowPct * 0.35 +
    (100 - params.damExtraction) * 0.35 +
    params.sedimentLoad * 0.3
  )));
  let fishStatus: WhatIfImpacts['fisheries']['status'] = 'Suy Giảm Nhẹ';
  let fishExp = 'Nguồn lợi cá sông vẫn có nhưng các loài cá kích thước lớn ngày càng hiếm gặp.';
  if (fishScore < 30) {
    fishStatus = 'Cạn Kiệt Cá Tự Nhiên';
    fishExp = 'Đập thủy điện chặn đứt đường bơi sinh sản, Biển Hồ cạn kiệt khiến sản lượng cá nước ngọt tự nhiên sụp đổ nghiêm trọng, ngư dân phải bỏ nghề.';
  } else if (fishScore < 50) {
    fishStatus = 'Suy Thoái Nghiêm Trọng';
    fishExp = 'Mất đi các bãi đẻ ngập lũ và dòng bùn hữu cơ, sản lượng đánh bắt cá mùa nước nổi giảm hơn 60%.';
  } else if (fishScore >= 75) {
    fishStatus = 'Trù Phú';
    fishExp = 'Hệ sinh thái thông thoáng đón hàng ngàn đàn cá di cư từ Campuchia về sông Tiền, sông Hậu sinh sản, vựa cá Biển Hồ dồi dào.';
  }

  // 6. Ecosystem
  const ecoScore = Math.max(10, Math.min(100, Math.round(
    (flowPct + (100 - params.damExtraction) + params.sedimentLoad + (100 - params.climateChangeImpact)) / 4
  )));
  let ecoStatus: WhatIfImpacts['ecosystem']['status'] = 'Bị Suy Giảm';
  let ecoExp = 'Hệ sinh thái đất ngập nước chịu áp lực suy thoái cục bộ nhưng vẫn còn khả năng tự hồi phục.';
  if (ecoScore < 35) {
    ecoStatus = 'Báo Động Đỏ';
    ecoExp = 'Các khu bảo tồn Ramsar (Tràm Chim, U Minh Hạ, Mũi Cà Mau) bị suy kiệt nghiêm trọng, nguy cơ cháy rừng và biến mất loài sinh vật đặc hữu.';
  } else if (ecoScore >= 75) {
    ecoStatus = 'Khỏe Mạnh';
    ecoExp = 'Dòng chảy tự nhiên, rừng ngập mặn xanh tốt, thảm thực vật phù du phát triển mạnh mẽ tạo lá phổi sinh thái cho toàn vùng.';
  } else if (ecoScore < 55) {
    ecoStatus = 'Mất Cân Bằng Sinh Thái';
    ecoExp = 'Sự xáo trộn chu kỳ khô - ngập làm đảo lộn tập tính sinh sản của các loài chim di cư và lưỡng cư quý hiếm.';
  }

  // 7. Mekong Delta Vulnerability
  const deltaScore = Math.max(10, Math.min(100, Math.round(
    ((100 - flowPct) * 0.3) +
    (totalSalReach * 0.3) +
    (params.seaLevelRise * 0.25) +
    (erosionScore * 0.15)
  )));
  let deltaStatus: WhatIfImpacts['mekongDelta']['status'] = 'Chịu Áp Lực Lớn';
  let deltaExp = 'ĐBSCL cần kích hoạt các biện pháp công trình và phi công trình để bảo vệ sản xuất.';
  if (deltaScore > 75) {
    deltaStatus = 'Nguy Cơ Ngập Chìm & Mất Đất';
    deltaExp = 'Cảnh báo nguy cấp: Kết hợp nước biển dâng, sụt lún nền đất và thiếu phù sa bồi đắp khiến hàng ngàn hecta đất thấp có nguy cơ ngập vĩnh viễn!';
  } else if (deltaScore > 55) {
    deltaStatus = 'Bị Tổn Thương Cao';
    deltaExp = 'Đồng bằng đứng trước thách thức kép "trên đập - dưới biển dâng", đòi hỏi khẩn trương tái cơ cấu theo mô hình Thuận thiên.';
  } else {
    deltaStatus = 'Trù Phú Phát Triển';
    deltaExp = 'Đồng bằng giữ vững vị thế vựa lúa, trái cây và thủy sản hàng đầu đất nước, sinh thái thịnh vượng.';
  }

  // 8. Livelihoods
  const liveScore = Math.max(10, Math.min(100, Math.round(
    agriScore * 0.4 + (100 - totalSalReach) * 0.3 + (100 - erosionScore) * 0.3
  )));
  let liveStatus: WhatIfImpacts['livelihoods']['status'] = 'Bấp Bênh Vụ Mùa';
  let liveExp = 'Đời sống người dân chịu ảnh hưởng của thời tiết, thu nhập từ nông nghiệp bấp bênh.';
  if (liveScore < 35) {
    liveStatus = 'Nguy Cơ Di Cư Khí Hậu';
    liveExp = 'Mất đất vì sạt lở, mất mùa vì hạn mặn khiến nhiều gia đình nông dân phải rời bỏ quê hương lên các đô thị lớn tìm kiếm việc làm mưu sinh.';
  } else if (liveScore < 55) {
    liveStatus = 'Khó Khăn Nước Sinh Hoạt';
    liveExp = 'Người dân phải đổi từng khối nước ngọt với giá đắt đỏ, sinh hoạt bị đảo lộn trong những tháng cao điểm mùa khô.';
  } else if (liveScore >= 75) {
    liveStatus = 'An Cư Lạc Nghiệp';
    liveExp = 'Kinh tế miệt vườn phát triển, bà con nông dân sung túc với chuỗi giá trị nông sản và du lịch sinh thái nông thôn mới.';
  }

  return {
    riverFlow: { status: flowStatus, levelPct: flowPct, explanation: flowExp },
    agriculture: { status: agriStatus, levelPct: agriScore, explanation: agriExp },
    fisheries: { status: fishStatus, levelPct: fishScore, explanation: fishExp },
    ecosystem: { status: ecoStatus, levelPct: ecoScore, explanation: ecoExp },
    mekongDelta: { status: deltaStatus, levelPct: deltaScore, explanation: deltaExp },
    salinityIntrusion: { status: salStatus, reachKm: totalSalReach, explanation: salExp },
    riverbankErosion: { status: erStatus, levelPct: erosionScore, explanation: erExp },
    livelihoods: { status: liveStatus, levelPct: liveScore, explanation: liveExp }
  };
}
