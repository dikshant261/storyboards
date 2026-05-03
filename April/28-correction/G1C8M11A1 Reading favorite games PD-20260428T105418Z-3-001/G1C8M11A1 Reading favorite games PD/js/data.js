// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

const questionTextSize = '34gc';
const highlightTextSize = "28gc";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Reading favorite games PD"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        navigationReset: "Resetting to question 1",
        navigationComplete: "Complete app reset completed - ready for new question",
        nextButtonPage2: "Dispatched page change event to page 3",
        nextButtonpage3: "Dispatched page change event to page 4",
        nextButtonpage4: "Dispatched page change event to page 5",
        nextButtonpage5: "Dispatched page change event to page 6",
        nextButtonpage6: "Dispatched page change event to page 7",
        nextButtonpage7: "Dispatched page change event to page 8",
        nextButtonpage8: "Dispatched page change event to page 9",
        nextButtonpage9: "Dispatched page change event to page 10",
        nextButtonpage10: "Dispatched page change event to page 11",
        nextButtonpage11: "Dispatched page change event to page 12",
        previousButtonPage1: "Dispatched page change event to page 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        start: "Start",
        startOver: "Start Over"
      },

      common: {
        tapGifAlt: "Tap",
        equationButtonText: "Paper not painted",
        questionText: "Yohana has a painting assignment on $\\frac{2}{3}$ piece of drawing paper given by her teacher. She has already painted $\\frac{1}{3}$ of the paper. How much paper has Yohana not painted yet?",
        questionIcon: "Q",
        headerText: "The picture diagram shows children’s favorite games.",
        gameLabel: {
          favoriteGamerPicture: "Favorite Games Picture Diagram",
          hideAndSeek: "Hide and<br/> Seek",
          ropeJump: "Rope<br/> Jump",
          marbles: "Marbles",
          bentengan: "Bentengan",
          key: "Key: Each triangle picture = 1 Child",
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
          introText: "Some children like different games. <br/>We will look at a picture diagram to learn about<br/> their favorite games. <br/>Get ready to read and answer questions!",
        },
        page2: {
          headerText: "The picture diagram shows children’s favorite games.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » for next question",
          quizPanel: {
            questionText: 'How many children like to play <br/><span style="color:orange">Rope Jump</span>?',
            options: [
              {
                text: "7",
                iscorrect: false,
                feedback: "Uh-oh! That’s not correct. Count all Rope Jump triangle pictures.",
              },
              {
                text: "3",
                iscorrect: false,
                feedback: "Uh-oh! That’s not correct. Count all Rope Jump triangle pictures.",
              },
              {
                text: "5",
                iscorrect: false,
                feedback: "Uh-oh! That’s not correct. Count all Rope Jump triangle pictures.",
              },
              {
                text: "6",
                iscorrect: true,
                feedback: "Yay! There are 6 triangle pictures, so 6 children like Rope Jump.",
              }
            ],
          }
        },
        page3: {
          headerText: "The picture diagram shows children’s favorite games.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » for next question",

          quizPanel: {
            questionText: 'Which game do <span style="color:orange">most children</span> like?',
            options: [
              {
                text: "Hide and Seek",
                iscorrect: false,
                triangleRowId: 'hideSeek',
                feedback: "Oops! There are other games that are liked by most children. Try again.",
              },
              {
                text: "Rope Jump",
                iscorrect: true,
                triangleRowId: 'ropeJump',
                feedback: "Yay! You found it! Rope Jump has the most triangle pictures.",
              },
              {
                text: "Marbles",
                iscorrect: false,
                triangleRowId: 'marbles',
                feedback: "Oops! There are other games that are liked by most children. Try again.",
              },
              {
                text: "Bentengan",
                iscorrect: false,
                triangleRowId: 'bentengan',
                feedback: "Oops! There are other games that are liked by most children. Try again.",
              }
            ],
          }
        },
        page4: {
          headerText: "The picture diagram shows children’s favorite games.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » for next question",

          quizPanel: {
            questionText: 'Which game do <span style="color:orange">fewer children</span> like?',
            options: [
              {
                text: "Hide and Seek",
                iscorrect: false,
                triangleRowId: 'hideSeek',
                feedback: "Oops! There are other games that are liked by fewer children. Try again.",
              },
              {
                text: "Rope Jump",
                iscorrect: false,
                triangleRowId: 'ropeJump',
                feedback: "Oops! There are other games that are liked by fewer children. Try again.",
              },
              {
                text: "Marbles",
                iscorrect: true,
                triangleRowId: 'marbles',
                feedback: "Yay! You got it! Marbles have the fewest triangle pictures.",
              },
              {
                text: "Bentengan",
                iscorrect: false,
                triangleRowId: 'bentengan',
                feedback: "Oops! There are other games that are liked by fewer children. Try again.",
              }
            ],
          }
        },
        page5: {
          headerText: "The picture diagram shows children’s favorite games.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » for next question",

          quizPanel: {
            questionText: 'Which game do <span style="color:orange">4 children</span> like to play?',
            options: [
              {
                text: "Hide and Seek",
                iscorrect: true,
                triangleRowId: 'hideSeek',
                feedback: "Yay! Hide and Seek has 4 triangle pictures. So, 4 children like Hide and Seek.",
              },
              {
                text: "Rope Jump",
                iscorrect: false,
                triangleRowId: 'ropeJump',
                feedback: "Uh-oh! That’s not correct. Find the row with exactly 4 triangle pictures.",
              },
              {
                text: "Marbles",
                iscorrect: false,
                triangleRowId: 'marbles',
                feedback: "Uh-oh! That’s not correct.Find the row with exactly 4 triangle pictures.",
              },
              {
                text: "Bentengan",
                iscorrect: false,
                triangleRowId: 'bentengan',
                feedback: "Uh-oh! That’s not correct.Find the row with exactly 4 triangle pictures.",
              }
            ],
          }
        },
        page6: {
          headerText: "The picture diagram shows children’s favorite games.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » for next question",

          quizPanel: {
            questionText: 'Which game is liked by <span style="color:orange">less than 4</span> children?',
            options: [
              {
                text: "Hide and Seek",
                iscorrect: false,
                triangleRowId: 'hideSeek',
                feedback: "Almost! Look for a game with less than 4 triangle pictures.",
              },
              {
                text: "Rope Jump",
                iscorrect: false,
                triangleRowId: 'ropeJump',
                feedback: "Oops! Not this one. Look for a game with less than 4 triangle pictures.",
              },
              {
                text: "Marbles",
                iscorrect: true,
                triangleRowId: 'marbles',
                feedback: "Yay! Marbles has 3 triangle pictures. That is less than 4 children.",
              },
              {
                text: "Bentengan",
                iscorrect: false,
                triangleRowId: 'bentengan',
                feedback: "Oops! Not this one. Look for a game with less than 4 triangle pictures.",
              }
            ],
          }
        },
        page7: {
          headerText: "The picture diagram shows children’s favorite games.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » for next question",
          firstClickFeedback: 'Good! This game has more than 4 triangle pictures. Let’s find one more.',
          secondClickFeedback: 'Well done! You found both games with more than 4 triangle pictures.',
          quizPanel: {
            questionText: 'Which games are liked by <span style="color:orange">more than 4 children</span>?',
            options: [
              {
                text: "Hide and Seek",
                iscorrect: false,
                triangleRowId: 'hideSeek',
                feedback: "Almost! Look for games that have more than 4 triangle pictures.",
              },
              {
                text: "Rope Jump",
                iscorrect: true,
                triangleRowId: 'ropeJump',
                feedback: "Good! This game has more than 4 triangle pictures. Let’s find one more. ",
              },
              {
                text: "Marbles",
                iscorrect: false,
                triangleRowId: 'marbles',
                feedback: "Oops! Not this one. Look for games that have more than 4 triangle pictures.",
              },
              {
                text: "Bentengan",
                iscorrect: true,
                triangleRowId: 'bentengan',
                feedback: "Well done! You found both games with more than 4 triangle pictures.",
              }
            ],
          },
          instructionAfterQuiz: "Tap » for next question",
        },
        page8: {
          headerText: "The picture diagram shows children’s favorite games.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » for next question",

          quizPanel: {
            questionText: '<span style="color:orange">How many more</span> children like to play Bentengan than Marbles?</span>',
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Try again! Bentengan has more triangles than Marbles.Count the extra triangle pictures.",
              },
              {
                text: "2",
                iscorrect: true,
                feedback: "Well done! Bentengan has 2 more triangle pictures than Marbles.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Try again! Bentengan has more triangles than Marbles.Count the extra triangle pictures.",
              },
              {
                text: "1",
                iscorrect: false,
                feedback: "Try again! Bentengan has more triangles than Marbles.Count the extra triangle pictures.",
              }
            ],
          },
          instructionAfterQuiz: "Tap » for next question",
        },
        page9: {
          headerText: "The picture diagram shows children’s favorite games.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » for next question",

          quizPanel: {
            questionText: '<span style="color:orange">How many more</span> children like Rope Jump than Hide and Seek?',
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Try again! Rope Jump has more triangles than Hide and Seek. Count the extra triangle pictures.",
              },
              {
                text: "1",
                iscorrect: false,
                feedback: "Try again! Rope Jump has more triangles than Hide and Seek. Count the extra triangle pictures.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Try again! Rope Jump has more triangles than Hide and Seek. Count the extra triangle pictures.",
              },
              {
                text: "2",
                iscorrect: true,
                feedback: "Well done! Rope Jump has 2 more triangle pictures than Hide and Seek.",
              }
            ],
          },
          instructionAfterQuiz: "Tap » for next question",
        },
        page10: {
          headerText: "The picture diagram shows children’s favorite games.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » for next question",

          quizPanel: {
            questionText: '<span style="color:orange">How many fewer</span> children like to play Marbles than Rope Jump?',
            options: [
              {
                text: "3",
                iscorrect: true,
                feedback: "Well done! Marbles has 3 triangle pictures less than Rope Jump.",
              },
              {
                text: "1",
                iscorrect: false,
                feedback: "Try again! Marbles has fewer triangles than Rope Jump.Count the extra triangle pictures.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Try again! Marbles has fewer triangles than Rope Jump.Count the extra triangle pictures.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Try again! Marbles has fewer triangles than Rope Jump.Count the extra triangle pictures.",
              }
            ],
          },
          instructionAfterQuiz: "Tap » for next question",
        },
        page11: {
          headerText: "The picture diagram shows children’s favorite games.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » for next question",

          quizPanel: {
            questionText: '<span style="color:orange">How many fewer</span> children like to play Bentengan than Hide and Seek?',
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Try again! Hide and seek has fewer triangles than Bentengan.Count the extra triangle pictures.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Try again! Hide and seek has fewer triangles than Bentengan.Count the extra triangle pictures.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Try again! Hide and seek has fewer triangles than Bentengan.Count the extra triangle pictures.",
              },
              {
                text: "1",
                iscorrect: true,
                feedback: "Well done! Hide and seek has 1 triangle picture less than Bentengan.",
              }
            ],
          },
          instructionAfterQuiz: "Tap » for next question",
        },
        page12: {
          introText: "Well Done!<br/><br/>You read the picture diagram and answered the questions!",
        },
      }
    },
    id: {
      appInfo: {
        title: "Membaca diagram permainan favorit PD"
      },

      messages: {
        pageStatesCleared: "Status halaman sudah dihapus. Muat ulang halaman untuk mulai dari awal?",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete: "Reset aplikasi selesai — siap untuk pertanyaan baru",
        nextButtonPage2: "Peristiwa pindah halaman telah dikirim ke halaman 3",
        nextButtonpage3: "Peristiwa pindah halaman telah dikirim ke halaman 4",
        nextButtonpage4: "Peristiwa pindah halaman telah dikirim ke halaman 5",
        nextButtonpage5: "Peristiwa pindah halaman telah dikirim ke halaman 6",
        nextButtonpage6: "Peristiwa pindah halaman telah dikirim ke halaman 7",
        nextButtonpage7: "Peristiwa pindah halaman telah dikirim ke halaman 8",
        nextButtonpage8: "Peristiwa pindah halaman telah dikirim ke halaman 9",
        nextButtonpage9: "Peristiwa pindah halaman telah dikirim ke halaman 10",
        nextButtonpage10: "Peristiwa pindah halaman telah dikirim ke halaman 11",
        nextButtonpage11: "Peristiwa pindah halaman telah dikirim ke halaman 12",
        previousButtonPage1: "Peristiwa pindah halaman telah dikirim ke halaman 1"
      },

      buttons: {
        next: "»",
        previous: "«",
        start: "Mulai",
        startOver: "Mulai Lagi"
      },

      common: {
        tapGifAlt: "Ketuk",
        headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
        gameLabel: {
          favoriteGamerPicture: "Diagram Gambar Permainan Favorit",
          hideAndSeek: "Petak<br/> Umpet",
          ropeJump: "Lompat<br/> Tali",
          marbles: "Kelereng",
          bentengan: "Bentengan",
          key: "Kunci: Setiap gambar segitiga = 1 anak",
        },
        amountBeniGiveToGrandMother: "Jumlah yang Beni berikan\n kepada kakeknya.",
        amountOfBika: "Jumlah Bika Ambon\n yang tersisa bersama Beni",
        equationButtonText: "Kertas belum dicat",
        questionText:
          "Rumah Komang berada di antara rumah Yohana dan rumah Lukas. Jarak dari rumah Komang ke rumah Yohana adalah $1 \\frac{1}{2}$ km, sedangkan jarak antara rumah Komang dan rumah Lukas adalah $2 \\frac{1}{4}$ km. Jika lebar rumah Komang adalah $\\frac{1}{200}$ km, berapa jarak rumah Yohana ke rumah Lukas?",
        questionIcon: "Q",
        labels: {
          dropHere: "Taruh di sini"
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
          keyConcepts: "Konsep Kunci",
          importantFormulae: "Perhitungan"
        }
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
          keyConceptsTitle: "Konsep Kunci",
          importantFormulaeTitle: "Perhitungan"
        }
      },

      pages: {
        page1: {
          introText: "Beberapa anak menyukai permainan yang berbeda. <br/>Kita akan melihat diagram gambar untuk mempelajari<br/> permainan favorit mereka. <br/>Bersiaplah untuk membaca dan menjawab pertanyaan!",
        },
        page2: {
          headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",
          quizPanel: {
            questionText: 'Berapa banyak anak yang suka bermain <br/><span style="color:orange">Lompat Tali</span>?',
            options: [
              {
                text: "7",
                iscorrect: false,
                feedback: "Ups! Itu tidak benar. Hitung semua gambar segitiga Lompat Tali.",
              },
              {
                text: "3",
                iscorrect: false,
                feedback: "Ups! Itu tidak benar. Hitung semua gambar segitiga Lompat Tali.",
              },
              {
                text: "5",
                iscorrect: false,
                feedback: "Ups! Itu tidak benar. Hitung semua gambar segitiga Lompat Tali.",
              },
              {
                text: "6",
                iscorrect: true,
                feedback: "Yeay! Ada 6 gambar segitiga, jadi 6 anak suka Lompat Tali.",
              }
            ],
          }
        },
        page3: {
          headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",

          quizPanel: {
            questionText: 'Permainan mana yang paling banyak disukai <span style="color:orange">anak-anak</span>?',
            options: [
              {
                text: "Petak Umpet",
                iscorrect: false,
                triangleRowId: 'hideSeek',
                feedback: "Ups! Ada permainan lain yang lebih banyak disukai anak-anak. Coba lagi.",
              },
              {
                text: "Lompat Tali",
                iscorrect: true,
                triangleRowId: 'ropeJump',
                feedback: "Yeay! Kamu menemukannya! Lompat Tali memiliki gambar segitiga terbanyak.",
              },
              {
                text: "Kelereng",
                iscorrect: false,
                triangleRowId: 'marbles',
                feedback: "Ups! Ada permainan lain yang lebih banyak disukai anak-anak. Coba lagi.",
              },
              {
                text: "Bentengan",
                iscorrect: false,
                triangleRowId: 'bentengan',
                feedback: "Ups! Ada permainan lain yang lebih banyak disukai anak-anak. Coba lagi.",
              }
            ],
          }
        },
        page4: {
          headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",

          quizPanel: {
            questionText: 'Permainan mana yang disukai oleh <span style="color:orange">lebih sedikit anak</span>?',
            options: [
              {
                text: "Petak Umpet",
                iscorrect: false,
                triangleRowId: 'hideSeek',
                feedback: "Ups! Ada permainan lain yang disukai oleh lebih sedikit anak. Coba lagi.",
              },
              {
                text: "Lompat Tali",
                iscorrect: false,
                triangleRowId: 'ropeJump',
                feedback: "Ups! Ada permainan lain yang disukai oleh lebih sedikit anak. Coba lagi.",
              },
              {
                text: "Kelereng",
                iscorrect: true,
                triangleRowId: 'marbles',
                feedback: "Yeay! Kamu benar! Kelereng memiliki gambar segitiga paling sedikit.",
              },
              {
                text: "Bentengan",
                iscorrect: false,
                triangleRowId: 'bentengan',
                feedback: "Ups! Ada permainan lain yang disukai oleh lebih sedikit anak. Coba lagi.",
              }
            ],
          }
        },
        page5: {
          headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",

          quizPanel: {
            questionText: 'Permainan mana yang dimainkan oleh <span style="color:orange">4 anak</span>?',
            options: [
              {
                text: "Petak Umpet",
                iscorrect: true,
                triangleRowId: 'hideSeek',
                feedback: "Yeay! Petak Umpet memiliki 4 gambar segitiga. Jadi, 4 anak suka Petak Umpet.",
              },
              {
                text: "Lompat Tali",
                iscorrect: false,
                triangleRowId: 'ropeJump',
                feedback: "Ups! Itu tidak benar. Temukan baris dengan tepat 4 gambar segitiga.",
              },
              {
                text: "Kelereng",
                iscorrect: false,
                triangleRowId: 'marbles',
                feedback: "Ups! Itu tidak benar. Temukan baris dengan tepat 4 gambar segitiga.",
              },
              {
                text: "Bentengan",
                iscorrect: false,
                triangleRowId: 'bentengan',
                feedback: "Ups! Itu tidak benar. Temukan baris dengan tepat 4 gambar segitiga.",
              }
            ],
          }
        },
        page6: {
          headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",

          quizPanel: {
            questionText: 'Permainan mana yang disukai oleh <span style="color:orange">kurang dari 4</span> anak?',
            options: [
              {
                text: "Petak Umpet",
                iscorrect: false,
                triangleRowId: 'hideSeek',
                feedback: "Hampir! Cari permainan dengan kurang dari 4 gambar segitiga.",
              },
              {
                text: "Lompat Tali",
                iscorrect: false,
                triangleRowId: 'ropeJump',
                feedback: "Ups! Bukan ini. Cari permainan dengan kurang dari 4 gambar segitiga.",
              },
              {
                text: "Kelereng",
                iscorrect: true,
                triangleRowId: 'marbles',
                feedback: "Yeay! Kelereng memiliki 3 gambar segitiga. Itu kurang dari 4 anak.",
              },
              {
                text: "Bentengan",
                iscorrect: false,
                triangleRowId: 'bentengan',
                feedback: "Ups! Bukan ini. Cari permainan dengan kurang dari 4 gambar segitiga.",
              }
            ],
          }
        },
        page7: {
          headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",
          firstClickFeedback: 'Bagus! Permainan ini memiliki lebih dari 4 gambar segitiga. Mari cari satu lagi.',
          secondClickFeedback: 'Kerja bagus! Kamu menemukan kedua permainan dengan lebih dari 4 gambar segitiga.',
          quizPanel: {
            questionText: 'Permainan mana yang disukai oleh <span style="color:orange">lebih dari 4 anak</span>?',
            options: [
              {
                text: "Petak Umpet",
                iscorrect: false,
                triangleRowId: 'hideSeek',
                feedback: "Hampir! Cari permainan yang memiliki lebih dari 4 gambar segitiga.",
              },
              {
                text: "Lompat Tali",
                iscorrect: true,
                triangleRowId: 'ropeJump',
                feedback: "Bagus! Permainan ini memiliki lebih dari 4 gambar segitiga. Mari cari satu lagi.",
              },
              {
                text: "Kelereng",
                iscorrect: false,
                triangleRowId: 'marbles',
                feedback: "Ups! Bukan ini. Cari permainan yang memiliki lebih dari 4 gambar segitiga.",
              },
              {
                text: "Bentengan",
                iscorrect: true,
                triangleRowId: 'bentengan',
                feedback: "Kerja bagus! Kamu menemukan kedua permainan dengan lebih dari 4 gambar segitiga.",
              }
            ],
          },
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",
        },
        page8: {
          headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",

          quizPanel: {
            questionText: '<span style="color:orange">Berapa banyak lebih banyak</span> anak yang suka bermain Bentengan dibandingkan Kelereng?',
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Coba lagi! Bentengan memiliki lebih banyak segitiga daripada Kelereng. Hitung selisihnya.",
              },
              {
                text: "2",
                iscorrect: true,
                feedback: "Kerja bagus! Bentengan memiliki 2 gambar segitiga lebih banyak daripada Kelereng.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Coba lagi! Bentengan memiliki lebih banyak segitiga daripada Kelereng. Hitung selisihnya.",
              },
              {
                text: "1",
                iscorrect: false,
                feedback: "Coba lagi! Bentengan memiliki lebih banyak segitiga daripada Kelereng. Hitung selisihnya.",
              }
            ],
          },
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",
        },
        page9: {
          headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",

          quizPanel: {
            questionText: '<span style="color:orange">Berapa banyak lebih banyak</span> anak yang suka Lompat Tali dibandingkan Petak Umpet?',
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Coba lagi! Lompat Tali memiliki lebih banyak segitiga daripada Petak Umpet. Hitung selisihnya.",
              },
              {
                text: "1",
                iscorrect: false,
                feedback: "Coba lagi! Lompat Tali memiliki lebih banyak segitiga daripada Petak Umpet. Hitung selisihnya.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Coba lagi! Lompat Tali memiliki lebih banyak segitiga daripada Petak Umpet. Hitung selisihnya.",
              },
              {
                text: "2",
                iscorrect: true,
                feedback: "Kerja bagus! Lompat Tali memiliki 2 gambar segitiga lebih banyak daripada Petak Umpet.",
              }
            ],
          },
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",
        },
        page10: {
          headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",

          quizPanel: {
            questionText: '<span style="color:orange">Berapa banyak lebih sedikit</span> anak yang suka bermain Kelereng dibandingkan Lompat Tali?',
            options: [
              {
                text: "3",
                iscorrect: true,
                feedback: "Kerja bagus! Kelereng memiliki 3 gambar segitiga lebih sedikit daripada Lompat Tali.",
              },
              {
                text: "1",
                iscorrect: false,
                feedback: "Coba lagi! Kelereng memiliki lebih sedikit segitiga daripada Lompat Tali. Hitung selisihnya.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Coba lagi! Kelereng memiliki lebih sedikit segitiga daripada Lompat Tali. Hitung selisihnya.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Coba lagi! Kelereng memiliki lebih sedikit segitiga daripada Lompat Tali. Hitung selisihnya.",
              }
            ],
          },
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",
        },
        page11: {
          headerText: "Diagram gambar menunjukkan permainan favorit anak-anak.",
          footerInstruction: "Ketuk pilihan yang benar.",
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",

          quizPanel: {
            questionText: '<span style="color:orange">Berapa banyak lebih sedikit</span> anak yang suka bermain Bentengan dibandingkan Petak Umpet?',
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Coba lagi! Petak Umpet memiliki lebih sedikit segitiga daripada Bentengan. Hitung selisihnya.",
              },
              {
                text: "2",
                iscorrect: false,
                feedback: "Coba lagi! Petak Umpet memiliki lebih sedikit segitiga daripada Bentengan. Hitung selisihnya.",
              },
              {
                text: "4",
                iscorrect: false,
                feedback: "Coba lagi! Petak Umpet memiliki lebih sedikit segitiga daripada Bentengan. Hitung selisihnya.",
              },
              {
                text: "1",
                iscorrect: true,
                feedback: "Kerja bagus! Petak Umpet memiliki 1 gambar segitiga lebih sedikit daripada Bentengan.",
              }
            ],
          },
          instructionAfterQuiz: "Ketuk » untuk pertanyaan berikutnya",
        },
        page12: {
          introText: "Kerja Bagus!<br/><br/>Kamu telah membaca diagram gambar dan menjawab pertanyaan!",
        },
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
