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
        letWrite: "Let’s write the ratio in simplest form",
        aFrame:
          "A frame measures 120 cm × 80 cm.\nWhat is the ratio of the length and width of the frame?",
      },

      navigation: {
        tapContinue: "Tap » to solve next challenge.",
        tapProceed: "Tap » to Proceed.",
        tapCorrectOption: "Tap the correct option.",
        slideToMove: "Move the slider to enlarge the small frame.",
      },
      sceneTwo: {
        aFrameMeasure: "A frame measures",
        measurement: "120 cm × 80 cm.\n",
        whatIs: "What is the ratio of the length and width of the frame?",
        showsTheMeasurement:
          "120 cm  ×  80 cm shows the\n measurements of the frame.\n\nLet’s take the larger measurement as\n the length and the smaller\n measurement as the width.",
      },
      sceneThree: {
        given: "Given:",
        lengthOfFrame: "Length of the frame",
        widthOfFrame: "Width of the frame",
        whatIsLength: "What is the length of the\n frame?",
        error: "Not quite. The larger measurement is the length of the frame.",
        success: "Yes! The length is 120 cm. ",
      },
      sceneFour: {
        whatIsWidth: "What is the width of the\n frame?",
        error: "Not quite. The smaller measurement is the width of the frame.",
        success: "That’s right! The width is 80 cm.",
      },
      sceneFive: {
        ratioOfLengthWidth: "Ratio of length to\n width",
        whatIsWidth: "What the ratio of length to \nwidth?",
        letsFind:
          "Let’s find the ratio of the frame’s length to its width using the given measurements.",
        error: "Oops! Remember, the first part of the ratio is for the length.",
        success:
          "Good job! The ratio is 120 : 80 which can also be written as ",
      },
      sceneSix: {
        ratioOfLengthWidth: "Ratio of length to width",
        whatIsWidth: "Represent 120 as a multiple \nof 10.",
        letsFind:
          "Let’s simplify the ratio by expressing each number as a multiple of 10.",
        error: "Not quite! Try again.",
        success: "Correct! \n\n120 can be written as 12 × 10.",
      },
      sceneSeven: {
        whatIsWidth: "Represent 80 as a multiple \nof 10.",
        error: "Not quite! Try again.",
        success: "Correct! \n\n80 can be written as 8 × 10.",
      },
      sceneEight: {
        whatIsWidth: "Can we cancel 10 in both\n numbers?",
        letsFind: "Let’s simplify the ratio.",
        error: "Check again — both terms have 10 as a common factor.",
        success:
          "Yes! You can cancel 10 in both numbers as it is the common factor.",
      },
      sceneNine: {
        whatIsWidth: "Which number divides 12 and \n8 to simplify the ratio?",
        error: "Not quite. To simplify, divide 12 and 8 by their GCF.",
        success:
          "Perfect! The greatest common factor helps simplify the ratio.",
        lcmOf: "LCM of \n12 and 8",
        gcfOf: "GCF of \n12 and 8",
      },
      sceneTen: {
        whatIsWidth: "What is the GCF of 12 and 8.",
        simplestForm: "Simplest form ",
        error: "Not quite! Try again.",
        success: "Yes! 4 is the greatest number that divides both 12 and 8.",
      },
      sceneEleven: {
        whatIsWidth: "What is the simplest form?",
        error: "Oops! Check your order of ratio.",
        correct: "Correct!",
        success:
          "is the simplest form of the ratio, which can also be written as 3 : 2. This means that for every 3 cm of length, there is 2 cm of width. ",
        lengthWidth: "Length : width ",
      },
      sceneTwelve: {
        letsFind:
          "Consider a smaller frame of 3 cm × 2 cm.\nLet’s enlarge it and see if it fits perfectly over the original 120 cm × 80 cm frame.",
        theSmallerFrame:
          "The smaller frame enlarges in the\n same ratio — 3 : 2 — and fits \nperfectly over the original frame. \n\nSo, 3 : 2 is the simplest form of the \nratio 120 : 80.",
      },
      nextQuestion: {
        motherBought:
          "Mother bought 2.8 kg of mangoes and 4.2 kg of oranges \nand placed them in a basket.\n\nWhat is the ratio of the weight of mangoes to oranges?",
      },
      sceneThirteen: {
        motherBought: "Mother bought ",
        mangoes: "2.8 kg of mangoes ",
        and: " and ",
        oranges: "4.2 kg of oranges ",

        andPlaced:
          "and placed them in a basket.\nWhat is the ratio of the weight of mangoes to oranges?",
        ratioOfMangoesOranges: "Ratio of the weight of \nMangoes to oranges ",
        error:
          "Oops! Be careful with the order — it’s mangoes first, then oranges.",
        success: "Good! The ratio of mangoes to oranges is 2.8 : 4.2.",
        whatIsWidth: "Identify the required ratio.",
      },
      sceneFourteen: {
        convertEach: "Convert each decimal to its fraction form.",
        whatIsWidth: "Express 2.8 as a fraction.",
        error:
          "Not quite. 2.8 has one decimal place, so write it as 28 over 10.",
        success: "That’s correct!",
      },
      sceneFifteen: {
        whatIsWidth: "Express 4.2 in fraction form.",
        error:
          "Not quite. 4.2 has one decimal place, so write it as 42 over 10.",
      },
      sceneSixteen: {
        letSimplifyRatio: "Let’s simplify the ratio.",
        canWe: "Can we cancel the common\n factor ",
        inBoth: "in both terms?",
        error: "Not quite. We can remove the common factor ",
        errorFromBoth: " from both terms.",
        success: "That’s correct! Let’s cancel it out.",
      },
      sceneSeventeen: {
        whichNumber: "Which number divides 28 and\n 42 to simplify the ratio?",
        error: "Not quite. To simplify, divide 29 and 42 by their GCF.",
        success:
          "Perfect! The greatest common factor helps simplify the ratio.",
        lcm: "LCM of \n28 and 42",
        gcf: "GCF of 28 and 42",
      },
      sceneEighteen: {
        whatIs: "What is the GCF of 28 and 42.",
        simplestForm: "Simplest form",
        error: "Not quite! Try again.",
        success: "Yes! 14 is the greatest number that divides both 28 and 42.",
      },
      sceneNineteen: {
        whatIs: "What is the simplest form?",
        error: "Oops! Check your order of ratio.",
        success: "That’s correct.",
        ratioOfWeight:
          "2 : 3 is the ratio of the\n weight of mangoes and\n oranges.\n\nThis means that for\n every 2 kg of mangoes\n there are 3 kg of\n oranges.",
      },
      activityComplete: {
        activityComplete: "Activity Completed!",
        youCompleted:
          "You’ve completed solving word problems \nby writing the required ratios \nin their simplest form.",
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
      crossProduct: "Perkalian Silang",

      startPage: {
        letWrite: "Mari tulis perbandingannya dalam bentuk paling sederhana",
        aFrame:
          "Sebuah bingkai berukuran 120 cm × 80 cm.\nBerapa perbandingan panjang dan lebar bingkai tersebut?",
      },

      navigation: {
        tapContinue: "Ketuk » untuk menyelesaikan tantangan berikutnya.",
        tapProceed: "Tap » untuk lanjut.",
        tapCorrectOption: "Tap pilihan yang benar.",
        slideToMove: "Geser slider untuk memperbesar bingkai kecil.",
      },

      sceneTwo: {
        aFrameMeasure: "Sebuah bingkai berukuran",
        measurement: "120 cm × 80 cm.\n",
        whatIs: "Berapa perbandingan panjang dan lebar bingkai?",
        showsTheMeasurement:
          "120 cm × 80 cm menunjukkan\nukuran bingkai.\n\nMari ambil ukuran yang lebih besar sebagai\npanjang dan ukuran yang lebih kecil sebagai lebar.",
      },

      sceneThree: {
        given: "Diketahui:",
        lengthOfFrame: "Panjang bingkai",
        widthOfFrame: "Lebar bingkai",
        whatIsLength: "Berapa panjang\nbingkai?",
        error: "Belum tepat. Ukuran yang lebih besar adalah panjang bingkai.",
        success: "Ya! Panjangnya adalah 120 cm.",
      },

      sceneFour: {
        whatIsWidth: "Berapa lebar bingkai?",
        error: "Belum tepat. Ukuran yang lebih kecil adalah lebar bingkai.",
        success: "Benar! Lebarnya adalah 80 cm.",
      },

      sceneFive: {
        ratioOfLengthWidth: "Perbandingan panjang terhadap\nlebar",
        whatIsWidth: "Berapa perbandingan panjang terhadap lebar?",
        letsFind:
          "Mari kita cari perbandingan panjang bingkai terhadap lebarnya menggunakan ukuran yang diberikan.",
        error: "Ups! Ingat, bagian pertama dari perbandingan adalah panjang.",
        success:
          "Bagus! Perbandingannya adalah 120 : 80 yang juga dapat ditulis sebagai",
      },

      sceneSix: {
        ratioOfLengthWidth: "Perbandingan panjang terhadap lebar",
        whatIsWidth: "Tuliskan 120 sebagai kelipatan\n10.",
        letsFind:
          "Mari sederhanakan perbandingan dengan menuliskan setiap angka sebagai kelipatan 10.",
        error: "Belum tepat! Coba lagi.",
        success: "Benar!\n\n120 dapat ditulis sebagai 12 × 10.",
      },

      sceneSeven: {
        whatIsWidth: "Tuliskan 80 sebagai kelipatan\n10.",
        error: "Belum tepat! Coba lagi.",
        success: "Benar!\n\n80 dapat ditulis sebagai 8 × 10.",
      },

      sceneEight: {
        whatIsWidth: "Bisakah kita mencoret angka 10 pada\nkeduanya?",
        letsFind: "Mari kita sederhanakan perbandingan.",
        error: "Periksa kembali — kedua angka memiliki faktor 10.",
        success:
          "Ya! Kamu dapat mencoret angka 10 pada keduanya karena merupakan faktor yang sama.",
      },

      sceneNine: {
        whatIsWidth:
          "Bilangan berapa yang membagi 12 dan 8 untuk menyederhanakan perbandingan?",
        error:
          "Belum tepat. Untuk menyederhanakan, bagi 12 dan 8 dengan FPB-nya.",
        success:
          "Bagus! Faktor Persekutuan Terbesar membantu menyederhanakan perbandingan.",
        lcmOf: "KPK dari\n12 dan 8",
        gcfOf: "FPB dari\n12 dan 8",
      },

      sceneTen: {
        whatIsWidth: "Berapa FPB dari 12 dan 8?",
        simplestForm: "Bentuk paling sederhana",
        error: "Belum tepat! Coba lagi.",
        success: "Ya! 4 adalah bilangan terbesar yang membagi 12 dan 8.",
      },

      sceneEleven: {
        whatIsWidth: "Apa bentuk paling sederhananya?",
        error: "Ups! Periksa urutan perbandingan.",
        correct: "Benar!",
        success:
          "adalah bentuk paling sederhana dari perbandingan, yang juga dapat ditulis sebagai 3 : 2. Ini berarti untuk setiap 3 cm panjang, terdapat 2 cm lebar.",
        lengthWidth: "Panjang : lebar",
      },

      sceneTwelve: {
        letsFind:
          "Pertimbangkan bingkai kecil berukuran 3 cm × 2 cm.\nMari kita perbesar dan lihat apakah ukurannya sama dengan bingkai 120 cm × 80 cm.",
        theSmallerFrame:
          "Bingkai kecil membesar dalam perbandingan yang sama — 3 : 2 — dan cocok\nsempurna dengan bingkai asli.\n\nJadi, 3 : 2 adalah bentuk paling sederhana dari\nperbandingan 120 : 80.",
      },

      nextQuestion: {
        motherBought:
          "Ibu membeli 2,8 kg mangga dan 4,2 kg jeruk\n dan meletakkannya dalam keranjang.\n\nBerapa perbandingan berat mangga terhadap jeruk?",
      },

      sceneThirteen: {
        motherBought: "Ibu membeli ",
        mangoes: "2.8 kg mangga ",
        and: "dan",
        oranges: "4.2 kg jeruk ",
        andPlaced:
          "dan meletakkannya dalam keranjang.\nBerapa perbandingan berat mangga terhadap jeruk?",
        ratioOfMangoesOranges: "Perbandingan berat\nmangga terhadap jeruk ",
        error: "Ups! Hati-hati dengan urutan — mangga dulu baru jeruk.",
        success: "Bagus! Perbandingan mangga terhadap jeruk adalah 2.8 : 4.2.",
        whatIsWidth: "Identifikasi perbandingan yang diperlukan.",
      },

      sceneFourteen: {
        convertEach: "Ubah setiap desimal ke bentuk pecahannya.",
        whatIsWidth: "Tuliskan 2.8 sebagai pecahan.",
        error:
          "Belum tepat. 2.8 memiliki satu angka desimal, jadi tulis sebagai 28 per 10.",
        success: "Benar!",
      },

      sceneFifteen: {
        whatIsWidth: "Tuliskan 4.2 sebagai pecahan.",
        error:
          "Belum tepat. 4.2 memiliki satu angka desimal, jadi tulis sebagai 42 per 10.",
      },

      sceneSixteen: {
        letSimplifyRatio: "Mari sederhanakan perbandingan.",
        canWe: "Bisakah kita mencoret faktor\nyang sama ",
        inBoth: "pada kedua angka?",
        error: "Belum tepat. Kita dapat menghilangkan faktor yang sama ",
        errorFromBoth: " dari kedua angka.",
        success: "Benar! Ayo kita coret.",
      },

      sceneSeventeen: {
        whichNumber:
          "Bilangan berapa yang membagi 28 dan\n42 untuk menyederhanakan perbandingan?",
        error:
          "Belum tepat. Untuk menyederhanakan, bagi 28 dan 42 dengan FPB-nya.",
        success:
          "Bagus! Faktor Persekutuan Terbesar membantu menyederhanakan perbandingan.",
        lcm: "KPK dari\n28 dan 42",
        gcf: "FPB dari 28 dan 42",
      },

      sceneEighteen: {
        whatIs: "Berapa FPB dari 28 dan 42?",
        simplestForm: "Bentuk paling sederhana",
        error: "Belum tepat! Coba lagi.",
        success: "Ya! 14 adalah bilangan terbesar yang membagi 28 dan 42.",
      },

      sceneNineteen: {
        whatIs: "Apa bentuk paling sederhananya?",
        error: "Ups! Periksa urutan perbandingan.",
        success: "Benar.",
        ratioOfWeight:
          "2 : 3 adalah perbandingan\nberat mangga dan jeruk.\n\nIni berarti untuk setiap 2 kg mangga,\nada 3 kg jeruk.",
      },

      activityComplete: {
        activityComplete: "Aktivitas Selesai!",
        youCompleted:
          "Kamu telah menyelesaikan soal cerita\ndengan menuliskan perbandingan dalam\nbentuk paling sederhana.",
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
