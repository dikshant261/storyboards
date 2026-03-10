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
        notEnough: 'Uh-oh! Not enough stars. <br/>Count {fruit} again and add more.',
        manyStars: "Too many stars. Count {fruit} again and remove the extra stars.",
        thatIsCorrect: 'Yay! That is the correct number.',
        dropInsideCell: 'Drop inside the cell',
        itemRemoved: 'Item removed',
        placeStarsInOrangeRow: 'Oops! Place the stars in the oranges row.',
        placeStarsInAppleRow: 'Oops! Place the stars in the apples row.',
        placeStarsInBananaRow: 'Oops! Place the stars in the bananas row.',
        placeStarsInMangoRow: 'Oops! Place the stars in the mango row.',
        placedStar: 'Yay! You placed a star.<br>This represents {num} {fruit}'
      },

      common: {
        favoriteFruit: "Picture Diagram of Favorite Colors",
        each: "Each star represents 1 student",
        pictureRepresent: 'picture represents 1 fruit',
        colors: {
          red: 'Red',
          yellow: 'Yellow',
          blue: 'Blue',
          black: 'Black'
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
            "Students in class II shared their favorite colors.<br/><br/>Let’s read the picture diagram and answer some <br/>questions."
        },
        page2: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'How many students like the color red?',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex; align-items:center; justify-content:center; gap:10px;">\There is \<span style="position:relative; display:inline-flex; align-items:center; justify-content:center;">\<img src="assets/star.png" style="width:60px;" />\<span style="position:absolute; color:white; font-weight:bold; font-size:20px;">1</span>\</span>\mango.\</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "5",
                iscorrect: false,
                feedback: "Uh-oh! Count red stars again.",
              },
              {
                text: "6",
                iscorrect: false,
                feedback: "Uh-oh! Count red stars again.",
              },
              {
                text: "7",
                iscorrect: true,
                feedback: "Yay! You counted red stars correctly.",
              },
              {
                text: "8",
                iscorrect: false,
                feedback: "Uh-oh! Count red stars again.",
              }
            ],
          }
        },
        page3: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'How many students like the color blue?',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex; align-items:center; justify-content:center; gap:10px;">\There is \<span style="position:relative; display:inline-flex; align-items:center; justify-content:center;">\<img src="assets/star.png" style="width:60px;" />\<span style="position:absolute; color:white; font-weight:bold; font-size:20px;">1</span>\</span>\mango.\</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "6",
                iscorrect: false,
                feedback: "Uh-oh! Count blue stars again.",
              },
              {
                text: "5",
                iscorrect: true,
                feedback: "Yay! You counted blue stars correctly.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Uh-oh! Count blue stars again.",
              },
              {
                text: "3",
                iscorrect: false,
                feedback: "Uh-oh! Count blue stars again.",
              }
            ],
          }
        },
        page4: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'How many students like the color black?',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex; align-items:center; justify-content:center; gap:10px;">\There is \<span style="position:relative; display:inline-flex; align-items:center; justify-content:center;">\<img src="assets/star.png" style="width:60px;" />\<span style="position:absolute; color:white; font-weight:bold; font-size:20px;">1</span>\</span>\mango.\</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "1",
                iscorrect: false,
                feedback: "Uh-oh! Count black stars again.",
              },
              {
                text: "2",
                iscorrect: true,
                feedback: "Yay! You counted black stars correctly.",
              },
              {
                text: "3",
                iscorrect: false,
                feedback: "Uh-oh! Count black stars again.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Uh-oh! Count black stars again.",
              }
            ],
          }
        },
        page5: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'The number of students who like blue is ____ <br/>more than those<br/> who like black.',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex; align-items:center; justify-content:center; gap:10px;">\There is \<span style="position:relative; display:inline-flex; align-items:center; justify-content:center;">\<img src="assets/star.png" style="width:60px;" />\<span style="position:absolute; color:white; font-weight:bold; font-size:20px;">1</span>\</span>\mango.\</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "1",
                iscorrect: false,
                feedback: "Uh-oh! What is the difference between the number of stars in blue and black rows?",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Uh-oh! What is the difference between the number of stars in blue and black rows?orrectly.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Uh-oh! What is the difference between the number of stars in blue and black rows?.",
              },
              {
                text: "3",
                iscorrect: true,
                feedback: "Correct! Blue has 3 more stars than black.",
              }
            ],
          }
        },
        page6: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'The number of students who like yellow is ____ fewer than those who like blue.',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex; align-items:center; justify-content:center; gap:10px;">\There is \<span style="position:relative; display:inline-flex; align-items:center; justify-content:center;">\<img src="assets/star.png" style="width:60px;" />\<span style="position:absolute; color:white; font-weight:bold; font-size:20px;">1</span>\</span>\mango.\</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "1",
                iscorrect: false,
                feedback: "Uh-oh! What is the difference between the number of stars in yellow and blue rows?",
              },
              {
                text: "2",
                iscorrect: true,
                feedback: "Excellent! Yellow has 2 fewer stars than blue.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Uh-oh! What is the difference between the number of stars in yellow and blue rows?",
              },
              {
                text: "3",
                iscorrect: false,
                feedback: "Uh-oh! What is the difference between the number of stars in yellow and blue rows?"
              }
            ],
          }
        },
        page7: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to finish.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'Which color is liked the most?',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex; align-items:center; justify-content:center; gap:10px;">\There is \<span style="position:relative; display:inline-flex; align-items:center; justify-content:center;">\<img src="assets/star.png" style="width:60px;" />\<span style="position:absolute; color:white; font-weight:bold; font-size:20px;">1</span>\</span>\mango.\</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "Red",
                iscorrect: true,
                feedback: "Correct! Red has the most stars.",
              },
              {
                text: "Yellow",
                iscorrect: false,
                feedback: "Oops! Look for the row with the most stars.",
              },
              {
                text: "Blue",
                iscorrect: false,
                feedback: "Oops! Look for the row with the most stars.",
              },
              {
                text: "Black",
                iscorrect: false,
                feedback: "Oops! Look for the row with the most stars."
              }
            ],
          }
        },
        page8: {
          title: "Challenge Completed!",
          mainText:
            "Great job!<br/>You read the picture diagram and compared the <br/>data correctly."
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
