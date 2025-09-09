// content in english
const appData = {
  en: {
    translation: {
      Complete_the_subtraction_sentence:
        "Complete the\n subtraction sentence\n using the information in\n the picture",
      tapBegin: "Tap Start to begin…",
      start: "START",
      There_are_total_cars_in_picture:
        "There are total {{total}} cars in picture. {{cross}} cars are crossed showing subtraction.",
      Count_and_complete_the:
        "Count and complete the subtraction sentence given along with the picture",
      hintMessage:
        "To subtract the numbers, count the number of objects not\n crossed….",
      hide: "HIDE",
      show: "SHOW",
      check: "CHECK",
      tap_and_check: "Tap the correct number and then tap check.",
      greaterErrorMessage:
        "Oops! Think smaller… There were {{total}} cars! How many cars are left after crossing out {{cross}}?",
      biggerErrorMessage:
        "Oops! Think bigger… Is there only {{left}} car left uncrossed?",
      successMessage:
        "Well Done!Subtracting {{total}} from {{cross}} gives {{left}}.",
      nullError:
        "Oops! {{cross}} Cars are crossed out! How many are left uncrossed?",
      sentanceOne:
        "If {{cross}} objects are crossed\n out of {{total}}, we say that",
      sentanceTwo: "{{cross}} is subtracted\n from {{total}}.",
      sentanceThree:
        "Subtraction Expression\n for this will\n be: {{total}} - {{cross}}.",
      nextQuestion: "Tap  ▶  for the next challenge…",
    },
  },
  id: {
    translation: {
      Complete_the_subtraction_sentence:
        "Lengkapi kalimat pengurangan menggunakan informasi pada gambar",
      tapBegin: "Ketuk Mulai untuk memulai…",
      start: "MULAI",
      There_are_total_cars_in_picture:
        "Ada total {{total}} mobil pada gambar. {{cross}} mobil dicoret untuk menunjukkan pengurangan.",
      Count_and_complete_the:
        "Hitung dan lengkapi kalimat pengurangan yang diberikan bersama gambar",
      hintMessage:
        "Untuk mengurangi angka, hitung jumlah objek yang tidak dicoret…",
      hide: "SEMBUNYIKAN",
      show: "TUNJUKKAN",
      check: "PERIKSA",
      tap_and_check: "Ketuk angka yang benar lalu ketuk periksa.",
      greaterErrorMessage:
        "Ups! Pikirkan lebih kecil… Ada {{total}} mobil! Berapa mobil yang tersisa setelah mencoret {{cross}}?",
      biggerErrorMessage:
        "Ups! Pikirkan lebih besar… Apakah hanya ada {{left}} mobil yang tersisa tidak dicoret?",
      successMessage:
        "Bagus sekali! Mengurangkan {{total}} dengan {{cross}} menghasilkan {{left}}.",
      nullError:
        "Ups! {{cross}} mobil dicoret! Berapa yang tersisa tidak dicoret?",
      sentanceOne:
        "Jika {{cross}} objek dicoret dari {{total}}, kita mengatakan bahwa",
      sentanceTwo: "{{cross}} dikurangkan dari {{total}}.",
      sentanceThree:
        "Ekspresi pengurangan untuk ini adalah: {{total}} - {{cross}}.",
      nextQuestion: "Ketuk ▶ untuk tantangan berikutnya…",
    },
  },
};

// Current language comes from global APP_LANGUAGE set in index.html
const currentLang = window.APP_LANGUAGE || "en";

// Helper: resolve nested keys like "storyOne.optionOne"
function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : null;
  }, obj);
}

// Translator function
function t(key, params = {}) {
  let text = getNested(appData[currentLang].translation, key) || key;

  // Replace variables if any (like {{count}})
  Object.keys(params).forEach((p) => {
    text = text.replace(`{{${p}}}`, params[p]);
  });

  return text;
}

// Expose globally so all components can use it
window.t = t;
