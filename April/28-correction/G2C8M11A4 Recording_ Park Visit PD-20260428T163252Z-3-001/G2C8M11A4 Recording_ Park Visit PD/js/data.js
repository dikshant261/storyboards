// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = "#8A2BE2";

const questionTextSize = "36gc";
const highlightTextSize = "28gc";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Vertical Picture Diagram",
      },
      messages: {
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Dispatched page change event to page 2",
        nextButtonPage3: "Dispatched page change event to page 3",
        nextButtonpage3: "Dispatched page change event to page 3",
        nextButtonPage4: "Dispatched page change event to page 4",
        nextButtonpage4: "Dispatched page change event to page 4",
        nextButtonPage5: "Dispatched page change event to page 5",
        nextButtonpage5: "Dispatched page change event to page 5",
        nextButtonPage6: "Dispatched page change event to page 6",
        nextButtonpage6: "Dispatched page change event to page 6",
        previousButtonPage1: "Dispatched page change event to page 1",
        lastPageStartingOver: "Last page - Starting over",
        navigationReset: "Resetting to question 1",
        completeAppReset:
          "Complete app reset completed - ready for new question",
      },
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        check: "Check",
        begin: "Begin",
      },

      feedback: {
        correct: "Great job!",
        allCorrect: "All correct!",
        tryAgain: "Try again",
        notEnough: "Uh-oh! Not enough shapes. Add more {shape}.",
        manyStars:
          "Drag the extra shapes out of the diagram to take them away.",
        thatIsCorrect: "Yay! You recorded the {type} count correctly.",
        dropInsideCell: "Drop inside the cell",
        dropInsideBox: "Drop inside a box",
        itemRemoved: "Item removed",
        chooseCorrectShape:
          "Oops! That’s not the right shape. Use the correct shape for cats.",
        chooseCorrectShapeSandwich:
          "Oops! That’s not the right shape. Use the correct shape for butterflies.",
        chooseCorrectShapeBird:
          "Oops! That’s not the right shape. Use the correct shape for birds.",
        chooseCorrectShapeSquirrel:
          "Oops! That’s not the right shape. Use the correct shape for squirrels.",
        placeIceCreamRow:
          "Oops! This shape is in the wrong row. Place it in the cats column.",
        placeBirdRow:
          "Oops! This shape is in the wrong row. Place it in the birds column.",
        placeSquirrelRow:
          "Oops! This shape is in the wrong row. Place it in the squirrels column.",
        placeSandwichRow:
          "Oops! This shape is in the wrong row. Place it in the butterflies column.",
        placedShape:
          "Yay! You placed a {shape}.<br>This represents {num} {animal}",
      },

      common: {
        foodSold: "Ways to Come to School Picture Diagram",
        cat: "cat",
        butterfly: "butterfly",
        bird: "bird",
        squirrel: "squirrel",
        circle: "circles",
        triangle: "triangles",

        rectangle: "rectangles",
        square: "squares",
        useTheseShapes: "Use these shapes : ",
        options:
          "<span><ul style='line-height:2.5'><li>Cats → </li><li>Butterflies → </li><li>Birds → </li><li>Squirrels → </li></ul></span>",
        animal: {
          tableHeader: "Animals in Park Picture Diagram",
          cats: "cats",
          butterflies: "butterflies",
          birds: "birds",
          squirrels: "squirrels",
          eachShape: "Each shape = 1 animal",
        },
        animalTable: {
          tableHeader: "Animals in Park Picture Diagram",
          cats: "Cats",
          butterflies: "Butterflies",
          birds: "Birds",
          squirrels: "Squirrels",
          eachShape: "Each shape = 1 animal",
        },
        tapAlt: "Tap",
        sectionHeaderTapGiven: "Tap » to identify 'given' information",
        labels: {
          dropHere: "Drop here",
        },
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
        },
        conceptSummary: {
          header: "CONCEPT SUMMARY",
          given: "Given",
          toFind: "To Find",
          keyConcepts: "Key Concepts",
          importantFormulae: "Calculations",
        },
        amountBeniGiveToGrandMother: "Amount Beni gave\n to his grandfather.",
        amountOfBika: "Amount of Bika\n Ambon left with Beni",
      },

      components: {
        informationAnalysis: {
          headerText: "INFORMATION ANALYSIS",
          factsTitle: "Facts",
          valueTitle: "Value",
          toFindTitle: "To Find",
        },
        conceptSummary: {
          headerText: "CONCEPT SUMMARY",
          givenTitle: "Given",
          toFindTitle: "To Find",
          keyConceptsTitle: "Key Concepts",
          importantFormulaeTitle: "Calculations",
        },
      },

      pages: {
        page1: {
          title: "Let’s Build a Vertical Picture Diagram!",
          mainText:
            "Children saw different animals in the park.<br/><br/><br/>Let’s record these animals in a vertical picture diagram using clues.",
        },
        page2: {
          headerText:
            "Let’s use different shapes to record data in a picture diagram.",
          footerInstruction: "Tap » to continue.",
          instructionAfterQuiz: "Tap » to proceed",
          verticalTextDiagram: "Vertical Picture Diagram",
        },
        page3: {
          headerText: 'There are <span style="color:#ffff">2 cats</span>.',
          footerInstruction:
            "Drag the correct shape into the right column. Then tap 'Check'.",
          instructionBeforeQuiz:
            "Drag the extra shapes out of the diagram to take them away.",
          instructionAfterQuiz: "Tap » to continue",
          verticalTextDiagram: "Vertical Picture Diagram",
        },
        page4: {
          headerText:
            'Butterflies are <span style="color:#ffff">2 more</span> than cats.',
          footerInstruction:
            "Drag the correct shape into the right column. Then tap 'Check'.",
          instructionBeforeQuiz:
            "Drag the extra shapes out of the diagram to take them away.",
          instructionAfterQuiz: "Tap » to continue",
          verticalTextDiagram: "Vertical Picture Diagram",
        },
        page5: {
          headerText:
            'Birds are <span style="color:#ffff">1 fewer</span> than butterflies.',
          footerInstruction:
            "Drag the correct shape into the right column. Then tap 'Check'.",
          instructionBeforeQuiz:
            "Drag the extra shapes out of the diagram to take them away.",
          instructionAfterQuiz: "Tap » to continue",
          verticalTextDiagram: "Vertical Picture Diagram",
        },
        page6: {
          headerText:
            'Squirrels are <span style="color:#ffff">2 fewer</span> than birds.',
          footerInstruction:
            "Drag the correct shape into the right column. Then tap 'Check'.",
          instructionBeforeQuiz:
            "Drag the extra shapes out of the diagram to take them away.",

          instructionAfterQuiz: "Tap » to finish",
          verticalTextDiagram: "Vertical Picture Diagram",
        },

        page7: {
          mainText:
            "Great work! <br/><br/>You followed the clues<br/> and showed the data <br/>correctly in a picture diagram.",
          summaryImage: "assets/animalPictureDiagram-En.png",
        },
      },
    },
    id: {
      appInfo: {
        title: "Diagram Gambar Vertikal",
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai kembali?",
        nextButtonPage2: "Peristiwa perubahan halaman dikirim ke halaman 2",
        nextButtonPage3: "Peristiwa perubahan halaman dikirim ke halaman 3",
        nextButtonpage3: "Peristiwa perubahan halaman dikirim ke halaman 3",
        nextButtonPage4: "Peristiwa perubahan halaman dikirim ke halaman 4",
        nextButtonpage4: "Peristiwa perubahan halaman dikirim ke halaman 4",
        nextButtonPage5: "Peristiwa perubahan halaman dikirim ke halaman 5",
        nextButtonpage5: "Peristiwa perubahan halaman dikirim ke halaman 5",
        nextButtonPage6: "Peristiwa perubahan halaman dikirim ke halaman 6",
        nextButtonpage6: "Peristiwa perubahan halaman dikirim ke halaman 6",
        previousButtonPage1: "Peristiwa perubahan halaman dikirim ke halaman 1",
        lastPageStartingOver: "Halaman terakhir - Mulai dari awal",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        completeAppReset:
          "Pengaturan ulang aplikasi selesai - siap untuk pertanyaan baru",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        check: "Periksa",
        begin: "Mulai",
      },

      feedback: {
        correct: "Bagus sekali!",
        allCorrect: "Semua benar!",
        tryAgain: "Coba lagi",
        manyStars:
          "Seret bentuk yang tidak diperlukan keluar dari diagram untuk menghapusnya.",
        notEnough: "Wah! Bentuknya belum cukup. Tambahkan lagi {shape}.",
        thatIsCorrect: "Hebat! Kamu mencatat jumlah {type} dengan benar.",
        dropInsideCell: "Letakkan di dalam kotak",
        dropInsideBox: "Letakkan di dalam kotak",
        itemRemoved: "Bentuk dihapus",
        chooseCorrectShape:
          "Ups! Itu bukan bentuk yang benar. Gunakan bentuk yang tepat untuk kucing.",
        chooseCorrectShapeSandwich:
          "Ups! Itu bukan bentuk yang benar. Gunakan bentuk yang tepat untuk kupu-kupu.",
        chooseCorrectShapeBird:
          "Ups! Itu bukan bentuk yang benar. Gunakan bentuk yang tepat untuk burung.",
        chooseCorrectShapeSquirrel:
          "Ups! Itu bukan bentuk yang benar. Gunakan bentuk yang tepat untuk tupai.",
        placeIceCreamRow:
          "Ups! Bentuk ini berada di kolom yang salah. Letakkan di kolom kucing.",
        placeBirdRow:
          "Ups! Bentuk ini berada di kolom yang salah. Letakkan di kolom burung.",
        placeSquirrelRow:
          "Ups! Bentuk ini berada di kolom yang salah. Letakkan di kolom tupai.",
        placeSandwichRow:
          "Ups! Bentuk ini berada di kolom yang salah. Letakkan di kolom kupu-kupu.",
        placedShape:
          "Yeay! Kamu menempatkan {shape}.<br/>Ini mewakili {num} {animal}",
      },

      common: {
        foodSold: "Diagram Gambar Cara Datang ke Sekolah",
        cat: "Kucing",
        butterfly: "Kupu-kupu",
        bird: "Burung",
        squirrel: "Tupai",
        circle: "Lingkaran",
        triangle: "Segitiga",
        rectangle: "Persegi Panjang",
        square: "Persegi",
        useTheseShapes: "Gunakan bentuk-bentuk ini:",
        options:
          "<span><ul style='line-height:2.5'><li>Kucing → </li><li>Kupu-kupu → </li><li>Burung → </li><li>Tupai → </li></ul></span>",

        tapAlt: "Ketuk",
        sectionHeaderTapGiven:
          "Ketuk » untuk mengidentifikasi informasi 'diketahui'",
        animal: {
          tableHeader: "Diagram Gambar Hewan di Taman",
          eachShape: "Setiap bentuk = 1 hewan",
        },
        animalTable: {
          tableHeader: "Diagram Gambar Hewan di Taman",
          cats: "Kucing",
          butterflies: "Kupu-kupu",
          birds: "Burung",
          squirrels: "Tupai",
          eachShape: "Setiap bentuk = 1 hewan",
        },

        labels: {
          dropHere: "Letakkan di sini",
        },

        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Yang Dicari",
        },

        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Yang Dicari",
          keyConcepts: "Konsep Utama",
          importantFormulae: "Perhitungan",
        },

        amountBeniGiveToGrandMother:
          "Jumlah yang Beni berikan\n kepada kakeknya.",
        amountOfBika: "Jumlah Bika\n Ambon yang tersisa pada Beni",
      },

      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Yang Dicari",
        },
        conceptSummary: {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
          toFindTitle: "Yang Dicari",
          keyConceptsTitle: "Konsep Utama",
          importantFormulaeTitle: "Perhitungan",
        },
      },

      pages: {
        page1: {
          title: "Mari Membuat Diagram Gambar Vertikal!",
          mainText:
            "Anak-anak melihat berbagai hewan di taman.<br/><br/><br/>Mari kita catat hewan-hewan ini dalam diagram gambar vertikal menggunakan petunjuk.",
        },
        page2: {
          headerText:
            "Mari gunakan berbagai bentuk untuk mencatat data dalam diagram gambar.",
          footerInstruction: "Ketuk » untuk melanjutkan.",
          instructionAfterQuiz: "Ketuk » untuk lanjut",
          verticalTextDiagram: "Diagram Gambar Vertikal",
        },
        page3: {
          headerText: 'Ada <span style="color:#ffff">2 kucing</span>.',
          footerInstruction:
            "Seret bentuk yang benar ke kolom yang tepat. Lalu ketuk 'Periksa'.",
          instructionBeforeQuiz:
            "Seret bentuk yang tidak diperlukan keluar dari diagram untuk menghapusnya.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          verticalTextDiagram: "Diagram Gambar Vertikal",
        },
        page4: {
          headerText:
            'Kupu-kupu <span style="color:#ffff">2 lebih banyak</span> daripada kucing.',
          footerInstruction:
            "Seret bentuk yang benar ke kolom yang tepat. Lalu ketuk 'Periksa'.",
          instructionBeforeQuiz:
            "Seret bentuk yang tidak diperlukan keluar dari diagram untuk menghapusnya.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          verticalTextDiagram: "Diagram Gambar Vertikal",
        },
        page5: {
          headerText:
            'Burung <span style="color:#ffff">1 lebih sedikit</span> daripada kupu-kupu.',
          footerInstruction:
            "Seret bentuk yang benar ke kolom yang tepat. Lalu ketuk 'Periksa'.",
          instructionBeforeQuiz:
            "Seret bentuk yang tidak diperlukan keluar dari diagram untuk menghapusnya.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          verticalTextDiagram: "Diagram Gambar Vertikal",
        },
        page6: {
          headerText:
            'Tupai <span style="color:#ffff">2 lebih sedikit</span> daripada burung.',
          footerInstruction:
            "Seret bentuk yang benar ke kolom yang tepat. Lalu ketuk 'Periksa'.",
          instructionBeforeQuiz:
            "Seret bentuk yang tidak diperlukan keluar dari diagram untuk menghapusnya.",

          instructionAfterQuiz: "Ketuk » untuk selesai",
          verticalTextDiagram: "Diagram Gambar Vertikal",
        },

        page7: {
          mainText:
            "Kerja bagus! <br/><br/>Kamu mengikuti petunjuk<br/> dan menampilkan data <br/>dengan benar dalam diagram gambar.",
          summaryImage: "assets/animalPictureDiagram-Id.png",
        },
      },
    },
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
        Object.keys(AppData.translations),
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
