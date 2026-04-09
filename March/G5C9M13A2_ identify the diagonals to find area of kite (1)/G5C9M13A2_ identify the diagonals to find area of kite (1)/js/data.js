// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#FFD700";
const highlight2 = "#70ACC7";
const highlight3 = "#F28283";
const highlight4 = "#70ACC7";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
      },
      appInfo: {
        title: 'Practice Area of Kite'
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        navigationReset: "Resetting to question 1",
        navigationComplete: "Complete app reset completed - ready for new question",
      },
      numberPad: { feedback: { empty: "Enter some value" } },
      common: {
        propertyShowcase: {
          headerText: "Properties of a Parallelogram",
          headerDescription: "A parallelogram is a <span style='color: #FF9900;'>quadrilateral</span>- it is a 4-sided polygon",
          propertyNames: {
            sides: "Sides",
            angles: "Angles",
            diagonals: "Diagonals",
            symmetry: "Symmetry"
          }
        },
        tapAlt: "Tap",
        oppositeSidesEqualMessage: "Opposite sides are equal!",
        allSidesEqualMessage: "All sides are equal!",
        rotationAngleLabel: "Rotation Angle",
      },

      pages: {
        page1: {
          title: "Practice Area of Kite",
          mainText: "Let’s identify the diagonals of the kite and find its area.",
          instructionText: 'Tap ‘Start’ to begin the activity.',
        },
        page2: {
          headerText: "Let’s find the area of the given kite.",
          instruction: "Tap »  to continue.",
          messageBox: "\\text{Area of the Kite} = \\frac{1}{2} \\times \\color{#FFFF00}{d_{1}} \\times \\color{#48D1B6}{d_{2}}",
        },
        page3: {
          headerText: "First, find the diagonals of the kite.",
          instruction: "Tap the correct diagonal pair of the kite.",
          instructionAfterQuiz: 'Tap » to continue.',
          messageBox: "\\text{Area of the Kite} = \\frac{1}{2} \\times \\color{#FFFF00}{d_{1}} \\times \\color{#48D1B6}{d_{2}}",
          quizPanel: {
            questionText: '',
            quizSubType: 'QT4G',
            options: [
              {
                text: "d<sub>1</sub> = 12<br/>d<sub>2</sub> = 48",
                iscorrect: false,
                feedback: "Oops! The diagonals of a kite are formed by adding the two equal halves shown in the figure.",
              },
              {
                text: "d<sub>1</sub> = 14<br/>d<sub>2</sub> = 48",
                iscorrect: false,
                feedback: "Oops! The diagonals of a kite are formed by adding the two equal halves shown in the figure.",
              },
              {
                text: "d<sub>1</sub> = 60<br/>d<sub>2</sub> = 28",
                iscorrect: true,
                feedback: "Well done! You correctly identified the diagonals of the kite.",
              },
              {
                text: "d<sub>1</sub> = 48<br/>d<sub>2</sub> = 28",
                iscorrect: false,
                feedback: "Oops! The diagonals of a kite are formed by adding the two equal halves shown in the figure.",
              }
            ],
          }
        },
        page4: {
          headerText: "Now, find the area of the given kite.",
          instruction: "Use the numpad to fill the answer and click 'Check'",
          instructionAfterQuiz: 'Tap » to see another question.',
          messageBox: "\\text{Area of the Kite} = \\frac{1}{2} \\times \\color{#FFFF00}{60} \\times \\color{#48D1B6}{28}",
          numpad: {
            feedback: {
              correct: "Correct!",
              incorrect: "Oops! Incorrect. Try Again!"
            }
          }
        },
        page5: {
          headerText: "Let’s find the area of the given kite.",
          instruction: "Tap »  to continue.",
          messageBox: "\\text{Area of the Kite} = \\frac{1}{2} \\times \\color{#FFFF00}{d_{1}} \\times \\color{#48D1B6}{d_{2}}",
        },
        page6: {
          headerText: "First, find the diagonals of the kite.",
          instruction: "Tap the correct diagonal pair of the kite.",
          instructionAfterQuiz: 'Tap » to continue.',
          messageBox: "\\text{Area of the Kite} = \\frac{1}{2} \\times \\color{#FFFF00}{d_{1}} \\times \\color{#48D1B6}{d_{2}}",
          quizPanel: {
            questionText: '',
            quizSubType: 'QT4G',
            options: [
              {
                text: "d<sub>1</sub> = 12<br/>d<sub>2</sub> = 28",
                iscorrect: false,
                feedback: "Oops! The diagonals of a kite are formed by adding the two equal halves shown in the figure.",
              },
              {
                text: "d<sub>1</sub> = 24<br/>d<sub>2</sub> = 22",
                iscorrect: false,
                feedback: "Oops! The diagonals of a kite are formed by adding the two equal halves shown in the figure.",
              },
              {
                text: "d<sub>1</sub> = 28<br/>d<sub>2</sub> = 24",
                iscorrect: true,
                feedback: "Well done! You correctly identified the diagonals of the kite.",
              },
              {
                text: "d<sub>1</sub> = 28<br/>d<sub>2</sub> = 32",
                iscorrect: false,
                feedback: "Oops! The diagonals of a kite are formed by adding the two equal halves shown in the figure.",
              }
            ],
          }
        },
        page7: {
          headerText: "Now, find the area of the given kite.",
          instruction: "Use the numpad to fill the answer and click 'Check'",
          instructionAfterQuiz: 'Tap » to summarize.',
          messageBox: "\\text{Area of the Kite} = \\frac{1}{2} \\times \\color{#FFFF00}{28} \\times \\color{#48D1B6}{24}",
          numpad: {
            feedback: {
              correct: "Correct!",
              incorrect: "Oops! Incorrect. Try Again!"
            }
          }
        },
        page8: {
          title: "Activity Completed!",
          mainText: "You identified the diagonals of the kite and found its area.",
          instructionText: 'Tap ‘Start Over’ to restart the activity.',
        },
      },
    },

    id: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
      },

      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete: "Reset aplikasi selesai - siap untuk pertanyaan baru",
      },
      common: {
        propertyShowcase: {
          headerText: "Sifat-sifat Jajar Genjang",
          headerDescription: "Jajar genjang adalah <span style='color: #FF9900;'>segi empat</span>- yaitu poligon bersisi 4",
          propertyNames: {
            sides: "Sisi",
            angles: "Sudut",
            diagonals: "Diagonal",
            symmetry: "Simetri"
          }
        },
        tapAlt: "Ketuk",
        oppositeSidesEqualMessage: "Sisi-sisi yang berhadapan sama panjang!",
        allSidesEqualMessage: "Semua sisi sama panjang!",
        rotationAngleLabel: "Sudut Rotasi",
      },
      pages: {
        page1: {
          title: "Sifat-sifat Belah Ketupat",
          mainText: "Mari kita jelajahi sifat-sifat sisi, sudut, dan diagonal belah ketupat.",
          instructionText: 'Ketuk "Mulai" untuk memulai aktivitas.',
        },
        page2: {
          instruction: "Ketuk » untuk menjelajahi sifat-sifat sisi.",
          messageBox: "Segi empat yang diberikan memiliki empat sisi",
        },
        page3: {
          animationSequence: {
            initialMessage: "Sisi-sisi yang berhadapan sejajar karena mempertahankan jarak yang sama di antara mereka.",
            firstPairProvenMessage: "AB dan CD sejajar satu sama lain",
            secondPairProvenMessage: "BC dan DA sejajar satu sama lain",
            conclusionMessage: "Dua pasang sisi yang berhadapan sejajar",
            sidesABEqualMessage: "Sisi AB dan CD sama panjang",
            sidesBCEqualMessage: "Sisi BC dan DA sama panjang",
            sidesEqualConclusionMessage: "Dua pasang sisi yang berhadapan sama panjang.",
            propertyDescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FF9900;'>Dua pasang</span> <span style='color: #FFFFFF;'>sisi yang berhadapan</span> <span style='color: #FF9900;'>sejajar.</span>",
            secondDescriptionText: "<span style='color: #FF9900; font-weight: bold;'>2.</span> <span style='color: #FF9900; font-weight: bold;'>Dua pasang</span> <span style='color: #FFFFFF; font-weight: bold;'>sisi yang berhadapan</span> <span style='color: #FF9900; font-weight: bold;'>sama panjang.</span>",
            instructionText: "Ketuk » untuk menjelajahi sifat-sifat sudut.",
            sidesEqualAtVertex0Message: "Sisi DA dan AB sama panjang.",
            sidesEqualAtVertex1Message: "Sisi AB dan BC sama panjang.",
            sidesEqualAtVertex2Message: "Sisi BC dan CD sama panjang.",
            sidesEqualAtVertex3Message: "Sisi CD dan DA sama panjang.",
            allSidesEqualConclusionMessage: "Keempat sisi sama panjang.",
            allSidesEqualDescriptionText: "<span style='color: #FF9900; font-weight: bold;'>2.</span> <span style='color: #FF9900; font-weight: bold;'>Keempat sisi</span> <span style='color: #FFFFFF; font-weight: bold;'>sama panjang.</span>",
            allSidesEqualBlinkMessages: ["AB = BC = CD = DA", "AB = BC", "AB = BC = CD", "AB = BC = CD = DA"]
          }
        },
        page4: {
          animationSequence: {
            step2DescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FF9900;'>Dua pasang</span> <span style='color: #FFFFFF;'>sudut yang berhadapan</span> <span style='color: #FF9900;'>sama besar.</span>",
            step3Message: "Kita melihat ada empat sudut interior.",
            step3AnglesDescriptionText: "Jajar genjang memiliki <span style='color: #FF9900; font-weight: bold;'>empat sudut interior.</span>",
            adjacentAnglesMessage1: "Sekarang mari kita periksa apakah sudut-sudut yang bersebelahan berpelengkap (berjumlah 180°).",
            adjacentAnglesMessage2: "∠A + ∠B = 180°. Sudut A dan B yang bersebelahan berpelengkap!",
            adjacentAnglesMessage3: "∠B + ∠C = 180°. Sudut B dan C yang bersebelahan berpelengkap!",
            adjacentAnglesMessage4: "∠C + ∠D = 180°. Sudut C dan D yang bersebelahan berpelengkap!",
            adjacentAnglesMessage5: "∠D + ∠A = 180°. Sudut D dan A yang bersebelahan berpelengkap!",
            adjacentAnglesFinalMessage: "Semua pasang sudut yang bersebelahan berpelengkap (berjumlah 180°).",
            adjacentAnglesDescriptionText: "<span style='color: #FF9900;'>2.</span> <span style='color: #FFFFFF;'>Sudut-sudut yang bersebelahan</span> <span style='color: #FF9900;'>berpelengkap</span> <span style='color: #FFFFFF;'>(berjumlah 180°).</span>",
            angleEqualityMessageAC: "Kedua sudut sama besar, ∠ A = ∠ C",
            angleEqualityMessageBD: "Kedua sudut sama besar, ∠ B = ∠ D",
            oppositeAnglesEqualMessage: "Sudut-sudut yang berhadapan sama besar karena memiliki ukuran sudut yang sama.",
            instructionText: "Ketuk » untuk menjelajahi sifat-sifat diagonal."
          }
        },
        page5: {
          animationSequence: {
            step2Message: "AC dan BD adalah dua diagonal",
            step3DescriptionText: "Belah ketupat memiliki <span style='color: #FF9900;'>2 diagonal.</span>",
            step6Message: "Diagonal-diagonalnya memiliki panjang yang berbeda.",
            step6DescriptionText: "<span style='color: #FF9900; font-weight: bold;'>1.</span> <span style='color: #FF9900; font-weight: bold;'>Diagonal</span> <span style='color: #FFFFFF; font-weight: bold;'>belah ketupat</span> <span style='color: #FF9900; font-weight: bold;'>tidak sama panjang.</span>",
            step7Message: "Mari kita ukur sudut di persimpangan diagonal.",
            step7DescriptionText: "<span style='color: #FF9900; font-weight: bold;'>2.</span> <span style='color: #FFFFFF; font-weight: bold;'>Diagonal </span><span style='color: #FF9900; font-weight: bold;'>saling tegak lurus</span><span style='color: #FFFFFF; font-weight: bold;'>.</span>",
            diagonalAngleMessage: "Diagonal berpotongan pada {angle}°.",
            step8Message: "Kita akan memeriksa apakah diagonal saling membagi dua.",
            step8ACMessage: "O, titik potong, membagi dua diagonal AC.",
            step8BDMessage: "O, titik potong, membagi dua diagonal BD.",
            step8ProvenMessage: "Diagonal belah ketupat saling membagi dua.",
            step8DescriptionText: "<span style='color: #FF9900; font-weight: bold;'>3.</span> <span style='color: #FF9900; font-weight: bold;'>Diagonal</span><span style='color: #FFFFFF; font-weight: bold;'> belah ketupat </span><span style='color: #FF9900; font-weight: bold;'>saling membagi dua</span><span style='color: #FFFFFF; font-weight: bold;'>.</span>",
            step9Message: "Sekarang mari kita lihat bagaimana setiap diagonal membagi dua sudut dalam.",
            step9ACMessage: "Diagonal AC membagi dua sudut di A dan C.",
            step9BDMessage: "Diagonal BD membagi dua sudut di B dan D.",
            step9ProvenMessage: "Diagonal membagi dua sudut dalam!",
            step9DescriptionText: "<span style='color: #FF9900; font-weight: bold;'>4.</span> <span style='color: #FF9900; font-weight: bold;'>Diagonal</span><span style='color: #FFFFFF; font-weight: bold;'> belah ketupat </span><span style='color: #FF9900; font-weight: bold;'>membagi dua sudut dalam</span><span style='color: #FFFFFF; font-weight: bold;'>.</span>",
            instructionText: "Ketuk » untuk menjelajahi sifat-sifat simetri."
          }
        },
        page6: {
          animationSequence: {
            step1SymmetryMessage: "Mari kita periksa simetri bentuk ini sepanjang sumbu horizontal",
            step2SymmetryMessage: "Bentuk simetris sepanjang sumbu horizontal. Mari kita periksa sumbu vertikal.",
            step3SymmetryMessage: "Mari kita periksa simetri bentuk ini sepanjang sumbu vertikal",
            step4SymmetryMessage: "Bentuk simetris sepanjang sumbu horizontal dan vertikal.",
            step5DescriptionText: "Belah ketupat memiliki <span style='color: #FF9900; font-weight: bold;'>2 garis simetri.</span>",
            step6RotationalMessage: "Sekarang mari kita periksa simetri putar dari bentuk ini.",
            step6RotationalMatchMessage: "Bentuk ini memiliki simetri putar pada {angles}.",
            step6RotationalProvenMessage: "Bentuk ini memiliki simetri putar tingkat 2.",
            step6RotationalDescriptionText: "<span style='color: #FFFFFF; font-weight: bold;'>Belah ketupat memiliki </span><span style='color: #FF9900; font-weight: bold;'>simetri putar tingkat 2</span><span style='color: #FFFFFF; font-weight: bold;'>.</span>",
            instructionText: "Ketuk » untuk merangkum."
          }
        },
        page7: {
          title: "Aktivitas Selesai!",
          subtitle: "Anda telah menjelajahi sifat-sifat utama belah ketupat!",
          property1: "1. Keempat sisi sama panjang. Sisi-sisi yang berhadapan sejajar.",
          property2: "2. Sudut-sudut yang berhadapan sama besar. Sudut-sudut yang bersebelahan berpelengkap.",
          property3: "3. Diagonal tidak sama panjang, tegak lurus, dan saling membagi dua serta membagi dua sudut interior.",
          property4: "4. Belah ketupat memiliki 2 garis simetri dan simetri putar tingkat 2.",
          instruction: 'Ketuk "Mulai Ulang" untuk memulai ulang aktivitas.',
          bodyText: "Anda telah menjelajahi sifat-sifat utama belah ketupat!\n\n1. Keempat sisi sama panjang. Sisi-sisi yang berhadapan sejajar.\n\n2. Sudut-sudut yang berhadapan sama besar. Sudut-sudut yang bersebelahan berpelengkap.\n\n3. Diagonal tidak sama panjang, tegak lurus, dan saling membagi dua serta membagi dua sudut interior.\n\n4. Belah ketupat memiliki 2 garis simetri dan simetri putar tingkat 2.\n\nKetuk \"Mulai Ulang\" untuk memulai ulang aktivitas.",
        },
      },
    },
  },
};

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
