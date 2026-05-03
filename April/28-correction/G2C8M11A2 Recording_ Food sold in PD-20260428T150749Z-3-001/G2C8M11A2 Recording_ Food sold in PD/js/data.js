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
        previousButtonPage1: "Dispatched page change event to page 1",
        nextButtonpage3: "Dispatched page change event to page 6",
        nextButtonpage4: "Dispatched page change event to page 6",
        nextButtonpage5: "Dispatched page change event to page 6",
        lastPageStartingOver: "Last page - Starting over",
        navigationReset: "Resetting to question 1",
        navigationComplete:
          "Complete app reset completed - ready for new question",
      },
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        check: "Check",
      },

      feedback: {
        dropExceedMaxItems: "Oops! This row is full.",
        correct: "Great job!",
        allCorrect: "All correct!",
        tryAgain: "Try again",
        notEnough: "Uh-oh!,<br/> Not enough. Add more shapes.",
        manyStars:
          "Uh-oh! <br/>Too many shapes.<br/> Remove the extra shapes. ",
        thatIsCorrect: "Yay! You recorded the ice creams count correctly.",
        dropInsideCell: "Drop inside the cell",
        itemRemoved: "Item removed",
        chooseCorrectShape:
          "Oops! Choose the correct shape for <br/>ice creams.",
        chooseCorrectShapeSandwich:
          "Oops! Choose the correct shape for <br/>Sandwich",
        chooseCorrectShapePizza:
          "Oops! Choose the correct shape for <br/>Pizza",
        placeIceCreamRow:
          "Oops! This shape is in the wrong row.<br/> Place it in the ice cream row.",
        placePizzaRow:
          "Oops! This shape is in the wrong row.<br/> Place it in the Pizzas row.",

        placeSandwichesRow:
          "Oops! This shape is in the wrong row.<br/> Place it in the sandwiches row.",
        placeStarsInGrapesRow: "Oops! Place the stars in the grapes row.",
        placedShape:
          "Yay! You placed a circle.<br>This represents {num} {fruit}",
      },

      common: {
        foodSold: "Food Sold Picture Diagram",
        eachShape: "Each shape = 1 food item",
        useTheseShapes: "Use these shapes : ",
        options:
          '<span><ul style="line-height:2.5"><li>Ice Creams → </li><li>Sandwiches → </li><li>Pizzas → </li></ul></span>',
        iceCream: "Ice cream",
        sandwiche: "Sandwiche",
        pizza: "Pizza",
        snacks: {
          iceCream: "Ice creams",
          sandwiches: "Sandwiches",
          pizzas: "Pizzas",
        },
        labels: {
          dropHere: "Drop here",
        },
        tapAlt: "Tap",
        imageAlt: {
          whiteCircle: "White circle",
          pinkCircle: "Pink circle",
          yellowCircle: "Yellow circle",
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
      },

      pages: {
        page1: {
          mainText:
            "Pak Budi has a food stall. <br/>He sold some ice creams, sandwiches, and pizzas today.<br/><br/><br/>Let’s record this data in a picture diagram.",
        },
        page2: {
          headerText:
            "Let’s use circle shapes to record the data in the picture diagram.",
          footerInstruction: "Tap » to continue.",
          instructionAfterQuiz: "Tap » to proceed",
        },
        page3: {
          headerText:
            'Count the <span style="color:#ffff">ice creams</span> and record them in the picture diagram.',
          footerInstruction:
            "Drag the correct shape to the correct row. Then tap 'Check'.. ",
          footerInstructionMoreCircle:
            "Drag the extra shapes out of the diagram to take them away.",
          instructionAfterQuiz: "Tap » to record the next food item.",
        },
        page4: {
          headerText:
            'Count the <span style="color:#ffff">sandwiches </span> and record them in the picture diagram.',
          footerInstruction:
            "Drag the correct shape to the correct row. Then tap 'Check'.. ",
          footerInstructionMoreCircle:
            "Drag the extra shapes out of the diagram to take them away.",
          instructionAfterQuiz: "Tap » to record the next food item.",
        },
        page5: {
          headerText:
            'Count the <span style="color:#ffff"> pizzas </span> and record them in the picture diagram.',
          footerInstruction:
            "Drag the correct shape to the correct row. Then tap 'Check'.. ",
          footerInstructionMoreCircle:
            "Drag the extra shapes out of the diagram to take them away.",
          instructionAfterQuiz: "Tap » to finish.",
        },

        page6: {
          mainText:
            "Excellent work!<br/><br/>You used shapes correctly<br/.> and recorded today’s food<br/> sale in a picture diagram.",
          summaryImage: "assets/snacksPictureDiagram-En.png",
        },
      },
    },
    id: {
      appInfo: {
        title: "Diagram Gambar Vertikal",
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Mengirim event perubahan halaman ke halaman 2",
        previousButtonPage1: "Mengirim event perubahan halaman ke halaman 1",
        nextButtonpage3: "Mengirim event perubahan halaman ke halaman 6",
        nextButtonpage4: "Mengirim event perubahan halaman ke halaman 6",
        nextButtonpage5: "Mengirim event perubahan halaman ke halaman 6",
        lastPageStartingOver: "Halaman terakhir - Mulai dari awal",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete:
          "Reset aplikasi selesai - siap untuk pertanyaan baru",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        check: "Periksa",
      },

      feedback: {
        correct: "Kerja bagus!",
        allCorrect: "Semua benar!",
        dropExceedMaxItems: "Ups! Baris ini sudah penuh.",
        tryAgain: "Coba lagi",
        notEnough: "Uh-oh!<br/>Belum cukup. Tambahkan lebih banyak bentuk.",
        manyStars:
          "Uh-oh!<br/>Terlalu banyak bentuk.<br/>Hapus bentuk yang berlebihan.",
        thatIsCorrect: "Yeay! Kamu mencatat jumlah es krim dengan benar.",
        dropInsideCell: "Letakkan di dalam kotak",
        itemRemoved: "Item dihapus",

        chooseCorrectShape: "Ups! Pilih bentuk yang benar untuk <br/>es krim.",
        chooseCorrectShapeSandwich:
          "Ups! Pilih bentuk yang benar untuk <br/>Sandwich.",
        chooseCorrectShapePizza:
          "Ups! Pilih bentuk yang benar untuk <br/>Pizza.",

        placeIceCreamRow:
          "Ups! Bentuk ini berada di baris yang salah.<br/>Letakkan di baris es krim.",
        placePizzaRow:
          "Ups! Bentuk ini berada di baris yang salah.<br/>Letakkan di baris pizza.",
        placeSandwichesRow:
          "Ups! Bentuk ini berada di baris yang salah.<br/>Letakkan di baris sandwich.",
        placeStarsInGrapesRow: "Ups! Letakkan bintang di baris anggur.",

        placedShape:
          "Yeay! Kamu menempatkan sebuah lingkaran.<br/>Ini mewakili {num} {fruit}",
      },

      common: {
        foodSold: "Diagram Gambar Makanan Terjual",
        eachShape: "Setiap bentuk = 1 makanan",
        useTheseShapes: "Gunakan bentuk berikut:",
        options:
          "<span><ul style='line-height:2.5'><li>Es Krim → </li><li>Sandwich → </li><li>Pizza → </li></ul></span>",

        iceCream: "Es krim",
        sandwiche: "Sandwich",
        pizza: "Pizza",

        snacks: {
          iceCream: "Es krim",
          sandwiches: "Sandwich",
          pizzas: "Pizza",
        },

        labels: {
          dropHere: "Letakkan di sini",
        },

        tapAlt: "Ketuk",
        imageAlt: {
          whiteCircle: "Lingkaran putih",
          pinkCircle: "Lingkaran merah muda",
          yellowCircle: "Lingkaran kuning",
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
          keyConcepts: "Konsep Penting",
          importantFormulae: "Perhitungan",
        },
      },

      pages: {
        page1: {
          mainText:
            "Pak Budi memiliki warung makanan.<br/>Hari ini ia menjual beberapa es krim, sandwich, dan pizza.<br/><br/><br/>Mari kita catat data ini dalam diagram gambar.",
        },

        page2: {
          headerText:
            "Mari gunakan bentuk lingkaran untuk mencatat data pada diagram gambar.",
          footerInstruction: "Ketuk » untuk melanjutkan.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
        },

        page3: {
          headerText:
            "Hitung <span style='color:#ffff'>es krim</span> dan catat dalam diagram gambar.",
          footerInstruction:
            "Seret bentuk yang benar ke baris yang tepat. Lalu ketuk 'Periksa'.",
          footerInstructionMoreCircle:
            "Seret bentuk tambahan keluar dari diagram untuk menghapusnya.",
          instructionAfterQuiz: "Ketuk » untuk mencatat makanan berikutnya.",
        },

        page4: {
          headerText:
            "Hitung <span style='color:#ffff'>sandwich</span> dan catat dalam diagram gambar.",
          footerInstruction:
            "Seret bentuk yang benar ke baris yang tepat. Lalu ketuk 'Periksa'.",
          footerInstructionMoreCircle:
            "Seret bentuk tambahan keluar dari diagram untuk menghapusnya.",
          instructionAfterQuiz: "Ketuk » untuk mencatat makanan berikutnya.",
        },

        page5: {
          headerText:
            "Hitung <span style='color:#ffff'>pizza</span> dan catat dalam diagram gambar.",
          footerInstruction:
            "Seret bentuk yang benar ke baris yang tepat. Lalu ketuk 'Periksa'.",
          footerInstructionMoreCircle:
            "Seret bentuk tambahan keluar dari diagram untuk menghapusnya.",
          instructionAfterQuiz: "Ketuk » untuk menyelesaikan.",
        },

        page6: {
          mainText:
            "Kerja yang sangat baik!<br/><br/>Kamu menggunakan bentuk dengan benar<br/>dan mencatat penjualan makanan hari ini<br/>dalam diagram gambar.",
          summaryImage: "assets/snacksPictureDiagram-Id.png",
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
