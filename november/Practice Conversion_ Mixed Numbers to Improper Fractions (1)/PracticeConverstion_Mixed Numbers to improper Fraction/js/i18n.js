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
        replyButton: "Replay\nTransformation",
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
        tapCorrectOption: "Tap the correct option.",
        tapShowAnimation: "Tap » to see the transformation.",
        tapNext:
          "Tap ‘Replay’ to see the animation again, or » for another challenge.",
      },
      startPage: {
        mixedNumbersAndImproperFractions:
          "Mixed Numbers and Improper Fractions",
        mixedNumbers: "Mixed Numbers",
        and: " and ",
        improperFractions: "Improper Fractions\n",
        areUsed: "are used to denote numbers that are\n",
        greaterThan: "greater than One Whole!\n\n",
        itsVeryUsefull:
          "It is very useful to be able to convert\nsuch values from one form to another.\n\nTap “Start” to try a few challenges\non such conversions.",
      },
      sceneTwo: {
        expressTheGiven:
          "Express the given mixed number into an improper fraction.",
      },
      feedback: {
        success: "Great job! \nThat’s the correct answer.",
        opps: "Oops!",
        is: " is ",
        isProper: "is a proper fraction.",
      },
      activityCompleted: {
        activityCompleted: "Activity Completed!",
        mixedNumbers: "Mixed Numbers ",
        and: "and ",
        improperFractions: "Improper Fractions ",
        areUsed: "are used\n",
        toDenote: "to denote numbers that are ",
        greaterThanOne: "greater than One Whole!\n\n",
        fromAMixedFraction:
          "From a mixed number, we simply multiply the denominator\n with the whole number and add the numerator\nnto get the numerator of the improper fraction!\n\nTap “Start Over” to repeat this activity",
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
        startOver: "MULAI LAGI",
        start: "MULAI",
        replyButton: "Putar Ulang\nTransformasi",
      },
      length: "Panjang",
      width: "Lebar",
      ml: "ml",
      l: "L",
      paintA: "Cat A",
      paintB: "Cat B",
      red: "merah",
      blue: "biru",
      crossProduct: "Perkalian Silang ",
      startPage: {
        letWrite: "Mari tulis perbandingan dalam bentuk paling sederhana",
        aFrame:
          "Sebuah bingkai berukuran 120 cm × 80 cm.\nBerapa perbandingan panjang dan lebar bingkai tersebut?",
      },
      navigation: {
        tapCorrectOption: "Ketuk opsi yang benar.",
        tapShowAnimation: "Ketuk » untuk melihat transformasi.",
        tapNext:
          "Ketuk 'Putar Ulang' untuk melihat animasi lagi, atau » untuk tantangan berikutnya.",
      },
      startPage: {
        mixedNumbersAndImproperFractions:
          "Pecahan Campuran dan Pecahan Tidak Sebenarnya",
        mixedNumbers: "Pecahan Campuran",
        and: " dan ",
        improperFractions: "Pecahan Tidak Sebenarnya\n",
        areUsed: "digunakan untuk menyatakan bilangan yang\n",
        greaterThan: "lebih besar dari Satu Utuh!\n\n",
        itsVeryUsefull:
          "Sangat berguna untuk dapat mengubah\nnilai-nilai tersebut dari satu bentuk ke bentuk lainnya.\n\nKetuk “Mulai” untuk mencoba beberapa tantangan\nmengenai konversi seperti ini.",
      },
      sceneTwo: {
        expressTheGiven:
          "Ubah pecahan campuran berikut menjadi pecahan tidak sebenarnya.",
      },
      feedback: {
        success: "Kerja bagus! \nItu jawaban yang benar.",
        opps: "Ups!",
        is: " adalah ",
        isProper: "adalah pecahan sebenarnya.",
      },
      activityCompleted: {
        activityCompleted: "Aktivitas Selesai!",
        mixedNumbers: "Pecahan Campuran ",
        and: "dan ",
        improperFractions: "Pecahan Tidak Sebenarnya ",
        areUsed: "digunakan\n",
        toDenote: "untuk menyatakan bilangan yang ",
        greaterThanOne: "lebih besar dari Satu Utuh!\n\n",
        fromAMixedFraction:
          "Dari pecahan campuran, kita cukup mengalikan penyebut\n dengan bilangan bulat dan menambahkan pembilangnya\nuntuk mendapatkan pembilang dari pecahan tidak sebenarnya!\n\nKetuk “Mulai Lagi” untuk mengulangi aktivitas ini.",
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
