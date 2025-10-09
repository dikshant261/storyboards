// content in english
const appData = {
  en: {
    translation: {
      buttons: {
        previous: "«",
        next: "»",
        show: "Show",
        check: "Check",
        hide: "Hide",
        hint: "Hint",
        startOver: "START OVER",
        start: "START",
        close: "Close",
      },
      navigation: {
        tapFraction:
          "Tap a fraction problem card, then tap its matching answer card.",
        tapContinue: "Tap » to continue",
      },
      startPage: {
        title: "Multiplication of Fraction by a Whole",
        content:
          "Multiplying  a fraction and a whole means multiplying\n the numerator of the fraction by the whole number\n and keeping the denominator the same.\n\nLet’s practice — match each one with its picture.\n\nTap “Start” to start the activity.",
      },
      sceneOne: {
        heading: "Match each multiplication problem with its answer.",
        success: "Well Done! That’s a perfect match.",
        error: "Oops! That’s not a match. Try multiplying again.",
      },

      multiplication_title: "Multiplication of Fraction and a Whole Number",
      multiply_fraction_rule:
        "To multiply a fraction by a whole number, multiply the numerator of the fraction by the whole number and keep the denominator the same.",
      multiplication_heading: "Multiplication of Fraction and a Whole Number",
      of: "of",
      numerator_whole_over_denominator: "Numerator × Whole",
      denominator: "Denominator",
      activity: {
        title: "Activity Completed!",
        content:
          "You matched the cards!\n\nNow you know that to multiply a fraction by a whole \nnumber, multiply the numerator of the fraction by the whole \nnumber and keep the denominator the same.\n\nTo go over the activity again, tap on ‘Start Over’.",
      },
    },
  },
  id: {
    translation: {
      buttons: {
        previous: "«",
        next: "»",
        show: "Tampilkan",
        check: "Periksa",
        hide: "Sembunyikan",
        hint: "Petunjuk",
        startOver: "MULAI LAGI",
        start: "MULAI",
        close: "Tutup",
      },
      navigation: {
        tapFraction:
          "Ketuk kartu soal pecahan, lalu ketuk kartu jawaban yang cocok.",
        tapContinue: "Ketuk » untuk melanjutkan",
      },
      startPage: {
        title: "Perkalian Pecahan dengan Bilangan Bulat",
        content:
          "Mengalikan pecahan dengan bilangan bulat berarti mengalikan\npembilang pecahan dengan bilangan bulat\n dan mempertahankan penyebutnya tetap sama.\n\nAyo berlatih — cocokkan setiap soal dengan gambarnya.\n\nKetuk “Mulai” untuk memulai aktivitas.",
      },
      sceneOne: {
        heading: "Cocokkan setiap soal perkalian dengan jawabannya.",
        success: "Bagus sekali! Itu pasangan yang sempurna.",
        error: "Ups! Itu bukan pasangan yang cocok. Coba kalikan lagi.",
      },

      multiplication_title: "Perkalian Pecahan dan Bilangan Bulat",
      multiply_fraction_rule:
        "Untuk mengalikan pecahan dengan bilangan bulat, kalikan pembilang pecahan dengan bilangan bulat dan pertahankan penyebutnya tetap sama.",
      multiplication_heading: "Perkalian Pecahan dan Bilangan Bulat",
      of: "dari",
      numerator_whole_over_denominator: "Pembilang × Bilangan Bulat",
      denominator: "Penyebut",
      activity: {
        title: "Aktivitas Selesai!",
        content:
          "Kamu telah mencocokkan semua kartu!\n\nSekarang kamu tahu bahwa untuk mengalikan pecahan dengan\nbilangan bulat, kalikan pembilang pecahan dengan bilangan bulat\n dan pertahankan penyebutnya tetap sama.\n\nUntuk mengulangi aktivitas ini, ketuk ‘Mulai Lagi’.",
      },
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
