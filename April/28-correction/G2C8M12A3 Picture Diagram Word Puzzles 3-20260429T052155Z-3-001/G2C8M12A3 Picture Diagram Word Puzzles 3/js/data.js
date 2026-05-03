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
        previousButtonPage1: "Dispatched page change event to page 1",
        pageChangeEventDispatched: "Dispatched page change event to page {page}.",
        lastPageStartingOver: "Last page — starting over.",
        navigationReset: "Resetting to question 1.",
        navigationComplete: "Complete app reset completed — ready for a new question.",
        cannotDragBetweenCells: "Cannot drag from {source} to {target}."
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
        wrongDropLap1Row: "Oops! Place the icons in the 1 lap row.",
        wrongDropLap2Row: "Oops! Place the icons in the 2 laps row.",
        wrongDropLap3Row: "Oops! Place the icons in the 3 laps row.",
        wrongDropLap4Row: "Oops! Place the icons in the 4 laps row.",
        placedStar: "Yay! You placed an icon.<br>This represents {num} {fruit}."
      },

      common: {
        tapAlt: "Tap",
        favoriteFruit: "Picture Diagram of Students Running",
        each: "Each picture represents 1 student",
        pictureRepresent: "Each picture represents 1 student",
        fruits: {
          student: "student",
          students: "students"
        },
        laps: {
          lap1: '1 Lap',
          lap2: '2 Laps',
          lap3: '3 Laps',
          lap4: '4 Laps'
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
            "Students in class II like to run.<br/>They run around the field.<br/><br/> Let’s read the picture diagram and answer some <br/>questions."
        },
        page2: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'How many students ran 1 lap?',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">There is <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;"><img src="assets/run.png" alt="" style="width:60px;" /><span style="position:absolute;color:white;font-weight:bold;font-size:20px;">1</span></span> student.</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the 1 lap row again.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the 1 lap row again.",
              },
              {
                text: "5",
                iscorrect: true,
                feedback: "Yay! You counted the students correctly.",
              },
              {
                text: "6",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the 1 lap row again.",
              }
            ],
          }
        },
        page3: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'How many students ran 4 laps?',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">There is <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;"><img src="assets/run.png" alt="" style="width:60px;" /><span style="position:absolute;color:white;font-weight:bold;font-size:20px;">1</span></span> student.</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "1",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the 4-laps row again.",
              },
              {
                text: "2",
                iscorrect: true,
                feedback: "Yay!\nYou counted the students correctly.",
              },
              {
                text: "3",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the 4-laps row again.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the 4-laps row again.",
              }
            ],
          }
        },
        page4: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'How many students ran less than 2 laps?',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">There is <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;"><img src="assets/run.png" alt="" style="width:60px;" /><span style="position:absolute;color:white;font-weight:bold;font-size:20px;">1</span></span> student.</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Think again. Less than 2 laps means only 1 lap.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Think again. Less than 2 laps means only 1 lap.",
              },
              {
                text: "5",
                iscorrect: true,
                feedback: "Correct! Students who ran less than 2 laps ran only 1 lap.",
              },
              {
                text: "8",
                iscorrect: false,
                feedback: "Think again. Less than 2 laps means only 1 lap.",
              }
            ],
          }
        },
        page5: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'How many students ran more than 2 laps?',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">There is <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;"><img src="assets/run.png" alt="" style="width:60px;" /><span style="position:absolute;color:white;font-weight:bold;font-size:20px;">1</span></span> student.</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "4",
                iscorrect: false,
                feedback: "Think again. More than 2 laps mean 3 laps or 4 laps.",
              },
              {
                text: "5",
                iscorrect: false,
                feedback: "Think again. More than 2 laps mean 3 laps or 4 laps.",
              },
              {
                text: "6",
                iscorrect: true,
                feedback: "Yay! You added the students who ran 3 laps or 4 laps correctly.",
              },
              {
                text: "9",
                iscorrect: false,
                feedback: "Think again. More than 2 laps mean 3 laps or 4 laps.",
              }
            ],
          }
        },
        page6: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to finish.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'Which group has more students?',
          buttonTextSize: '44gc',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">There is <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;"><img src="assets/run.png" alt="" style="width:60px;" /><span style="position:absolute;color:white;font-weight:bold;font-size:20px;">1</span></span> student.</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "1 Lap",
                iscorrect: true,
                feedback: "Correct! The 1-lap row has the most pictures - the most students.",
              },
              {
                text: "2 Laps",
                iscorrect: false,
                feedback: "Uh-oh! Compare the number of pictures in each row.",
              },
              {
                text: "3 Laps",
                iscorrect: false,
                feedback: "Uh-oh! Compare the number of pictures in each row.",
              },
              {
                text: "4 Laps",
                iscorrect: false,
                feedback: "Uh-oh! Compare the number of pictures in each row.",
              }
            ],
          }
        },

        page7: {
          title: "Challenge Completed!",
          mainText:
            "You read the picture diagram correctly.",
          instructionAfterQuiz: "Tap Start Over to play again."
        },
      },
    },
    id: {
      appInfo: {
        title: "Diagram Gambar Vertikal"
      },
      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Peristiwa perubahan halaman dikirim ke halaman 2.",
        previousButtonPage1: "Peristiwa perubahan halaman dikirim ke halaman 1.",
        pageChangeEventDispatched: "Peristiwa perubahan halaman dikirim ke halaman {page}.",
        lastPageStartingOver: "Halaman terakhir — memulai ulang.",
        navigationReset: "Mengatur ulang ke pertanyaan 1.",
        navigationComplete: "Reset aplikasi selesai — siap untuk pertanyaan baru.",
        cannotDragBetweenCells: "Tidak dapat menyeret dari {source} ke {target}."
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
        correct: "Bagus sekali!",
        allCorrect: "Semua benar!",
        tryAgain: "Coba lagi",
        notEnough: "Ups! Bintangnya kurang.<br/>Hitung {fruit} lagi dan tambahkan.",
        manyStars: "Terlalu banyak bintang. Hitung {fruit} lagi dan hapus bintang yang berlebih.",
        thatIsCorrect: "Hore! Itu jumlah yang benar.",
        dropInsideCell: "Letakkan di dalam sel",
        itemRemoved: "Item dihapus",
        wrongDropLap1Row: "Ups! Letakkan ikon di baris 1 putaran.",
        wrongDropLap2Row: "Ups! Letakkan ikon di baris 2 putaran.",
        wrongDropLap3Row: "Ups! Letakkan ikon di baris 3 putaran.",
        wrongDropLap4Row: "Ups! Letakkan ikon di baris 4 putaran.",
        placedStar: "Hore! Kamu menempatkan sebuah ikon.<br>Ini mewakili {num} {fruit}."
      },

      common: {
        tapAlt: "Ketuk",
        favoriteFruit: "Diagram Gambar Siswa Berlari",
        each: "Setiap gambar mewakili 1 siswa",
        pictureRepresent: "Setiap gambar mewakili 1 siswa",
        fruits: {
          student: "siswa",
          students: "siswa"
        },
        laps: {
          lap1: "1 Putaran",
          lap2: "2 Putaran",
          lap3: "3 Putaran",
          lap4: "4 Putaran"
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
          keyConcepts: "Konsep Utama",
          importantFormulae: "Perhitungan"
        },
        amountBeniGiveToGrandMother: "Jumlah yang diberikan Beni\nkepada kakeknya.",
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
          keyConceptsTitle: "Konsep Utama",
          importantFormulaeTitle: "Perhitungan"
        }
      },

      pages: {
        page1: {
          title: "Mari Membuat Diagram Gambar Vertikal!",
          mainText:
            "Siswa kelas II suka berlari.<br/>Mereka berlari mengelilingi lapangan.<br/><br/>Mari baca diagram gambar dan jawab beberapa<br/>pertanyaan."
        },
        page2: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          quizQuestionText: "Berapa siswa yang berlari 1 putaran?",
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">Ada <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;"><img src="assets/run.png" alt="" style="width:60px;" /><span style="position:absolute;color:white;font-weight:bold;font-size:20px;">1</span></span> siswa.</span>',
          quizPanel: {
            questionText: "",
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Ups! Hitung lagi gambar di baris 1 putaran."
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Ups! Hitung lagi gambar di baris 1 putaran."
              },
              {
                text: "5",
                iscorrect: true,
                feedback: "Hore! Kamu menghitung siswanya dengan benar."
              },
              {
                text: "6",
                iscorrect: false,
                feedback: "Ups! Hitung lagi gambar di baris 1 putaran."
              }
            ]
          }
        },
        page3: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          quizQuestionText: "Berapa siswa yang berlari 4 putaran?",
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">Ada <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;"><img src="assets/run.png" alt="" style="width:60px;" /><span style="position:absolute;color:white;font-weight:bold;font-size:20px;">1</span></span> siswa.</span>',
          quizPanel: {
            questionText: "",
            options: [
              {
                text: "1",
                iscorrect: false,
                feedback: "Ups! Hitung lagi gambar di baris 4 putaran."
              },
              {
                text: "2",
                iscorrect: true,
                feedback: "Hore!\nKamu menghitung siswanya dengan benar."
              },
              {
                text: "3",
                iscorrect: false,
                feedback: "Ups! Hitung lagi gambar di baris 4 putaran."
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Ups! Hitung lagi gambar di baris 4 putaran."
              }
            ]
          }
        },
        page4: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          quizQuestionText: "Berapa siswa yang berlari kurang dari 2 putaran?",
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">Ada <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;"><img src="assets/run.png" alt="" style="width:60px;" /><span style="position:absolute;color:white;font-weight:bold;font-size:20px;">1</span></span> siswa.</span>',
          quizPanel: {
            questionText: "",
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Coba pikirkan lagi. Kurang dari 2 putaran berarti hanya 1 putaran."
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Coba pikirkan lagi. Kurang dari 2 putaran berarti hanya 1 putaran."
              },
              {
                text: "5",
                iscorrect: true,
                feedback: "Benar! Siswa yang berlari kurang dari 2 putaran hanya berlari 1 putaran."
              },
              {
                text: "8",
                iscorrect: false,
                feedback: "Coba pikirkan lagi. Kurang dari 2 putaran berarti hanya 1 putaran."
              }
            ]
          }
        },
        page5: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          quizQuestionText: "Berapa siswa yang berlari lebih dari 2 putaran?",
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">Ada <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;"><img src="assets/run.png" alt="" style="width:60px;" /><span style="position:absolute;color:white;font-weight:bold;font-size:20px;">1</span></span> siswa.</span>',
          quizPanel: {
            questionText: "",
            options: [
              {
                text: "4",
                iscorrect: false,
                feedback: "Coba pikirkan lagi. Lebih dari 2 putaran berarti 3 atau 4 putaran."
              },
              {
                text: "5",
                iscorrect: false,
                feedback: "Coba pikirkan lagi. Lebih dari 2 putaran berarti 3 atau 4 putaran."
              },
              {
                text: "6",
                iscorrect: true,
                feedback: "Hore! Kamu menjumlahkan siswa yang berlari 3 atau 4 putaran dengan benar."
              },
              {
                text: "9",
                iscorrect: false,
                feedback: "Coba pikirkan lagi. Lebih dari 2 putaran berarti 3 atau 4 putaran."
              }
            ]
          }
        },
        page6: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk selesai.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          buttonTextSize: '38gc',

          quizQuestionText: "Kelompok manakah yang memiliki lebih banyak siswa?",
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;align-items:center;justify-content:center;gap:10px;">Ada <span style="position:relative;display:inline-flex;align-items:center;justify-content:center;"><img src="assets/run.png" alt="" style="width:60px;" /><span style="position:absolute;color:white;font-weight:bold;font-size:20px;">1</span></span> siswa.</span>',
          quizPanel: {
            questionText: "",
            options: [
              {
                text: "1 Putaran",
                iscorrect: true,
                feedback: "Benar! Baris 1 putaran memiliki paling banyak gambar — paling banyak siswa."
              },
              {
                text: "2 Putaran",
                iscorrect: false,
                feedback: "Ups! Bandingkan jumlah gambar di setiap baris."
              },
              {
                text: "3 Putaran",
                iscorrect: false,
                feedback: "Ups! Bandingkan jumlah gambar di setiap baris."
              },
              {
                text: "4 Putaran",
                iscorrect: false,
                feedback: "Ups! Bandingkan jumlah gambar di setiap baris."
              }
            ]
          }
        },

        page7: {
          title: "Tantangan Selesai!",
          mainText: "Kamu membaca diagram gambar dengan benar.",
          instructionAfterQuiz: "Ketuk Mulai Ulang untuk bermain lagi."
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
