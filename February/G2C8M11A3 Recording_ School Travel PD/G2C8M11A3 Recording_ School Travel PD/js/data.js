// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

const questionTextSize = '36gc';
const highlightTextSize = "28gc";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Vertical Picture Diagram"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Dispatched page change event to page 2",
        previousButtonPage1: "Dispatched page change event to page 1"
      },
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: 'Start',
        check: 'Check',
        begin: 'Begin'
      },

      feedback: {
        correct: 'Great job!',
        allCorrect: 'All correct!',
        tryAgain: 'Try again',
        notEnough: 'Uh-oh! Not enough shapes. Add more hearts.',
        manyStars: "Uh-oh! Too many shapes. Remove the extra hearts.",
        thatIsCorrect: 'Yay! You recorded the {type} count correctly.',
        dropInsideCell: 'Drop inside the cell',
        itemRemoved: 'Item removed',
        chooseCorrectShape: 'Oops! That shape is not for bicycles. Choose the correct heart.',
        chooseCorrectShapeSandwich: 'Oops! That’s not the right shape. Use the correct heart for walking.',
        chooseCorrectShapePizza: 'Oops! That’s not the right shape. Use the correct heart for school bus.',
        placeIceCreamRow: 'Oops! This shape is in the wrong row. Place it in the bicycle row.',
        placePizzaRow: 'Oops! This shape is in the wrong row. Place it in the school bus row.',

        placeSandwichesRow: 'Oops! This shape is in the wrong row. Place it in the walking row.',
        placedShape: 'Yay! You placed a heart.<br>This represents {num} {student} come to school by {fruit}'
      },

      common: {
        foodSold: "Ways to Come to School Picture Diagram",
        eachShape: 'Each shape = 1 student',
        useTheseShapes: 'Use these shapes : ',
        options: '<span><ul style="line-height:2.5"><li>Walking → </li><li>Bicycle → </li><li>School bus → </li></ul></span>',

        school: {
          walking: 'Walking',
          bicycle: 'Bicycle',
          schoolBus: 'School bus',
          school: 'School',
          student: 'Student',
          students: 'Students'
        },
        labels: {
          dropHere: "Drop here"
        },
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find"
        },
        conceptSummary: {
          header: "CONCEPT SUMMARY",
          given: "Given",
          toFind: "To Find",
          keyConcepts: "Key Concepts",
          importantFormulae: "Calculations"
        },
        amountBeniGiveToGrandMother: "Amount Beni gave\n to his grandfather.",
        amountOfBika: "Amount of Bika\n Ambon left with Beni"
      },

      components: {
        informationAnalysis: {
          headerText: "INFORMATION ANALYSIS",
          factsTitle: "Facts",
          valueTitle: "Value",
          toFindTitle: "To Find"
        },
        conceptSummary: {
          headerText: "CONCEPT SUMMARY",
          givenTitle: "Given",
          toFindTitle: "To Find",
          keyConceptsTitle: "Key Concepts",
          importantFormulaeTitle: "Calculations"
        }
      },

      pages: {
        page1: {
          title: "Let’s Build a Vertical Picture Diagram!",
          mainText:
            "Students come to school in different ways.<br/><br/>Some walk, some ride a bicycle, and some come by school bus. <br/><br/>Let’s record this data in a picture diagram.",
        },
        page2: {
          headerText: 'Let’s use heart shapes to record the data in the picture diagram.',
          footerInstruction: "Tap » to continue.",
          instructionAfterQuiz: 'Tap » to proceed',
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page3: {
          headerText: 'There are <span style="color:#ffff">5 students</span> who come to school by <span style="color:#ffff">bicycle</span>.',
          footerInstruction: "Drag the correct shape to the correct row. Then tap 'Check'.. ",
          instructionAfterQuiz: "Tap » to continue.",
        },
        page4: {
          headerText: 'There are <span style="color:#ffff">7 students</span> who come to school by <span style="color:#ffff">walking</span>.',
          footerInstruction: "Drag the correct shape to the correct row. Then tap 'Check'.. ",
          instructionAfterQuiz: "Tap » to continue.",
        },
        page5: {
          headerTextFontSize:'43gc',
          headerText: 'There are <span style="color:#ffff">same</span> number of students come <span style="color:#ffff">by school bus and by walking</span>.',
          footerInstruction: "Drag the correct shape to the correct row. Then tap 'Check'.. ",
          instructionAfterQuiz: "Tap » to finish.",
        },


        page6: {
          mainText:
            "Fantastic work!<br/><br/>You used clues and correct<br/> shapes to record data in a<br/> picture diagram.",
          summaryImage: 'assets/schoolPictureDiagram-En.png'
        },

      },
    },
    id: {
      appInfo: {
        title: "Diagram Gambar Vertikal"
      },

      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Mengirim event perubahan halaman ke halaman 2",
        previousButtonPage1: "Mengirim event perubahan halaman ke halaman 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        check: "Periksa",
        begin: "Mulai"
      },

      feedback: {
        correct: "Kerja bagus!",
        allCorrect: "Semua benar!",
        tryAgain: "Coba lagi",
        notEnough: "Uh-oh! Bentuknya belum cukup. Tambahkan lebih banyak hati.",
        manyStars: "Uh-oh! Terlalu banyak bentuk. Hapus hati yang berlebihan.",
        thatIsCorrect: "Yeay! Kamu mencatat jumlah {type} dengan benar.",
        dropInsideCell: "Letakkan di dalam kotak",
        itemRemoved: "Item dihapus",

        chooseCorrectShape: "Ups! Bentuk itu bukan untuk sepeda. Pilih hati yang benar.",
        chooseCorrectShapeSandwich: "Ups! Itu bukan bentuk yang tepat. Gunakan hati yang benar untuk berjalan kaki.",
        chooseCorrectShapePizza: "Ups! Itu bukan bentuk yang tepat. Gunakan hati yang benar untuk bus sekolah.",

        placeIceCreamRow: "Ups! Bentuk ini berada di baris yang salah. Letakkan di baris sepeda.",
        placePizzaRow: "Ups! Bentuk ini berada di baris yang salah. Letakkan di baris bus sekolah.",
        placeSandwichesRow: "Ups! Bentuk ini berada di baris yang salah. Letakkan di baris berjalan kaki.",

        placedShape: "Yeay! Kamu menempatkan sebuah hati.<br>Ini menunjukkan {num} {student} datang ke sekolah dengan {fruit}"
      },

      common: {
        foodSold: "Diagram Gambar Cara Datang ke Sekolah",
        eachShape: "Setiap bentuk = 1 siswa",
        useTheseShapes: "Gunakan bentuk berikut:",
        options:
          "<span><ul style='line-height:2.5'><li>Berjalan kaki → </li><li>Sepeda → </li><li>Bus sekolah → </li></ul></span>",

        school: {
          walking: "Berjalan kaki",
          bicycle: "Sepeda",
          schoolBus: "Bus sekolah",
          school: "Sekolah",
          student: "Siswa",
          students: "Siswa"
        },

        labels: {
          dropHere: "Letakkan di sini"
        },

        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Yang Dicari"
        },

        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Yang Dicari",
          keyConcepts: "Konsep Penting",
          importantFormulae: "Perhitungan"
        },

        amountBeniGiveToGrandMother: "Jumlah yang Beni berikan\nkepada kakeknya.",
        amountOfBika: "Jumlah Bika Ambon\nyang tersisa pada Beni"
      },

      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Yang Dicari"
        },
        conceptSummary: {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
          toFindTitle: "Yang Dicari",
          keyConceptsTitle: "Konsep Penting",
          importantFormulaeTitle: "Perhitungan"
        }
      },

      pages: {

        page1: {
          title: "Mari Membuat Diagram Gambar Vertikal!",
          mainText:
            "Siswa datang ke sekolah dengan berbagai cara.<br/><br/>Ada yang berjalan kaki, ada yang naik sepeda, dan ada yang naik bus sekolah.<br/><br/>Mari kita catat data ini dalam diagram gambar."
        },

        page2: {
          headerText: "Mari gunakan bentuk hati untuk mencatat data pada diagram gambar.",
          footerInstruction: "Ketuk » untuk melanjutkan.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          verticalTextDiagram: "Diagram Gambar Vertikal"
        },

        page3: {
          headerText:
            "Ada <span style='color:#ffff'>5 siswa</span> yang datang ke sekolah dengan <span style='color:#ffff'>sepeda</span>.",
          footerInstruction:
            "Seret bentuk yang benar ke baris yang tepat. Lalu ketuk 'Periksa'.",
          instructionAfterQuiz:
            "Ketuk » untuk melanjutkan."
        },

        page4: {
          headerText:
            "Ada <span style='color:#ffff'>7 siswa</span> yang datang ke sekolah dengan <span style='color:#ffff'>berjalan kaki</span>.",
          footerInstruction:
            "Seret bentuk yang benar ke baris yang tepat. Lalu ketuk 'Periksa'.",
          instructionAfterQuiz:
            "Ketuk » untuk melanjutkan."
        },

        page5: {
          headerTextFontSize:'42gc',
          headerText:
            "Jumlah siswa yang datang dengan <span style='color:#ffff'>bus sekolah</span> sama dengan jumlah siswa yang datang dengan <span style='color:#ffff'>berjalan kaki</span>.",
          footerInstruction:
            "Seret bentuk yang benar ke baris yang tepat. Lalu ketuk 'Periksa'.",
          instructionAfterQuiz:
            "Ketuk » untuk menyelesaikan."
          
        },

        page6: {
          mainText:
            "Kerja yang luar biasa!<br/><br/>Kamu menggunakan <br/>petunjuk dan bentuk<br/> yang tepat<br/>untuk mencatat data dalam diagram gambar.",
          summaryImage: "assets/schoolPictureDiagram-Id.png"
        }

      }
    }

  },
};

// Indonesian ('id') translations are defined explicitly above.

// Simple i18n utility functions
const i18n = {
  // Get translated text
  t: (key, params = {}) => {
    const lang = AppData.currentLanguage;
    const translation = AppData.translations[lang];

    // Navigate through nested object using dot notation
    const keys = key.split(".");
    let value = translation;
    let found = true;

    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        found = false;
        break;
      }
    }

    // If not found in current language, try English fallback
    if (!found) {
      value = AppData.translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return `[Missing: ${key}]`;
        }
      }
    }

    // If value is undefined or null, return missing message
    if (value === undefined || value === null) {
      return `[Missing: ${key}]`;
    }

    // Replace parameters in string
    if (typeof value === "string") {
      return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params.hasOwnProperty(param) ? params[param] : match;
      });
    }

    // Return value as-is (could be array, object, number, boolean, etc.)
    return value;
  },

  // Set the current language
  setLanguage: (langCode) => {
    console.log(`🌐 Attempting to set language to: ${langCode}`);
    console.log(`🌐 Available languages:`, Object.keys(AppData.translations));
    console.log(`🌐 Current language before change:`, AppData.currentLanguage);

    if (AppData.translations[langCode]) {
      AppData.currentLanguage = langCode;
      console.log(`✅ Language successfully set to: ${langCode}`);
      console.log(`🌐 Current language after change:`, AppData.currentLanguage);
      return true;
    } else {
      console.warn(
        `❌ Language '${langCode}' not supported. Available languages:`,
        Object.keys(AppData.translations)
      );
      return false;
    }
  },

  // Get the current language
  getCurrentLanguage: () => {
    return AppData.currentLanguage;
  },

  // Initialize language system (placeholder for compatibility)
  initLanguage: () => {
    console.log("🌐 i18n system initialized");
    return true;
  },

  // Helper function to get page data
  getPageData: (pageNumber) => {
    const lang = AppData.currentLanguage;
    const translation = AppData.translations[lang];

    if (translation.pages && translation.pages[`page${pageNumber}`]) {
      return translation.pages[`page${pageNumber}`];
    }

    // Fallback to English
    const enTranslation = AppData.translations.en;
    if (enTranslation.pages && enTranslation.pages[`page${pageNumber}`]) {
      return enTranslation.pages[`page${pageNumber}`];
    }

    return null;
  },
};

// Make i18n globally available
window.i18n = i18n;
