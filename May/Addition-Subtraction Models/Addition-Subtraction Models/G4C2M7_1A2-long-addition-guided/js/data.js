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

      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        navigationReset: "Resetting to question 1",
        navigationComplete: "Complete app reset completed - ready for new question",
      },

      common: {
        propertyShowcase: {
          headerText: "Properties of a Square",
          headerDescription: "A square is a <span style='color: #FF9900;'>quadrilateral</span>- it is a 4-sided polygon",
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
        longAddition: {
          placeLabels: {
            TTh: "TTh",
            Th: "Th",
            H: "H",
            T: "T",
            O: "O",
          },
          placeColors: {
            TTh: "#A78BFA",
            Th: "#22C55E",
            H: "#FACC15",
            T: "#3B82F6",
            O: "#EF4444",
          },
          // Page 1 `guided_flow_short` script (LongAdditionComponent); pushed to `page1-left-dialog`.
          guidedFlowShort: {
            step0:
              "We need to add the given numbers. Tap the blinking yellow box to begin.",
            step1:
              "Each digit lives in a place value column: thousands, hundreds, tens, ones.",
            step2: "Let's decompose the first number. Tap the highlighted number.",
            step3:
              "Decomposition complete — the first number is written as the sum of its place values.",
            step4: "Now let's decompose the second number. Tap the highlighted number.",
            step5:
              "Decomposition complete — the second number is written as the sum of its place values.",
            step6Bridge:
              "Both numbers are fully decomposed. Next we add column by column, beginning with the ones place on the right. Watch for the dashed outline on that column, then the yellow answer tile.",
            columnInput:
              "Add the {place} column. Type the total in the yellow tile, then tap Check. (Carry from previous column: {carry}.)",
            regroupWhy:
              "The total in the {place} column is {total}. That is 10 or more. We only write one digit (0–9) in this column, so we split the total: keep one digit here and carry the rest as a {nextPlace} value.",
            clickToSplit:
              "Tap the blinking tile to split {total}: keep {remainder} in the {place} column and carry {carryAmount} to the {nextPlace} column.",
            wrongColumnTotal:
              "That is not the correct total for the {place} column. Add the values in this column again.",
            bringBack:
              "Now bring the expanded sum back to the left block. Tap the highlighted answer row.",
            bringBackDigit:
              "Tap {digit} to move it to the {place} answer tile.",
            leftAnswerComplete:
              "Great — the left answer row is complete. Tap it once to continue.",
            final: "{a} + {b} = {total}. Great work!",
          },
        },
      },

      pages: {
        page1: {
          title: "Measuring Angles using Protractor",
          mainText: "Angles are measured in DEGREES.<br>\nWe can measure how many degrees an angle is, with the help of a PROTRACTOR…<br>\nLet's Explore",
          instruction: "Tap » to continue.",
          dialogText: "Hi! Let's learn how to measure angles with a protractor.",
          aishaAlt: "Aisha",
        },
        page2: {
          title: "Measure an Angle",
          introText: "How do we measure angles using protractor",
          buttonVertex: "Bring the Protractor",
          buttonBase: "Align the corner of angle with the vertex of the Protractor",
          buttonScale: "Scale",
          buttonClockwise: "Align one arm with the base",
          buttonAntiClockwise: "Align the arm of the protractor<br>with the second arm of the angle",
          footerInstruction: "Tap '»' to learn how to measure angles using PROTRACTOR",
          instruction: "Tap » to explore side properties.",
          messageBox: "The given quadrilateral has four sides",
        },
        page3: {
          instruction: "Tap on the highlighted button",
          instructionComplete: "Tap '»' to move to conclude",
          instructionTapToSummarize: "Tap '»' to summarize",
          instructionShoutAnswer: "Shout out the answer and then tap '»'",
          instructionAlignVertex: "Drag the protractor and align with corner of angle",
          instructionAlignBase: "Rotate the protractor to align the base using the circular handle",
          instructionAlignMeasurementArm: "Measure angle by rotating measurement arm using the circular handle",
          states: {
            default: "Tap a part to learn about it.",
            protractor: "Bring the protractor – button 1 active.",
            alignVertex: "Align the corner of angle with the vertex of the protractor – button 2 active.",
            alignBase: "Align one arm with the base – button 3 active.",
            alignMeasurementArm: "Align the arm of the protractor with the second arm of the angle – button 4 active.",
            complete: "All steps done; quiz/flow complete.",
          },
          animationSequence: {
            initialMessage: "Opposite sides are parallel because they maintain the same distance between them.",
            firstPairProvenMessage: "AB and CD are parallel to each other",
            secondPairProvenMessage: "BC and DA are parallel to each other",
            conclusionMessage: "Two pairs of opposite sides are parallel",
            sidesABEqualMessage: "The sides AB and CD are equal",
            sidesBCEqualMessage: "The sides BC and DA are equal",
            sidesEqualConclusionMessage: "Two pairs of opposite sides are equal in length.",
            propertyDescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FF9900;'>Two pairs</span> <span style='color: #FFFFFF;'>of opposite sides are</span> <span style='color: #FF9900;'>parallel.</span>",
            secondDescriptionText: "<span style='color: #FF9900;'>2.</span> <span style='color: #FF9900;'>Two pairs</span> <span style='color: #FFFFFF;'>of opposite sides are</span> <span style='color: #FF9900;'>equal in length.</span>",
            instructionText: "Tap » to explore angle properties.",
            // All four sides equal (square)
            sidesEqualAtVertex0Message: "Sides DA and AB are equal.",
            sidesEqualAtVertex1Message: "Sides AB and BC are equal.",
            sidesEqualAtVertex2Message: "Sides BC and CD are equal.",
            sidesEqualAtVertex3Message: "Sides CD and DA are equal.",
            allSidesEqualConclusionMessage: "All four sides are equal in length.",
            allSidesEqualDescriptionText: "<span style='color: #FF9900;'>2.</span> <span style='color: #FF9900;'>All four sides</span> <span style='color: #FFFFFF;'>are</span> <span style='color: #FF9900;'>equal in length.</span>",
            allSidesEqualBlinkMessages: ["AB = BC = CD = DA", "AB = BC", "AB = BC = CD", "AB = BC = CD = DA"]
          }
        },
        page4: {
          title: "Measure an Angle",
          infoText: "We count from the <span style='color: #F9A825;'>anti-clockwise direction.</span><br><br>The <span style='color: #F9A825;'>arm crosses</span> the protractor at <span style='color: #F9A825;'>50</span>.<br><br>The measured angle is <span style='color: #F9A825;'>50°</span>.",
          footerInstruction: "Read and then tap '»' to measure an angle",
          animationSequence: {
            step2DescriptionText: "",
            step3Message: "We see that there are four interior angles.",
            step3AnglesDescriptionText: "A square has <span style='color: #FF9900;'>four interior angles.</span>",
            allAngles90IntroMessage: "Let's measure each interior angle.",
            allAngles90MessageA: "∠A = 90°",
            allAngles90MessageB: "∠B = 90°",
            allAngles90MessageC: "∠C = 90°",
            allAngles90MessageD: "∠D = 90°",
            allAngles90ConclusionMessage: "All interior angles are 90°.",
            allAngles90DescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FFFFFF;'>All interior angles are</span> <span style='color: #FF9900;'>90°.</span>",
            adjacentAnglesMessage1: "Now let's check if adjacent angles are supplementary (sum to 180°).",
            adjacentAnglesMessage2: "∠A + ∠B = 180°. Adjacent angles A and B are supplementary!",
            adjacentAnglesMessage3: "∠B + ∠C = 180°. Adjacent angles B and C are supplementary!",
            adjacentAnglesMessage4: "∠C + ∠D = 180°. Adjacent angles C and D are supplementary!",
            adjacentAnglesMessage5: "∠D + ∠A = 180°. Adjacent angles D and A are supplementary!",
            adjacentAnglesFinalMessage: "All pairs of adjacent angles are supplementary (sum to 180°).",
            adjacentAnglesDescriptionText: "<span style='color: #FF9900;'>2.</span> <span style='color: #FFFFFF;'>Adjacent angles are</span> <span style='color: #FF9900;'>supplementary</span> <span style='color: #FFFFFF;'>(sum to 180°).</span>",
            angleEqualityMessageAC: "",
            angleEqualityMessageBD: "",
            oppositeAnglesEqualMessage: "",
            instructionText: "Tap » to explore diagonal properties."
          }
        },
        page13: {
          title: "Measuring angles using Protractor",
          footerInstruction: "Tap 'Start Over' to learn again",
          infoText: "The steps to measure any angle are:<br><br>1. Bring the <span style='color: #FFA500; font-weight: bold;'>PROTRACTOR</span><br>2. Align the corner of the angle with the <span style='color: #FFA500; font-weight: bold;'>vertex of the protractor</span><br>3. Align arm of the base with the base of the <span style='color: #FFA500; font-weight: bold;'>protractor</span><br>4. Align the <span style='color: #FFA500; font-weight: bold;'>ARM</span> of the protractor with the <span style='color: #FFA500; font-weight: bold;'>SECOND ARM</span> of the angle",
        },
        page5: {
          title: "Measuring an Angle in Anti-Clockwise Direction",
          introText: "Now its your time to measure an angle",
        },
        page6: {
          title: "Measuring an Angle in Anti-Clockwise Direction",
          introText: "SHOUT OUT LOUD!!",
          instruction: "Tap the correct option",
          instructionComplete: "Tap '»' to move to continue",
        },
        page9: {
          title: "Measuring an Angle",
          introText: "What if none of the arm is sleeping line!!!<br>How do we measure such angles?",
          instruction: "Tap '»' to move to continue",
        },
        page10: {
          title: "Measuring an Angle",
          introText: "What if none of the arm is sleeping line!!!<br>How do we measure such angles?",
          methodText: "The method of measuring angles remains the same.",
        },
        quiz: {
          angleQuestion: "What is the measure of the angle?",
          option50: "50°",
          option70: "70°",
          option110: "110°",
          option130: "130°",
          correct50: "Correct! The angle measures 50°.",
          correct70: "Correct! The angle measures 70°.",
          correct110: "Correct! The angle measures 110°.",
          correct130: "Correct! The angle measures 130°.",
          incorrect50: "Not quite. The angle between the two rays is 50°.",
          incorrect70: "Not quite. The angle between the two rays is 70°.",
          incorrect110: "Not quite. The angle between the two rays is 110°.",
          incorrect130: "Not quite. The angle between the two rays is 130°.",
        },
        page7: {
          title: "Measuring an Angle in Clockwise Direction",
          introText: "Now its your time to measure an angle",
        },
        page8: {
          title: "Measuring an Angle in Anti-Clockwise Direction",
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
          headerText: "Sifat-sifat Persegi",
          headerDescription: "Persegi adalah <span style='color: #FF9900;'>segi empat</span>- yaitu poligon bersisi 4",
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
        longAddition: {
          placeLabels: {
            TTh: "10 ribu",
            Th: "Ribu",
            H: "Ratus",
            T: "Puluh",
            O: "Satuan",
          },
          placeColors: {
            TTh: "#A78BFA",
            Th: "#22C55E",
            H: "#FACC15",
            T: "#3B82F6",
            O: "#EF4444",
          },
          guidedFlowShort: {
            step0:
              "Kita perlu menjumlahkan bilangan yang diberikan. Ketuk kotak kuning yang berkedip untuk mulai.",
            step1:
              "Setiap angka berada di kolom nilai tempat: ribuan, ratusan, puluhan, satuan.",
            step2: "Mari uraikan bilangan pertama. Ketuk bilangan yang disorot.",
            step3:
              "Penguraian selesai — bilangan pertama ditulis sebagai jumlah nilai tempatnya.",
            step4: "Sekarang uraikan bilangan kedua. Ketuk bilangan yang disorot.",
            step5:
              "Penguraian selesai — bilangan kedua ditulis sebagai jumlah nilai tempatnya.",
            step6Bridge:
              "Kedua bilangan sudah terurai sepenuhnya. Selanjutnya kita jumlahkan per kolom, mulai dari kolom satuan di kanan. Perhatikan garis putus-putus pada kolom itu, lalu petak jawaban kuning.",
            columnInput:
              "Jumlahkan kolom {place}. Ketik totalnya di petak kuning, lalu ketuk Periksa. (Simpanan dari kolom sebelumnya: {carry}.)",
            regroupWhy:
              "Total di kolom {place} adalah {total}. Itu 10 atau lebih. Kita hanya menulis satu angka (0–9) di kolom ini, jadi kita pisahkan: simpan satu angka di sini dan bawa sisanya sebagai nilai {nextPlace}.",
            clickToSplit:
              "Ketuk petak yang berkedip untuk memisahkan {total}: simpan {remainder} di kolom {place} dan bawa {carryAmount} ke kolom {nextPlace}.",
            wrongColumnTotal:
              "Itu bukan jumlah yang benar untuk kolom {place}. Jumlahkan lagi nilai-nilai di kolom ini.",
            bringBack:
              "Sekarang bawa jumlah dari blok perluasan kembali ke blok kiri. Ketuk baris jawaban yang disorot.",
            bringBackDigit:
              "Ketuk {digit} untuk memindahkannya ke petak jawaban {place}.",
            leftAnswerComplete:
              "Bagus — baris jawaban di blok kiri sudah lengkap. Ketuk sekali untuk lanjut.",
            final: "{a} + {b} = {total}. Kerja bagus!",
          },
        },
      },
      pages: {
        page1: {
          title: "Apa itu BUSUR DERAJAT",
          mainText: "Sudut diukur dalam DERAJAT.\n\nKita dapat mengukur sudut menggunakan busur derajat...\n\nMari kita pahami unsur-unsur BUSUR DERAJAT...\n\nMari Jelajahi",
          instruction: "Ketuk » untuk melanjutkan.",
          dialogText: "Hai! Mari belajar mengukur sudut dengan busur derajat.",
          aishaAlt: "Aisha",
        },
        page2: {
          title: "Pahami <strong>BUSUR DERAJAT</strong>",
          introText: "Kita menggunakan BUSUR DERAJAT untuk mengukur sudut.<br>Busur derajat memiliki 5 bagian utama. Mari kita pahami satu per satu:",
          buttonVertex: "Vertex",
          buttonBase: "Alas",
          buttonScale: "Skala",
          buttonClockwise: "Pembacaan Searah Jarum Jam",
          buttonAntiClockwise: "Pembacaan Berlawanan Arah Jarum Jam",
          footerInstruction: "Ketuk '»' untuk mempelajari BUSUR DERAJAT",
          instruction: "Ketuk » untuk menjelajahi sifat-sifat sisi.",
          messageBox: "Segi empat yang diberikan memiliki empat sisi",
        },
        page3: {
          instruction: "Ketuk tombol yang disorot",
          instructionComplete: "Ketuk '»' untuk pindah dan menyelesaikan",
          instructionTapToSummarize: "Ketuk '»' untuk ringkasan",
          instructionShoutAnswer: "Teriakkan jawabannya lalu ketuk '»'",
          instructionAlignVertex: "Seret busur derajat dan sejajarkan dengan sudut",
          instructionAlignBase: "Putar busur derajat untuk menyelaraskan alas menggunakan pegangan melingkar",
          instructionAlignMeasurementArm: "Ukur sudut dengan memutar lengan pengukur menggunakan pegangan melingkar",
          states: {
            default: "Ketuk bagian untuk mempelajarinya.",
            protractor: "Bawa busur derajat – tombol 1 aktif.",
            alignVertex: "Sejajarkan sudut dengan vertex busur derajat – tombol 2 aktif.",
            alignBase: "Sejajarkan satu lengan dengan alas – tombol 3 aktif.",
            alignMeasurementArm: "Sejajarkan lengan busur derajat dengan lengan kedua sudut – tombol 4 aktif.",
            complete: "Semua langkah selesai; kuis/alur selesai.",
          },
          animationSequence: {
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
          title: "Mengukur Sudut",
          infoText: "Kita menghitung dari <span style='color: #F9A825;'>arah berlawanan jarum jam.</span><br><br>Lengan <span style='color: #F9A825;'>memotong</span> busur derajat pada <span style='color: #F9A825;'>50</span>.<br><br>Sudut yang diukur adalah <span style='color: #F9A825;'>50°</span>.",
          footerInstruction: "Baca lalu ketuk '»' untuk mengukur sudut",
          animationSequence: {
            step2DescriptionText: "",
            step3Message: "Kita melihat ada empat sudut interior.",
            step3AnglesDescriptionText: "Persegi memiliki <span style='color: #FF9900; font-weight: bold;'>empat sudut interior.</span>",
            allAngles90IntroMessage: "Mari kita ukur setiap sudut interior.",
            allAngles90MessageA: "∠A = 90°",
            allAngles90MessageB: "∠B = 90°",
            allAngles90MessageC: "∠C = 90°",
            allAngles90MessageD: "∠D = 90°",
            allAngles90ConclusionMessage: "Semua sudut interior adalah 90°.",
            allAngles90DescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FFFFFF;'>Semua sudut interior adalah</span> <span style='color: #FF9900;'>90°.</span>",
            adjacentAnglesMessage1: "Sekarang mari kita periksa apakah sudut-sudut yang bersebelahan berpelengkap (berjumlah 180°).",
            adjacentAnglesMessage2: "∠A + ∠B = 180°. Sudut A dan B yang bersebelahan berpelengkap!",
            adjacentAnglesMessage3: "∠B + ∠C = 180°. Sudut B dan C yang bersebelahan berpelengkap!",
            adjacentAnglesMessage4: "∠C + ∠D = 180°. Sudut C dan D yang bersebelahan berpelengkap!",
            adjacentAnglesMessage5: "∠D + ∠A = 180°. Sudut D dan A yang bersebelahan berpelengkap!",
            adjacentAnglesFinalMessage: "Semua pasang sudut yang bersebelahan berpelengkap (berjumlah 180°).",
            adjacentAnglesDescriptionText: "<span style='color: #FF9900;'>2.</span> <span style='color: #FFFFFF;'>Sudut-sudut yang bersebelahan</span> <span style='color: #FF9900;'>berpelengkap</span> <span style='color: #FFFFFF;'>(berjumlah 180°).</span>",
            angleEqualityMessageAC: "",
            angleEqualityMessageBD: "",
            oppositeAnglesEqualMessage: "",
            instructionText: "Ketuk » untuk menjelajahi sifat-sifat diagonal."
          }
        },
        page13: {
          title: "Mengukur sudut dengan Busur Derajat",
          footerInstruction: "Ketuk 'Mulai Ulang' untuk belajar lagi",
          infoText: "Langkah-langkah mengukur sudut:<br><br>1. Bawa <span style='color: #FFA500; font-weight: bold;'>BUSUR DERAJAT</span><br>2. Sejajarkan sudut dengan <span style='color: #FFA500; font-weight: bold;'>titik pusat busur derajat</span><br>3. Sejajarkan alas sudut dengan <span style='color: #FFA500; font-weight: bold;'>alas busur derajat</span><br>4. Sejajarkan <span style='color: #FFA500; font-weight: bold;'>LENGAN</span> busur derajat dengan <span style='color: #FFA500; font-weight: bold;'>LENGAN KEDUA</span> sudut",
        },
        page5: {
          title: "Mengukur Sudut dalam Arah Berlawanan Jarum Jam",
          introText: "Sekarang giliranmu mengukur sudut",
        },
        page6: {
          title: "Mengukur Sudut dalam Arah Berlawanan Jarum Jam",
          introText: "BERTERIAKLAH!!",
          instruction: "Ketuk opsi yang benar",
          instructionComplete: "Ketuk '»' untuk melanjutkan",
        },
        page9: {
          title: "Mengukur Sudut",
          introText: "Bagaimana jika tidak ada lengan yang pada garis dasar!!!<br>Bagaimana kita mengukur sudut seperti itu?",
          instruction: "Ketuk '»' untuk melanjutkan",
        },
        page10: {
          title: "Mengukur Sudut",
          introText: "Bagaimana jika tidak ada lengan yang pada garis dasar!!!<br>Bagaimana kita mengukur sudut seperti itu?",
          methodText: "Metode mengukur sudut tetap sama.",
        },
        quiz: {
          angleQuestion: "Berapa ukuran sudutnya?",
          option50: "50°",
          option70: "70°",
          option110: "110°",
          option130: "130°",
          correct50: "Benar! Sudutnya 50°.",
          correct70: "Benar! Sudutnya 70°.",
          correct110: "Benar! Sudutnya 110°.",
          correct130: "Benar! Sudutnya 130°.",
          incorrect50: "Belum tepat. Sudut antara dua sinar adalah 50°.",
          incorrect70: "Belum tepat. Sudut antara dua sinar adalah 70°.",
          incorrect110: "Belum tepat. Sudut antara dua sinar adalah 110°.",
          incorrect130: "Belum tepat. Sudut antara dua sinar adalah 130°.",
        },
        page7: {
          title: "Mengukur Sudut dalam Arah Searah Jarum Jam",
          introText: "Sekarang giliranmu mengukur sudut",
        },
        page8: {
          title: "Mengukur Sudut dalam Arah Berlawanan Jarum Jam",
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
      if (typeof window !== "undefined" && window.dispatchEvent) {
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

// Make i18n and AppData globally available (components read window.AppData.currentLanguage)
window.AppData = AppData;
window.i18n = i18n;
