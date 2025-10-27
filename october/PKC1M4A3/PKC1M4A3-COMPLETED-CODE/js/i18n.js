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
      instruction: {
        optionClick: "Click Option",
        tapNext: "Tap » for next question",
      },

      questions: {
        car: {
          instruction:
            "Count the cars. Click each car to keep track as you count.",
          question: "How many cars are there:",
        },
        orange: {
          instruction:
            "Count the oranges. Click each orange to keep track as you count.",
          question: "How many oranges are there:",
        },
        apple: {
          instruction:
            "Count the apples. Click each apple to keep track as you count.",
          question: "How many apples are there:",
        },
      },
      feedback: {
        correct: "Well Done!",
        incorrect: "Oops! That's Incorrect. Try Again.",
      },
      audio: {
        One: "assets/sound/en/one_en.mp3",
        Two: "assets/sound/en/two_en.mp3",
        Three: "assets/sound/en/three_en.mp3",
        Four: "assets/sound/en/four_en.mp3",
        Five: "assets/sound/en/five_en.mp3",
        Six: "assets/sound/en/six_en.mp3",
        Seven: "assets/sound/en/seven_en.mp3",
        Eight: "ssets/sound/en/eight_en.mp3",
        Nine: "assets/sound/en/nine_en.mp3",
        Ten: "assets/sound/en/ten_en.mp3",
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
        startOver: "MULAI ULANG",
        start: "MULAI",
        close: "Tutup",
      },
      instruction: {
        optionClick: "Klik Opsi",
        tapNext: "Ketuk » untuk pertanyaan berikutnya",
      },
      questions: {
        car: {
          instruction:
            "Hitung jumlah mobil. Klik setiap mobil untuk melacak hitunganmu.",
          question: "Ada berapa mobil:",
        },
        orange: {
          instruction:
            "Hitung jumlah jeruk. Klik setiap jeruk untuk melacak hitunganmu.",
          question: "Ada berapa jeruk:",
        },
        apple: {
          instruction:
            "Hitung jumlah apel. Klik setiap apel untuk melacak hitunganmu.",
          question: "Ada berapa apel:",
        },
      },
      feedback: {
        correct: "Bagus sekali!",
        incorrect: "Ups! Jawabanmu salah. Coba lagi.",
      },
      audio: {
        One: "assets/sound/id/one_id.mp3",
        Two: "assets/sound/id/two_id.mp3",
        Three: "assets/sound/id/three_id.mp3",
        Four: "assets/sound/id/four_id.mp3",
        Five: "assets/sound/id/five_id.mp3",
        Six: "assets/sound/id/six_id.mp3",
        Seven: "assets/sound/id/seven_id.mp3",
        Eight: "ssets/sound/id/eight_id.mp3",
        Nine: "assets/sound/id/nine_id.mp3",
        Ten: "assets/sound/id/ten_id.mp3",
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
