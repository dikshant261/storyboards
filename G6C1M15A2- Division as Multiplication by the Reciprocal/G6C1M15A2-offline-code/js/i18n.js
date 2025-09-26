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
        summarise: "Summarise",
        close: "Close",
      },

      title: "Division as multiplication by its reciprocal",
      activityComplete: "Activity Completed!",
      tapStartOver: "Tap “Start Over” to restart the activity.",
      startpage: {
        weHaveLearned:
          "We learned that division by a number is the same as multiplying\n with reciprocal of that number.",
        letPractice:
          "Let’s practice writing division problems as multiplication by their \nreciprocals.",
        tapStart: "Tap “Start” to start the activity.",
      },
      mainHeading:
        "Write the given division problem as multiplication by its reciprocal.",
      navigation: {
        tapOption: "Tap the option that shows the correct answer.",
        tapNext: "Tap next » to try a new question.",
      },
      reciprocal: "Reciprocal of {{count}}",
      error: {
        errorOne:
          "Careful! You need to change division problem to multiplication by its reciprocal.",
        errorTwo:
          "Oops! You took the reciprocal of the dividend instead of the divisor.",
        errorThree:
          "Careful! Write division as multiplication by reciprocal of the divisor.",
        success:
          "Well done! You wrote division problem as multiplication by its reciprocal.",
      },
      hint: {
        hint: "Hint",
        description:
          "Division by a number is the same as multiplying with \n reciprocal of that number.",
        numberOne: "Number 1",
        numberTwo: "Number 2",
        reciprocal: "Reciprocal of",
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
        summarise: "Ringkas",
        close: "Tutup",
      },

      title: "Pembagian sebagai perkalian dengan kebalikannya",
      activityComplete: "Aktivitas Selesai!",
      tapStartOver: "Ketuk “Mulai Ulang” untuk mengulang aktivitas.",
      startpage: {
        weHaveLearned:
          "Kita telah belajar bahwa pembagian dengan suatu bilangan sama dengan mengalikan\n dengan kebalikan dari bilangan tersebut.",
        letPractice:
          "Mari kita berlatih menuliskan soal pembagian sebagai perkalian dengan \n kebalikannya.",
        tapStart: "Ketuk “Mulai” untuk memulai aktivitas.",
      },
      mainHeading:
        "Tulislah soal pembagian yang diberikan sebagai perkalian dengan kebalikannya.",
      navigation: {
        tapOption: "Ketuk opsi yang menunjukkan jawaban yang benar.",
        tapNext: "Ketuk selanjutnya » untuk mencoba soal baru.",
      },
      reciprocal: "Kebalikan dari {{count}}",
      error: {
        errorOne:
          "Hati-hati! Kamu perlu mengubah soal pembagian menjadi perkalian dengan kebalikannya.",
        errorTwo:
          "Ups! Kamu mengambil kebalikan dari pembilang, bukan penyebut.",
        errorThree:
          "Hati-hati! Tuliskan pembagian sebagai perkalian dengan kebalikan dari penyebut.",
        success:
          "Bagus sekali! Kamu menuliskan soal pembagian sebagai perkalian dengan kebalikannya.",
      },
      hint: {
        hint: "Petunjuk",
        description:
          "Pembagian dengan suatu bilangan sama dengan mengalikan dengan \n kebalikan dari bilangan tersebut.",
        numberOne: "Angka 1",
        numberTwo: "Angka 2",
        reciprocal: "Kebalikan dari",
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
