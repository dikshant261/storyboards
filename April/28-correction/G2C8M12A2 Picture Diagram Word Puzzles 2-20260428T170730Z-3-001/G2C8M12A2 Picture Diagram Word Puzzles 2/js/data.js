// data.js - Internationalization data for the Picture Diagram Word Puzzles applet

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

const questionTextSize = '36gc';
const highlightTextSize = "28gc";

/** Shared HTML: star icon + “1 star = 1 student” reminder after quizzes (pages 2–7). */
const htmlStarOneStudentReminder = {
  en: '<span style="display:inline-flex; align-items:center; justify-content:center; gap:10px;">Each <span style="position:relative; display:inline-flex; align-items:center; justify-content:center;"><img src="assets/star.png" style="width:60px;" alt="" /><span style="position:absolute; color:white; font-weight:bold; font-size:20px;">1</span></span> star means 1 student.</span>',
  id: '<span style="display:inline-flex; align-items:center; justify-content:center; gap:10px;">Setiap <span style="position:relative; display:inline-flex; align-items:center; justify-content:center;"><img src="assets/star.png" style="width:60px;" alt="" /><span style="position:absolute; color:white; font-weight:bold; font-size:20px;">1</span></span> bintang berarti 1 siswa.</span>'
};

const AppData = {
  currentLanguage: "en",

  translations: {
    en: {
      appInfo: {
        title: "Vertical Picture Diagram"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        nextButtonPage2: "Dispatched page change event to page 2",
        previousButtonPage1: "Dispatched page change event to page 1",
        logPageChangeNext: "Dispatched page change event to next page",
        logPageChangePrev: "Dispatched page change event to previous page",
        lastPageStartingOver: "Last page — starting over",
        navigationReset: "Resetting to question 1",
        navigationComplete: "App reset complete — ready for new question"
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
        placeStarsInMangoRow: 'Oops! Place the stars in the row that matches this color.',
        placedStar: 'Yay! You placed a star.<br>This represents {num} {fruit}'
      },

      common: {
        tapAlt: "Tap",
        favoriteFruit: "Picture Diagram of Favorite Colors",
        each: "Each star represents 1 student",
        pictureRepresent: 'picture represents 1 fruit',
        colors: {
          red: 'Red',
          yellow: 'Yellow',
          blue: 'Blue',
          black: 'Black'
        },
        fruits: {
          mango: "student",
          mangoes: "students"
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
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.en,
          quizPanel: {
            questionText: '',
            options: [
              { text: "5", iscorrect: false, feedback: "Uh-oh! Count red stars again." },
              { text: "6", iscorrect: false, feedback: "Uh-oh! Count red stars again." },
              { text: "7", iscorrect: true, feedback: "Yay! You counted red stars correctly." },
              { text: "8", iscorrect: false, feedback: "Uh-oh! Count red stars again." }
            ],
          }
        },
        page3: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'How many students like the color blue?',
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.en,
          quizPanel: {
            questionText: '',
            options: [
              { text: "6", iscorrect: false, feedback: "Uh-oh! Count blue stars again." },
              { text: "5", iscorrect: true, feedback: "Yay! You counted blue stars correctly." },
              { text: "4", iscorrect: false, feedback: "Uh-oh! Count blue stars again." },
              { text: "3", iscorrect: false, feedback: "Uh-oh! Count blue stars again." }
            ],
          }
        },
        page4: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'How many students like the color black?',
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.en,
          quizPanel: {
            questionText: '',
            options: [
              { text: "1", iscorrect: false, feedback: "Uh-oh! Count black stars again." },
              { text: "2", iscorrect: true, feedback: "Yay! You counted black stars correctly." },
              { text: "3", iscorrect: false, feedback: "Uh-oh! Count black stars again." },
              { text: "4", iscorrect: false, feedback: "Uh-oh! Count black stars again." }
            ],
          }
        },
        page5: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'The number of students who like blue is ____ <br/>more than those<br/> who like black.',
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.en,
          quizPanel: {
            questionText: '',
            options: [
              { text: "1", iscorrect: false, feedback: "Uh-oh! What is the difference between the number of stars in the blue and black rows?" },
              { text: "2", iscorrect: false, feedback: "Uh-oh! What is the difference between the number of stars in the blue and black rows?" },
              { text: "4", iscorrect: false, feedback: "Uh-oh! What is the difference between the number of stars in the blue and black rows?" },
              { text: "3", iscorrect: true, feedback: "Correct! Blue has 3 more stars than black." }
            ],
          }
        },
        page6: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'The number of students who like yellow is ____ fewer than those who like blue.',
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.en,
          quizPanel: {
            questionText: '',
            options: [
              { text: "1", iscorrect: false, feedback: "Uh-oh! What is the difference between the number of stars in the yellow and blue rows?" },
              { text: "2", iscorrect: true, feedback: "Excellent! Yellow has 2 fewer stars than blue." },
              { text: "4", iscorrect: false, feedback: "Uh-oh! What is the difference between the number of stars in the yellow and blue rows?" },
              { text: "3", iscorrect: false, feedback: "Uh-oh! What is the difference between the number of stars in the yellow and blue rows?" }
            ],
          }
        },
        page7: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to finish.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          quizQuestionText: 'Which color is liked the most?',
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.en,
          quizPanel: {
            questionText: '',
            options: [
              { text: "Red", iscorrect: true, feedback: "Correct! Red has the most stars." },
              { text: "Yellow", iscorrect: false, feedback: "Oops! Look for the row with the most stars." },
              { text: "Blue", iscorrect: false, feedback: "Oops! Look for the row with the most stars." },
              { text: "Black", iscorrect: false, feedback: "Oops! Look for the row with the most stars." }
            ],
          }
        },
        page8: {
          title: "Challenge Completed!",
          mainText:
            "Great job!<br/>You read the picture diagram and compared the <br/>data correctly.",
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
        nextButtonPage2: "Peristiwa perubahan halaman ke halaman 2 telah dikirim",
        previousButtonPage1: "Peristiwa perubahan halaman ke halaman 1 telah dikirim",
        logPageChangeNext: "Peristiwa perubahan halaman ke halaman berikutnya telah dikirim",
        logPageChangePrev: "Peristiwa perubahan halaman ke halaman sebelumnya telah dikirim",
        lastPageStartingOver: "Halaman terakhir — memulai ulang",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete: "Aplikasi diatur ulang — siap untuk pertanyaan baru"
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
        placeStarsInOrangeRow: "Ups! Letakkan bintang di baris jeruk.",
        placeStarsInAppleRow: "Ups! Letakkan bintang di baris apel.",
        placeStarsInBananaRow: "Ups! Letakkan bintang di baris pisang.",
        placeStarsInMangoRow: "Ups! Letakkan bintang di baris yang sesuai dengan warna ini.",
        placedStar: "Hore! Kamu meletakkan sebuah bintang.<br>Ini mewakili {num} {fruit}"
      },

      common: {
        tapAlt: "Ketuk",
        favoriteFruit: "Diagram Gambar Warna Kesukaan",
        each: "Setiap bintang mewakili 1 siswa",
        pictureRepresent: "gambar mewakili 1 buah",
        colors: {
          red: "Merah",
          yellow: "Kuning",
          blue: "Biru",
          black: "Hitam"
        },
        fruits: {
          mango: "siswa",
          mangoes: "siswa"
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
        amountBeniGiveToGrandMother: "Jumlah yang diberikan Beni\n kepada kakeknya.",
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
            "Siswa di kelas II berbagi warna kesukaan mereka.<br/><br/>Mari baca diagram gambar dan jawab beberapa <br/>pertanyaan."
        },
        page2: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          quizQuestionText: "Berapa banyak siswa yang menyukai warna merah?",
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.id,
          quizPanel: {
            questionText: '',
            options: [
              { text: "5", iscorrect: false, feedback: "Ups! Hitung lagi bintang merah." },
              { text: "6", iscorrect: false, feedback: "Ups! Hitung lagi bintang merah." },
              { text: "7", iscorrect: true, feedback: "Hore! Kamu menghitung bintang merah dengan benar." },
              { text: "8", iscorrect: false, feedback: "Ups! Hitung lagi bintang merah." }
            ],
          }
        },
        page3: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          quizQuestionText: "Berapa banyak siswa yang menyukai warna biru?",
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.id,
          quizPanel: {
            questionText: '',
            options: [
              { text: "6", iscorrect: false, feedback: "Ups! Hitung lagi bintang biru." },
              { text: "5", iscorrect: true, feedback: "Hore! Kamu menghitung bintang biru dengan benar." },
              { text: "4", iscorrect: false, feedback: "Ups! Hitung lagi bintang biru." },
              { text: "3", iscorrect: false, feedback: "Ups! Hitung lagi bintang biru." }
            ],
          }
        },
        page4: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          quizQuestionText: "Berapa banyak siswa yang menyukai warna hitam?",
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.id,
          quizPanel: {
            questionText: '',
            options: [
              { text: "1", iscorrect: false, feedback: "Ups! Hitung lagi bintang hitam." },
              { text: "2", iscorrect: true, feedback: "Hore! Kamu menghitung bintang hitam dengan benar." },
              { text: "3", iscorrect: false, feedback: "Ups! Hitung lagi bintang hitam." },
              { text: "4", iscorrect: false, feedback: "Ups! Hitung lagi bintang hitam." }
            ],
          }
        },
        page5: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          quizQuestionText: "Banyaknya siswa yang menyukai biru ____ lebih banyak daripada yang menyukai hitam.",
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.id,
          quizPanel: {
            questionText: '',
            options: [
              { text: "1", iscorrect: false, feedback: "Ups! Berapa selisih banyaknya bintang di baris biru dan hitam?" },
              { text: "2", iscorrect: false, feedback: "Ups! Berapa selisih banyaknya bintang di baris biru dan hitam?" },
              { text: "4", iscorrect: false, feedback: "Ups! Berapa selisih banyaknya bintang di baris biru dan hitam?" },
              { text: "3", iscorrect: true, feedback: "Benar! Biru memiliki 3 bintang lebih banyak daripada hitam." }
            ],
          }
        },
        page6: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          quizQuestionText: "Banyaknya siswa yang menyukai kuning ____ lebih sedikit daripada yang menyukai biru.",
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.id,
          quizPanel: {
            questionText: '',
            options: [
              { text: "1", iscorrect: false, feedback: "Ups! Berapa selisih banyaknya bintang di baris kuning dan biru?" },
              { text: "2", iscorrect: true, feedback: "Bagus! Kuning memiliki 2 bintang lebih sedikit daripada biru." },
              { text: "4", iscorrect: false, feedback: "Ups! Berapa selisih banyaknya bintang di baris kuning dan biru?" },
              { text: "3", iscorrect: false, feedback: "Ups! Berapa selisih banyaknya bintang di baris kuning dan biru?" }
            ],
          }
        },
        page7: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk selesai.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          quizQuestionText: "Warna mana yang paling disukai?",
          quizQuestionTextAfterQuiz: htmlStarOneStudentReminder.id,
          quizPanel: {
            questionText: '',
            options: [
              { text: "Merah", iscorrect: true, feedback: "Benar! Merah memiliki paling banyak bintang." },
              { text: "Kuning", iscorrect: false, feedback: "Ups! Cari baris yang memiliki paling banyak bintang." },
              { text: "Biru", iscorrect: false, feedback: "Ups! Cari baris yang memiliki paling banyak bintang." },
              { text: "Hitam", iscorrect: false, feedback: "Ups! Cari baris yang memiliki paling banyak bintang." }
            ],
          }
        },
        page8: {
          title: "Tantangan Selesai!",
          mainText:
            "Kerja bagus!<br/>Kamu telah membaca diagram gambar dan membandingkan <br/>datanya dengan benar.",
          instructionAfterQuiz: "Ketuk Mulai Ulang untuk bermain lagi."
        },
      },
    },
  },
};

const i18n = {
  t: (key, params = {}) => {
    const lang = AppData.currentLanguage;
    const translation = AppData.translations[lang];

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

    if (value === undefined || value === null) {
      return `[Missing: ${key}]`;
    }

    if (typeof value === "string") {
      return value.replace(/\{(\w+)\}/g, (match, param) => {
        return params.hasOwnProperty(param) ? params[param] : match;
      });
    }

    return value;
  },

  setLanguage: (langCode) => {
    if (AppData.translations[langCode]) {
      AppData.currentLanguage = langCode;
      return true;
    }
    console.warn(`Language '${langCode}' not supported.`, Object.keys(AppData.translations));
    return false;
  },

  getCurrentLanguage: () => AppData.currentLanguage,

  initLanguage: () => {
    console.log("i18n system initialized");
    return true;
  },

  getPageData: (pageNumber) => {
    const lang = AppData.currentLanguage;
    const translation = AppData.translations[lang];
    const pageKey = `page${pageNumber}`;

    if (translation.pages && translation.pages[pageKey]) {
      return translation.pages[pageKey];
    }

    const enTranslation = AppData.translations.en;
    if (enTranslation.pages && enTranslation.pages[pageKey]) {
      return enTranslation.pages[pageKey];
    }

    return null;
  },
};

window.i18n = i18n;
window.AppData = AppData;
