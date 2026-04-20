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
        navNextDispatched: "Dispatched page change event (next)",
        navPreviousDispatched: "Dispatched page change event (previous)",
        lastPageStartingOver: "Last page — starting over",
        navigationFallback: "{direction} — dispatched page change to page {page}"
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
        favoriteFruit: "Picture Diagram of Fruits in the Basket",
        tapAlt: "Tap",
        starAlt: "Star",
        fruitImageAlts: {
          orange: "Orange",
          apple: "Apple",
          banana: "Banana",
          mango: "Mango"
        },
        each: "Each",
        pictureRepresent: 'picture represents 1 fruit',
        fruits: {
          orange: 'orange',
          oranges: 'oranges',
          apple: 'apple',
          apples: 'apples',
          banana: 'banana',
          bananas: 'bananas',
          mango: 'mango',
          mangoes: 'mangoes',
          grape: 'grape',
          grapes: 'grapes'
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
            "Ibu is arranging fruits.<br/><br/><br/>Let’s show this using a picture diagram and read it together."
        },
        page2: {
          headerText: 'Let’s Complete the Picture Diagram.',
          footerInstruction: "Tap » to continue.",
          instructionAfterQuiz: 'Tap » to proceed',
          verticalTextDiagram: 'Vertical Picture Diagram',
          letRecordNumberText: "Let’s record the number of<br/> fruits, one by one.",
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.'
        },
        page3: {
          headerText: 'Let’s Complete the Picture Diagram.',
          footerInstruction: "Tap » to continue.",
          instructionAfterQuiz: 'Tap » to proceed',
          verticalTextDiagram: 'Vertical Picture Diagram',
          letRecordNumberText: "Drag the star and place it in the<br/> correct row.<br/>Drag it out of the picture <br/>diagram to remove it.",
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.'
        },
        page4: {
          headerText: 'Record <span style="color:#ffff">oranges</span> in the picture diagram.',
          footerInstruction: "Drag one star for fruit as per instruction, then tap 'Check'. ",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.'
        },
        page5: {
          headerText: 'Record <span style="color:#ffff">apples</span> in the picture diagram.',
          footerInstruction: "Drag one star for fruit as per instruction, then tap 'Check'. ",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.'
        },
        page6: {
          headerText: 'Record <span style="color:#ffff">bananas</span> in the picture diagram.',
          footerInstruction: "Drag one star for fruit as per instruction, then tap 'Check'. ",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.'
        },
        page7: {
          headerText: 'Record <span style="color:#ffff">mangoes</span> in the picture diagram.',
          footerInstruction: "Drag one star for fruit as per instruction, then tap 'Check'. ",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.'
        },
        page8: {
          headerText: "Well Done!",
          mainText:
            "You showed the fruits using a picture diagram. <br/>Now, let’s read the picture diagram and answer some questions.",
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.'
        },
        page9: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.',
          quizQuestionText: 'There are _____ mangoes.',
          quizQuestionTextAfterQuiz: '<span style="display:inline-flex; align-items:center; justify-content:center; gap:10gc;">There is <span style="position:relative; display:inline-flex; align-items:center; justify-content:center;"><img src="assets/star.png" style="width:70gc;" /><span style="position:absolute; color:black; font-weight:bold; font-size:32gc;">1</span></span> mango.</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "1",
                iscorrect: true,
                feedback: "Yay! You counted the mangoes correctly.",
              },
              {
                text: "3",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the mangoes row again.",
              },
              {
                text: "5",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the mangoes row again.",
              },
              {
                text: "8",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the mangoes row again.",
              }
            ],
          }
        },
        page10: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.',
          quizQuestionText: 'The total number of mangoes and bananas<br/> is ________.',
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;">\
The total number of mangoes and bananas <br/>\
<span style="display:inline-flex;align-items:center;gap:6gc;">\
is \
<span style="position:relative;display:inline-block;">\
<img src="assets/star.png" style="width:70gc;" />\
<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:black;font-weight:bold;font-size:32gc;">9</span>\
</span>\
</span>\
</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "1",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the mangoes and bananas rows together.",
              },
              {
                text: "8",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the mangoes and bananas rows together.",
              },
              {
                text: "9",
                iscorrect: true,
                feedback: "Yay! You counted the bananas and mangoes together.",
              },
              {
                text: "11",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the mangoes and bananas rows together.",
              }
            ],
          }
        },


        page11: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.',
          quizQuestionText: 'The total number of apples and oranges <br/>is ________.',
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;">\
The total number of apples and oranges  <br/>\
<span style="display:inline-flex;align-items:center;gap:6gc;">\
is \
<span style="position:relative;display:inline-block;">\
<img src="assets/star.png" style="width:70gc;" />\
<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:black;font-weight:bold;font-size:32gc;">7</span>\
</span>\
</span>\
</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "5",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the apples and oranges rows together."
              },
              {
                text: "7",
                iscorrect: true,
                feedback: "Yay! You counted the apples and oranges together.",
              },
              {
                text: "9",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the apples and oranges rows together."
              },
              {
                text: "10",
                iscorrect: false,
                feedback: "Uh-oh! Count the pictures in the apples and oranges rows together.",
              }
            ],
          }
        },
        page12: {
          headerText: 'Read the picture diagram and answer the questions.',
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to finish.",
          verticalTextDiagram: 'Vertical Picture Diagram',
          starLegendBefore: 'Each ',
          starLegendAfter: ' picture represents 1 fruit.',
          quizQuestionText: 'The total number fruits <br/>is ________.',
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;">\
The total number fruits <br/>\
<span style="display:inline-flex;align-items:center;gap:6gc;">\
is \
<span style="position:relative;display:inline-block;">\
<img src="assets/star.png" style="width:70gc;" />\
<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:black;font-weight:bold;font-size:32gc;">16</span>\
</span>\
</span>\
</span>',
          quizPanel: {
            questionText: '',
            options: [
              {
                text: "12",
                iscorrect: false,
                feedback: "Oops! Count all pictures together."
              },
              {
                text: "14",
                iscorrect: false,
                feedback: "Oops! Count all pictures together.",
              },
              {
                text: "17",
                iscorrect: false,
                feedback: "Oops! Count all pictures together."
              },
              {
                text: "16",
                iscorrect: true,
                feedback: "Yay! You counted total number of fruits correctly.",
              }
            ],
          }
        },
        page13: {
          title: "Challenge Completed!",
          mainText:
            "You recorded the data using a picture diagram.<br/><br/>You also read the data correctly.",
          feedbackTextbox: {
            text: "You recorded the data using a picture diagram. You also read the data correctly."
          }
        },
      },
    },
    id: {
      appInfo: {
        title: "Diagram Gambar Vertikal"
      },
      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonPage2: "Peristiwa perubahan halaman (ke halaman 2) telah dikirim",
        previousButtonPage1: "Peristiwa perubahan halaman (ke halaman 1) telah dikirim",
        navNextDispatched: "Peristiwa perubahan halaman (berikutnya) telah dikirim",
        navPreviousDispatched: "Peristiwa perubahan halaman (sebelumnya) telah dikirim",
        lastPageStartingOver: "Halaman terakhir — mulai lagi",
        navigationFallback: "{direction} — perubahan halaman dikirim ke halaman {page}"
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
        notEnough: "Ups! Bintangnya kurang. <br/>Hitung {fruit} lagi dan tambahkan lebih banyak.",
        manyStars: "Bintangnya terlalu banyak. Hitung {fruit} lagi dan hapus bintang yang berlebih.",
        thatIsCorrect: "Hore! Itu jumlah yang benar.",
        dropInsideCell: "Letakkan di dalam sel",
        itemRemoved: "Item dihapus",
        placeStarsInOrangeRow: "Ups! Letakkan bintang di baris jeruk.",
        placeStarsInAppleRow: "Ups! Letakkan bintang di baris apel.",
        placeStarsInBananaRow: "Ups! Letakkan bintang di baris pisang.",
        placeStarsInMangoRow: "Ups! Letakkan bintang di baris mangga.",
        placedStar: "Hore! Kamu menaruh bintang.<br>Ini mewakili {num} {fruit}"
      },

      common: {
        favoriteFruit: "Diagram Gambar Buah-buahan di Keranjang",
        tapAlt: "Ketuk",
        starAlt: "Bintang",
        fruitImageAlts: {
          orange: "Jeruk",
          apple: "Apel",
          banana: "Pisang",
          mango: "Mangga"
        },
        each: "Setiap",
        pictureRepresent: "gambar mewakili 1 buah",
        fruits: {
          orange: "jeruk",
          oranges: "jeruk",
          apple: "apel",
          apples: "apel",
          banana: "pisang",
          bananas: "pisang",
          mango: "mangga",
          mangoes: "mangga",
          grape: "anggur",
          grapes: "anggur"
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
            "Ibu sedang menata buah-buahan.<br/><br/><br/>Ayo kita tunjukkan dengan diagram gambar dan membacanya bersama."
        },
        page2: {
          headerText: "Mari Lengkapi Diagram Gambar.",
          footerInstruction: "Ketuk » untuk melanjutkan.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          letRecordNumberText: "Mari kita catat jumlah<br/> buah-buahan, satu per satu.",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah."
        },
        page3: {
          headerText: "Mari Lengkapi Diagram Gambar.",
          footerInstruction: "Ketuk » untuk melanjutkan.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          letRecordNumberText: "Seret bintang dan letakkan di<br/> baris yang benar.<br/>Seret keluar dari diagram gambar<br/> untuk menghapusnya.",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah."
        },
        page4: {
          headerText: 'Catat <span style="color:#ffff">jeruk</span> dalam diagram gambar.',
          footerInstruction: "Seret satu bintang untuk buah sesuai petunjuk, lalu ketuk 'Periksa'. ",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah."
        },
        page5: {
          headerText: 'Catat <span style="color:#ffff">apel</span> dalam diagram gambar.',
          footerInstruction: "Seret satu bintang untuk buah sesuai petunjuk, lalu ketuk 'Periksa'. ",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah."
        },
        page6: {
          headerText: 'Catat <span style="color:#ffff">pisang</span> dalam diagram gambar.',
          footerInstruction: "Seret satu bintang untuk buah sesuai petunjuk, lalu ketuk 'Periksa'. ",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah."
        },
        page7: {
          headerText: 'Catat <span style="color:#ffff">mangga</span> dalam diagram gambar.',
          footerInstruction: "Seret satu bintang untuk buah sesuai petunjuk, lalu ketuk 'Periksa'. ",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah."
        },
        page8: {
          headerText: "Bagus!",
          mainText:
            "Kamu menunjukkan buah-buahan dengan diagram gambar. <br/>Sekarang, mari baca diagram gambar dan jawab beberapa pertanyaan.",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah."
        },
        page9: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah.",
          quizQuestionText: "Ada _____ mangga.",
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex; align-items:center; justify-content:center; gap:10px;">Ada <span style="position:relative; display:inline-flex; align-items:center; justify-content:center;"><img src="assets/star.png" style="width:60px;" /><span style="position:absolute; color:#1565C0; font-weight:bold; font-size:20px;">1</span></span> mangga.</span>',
          quizPanel: {
            questionText: "",
            options: [
              {
                text: "1",
                iscorrect: true,
                feedback: "Hore! Kamu menghitung mangga dengan benar."
              },
              {
                text: "3",
                iscorrect: false,
                feedback: "Ups! Hitung lagi gambar di baris mangga."
              },
              {
                text: "5",
                iscorrect: false,
                feedback: "Ups! Hitung lagi gambar di baris mangga."
              },
              {
                text: "8",
                iscorrect: false,
                feedback: "Ups! Hitung lagi gambar di baris mangga."
              }
            ]
          }
        },
        page10: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah.",
          quizQuestionText: "Jumlah mangga dan pisang secara keseluruhan<br/> adalah ________.",
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;">' +
            "Jumlah mangga dan pisang secara keseluruhan <br/>" +
            '<span style="display:inline-flex;align-items:center;gap:6px;">' +
            "adalah " +
            '<span style="position:relative;display:inline-block;">' +
            '<img src="assets/star.png" style="width:60px;" />' +
            '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:20px;">9</span>' +
            "</span>" +
            "</span>" +
            "</span>",
          quizPanel: {
            questionText: "",
            options: [
              {
                text: "1",
                iscorrect: false,
                feedback: "Ups! Hitung gambar di baris mangga dan pisang bersama-sama."
              },
              {
                text: "8",
                iscorrect: false,
                feedback: "Ups! Hitung gambar di baris mangga dan pisang bersama-sama."
              },
              {
                text: "9",
                iscorrect: true,
                feedback: "Hore! Kamu menghitung pisang dan mangga bersama-sama."
              },
              {
                text: "11",
                iscorrect: false,
                feedback: "Ups! Hitung gambar di baris mangga dan pisang bersama-sama."
              }
            ]
          }
        },
        page11: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah.",
          quizQuestionText: "Jumlah apel dan jeruk secara keseluruhan<br/>adalah ________.",
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;">' +
            "Jumlah apel dan jeruk secara keseluruhan  <br/>" +
            '<span style="display:inline-flex;align-items:center;gap:6px;">' +
            "adalah " +
            '<span style="position:relative;display:inline-block;">' +
            '<img src="assets/star.png" style="width:60px;" />' +
            '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:20px;">7</span>' +
            "</span>" +
            "</span>" +
            "</span>",
          quizPanel: {
            questionText: "",
            options: [
              {
                text: "5",
                iscorrect: false,
                feedback: "Ups! Hitung gambar di baris apel dan jeruk bersama-sama."
              },
              {
                text: "7",
                iscorrect: true,
                feedback: "Hore! Kamu menghitung apel dan jeruk bersama-sama."
              },
              {
                text: "9",
                iscorrect: false,
                feedback: "Ups! Hitung gambar di baris apel dan jeruk bersama-sama."
              },
              {
                text: "10",
                iscorrect: false,
                feedback: "Ups! Hitung gambar di baris apel dan jeruk bersama-sama."
              }
            ]
          }
        },
        page12: {
          headerText: "Baca diagram gambar dan jawab pertanyaannya.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk selesai.",
          verticalTextDiagram: "Diagram Gambar Vertikal",
          starLegendBefore: "Setiap ",
          starLegendAfter: " gambar mewakili 1 buah.",
          quizQuestionText: "Jumlah semua buah-buahan<br/>adalah ________.",
          quizQuestionTextAfterQuiz:
            '<span style="display:inline-flex;flex-direction:column;align-items:center;justify-content:center;">' +
            "Jumlah semua buah-buahan <br/>" +
            '<span style="display:inline-flex;align-items:center;gap:6px;">' +
            "adalah " +
            '<span style="position:relative;display:inline-block;">' +
            '<img src="assets/star.png" style="width:60px;" />' +
            '<span style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:20px;">16</span>' +
            "</span>" +
            "</span>" +
            "</span>",
          quizPanel: {
            questionText: "",
            options: [
              {
                text: "12",
                iscorrect: false,
                feedback: "Ups! Hitung semua gambar bersama-sama."
              },
              {
                text: "14",
                iscorrect: false,
                feedback: "Ups! Hitung semua gambar bersama-sama."
              },
              {
                text: "17",
                iscorrect: false,
                feedback: "Ups! Hitung semua gambar bersama-sama."
              },
              {
                text: "16",
                iscorrect: true,
                feedback: "Hore! Kamu menghitung jumlah semua buah dengan benar."
              }
            ]
          }
        },
        page13: {
          title: "Tantangan Selesai!",
          mainText:
            "Kamu mencatat data dengan diagram gambar.<br/><br/>Kamu juga membacanya dengan benar.",
          feedbackTextbox: {
            text: "Kamu mencatat data dengan diagram gambar. Kamu juga membacanya dengan benar."
          }
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
