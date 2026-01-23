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
        title: "Marking Equal Sides"
      },
      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        navigationReset: "Resetting to question 1",
      },

      common: {
        propertyShowcase: {
          headerText: "Properties of a Parallelogram",
          headerDescription: "Marking Equal Sides",
          propertyNames: {
            sides: "Sides",
            angles: "Angles",
            diagonals: "Diagonals",
            symmetry: "Symmetry"
          }
        },
        tapAlt: "Tap",
        oppositeSidesEqualMessage: "Opposite sides are equal!",
        tapToSeeEqualSides: "Tap » to see how equal sides are marked.",
        tapToContinue: "Tap » to continue",
        geometry: {
          linesSelected: "Lines selected: {lineLabels}",
          angleBetweenLines: "Angle between the lines: {notation} = {angle}°",
          noAnglesFormed: "Angle between the lines: No angles formed",
          perpendicularLines: "Perpendicular lines: {text}",
          twoSidesAlreadySelected: "Two sides already selected",
          oopsNotParallel: "Oops! Look carefully at the lines. They are not parallel.",
          oopsLookCarefully: "Oops! Look carefully at where the lines meet.",
          wellDoneAllParallel: "Well done! You found all the parallel lines in the shape.",
          wellDoneAllPerpendicular: "Well done! You found all the perpendicular lines in the shape.",
          morePairsToFind: "There's more than one pair of parallel lines in this shape. Try finding another.",
          morePerpendicularPairsToFind: "There's more than one pair of perpendicular lines in this shape. Try finding another."
        }
      },

      pages: {
        page1: {
          title: "Parallel and Perpendicular lines in a shape",
          mainText: "In earlier activities, you explored side, angle, and diagonal properties of quadrilaterals.<br>Now, let's practice how some shapes can belong to more than one category and understand why those classifications are true.<br><br>Tap \"Start\" to begin.",
          instructionText: "and how to name an angle.",
          tapToBegin: "Tap 'Start' to begin.",
          htmlLink: "html link",
          downloadMessage: "Please download and",
          downloadMessage2: "run on browser",
        },
        page2: {
          instruction: "Tap the correct answer.",
          tapToSeeAnotherShape: "Tap » for the next question",
          messageBox: "",
          squareText: "Square",
          headerText: "A rhombus and a kite share some common properties.",
          textBox: "Enter your answer here",
          textBoxDefault: "Selected sides and angles",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Can a rhombus be called a kite?",
            options: [
              {
                text: "Yes always",
                iscorrect: true,
                feedback: "Correct! A rhombus can always be called a kite.",
              },
              {
                text: "Yes sometimes",
                iscorrect: false,
                feedback: "Incorrect. A rhombus can always be called a kite, not just sometimes. A rhombus has all the properties of a kite.",
              },
              {
                text: "No",
                iscorrect: false,
                feedback: "Incorrect. A rhombus can be called a kite because it has all the properties that define a kite.",
              },
            ],
          }
        },
        page3: {
          instruction: "Tap the option with the correct reasoning.",
          tapToSeeAnotherShape: "Tap » for the next question",
          messageBox: "",
          squareText: "Square",
          headerText: "A rhombus and a kite share some common properties.",
          textBox: "Enter your answer here",
          textBoxDefault: "Selected sides and angles",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Why is a rhombus always a kite?",
            options: [
              {
                text: "A rhombus has four right angles.",
                iscorrect: false,
                feedback: "Incorrect feedback 1: Oops! A rhombus can have right angles, but a kite doesn't. Visual— show the rhombus changing with right angles, making it a square.",
              },
              {
                text: "A rhombus has two pairs of equal adjacent sides.",
                iscorrect: true,
                feedback: "Correct feedback 2: Well done! In a rhombus and a kite, the adjacent sides are equal. Show visual in next slides.",
              },
              {
                text: "A rhombus has no parallel sides.",
                iscorrect: false,
                feedback: "Incorrect feedback 3: A rhombus has parallel sides, but a kite doesn't. Show parallel side markings >> or > for rhombus for opposite sides.",
              },
            ],
          }
        },
        page4: {
          instruction: "Tap the correct answer.",
          tapToSeeAnotherShape: "Tap » for the next question",
          messageBox: "",
          squareText: "Square",
          headerText: "Answer the questions using the properties of quadrilaterals.",
          textBox: "Enter your answer here",
          textBoxDefault: "Selected sides and angles",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Can a rhombus be called a kite?",
            options: [
              {
                text: "Yes - always",
                iscorrect: true,
                feedback: "Correct! A rhombus has all four sides equal, which means it also has two pairs of equal adjacent sides. Therefore, every rhombus is a kite.",
              },
              {
                text: "No - Never",
                iscorrect: false,
                feedback: "Oops! A kite has two pairs of equal adjacent sides, and a rhombus has all four equal. So every rhombus is a kite.",
              },
              {
                text: "Sometimes",
                iscorrect: false,
                feedback: "Oops! A kite has two pairs of equal adjacent sides, and a rhombus has all four equal. So every rhombus is a kite.",
              },
            ],
          }
        },
        page5: {
          instruction: "Tap the correct answer.",
          tapToSeeAnotherShape: "Tap » for the next question",
          messageBox: "",
          squareText: "Square",
          headerText: "Answer the questions using the properties of quadrilaterals.",
          textBox: "Enter your answer here",
          textBoxDefault: "Selected sides and angles",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Can a kite be called a rhombus?",
            options: [
              {
                text: "Yes - always",
                iscorrect: false,
                feedback: "Oops! A kite is not always a rhombus. A kite has two pairs of equal adjacent sides, but a rhombus has all four sides equal. Only when a kite has all four sides equal can it be called a rhombus.",
              },
              {
                text: "No - Never",
                iscorrect: false,
                feedback: "Oops! A kite can sometimes be a rhombus. When a kite has all four sides equal, it is also a rhombus.",
              },
              {
                text: "Sometimes",
                iscorrect: true,
                feedback: "Correct! A kite can sometimes be a rhombus.",
              },
            ],
          }
        },
        page6: {
          instruction: "Tap the option with the correct reasoning.",
          tapToSeeAnotherShape: "Tap » for the next question",
          messageBox: "",
          squareText: "Square",
          headerText: "A kite and a rhombus share some common properties.",
          textBox: "Enter your answer here",
          textBoxDefault: "Selected sides and angles",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "When does a kite become a rhombus?",
            options: [
              {
                text: "When one of the angle of the kite is 90°.",
                iscorrect: false,
                feedback: "Incorrect! Having a right angle does not make a kite a rhombus.",
              },
              {
                text: "When only the opposite sides of the kite are equal.",
                iscorrect: false,
                feedback: "Not quite. Equal opposite sides form a different type of quadrilateral, not a rhombus.",
              },
              {
                text: "When all the sides of the kite are equal.",
                iscorrect: true,
                feedback: "A kite becomes a rhombus only when all four sides are equal.",
              },
            ],
          },
          buttons: {
            partsOfAnAngle: "Parts of an Angle",
            namingAnAngle: "Naming an Angle",
            vertex: "Vertex",
            arms: "Arms",
            measure: "Measure",
            threeCapitalLetters: "3 Capital<br>Letters",
            vertex2: "Vertex",
            greekLetters: "Greek<br>Letters",
          },
          stateConfig: {
            leftPanelText: {
              default: {
                default: 'An <span style="color: #FF9900;">angle</span> is defined by the corner point, the rays (or line segments) that span from it, and the region enclosed between the rays about the point.',
              },
              parts: {
                default: 'An <span style="color: #FF9900;">angle</span> is defined by the corner point, the rays (or line segments) that span from it, and the region enclosed between the rays about the point.',
                vertex1: 'The corner point is called the <span style="color: #FF9900;">vertex</span> of the angle. It is the common point to both the rays forming the angle.',
                arms: 'The rays are referred to as <span style="color: #FF9900;">arms</span> or <span style="color: #FF9900;">legs</span> of the angle.<br>Sometimes these might be line segments too.<br>These form the bounding of the angle.',
                measure: 'The region bounded between the <span style="color: #FF9900;">arms</span> and the point is the <span style="color: #FF9900;">measure</span> of the <span style="color: #FF9900;">angle</span>.',
              },
              naming: {
                default: 'We can name an <span style="color: #FF9900;">angle</span> in three different ways!<br><br>To name an <span style="color: #FF9900;">angle</span>, we use the <span style="color: #FF9900;">angle</span> symbol (∠).<br><br>An arc shows which <span style="color: #FF9900;">angle</span> is being considered.',
                capital: '<span style="color: #FF9900;">Angles</span> are named using a point on one arm, the vertex, and a point on the other arm.<br><br>The vertex is written in the middle and the other two letters lie on the arms of the angle.',
                vertex2: 'An <span style="color: #FF9900;">angle</span> can be named using only the <span style="color: #FF9900;">vertex letter</span> when there is only one angle at that vertex.',
                greek: '<span style="color: #FF9900;">Angles</span> can also be named using Greek letters, such as ∠α, ∠β, ∠θ, or ∠ω.',
              },
            },
            instructionText: {
              default: {
                default: 'Tap a button.',
              },
              parts: {
                default: 'Click the buttons to notice each part.',
                vertex1: 'Click the buttons to notice each part.',
                arms: 'Click the buttons to notice each part.',
                measure: 'Click the buttons to notice each part.',
              },
              naming: {
                default: 'Tap a button.',
                capital: 'Tap a button.',
                vertex2: 'Tap a button.',
                greek: 'Tap a button.',
              },
            },
            infoTextboxText: {
              default: {
                default: '',
              },
              parts: {
                default: '',
                vertex1: '',
                arms: '',
                measure: '',
              },
              naming: {
                default: '',
                capital: '∠AOB = 50° or ∠BOA = 50°',
                vertex2: '∠O = 50°',
                greek: 'θ = 50°',
              },
            },
          }
        },
        page7: {
          instruction: "Choose the correct answer",
          tapToSeeAnotherShape: "Tap » to see the transformation.",
          messageBox: "",
          squareText: "Square",
          headerText: "Answer the questions using the properties of quadrilaterals.",
          textBox: "Enter your answer here",
          textBoxDefault: "Selected sides and angles",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Can a kite be called a rhombus?",
            options: [
              {
                text: "Yes - always",
                iscorrect: false,
                feedback: "Incorrect! A kite is not always a rhombus. A kite becomes a rhombus only when all its sides are equal.",
              },
              {
                text: "No - never",
                iscorrect: false,
                feedback: "Incorrect! A kite can be a rhombus when all its sides are equal.",
              },
              {
                text: "Sometimes",
                iscorrect: true,
                feedback: "Correct! A kite can be called a rhombus when all four sides are equal. Otherwise, it remains just a kite.",
              },
            ],
          },
        },
        page8: {
          instruction: "Choose the correct answer",
          tapToSeeAnotherShape: "Tap » to see the transformation.",
          messageBox: "",
          squareText: "Square",
          headerText: "Answer the questions using the properties of quadrilaterals.",
          textBox: "A kite can be a rhombus when all its sides are equal.<br>Let us see the Kite transform into a rhombus",
          textBoxDefault: "Selected sides and angles",
        },
        page9: {
          instruction: "Choose the correct answer",
          tapToSeeAnotherShape: "Tap » to see the transformation.",
          messageBox: "",
          squareText: "Square",
          headerText: "A rectangle with all equal sides is a square.",
          textBox: "Enter your answer here",
          textBoxDefault: "Selected sides and angles",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Can a rectangle be called a square?",
            options: [
              {
                text: "Yes - always",
                iscorrect: false,
                feedback: "Incorrect. A rectangle is a square only when all its sides are equal.",
              },
              {
                text: "No - never",
                iscorrect: false,
                feedback: "Incorrect. A rectangle can be a square when all its sides are equal.",
              },
              {
                text: "Sometimes",
                iscorrect: true,
                feedback: "Correct! A rectangle is a square only when all four sides are equal. Otherwise, it remains just a rectangle.",
              },
            ],
          },
        },
        page10: {
          instruction: "Choose the correct answer",
          tapToSeeAnotherShape: "Tap » to see the transformation.",
          messageBox: "",
          squareText: "Square",
          headerText: "A rectangle with all equal sides is a square.",
          textBox: "A rectangle is a square only when all its sides are equal.<br>Let us see the rectangle transform into a square",
          textBoxDefault: "Selected sides and angles",
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
      appInfo: {
        title: "Menandai Sisi yang Sama Panjang"
      },
      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
      },
      common: {
        propertyShowcase: {
          headerText: "Sifat-sifat Jajar Genjang",
          headerDescription: "Menandai Sisi yang Sama Panjang",
          propertyNames: {
            sides: "Sisi",
            angles: "Sudut",
            diagonals: "Diagonal",
            symmetry: "Simetri"
          }
        },
        tapAlt: "Ketuk",
        oppositeSidesEqualMessage: "Sisi-sisi yang berhadapan sama panjang!",
        tapToSeeEqualSides: "Ketuk » untuk melihat bagaimana sisi yang sama panjang ditandai.",
        tapToContinue: "Ketuk » untuk melanjutkan",
        geometry: {
          linesSelected: "Garis yang dipilih: {lineLabels}",
          angleBetweenLines: "Sudut antara garis: {notation} = {angle}°",
          noAnglesFormed: "Sudut antara garis: Tidak ada sudut yang terbentuk",
          perpendicularLines: "Garis tegak lurus: {text}",
          twoSidesAlreadySelected: "Dua sisi sudah dipilih",
          oopsNotParallel: "Ups! Perhatikan baik-baik garisnya. Mereka tidak sejajar.",
          oopsLookCarefully: "Ups! Perhatikan baik-baik di mana garisnya bertemu.",
          wellDoneAllParallel: "Bagus! Anda menemukan semua garis sejajar dalam bentuk tersebut.",
          wellDoneAllPerpendicular: "Bagus! Anda menemukan semua garis tegak lurus dalam bentuk tersebut.",
          morePairsToFind: "Ada lebih dari satu pasang garis sejajar dalam bentuk ini. Coba cari yang lain.",
          morePerpendicularPairsToFind: "Ada lebih dari satu pasang garis tegak lurus dalam bentuk ini. Coba cari yang lain."
        }
      },
      pages: {
        page1: {
          title: "Apa itu Sudut?",
          mainText: "Mari belajar mengidentifikasi bagian-bagian sudut dan cara menamai sudut.<br><br><br>Ketuk 'Mulai' untuk memulai.",
          instructionText: "dan cara menamai sudut.",
          tapToBegin: "Ketuk 'Mulai' untuk memulai.",
          htmlLink: "tautan html",
          downloadMessage: "Silakan unduh dan",
          downloadMessage2: "jalankan di browser",
        },
        page2: {
          instruction: "Ketuk jawaban yang benar.",
          tapToSeeAnotherShape: "Ketuk » untuk pertanyaan berikutnya",
          messageBox: "",
          squareText: "Persegi",
          headerText: "Belah ketupat dan layang-layang memiliki beberapa sifat yang sama.",
          textBox: "Masukkan jawaban Anda di sini",
          textBoxDefault: "Sisi dan sudut yang dipilih",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Apakah belah ketupat bisa disebut layang-layang?",
            options: [
              {
                text: "Ya selalu",
                iscorrect: true,
                feedback: "Benar! Belah ketupat selalu bisa disebut layang-layang.",
              },
              {
                text: "Ya kadang-kadang",
                iscorrect: false,
                feedback: "Salah. Belah ketupat selalu bisa disebut layang-layang, bukan hanya kadang-kadang. Belah ketupat memiliki semua sifat layang-layang.",
              },
              {
                text: "Tidak",
                iscorrect: false,
                feedback: "Salah. Belah ketupat bisa disebut layang-layang karena memiliki semua sifat yang mendefinisikan layang-layang.",
              },
            ],
          },
          buttons: {
            partsOfAnAngle: "Bagian-bagian Sudut",
            namingAnAngle: "Penamaan Sudut",
            vertex: "Titik Sudut",
            arms: "Kaki Sudut",
            measure: "Ukuran",
            threeCapitalLetters: "3 Huruf<br>Kapital",
            vertex2: "Titik Sudut",
            greekLetters: "Huruf<br>Yunani",
          },
          stateConfig: {
            leftPanelText: {
              default: {
                default: 'Sebuah <span style="color: #FF9900;">sudut</span> didefinisikan oleh titik sudut, sinar (atau ruas garis) yang memanjang darinya, dan daerah yang dibatasi antara sinar-sinar tersebut di sekitar titik.',
              },
              parts: {
                default: 'Sebuah <span style="color: #FF9900;">sudut</span> didefinisikan oleh titik sudut, sinar (atau ruas garis) yang memanjang darinya, dan daerah yang dibatasi antara sinar-sinar tersebut di sekitar titik.',
                vertex1: 'Titik sudut disebut <span style="color: #FF9900;">titik sudut</span> dari sudut. Ini adalah titik persekutuan dari kedua sinar yang membentuk sudut.',
                arms: 'Sinar-sinar disebut sebagai <span style="color: #FF9900;">kaki sudut</span> atau <span style="color: #FF9900;">lengan</span> dari sudut.<br>Kadang-kadang ini mungkin juga berupa ruas garis.<br>Ini membentuk batas dari sudut.',
                measure: 'Daerah yang dibatasi antara <span style="color: #FF9900;">kaki sudut</span> dan titik adalah <span style="color: #FF9900;">ukuran</span> dari <span style="color: #FF9900;">sudut</span>.',
              },
              naming: {
                default: 'Kita dapat menamai sebuah <span style="color: #FF9900;">sudut</span> dengan tiga cara berbeda!<br><br>Untuk menamai sebuah <span style="color: #FF9900;">sudut</span>, kita menggunakan simbol <span style="color: #FF9900;">sudut</span> (∠).<br><br>Sebuah busur menunjukkan <span style="color: #FF9900;">sudut</span> mana yang sedang dipertimbangkan.',
                capital: '<span style="color: #FF9900;">Sudut</span> dinamai menggunakan titik pada satu kaki, titik sudut, dan titik pada kaki lainnya.<br><br>Titik sudut ditulis di tengah dan dua huruf lainnya terletak pada kaki sudut.',
                vertex2: 'Sebuah <span style="color: #FF9900;">sudut</span> dapat dinamai hanya menggunakan <span style="color: #FF9900;">huruf titik sudut</span> ketika hanya ada satu sudut pada titik sudut tersebut.',
                greek: '<span style="color: #FF9900;">Sudut</span> juga dapat dinamai menggunakan huruf Yunani, seperti ∠α, ∠β, ∠θ, atau ∠ω.',
              },
            },
            instructionText: {
              default: {
                default: 'Ketuk tombol.',
              },
              parts: {
                default: 'Klik tombol untuk memperhatikan setiap bagian.',
                vertex1: 'Klik tombol untuk memperhatikan setiap bagian.',
                arms: 'Klik tombol untuk memperhatikan setiap bagian.',
                measure: 'Klik tombol untuk memperhatikan setiap bagian.',
              },
              naming: {
                default: 'Ketuk tombol.',
                capital: 'Ketuk tombol.',
                vertex2: 'Ketuk tombol.',
                greek: 'Ketuk tombol.',
              },
            },
            infoTextboxText: {
              default: {
                default: '',
              },
              parts: {
                default: '',
                vertex1: '',
                arms: '',
                measure: '',
              },
              naming: {
                default: '',
                capital: '∠AOB = 50° atau ∠BOA = 50°',
                vertex2: '∠O = 50°',
                greek: 'θ = 50°',
              },
            },
          },
          quizPanel: {
            quizSubtype: "QT2",
            questionText: "Apakah garis-garis tersebut membentuk sudut siku-siku (90°) di tempat mereka bertemu?",
            options: [
              {
                text: "Ya",
                iscorrect: true,
                feedback: "Ya, garis-garis tersebut bertemu untuk membentuk sudut siku-siku (90°).",
              },
              {
                text: "Tidak",
                iscorrect: false,
                feedback: "Ups! Periksa penandaan sudut di persimpangan.",
              },
            ],
          }
        },
        page3: {
          instruction: "Ketuk opsi dengan alasan yang benar.",
          tapToSeeAnotherShape: "Ketuk » untuk pertanyaan berikutnya",
          messageBox: "",
          squareText: "Persegi",
          headerText: "Belah ketupat dan layang-layang memiliki beberapa sifat yang sama.",
          textBox: "Masukkan jawaban Anda di sini",
          textBoxDefault: "Sisi dan sudut yang dipilih",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Mengapa belah ketupat selalu merupakan layang-layang?",
            options: [
              {
                text: "Belah ketupat memiliki empat sudut siku-siku.",
                iscorrect: false,
                feedback: "Umpan balik salah 1: Ups! Belah ketupat bisa memiliki sudut siku-siku, tetapi layang-layang tidak. Visual— tunjukkan belah ketupat berubah dengan sudut siku-siku, menjadikannya persegi.",
              },
              {
                text: "Belah ketupat memiliki dua pasang sisi yang sama dan berdekatan.",
                iscorrect: true,
                feedback: "Umpan balik benar 2: Bagus! Dalam belah ketupat dan layang-layang, sisi-sisi yang berdekatan sama panjang. Tunjukkan visual di slide berikutnya.",
              },
              {
                text: "Belah ketupat tidak memiliki sisi sejajar.",
                iscorrect: false,
                feedback: "Umpan balik salah 3: Belah ketupat memiliki sisi sejajar, tetapi layang-layang tidak. Tunjukkan tanda sisi sejajar >> atau > untuk belah ketupat pada sisi yang berlawanan.",
              },
            ],
          }
        },
        page4: {
          instruction: "Ketuk jawaban yang benar.",
          tapToSeeAnotherShape: "Ketuk » untuk pertanyaan berikutnya",
          messageBox: "",
          squareText: "Persegi",
          headerText: "Jawab pertanyaan menggunakan sifat-sifat segi empat.",
          textBox: "Masukkan jawaban Anda di sini",
          textBoxDefault: "Sisi dan sudut yang dipilih",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Bisakah belah ketupat disebut layang-layang?",
            options: [
              {
                text: "Ya - selalu",
                iscorrect: true,
                feedback: "Benar! Belah ketupat memiliki keempat sisi sama panjang, yang berarti juga memiliki dua pasang sisi yang sama dan berdekatan. Oleh karena itu, setiap belah ketupat adalah layang-layang.",
              },
              {
                text: "Tidak - Tidak pernah",
                iscorrect: false,
                feedback: "Ups! Layang-layang memiliki dua pasang sisi yang sama dan berdekatan, dan belah ketupat memiliki keempat sisi sama panjang. Jadi setiap belah ketupat adalah layang-layang.",
              },
              {
                text: "Kadang-kadang",
                iscorrect: false,
                feedback: "Ups! Layang-layang memiliki dua pasang sisi yang sama dan berdekatan, dan belah ketupat memiliki keempat sisi sama panjang. Jadi setiap belah ketupat adalah layang-layang.",
              },
            ],
          }
        },
        page5: {
          instruction: "Ketuk jawaban yang benar.",
          tapToSeeAnotherShape: "Ketuk » untuk pertanyaan berikutnya",
          messageBox: "",
          squareText: "Persegi",
          headerText: "Jawab pertanyaan menggunakan sifat-sifat segi empat.",
          textBox: "Masukkan jawaban Anda di sini",
          textBoxDefault: "Sisi dan sudut yang dipilih",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Bisakah layang-layang disebut belah ketupat?",
            options: [
              {
                text: "Ya - selalu",
                iscorrect: false,
                feedback: "Ups! Layang-layang tidak selalu merupakan belah ketupat. Layang-layang memiliki dua pasang sisi yang sama dan berdekatan, tetapi belah ketupat memiliki keempat sisi sama panjang. Hanya ketika layang-layang memiliki keempat sisi sama panjang, ia dapat disebut belah ketupat.",
              },
              {
                text: "Tidak - Tidak pernah",
                iscorrect: false,
                feedback: "Ups! Layang-layang kadang-kadang bisa menjadi belah ketupat. Ketika layang-layang memiliki keempat sisi sama panjang, ia juga merupakan belah ketupat.",
              },
              {
                text: "Kadang-kadang",
                iscorrect: true,
                feedback: "Benar! Layang-layang kadang-kadang bisa menjadi belah ketupat.",
              },
            ],
          }
        },
        page6: {
          instruction: "Ketuk opsi dengan alasan yang benar.",
          tapToSeeAnotherShape: "Ketuk » untuk pertanyaan berikutnya",
          messageBox: "",
          squareText: "Persegi",
          headerText: "Layang-layang dan belah ketupat memiliki beberapa sifat yang sama.",
          textBox: "Masukkan jawaban Anda di sini",
          textBoxDefault: "Sisi dan sudut yang dipilih",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Kapan layang-layang menjadi belah ketupat?",
            options: [
              {
                text: "Ketika salah satu sudut layang-layang adalah 90°.",
                iscorrect: false,
                feedback: "Salah! Memiliki sudut siku-siku tidak membuat layang-layang menjadi belah ketupat.",
              },
              {
                text: "Ketika hanya sisi-sisi yang berhadapan dari layang-layang yang sama panjang.",
                iscorrect: false,
                feedback: "Tidak tepat. Sisi-sisi yang berhadapan sama panjang membentuk jenis segi empat yang berbeda, bukan belah ketupat.",
              },
              {
                text: "Ketika semua sisi layang-layang sama panjang.",
                iscorrect: true,
                feedback: "Layang-layang menjadi belah ketupat hanya ketika keempat sisinya sama panjang.",
              },
            ],
          }
        },
        page7: {
          instruction: "Pilih jawaban yang benar",
          tapToSeeAnotherShape: "Ketuk » untuk melihat transformasi.",
          messageBox: "",
          squareText: "Persegi",
          headerText: "Jawab pertanyaan menggunakan sifat-sifat segi empat.",
          textBox: "Masukkan jawaban Anda di sini",
          textBoxDefault: "Sisi dan sudut yang dipilih",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Bisakah layang-layang disebut belah ketupat?",
            options: [
              {
                text: "Ya - selalu",
                iscorrect: false,
                feedback: "Salah! Layang-layang tidak selalu belah ketupat. Layang-layang menjadi belah ketupat hanya ketika semua sisinya sama panjang.",
              },
              {
                text: "Tidak - tidak pernah",
                iscorrect: false,
                feedback: "Salah! Layang-layang bisa menjadi belah ketupat ketika semua sisinya sama panjang.",
              },
              {
                text: "Kadang-kadang",
                iscorrect: true,
                feedback: "Benar! Layang-layang bisa disebut belah ketupat ketika keempat sisinya sama panjang. Jika tidak, tetap hanya layang-layang.",
              },
            ],
          },
        },
        page8: {
          instruction: "Pilih jawaban yang benar",
          tapToSeeAnotherShape: "Ketuk » untuk melihat transformasi.",
          messageBox: "",
          squareText: "Persegi",
          headerText: "Jawab pertanyaan menggunakan sifat-sifat segi empat.",
          textBox: "Layang-layang bisa menjadi belah ketupat ketika semua sisinya sama panjang.<br>Mari kita lihat Layang-layang berubah menjadi belah ketupat",
          textBoxDefault: "Sisi dan sudut yang dipilih",
        },
        page9: {
          instruction: "Pilih jawaban yang benar",
          tapToSeeAnotherShape: "Ketuk » untuk melihat transformasi.",
          messageBox: "",
          squareText: "Persegi",
          headerText: "Persegi panjang dengan semua sisi sama panjang adalah persegi.",
          textBox: "Masukkan jawaban Anda di sini",
          textBoxDefault: "Sisi dan sudut yang dipilih",
          quizPanel: {
            quizSubtype: "QT3R",
            questionText: "Bisakah persegi panjang disebut persegi?",
            options: [
              {
                text: "Ya - selalu",
                iscorrect: false,
                feedback: "Salah. Persegi panjang adalah persegi hanya ketika semua sisinya sama panjang.",
              },
              {
                text: "Tidak - tidak pernah",
                iscorrect: false,
                feedback: "Salah. Persegi panjang bisa menjadi persegi ketika semua sisinya sama panjang.",
              },
              {
                text: "Kadang-kadang",
                iscorrect: true,
                feedback: "Benar! Persegi panjang adalah persegi hanya ketika keempat sisinya sama panjang. Jika tidak, tetap hanya persegi panjang.",
              },
            ],
          },
        },
        page10: {
          instruction: "Pilih jawaban yang benar",
          tapToSeeAnotherShape: "Ketuk » untuk melihat transformasi.",
          messageBox: "",
          squareText: "Persegi",
          headerText: "Persegi panjang dengan semua sisi sama panjang adalah persegi.",
          textBox: "Persegi panjang adalah persegi hanya ketika semua sisinya sama panjang.<br>Mari kita lihat persegi panjang berubah menjadi persegi",
          textBoxDefault: "Sisi dan sudut yang dipilih",
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

/**
 * Page 2 State Configuration
 * Defines component visibility, styling, and text content based on page2BaseState and page2SubBaseState
 * 
 * States:
 * - page2BaseState: 'default', 'parts', 'naming'
 * - page2SubBaseState: 'default', 'vertex1', 'arms', 'measure', 'capital', 'vertex2', 'greek'
 */
const Page2StateConfig = {
  // State values
  baseStates: ['default', 'parts', 'naming'],
  subBaseStates: ['default', 'vertex1', 'arms', 'measure', 'capital', 'vertex2', 'greek'],
  
  // Colors
  colors: {
    original: '#FF9900',  // Orange
    gray: '#9B8CC2',      // Gray/purple
    highlight: '#FF9900'
  },
  
  
  // Component visibility and styling based on states
  // Format: { visible: boolean, backgroundColor?: string }
  components: {
    // page2-button-parts-tap: visible and coordinates [661, 50, 1061, 120] for all states
    'page2-button-parts-tap': {
      'default': { 'default': { visible: true } },
      'parts': { 'default': { visible: true }, 'vertex1': { visible: true }, 'arms': { visible: true }, 'measure': { visible: true } },
      'naming': { 'default': { visible: true }, 'capital': { visible: true }, 'vertex2': { visible: true }, 'greek': { visible: true } },
    },
    
    // page2-button-parts: visibility and color based on states
    'page2-button-parts': {
      'default': { 'default': { visible: true, backgroundColor: '#FF9900' } },
      'parts': { 'default': { visible: true, backgroundColor: '#9B8CC2' }, 'vertex1': { visible: true, backgroundColor: '#9B8CC2' }, 'arms': { visible: true, backgroundColor: '#9B8CC2' }, 'measure': { visible: true, backgroundColor: '#9B8CC2' } },
      'naming': { 'default': { visible: true, backgroundColor: '#ADADAD' }, 'capital': { visible: true, backgroundColor: '#ADADAD' }, 'vertex2': { visible: true, backgroundColor: '#ADADAD' }, 'greek': { visible: true, backgroundColor: '#ADADAD' } },
    },
    
    // page2-button-naming: visibility and color based on states
    'page2-button-naming': {
      'default': { 'default': { visible: true, backgroundColor: '#FF9900' } },
      'parts': { 'default': { visible: true, backgroundColor: '#ADADAD' }, 'vertex1': { visible: true, backgroundColor: '#ADADAD' }, 'arms': { visible: true, backgroundColor: '#ADADAD' }, 'measure': { visible: true, backgroundColor: '#ADADAD' } },
      'naming': { 'default': { visible: true, backgroundColor: '#9B8CC2' }, 'capital': { visible: true, backgroundColor: '#9B8CC2' }, 'vertex2': { visible: true, backgroundColor: '#9B8CC2' }, 'greek': { visible: true, backgroundColor: '#9B8CC2' } },
    },
    
    // page2-button-vertex: visibility based on states (row 1 buttons - Parts section)
    'page2-button-vertex': {
      'default': { 'default': { visible: false } },
      'parts': { 'default': { visible: true, backgroundColor: '#FF9900' }, 'vertex1': { visible: true, backgroundColor: '#9B8CC2' }, 'arms': { visible: true, backgroundColor: '#FF9900' }, 'measure': { visible: true, backgroundColor: '#FF9900' } },
      'naming': { 'default': { visible: false }, 'capital': { visible: false }, 'vertex2': { visible: false }, 'greek': { visible: false } },
    },
    
    // page2-button-arms: visibility based on states
    'page2-button-arms': {
      'default': { 'default': { visible: false } },
      'parts': { 'default': { visible: true, backgroundColor: '#FF9900' }, 'vertex1': { visible: true, backgroundColor: '#FF9900' }, 'arms': { visible: true, backgroundColor: '#9B8CC2' }, 'measure': { visible: true, backgroundColor: '#FF9900' } },
      'naming': { 'default': { visible: false }, 'capital': { visible: false }, 'vertex2': { visible: false }, 'greek': { visible: false } },
    },
    
    // page2-button-measure: visibility based on states
    'page2-button-measure': {
      'default': { 'default': { visible: false } },
      'parts': { 'default': { visible: true, backgroundColor: '#FF9900' }, 'vertex1': { visible: true, backgroundColor: '#FF9900' }, 'arms': { visible: true, backgroundColor: '#FF9900' }, 'measure': { visible: true, backgroundColor: '#9B8CC2' } },
      'naming': { 'default': { visible: false }, 'capital': { visible: false }, 'vertex2': { visible: false }, 'greek': { visible: false } },
    },
    
    // page2-button-3-capital-letters: visibility based on states (row 2 buttons - Naming section)
    'page2-button-3-capital-letters': {
      'default': { 'default': { visible: false } },
      'parts': { 'default': { visible: false }, 'vertex1': { visible: false }, 'arms': { visible: false }, 'measure': { visible: false } },
      'naming': { 'default': { visible: true, backgroundColor: '#FF9900' }, 'capital': { visible: true, backgroundColor: '#9B8CC2' }, 'vertex2': { visible: true, backgroundColor: '#FF9900' }, 'greek': { visible: true, backgroundColor: '#FF9900' } },
    },
    
    // page2-button-vertex-2: visibility based on states
    'page2-button-vertex-2': {
      'default': { 'default': { visible: false } },
      'parts': { 'default': { visible: false }, 'vertex1': { visible: false }, 'arms': { visible: false }, 'measure': { visible: false } },
      'naming': { 'default': { visible: true, backgroundColor: '#FF9900' }, 'capital': { visible: true, backgroundColor: '#FF9900' }, 'vertex2': { visible: true, backgroundColor: '#9B8CC2' }, 'greek': { visible: true, backgroundColor: '#FF9900' } },
    },
    
    // page2-button-greek-letters: visibility based on states
    'page2-button-greek-letters': {
      'default': { 'default': { visible: false } },
      'parts': { 'default': { visible: false }, 'vertex1': { visible: false }, 'arms': { visible: false }, 'measure': { visible: false } },
      'naming': { 'default': { visible: true, backgroundColor: '#FF9900' }, 'capital': { visible: true, backgroundColor: '#FF9900' }, 'vertex2': { visible: true, backgroundColor: '#FF9900' }, 'greek': { visible: true, backgroundColor: '#9B8CC2' } },
    },
  },
  
  // Geometry grid changes based on states
  geometryGrid: {
    'default': { 'default': { rayColor: 'original', vertexGlow: false, arcThickness: '5gc', arcBlink: false, arcFill: false } },
    'parts': {
      'default': { rayColor: 'original', vertexGlow: false, arcThickness: '5gc', arcBlink: false, arcFill: false },
      'vertex1': { rayColor: 'original', vertexGlow: true, vertexPulsate: true, vertexScale: 2.5, vertexPulsateMin: 1.25, vertexPulsateMax: 2.5, arcThickness: '5gc', arcBlink: false, arcFill: false },
      'arms': { rayColor: '#FF9900', rayThickness: '6gc', rayBlink: true, labelBlink: true, vertexGlow: false, arcThickness: '8gc', arcBlink: false, arcFill: false },
      'measure': { rayColor: 'original', vertexGlow: false, arcThickness: '10gc', arcBlink: true, arcFill: true, arcFillColor: '#FF9900', arcFillOpacity: 0.45 },
    },
    'naming': {
      'default': { rayColor: 'original', vertexGlow: false, arcThickness: '5gc', arcBlink: false, arcFill: false },
      'capital': { rayColor: 'original', vertexGlow: false, arcThickness: '5gc', arcBlink: false, arcFill: true, arcFillColor: '#00AA00', arcFillOpacity: 0.45, arcTextColor: '#FFFFFF', arcAngle: 50 },
      'vertex2': { rayColor: 'original', vertexGlow: false, arcThickness: '5gc', arcBlink: false, arcFill: true, arcFillColor: '#00AA00', arcFillOpacity: 0.45, arcTextColor: '#FFFFFF', arcAngle: 50 },
      'greek': { rayColor: 'original', vertexGlow: false, arcThickness: '5gc', arcBlink: false, arcFill: true, arcFillColor: '#00AA00', arcFillOpacity: 0.45, arcTextColor: '#FFFFFF', arcAngle: 50, arcCustomText: 'θ = 50°' },
    },
  },
  
  // Button click handlers - which states to set when button is clicked
  // Updated as per image specification
  buttonActions: {
    'page2-button-parts': { baseState: 'parts', subBaseState: 'default' },
    'page2-button-naming': { baseState: 'naming', subBaseState: 'default' },
    'page2-button-vertex': { baseState: 'parts', subBaseState: 'vertex1' },
    'page2-button-arms': { baseState: 'parts', subBaseState: 'arms' },
    'page2-button-measure': { baseState: 'parts', subBaseState: 'measure' },
    'page2-button-3-capital-letters': { baseState: 'naming', subBaseState: 'capital' },
    'page2-button-vertex-2': { baseState: 'naming', subBaseState: 'vertex2' },
    'page2-button-greek-letters': { baseState: 'naming', subBaseState: 'greek' },
  },
  
  /**
   * Get component config for current state
   * @param {string} componentId - Component ID
   * @param {string} baseState - Current base state
   * @param {string} subBaseState - Current sub-base state
   * @returns {Object} Component config { visible, backgroundColor, ... }
   */
  getComponentConfig: function(componentId, baseState, subBaseState) {
    const componentConfig = this.components[componentId];
    if (!componentConfig) return { visible: true };
    
    const baseConfig = componentConfig[baseState];
    if (!baseConfig) return { visible: true };
    
    const subConfig = baseConfig[subBaseState];
    if (!subConfig) return baseConfig['default'] || { visible: true };
    
    return subConfig;
  },
  
  /**
   * Get left panel text for current state
   * @param {string} baseState - Current base state
   * @param {string} subBaseState - Current sub-base state
   * @returns {string} Text content (with HTML)
   */
  getLeftPanelText: function(baseState, subBaseState) {
    if (typeof window === 'undefined' || !window.i18n) {
      return '';
    }
    
    try {
      const key = `pages.page2.stateConfig.leftPanelText.${baseState}.${subBaseState}`;
      const text = window.i18n.t(key);
      if (text && text !== key) {
        return text;
      }
      // Fallback to default for this baseState
      const defaultKey = `pages.page2.stateConfig.leftPanelText.${baseState}.default`;
      const defaultText = window.i18n.t(defaultKey);
      if (defaultText && defaultText !== defaultKey) {
        return defaultText;
      }
      // Final fallback to default/default
      const finalKey = 'pages.page2.stateConfig.leftPanelText.default.default';
      const finalText = window.i18n.t(finalKey);
      return (finalText && finalText !== finalKey) ? finalText : '';
    } catch (e) {
      console.warn('Error getting left panel text:', e);
      return '';
    }
  },
  
  /**
   * Get instruction text for current state
   * @param {string} baseState - Current base state
   * @param {string} subBaseState - Current sub-base state
   * @returns {string} Instruction text
   */
  getInstructionText: function(baseState, subBaseState) {
    if (typeof window === 'undefined' || !window.i18n) {
      return 'Tap a button.';
    }
    
    try {
      const key = `pages.page2.stateConfig.instructionText.${baseState}.${subBaseState}`;
      const text = window.i18n.t(key);
      if (text && text !== key) {
        return text;
      }
      // Fallback to default for this baseState
      const defaultKey = `pages.page2.stateConfig.instructionText.${baseState}.default`;
      const defaultText = window.i18n.t(defaultKey);
      if (defaultText && defaultText !== defaultKey) {
        return defaultText;
      }
      // Final fallback to default/default
      const finalKey = 'pages.page2.stateConfig.instructionText.default.default';
      const finalText = window.i18n.t(finalKey);
      return (finalText && finalText !== finalKey) ? finalText : 'Tap a button.';
    } catch (e) {
      console.warn('Error getting instruction text:', e);
      return 'Tap a button.';
    }
  },
  
  /**
   * Get info textbox text for current state
   * @param {string} baseState - Current base state
   * @param {string} subBaseState - Current sub-base state
   * @returns {string} Info textbox text
   */
  getInfoTextboxText: function(baseState, subBaseState) {
    if (typeof window === 'undefined' || !window.i18n) {
      return '';
    }
    
    try {
      const key = `pages.page2.stateConfig.infoTextboxText.${baseState}.${subBaseState}`;
      const text = window.i18n.t(key);
      if (text && text !== key) {
        return text;
      }
      // Fallback to default for this baseState
      const defaultKey = `pages.page2.stateConfig.infoTextboxText.${baseState}.default`;
      const defaultText = window.i18n.t(defaultKey);
      if (defaultText && defaultText !== defaultKey) {
        return defaultText;
      }
      // Final fallback to default/default
      const finalKey = 'pages.page2.stateConfig.infoTextboxText.default.default';
      const finalText = window.i18n.t(finalKey);
      return (finalText && finalText !== finalKey) ? finalText : '';
    } catch (e) {
      console.warn('Error getting info textbox text:', e);
      return '';
    }
  },
  
  /**
   * Get geometry grid config for current state
   * @param {string} baseState - Current base state
   * @param {string} subBaseState - Current sub-base state
   * @returns {Object} Geometry grid config
   */
  getGeometryGridConfig: function(baseState, subBaseState) {
    const baseConfig = this.geometryGrid[baseState];
    if (!baseConfig) return this.geometryGrid['default']['default'];
    
    return baseConfig[subBaseState] || baseConfig['default'] || this.geometryGrid['default']['default'];
  },
  
  /**
   * Get button action for a button click
   * @param {string} buttonId - Button ID that was clicked
   * @returns {Object} { baseState, subBaseState } to set
   */
  getButtonAction: function(buttonId) {
    return this.buttonActions[buttonId] || null;
  }
};

// Export to window for global access
if (typeof window !== 'undefined') {
  window.Page2StateConfig = Page2StateConfig;
}

console.log('✅ Page2StateConfig loaded successfully');
