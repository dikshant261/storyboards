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
        nextButtonPage3: "Dispatched page change event to page 3",
        nextButtonPage4: "Dispatched page change event to page 4",
        nextButtonPage5: "Dispatched page change event to page 5",
        previousButtonPage1: "Dispatched page change event to page 1",
        lastPageStartingOver: "Last page - Starting over",
        navigationReset: "Resetting to question 1",
        navigationComplete: "Complete app reset completed - ready for new question"
      },
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: 'Start',
        check: 'Check'
      },
      heartCoordinates:{
        pinkHeart: [420, 340, 520, 400],
        yellowHeart: [420, 440, 520, 500],
        greenHeart: [420, 530, 520, 590]
      },
      feedback: {
        correct: 'Great job!',
        allCorrect: 'All correct!',
        tryAgain: 'Try again',
        notEnough: 'Uh-oh! Not enough shapes. Add more hearts.',
        manyStars: "Drag the extra shapes out of the diagram to take them away.",
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
          walking: 'walking',
          bicycle: 'bicycle',
          schoolBus: 'school bus',
          student: 'student',
          students: 'students'
        },
        schoolTable: {
          walking: 'Walking',
          bicycle: 'Bicycle',
          schoolBus: 'School Bus',
          student: 'Student',
          students: 'Students'
        },
        schoolTable2: {
          walking: 'Walking',
          bicycle: 'Bicycle',
          schoolBus: 'School Bus'
        },
        labels: {
          dropHere: "Drop here",
          pinkHeart: "Pink heart",
          yellowHeart: "Yellow heart",
          greenHeart: "Green heart"
        },
        tapAlt: "Tap",
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
        }
      },

      pages: {
        page1: {
          mainText:
            "Students come to school in different ways.<br/><br/>Some walk, some ride a bicycle, and some come by school bus. <br/><br/>Let’s record this data in a picture diagram.",
        },
        page2: {
          headerText: 'Let’s use heart shapes to record the data in the picture diagram.',
          footerInstruction: "Tap » to continue."
        },
        page3: {
          headerText: 'There are <span style="color:#ffff">5 students</span> who come to school by <span style="color:#ffff">bicycle</span>.',
          footerInstruction: "Drag the correct shape to the correct row. Then tap 'Check'.. ",
          instructionAfterCheck: "Drag the extra shapes out of the diagram to take them away.",
          instructionAfterQuiz: "Tap » to continue.",
        },
        page4: {
          headerText: 'There are <span style="color:#ffff">7 students</span> who come to school by <span style="color:#ffff">walking</span>.',
          footerInstruction: "Drag the correct shape to the correct row. Then tap 'Check'.. ",
          instructionAfterCheck: "Drag the extra shapes out of the diagram to take them away.",
          instructionAfterQuiz: "Tap » to continue.",
        },
        page5: {
          headerTextFontSize:'43gc',
          headerText: 'There are <span style="color:#ffff">same</span> number of students come <span style="color:#ffff">by school bus and by walking</span>.',
          footerInstruction: "Drag the correct shape to the correct row. Then tap 'Check'.. ",
          instructionAfterCheck: "Drag the extra shapes out of the diagram to take them away.",
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
        nextButtonPage3: "Mengirim event perubahan halaman ke halaman 3",
        nextButtonPage4: "Mengirim event perubahan halaman ke halaman 4",
        nextButtonPage5: "Mengirim event perubahan halaman ke halaman 5",
        previousButtonPage1: "Mengirim event perubahan halaman ke halaman 1",
        lastPageStartingOver: "Halaman terakhir - Mulai dari awal",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete: "Reset aplikasi selesai - siap untuk pertanyaan baru"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        check: "Periksa",
        begin: "Mulai"
      },
      heartCoordinates:{
        pinkHeart: [450, 340, 550, 400],
        yellowHeart: [450, 440, 550, 500],
        greenHeart: [450, 530, 550, 590]
      },
      feedback: {
        correct: "Kerja bagus!",
        allCorrect: "Semua benar!",
        tryAgain: "Coba lagi",
        notEnough: "Uh-oh! Bentuknya belum cukup. Tambahkan lebih banyak hati.",
        manyStars: "Seret bentuk yang berlebih keluar dari diagram untuk menghapusnya.",
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

        schoolTable: {
          walking: "Berjalan kaki",
          bicycle: "Sepeda",
          schoolBus: "Bus sekolah",
          school: "Sekolah",
          student: "Siswa",
          students: "Siswa"
        },

        schoolTable2: {
          walking: "Berjalan kaki",
          bicycle: "Sepeda",
          schoolBus: "Bus sekolah"
        },

        labels: {
          dropHere: "Letakkan di sini",
          pinkHeart: "Hati merah muda",
          yellowHeart: "Hati kuning",
          greenHeart: "Hati hijau"
        },
        tapAlt: "Ketuk",

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
          instructionAfterCheck:
            "Seret bentuk yang berlebih keluar dari diagram untuk menghapusnya.",
          instructionAfterQuiz:
            "Ketuk » untuk melanjutkan."
        },

        page5: {
          headerTextFontSize:'40gc',
          headerText:
            "Jumlah siswa yang datang dengan <span style='color:#ffff'>bus sekolah</span> sama dengan jumlah siswa yang datang dengan <span style='color:#ffff'>berjalan kaki</span>.",
          footerInstruction:
            "Seret bentuk yang benar ke baris yang tepat. Lalu ketuk 'Periksa'.",
          instructionAfterCheck:
            "Seret bentuk yang berlebih keluar dari diagram untuk menghapusnya.",
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
