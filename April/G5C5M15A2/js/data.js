// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#EF6AA9";
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
        title: "Ratio - Komodo Distance Comparison"
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
        start: "Start",
        check: "CHECK",
      },

      common: {
        equationButtonText: "Total wingko parts",
        questionText: "Dania has 6 boxes of milk, 12 lollipops, and 24 packets of biscuits. She wants to make the identical parcels so that each parcel has the same number of each item and no items are left over. What is the maximum number of parcels she can make?",
        questionIcon: "Q",
        quizInstructionSelectOption: "Select the correct option",
        imageAltTap: "Tap",
        parcelBoxAlt: "Parcel box",
        labels: {
          dropHere: "Drop here"
        },
        milkImageText: '6 Milk Boxes',
        lolliopsImageText: '12 Lollipops',
        biscuitImageText: '24 Packets',
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

      numberPad: {
        feedback: {
          correct: "Correct! Well done!",
          incorrect: "Incorrect. Please try again.",
          empty: "Please enter a value",
        },
      },

      pages: {
        page1: {
          highlights: [],
          instructionText: "Let's find out the distance from Yohana's house to Lukas's house by adding the mixed numbers and the fraction.",
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify 'given' information"
        },
        page2: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify 'given' information",
          highlights: [
            {
              text: "6 boxes of milk",
              highlightColor: highlightColor1,
              fontColor: 'black',
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Milk boxes = 6",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [
            ],
            toFind: [
            ]
          }
        },
        page3: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify what we need 'to find'",
          highlights: [
            {
              text: "12 lollipops",
              highlightColor: highlightColor1,
              fontColor: 'black',
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Milk boxes = 6",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Lollipops = 12",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [
            ],
            toFind: [
            ]
          },
        },
        page4: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify what we need 'to find'",
          highlights: [
            {
              text: "24 packets of biscuits",
              highlightColor: highlightColor1,
              fontColor: 'black',
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Milk boxes = 6",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Lollipops = 12",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Packets of biscuits = 24",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [
            ],
            toFind: [

            ]
          },


        },
        page5: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap \u201c1\u201d button to bring one parcel box.",
          footerInstructionState1Def: "Tap each button and see how packing will be done.",
          footerInstructionState1Packets:
            "Tap \u201c2\u201d button to bring 2 parcel boxes this time.",
          footerInstructionState2Packets:
            "Tap \u00bb to identify what we need 'to find'.",
          footerInstructionState3Packets:
            "Tap \u00bb to identify what we need 'to find'.",
          quantityLabelMilk: "6 milk bottles",
          quantityLabelLollipops: "12 Lollipops",
          quantityLabelPackets: "24 Packets",
          leftOverPrefix: "Left Over : ",
          leftOverNil: "Nil",
          highlights: [
            {
              text: "She wants to make the identical parcels so that each parcel has the same number of each item and no items are left over.",
              highlightColor: highlightColor1,
              fontColor: 'black',
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Milk boxes = 6",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Lollipops = 12",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Packets of biscuits = 24",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Each parcel must be identical and all items must be used completely",
                size: highlightTextSize,
                color: highlightColor1
              }
            ],
            values: [
            ],
            toFind: [

            ]
          },


        },
        page6: {
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to continue.",
          highlights: [
            {
              text: "What is the maximum number of parcels she can make?",
              highlightColor: highlightColor3,
              fontColor: 'black',
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
          informationAnalysis: {
            facts: [
              {
                text: "Milk boxes = 6",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Lollipops = 12",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Packets of biscuits = 24",
                size: highlightTextSize,
                color: highlightColor2
              },
              {
                text: "Each parcel must be identical and all items must be used completely",
                size: highlightTextSize,
                color: highlightColor2
              }
            ],
            values: [],
            toFind: [
              {
                text: "The maximum number of parcels Dania can make.",
                size: highlightTextSize,
                color: highlightColor3
              }
            ]
          }
          },

        page7: {
          footerInstruction: "Tap » to find out.",
          informationGathered: '<span style="color: #20B2AA;">&#10003;</span> Information gathered from the question.',
          nextStep: "Next – Identify whether the problem is about LCM or GCF."
        },

        page8: {
          headerText: "Bring more boxes and explore how the packing will be done.",
          footerInstruction: "Rearrange the buttons into the correct order of steps",
          packetsEqualDistributionFeedback:
            "All items are evenly distributed with no leftovers.",
          headerAfterQuiz: "Each traffic light turns red at a<span style='color:#58D98B'> MULTIPLE </span>of its interval.",
          footerInstruction: "Tap the “1” button to bring one parcel box.",
          footerInstructionState1Def: "Tap each button and see how the packing is done.",
          footerInstructionState1Packets: "Tap the “2” button to bring 2 parcel boxes this time.",
          footerInstructionState2Packets: "Tap the “3” button to bring 3 parcel boxes this time.",
          footerInstructionState3Def: "Tap the “3” button to bring 3 parcels.",
          footerInstructionState3MilkLollipop: "Tap each button and see how the packing is done.",
          footerInstructionState3Packets: 'Tap » to pack into 4 boxes.',
          footerInstructionState3Reveal: 'Tap each button and see how the packing is done.',
          instructionAfterQuiz: 'Tap » to pack into 4 boxes.'
        },

        page9: {
          headerText: "Bring more boxes and explore how the packing will be done.",
          footerInstruction: "Drag the correct term to form a common fraction",
          footerInstructionState4Def: "Tap the \u201c4\u201d button to display 4 parcel boxes.",
          footerInstructionState4Packets: "Tap \u00bb to analyze the packing.",
          feedbackFourParcelsMilkLeftover:
            "We cannot use 4 parcel boxes because 2 milk boxes are left over.",
          feedbackTwoMilkBoxesLeftover: '2 milk boxes are left over.',
          headerAfterQuiz: "Each traffic light turns red at a<span style='color:#58D98B'> MULTIPLE </span>of its interval.",
          footerInstruction: "Tap the “4” button to bring 4 parcel boxes.",
          instructionAfterQuiz: "Tap » to continue."
        },

        page10: {
          headerText: "Why are 6 milk boxes not distributed evenly into 4 boxes?",
          headerAfterQuiz: "Each traffic light turns red at a<span style='color:#58D98B'> MULTIPLE </span>of its interval.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to view the observation.",
          quizPanel: {
            quizSubType: "QT2R",
            questionText: '',
            options: [
              {
                text: "4 is not a factor of 6",
                iscorrect: true,
                feedback: "The number must be a factor to distribute evenly.",
              },
              {
                text: "4 is not a multiple of 6",
                iscorrect: false,
                feedback: "Check again!",
              }
            ]
          }
        },

        page11: {
          headerText:
            "<span><span style='color:orange;'>Observation 01:</span> Items are divided equally into 1, 2, and 3 parcel boxes with no leftovers because they are common factors of 6, 12, and 24.</span>",
          headerAfterQuiz:
            "Each traffic light turns red at a<span style='color:#58D98B'> MULTIPLE </span>of its interval.",
          footerInstruction:
            "Tap the green labels to explore packing into 2, 3, and 4 parcels.",
          instructionAfterQuiz: "Tap » to check the next observation",
        },

        page12: {
          headerText:
            "<span><span style='color:orange;'>Observation 02:</span><span style='color:#ffffff;'> Because 4 is not a common factor, all items are not evenly distributed with no leftovers.</span></span>",
          headerAfterQuiz:
            "Each traffic light turns red at a<span style='color:#58D98B'> MULTIPLE </span>of its interval.",
          footerInstruction:
            "Tap the green labels to explore packing into 2, 3, and 4 parcels.",
          instructionAfterQuiz: "Tap » to find the maximum number of parcels.",
        },

        page13: {
          headerText:
            "<span><span style='color:orange;'>Conclusion:</span><span style='color:#ffffff;'> The number of boxes must be a common factor so the items are divided equally into the boxes with no leftovers.</span></span>",
          factorsSummaryHtml:
            "<div style='text-align:center;line-height:1.35;width:100%;'><span style='color:#FFFFFF'>1, 2, and 3 are</span><br/><span style='color:#50E382'>common factors.</span><br/><span style='color:#FFFFFF'>4 is</span><span style='color:#FF7D7D'> not a common factor</span></div>",
          headerAfterQuiz:
            "Each traffic light turns red at a<span style='color:#58D98B'> MULTIPLE </span>of its interval.",
          footerInstruction:
            "Tap the green labels to explore packing into 2, 3, and 4 parcels.",
          instructionAfterQuiz: "Tap » to find the maximum number of parcels.",
          feedbackTextbox: {
            text:
              "Conclusion: The number of parcel boxes must be a common factor of 6, 12, and 24 so all items divide evenly with no leftovers.",
          },
        },

        page14: {
          headerText: "Which of the following helps to find the maximum number of parcels?",
          headerAfterQuiz:
            "Each traffic light turns red at a<span style='color:#58D98B'> MULTIPLE </span>of its interval.",
          footerInstruction: "Tap the correct option.",
          instructionAfterQuiz: "Tap » to continue.",
          quizPanel: {
            quizSubType: "QT2R",
            questionText: "",
            options: [
              {
                text: "LCM of 6, 12, and 24.",
                iscorrect: false,
                feedback: "Incorrect! Try again.",
              },
              {
                text: "GCF of 6, 12, and 24.",
                iscorrect: true,
                feedback: "Correct! GCF helps to find the maximum number of parcels.",
              },
            ],
          },
        },

        page15: {
          headerText: "Explore packing into parcels",
          footerInstruction: "Tap » to find the required result.",
          footerInstructionState1Packed: "Great! Now let's try with more parcels. Tap » to continue.",
          informationGathered:
            '<span style="color: #20B2AA;">&#10003;</span>\u00a0Information gathered from the question.',
          informationGatheredTwo:
            '<span style="color: #20B2AA;">&#10003;</span>\u00a0Identified that this is a GCF problem.',
          nextStep: "Next — Steps required to find the answer."
        },

        page16: {
          headerText: "Let's explore packing into multiple parcels",
          footerInstruction: "Tap each parcel count button to see the packing.",
          footerInstructionAfterExploration: "Tap » to find the maximum number of parcels.",
          instructionAfterQuiz: "Tap » to verify.",
          quizPanel: {
            quizSubType: "QT4R",
            questionText: "",
            options: [
              {
                text: "3",
                iscorrect: false,
                feedback: "Check again!",
              },
              {
                text: "6",
                iscorrect: true,
                feedback: "Dania can make a maximum of 6 identical parcels.",
              },
              {
                text: "18",
                iscorrect: false,
                feedback: "Check again!",
              },
              {
                text: "24",
                iscorrect: false,
                feedback: "Check again!",
              },
            ],
          },
        },

        page17: {
          headerText: "Find the maximum number of parcels",
          footerInstruction: "Tap each button to explore packing",
          footerInstructionState4Def: "Tap the '4' button to display 4 parcel boxes.",
          footerInstructionState4Packets: "Tap '6' to bring 6 parcel boxes.",
          footerInstructionState6Def: "Tap the '6' button to bring 6 parcel boxes.",
          footerInstructionState6Packing:
            "Tap each button and see how packing will be done.",
          footerInstructionState6Packets: "Tap » to finish.",
          feedbackFourParcelsMilkLeftover:
            "We cannot use 4 parcel boxes because 2 milk boxes are left over.",
          feedbackTwoMilkBoxesLeftover: '2 milk boxes left over.',
          feedbackSixParcelsSuccess: "All items are evenly distributed into 6 parcels with no leftovers.",
          leftOverLine: "Left Over : None",
          instructionAfterQuiz: "Tap » to conclude."
        },

        page18: {
          headerText:
            "<span>When do we use <span style='color:yellow; font-size:30gc'>GCF</span> to solve problems?</span>",
          footerInstruction: "Tap the highlighted buttons.",
          footerInstructionStartOver: "Tap 'Start Over' to restart",
          instructionAfterQuiz: "Tap » to continue.",
          textButton1:
            '<span><li><ul>Items need to be divided <br/>into <span style="color:#ffff; background-color:orange; padding:5px; border-radius:13px; cursor:pointer">equal-sized groups</span>.</ul></li></span>',
          textButton2:
            '<span><li><ul>There should be <br/><span style="color:#ffff; background-color:orange; padding:5px; border-radius:13px; cursor:pointer">no leftovers</span>, and</ul></li></span>',
          textButton3:
            '<span><li><ul>When we need to find the<br/> <span style="color:#ffff; background-color:orange; padding:5px; border-radius:13px; cursor:pointer">maximum number</span> of<br/> groups that can<br/> be formed.</ul></li></span>',
          leftOverLine: "Left Over : None",
          tapGifTextButtonCoordinates: [
            [275, 300, 325, 350],
            [75, 480, 125, 530],
            [300, 628, 350, 682],
          ],
        },

        page20: {
          headerText: "Identify the scene – Write the equation – Solve the unknown value",
          instructionText:
            "Let's find the distance from Yohana's house to Lukas's house by adding the mixed numbers and the fraction."
        },

        page21: {
          headerText: "Write the mathematical sentence for the given scene",
          footerInstruction: "Drag the correct button to the correct place in the sentence"
        },

        page22: {
          headerText: "Write the mathematical sentence for the given scene",
          footerInstruction: "Tap » to identify all the steps needed for addition"
        },

        page23: {
          footerInstruction: "Tap » to add the mixed numbers using these steps"
        },

        page24: {
          instructionRevealConversions: "Tap '?' to show the answer for each conversion",
          instructionAfterQuiz: "Tap » for Step 2.c"
        }
      }
    }

  },
};

// Indonesian: clone English structure then patch strings so `id` exists and
// `i18n.setLanguage('id')` succeeds (otherwise the app stays on `en`).
(function buildIndonesianTranslations() {
  const clone = (o) => JSON.parse(JSON.stringify(o));
  AppData.translations.id = clone(AppData.translations.en);
  const id = AppData.translations.id;
  const p = id.pages;

  id.appInfo.title = "Parsel identik – FPB";

  id.messages = {
    pageStatesCleared:
      "Status halaman telah direset. Muat ulang halaman untuk memulai dari awal?",
    nextButtonPage2: "Peristiwa ganti halaman ke halaman 2 telah dikirim",
    previousButtonPage1: "Peristiwa ganti halaman ke halaman 1 telah dikirim",
  };

  id.buttons.startOver = "Mulai Ulang";
  id.buttons.start = "Mulai";
  id.buttons.check = "Periksa";

  id.numberPad = {
    feedback: {
      correct: "Benar! Kerja bagus!",
      incorrect: "Salah. Silakan coba lagi.",
      empty: "Masukkan nilai",
    },
  };

  id.common.questionText =
    "Dania memiliki 6 kotak susu, 12 lolipop, dan 24 kemasan biskuit. Dia ingin membuat parsel identik sehingga setiap parsel memiliki jumlah yang sama dari setiap barang dan tidak ada barang yang tersisa. Berapa jumlah parsel maksimum yang dapat dia buat?";
  id.common.quizInstructionSelectOption = "Pilih jawaban yang benar";
  id.common.imageAltTap = "Ketuk";
  id.common.parcelBoxAlt = "Kotak parsel";
  id.common.labels.dropHere = "Jatuhkan di sini";
  id.common.milkImageText = "6 Kotak Susu";
  id.common.lolliopsImageText = "12 Lolipop";
  id.common.biscuitImageText = "24 Kemasan Biskuit";
  id.common.informationAnalysis = {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
    toFind: "Yang dicari",
  };
  id.common.conceptSummary = {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
    toFind: "Yang dicari",
    keyConcepts: "Konsep utama",
    importantFormulae: "Perhitungan",
  };

  id.components.informationAnalysis = {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
    toFindTitle: "Yang dicari",
  };
  id.components.conceptSummary = {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
    toFindTitle: "Yang dicari",
    keyConceptsTitle: "Konsep utama",
    importantFormulaeTitle: "Perhitungan",
  };

  p.page1 = {
          highlights: [],
          instructionText:
      "Mari identifikasi informasi yang diketahui dan yang dicari dari soal ini.",
          headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
    footerInstruction: "Tekan » untuk mengidentifikasi informasi 'diketahui'",
  };

  // Full page objects so highlight phrases match `common.questionText` (substring search).
  p.page2 = {
    headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
    footerInstruction: "Tekan » untuk mengidentifikasi informasi 'diketahui'",
          highlights: [
            {
        text: "6 kotak susu",
              highlightColor: highlightColor1,
        fontColor: "black",
              fontSize: questionTextSize,
              bold: true,
        underline: false,
      },
          ],
          informationAnalysis: {
            facts: [
        {
          text: "Kotak susu = 6",
          size: highlightTextSize,
          color: highlightColor1,
        },
            ],
            values: [],
      toFind: [],
    },
  };

  p.page3 = {
    headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
    footerInstruction: "Tekan » untuk mengidentifikasi yang perlu 'dicari'",
          highlights: [
            {
        text: "12 lolipop",
              highlightColor: highlightColor1,
        fontColor: "black",
              fontSize: questionTextSize,
              bold: true,
        underline: false,
      },
          ],
          informationAnalysis: {
            facts: [
        {
          text: "Kotak susu = 6",
          size: highlightTextSize,
          color: highlightColor2,
        },
        {
          text: "Lolipop = 12",
          size: highlightTextSize,
          color: highlightColor1,
        },
            ],
            values: [],
            toFind: [],
    },
  };

  p.page4 = {
    headerText: "Baca soal dan identifikasi 'diketahui' dan 'yang dicari'",
    footerInstruction: "Tekan » untuk mengidentifikasi yang perlu 'dicari'",
          highlights: [
            {
        text: "24 kemasan biskuit",
              highlightColor: highlightColor1,
        fontColor: "black",
              fontSize: questionTextSize,
              bold: true,
        underline: false,
      },
          ],
          informationAnalysis: {
            facts: [
        {
          text: "Kotak susu = 6",
          size: highlightTextSize,
          color: highlightColor2,
        },
        {
          text: "Lolipop = 12",
          size: highlightTextSize,
          color: highlightColor2,
        },
        {
          text: "Kemasan biskuit = 24",
          size: highlightTextSize,
          color: highlightColor1,
        },
      ],
      values: [],
      toFind: [],
    },
  };

  p.page5.headerText = p.page1.headerText;
  p.page5.footerInstruction = "Tekan tombol \u201c1\u201d untuk membawa satu kotak parsel.";
  p.page5.footerInstructionState1Def =
    "Tekan setiap tombol dan lihat bagaimana pengemasan dilakukan.";
  p.page5.footerInstructionState1Packets =
    "Tekan tombol \u201c2\u201d untuk membawa 2 kotak parsel kali ini.";
  p.page5.footerInstructionState2Packets =
    "Tekan » untuk mengidentifikasi yang perlu 'dicari'.";
  p.page5.footerInstructionState3Packets =
    "Tekan » untuk mengidentifikasi yang perlu 'dicari'.";
  p.page5.quantityLabelMilk = "6 kotak susu";
  p.page5.quantityLabelLollipops = "12 lolipop";
  p.page5.quantityLabelPackets = "24 kemasan biskuit";
  p.page5.leftOverPrefix = "Tersisa : ";
  p.page5.leftOverNil = "Tidak ada";

  p.page15.headerText = "Jelajahi pengemasan ke dalam parsel";
  p.page15.footerInstruction =
    "Tekan tombol \u201c1\u201d untuk melihat pengemasan dalam 1 parsel.";
  p.page15.footerInstructionState1Packed =
    "Bagus! Sekarang coba dengan lebih banyak parsel. Tekan » untuk melanjutkan.";
  p.page15.informationGathered =
    '<span style="color: #20B2AA;">&#10003;</span>\u00a0Informasi dikumpulkan dari soal.';
  p.page15.informationGatheredTwo =
    '<span style="color: #20B2AA;">&#10003;</span>\u00a0Teridentifikasi bahwa ini adalah soal FPB.';
  p.page15.nextStep = "Selanjutnya — Langkah yang diperlukan untuk menemukan jawaban.";

  p.page16.headerText = "Mari jelajahi pengemasan ke dalam beberapa parsel";
  p.page16.footerInstruction =
    "Tekan setiap tombol jumlah parsel untuk melihat pengemasan.";
  p.page16.footerInstructionAfterExploration =
    "Tekan » untuk menemukan jumlah parsel maksimum.";
  p.page16.instructionAfterQuiz = "Tekan » untuk menyimpulkan.";
  p.page16.quizPanel = {
    quizSubType: "QT4R",
    questionText: "",
            options: [
              {
        text: "3",
        iscorrect: false,
        feedback: "Periksa lagi!",
      },
      {
        text: "6",
        iscorrect: true,
        feedback: "Dania dapat membuat maksimum 6 parsel identik.",
      },
      {
        text: "18",
        iscorrect: false,
        feedback: "Periksa lagi!",
      },
      {
        text: "24",
        iscorrect: false,
        feedback: "Periksa lagi!",
      },
    ],
  };

  p.page17.headerText = "Temukan jumlah parsel maksimum";
  p.page17.footerInstruction = "Tekan setiap tombol untuk menjelajahi pengemasan";
  p.page17.footerInstructionState4Def =
    "Tekan tombol \u201c4\u201d untuk menampilkan 4 kotak parsel.";
  p.page17.footerInstructionState4Packets = "Tekan \u201c6\u201d untuk membawa 6 kotak parsel.";
  p.page17.footerInstructionState6Def =
    "Tekan tombol \u201c6\u201d untuk membawa 6 kotak parsel.";
  p.page17.footerInstructionState6Packing =
    "Tekan setiap tombol dan lihat bagaimana pengemasan dilakukan.";
  p.page17.footerInstructionState6Packets = "Tekan » untuk menyelesaikan.";
  p.page17.feedbackFourParcelsMilkLeftover =
    "Kita tidak dapat menggunakan 4 kotak parsel karena 2 kotak susu tersisa.";
  p.page17.feedbackTwoMilkBoxesLeftover = "2 kotak susu tersisa.";
  p.page17.feedbackSixParcelsSuccess =
    "Semua barang terdistribusi secara merata ke dalam 6 parsel tanpa sisa.";
  p.page17.leftOverLine = "Tersisa : Tidak ada";

  p.page18.headerText =
    "<span>Kapan kita memakai <span style='color:yellow; font-size:30px'>FPB</span> untuk menyelesaikan masalah?</span>";
  p.page18.footerInstruction = "Tekan tombol yang disorot.";
  p.page18.footerInstructionStartOver = "Tekan 'Mulai Ulang' untuk memulai lagi";
  p.page18.instructionAfterQuiz = "Tekan » untuk melanjutkan.";
  p.page18.textButton1 =
    '<span>Barang perlu dibagi <br/>menjadi  <span style="color:#ffff; background-color:orange; padding:5px; border-radius:13px; cursor:pointer">kelompok yang sama besar</span> .</span>';
  p.page18.textButton2 =
    '<span>Tidak boleh ada yang <br/><span style="color:#ffff; background-color:orange; padding:5px; border-radius:13px; cursor:pointer">tersisa</span> , dan</span>';
  p.page18.textButton3 =
    '<span>Ketika kita perlu mencari<br/> <span style="color:#ffff; background-color:orange; padding:5px; border-radius:13px; cursor:pointer"> jumlah maksimum</span> <br/>kelompok yang dapat<br/> dibentuk.</span>';
  p.page18.leftOverLine = "Tersisa : Tidak ada";
  p.page18.tapGifTextButtonCoordinates = [
    [275, 300, 325, 350],
    [75, 480, 125, 530],
    [300, 628, 350, 682],
  ];

  p.page13.feedbackTextbox = {
                text:
      "Kesimpulan: Jumlah kotak parsel harus merupakan faktor persekutuan dari 6, 12, dan 24 agar semua barang terbagi sama rata tanpa sisa.",
  };
})();

// Simple i18n utility functions
const i18n = {
  // Get translated text
  t: (key, params = {}) => {
    const lang = AppData.currentLanguage;
    const translation =
      AppData.translations[lang] || AppData.translations.en;

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
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("appLanguageChanged", { detail: { lang: langCode } })
        );
      }
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
    const translation =
      AppData.translations[lang] || AppData.translations.en;

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
