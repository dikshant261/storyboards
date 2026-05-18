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
        startOver: "Start<br>Over",
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
      },

      pages: {
        page1: {
          title: "Drawing Angles using Protractor",
          mainText: "We can draw angles using PROTRACTOR.<br><br>Let's EXPLORE how we can do this…",
        },
        page2: {
          title: "Measure an Angle",
          introText: "Let us understand how to draw an angle of 80°.",

          buttonVertex: "Bring the Protractor",
          buttonBase: "Align the corner of angle with the vertex of the Protractor",
          buttonScale: "Scale",
          buttonClockwise: "Align one arm with the base",
          buttonAntiClockwise: "Align the arm of the protractor<br>with the second arm of the angle",
          footerInstruction: "Tap '»' to learn how to measure angles using PROTRACTOR",
          instruction: "Tap » to explore side properties.",
          messageBox: "The given quadrilateral has four sides",
          instructionTapToSummarize: "Tap '»' to draw an angle .",

        },
        page3: {
          title: "Drawing an ANGLE using PROTRACTOR",
          introText: "Now, it's your turn to draw 60°",
          buttonDrawBase: "Draw the BASELINE",
          buttonBringProtractor: "Bring the PROTRACTOR",
          buttonAlignVertex: "Align at the vertex and align baseline",
          buttonMarkAngle: "Mark the ANGLE on the boundary of the protractor",
          buttonDrawArm: "Draw the SECOND ARM using the straight edge",
          instruction: "Tap on the highlighted button",
          instructionMarkAngle: "Drag the blue mark along the protractor to mark 60 degrees",
          instructionAlignVertexDrag: "Drag the protractor to align.",
          instructionComplete: "Tap '»' to move to conclude",
          instructionTapToSummarize: "Tap '»' to see the angle.",
          instructionShoutAnswer: "Shout out the answer and then tap '»'",
          instructionAlignVertex: "Drag the protractor and align with corner of angle",
          instructionAlignBase: "Rotate the protractor to align the base using the circular handle",
          instructionAlignMeasurementArm: "Measure angle by rotating measurement arm using the circular handle",
          states: {
            default: "Tap a part to learn about it.",
            drawBase: "Draw the baseline – button 1 active.",
            bringProtractor: "Bring the protractor – button 2 active.",
            alignVertex: "Align at the vertex and align baseline – button 3 active.",
            markAngle: "Mark the angle on the boundary of the protractor – button 4 active.",
            drawArm: "Draw the second arm using the straight edge – button 5 active.",
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
          instructionTapToSummarize: "Tap '»' to summarize.",
          introText: "Hurray!!! We have drawn an angle of 60°.",
          infoText: "We count from the <span style='color: #F9A825;'>clockwise direction.</span><br><br>The <span style='color: #F9A825;'>arm crosses</span> the protractor at <span style='color: #F9A825;'>50</span>.<br><br>The measured angle is <span style='color: #F9A825;'>50°</span>.",
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
          title: "Measuring an Angle in Clockwise Direction",
          introText: "Now its your time to measure an angle",
          infoText: "The steps to make any angle are:<br><br>1. Draw the <span style='color: #FFA500; font-weight: bold;'>BASELINE</span><br>2. Bring the <span style='color: #FFA500; font-weight: bold;'>PROTRACTOR</span><br>3. Align the <span style='color: #FFA500; font-weight: bold;'>corner of the angle</span> and <span style='color: #FFA500; font-weight: bold;'>arm of the base</span> with the protractor<br>4. Mark the <span style='color: #FFA500; font-weight: bold;'>angle</span> on the <span style='color: #FFA500; font-weight: bold;'>boundary</span> of the protractor<br>5. Draw the <span style='color: #FFA500; font-weight: bold;'>second ARM</span> of the angle using the straight edge",
        },
        page6: {
          title: "Measuring an Angle in Clockwise Direction",
          introText: "SHOUT OUT LOUD!!",
          instruction: "Tap the correct option",
          instructionComplete: "Tap '»' to move to the next slide",
        },
        page9: {
          title: "Measuring an Angle",
          introText: "What if none of the arm is sleeping line!!!<br>How do we measure such angles?",
          instruction: "Tap '»' to move to the next slide",
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
          title: "Measuring an Angle in Anti-Clockwise Direction",
          introText: "Now its your time to measure an angle",
        },
      },
    },

    id: {
      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai<br>Ulang",
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
      },
      pages: {
        page1: {
          title: "Menggambar Sudut menggunakan Busur Derajat",
          mainText: "Kita dapat menggambar sudut menggunakan BUSUR DERAJAT.<br><br>Mari kita EKSPLORASI bagaimana cara melakukannya…",
        },
        page2: {
          title: "Mengukur Sudut",
          introText: "Mari kita pahami bagaimana cara menggambar sudut 80°.",

          buttonVertex: "Ambil Busur Derajat",
          buttonBase: "Sejajarkan sudut dengan titik sudut busur derajat",
          buttonScale: "Skala",
          buttonClockwise: "Sejajarkan satu sisi dengan garis dasar",
          buttonAntiClockwise: "Sejajarkan sisi busur derajat<br>dengan sisi kedua sudut",
          footerInstruction: "Ketuk '»' untuk mempelajari cara mengukur sudut menggunakan BUSUR DERAJAT",
          instruction: "Ketuk » untuk menjelajahi sifat sisi.",
          messageBox: "Bangun segi empat yang diberikan memiliki empat sisi",
          instructionTapToSummarize: "Ketuk '»' untuk menggambar sudut.",

        },
        page3: {
          title: "Menggambar SUDUT menggunakan BUSUR DERAJAT",
          introText: "Sekarang, giliranmu untuk menggambar 60°",
          buttonDrawBase: "Gambar GARIS DASAR",
          buttonBringProtractor: "Ambil BUSUR DERAJAT",
          buttonAlignVertex: "Sejajarkan pada titik sudut dan garis dasar",
          buttonMarkAngle: "Tandai SUDUT pada batas busur derajat",
          buttonDrawArm: "Gambar SISI KEDUA menggunakan penggaris",
          instruction: "Ketuk tombol yang disorot",
          instructionMarkAngle: "Seret tanda biru sepanjang busur derajat untuk menandai 60 derajat",
          instructionAlignVertexDrag: "Seret busur derajat untuk menyesuaikan.",
          instructionComplete: "Ketuk '»' untuk melanjutkan ke kesimpulan",
          instructionTapToSummarize: "Ketuk '»' untuk melihat sudut.",
          instructionShoutAnswer: "Ucapkan jawabannya lalu ketuk '»'",
          instructionAlignVertex: "Seret busur derajat dan sejajarkan dengan sudut",
          instructionAlignBase: "Putar busur derajat untuk menyesuaikan garis dasar menggunakan pegangan lingkaran",
          instructionAlignMeasurementArm: "Ukur sudut dengan memutar lengan pengukur menggunakan pegangan lingkaran",
          states: {
            default: "Ketuk bagian untuk mempelajarinya.",
            drawBase: "Gambar garis dasar – tombol 1 aktif.",
            bringProtractor: "Ambil busur derajat – tombol 2 aktif.",
            alignVertex: "Sejajarkan pada titik sudut dan garis dasar – tombol 3 aktif.",
            markAngle: "Tandai sudut pada batas busur derajat – tombol 4 aktif.",
            drawArm: "Gambar sisi kedua menggunakan penggaris – tombol 5 aktif.",
            complete: "Semua langkah selesai; kuis/alur selesai.",
          },
          animationSequence: {
            initialMessage: "Sisi yang berhadapan sejajar karena jaraknya tetap sama.",
            firstPairProvenMessage: "AB dan CD sejajar satu sama lain",
            secondPairProvenMessage: "BC dan DA sejajar satu sama lain",
            conclusionMessage: "Dua pasang sisi yang berhadapan sejajar",
            sidesABEqualMessage: "Sisi AB dan CD sama panjang",
            sidesBCEqualMessage: "Sisi BC dan DA sama panjang",
            sidesEqualConclusionMessage: "Dua pasang sisi yang berhadapan memiliki panjang yang sama.",
            propertyDescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FF9900;'>Dua pasang</span> <span style='color: #FFFFFF;'>sisi yang berhadapan</span> <span style='color: #FF9900;'>sejajar.</span>",
            secondDescriptionText: "<span style='color: #FF9900;'>2.</span> <span style='color: #FF9900;'>Dua pasang</span> <span style='color: #FFFFFF;'>sisi yang berhadapan</span> <span style='color: #FF9900;'>sama panjang.</span>",
            instructionText: "Ketuk » untuk menjelajahi sifat sudut.",
            // Semua sisi sama (persegi)
            sidesEqualAtVertex0Message: "Sisi DA dan AB sama.",
            sidesEqualAtVertex1Message: "Sisi AB dan BC sama.",
            sidesEqualAtVertex2Message: "Sisi BC dan CD sama.",
            sidesEqualAtVertex3Message: "Sisi CD dan DA sama.",
            allSidesEqualConclusionMessage: "Keempat sisi sama panjang.",
            allSidesEqualDescriptionText: "<span style='color: #FF9900;'>2.</span> <span style='color: #FF9900;'>Keempat sisi</span> <span style='color: #FFFFFF;'>memiliki</span> <span style='color: #FF9900;'>panjang yang sama.</span>",
            allSidesEqualBlinkMessages: ["AB = BC = CD = DA", "AB = BC", "AB = BC = CD", "AB = BC = CD = DA"]
          }
        },
        page4: {
          title: "Mengukur Sudut",
          instructionTapToSummarize: "Ketuk '»' untuk merangkum.",
          introText: "Hore!!! Kita telah menggambar sudut 60°.",
          infoText: "Kita menghitung dari arah <span style='color: #F9A825;'>searah jarum jam.</span><br><br>Sisi <span style='color: #F9A825;'>memotong</span> busur derajat pada <span style='color: #F9A825;'>50</span>.<br><br>Sudut yang diukur adalah <span style='color: #F9A825;'>50°</span>.",
          footerInstruction: "Baca lalu ketuk '»' untuk mengukur sudut",
          animationSequence: {
            step2DescriptionText: "",
            step3Message: "Kita melihat bahwa ada empat sudut dalam.",
            step3AnglesDescriptionText: "Sebuah persegi memiliki <span style='color: #FF9900;'>empat sudut dalam.</span>",
            allAngles90IntroMessage: "Mari kita ukur setiap sudut dalam.",
            allAngles90MessageA: "∠A = 90°",
            allAngles90MessageB: "∠B = 90°",
            allAngles90MessageC: "∠C = 90°",
            allAngles90MessageD: "∠D = 90°",
            allAngles90ConclusionMessage: "Semua sudut dalam adalah 90°.",
            allAngles90DescriptionText: "<span style='color: #FF9900;'>1.</span> <span style='color: #FFFFFF;'>Semua sudut dalam adalah</span> <span style='color: #FF9900;'>90°.</span>",
            adjacentAnglesMessage1: "Sekarang mari kita periksa apakah sudut bersebelahan saling suplementer (jumlahnya 180°).",
            adjacentAnglesMessage2: "∠A + ∠B = 180°. Sudut A dan B saling suplementer!",
            adjacentAnglesMessage3: "∠B + ∠C = 180°. Sudut B dan C saling suplementer!",
            adjacentAnglesMessage4: "∠C + ∠D = 180°. Sudut C dan D saling suplementer!",
            adjacentAnglesMessage5: "∠D + ∠A = 180°. Sudut D dan A saling suplementer!",
            adjacentAnglesFinalMessage: "Semua pasangan sudut bersebelahan saling suplementer (jumlahnya 180°).",
            adjacentAnglesDescriptionText: "<span style='color: #FF9900;'>2.</span> <span style='color: #FFFFFF;'>Sudut bersebelahan adalah</span> <span style='color: #FF9900;'>suplementer</span> <span style='color: #FFFFFF;'>(jumlahnya 180°).</span>",
            angleEqualityMessageAC: "",
            angleEqualityMessageBD: "",
            oppositeAnglesEqualMessage: "",
            instructionText: "Ketuk » untuk menjelajahi sifat diagonal."
          }
        },
        page13: {
          title: "Mengukur sudut dengan Busur Derajat",
          footerInstruction: "Ketuk 'Mulai Ulang' untuk belajar lagi",
          infoText: "Langkah-langkah mengukur sudut:<br><br>1. Bawa <span style='color: #FFA500; font-weight: bold;'>BUSUR DERAJAT</span><br>2. Sejajarkan sudut dengan <span style='color: #FFA500; font-weight: bold;'>titik pusat busur derajat</span><br>3. Sejajarkan alas sudut dengan <span style='color: #FFA500; font-weight: bold;'>alas busur derajat</span><br>4. Sejajarkan <span style='color: #FFA500; font-weight: bold;'>LENGAN</span> busur derajat dengan <span style='color: #FFA500; font-weight: bold;'>LENGAN KEDUA</span> sudut",
        },
        page5: {
          title: "Mengukur Sudut Searah Jarum Jam",
          introText: "Sekarang giliranmu mengukur sudut",
          infoText: "Langkah-langkah membuat sudut:<br><br>1. Gambar <span style='color: #FFA500; font-weight: bold;'>GARIS DASAR</span><br>2. Bawa <span style='color: #FFA500; font-weight: bold;'>BUSUR DERAJAT</span><br>3. Sejajarkan <span style='color: #FFA500; font-weight: bold;'>titik sudut</span> dan <span style='color: #FFA500; font-weight: bold;'>lengan alas</span> dengan busur derajat<br>4. Tandai <span style='color: #FFA500; font-weight: bold;'>sudut</span> pada <span style='color: #FFA500; font-weight: bold;'>batas</span> busur derajat<br>5. Gambar <span style='color: #FFA500; font-weight: bold;'>LENGAN KEDUA</span> sudut menggunakan penggaris",
        },
        page6: {
          title: "Mengukur Sudut Searah Jarum Jam",
          introText: "BERTERIAKLAH!!",
          instruction: "Ketuk opsi yang benar",
          instructionComplete: "Ketuk '»' untuk pindah ke slide berikutnya",
        },
        page9: {
          title: "Mengukur Sudut",
          introText: "Bagaimana jika tidak ada lengan yang pada garis dasar!!!<br>Bagaimana kita mengukur sudut seperti itu?",
          instruction: "Ketuk '»' untuk pindah ke slide berikutnya",
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
          title: "Mengukur Sudut dalam Arah Berlawanan Jarum Jam",
          introText: "Sekarang giliranmu mengukur sudut",
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
