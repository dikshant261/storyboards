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

      title: "Division of Fraction by a Whole number",
      activityComplete: "Activity Completed!",
      wePractice:
        "We practiced dividing a fraction by a whole number by rewriting\n the division as multiplication with the reciprocal of the whole number",
      tapStartOver: "Tap “Start Over” to restart the activity.",
      startpage: {
        weHaveLearned:
          "We learned how to divide a fraction by a whole number \nusing the reciprocal.",
        letPractice: "Now, it’s your turn to try own your own.",
        tapStart: "Tap “Start” to start the activity.",
      },
      mainHeading: "Find the value of the given division.",
      navigation: {
        tapOption: "Tap the option that shows the correct answer.",
        tapNext: "Tap next » to try a new question.",
        tapContinue: "Tap next » to continue",
      },
      reciprocal: "Reciprocal of {{count}}",
      error: {
        errorOne:
          "Oops! You multiplied the numerator by the divisor instead of dividing the fraction.",
        errorTwo:
          "Careful! You divided the denominator instead of dividing the fraction.",
        errorThree:
          "Oops! You flipped the fraction instead of flipping the whole. Try again!",
        success:
          "Well done! That’s exactly how to divide a fraction by a whole number.",
        feedback: "Feedback",
      },
      hint: {
        hint: "Hint",
        heading: "To divide a Fraction by a Whole Number",
        listOne: "Change division(÷) to multiplication(×).",
        listeTwo: "Take the reciprocal of the whole number.",
        listThree: "Multiply the fractions.",
        reciprocal: "Reciprocal",
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

      title: "Pembagian Pecahan dengan Bilangan Bulat",
      activityComplete: "Aktivitas Selesai!",
      wePractice:
        "Kita berlatih membagi pecahan dengan bilangan bulat dengan menulis ulang\n pembagian sebagai perkalian dengan kebalikan dari bilangan bulat.",
      tapStartOver: "Ketuk “Mulai Ulang” untuk mengulang aktivitas.",
      startpage: {
        weHaveLearned:
          "Kita telah belajar cara membagi pecahan dengan bilangan bulat \nmenggunakan kebalikannya.",
        letPractice: "Sekarang, giliranmu untuk mencoba sendiri.",
        tapStart: "Ketuk “Mulai” untuk memulai aktivitas.",
      },
      mainHeading: "Temukan nilai dari pembagian yang diberikan.",
      navigation: {
        tapOption: "Ketuk opsi yang menunjukkan jawaban yang benar.",
        tapNext: "Ketuk berikutnya » untuk mencoba soal baru.",
        tapContinue: "Ketuk berikutnya » untuk melanjutkan",
      },
      reciprocal: "Kebalikan dari {{count}}",
      error: {
        errorOne:
          "Ups! Kamu mengalikan pembilang dengan pembagi alih-alih membagi pecahannya.",
        errorTwo:
          "Hati-hati! Kamu membagi penyebut alih-alih membagi pecahannya.",
        errorThree:
          "Ups! Kamu membalik pecahan alih-alih membalik bilangan bulat. Coba lagi!",
        success:
          "Bagus sekali! Itulah cara membagi pecahan dengan bilangan bulat.",
        feedback: "Umpan balik",
      },
      hint: {
        hint: "Petunjuk",
        heading: "Cara membagi Pecahan dengan Bilangan Bulat",
        listOne: "Ubah pembagian (÷) menjadi perkalian (×).",
        listeTwo: "Ambil kebalikan dari bilangan bulat.",
        listThree: "Kalikan pecahannya.",
        reciprocal: "Kebalikan",
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
