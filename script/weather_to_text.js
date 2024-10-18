//convert weather int to text using weaweatherToText.get(<int>)
const weatherToText = new Map();
weatherToText.set(0, "Soleil");
weatherToText.set(1, "Peu nuageux");
weatherToText.set(2, "Ciel voilé");
weatherToText.set(3, "Nuageux");
weatherToText.set(4, "Très nuageux");
weatherToText.set(5, "Couvert");
weatherToText.set(6, "Brouillard");
weatherToText.set(7, "Brouillard givrant");
weatherToText.set(10, "Pluie faible");
weatherToText.set(11, "Pluie modérée");
weatherToText.set(12, "Pluie forte");
weatherToText.set(13, "Pluie faible verglaçante");
weatherToText.set(14, "Pluie modérée verglaçante");
weatherToText.set(15, "Pluie forte verglaçante");
weatherToText.set(16, "Bruine");
weatherToText.set(20, "Neige faible");
weatherToText.set(21, "Neige modérée");
weatherToText.set(22, "Neige forte");
weatherToText.set(30, "Pluie et neige mêlées faibles");
weatherToText.set(31, "Pluie et neige mêlées modérées");
weatherToText.set(32, "Pluie et neige mêlées fortes");
weatherToText.set(40, "Averses de pluie locales et faibles");
weatherToText.set(41, "Averses de pluie locales");
weatherToText.set(42, "Averses locales et fortes");
weatherToText.set(43, "Averses de pluie faibles");
weatherToText.set(44, "Averses de pluie");
weatherToText.set(45, "Averses de pluie fortes");
weatherToText.set(46, "Averses de pluie faibles et fréquentes");
weatherToText.set(47, "Averses de pluie fréquentes");
weatherToText.set(48, "Averses de pluie fortes et fréquentes");
weatherToText.set(60, "Averses de neige localisées et faibles");
weatherToText.set(61, "Averses de neige localisées");
weatherToText.set(62, "Averses de neige localisées et fortes");
weatherToText.set(63, "Averses de neige faibles");
weatherToText.set(64, "Averses de neige");
weatherToText.set(65, "Averses de neige fortes");
weatherToText.set(66, "Averses de neige faibles et fréquentes");
weatherToText.set(67, "Averses de neige fréquentes");
weatherToText.set(68, "Averses de neige fortes et fréquentes");
weatherToText.set(
  70,
  "Averses de pluie et neige mêlées localisées et faibles"
);
weatherToText.set(71, "Averses de pluie et neige mêlées localisées");
weatherToText.set(
  72,
  "Averses de pluie et neige mêlées localisées et fortes"
);
weatherToText.set(73, "Averses de pluie et neige mêlées faibles");
weatherToText.set(74, "Averses de pluie et neige mêlées");
weatherToText.set(75, "Averses de pluie et neige mêlées fortes");
weatherToText.set(
  76,
  "Averses de pluie et neige mêlées faibles et nombreuses"
);
weatherToText.set(77, "Averses de pluie et neige mêlées fréquentes");
weatherToText.set(
  78,
  "Averses de pluie et neige mêlées fortes et fréquentes"
);
weatherToText.set(100, "Orages faibles et locaux");
weatherToText.set(101, "Orages locaux");
weatherToText.set(102, "Orages fort et locaux");
weatherToText.set(103, "Orages faibles");
weatherToText.set(104, "Orages");
weatherToText.set(105, "Orages forts");
weatherToText.set(106, "Orages faibles et fréquents");
weatherToText.set(107, "Orages fréquents");
weatherToText.set(108, "Orages forts et fréquents");
weatherToText.set(120, "Orages faibles et locaux de neige ou grésil");
weatherToText.set(121, "Orages locaux de neige ou grésil");
weatherToText.set(122, "Orages locaux de neige ou grésil");
weatherToText.set(123, "Orages faibles de neige ou grésil");
weatherToText.set(124, "Orages de neige ou grésil");
weatherToText.set(125, "Orages de neige ou grésil");
weatherToText.set(126, "Orages faibles et fréquents de neige ou grésil");
weatherToText.set(127, "Orages fréquents de neige ou grésil");
weatherToText.set(128, "Orages fréquents de neige ou grésil");
weatherToText.set(
  130,
  "Orages faibles et locaux de pluie et neige mêlées ou grésil"
);
weatherToText.set(131, "Orages locaux de pluie et neige mêlées ou grésil");
weatherToText.set(
  132,
  "Orages fort et locaux de pluie et neige mêlées ou grésil"
);
weatherToText.set(133, "Orages faibles de pluie et neige mêlées ou grésil");
weatherToText.set(134, "Orages de pluie et neige mêlées ou grésil");
weatherToText.set(135, "Orages forts de pluie et neige mêlées ou grésil");
weatherToText.set(
  136,
  "Orages faibles et fréquents de pluie et neige mêlées ou grésil"
);
weatherToText.set(137, "Orages fréquents de pluie et neige mêlées ou grésil");
weatherToText.set(
  138,
  "Orages forts et fréquents de pluie et neige mêlées ou grésil"
);
weatherToText.set(140, "Pluies orageuses");
weatherToText.set(141, "Pluie et neige mêlées à caractère orageux");
weatherToText.set(142, "Neige à caractère orageux");
weatherToText.set(210, "Pluie faible intermittente");
weatherToText.set(211, "Pluie modérée intermittente");
weatherToText.set(212, "Pluie forte intermittente");
weatherToText.set(220, "Neige faible intermittente");
weatherToText.set(221, "Neige modérée intermittente");
weatherToText.set(222, "Neige forte intermittente");
weatherToText.set(230, "Pluie et neige mêlées");
weatherToText.set(231, "Pluie et neige mêlées");
weatherToText.set(232, "Pluie et neige mêlées");
weatherToText.set(235, "Averses de grêle");