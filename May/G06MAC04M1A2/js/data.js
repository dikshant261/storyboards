// data.js - Internationalization data for the Diver Coral Reef Planting Learning Applet
// Contains only the text content that's actually used in the app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = "#8A2BE2";

const questionTextSize = "24gc";

/**
 * Capsule / tube colours for `questionArray` (`tubeColor*`, `questionColor`, `serveColor`).
 * Hex values must match PageConfig `QUESTION_COLOR_NAME_HEX` (same palette as Lottie).
 */
const Color1 = "#ff8ec7"; // pink
const Color2 = "#f39c12"; // orange
const Color3 = "#3498db"; // blue
const Color4 = "#f7c81a"; // yellow
const Color5 = "#e74c3c"; // red
const Color6 = "#6aa94c"; // green

const AppData = {
  // Current language setting
  currentLanguage: "en",

  // Text content by language
  translations: {
    en: {
      appInfo: {
        title: "High Chance and Low Chance",
      },

      messages: {
        pageStatesCleared:
          "Page states have been cleared. Reload the page to start fresh?",
        nextButtonNav: "Page change event dispatched",
        previousButtonNav: "Page change event dispatched",
        nextButtonPage1: "Page change event dispatched",
        nextButtonPage2: "Page change event dispatched",
        nextButtonpage5: "Page change event dispatched",
        nextButtonpage6: "Page change event dispatched",
        nextButtonpage8: "Page change event dispatched",
        previousButtonPage1: "Page change event dispatched",
        navigationReset: "Resetting to question 1",
        navigationComplete:
          "App reset complete – ready for a new question",
        lastPageStartingOver: "Last page – starting over",
        allStagesCompleted: "All stages completed!",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over",
        start: "Start",
        continue: 'Continue',
        check: 'Check',
        lottieFill: "FILL",
        lottieServe: "SERVE",
        machineFill: "Fill",
        machineServe: "Serve",
      },

      common: {
        heavy: "Heavy",
        light: "Light",
        tapAlt: "Tap",
        questionText:
          "Humam is a diver who cares about the environment. One day he and his team will do coral planting to repair damaged coral reefs. Humam's condition is documented as shown in the picture below. If the sea being dived is 20 meters and the bottom is flat. How much area of the seabed can Humam reach to plant coral reefs?",
        questionIcon: "Q",
        informationAnalysis: {
          header: "INFORMATION ANALYSIS",
          facts: "Facts",
          values: "Value",
          toFind: "To Find",
        },
        conceptSummary: {
          header: "CONCEPT SUMMARY",
          given: "Given",
          toFind: "To Find",
          keyConcepts: "Key Concepts",
          importantFormulae: "Calculations",
        },
      },

      components: {
        informationAnalysis: {
          headerText: "INFORMATION ANALYSIS",
          factsTitle: "Facts",
          valueTitle: "Value",
          toFindTitle: "To Find",
        },
        conceptSummary: {
          headerText: "CONCEPT SUMMARY",
          givenTitle: "Given",
          toFindTitle: "To Find",
          keyConceptsTitle: "Key Concepts",
          importantFormulaeTitle: "Calculations",
        },
      },

      questionArray: [
        {
          tubeColor1: Color1,
          tubeColor2: Color1,
          tubeColor3: Color2,
          tubeColor4: Color3,
          questionColor: Color1,
          answer: "someChance",
          maxServe: 1,
          serveFeedback: "Yay!<br>You got a pink capsule",
          serveColor: Color1,
          feedback_sureChance:
            "No, you can’t be sure, there are other colour capsules too!<br/><br/>Try again!",
          feedback_someChance:
            "Correct! There is some chance of getting Pink capsule as it is there in at least one jar, but not in all jars.",
          feedback_noChance:
            "No, you might get Pink capsule as it is there in at least one jar.<br/><br/>Try again!",
        },
        {
          tubeColor1: Color1,
          tubeColor2: Color2,
          tubeColor3: Color3,
          tubeColor4: Color4,
          questionColor: Color2,
          answer: "noChance",
          maxServe: 1,
          serveFeedback:
            "See, you didn't get {questionColor} capsule as it wasn't there. You got {color 2} capsule.",
          serveColor: Color2,
          feedback_sureChance:
            "No, there is no jar with {color} capsule. Try again!",
          feedback_someChance:
            "No, there is no jar with {color} capsule. Try again!",
          feedback_noChance:
            "Good job! Since there is no jar with {color} capsule, there is no chance of getting it.",
        },
        {
          tubeColor1: Color2,
          tubeColor2: Color2,
          tubeColor3: Color2,
          tubeColor4: Color2,
          questionColor: Color2,
          answer: "sureChance",
          maxServe: 1,
          serveFeedback: "Look, you got {color 2} capsule.",
          serveColor: Color2,
          feedback_sureChance:
            "Good job! Since all jars have {questionColor} capsule, we will surely get {questionColor} capsule.",
          feedback_someChance:
            "No, all jars have {questionColor} capsule. We can't get anything else! Try again!",
          feedback_noChance:
            "No, all jars have {questionColor} capsule. We can't get anything else! Try again!",
        },
        {
          tubeColor1: Color1,
          tubeColor2: Color4,
          tubeColor3: Color4,
          tubeColor4: Color4,
          questionColor: Color1,
          answer: "someChance",
          maxServe: 1,
          serveFeedback:
            "Oh, you got {Color4} capsule, you couldn't get a {questionColor} capsule as more jars had {Color4} capsule.",
          serveColor: Color4,
          feedback_sureChance:
            "No, you can't be sure, there are other colour capsules too! Try again!",
          feedback_someChance:
            "Correct! There is some chance of getting {questionColor} capsule as it is there in at least one jar, but not in all jars.",
          feedback_noChance:
            "No, you might get {questionColor} capsule as it is there in at least one jar. Try again!",
        },
        {
          tubeColor1: Color1,
          tubeColor2: Color2,
          tubeColor3: Color3,
          tubeColor4: Color4,
          questionColor: Color6,
          answer: "noChance",
          maxServe: 1,
          serveFeedback:
            "See, you didn't get {questionColor} capsule as it wasn't there. You got {Color3} capsule.",
          serveColor: Color3,
          feedback_sureChance:
            "No, there is no jar with {questionColor} capsule. Try again!",
          feedback_someChance:
            "No, there is no jar with {questionColor} capsule. Try again!",
          feedback_noChance:
            "Good job! Since there is no jar with {questionColor} capsule, there is no chance of getting it.",
        },
        {
          tubeColor1: Color3,
          tubeColor2: Color3,
          tubeColor3: Color3,
          tubeColor4: Color4,
          questionColor: Color3,
          answer: "someChance",
          maxServe: 1,
          serveFeedback:
            "Oh, you got {color 4} capsule, you couldn't get a {questionColor} capsule even when 3 jars had {questionColor} capsule.",
          serveColor: Color4,
          feedback_sureChance:
            "No, you can't be sure, there are other colour capsules too! Try again!",
          feedback_noChance:
            "No, you might get {questionColor} capsule as it is there in at least one jar. Try again!",
          feedback_someChance:
            "Correct! There is some chance of getting {questionColor} capsule as it is there in at least one jar, but not in all jars.",
        },
      ],

      pages: {
        page1: {
          title: "Understanding Chance",
          mainText:
            "You have already heard the words <span style='background-color:#44D57A;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>sure chance</span>, <span style='background-color:#FFB74D;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>some chance</span>, and <span style='background-color:#D81629;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>no chance</span>.<br/><br/>But how do we decide which one to use in a real situation?<br/><br/>In this activity, you will look carefully at what is possible<br/>and use that to decide the chance.",
          tapToBegin: "Tap ‘Start’ to begin.",
        },
        page2: {
          talkBoxText:
            "Welcome to the KAPSUL factory! <br/><br/>Let’s try a kapsul from this machine.",
          talkBoxText2: "<span>Yay!2, you got a <span style='background-color:#008DCE; padding:2px'>BLUE</span>  kapsul!<br/><br/>Out of the 4 pills, we can get one of them.</span>",
          instructionText: "Tap ‘Serve’ to get a kapsul.",
          instructionAfterServe: "Tap » to continue.",
        },
        page3: {
          questionChancePromptBefore: "What is the chance of getting the ",
          questionChancePromptAfter: " capsule?",
          instructionText: "Tap the correct option.",
          tapServe: "Tap ‘Serve’.",
          instructionAfterServe: 'Tap » to understand what this means.',
          instructionAfterServeLast: "Tap » to continue.",
          instructionAfterServeNextTurn: "Tap » for next turn.",
          chanceButtonSure: "Sure Chance",
          chanceButtonSome: "Some Chance",
          chanceButtonNo: "No Chance",
        },
        page4: {
          title: 'Now you understand chance more clearly.',
          mainText: " <span style='background-color:#3DDC84;padding:4px;'>Sure chance</span> means the event will happen every time because there is no other possible result.<br/><br/> <span style='background-color:#FFB347;padding:4px;'>Some chance</span> means the event may or may not happen because more than one result is possible.<br/><br/> <span style='background-color:#FF6B6B;padding:4px;'>No chance</span> means the event cannot happen because it is not possible at all.<br/><br/> Tap ‘Start Over’ to repeat this activity.",
          sevenOfTenText: "<span style='color:#FFD966'>2 of 10 serves</span><br/>are  <span style='background-color:#D81629;padding:2px;'>RED</span>. kapsuls",
        },
        page5: {
          talkBoxText:
            "Getting a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul is more likely, but that doesn’t mean we will <span style='color:#FFD966'>always</span> get a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul.<br/><br/>We can also get <span style='background-color:#44D57A;padding:2px;'>GREEN</span> kapsuls.<br/><br/><span style='color:#FFD966'>More likely does not mean always</span>.",
          instructionText: "Tap » to try a different machine.",
        },
        page6: {
          talkBoxText:
            "Let’s look at another kapsul machine!<br/><br/>It also has <span style='background-color:#D81629;padding:2px;'>RED</span> and <span style='background-color:#44D57A;padding:2px;'>GREEN</span> kapsuls.<br/><br/>Let’s see what happens when we try 10 serves.",
          talkBoxText2:
            '<span>Out of 10 kapsul serves, only 2 are <span style="background-color:#D81629;padding:2px;">RED</span>.<br/><br/>This gives us an idea of how likely getting <span style="background-color:#D81629;padding:2px;">RED</span> is.</span>',
          instructionText: "Tap ‘Serve’ button 10 times.",
          instructionAfterServe: "Tap » to understand what this means.",
          headerAfterQuiz: "What do you notice?",
        },
        page7: {
          mainText:
            "Since there are fewer <span style='background-color:#D81629;padding:2px;'>RED</span> kapsuls inside the machine, we get <span style='background-color:#D81629;padding:2px;'>RED</span> kapsuls only a few times.<br/><br/>So, getting a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul has <br/><span style='color:#FFD966'>low chance</span>.<br/><br/>In math, we say getting a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul is <span style='color:#FFD966'>less likely</span>.",
          sevenOfTenText:
            "<span style='color:#FFD966'>2 of 10 serves</span><br/>are <span style='background-color:#D81629;padding:2px;'>RED</span> kapsuls",
          instructionAfterQuiz: "Tap » to continue.",
          conceptSummary: {
            completionText:
              "Fewer RED kapsuls in the machine means drawing RED is less likely.",
          },
        },
        page8: {
          talkBoxText:
            "Getting a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul is less likely, but that doesn’t mean we will <span style='color:#FFD966'>never</span> get a <span style='background-color:#D81629;padding:2px;'>RED</span> kapsul.<br/><br/><span style='color:#FFD966'>Less likely does not mean never</span>.",
          instructionText: "Tap » to summarize.",
          instructionAfterQuiz: "Tap » to summarize.",
        },
        page9: {
          chanceDependsText:
            "<span style='color:#FFD966'>Chance depends on how many items are present.</span>",
          moreText:
            "More<br/><span style='background-color:#D81629;padding:2px'>RED</span><br/>kapsuls",
          equalSign: "⇒",
          gettingRed1:
            'Getting a <span style="background-color:#D81629;padding:2px">RED</span><br/>kapsul<br/>is <span style="color:#FFD966">more likely</span>.',
          fewerText:
            "Fewer<br/><span style='background-color:#D81629;padding:2px'>RED</span><br/>kapsuls",
          gettingRed2:
            'Getting a <span style="background-color:#D81629;padding:2px">RED</span><br/>kapsul<br/>is <span style="color:#FFD966">less likely</span>.',
          instructionAfterQuiz: "Tap ‘Start Over’ when you want to try the lesson again.",
        },
      },
    },
    id: {
      appInfo: {
        title: "Peluang Tinggi dan Peluang Rendah",
      },

      messages: {
        pageStatesCleared:
          "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
        nextButtonNav: "Event perpindahan halaman telah dikirim",
        previousButtonNav: "Event perpindahan halaman telah dikirim",
        nextButtonPage1: "Event perpindahan halaman telah dikirim",
        nextButtonPage2: "Event perpindahan halaman telah dikirim",
        nextButtonpage5: "Event perpindahan halaman telah dikirim",
        nextButtonpage6: "Event perpindahan halaman telah dikirim",
        nextButtonpage8: "Event perpindahan halaman telah dikirim",
        previousButtonPage1: "Event perpindahan halaman telah dikirim",
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete:
          "Reset aplikasi selesai – siap untuk pertanyaan baru",
        lastPageStartingOver: "Halaman terakhir – memulai kembali",
        allStagesCompleted: "Semua tahap telah selesai!",
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang",
        start: "Mulai",
        continue: "Lanjut",
        check: "Periksa",
        lottieFill: "ISI",
        lottieServe: "SAJI",
        machineFill: "Isi",
        machineServe: "Saji",
      },

      common: {
        heavy: "Berat",
        light: "Ringan",
        tapAlt: "Ketuk",
        questionText:
          "Humam adalah seorang penyelam yang peduli terhadap lingkungan. Suatu hari, ia dan timnya akan melakukan penanaman karang untuk memperbaiki terumbu karang yang rusak. Kondisi Humam didokumentasikan seperti yang ditunjukkan pada gambar di bawah ini. Jika kedalaman laut yang diselami adalah 20 meter dan dasar lautnya datar, berapa luas area dasar laut yang dapat dijangkau Humam untuk menanam terumbu karang?",
        questionIcon: "P",
        informationAnalysis: {
          header: "ANALISIS INFORMASI",
          facts: "Fakta",
          values: "Nilai",
          toFind: "Yang Dicari",
        },
        conceptSummary: {
          header: "RINGKASAN KONSEP",
          given: "Diketahui",
          toFind: "Yang Dicari",
          keyConcepts: "Konsep Utama",
          importantFormulae: "Perhitungan",
        },
      },

      components: {
        informationAnalysis: {
          headerText: "ANALISIS INFORMASI",
          factsTitle: "Fakta",
          valueTitle: "Nilai",
          toFindTitle: "Yang Dicari",
        },
        conceptSummary: {
          headerText: "RINGKASAN KONSEP",
          givenTitle: "Diketahui",
          toFindTitle: "Yang Dicari",
          keyConceptsTitle: "Konsep Utama",
          importantFormulaeTitle: "Perhitungan",
        },
      },

      questionArray: [
        {
          tubeColor1: Color1,
          tubeColor2: Color1,
          tubeColor3: Color2,
          tubeColor4: Color3,
          questionColor: Color1,
          answer: "someChance",
          maxServe: 1,
          serveFeedback: "Hore!<br>Kamu mendapat kapsul {questionColor}",
          serveColor: Color1,
          feedback_sureChance:
            "Tidak, kamu tidak bisa memastikan, masih ada kapsul warna lain juga!<br/><br/>Coba lagi!",
          feedback_someChance:
            "Benar! Ada peluang mendapat kapsul {questionColor} karena ada di minimal satu toples, tetapi tidak di semua toples.",
          feedback_noChance:
            "Tidak, kamu bisa saja mendapat kapsul {questionColor} karena ada di minimal satu toples.<br/><br/>Coba lagi!",
        },
        {
          tubeColor1: Color1,
          tubeColor2: Color2,
          tubeColor3: Color3,
          tubeColor4: Color4,
          questionColor: Color2,
          answer: "noChance",
          maxServe: 1,
          serveFeedback:
            "Lihat, kamu tidak mendapat kapsul {questionColor} karena tidak ada di situ. Kamu mendapat kapsul {color 2}.",
          serveColor: Color2,
          feedback_sureChance:
            "Tidak, tidak ada toples dengan kapsul {color}. Coba lagi!",
          feedback_someChance:
            "Tidak, tidak ada toples dengan kapsul {color}. Coba lagi!",
          feedback_noChance:
            "Bagus! Karena tidak ada toples dengan kapsul {color}, tidak ada peluang mendapatkannya.",
        },
        {
          tubeColor1: Color2,
          tubeColor2: Color2,
          tubeColor3: Color2,
          tubeColor4: Color2,
          questionColor: Color2,
          answer: "sureChance",
          maxServe: 1,
          serveFeedback: "Lihat, kamu mendapat kapsul {color 2}.",
          serveColor: Color2,
          feedback_sureChance:
            "Bagus! Karena semua toples berisi kapsul {questionColor}, kita pasti mendapat kapsul {questionColor}.",
          feedback_someChance:
            "Tidak, semua toples berisi kapsul {questionColor}. Kita tidak bisa mendapat yang lain! Coba lagi!",
          feedback_noChance:
            "Tidak, semua toples berisi kapsul {questionColor}. Kita tidak bisa mendapat yang lain! Coba lagi!",
        },
        {
          tubeColor1: Color1,
          tubeColor2: Color4,
          tubeColor3: Color4,
          tubeColor4: Color4,
          questionColor: Color1,
          answer: "someChance",
          maxServe: 1,
          serveFeedback:
            "Oh, kamu mendapat kapsul {Color4}, kamu tidak bisa mendapat kapsul {questionColor} karena lebih banyak toples berisi kapsul {Color4}.",
          serveColor: Color4,
          feedback_sureChance:
            "Tidak, kamu tidak bisa memastikan, masih ada kapsul warna lain juga! Coba lagi!",
          feedback_someChance:
            "Benar! Ada peluang mendapat kapsul {questionColor} karena ada di minimal satu toples, tetapi tidak di semua toples.",
          feedback_noChance:
            "Tidak, kamu bisa saja mendapat kapsul {questionColor} karena ada di minimal satu toples. Coba lagi!",
        },
        {
          tubeColor1: Color1,
          tubeColor2: Color2,
          tubeColor3: Color3,
          tubeColor4: Color4,
          questionColor: Color6,
          answer: "noChance",
          maxServe: 1,
          serveFeedback:
            "Lihat, kamu tidak mendapat kapsul {questionColor} karena tidak ada di situ. Kamu mendapat kapsul {Color3}.",
          serveColor: Color3,
          feedback_sureChance:
            "Tidak, tidak ada toples dengan kapsul {questionColor}. Coba lagi!",
          feedback_someChance:
            "Tidak, tidak ada toples dengan kapsul {questionColor}. Coba lagi!",
          feedback_noChance:
            "Bagus! Karena tidak ada toples dengan kapsul {questionColor}, tidak ada peluang mendapatkannya.",
        },
        {
          tubeColor1: Color3,
          tubeColor2: Color3,
          tubeColor3: Color3,
          tubeColor4: Color4,
          questionColor: Color3,
          answer: "someChance",
          maxServe: 1,
          serveFeedback:
            "Oh, kamu mendapat kapsul {color 4}, kamu tidak bisa mendapat kapsul {questionColor} meskipun 3 toples berisi kapsul {questionColor}.",
          serveColor: Color4,
          feedback_sureChance:
            "Tidak, kamu tidak bisa memastikan, masih ada kapsul warna lain juga! Coba lagi!",
          feedback_noChance:
            "Tidak, kamu bisa saja mendapat kapsul {questionColor} karena ada di minimal satu toples. Coba lagi!",
          feedback_someChance:
            "Benar! Ada peluang mendapat kapsul {questionColor} karena ada di minimal satu toples, tetapi tidak di semua toples.",
        },
      ],

      pages: {
        page1: {
          title: "Memahami Peluang",
          mainText:
            "Kamu sudah pernah mendengar istilah <span style='background-color:#44D57A;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>peluang pasti</span>, <span style='background-color:#FFB74D;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>ada peluang</span>, dan <span style='background-color:#D81629;padding:2px 6px;border-radius:3px;color:#000;font-weight:700;'>tidak ada peluang</span>.<br/><br/>Tapi bagaimana kita memutuskan mana yang dipakai dalam situasi nyata?<br/><br/>Dalam aktivitas ini, kamu akan mengamati dengan teliti apa yang mungkin terjadi<br/>dan memakainya untuk menentukan peluangnya.",
          tapToBegin: "Ketuk ‘Mulai’ untuk memulai.",
        },
        page2: {
          talkBoxText:
            "Selamat datang di pabrik KAPSUL! <br/><br/>Mari kita coba sebuah kapsul dari mesin ini.",
          talkBoxText2:
            "<span>Lihat, kamu mendapat kapsul <span style='background-color:#008DCE; padding:2px'>BIRU</span>!<br/><br/>Dari 4 kapsul, kita bisa mendapat salah satunya.</span>",
          instructionText: "Ketuk ‘Saji’ untuk mendapatkan sebuah kapsul.",
          instructionAfterServe: "Ketuk » untuk melanjutkan.",
        },
        page3: {
          questionChancePromptBefore: "Berapa peluang mendapat kapsul ",
          questionChancePromptAfter: "?",
          instructionText: "Ketuk pilihan yang benar.",
          tapServe: "Ketuk ‘Sajikan’.",
          instructionAfterServe: "Ketuk » untuk memahami maksudnya.",
          instructionAfterServeLast: "Ketuk » untuk melanjutkan.",
          instructionAfterServeNextTurn: "Ketuk » untuk giliran berikutnya.",
          chanceButtonSure: "Peluang pasti",
          chanceButtonSome: "Ada peluang",
          chanceButtonNo: "Tidak ada peluang",
        },
        page4: {
          title: "Sekarang kamu memahami peluang lebih jelas.",
          mainText:
            " <span style='background-color:#3DDC84;padding:4px;'>Peluang pasti</span> berarti peristiwa itu akan terjadi setiap kali karena tidak ada hasil lain yang mungkin.<br/><br/> <span style='background-color:#FFB347;padding:4px;'>Ada peluang</span> berarti peristiwa itu mungkin terjadi atau tidak, karena lebih dari satu hasil yang mungkin.<br/><br/> <span style='background-color:#FF6B6B;padding:4px;'>Tidak ada peluang</span> berarti peristiwa itu tidak bisa terjadi karena sama sekali tidak mungkin.<br/><br/> Ketuk ‘Mulai Ulang’ untuk mengulang aktivitas ini.",
          sevenOfTenText:
            "<span style='color:#FFD966'>2 dari 10 kali saji</span><br/>adalah kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>.",
        },
        page5: {
          talkBoxText:
            "Mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> lebih mungkin terjadi, tetapi itu tidak berarti kita akan <span style='color:#FFD966'>selalu</span> mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>.<br/><br/>Kita juga bisa mendapat kapsul <span style='background-color:#44D57A;padding:2px;'>HIJAU</span>.<br/><br/><span style='color:#FFD966'>Lebih mungkin tidak berarti selalu</span>.",
          instructionText: "Ketuk » untuk mencoba mesin lain.",
        },
        page6: {
          talkBoxText:
            "Mari kita lihat mesin kapsul lain!<br/><br/>Mesin ini juga berisi kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> dan <span style='background-color:#44D57A;padding:2px;'>HIJAU</span>.<br/><br/>Mari kita lihat apa yang terjadi jika kita melakukan 10 kali serve.",
          talkBoxText2:
            '<span>Dari 10 kali serve, hanya 2 yang <span style="background-color:#D81629;padding:2px;">MERAH</span>.<br/><br/>Ini memberi gambaran seberapa besar peluang mendapat <span style="background-color:#D81629;padding:2px;">MERAH</span>.</span>',
          instructionText: "Ketuk tombol ‘Saji’ 10 kali.",
          instructionAfterServe: "Ketuk » untuk memahami maksudnya.",
          headerAfterQuiz: "Apa yang kamu perhatikan?",
        },
        page7: {
          mainText:
            "Karena ada lebih sedikit kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> di dalam mesin, kita hanya jarang mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>.<br/><br/>Jadi, mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> memiliki <br/><span style='color:#FFD966'>peluang rendah</span>.<br/><br/>Dalam matematika, kita mengatakan mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> <span style='color:#FFD966'>kurang mungkin</span> terjadi.",
          sevenOfTenText:
            "<span style='color:#FFD966'>2 dari 10 serve</span><br/>adalah kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
          conceptSummary: {
            completionText:
              "Semakin sedikit kapsul MERAH di dalam mesin, semakin kecil peluang mendapat MERAH.",
          },
        },
        page8: {
          talkBoxText:
            "Mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span> kurang mungkin terjadi, tetapi itu tidak berarti kita akan <span style='color:#FFD966'>tidak pernah</span> mendapat kapsul <span style='background-color:#D81629;padding:2px;'>MERAH</span>.<br/><br/><span style='color:#FFD966'>Kurang mungkin tidak berarti tidak pernah</span>.",
          instructionText: "Ketuk » untuk merangkum.",
          instructionAfterQuiz: "Ketuk » untuk merangkum.",
        },
        page9: {
          chanceDependsText:
            "<span style='color:#FFD966'>Peluang bergantung pada seberapa banyak benda yang ada.</span>",
          moreText:
            "Lebih banyak<br/><span style='background-color:#D81629;padding:2px'>MERAH</span><br/>kapsul",
          equalSign: "⇒",
          gettingRed1:
            'Mendapat kapsul <span style="background-color:#D81629;padding:2px">MERAH</span><br/><span style="color:#FFD966">lebih mungkin</span>.',
          fewerText:
            "Lebih sedikit<br/><span style='background-color:#D81629;padding:2px'>MERAH</span><br/>kapsul",
          gettingRed2:
            'Mendapat kapsul <span style="background-color:#D81629;padding:2px">MERAH</span><br/><span style="color:#FFD966">kurang mungkin</span>.',
          instructionAfterQuiz:
            "Ketuk ‘Mulai Ulang’ jika ingin mencoba pelajaran ini lagi.",
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
        Object.keys(AppData.translations),
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
