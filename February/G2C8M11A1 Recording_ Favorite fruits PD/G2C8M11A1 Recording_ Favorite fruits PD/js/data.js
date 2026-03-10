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
        notEnough: 'Uh-oh! Not enough stars. <br/>Count again and add more.',
        manyStars: "Too many stars. Remove the extra ones.",
        thatIsCorrect: 'Yay! That is the correct number.',
        dropInsideCell: 'Drop inside the cell',
        itemRemoved: 'Item removed',
        placeStarsInGrapesRow: 'Oops! Place the stars in the grapes row.',
        placeStarsInAppleRow: 'Oops! Place the stars in the apples row.',
        placeStarsInRambutansRow: 'Oops! Place the stars in the Rambutans row.',
        placeStarsInPineapplesRow: 'Oops! Place the stars in the Pineapples row.',
        placedStar: 'Yay! You placed a star.<br>This represents {num} {fruit}'
      },

      common: {
        favoriteFruit: "Favorite Fruits Picture Diagram",
        eachStart1Fruit: 'Each star = 1 fruit',
        showEachFruit: 'Show each fruit with a ',
        fruits: {
          grapes: 'Grapes',
          apples: 'Apples',
          rambutans: 'Rambutans',
          pineapples: 'Pineapples'
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
            "These are the favorite<br/> fruits of some children.<br/><br/><br/>Let’s record this data in a<br/> picture diagram."
        },
        page2: {
          headerText: 'Let’s use stars to record the data in the picture diagram.',
          footerInstruction: "Tap » to continue.",
          instructionAfterQuiz: 'Tap » to proceed',
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page3: {
          headerText: 'Place one star in the Grapes row.',
          footerInstruction: "Drag the star and drop it in the Grapes row. ",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page4: {
          headerText: 'Add one more star to the Grapes row.',
          footerInstruction: "Drag the star and drop it in the Grapes row. ",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page5: {
          headerText: 'To remove a star, drag it out of the picture diagram.',
          footerInstruction: "Drag a star outside the diagram to take it away.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page6: {
          mainText:
            "Well done! <br/>You learned to add and remove stars in a<br/> picture diagram.<br/><br/>Now, let’s record the fruits in the <br/>picture diagram."
        },
        page7: {
          headerText: 'Count the <span style="color:#ffff">grapes</span> and record them in the picture diagram.',
          footerInstruction: "Drag one star for each grape to the correct row. Then tap 'Check'",
          instructionAfterQuiz: "Tap » to record the next fruit.",
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page8: {
          headerText: 'Count the <span style="color:#ffff">apples</span> and record them in the picture diagram.',
          footerInstruction: "Drag one star for each apple to the correct row. Then tap 'Check'",
          instructionAfterQuiz: "Tap » to record the next fruit.",
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page9: {
          headerText: 'Count the <span style="color:#ffff">Rambutans</span> and record them in the picture diagram.',
          footerInstruction: "Drag one star for each rambutan to the correct row. Then tap 'Check'",
          instructionAfterQuiz: "Tap » to record the next fruit.",
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page10: {
          headerText: 'Count the <span style="color:#ffff">Pineapples</span> and record them in the picture diagram.',
          footerInstruction: "Drag one star for each pineapple to the correct row. Then tap 'Check'",
          instructionAfterQuiz: "Tap » to finish.",
          verticalTextDiagram: 'Vertical Picture Diagram',

        },
        page11: {
          mainText:
            "Awesome work!<br/><br/>You counted and recorded<br/> the data correctly.",
            summaryImage:'assets/fruitPictureDiagram-En.png'
        },

      },
    },
    id: {
      appInfo: {
        title: "Diagram Gambar Vertikal"
      },
      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Perubahan halaman ke halaman 2 telah dikirim",
        previousButtonPage1: "Perubahan halaman ke halaman 1 telah dikirim"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        check: 'Periksa'
      },

      feedback: {
        correct: 'Bagus!',
        allCorrect: 'Semua benar!',
        tryAgain: 'Coba lagi',
        dropInsideCell: 'Letakkan di dalam sel',
        itemRemoved: 'Item dihapus',
        placeStarsInGrapesRow: 'Ups! Letakkan bintang di baris Anggur.'
      },

      common: {
        equationButtonText: "Jumlah Bika Ambon yang tersisa",
        questionText: "Beni memiliki $ 8 \\frac{1}{8}$ potong Bika Ambon. Ia memberikan $3 \\frac{5}{8}$ potong Bika Ambon kepada neneknya. Berapa banyak Bika Ambon yang masih dimiliki Beni?",
        questionIcon: "T",
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
          keyConcepts: "Konsep Utama",
          importantFormulae: "Perhitungan"
        },
        amountBeniGiveToGrandMother: "Jumlah yang diberikan Beni\n kepada neneknya.",
        amountOfBika: "Jumlah Bika\n Ambon yang tersisa pada Beni"
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
          keyConceptsTitle: "Konsep Utama",
          importantFormulaeTitle: "Perhitungan"
        }
      },

      pages: {
        page1: {
          title: "Mari Membuat Diagram Gambar Vertikal!",
          mainText:
            "Kita memiliki beberapa data tentang ikan!<br/><br/>Mari susun judul, label, dan gambar<br/>untuk membuat diagram gambar vertikal."
        },

        page2: {
          footerInstruction: "Seret dan lepas untuk melengkapi diagram!",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          eachPartText: "Letakkan setiap bagian pada tempatnya<br/> di diagram gambar vertikal!",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          fillBlanks: {
            options: [
              { id: 'opt1', text: 'Diagram Jenis Ikan', image: '', blankID: ['blank1'], maxDrops: 1, feedbackText: 'Bagus sekali! Judul sudah di tempat yang tepat.', inCorrectFeeback: "Ups! Judul seharusnya berada di bagian atas diagram.", coordinate: [250, 140, 650, 240], buttonColor: '#514e4ec2' },

              { id: 'opt2', text: '', image: 'assets/greenFish.png', blankID: ['blank2'], feedbackText: 'Kerja bagus! Gambar berada di tempat yang tepat!', inCorrectFeeback: "Ups! Gambar itu tidak cocok di sana. Cocokkan gambar dengan label yang benar!", coordinate: [20, 260, 160, 600], buttonColor: '#514e4ec2', justifyContent: 'flex-end', imageHeight: '80%' },

              { id: 'opt3', text: '', image: 'assets/redFish.png', blankID: ['blank3'], maxDrops: 1, feedbackText: 'Kerja bagus! Gambar berada di tempat yang tepat!', inCorrectFeeback: "Ups! Gambar itu tidak cocok di sana. Cocokkan gambar dengan label yang benar!", coordinate: [170, 260, 310, 600], buttonColor: '#514e4ec2', justifyContent: 'flex-end', imageHeight: '100%' },

              { id: 'opt4', text: '', image: 'assets/blueFish.png', blankID: ['blank4'], maxDrops: 1, feedbackText: 'Kerja bagus! Gambar berada di tempat yang tepat!', inCorrectFeeback: "Ups! Gambar itu tidak cocok di sana. Cocokkan gambar dengan label yang benar!", coordinate: [320, 260, 460, 600], buttonColor: '#514e4ec2', justifyContent: 'flex-end', imageHeight: '60%' },

              { id: 'opt5', text: '', image: 'assets/yellowFish.png', blankID: ['blank5'], maxDrops: 1, feedbackText: 'Kerja bagus! Gambar berada di tempat yang tepat!', inCorrectFeeback: "Ups! Gambar itu tidak cocok di sana. Cocokkan gambar dengan label yang benar!", coordinate: [470, 260, 610, 600], buttonColor: '#514e4ec2', justifyContent: 'flex-end', imageHeight: '40%' },

              { id: 'opt6', text: 'Ikan<br/>Hijau', image: '', blankID: ['blank6'], feedbackText: 'Kerja bagus! Label sudah di tempat yang tepat!', inCorrectFeeback: "Ups! Label tidak cocok di sana. Cocokkan label dengan gambar yang benar!", coordinate: [620, 260, 750, 420], buttonColor: '#514e4ec2' },

              { id: 'opt7', text: 'Ikan<br/>Merah', image: '', blankID: ['blank7'], feedbackText: 'Kerja bagus! Label sudah di tempat yang tepat!', inCorrectFeeback: "Ups! Label tidak cocok di sana. Cocokkan label dengan gambar yang benar!", coordinate: [760, 260, 890, 420], buttonColor: '#514e4ec2' },

              { id: 'opt8', text: 'Ikan<br/>Biru', image: '', blankID: ['blank8'], feedbackText: 'Kerja bagus! Label sudah di tempat yang tepat!', inCorrectFeeback: "Ups! Label tidak cocok di sana. Cocokkan label dengan gambar yang benar!", coordinate: [620, 440, 750, 600], buttonColor: '#514e4ec2' },

              { id: 'opt9', text: 'Ikan<br/>Kuning', image: '', blankID: ['blank9'], feedbackText: 'Kerja bagus! Label sudah di tempat yang tepat!', inCorrectFeeback: "Ups! Label tidak cocok di sana. Cocokkan label dengan gambar yang benar!", coordinate: [760, 440, 890, 600], buttonColor: '#514e4ec2' }
            ]
          }
        },

        page3: {
          footerInstruction: "Ketuk » untuk merangkum",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          eachPartText: "Letakkan setiap bagian pada tempatnya<br/> di diagram gambar vertikal!",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          summaryText: "Hore!<br/>Diagram gambar vertikal telah selesai.",
          diagramSrc: "assets/verticalDiagram-Id.png"
        },

        page4: {
          title: "Aktivitas Selesai!",
          mainText:
            "Kerja bagus menyusun judul,<br/> label, dan gambar di<br/> tempat yang benar!",
          mainText2:
            'Sebuah <span style="color:#FFD700">diagram gambar vertikal</span> menampilkan <span style="color:#FFD700">gambar yang tersusun ke atas di atas labelnya.</span>',
          diagramSrc: "assets/verticalDiagramSummary-Id.png"
        }
      }
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
