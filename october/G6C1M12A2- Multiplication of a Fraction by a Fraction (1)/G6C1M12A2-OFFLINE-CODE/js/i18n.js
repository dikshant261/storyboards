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
        yes: "Yes",
        no: "No",
      },
      activity: "Activity Completed!",
      navigation: {
        tapNumpad:
          "Use numpad to enter numerator and denominator, then tap Check.",
        tapNext: "Tap » to continue",
        tryNext: "Tap » to try a new challenge.",
      },
      startPage: {
        title: "Multiplication of a Fraction by a Fraction",
        weHave:
          "We learned how to multiply two fractions using\n an area model.",
        nowIts: "Now, it’s your turn to try on your own.",
        tapStart: "Tap “Start” to begin.",
      },
      sceneOne: {
        heading: "Multiply the given fractions.",
        success:
          "Well done! Product of fractions is the same as\nproduct of numerators over product of denominators.",
        error: "Try Again",
        errorTwo:
          "Oops! Multiply the numerators together and\n multiply the denominators together. Try again!",
        successTwo:
          "Correct! {{count}} out of {{counttwo}} parts are overlapped.\nProduct of fractions is the same as\nproduct of numerators over product of denominators.",
      },

      numerator1: "Numerator 1",
      denominator1: "Denominator 1",
      numerator2: "Numerator 2",
      denominator2: "Denominator 2",

      sceneTwo: {
        whatResult: "What is the result of",
        of: "of",
        message:
          "To multiply two fractions, multiply the numerators together and the\n denominators together.",
      },

      fraction: {
        title: "We used an area model to show multiplication of fractions.",
        description:
          "This can be done by multiplying the numerators together and multiplying the denominators together.",
        numerator: "Numerator",
        denominator: "Denominator",
        restart: "Tap “Start Over” to restart the activity.",
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
