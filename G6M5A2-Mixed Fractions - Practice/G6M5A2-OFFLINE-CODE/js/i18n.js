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
          divide: "÷",
        },
        instruction: {
          tapNext: "Tap ”÷“ to start.",
          tapProceed: "Tap » to proceed.",
          tapQuotient: "Tap the correct quotient.",
          tapRemainder: "Tap the correct remainder.",
          next: "Tap »",
        },
        titles: {
          imporoperFraction: "Improper Fraction",
          division: "Division",
          mixedNumber: "Mixed Number",
        },
        sceneOne: {
          heading:
            "Let’s convert the given fraction into a mixed number using division.",
          tapFraction: "The fraction",
          means: "means {{dividend}} divided by {{divisor}}.",
        },
        sceneTwo: {
          divide:
            "Divide {{dividend}} by {{divisor}}.Notice how the fraction is represented as a mixed number.",
          mixedNumber: "The mixed number representation of",
          is: "is",
        }
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
        cannotDivide: "Tidak dapat dibagi lagi",
        yes: "Ya",
        no: "Tidak",
      },
      activity: "Kegiatan Selesai!",
      navigation: {
        tapNumpad:
          "Gunakan papan angka untuk memasukkan pembilang dan penyebut, lalu ketuk Periksa.",
        tapNext: "Ketuk » untuk melanjutkan",
        tryNext: "Ketuk » untuk mencoba tantangan baru.",
      },
      startPage: {
        title: "Perkalian Pecahan dengan Pecahan",
        weHave:
          "Kita telah mempelajari cara mengalikan dua pecahan menggunakan\n model area.",
        nowIts: "Sekarang giliranmu untuk mencoba sendiri.",
        tapStart: "Ketuk “Mulai” untuk memulai.",
      },
      sceneOne: {
        heading: "Kalikan pecahan yang diberikan.",
        success:
          "Bagus sekali! Hasil kali pecahan sama dengan\nhasil kali pembilang dibagi hasil kali penyebut.",
        error: "Coba Lagi",
        errorTwo:
          "Ups! Kalikan pembilang bersama-sama dan\nkalikan penyebut bersama-sama. Coba lagi!",
        successTwo:
          "Benar! {{count}} dari {{counttwo}} bagian saling tumpang tindih.\nHasil kali pecahan sama dengan\nhasil kali pembilang dibagi hasil kali penyebut.",
      },
      numerator1: "Pembilang 1",
      denominator1: "Penyebut 1",
      numerator2: "Pembilang 2",
      denominator2: "Penyebut 2",
      sceneTwo: {
        whatResult: "Berapa hasil dari",
        of: "dari",
        message:
          "Untuk mengalikan dua pecahan, kalikan pembilang bersama-sama dan\nkalikan penyebut bersama-sama.",
      },
      fraction: {
        title:
          "Kita menggunakan model area untuk menunjukkan perkalian pecahan.",
        description:
          "Hal ini dapat dilakukan dengan mengalikan pembilang bersama-sama dan mengalikan penyebut bersama-sama.",
        numerator: "Pembilang",
        denominator: "Penyebut",
        restart: "Ketuk “Mulai Ulang” untuk memulai kembali kegiatan.",
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
