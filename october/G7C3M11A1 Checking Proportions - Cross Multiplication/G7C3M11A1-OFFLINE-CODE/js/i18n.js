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
        yes: "Yes",
        no: "No",
      },
      length: "Length",
      width: "Width",
      ml: "ml",
      l: "L",
      paintA: "Paint A",
      paintB: "Paint B",
      red: "red",
      blue: "blue",
      crossProduct: "Cross Product ",
      startPage: {
        checkProportionality: "Let’s check proportionality!",
        getPurple: "We get purple when we mix \nred and blue!",
        mixGiven:
          "Let’s mix given amounts of red and blue \npaints and check if their ratios are in\n proportion.",
      },

      navigation: {
        tapStart: "Tap ≫ to start computing the ratios.",
        enterEach: "Enter each ratio term using the numpad and tap ‘check’",
        tapSimplify: "Tap ≫ to simplify the ratio.",
        tapRatioPaintB: "Tap ≫ to fill ratio of Paint {{paint}}.",
        tapForCross: "Tap ≫ to cross-multiply the ratios.",
        tapForNextPair: "Tap ≫ to cross-multiply the next pair of terms.",
        tapForNextChallange: "Tap ≫ for another challenge.",
        tapCheckRatio: "Tap ≫ to check proportionality.",
        obServeCross: "Observe the cross products and tap yes or no.",
        nextQuestion: "Tap ≫ for another challenge.",
        Tap: "Tap ≫",
      },

      sceneTwo: {
        clickIf: "Check if the",
        ratioOfRed: "ratio of red to blue",
        inPaintA: "in Paint A and Paint B are in proportion.",
        keypadHeading:
          "Let's test if the ratios of red to blue in Paint A and Paint B are proportional using cross-multiplication method. ",
      },
      sceneThree: {
        expressThe: "Express the ratio of",
        lengthRatio: "red to blue paint",
        frameA: "in Paint {{paint}} as a fraction.",
        termA: "Enter the first term in the ratio for Paint {{paint}}.",
        termB: "Enter the second term in the ratio for Paint {{paint}}.",
      },

      sceneFive: {
        findProduct: "Find the product of {{num1}} and {{num2}}.",
        letsDoCross: "Let’s do the cross-multiplication!",
      },
      sceneSeven: {
        expressThe: "Express the ratio of ",
        lengthRatio: "red to blue paint ",
        frameA: "in Paint A and Paint B are in proportion.",
        sideKeypadHeading:
          "Is the ratio of red to blue\n in Paint A proportional\n to the ratio of red to\n blue in Paint B?",
      },
      feedBack: {
        errorOne: "Oops! We start with red paint first.Try again!",
        errorTwo:
          "Oops! The second term shows the amount of blue paint.Try again!",
        success:
          "Good job. The ratio of red to blue paints in Paint {{frame}} is ",
        crossError: "Not quite! {{num1}} × {{num2}} is not equal to {{ans}}.",
        crossSuccess: "Good job. \n{{num1}} × {{num2}} = {{ans}}.",
        yesError:
          "Oops!\n Observe the purple shade of Paint A and Paint B are different.\n\nFor the ratios to be proportional, the cross-products should be equal.",
        yesSuccess:
          "Correct!\nThe cross-products are not equal, so the ratio of red to blue in Paint A is not proportional to ratio of red to blue in Paint B. \n\nThat’s why the purple shades don’t match.",
        yesSuccessOne:
          "Correct! \nThe cross-products are equal, so the ratio of red to blue in Paint A is proportional to ratio of red to blue in Paint B. \n\nThat’s why the purple shades are same.",
        yesErrorOne:
          "Oops!\n See how the purple shade of Paint A and Paint B match?\n\nFor the ratios to be proportional, the cross-products should be equal.",
      },
      activityComplete: {
        activityComplete: "Activity Completed!",
        whenRatio:
          "When ratio of red and blue paints are in \nproportion, paint A and paint B had the same shade.\n\n\nWhen the two cross products of the ratios are equal,\n then the ratios are in proportion.",
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
        tryAgain: "Coba Lagi",
        yes: "Ya",
        no: "Tidak",
      },

      length: "Panjang",
      width: "Lebar",
      ml: "ml",
      l: "L",
      paintA: "Cat A",
      paintB: "Cat B",
      red: "merah",
      blue: "biru",
      crossProduct: "Hasil Kali Silang",

      startPage: {
        checkProportionality: "Mari periksa proporsionalitas!",
        getPurple:
          "Kita mendapatkan warna ungu saat \nmencampur cat merah dan biru!",
        mixGiven:
          "Mari kita campur jumlah cat merah\n dan biru yang diberikan \ndan periksa apakah perbandingannya sebanding.",
      },

      navigation: {
        tapStart: "Ketuk ≫ untuk mulai menghitung perbandingan.",
        enterEach:
          "Masukkan setiap nilai perbandingan menggunakan keypad dan ketuk ‘periksa’.",
        tapSimplify: "Ketuk ≫ untuk menyederhanakan perbandingan.",
        tapRatioPaintB: "Ketuk ≫ untuk mengisi perbandingan Cat {{paint}}.",
        tapForCross: "Ketuk ≫ untuk melakukan perkalian silang perbandingan.",
        tapForNextPair: "Ketuk ≫ untuk menyilangkan pasangan berikutnya.",
        tapForNextChallange: "Ketuk ≫ untuk tantangan berikutnya.",
        tapCheckRatio: "Ketuk ≫ untuk memeriksa proporsionalitas.",
        obServeCross: "Amati hasil kali silang dan ketuk ya atau tidak.",
        nextQuestion: "Ketuk ≫ untuk pertanyaan berikutnya.",
        Tap: "Ketuk ≫",
      },

      sceneTwo: {
        clickIf: "Periksa apakah",
        ratioOfRed: "perbandingan cat merah dengan biru",
        inPaintA: "pada Cat A dan Cat B adalah sebanding.",
        keypadHeading:
          "Mari periksa apakah perbandingan cat merah dan biru pada Cat A dan Cat B sebanding menggunakan metode perkalian silang.",
      },

      sceneThree: {
        expressThe: "Nyatakan perbandingan",
        lengthRatio: "cat merah dengan biru",
        frameA: "pada Cat {{paint}} sebagai pecahan.",
        termA: "Masukkan nilai pertama dalam perbandingan untuk Cat {{paint}}.",
        termB: "Masukkan nilai kedua dalam perbandingan untuk Cat {{paint}}.",
      },

      sceneFive: {
        findProduct: "Temukan hasil dari {{num1}} dan {{num2}}.",
        letsDoCross: "Mari lakukan perkalian silang!",
      },

      sceneSeven: {
        expressThe: "Nyatakan perbandingan ",
        lengthRatio: "cat merah dengan biru ",
        frameA: "pada Cat A dan Cat B apakah sebanding.",
        sideKeypadHeading:
          "Apakah perbandingan cat merah\ndengan biru pada Cat A\nsebanding dengan Cat B?",
      },

      feedBack: {
        errorOne: "Ups! Kita mulai dengan cat merah dulu. Coba lagi!",
        errorTwo: "Ups! Nilai kedua menunjukkan jumlah cat biru. Coba lagi!",
        success:
          "Bagus. Perbandingan cat merah dan biru pada Cat {{frame}} adalah ",
        crossError:
          "Tidak tepat! {{num1}} × {{num2}} tidak sama dengan {{ans}}.",
        crossSuccess: "Bagus. \n{{num1}} × {{num2}} = {{ans}}.",
        yesError:
          "Ups!\n Amati bahwa warna ungu pada Cat A dan Cat B berbeda.\n\nAgar perbandingan sebanding, hasil kali silang harus sama.",
        yesSuccess:
          "Benar!\nHasil kali silang tidak sama, jadi perbandingan cat merah dan biru pada Cat A tidak sebanding dengan Cat B.\n\nKarena itu warna ungunya tidak sama.",
        yesSuccessOne:
          "Benar!\nHasil kali silang sama, jadi perbandingan cat merah dan biru pada Cat A sebanding dengan Cat B.\n\nKarena itu warna ungunya sama.",
        yesErrorOne:
          "Ups!\n Lihat bagaimana warna ungu pada Cat A dan Cat B cocok?\n\nAgar perbandingan sebanding, hasil kali silang harus sama.",
      },

      activityComplete: {
        activityComplete: "Aktivitas Selesai!",
        whenRatio:
          "Ketika perbandingan cat merah dan biru sebanding,\nCat A dan Cat B memiliki warna yang sama.\n\n\nKetika hasil kali silang dari dua perbandingan sama,\n maka perbandingan tersebut sebanding.",
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
