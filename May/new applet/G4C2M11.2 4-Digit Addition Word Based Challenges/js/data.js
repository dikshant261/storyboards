// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#008000";
const highlightColor2 = "#FFFF00";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

const questionTextSize = '40gc';
const highlightTextSize = "40gc";

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
        check: "Check",
      },

      messages: {
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
        navigationReset: "Resetting to question 1",
        navigationComplete: "Complete app reset completed - ready for new question",
      },

      common: {
        questionText: "At the weekend market, Dimas joined a “Junior Chef Challenge.” He bought Rp4280 worth of vegetables and Rp4310 worth of spices for his special fried rice. <br/>How much did Dimas spend altogether?",
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
            decomposeFocus:
              "Let's decompose number {index} of {total}. Tap the highlighted number.",
            decomposeDone:
              "Decomposition complete — number {index} is written as the sum of its place values.",
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
            final: "{a} + {b} = {total}. Great work! Tap to highlighted box to continue.",
          },
          interactive: {
            incorrectFind:
              "Find the {total} incorrect tile(s). Found {found} of {total}.",
            incorrectAllFound:
              "Congratulations! All {total} incorrect ones are found",
            incorrectMissing:
              "Keep looking — {remaining} incorrect tile(s) still to find.",
            incorrectMissedClicks:
              " ({missed} wrong tap(s).)",
            fillFind:
              "Fill the {total} blank tile(s). Filled {filled} of {total}.",
            fillAllCorrect:
              "Great! All {total} tile(s) are filled correctly.",
            fillIncomplete:
              "{remaining} tile(s) still to fill.",
            fillSomeWrong:
              "{wrong} of the filled tile(s) are still incorrect.",
          },
        },
      },
      question: [4280, 4310],
      pages: {
        page1: {
          headerText: 'Addition : Word Based Challenges',
          mainText: "Angles are measured in DEGREES.<br>\nWe can measure how many degrees an angle is, with the help of a PROTRACTOR…<br>\nLet's Explore",
          instruction: "Tap » to proceed.",
          instructionAfter: 'Tap » to continue.',
          dialogText: "Looks like we have a new challenge to solve!",
          aishaAlt: "Aisha",
        },
        page2: {
          headerText: 'Addition : Word Based Challenges',
          mainText: "Angles are measured in DEGREES.<br>\nWe can measure how many degrees an angle is, with the help of a PROTRACTOR…<br>\nLet's Explore",
          instruction: "Tap » to proceed.",
          instructionAfter: 'Tap » to continue.',
          dialogText: "Given facts: \nvegetables for Rp4280 spices for Rp4310",
          aishaAlt: "Aisha",
          highlights: [
            {
              text: "He bought Rp4280 worth of vegetables",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "Rp4310 worth of spices",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
        },
        page3: {
          headerText: 'Addition : Word Based Challenges',
          mainText: "Angles are measured in DEGREES.<br>\nWe can measure how many degrees an angle is, with the help of a PROTRACTOR…<br>\nLet's Explore",
          instruction: "Tap » to proceed.",
          instructionAfter: 'Tap » to continue.',
          dialogText: "We need to find\n How much did Dimas spend altogether?",
          aishaAlt: "Aisha",
          highlights: [
            {
              text: "How much did Dimas spend altogether?",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: false,
              underline: false
            },

          ],
        },
        page14: {
          headerText: 'Addition : Word Based Challenges',

          mainText: "Angles are measured in DEGREES.<br>\nWe can measure how many degrees an angle is, with the help of a PROTRACTOR…<br>\nLet's Explore",
          instruction: "Tap according to the instructions in the dialogue box.",
          instructionAfter: 'Tap » to summarize.',
          instructionFinish: 'Tap » to summarize.',

          dialogText: "Hi! Let's learn how to measure angles with a protractor.",
          aishaAlt: "Aisha",
        },
        page4: {
          headerText: 'Addition : Word Based Challenges',
          mainText: "Angles are measured in DEGREES.<br>\nWe can measure how many degrees an angle is, with the help of a PROTRACTOR…<br>\nLet's Explore",
          instruction: "Tap » to start over again.",
          instructionAfter: 'Tap » to continue.',
          dialogText: "Perfect! You have completed the challenge",
          aishaAlt: "Aisha",
          summaryText: "<br/> vegetables for Rp4280<br/> spices for Rp4310<br/> Dimas spent in total Rp8590",
        },
        page15: {
          title: "Measuring Angles using Protractor",
          mainText: "Angles are measured in DEGREES.<br>\nWe can measure how many degrees an angle is, with the help of a PROTRACTOR…<br>\nLet's Explore",
          instruction: "Tap to empty boxes to fill them with correct values",
          instructionAfter: 'Tap » for the next challenge.',
          instructionFinish: 'Tap » start over again.',
          dialogText: "Hi! Let's learn how to measure angles with a protractor.",
          aishaAlt: "Aisha",
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
        check: "Periksa",
      },

      messages: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete: "Reset aplikasi selesai - siap untuk pertanyaan baru",
      },
      common: {
        questionText: "Untuk festival sekolah, kelas Bu Rani merencanakan “Mini Indonesia Fair.”<br/> Mereka membeli lentera warna-warni seharga Rp2450 dan makanan tradisional seharga Rp3320 untuk menghias stan mereka.<br/> Berapa total uang yang dihabiskan kelas tersebut?",
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
            decomposeFocus:
              "Mari uraikan bilangan ke-{index} dari {total}. Ketuk bilangan yang disorot.",
            decomposeDone:
              "Penguraian selesai — bilangan ke-{index} ditulis sebagai jumlah nilai tempatnya.",
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
          interactive: {
            incorrectFind:
              "Temukan {total} petak yang salah. Ditemukan {found} dari {total}.",
            incorrectAllFound:
              "Selamat! Semua {total} yang salah sudah ditemukan",
            incorrectMissing:
              "Terus cari — masih ada {remaining} petak salah yang belum ditemukan.",
            incorrectMissedClicks:
              " ({missed} ketukan salah.)",
            fillFind:
              "Isi {total} petak kosong. Terisi {filled} dari {total}.",
            fillAllCorrect:
              "Bagus! Semua {total} petak terisi dengan benar.",
            fillIncomplete:
              "Masih ada {remaining} petak yang belum diisi.",
            fillSomeWrong:
              "{wrong} petak yang sudah diisi masih salah.",
          },
        },
      },
      pages: {
        page1: {
          headerText: 'Penjumlahan : Tantangan Berbasis Cerita',
          mainText: "Sudut diukur dalam DERAJAT.<br>\nKita dapat mengukur besar sudut dengan bantuan BUSUR DERAJAT…<br>\nMari Jelajahi",
          instruction: "Ketuk » untuk melanjutkan.",
          instructionAfter: 'Ketuk » untuk melanjutkan.',
          dialogText: "Sepertinya kita punya tantangan baru untuk diselesaikan!",
          aishaAlt: "Aisha",
        },

        page2: {
          headerText: 'Penjumlahan : Tantangan Berbasis Cerita',
          mainText: "Sudut diukur dalam DERAJAT.<br>\nKita dapat mengukur besar sudut dengan bantuan BUSUR DERAJAT…<br>\nMari Jelajahi",
          instruction: "Ketuk » untuk melanjutkan.",
          instructionAfter: 'Ketuk » untuk melanjutkan.',
          dialogText: "Fakta yang diberikan: \nlentera warna-warni seharga Rp2450 makanan tradisional seharga Rp3320",
          aishaAlt: "Aisha",
          highlights: [
            {
              text: "Mereka membeli lentera warna-warni seharga Rp2450",
              fontColor: highlightColor1,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            },
            {
              text: "makanan tradisional seharga Rp3320",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: true,
              underline: false
            }
          ],
        },

        page3: {
          headerText: 'Penjumlahan : Tantangan Berbasis Cerita',
          mainText: "Sudut diukur dalam DERAJAT.<br>\nKita dapat mengukur besar sudut dengan bantuan BUSUR DERAJAT…<br>\nMari Jelajahi",
          instruction: "Ketuk » untuk melanjutkan.",
          instructionAfter: 'Ketuk » untuk melanjutkan.',
          dialogText: "Kita perlu mencari\n Berapa total uang yang dihabiskan kelas?",
          aishaAlt: "Aisha",
          highlights: [
            {
              text: "Berapa total uang yang dihabiskan kelas?",
              fontColor: highlightColor2,
              fontSize: questionTextSize,
              bold: false,
              underline: false
            },
          ],
        },

        page14: {
          headerText: 'Penjumlahan : Tantangan Berbasis Cerita',

          mainText: "Sudut diukur dalam DERAJAT.<br>\nKita dapat mengukur besar sudut dengan bantuan BUSUR DERAJAT…<br>\nMari Jelajahi",
          instruction: "Ketuk sesuai instruksi di kotak dialog.",
          instructionAfter: 'Ketuk » untuk merangkum.',
          instructionFinish: 'Ketuk » untuk merangkum.',

          dialogText: "Hai! Mari belajar cara mengukur sudut menggunakan busur derajat.",
          aishaAlt: "Aisha",
        },

        page4: {
          headerText: 'Penjumlahan : Tantangan Berbasis Cerita',
          mainText: "Sudut diukur dalam DERAJAT.<br>\nKita dapat mengukur besar sudut dengan bantuan BUSUR DERAJAT…<br>\nMari Jelajahi",
          instruction: "Ketuk » untuk memulai lagi.",
          instructionAfter: 'Ketuk » untuk melanjutkan.',
          dialogText: "Hebat! Kamu telah menyelesaikan tantangan",
          aishaAlt: "Aisha",
          summaryText: "lentera warna-warni seharga Rp2450<br/> makanan tradisional seharga Rp3320<br/> total pengeluaran kelas adalah Rp5770",
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
