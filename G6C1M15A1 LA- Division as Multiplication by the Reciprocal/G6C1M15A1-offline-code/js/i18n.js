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
      },
      startPageContent: {
        title: "Division as Multiplication by the Reciprocal",
        weLearned:
          "We learned that the reciprocal of a number is found by\n flipping it.",
        nowLetLearn:
          "Now, let’s learn how dividing by a number is the same as\n multiplying with its reciprocal.",
        tapStart: "Tap “Start” to start the activity.",
      },
      sceneOne: {
        contentHeading: "Consider a division problem.",
      },
      sceneTwo: {
        question:
          "Let’s take two wholes to represent 2. But we cannot divide 2 wholes into 3 equal groups without splitting them.",
      },
      navigation: {
        tapNext: "Tap » next to continue.",
        chooseCorrectOption: "Choose the correct answer.",
        tapSummarise: "Tap Summarise.",
        slider: "Use slider to set the divisor and then tap Check.",
        tapNextQuestion: "Tap Next to try a new challenge.",
      },
      sceneThree: {
        nowLetSplit:
          "Now, let’s split the two wholes into as many groups as the divisor.",
        divisor: "Divisor",
      },
      sceneThreeError: {
        success: "Good. You divided 2 wholes equally among 3 groups.",
        errorDecrease:
          " Oops! Decrease the slider to match the divisor in the problem.",
        errorIncrease:
          "Oops! Increase the slider to match the divisor in the problem.",
      },
      sceneFourContent: {
        topHeading: "How much does each group get?",
      },
      sceneFour: {
        success: "Good! Each group gets 2",
        erorrOne:
          "You counted all the parts in a whole. Check the parts in each group.",
        erorrTwo:
          "Oops! You counted all the parts in both wholes. Check the parts in each group.",
      },
      sceneFiveHeading:
        "Notice that dividing 2 by 3 is the same as multiplying 2 by one-third.",
      weCanWrite:
        "We can rewrite division as multiplication by the reciprocal.",
      result: "Result",
      activityCompleted: {
        activity: "Activity Completed!",
        description:
          "Division by a number is the same as multiplying with reciprocal of that number.",
        numberOne: "Number 1",
        numberTwo: "Number 2",
        reciprocalOf: " Reciprocal of ",
        startOver: "Tap “Start Over” to restart the activity.",
      },
      changeSign: "Change sign",
      reciprocal:"Reciprocal"
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
      },
      startPageContent: {
        title: "Pembagian sebagai Perkalian dengan Kebalikan",
        weLearned:
          "Kita telah belajar bahwa kebalikan dari suatu angka didapat dengan membaliknya.",
        nowLetLearn:
          "Sekarang, mari kita pelajari bagaimana membagi dengan suatu angka sama dengan mengalikan dengan kebalikannya.",
        tapStart: "Ketuk “Mulai” untuk memulai aktivitas.",
      },
      sceneOne: {
        contentHeading: "Pertimbangkan sebuah soal pembagian.",
      },
      sceneTwo: {
        question:
          "Mari kita ambil dua utuh untuk mewakili 2. Tapi kita tidak bisa membagi 2 utuh menjadi 3 kelompok yang sama tanpa memecahnya.",
      },
      navigation: {
        tapNext: "Ketuk » berikutnya untuk melanjutkan.",
        chooseCorrectOption: "Pilih jawaban yang benar.",
        tapSummarise: "Ketuk Ringkas.",
        slider: "Gunakan penggeser untuk mengatur pembagi lalu ketuk Periksa.",
        tapNextQuestion: "Ketuk Berikutnya untuk mencoba tantangan baru.",
      },
      sceneThree: {
        nowLetSplit:
          "Sekarang, mari kita pecah dua utuh menjadi sebanyak kelompok sesuai pembaginya.",
        divisor: "Pembagi",
      },
      sceneThreeError: {
        success:
          "Bagus. Kamu membagi 2 utuh secara merata ke dalam 3 kelompok.",
        errorDecrease:
          "Ups! Kurangi penggeser untuk menyesuaikan pembagi dalam soal.",
        errorIncrease:
          "Ups! Tambah penggeser untuk menyesuaikan pembagi dalam soal.",
      },
      sceneFourContent: {
        topHeading: "Berapa banyak yang didapat setiap kelompok?",
      },
      sceneFour: {
        success: "Bagus! Setiap kelompok mendapat 2",
        erorrOne:
          "Kamu menghitung semua bagian dalam satu utuh. Periksa bagian dalam setiap kelompok.",
        erorrTwo:
          "Ups! Kamu menghitung semua bagian dalam dua utuh. Periksa bagian dalam setiap kelompok.",
      },
      sceneFiveHeading:
        "Perhatikan bahwa membagi 2 dengan 3 sama dengan mengalikan 2 dengan sepertiga.",
      weCanWrite:
        "Kita dapat menulis ulang pembagian sebagai perkalian dengan kebalikan.",
      result: "Hasil",
      activityCompleted: {
        activity: "Aktivitas Selesai!",
        description:
          "Membagi dengan suatu angka sama dengan mengalikan dengan kebalikan dari angka tersebut.",
        numberOne: "Angka 1",
        numberTwo: "Angka 2",
        reciprocalOf: " Kebalikan dari ",
        startOver: "Ketuk “Mulai Ulang” untuk mengulang aktivitas.",
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
