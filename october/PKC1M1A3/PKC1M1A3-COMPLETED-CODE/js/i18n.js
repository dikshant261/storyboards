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
        cat: {
          instruction:
            "Count the cats. Click each cat to keep track as you count.",
          question: "How many cats are there:",
        },
        dog: {
          instruction:
            "Count the dogs. Click each dog to keep track as you count.",
          question: "How many dogs are there:",
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
        cat: {
          instruction:
            "Hitung jumlah kucing. Klik setiap kucing untuk melacak hitunganmu.",
          question: "Ada berapa ekor kucing:",
        },
        dog: {
          instruction:
            "Hitung jumlah anjing. Klik setiap anjing untuk melacak hitunganmu.",
          question: "Ada berapa ekor anjing:",
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
