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
        check: "Check",
        tryAgain: "Try Again",
      },
      length: "Length",
      width: "Width",
      frameA: "Frame A",
      frameB: "Frame B",
      frameC: "Frame C",
      startPage: {
        findingFrames: "Finding Frames That Are in Proportion",
        picture: "Look at the picture frame!",
        verticalside:
          "The vertical side shows the length, and\n the horizontal side shows the width.",
        letFind: "\n\nLet’s find the ratio of",
        length: "length : width",
        andCheck: "and \ncheck which frames are in proportion!",
      },

      navigation: {
        tapStart: "Tap ≫ to start computing the ratios.",
        enterEach: "Enter each ratio term using the numpad and tap ‘check’",
        tapSimplify: "Tap ≫ to simplify the ratio.",
        tapRatioFrameB: "Tap ≫ to fill ratio of frame {{frame}}.",
        tapFindProportion: "Tap ≫ to identify frames in proportion.",
        tapTwoFrame: "Tap 2 frames that are in proportion.",
        tapForNextChallange: "Tap ≫ for another challenge.",
      },

      sceneTwo: {
        heading: "Which two picture frames are in proportion?",
        keypadHeading:
          "Frames are said to be\n in proportion if the\n ratio of their sides \nare in proportion.",
      },
      sceneThree: {
        whatIs: "What is the",
        lengthRatio: "length : width ratio",
        frameA: "for Frame {{frame}}?",
        whichTwo: "Which two picture frames are in proportion?",
      },
      feedBack: {
        errorOne:
          "Oops! The required ratio is length : width of Frame {{frame}}. The vertical measure is length.Try again.",
        errorTwo:
          "Oops! The required ratio is length : width of Frame {{frame}}. The horizontal measure is width. Try again.",
        success:
          "Good job. The sides are in the ratio {{num1}} : {{num2}} in Frame {{frame}} .",
        errorThree:
          "Not quite! Try dividing {{response}} by the GCF of\n ({{num1}}, {{num2}}).",
        successTwo:
          "Good job. The simplest form of sides-ratio for Frame {{frame}} is {{num1}} : {{num2}}.",
      },
      sceneNine: {
        error:
          "Oops! See Frame A doesn’t fit Frame B when enlarged.\n\nThe simplest form of the sides-ratio of these frames should be equal to be proportional.",
        success:
          "Yay! Frame A exactly fits Frame C when enlarged.\n\nThe simplest form of their sides-ratio are equal (5 : 3) .That means the frames are in proportion.",
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
