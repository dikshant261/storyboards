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
        startOver: "START OVER",
        start: "START",
        close: "Close",
        cannotDivide: "Can’t divide further",
      },

      startPage: {
        simplestForm: "Simplest Form of a Fraction",
        keep: "Keep dividing the\n numerator and denominator\n by the same number\n until they can’t be divided further.",
        tapStart: "Tap “START” to begin.",
      },

      navigation: {
        tapOption: "Tap the option to divide.",
        tapContinue: "Tap » to continue",
        tapToSeeFar: "Tap » to see what we did so far.",
        tapNextPart: "Tap » to see the next part.",
        tapStartOver: "Tap » to start over.",
      },
      error: {
        notDivisibleByFive:
          "Oops! {{num}} and {{den}} are not divisible by 5. Remember, both numbers must be divisible by the same number.",
        notYet:
          "Not yet! You can still divide numerator and denominator further.",
        goodJob: "Good job! You picked the right number to divide.",
        thatCorrect: "That’s correct! It can't be divided further.",
        notDivideTwo: "{{num}} and {{den}}  are not divide by 2 further.",
        notDivideThree: "{{num}} and {{den}}  are not divide by 3 further.",
      },
      simplestFormHeading: "is the simplest form of",
      andToget: "and to get the simplest form\n of the fraction",
      divideBy: "Divided by",
      commonFactor: "are the \ncommon factors of \n12 and 24.",
      and: "and",
      greatJob:
        "Great job! A fraction is in its simplest form\n when the numerator and denominator can’t\n be divided by the same number. We used \ncommon prime factors to simplify fractions.",
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
        startOver: "MULAI ULANG",
        start: "MULAI",
        close: "Tutup",
        cannotDivide: "Tidak bisa dibagi lagi",
      },

      startPage: {
        simplestForm: "Bentuk Tersederhana dari Pecahan",
        keep: "Terus bagi pembilang dan penyebut\n dengan angka yang sama\n sampai tidak bisa dibagi lagi.",
        tapStart: "Ketuk “MULAI” untuk memulai.",
      },

      navigation: {
        tapOption: "Ketuk opsi untuk membagi.",
        tapContinue: "Ketuk » untuk melanjutkan",
        tapToSeeFar:
          "Ketuk » untuk melihat apa yang telah kita lakukan sejauh ini.",
        tapNextPart: "Ketuk » untuk melihat bagian berikutnya.",
        tapStartOver: "Ketuk » untuk memulai ulang.",
      },

      error: {
        notDivisibleByFive:
          "Ups! 24 dan 8 tidak dapat dibagi dengan 5. Ingat, kedua angka harus dapat dibagi dengan angka yang sama.",
        notYet:
          "Belum! Kamu masih bisa membagi pembilang dan penyebut lebih lanjut.",
        goodJob: "Kerja bagus! Kamu memilih angka yang tepat untuk membagi.",
        thatCorrect: "Benar! Pecahan ini tidak bisa dibagi lagi.",
        notDivide: "Tidak bisa dibagi lagi.",
      },

      simplestFormHeading: "adalah bentuk tersederhana dari",
      andToget: "dan untuk mendapatkan bentuk tersederhana\n dari pecahan",
      divideBy: "Dibagi dengan",
      commonFactor: "adalah \nfaktor persekutuan dari \n12 dan 24.",
      and: "dan",
      greatJob:
        "Kerja bagus! Pecahan berada dalam bentuk tersederhana\n ketika pembilang dan penyebutnya tidak dapat\n dibagi dengan angka yang sama lagi. Kita menggunakan\n faktor prima persekutuan untuk menyederhanakan pecahan.",
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
