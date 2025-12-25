// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlight1 = "#5EBAE7";
const highlight2 = "#FFD966";
const highlight3 = "#F28283";
const highlight4 = "#33ad54";

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "Interactive Math Learning Applet",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: 'Start'
      },

      common: {
        passText: "Pass",
        failText: "Fail",
        questionIcon: "Q",
        rollerCoasterLabel: "Science Club",
        merryGoRoundLabel: "Art Club",
        ratioSeparator: ":",
        questionText: "Given an isosceles right triangle △ABC with ∠C = 90° and AB = 15√2 cm. Calculate the length of AC.",
        labels: {
          a: "a = ",
          b: "b = ",
          c: "c = ",
          dropHere: "Drop here",
        },
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
        },
        tableHeaders: {
          quantity: "Quantity",
          coffee: "Coffee (in tsp)",
          sugar: "Sugar (in tsp)",
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
          titleText: "Connecting Percentages and Ratios",
          introText: "A school analyzed students’ results using percentages. <br/><br/>Let’s explore how pass and fail percentages can be shown as ratios. <br/><br/>As the total number of students changes,<br/>you’ll see how the ratio is connected to the percentages. ",
        },
        page2: {
          titleText: "The chart shows that 60% of students passed and 40% failed.<br/>Let’s complete the table for a <span style='color:#FFAB40;'>total of 100 students.</span> ",
          pieTable: {
            headers: ["Total<br/>Students", "Passed<br/>(60%)", "Failed<br/>(40%)", "Ratio in<br/>Simplest Form"],
            rows: [
              ["100", "", "", ""],
            ],
          },
          fillBlanks: {
            instructionText:
              "What is the number of students who passed? ",
            options: [
              {
                id: "opt1",
                text: "100",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt2",
                text: "40",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt3",
                text: "60",
                feedback: "That’s right. 60% of 100 = 60",
                blankID: [{ bid: "blank1", text: "60" }]
              },
              {
                id: "opt4",
                text: "50",
                feedback: "Not quite. Try again!",

              },
            ],
            containers: {},
            impFormulae: [
            ],
          },
          instruction:
            { tapOption: "Tap the correct option to fill the highlighted box." }
        },
        page3: {
          titleText: "The chart shows that 60% of students passed and 40% failed.<br/>Let’s complete the table for a <span style='color:#FFAB40;'>total of 100 students.</span> ",
          pieTable: {
            headers: ["Total<br/>Students", "Passed<br/>(60%)", "Failed<br/>(40%)", "Ratio in<br/>Simplest Form"],
            rows: [
              ["100", "60", "", ""],
            ],
          },
          fillBlanks: {
            instructionText:
              "What is the number of students who failed?",
            options: [
              {
                id: "opt1",
                text: "60",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt2",
                text: "40",
                feedback: "That’s right. 40% of 100 = 40",
                blankID: [{ bid: "blank1", text: "40" }]
              },
              {
                id: "opt3",
                text: "100",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt4",
                text: "50",
                feedback: "Not quite. Try again!",

              },
            ],
            containers: {},
            impFormulae: [
            ],
          },
          instruction:
            { tapOption: "Tap the correct option to fill the highlighted box." }
        },
        page4: {
          titleText: "The chart shows that 60% of students passed and 40% failed.<br/>Let’s complete the table for a <span style='color:#FFAB40;'>total of 100 students.</span> ",
          pieTable: {
            headers: ["Total<br/>Students", "Passed<br/>(60%)", "Failed<br/>(40%)", "Ratio in<br/>Simplest Form"],
            rows: [
              ["100", "60", "40", ""],
            ],
          },
          fillBlanks: {
            instructionText:
              "What is  the ratio of students who passed to students who failed, in simplest form.",
            options: [
              {
                id: "opt1",
                text: "6 : 4",
                feedback: "Not quite! Pass : Fail = 60 : 40  = 6 : 4 GCF (6, 4) = 2 Divide both terms by 2.",
              },
              {
                id: "opt2",
                text: "4 : 3",
                feedback: "Not quite! Try again.",
              },
              {
                id: "opt3",
                text: "3 : 2",
                feedback: "Well done! Since the total is 100, the percentage values are the students count. <br/><br/>Pass : Fail = 60 : 40  = 3 : 2",
                blankID: [{ bid: "blank1", text: "3 : 2" }]
              },
              {
                id: "opt4",
                text: "2 : 3",
                feedback: "Not quite. Try again!",

              },
            ],
            containers: {},
            impFormulae: [
            ],
          },
          instruction:
            { tapOption: "Tap the correct option to fill the highlighted box." }
        },
        page5: {
          titleText: "The chart shows that 60% of students passed and 40% failed.<br/>Let’s complete the table for a <span style='color:#FFAB40;'>total of 200 students.</span> ",
          pieTable: {
            headers: ["Total<br/>Students", "Passed<br/>(60%)", "Failed<br/>(40%)", "Ratio in<br/>Simplest Form"],
            rows: [
              ["100", "60", "40", "3 : 2"],
              ["200", "", "", ""],
            ],
          },
          fillBlanks: {
            instructionText:
              "What is the number of students who passed? ",
            options: [
              {
                id: "opt1",
                text: "80",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt2",
                text: "40",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt3",
                text: "60",
                feedback: "Not quite. Try again!",

              },
              {
                id: "opt4",
                text: "120",
                feedback: "Well done! <br/>60% of 100 = 60<br/>⇒ 60% of 200 = 60 × 2 = 120",
                blankID: [{ bid: "blank1", text: "120" }]

              },
            ],
            containers: {},
            impFormulae: [
            ],
          },
          instruction:
            { tapOption: "Tap the correct option to fill the highlighted box." }
        },
        page6: {
          titleText: "The chart shows that 60% of students passed and 40% failed.<br/>Let’s complete the table for a <span style='color:#FFAB40;'>total of 200 students.</span> ",
          pieTable: {
            headers: ["Total<br/>Students", "Passed<br/>(60%)", "Failed<br/>(40%)", "Ratio in<br/>Simplest Form"],
            rows: [
              ["100", "60", "40", "3 : 2"],
              ["200", "120", "", ""],
            ],
          },
          fillBlanks: {
            instructionText:
              "What is the number of students who failed?",
            options: [
              {
                id: "opt1",
                text: "40",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt2",
                text: "80",
                feedback: "Well done! <br/>40% of 100 = 40<br/>⇒ 40% of 200 = 40 × 2 = 80",
                blankID: [{ bid: "blank1", text: "80" }]
              },
              {
                id: "opt3",
                text: "60",
                feedback: "Not quite. Try again!",

              },
              {
                id: "opt4",
                text: "120",
                feedback: "Not quite. Try again!",
              },
            ],
            containers: {},
            impFormulae: [
            ],
          },
          instruction:
            { tapOption: "Tap the correct option to fill the highlighted box." }
        },
        page7: {
          titleText: "The chart shows that 60% of students passed and 40% failed.<br/>Let’s complete the table for a <span style='color:#FFAB40;'>total of 200 students.</span> ",
          pieTable: {
            headers: ["Total<br/>Students", "Passed<br/>(60%)", "Failed<br/>(40%)", "Ratio in<br/>Simplest Form"],
            rows: [
              ["100", "60", "40", "3 : 2"],
              ["200", "120", "80", ""],
            ],
          },
          fillBlanks: {
            instructionText:
              "What is the ratio of students who passed to students who failed, in simplest form?",
            options: [
              {
                id: "opt1",
                text: "12 : 8",
                feedback: "Not quite! <br/>Pass : Fail = 120 : 80  = 12 : 8<br/>GCF (12, 8) = 4<br/>Divide both terms by 4.",
              },
              {
                id: "opt2",
                text: "4 : 3",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt3",
                text: "2 : 3",
                feedback: "Not quite. Try again!",

              },
              {
                id: "opt4",
                text: "3 : 2",
                feedback: "Well done! Since the number of students doubled, the passed and failed counts changed proportionally.<br/><br/>Pass : Fail = 120 : 80  = 3 : 2",
                blankID: [{ bid: "blank1", text: "3 : 2" }]
              },
            ],
            containers: {},
            impFormulae: [
            ],
          },
          instruction:
            { tapOption: "Tap the correct option to fill the highlighted box." }
        },
        page8: {
          titleText: "The chart shows that 60% of students passed and 40% failed.<br/>Let’s complete the table for a <span style='color:#FFAB40;'>total of 350 students.</span> ",
          pieTable: {
            headers: ["Total<br/>Students", "Passed<br/>(60%)", "Failed<br/>(40%)", "Ratio in<br/>Simplest Form"],
            rows: [
              ["100", "60", "40", "3 : 2"],
              ["200", "120", "80", "3 : 2"],
              ["350", "", "", ""]
            ],
          },
          fillBlanks: {
            instructionText:
              "What is the number of students who passed? ",
            options: [
              {
                id: "opt1",
                text: "120",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt2",
                text: "180",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt3",
                text: "210",
                feedback: "Well done! <br/>60% of 100 = 60<br/>⇒ 60% of 350 = 60 × 3.5 = 210",
                blankID: [{ bid: "blank1", text: "210" }]

              },
              {
                id: "opt4",
                text: "140",
                feedback: "Not quite. Try again!",
              },
            ],
            containers: {},
            impFormulae: [
            ],
          },
          instruction:
            { tapOption: "Tap the correct option to fill the highlighted box." }
        },
        page9: {
          titleText: "The chart shows that 60% of students passed and 40% failed.<br/>Let’s complete the table for a <span style='color:#FFAB40;'>total of 350 students.</span> ",
          pieTable: {
            headers: ["Total<br/>Students", "Passed<br/>(60%)", "Failed<br/>(40%)", "Ratio in<br/>Simplest Form"],
            rows: [
              ["100", "60", "40", "3 : 2"],
              ["200", "120", "80", "3 : 2"],
              ["350", "210", "", ""]
            ],
          },
          fillBlanks: {
            instructionText:
              "What is the number of students who failed?",
            options: [
              {
                id: "opt1",
                text: "120",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt2",
                text: "140",
                feedback: "Well done! <br/>40% of 100 = 40<br/>⇒ 40% of 350 = 40 × 3.5 = 140",
                blankID: [{ bid: "blank1", text: "140" }]
              },
              {
                id: "opt3",
                text: "210",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt4",
                text: "180",
                feedback: "Not quite. Try again!",
              },
            ],
            containers: {},
            impFormulae: [
            ],
          },
          instruction:
            { tapOption: "Tap the correct option to fill the highlighted box." }
        },
        page10: {
          titleText: "The chart shows that 60% of students passed and 40% failed.<br/>Let’s complete the table for a <span style='color:#FFAB40;'>total of 350 students.</span> ",
          pieTable: {
            headers: ["Total<br/>Students", "Passed<br/>(60%)", "Failed<br/>(40%)", "Ratio in<br/>Simplest Form"],
            rows: [
              ["100", "60", "40", "3 : 2"],
              ["200", "120", "80", "3 : 2"],
              ["350", "210", "140", ""]
            ],
          },
          fillBlanks: {
            instructionText:
              "What is the ratio of students who passed to students who failed, in simplest form?",
            options: [
              {
                id: "opt1",
                text: "21 : 14",
                feedback: "Not quite! <br/>Pass : Fail = 210 : 140  = 21 : 14<br/>GCF (21, 14) = 7<br/>Divide both terms by 7.",
              },
              {
                id: "opt2",
                text: "7 : 2",
                feedback: "Not quite. Try again!",
              },
              {
                id: "opt3",
                text: "3 : 2",
                feedback: "Well done! Since the number of students increased by the scale factor 3.5, the passed and failed counts changed proportionally.<br/>Pass : Fail = 210 : 140  = 3 : 2",
                blankID: [{ bid: "blank1", text: "3 : 2" }]

              },
              {
                id: "opt4",
                text: "2 : 3",
                feedback: "Not quite. Try again!",

              },
            ],
            containers: {},
            impFormulae: [
            ],
          },
          instruction:
            { tapOption: "Tap the correct option to fill the highlighted box." }
        },
        page11: {
          titleText: "Let’s analyse the table and check which statements are true. ",
          pieTable: {
            headers: ["Total<br/>Students", "Passed<br/>(60%)", "Failed<br/>(40%)", "Ratio in<br/>Simplest Form"],
            rows: [
              ["100", "60", "40", "3 : 2"],
              ["200", "120", "80", "3 : 2"],
              ["350", "210", "140", "3 : 2"]
            ],
          },
          fillBlanks: {
            instructionText:
              "Study the table. Select all the statements that are true.",
            options: [
              {
                id: "opt1",
                text: "The ratio of passed to failed students is 3 : 2 for all totals.",
                feedback: "Excellent!",
                blankID: [{ bid: "blank1", text: "The ratio of passed to failed students is 3 : 2 for all totals." }]
              },
              {
                id: "opt2",
                text: "The ratio changes when the total changes.",
                feedback: "Oops! Check the table again.",
              },
              {
                id: "opt3",
                text: "The number of passed students is always 60% of the total.",
                feedback: "Excellent!",
                blankID: [{ bid: "blank2", text: "The number of passed students is always 60% of the total." }]
              },
              {
                id: "opt4",
                text: "The number of failed students is always 40% of the total.",
                feedback: "Excellent!",
                blankID: [{ bid: "blank3", text: "The number of failed students is always 40% of the total." }]
              },
            ],
            containers: {},
            impFormulae: [
            ],
          },
          instruction:
            { tapOption: "Tap the correct option." }
        },
        page12: {
          activityCompleted: "Activity Completed!",
          summaryText: "You learned how percentages can be used to find actual<br/> quantities and how these values form a ratio.<br/><br/>Even when the total number of students changes, the<br/> ratio in simplest form stays the same.",
        },
      },
    },

    id: {
      appInfo: {
        title: "Aplet Pembelajaran Matematika Interaktif",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Lagi",
      },

      common: {
        questionIcon: "Q",
        rollerCoasterLabel: "Klub Sains",
        merryGoRoundLabel: "Klub Seni",
        ratioSeparator: ":",
        questionText:
          "Ayah meminta Dona untuk membuat kopi untuk teman-temannya. Biasanya, untuk membuat 1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula. Dona ingin membuat kopi dalam teko yang menampung 1 liter air menggunakan 4 sdt kopi dan 10 sdt gula. Dibandingkan dengan kopi yang dibuat oleh Ibu, perkirakan rasa kopi yang dibuat oleh Dona. Apakah terlalu pahit, terlalu manis, atau pas?",
        labels: {
          mom: "Ibu",
          dona: "Dona",
          quantity250ml: "250 ml",
          quantity1liter: "1 liter",
          quantity1000ml: "1000 ml",
          number1: "1",
          number2: "2",
          number4: "4",
          number8: "8",
          number10: "10",
          variableA: "a",
          variableB: "b",
          times4: "×4",
          timesQuestion: "×?",
          dropHere: "Letakkan di sini",
        },
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Ditanyakan",
        },
        tableHeaders: {
          quantity: "Jumlah",
          coffee: "Kopi (dalam sdt)",
          sugar: "Gula (dalam sdt)",
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Ditanyakan",
          keyConcepts: "Konsep Kunci",
          importantFormulae: "Perhitungan",
        },
      },

      pages: {
        page1: {
          questionIntro:
            "Di tabel berikut adalah jumlah siswa yang bergabung dengan berbagai klub sekolah.",
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", "…"],
              ["Seni", "24"],
              ["Robotika", "…"],
            ],
          },
          introduction:
            "Mari kita bandingkan kopi yang dibuat oleh Dona dan ibunya menggunakan rasio!",
          highlights: [
            {
              text: "a. Tuliskan rasio paling sederhana dari anggota Klub Sains terhadap Klub Seni.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "25gc",
              bold: true,
              underline: false,
            },
          ],
        },
        page2: {
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", ""],
              ["Seni", "24"],
              ["Robotika", ""],
            ],
          },
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight1,
              },
            ],
            values: [],
            toFind: [],
          },
        },
        page3: {
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", ""],
              ["Seni", "24"],
              ["Robotika", ""],
            ],
          },
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "1 liter air menggunakan 4 sdt kopi dan 10 sdt gula.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight1,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [],
          },
          conceptSummary: {
            given: [],
            toFind: [],
            keyConcepts: [],
            impFormulae: [],
          },
        },
        page4: {
          questionTable: {
            headers: ["Klub", "Jumlah Anggota"],
            rows: [
              ["Sains", "16"],
              ["Olahraga", ""],
              ["Seni", "24"],
              ["Robotika", ""],
            ],
          },
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "1 liter air menggunakan 4 sdt kopi dan 10 sdt gula.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "perkirakan rasa kopi yang dibuat oleh Dona. Apakah terlalu pahit, terlalu manis, atau pas?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight1,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            values: [],
            toFind: [
              {
                text: "Apakah kopi Dona sama, pahit, atau manis?",
                color: highlight3,
              },
            ],
          },
        },
        page5: {
          highlights: [
            {
              text: "1 cangkir kecil berukuran 250 ml, Ibu menggunakan 1 sdt kopi dan 2 sdt gula.",
              highlightColor: highlight1,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "1 liter air menggunakan 4 sdt kopi dan 10 sdt gula.",
              highlightColor: highlight2,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
            {
              text: "perkirakan rasa kopi yang dibuat oleh Dona. Apakah terlalu pahit, terlalu manis, atau pas?",
              highlightColor: highlight3,
              fontColor: "#000000",
              fontSize: "24gc",
              bold: true,
              underline: false,
            },
          ],
        },
        page6: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          questionTable2: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [],
          },
          fillBlanks: {
            instructionText:
              "Teko Dona berukuran 1 liter. Untuk membandingkan dengan benar, kita perlu mengubahnya menjadi mililiter. 1 liter = ?",
            options: [
              {
                id: "opt1",
                text: "250 ml",
                feedbackText: "Belum tepat! Coba lagi.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "500 ml",
                feedbackText: "Belum tepat! Coba lagi.",
                blankID: [],
              },
              {
                id: "opt3",
                text: "750 ml",
                feedbackText: "Belum tepat! Coba lagi.",
                blankID: [],
              },
              {
                id: "opt4",
                text: "1000 ml",
                feedbackText:
                  "Bagus! Mari kita ganti 1 liter dengan 1000 ml di tabel Dona.",
                blankID: [{ bid: "blank4", text: "1000 ml" }],
              },
            ],
            containers: {},
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
            ],
          },
        },
        page7: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
            ],
          },
          fillBlanks: {
            instructionText:
              "Jika ibu Dona membuat 1000 ml kopi, berapa cangkir 250 ml yang dibutuhkannya?",
            options: [
              {
                id: "opt1",
                text: "2",
                feedbackText: "Belum tepat! 250 ml × 2 = 500 ml",
                blankID: [],
              },
              {
                id: "opt2",
                text: "4",
                feedbackText:
                  "Bagus! Mari kita masukkan itu ke dalam tabel rasio Ibu",
                blankID: [{ bid: "blank5", text: "4" }],
              },
              {
                id: "opt3",
                text: "6",
                feedbackText: "Belum tepat! 250 ml × 6 = 1500 ml",
                blankID: [],
              },
              {
                id: "opt4",
                text: "8",
                feedbackText: "Belum tepat! 250 ml × 8 = 2000 ml",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [],
          },
        },
        page8: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
            ],
          },
          fillBlanks: {
            instructionText:
              "Berapa rasio kopi terhadap gula dalam 250 ml kopi?",
            options: [
              {
                id: "opt1",
                text: "2 : 1",
                feedbackText: "Tidak, itu rasio gula terhadap kopi.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "1 : 2",
                feedbackText: "Ya, itu 1 sdt kopi terhadap 2 sdt gula.",
                blankID: [
                  { bid: "blank2", text: "1" },
                  { bid: "blank3", text: "2" },
                ],
              },
              {
                id: "opt3",
                text: "1 : 250",
                feedbackText: "Tidak, itu bukan rasio kopi terhadap gula.",
                blankID: [],
              },
              {
                id: "opt4",
                text: "2 : 250",
                feedbackText: "Tidak, itu bukan rasio kopi terhadap gula.",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
            ],
          },
        },
        page9: {
          highlights: [],
          quizPanel: {
            quiz: {
              mcqType: "MCQ",
              qti4Subtype: "QT2",
              emptyFeedback:
                "Dalam bentuk paling sederhana, kedua suku rasio tidak memiliki faktor persekutuan selain 1.",
            },
            headerText: "Hubungkan dengan Konsep",
            questionText:
              "Mari kita asumsikan ada 'a' sdt kopi dan 'b' sdt gula dalam 1000 ml kopi. <br><br>Nyatakan benar atau salah –<br>Untuk menjaga rasa yang sama, a : b harus setara dengan 1 : 2.",
            imageText: "",
            options: [
              {
                text: "Salah",
                iscorrect: false,
                feedback:
                  "Jika rasionya tidak setara, kopi akan terasa berbeda.",
              },
              {
                text: "Benar",
                iscorrect: true,
                feedback:
                  "Ya, untuk menjaga rasa yang sama, kita perlu menambahkan jumlah kopi dan gula yang setara.",
              },
            ],
            keyConcepts: [],
            impFormulae: [{ text: "a : b = 1 : 2", color: highlight1 }],
          },

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [{ text: "1 liter = 1000 ml", color: highlight1 }],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
            ],
          },
        },
        page10: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "Berapa rasio kopi terhadap gula dalam 250 ml kopi?",
            options: [
              {
                id: "opt1",
                text: "1",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt2",
                text: "2",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt3",
                text: "4",
                feedbackText:
                  "Benar! Untuk menjaga rasio setara, kita perlu mengalikan dengan 4.",
                blankID: [{ bid: "blank5", text: "4" }],
              },
              {
                id: "opt4",
                text: "8",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [{ text: "a = 4", color: highlight1 }],
          },
        },
        page11: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "Berapa rasio kopi terhadap gula dalam 250 ml kopi?",
            options: [
              {
                id: "opt1",
                text: "4",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt2",
                text: "6",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
              {
                id: "opt3",
                text: "8",
                feedbackText:
                  "Benar! Untuk menjaga rasio setara, kita perlu mengalikan dengan 4.",
                blankID: [{ bid: "blank6", text: "8" }],
              },
              {
                id: "opt4",
                text: "10",
                feedbackText: "Tidak, coba lagi!",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [{ text: "b = 8", color: highlight1 }],
          },
        },

        page12: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          questionTable2: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
              { text: "b = 8", color: highlight1 },
            ],
          },
          conclusion: {
            text: 'Jumlah gula berbeda dalam kopi Ibu dan Dona.<br>Jadi, kopi Dona terasa <span style="color: transparent;">lebih manis daripada</span> <br>kopi ibu.',
          },
          fillBlanks: {
            instructionText:
              "Seret dan lepas opsi yang benar untuk mengisi bagian yang kosong yang disorot dalam kotak biru.",
            blank10Coordinate: [365, 695, 675, 750],
            options: [
              {
                id: "opt1",
                text: "sama dengan",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [],
              },
              {
                id: "opt2",
                text: "lebih manis daripada",
                feedbackText:
                  "Benar! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank10", text: "lebih manis daripada" }],
              },
              {
                id: "opt3",
                text: "lebih pahit daripada",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [],
              },
            ],
            containers: {},
            impFormulae: [{ text: "Kopi Dona lebih manis", color: highlight1 }],
          },
        },
        page13: {
          questionTable1: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [
              ["", "", ""],
              ["", "", ""],
            ],
          },
          questionTable2: {
            headers: ["Jumlah", "Kopi (dalam sdt)", "Gula (dalam sdt)"],
            rows: [["", "", ""]],
          },
          highlights: [],

          conceptSummary: {
            given: [
              {
                text: "250 ml memiliki 1 sdt kopi dan 2 sdt gula",
                color: highlight2,
              },
              {
                text: "1 liter memiliki 4 sdt kopi dan 10 sdt gula",
                color: highlight2,
              },
            ],
            toFind: [],
            keyConcepts: [],
            impFormulae: [
              {
                text: "Ibu Dona membutuhkan 4 cangkir 250 ml untuk membuat 1000 ml",
                color: highlight1,
              },
              { text: "Rasio kopi terhadap gula = 1 : 2", color: highlight1 },
              { text: "a : b = 1 : 2", color: highlight1 },
              { text: "a = 4", color: highlight1 },
              { text: "b = 8", color: highlight1 },
              { text: "Kopi Dona lebih manis", color: highlight1 },
            ],
          },
          fillBlanks: {
            instructionText:
              "Seret dan lepas opsi yang benar untuk mengisi bagian yang kosong yang disorot dalam kotak biru.",
            blank10Coordinate: [290, 705, 600, 765],
            options: [
              {
                id: "opt1",
                text: "sama dengan",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank1", text: "250 ml" }],
              },
              {
                id: "opt2",
                text: "lebih manis daripada",
                feedbackText:
                  "Benar! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank10", text: "lebih manis daripada" }],
              },
              {
                id: "opt3",
                text: "lebih pahit daripada",
                feedbackText:
                  "Belum tepat! Kopi Dona memiliki jumlah air dan kopi yang sama tetapi lebih banyak gula.",
                blankID: [{ bid: "blank5", text: "4" }],
              },
            ],
            containers: {},
            impFormulae: [],
          },
          feedbackTextbox: {
            text: "Jumlah gula berbeda dalam kopi Ibu dan Dona.<br>Jadi, kopi Dona terasa lebih manis daripada kopi ibu.",
          },
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

    // Special handling for blank10Coordinate to debug
    if (key === "pages.page12.fillBlanks.blank10Coordinate") {
      const fillBlanksObj = translation?.pages?.page12?.fillBlanks;
      console.log("🔍 [i18n] Looking for blank10Coordinate:", {
        lang,
        hasTranslation: !!translation,
        hasPages: !!translation?.pages,
        hasPage12: !!translation?.pages?.page12,
        hasFillBlanks: !!fillBlanksObj,
        hasCoordinate: !!fillBlanksObj?.blank10Coordinate,
        coordinate: fillBlanksObj?.blank10Coordinate,
        fillBlanksType: typeof fillBlanksObj,
        fillBlanksIsArray: Array.isArray(fillBlanksObj),
        fillBlanksKeys: fillBlanksObj ? Object.keys(fillBlanksObj) : null,
        fillBlanksFull: fillBlanksObj ? JSON.stringify(fillBlanksObj) : null,
        fillBlanksRaw: fillBlanksObj,
      });
    }

    for (const k of keys) {
      if (key === "pages.page12.fillBlanks.blank10Coordinate") {
        console.log(`🔍 [i18n] Checking key "${k}":`, {
          valueType: typeof value,
          valueIsArray: Array.isArray(value),
          valueIsObject: value && typeof value === "object",
          hasKey: value && typeof value === "object" && k in value,
          valueKeys:
            value && typeof value === "object" ? Object.keys(value) : null,
        });
      }
      if (value && typeof value === "object" && k in value) {
        value = value[k];
      } else {
        if (key === "pages.page12.fillBlanks.blank10Coordinate") {
          console.log(`❌ [i18n] Key "${k}" not found in value:`, value);
        }
        found = false;
        break;
      }
    }

    // If not found in current language, try English fallback
    if (!found) {
      if (key === "pages.page12.fillBlanks.blank10Coordinate") {
        console.log(
          "⚠️ [i18n] blank10Coordinate not found in",
          lang,
          "- falling back to English"
        );
      }
      value = AppData.translations.en;
      for (const fallbackKey of keys) {
        if (value && typeof value === "object" && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return `[Missing: ${key}]`;
        }
      }
    } else {
      if (key === "pages.page12.fillBlanks.blank10Coordinate") {
        console.log("✅ [i18n] blank10Coordinate found in", lang, ":", value);
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
