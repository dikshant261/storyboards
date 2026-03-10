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
        start: 'Start'
      },

      common: {
        equationButtonText: "Amount of Bika Ambon left",
        questionText: "Beni has $ 8 \\frac{1}{8}$ pieces of Bika Ambon. He gave $3 \\frac{5}{8}$ of the Bika Ambon to his grandmother. How much Bika Ambon does Beni still have left?",
        questionIcon: "Q",
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
            "We have some data about fish!<br/><br/>Let’s arrange the title, labels, and pictures<br/>to make a vertical picture diagram.",
        },
        page2: {
          footerInstruction: "Drag and drop to complete the diagram!",
          instructionAfterQuiz: 'Tap » to proceed',
          eachPartText: "Put each part where it belongs in<br/> the vertical picture diagram!",
          verticalTextDiagram: 'Vertical Picture Diagram',
          fillBlanks: {
            options: [
              // Option 1: "whole part" - #477F98, horizontal button on the left (can go to blank1 or blank2, maxDrops: 1)
              { id: 'opt1', text: 'Types of Fish Diagram', image: '', blankID: ['blank1'], maxDrops: 1, feedbackText: 'Well done! The title is in the right place.', inCorrectFeeback: "Oops! The title should be at the top of the diagram.", coordinate: [250, 140, 650, 240], buttonColor: '#514e4ec2', },
              // Option 2: "numerator" - #905D7B, above fraction bar, reduced by 25gc (275x75)
              { id: 'opt2', text: '', image: 'assets/greenFish.png', blankID: ['blank2'], feedbackText: 'Great job! That picture is in the right place!', inCorrectFeeback: "Oops! That pictures doesn’t go there. Match the picture with the correct label!", coordinate: [20, 260, 160, 600], buttonColor: '#514e4ec2', justifyContent: 'flex-end', imageHeight: '80%' },
              // Option 3: "denominator" - #838574, below fraction bar, reduced by 25gc (275x75) (can go to blank1, blank2, blank3, or blank4, maxDrops: 2)
              { id: 'opt3', text: '', image: 'assets/redFish.png', blankID: ['blank3'], maxDrops: 1, feedbackText: 'Great job! That picture is in the right place!', inCorrectFeeback: "Oops! That pictures doesn’t go there. Match the picture with the correct label!", coordinate: [170, 260, 310, 600], buttonColor: '#514e4ec2', justifyContent: 'flex-end', imageHeight: '100%' },
              { id: 'opt4', text: '', image: 'assets/blueFish.png', blankID: ['blank4'], maxDrops: 1, feedbackText: 'Great job! That picture is in the right place!', inCorrectFeeback: "Oops! That pictures doesn’t go there. Match the picture with the correct label!", coordinate: [320, 260, 460, 600], buttonColor: '#514e4ec2', justifyContent: 'flex-end', imageHeight: '60%' },
              { id: 'opt5', text: '', image: 'assets/yellowFish.png', blankID: ['blank5'], maxDrops: 1, feedbackText: 'Great job! That picture is in the right place!', inCorrectFeeback: "Oops! That pictures doesn’t go there. Match the picture with the correct label!", coordinate: [470, 260, 610, 600], buttonColor: '#514e4ec2', justifyContent: 'flex-end', imageHeight: '40%' },


              // Option 4: "+" - #F9A52F, square button stacked vertically on the right (top)
              { id: 'opt6', text: 'Green<br/> Fish', image: '', blankID: ['blank6'], feedbackText: 'Great job! That label is in the right place!', inCorrectFeeback: "Oops! That label doesn’t go there. Match the label with the correct picture!", coordinate: [620, 260, 750, 420], buttonColor: '#514e4ec2' },
              // Option 5: "×" - #F9A52F, square button stacked vertically on the right (bottom)
              { id: 'opt7', text: 'Red<br/>Fish', image: '', blankID: ['blank7'], feedbackText: 'Great job! That label is in the right place!', inCorrectFeeback: "Oops! That label doesn’t go there. Match the label with the correct picture!", coordinate: [760, 260, 890, 420], buttonColor: '#514e4ec2' },
              { id: 'opt8', text: 'Blue <br/>Fish', image: '', blankID: ['blank8'], feedbackText: 'Great job! That label is in the right place!', inCorrectFeeback: "Oops! That label doesn’t go there. Match the label with the correct picture!", coordinate: [620, 440, 750, 600], buttonColor: '#514e4ec2' },
              { id: 'opt9', text: 'Yellow <br/>Fish', image: '', blankID: ['blank9'], feedbackText: 'Great job! That label is in the right place!', inCorrectFeeback: "Oops! That label doesn’t go there. Match the label with the correct picture!", coordinate: [760, 440, 890, 600], buttonColor: '#514e4ec2' },


            ]
          }
        },
        page3: {
          footerInstruction: "Tap » to summarize",
          instructionAfterQuiz: 'Tap » to proceed',
          eachPartText: "Put each part where it belongs in<br/> the vertical picture diagram!",
          verticalTextDiagram: 'Vertical Picture Diagram',
          summaryText: "Yay!<br/>The vertical picture diagram is completed.",
          diagramSrc: "assets/verticalDiagramEn.png"
        },
        page4: {
          title: "Activity Completed!",
          mainText:
            "Great job arranging the title,<br/> labels, and pictures in the<br/> correct places!",
          mainText2:'A <span style="color:#FFD700">vertical picture diagram</span> shows its <span style="color:#FFD700">pictures going up  above the labels.</span>',  
          diagramSrc: "assets/verticalDiagramSummary-En.png"

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
    start: "Mulai"
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
