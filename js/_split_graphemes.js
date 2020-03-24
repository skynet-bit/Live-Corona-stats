function splitGraphemes(splitWord){
  //telugu
  var letter = "[\\u{0C00}-\\u{0C7F}]";
  var trailingLetter = "[\\u{0C00}-\\u{0C04}\\u{0C3E}-\\u{0C56}\\u{0C62}\\u{0C63}]";
  var control = "\\u{0C4D}"; // Virama
  var telugu = "".concat(letter, "(").concat(control).concat(letter, "|").concat(trailingLetter, ")*");

  //devanagiri
  var letter2 = "[\\u{0900}-\\u{097F}]";
  var trailingLetter2 = "[\\u{0900}-\\u{0903}\\u{093A}-\\u{0957}\\u{0962}\\u{0963}]";
  var control2 = "\\u{094D}"; // Virama
  var devanagari = "".concat(letter2, "(").concat(control2).concat(letter2, "|").concat(trailingLetter2, ")*");

  //kannada
  var letter4 = "[\\u{0C80}-\\u{0CFF}]";
  var trailingLetter4 = "[\\u{0C81}-\\u{0C83}\\u{0CBC}\\u{0CBE}-\\u{0CCD}\\u{0CD5}\\u{0CD6}\\u{0CE2}\\u{0CE3}]";
  var control4 = "\\u{0CCD}"; // Virama
  var kannada = "".concat(letter4, "(").concat(control4).concat(letter4, "|").concat(trailingLetter4, ")*");

  //malayalam
  var letter7 = "[\\u{0D00}-\\u{0D7F}]";
  var trailingLetter7 = "[\\u{0D00}-\\u{0D03}\\u{0D3B}\\u{0D3C}\\u{0D3E}-\\u{0D4D}\\u{0D57}\\u{0D62}-\\u{0D63}]";
  var control7 = "\\u{0D4D}"; // Virama
  var malayalam = "".concat(letter7, "(").concat(control7).concat(letter7, "|").concat(trailingLetter7, ")*");

  //tamil
  var letter9 = "[\\u{0B80}-\\u{0BFF}]";
  var trailingLetter9 = "[\\u{0B82}-\\u{0B83}\\u{0BBE}-\\u{0BD7}\\u{0962}\\u{0963}]"; // tamil's virama does not combine the following consonant
  var tamil = "".concat(letter9).concat(trailingLetter9, "*");

  //kannada
  var letter4 = "[\\u{0C80}-\\u{0CFF}]";
  var trailingLetter4 = "[\\u{0C81}-\\u{0C83}\\u{0CBC}\\u{0CBE}-\\u{0CCD}\\u{0CD5}\\u{0CD6}\\u{0CE2}\\u{0CE3}]";
  var control4 = "\\u{0CCD}"; // Virama
  var kannada = "".concat(letter4, "(").concat(control4).concat(letter4, "|").concat(trailingLetter4, ")*");

  //french
  var gg = '[a-z](?:\')';
  var french = '[àèùéâêîôûëïüÿæœç]';

  //english
  var english = '[a-z]|[\\s]|[0-9]';
  
  //german
  var german = '[ÄÖÜß]';

  //main function
  var patterns = [kannada, telugu, devanagari, malayalam, tamil, kannada, french, gg, english, german];

  var pattern = patterns.join('|');
  pattern = pattern.replace(/{/g, '').replace(/}/g, '');
  var splitter = new RegExp(pattern, "ig");
  console.log(splitter)
  return splitWord.match(splitter) || [];
}