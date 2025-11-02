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
      sceneOne: {
        aCertain: "A certain alloy is made by mixing ",
        twoMetals: "two metals, A and B, in the ratio 7.5 g : 3 g. ",
        ifANew: "If a new sample of the ",
        sameAlloy: "same alloy contains 45 g of metal B, ",
        howManyGrams: "how many grams of metal A does it contain?",

        letFind: "Let’s find the missing term of the ratio using ",
        crossMultiplication: "cross multiplication method.",
      },
      sceneTwo: {
        inAnAlloy: "In an alloy – \nMetal A : Metal B = \n7.5 : 3",
        inSameAlloy: "In same alloy –\nMetal B = 45 g",
      },
      sceneThree: {
        amountOfMetal: "Amount of metal A \nin the new sample",
      },
      sceneFour: {
        letAssume:
          "Let us assume the amount of metal A in the new sample to be",
        xGrams: "𝒳 grams.",
      },
      sceneFive: {
        sinceBoth: "Since both alloys are the same, ",
        theMetal:
          "the ratios of Metal A and Metal B in both alloys will be proportional.",
        qs: " 7.5 : 3 = 𝒳 : 45",
        writeAs: "Write as fractions —\n",
        whichOption:
          "Which option represents the\n correct relationship between\n cross products?",
        error: "No! Observe the arrows, cross multiply and try again.",
        success: "Good Job!",
      },
      given: "Given",
      toFind: "To Find",
      metalA: "Metal A",
      metalB: "Metal B",
      instructions: {
        tapComphrehend: "Tap » to comprehend the challenge. ",
        tapToUnderStand: "Tap » to understand what we need to find.",
        tapToContinue: "Tap » to continue. ",
        correctOption: "Choose the correct option.",
        tapToStartOver: "Activity Completed!, Tap » to start over",
      },
      sceneSix: {
        sloveThis: "Solve this equation to ",
        findTheValue: "find the value of 𝒳",
        findValueX: "What is the correct value of 𝒳?",
        errorOne:
          "No! You divided 45 by 2.5 instead of multiplying. Try again!",
        errorTwo: "Uh-oh! You missed division by 3. Try again!",
        errorThree:
          "So close! You forgot to put decimal point in the answer. Try again!",
        success: "Good job! You found the answer.",
      },
      sceneSeven: {
        soThe: "So, the new sample of alloy has ",
        metalA: "112.5 grams of metal A ",
        metalB: "and 45 grams of metal B.",
        isPerportional: "7.5 : 3  is proportional to  112.5 : 45",
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
        close: "Tutup",
        tryAgain: "Coba Lagi",
      },
      sceneOne: {
        aCertain: "Paduan tertentu dibuat dengan mencampurkan ",
        twoMetals: "dua logam, A dan B, dalam perbandingan 7.5 g : 3 g. ",
        ifANew: "Jika sampel baru dari ",
        sameAlloy: "paduan yang sama mengandung 45 g logam B, ",
        howManyGrams: "berapa gram logam A yang dikandungnya?",
        letFind:
          "Mari kita temukan nilai yang hilang dari perbandingan menggunakan ",
        crossMultiplication: "metode perkalian silang.",
      },
      sceneTwo: {
        inAnAlloy: "Dalam sebuah paduan – \nLogam A : Logam B = \n7.5 : 3",
        inSameAlloy: "Dalam paduan yang sama –\nLogam B = 45 g",
      },
      sceneThree: {
        amountOfMetal: "Jumlah logam A \ndalam sampel baru",
      },
      sceneFour: {
        letAssume: "Anggap jumlah logam A dalam sampel baru adalah",
        xGrams: "𝒳 gram.",
      },
      sceneFive: {
        sinceBoth: "Karena kedua paduan sama, ",
        theMetal:
          "perbandingan logam A dan logam B dalam keduanya akan sebanding.",
        qs: "7.5 : 3 = 𝒳 : 45",
        writeAs: "Tuliskan sebagai pecahan —\n",
        whichOption:
          "Opsi mana yang menunjukkan\n hubungan yang benar antara\n hasil kali silang?",
        error:
          "Tidak! Perhatikan panahnya, lakukan perkalian silang, dan coba lagi.",
        success: "Kerja bagus!",
      },
      given: "Diketahui",
      toFind: "Dicari",
      metalA: "Logam A",
      metalB: "Logam B",
      instructions: {
        tapComphrehend: "Ketuk » untuk memahami tantangannya.",
        tapToUnderStand: "Ketuk » untuk memahami apa yang perlu kita cari.",
        tapToContinue: "Ketuk » untuk melanjutkan.",
        correctOption: "Pilih opsi yang benar.",
        tapToStartOver: "Aktivitas selesai! Ketuk » untuk memulai lagi.",
      },
      sceneSix: {
        sloveThis: "Selesaikan persamaan ini untuk ",
        findTheValue: "menemukan nilai 𝒳",
        findValueX: "Berapa nilai 𝒳 yang benar?",
        errorOne:
          "Tidak! Kamu membagi 45 dengan 2.5 alih-alih mengalikannya. Coba lagi!",
        errorTwo: "Ups! Kamu lupa membagi dengan 3. Coba lagi!",
        errorThree:
          "Hampir benar! Kamu lupa menambahkan tanda desimal dalam jawabannya. Coba lagi!",
        success: "Kerja bagus! Kamu menemukan jawabannya.",
      },
      sceneSeven: {
        soThe: "Jadi, sampel baru dari paduan memiliki ",
        metalA: "112.5 gram logam A ",
        metalB: "dan 45 gram logam B.",
        isPerportional: "7.5 : 3 sebanding dengan 112.5 : 45",
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
