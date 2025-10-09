// content in english
const appData = {
  en: {
    translation: {
      buttons: {
        previous: "«",
        next: "»",
        show: "Show",
        check: "Check",
        hide: "Hide",
        startOver: "START OVER",
        start: "START",
        close: "Close",
        cannotDivide: "Can’t divide further",
        yes: "Yes",
        no: "No",
      },
      navigation: {
        tapNext: "Tap Next after reading",
        tapEachWord:
          "Tap on each word to see how it is used. Tap » after reading",
        tapAndDrag: "Tap and drag the phrases into the right category area ",
      },
      sceneOne: {
        whatIsStory: "What is a story question?",
        aStoryQuestion:
          "A story question is a short, real-life mini-story \n\nthat asks you to",
        calculateNumbers: "calculate a number",
      },
      sceneTwo: {
        typeOfStory: "Types of story questions:",
        additionStory:
          "1. Addition story question: Gives you two or more numbers that \nyou must add to get the answer.",
        subtraction: "2. Subtraction",
        confirmationKeyword:
          "Let’s learn the confirmation keywords words next!",
      },
      sceneThree: {
        typesOfQuestion: "Types of Story Questions",
        additionStoryQuestion: "Addition Story Question",
        subtractionStoryQuestion: "Subtraction Story Question",
        multiplicationStoryQuestion: "Multiplication Story Question",
        storyQuestionDescription:
          "Gives you two or more numbers that should be added to get the answer.",
        example: "Example",
        exampleText:
          "Mr. Rahmad has 110 apples and 105 bananas. How many fruits does he have in total?",
        answerLabel: "Answer",
        exampleAnswer: "110 + 105",
        subtractionGivesYou:
          "Gives you two numbers. You need to subtract one number from the other.",
        mrRehmadSubtractionText:
          "Mr. Rahmad has 110 apples and he sells 50 apples in the market. How many apples does he have left?",
        subtractAnswer: " 110 - 50",
        multiplicationGivesYOu:
          "Gives you number of groups and number of items in each group. You need to multiply both.",
        weWillLearn: "We will learn about this today. Tap\n » to continue.",
      },
      sceneFour: {
        whatMultiplicationGivesYou:
          "What a multiplication story question gives you",
        aMultiplicationStoryAlways:
          "A multiplication story question always gives you:",
        numberOne: "1. Number of groups",
        numberTwo: "2. Number of items in each group",
        weUseAbove: "We use the above two to find the:",
        totalNumber: "Total number of items ",
      },
      sceneFive: {
        howWeCalculate: "How we calculate the answer",
        noOfGroups: "No. of groups",
        items: "Items in each group",
        totalItems: "Total items",
      },
      sceneSix: {
        whatToLook: "What to look for in the multiplication story question",
        wordOfPharasGive: "1. Words or phrases that tells you: ",
        numberOfGroups: "number of groups",
        wordOfPharasTells: "2. Words or phrases that tells you: ",
        items: "items in each group",
        letUse: "Let’s use our wits on some example story questions.",
      },
      sceneSeven: {
        identifyPharase:
          "Identify phrases that describe “number of groups” and “items in each group”",
        jakaBought: "Asep bought",
        threeBasketOfApple: "5 boxes of toys",
        if: "If",
        eachBasket: "each box contains 7 toys,",
        howManyApples: "how many toys",
        didHeBuy: "did he buy?",
        noOfGroups: "No. of groups",
        itemInEachGroup: "Items in each group",
        goodJob: "Good job! Notice the pattern below",
        totalItems: "Total items",
        letsTry: "Let’s try one more story question",
        onceAgain: "Once again, let’s identify the phrases that describe:",
      },
      sceneTen: {
        janaWant: "Jana wants to gift",
        twoCupCake: "3 cupcakes each",
        toHerBestFriend: "to her 3 best friends.If she has",
        threeBest: "3 best friends,",
        howManyCupCakes: "how many cupcakes",
        sheMustBuy: "she must buy?",
      },
      sceneTwelve: {
        howTobeSure:
          "How to be sure that a story question is a multiplication question",
        nextWillLearn: "Next we will learn to spot two kinds of keywords:",
        clueWords: "Clue words",
        checkWords: "Check Words",
        eachEvery: "each,\nevery,\nper,\ngroups of,\nsets of",
        inAllHow: "In all,\nhow many,\ntotal number,\nfind the total",
        whenBoth:
          "When both show up together in a story, it is likely a multiplication question.",
      },
      sceneThirteen: {
        clueWordsTitle: "Clue Words",
        clueWordsDescription:
          "Clue words signal that a story is probably a multiplication problem. They always tell the number of items in a group.\n\n After you spot one, confirm it by finding check words that ask for the total.",
        each: "Each",
        every: "Every",
        per: "Per",
        groupsOf: "Groups of",
        setsOf: "Sets of",
        exampleStory:
          "A shopkeeper sells erasers in sets of 5. He sells 27 sets.",
        groupsItems: "Groups = eraser pack\nItems = individual erasers",
        alternateWay: "Alternate way of reading",
        alternateExplanation: "27 groups, each group has 5 items.",
        animaTree: "Amina has 15 mango trees. Each tree produces 20 mangoes.",
        treeGroup: "Groups = trees\nItems = mangoes",
        treeAlternate: "15 groups, each group has 20 items.",
        pencil: "Every box contains 24 pencils. A school buys 10 boxes.",
        pencilGroup: "Groups = pencil box\nItems = pencils",
        pencilAlternate: "10 groups, each group has 24 items.",
        trainStory:
          "A train carries 120 passengers per trip. It makes 6 trips in a day.",
        trainGroup: "Groups = trips\nItems = passengers",
        trainAlternate: "6 groups, each group has 120 items.",
        studentStory:
          "Students are standing in groups of 8 for a parade. There are 14 groups.",
        studentGroup: "Groups = parade groups\nItems = students",
        studentAlternate: "14 groups, each group has 8 items.",
      },
      sceneFifteen: {
        checkWords: "Check words",
        commonKeywords: "Common keywords that describe total items being asked",
        checkWordsLine1: "are signals that the story is asking for the",
        total: "total",
        checkWordsLine2:
          "When a check word shows up with a clue word (items in a group), that confirms it’s a multiplication problem.",
        inAll: "In all",
        howMany: "How many",
        totalNumber: "Total number",
        findTotal: "Find the total",
        checkWordsTitle: "CHECK WORDS",
      },
      sceneSixteen: {
        letSeeSome:
          "Let’s see some story questions and identify whether it is a multiplication problem or not.\n\nPress the button below if you want to do this lesson again.",
      },
    },
  },
  id: {
    translation: {
      buttons: {
        previous: "«",
        next: "»",
        show: "Tampilkan",
        check: "Periksa",
        hide: "Sembunyikan",
        startOver: "MULAI ULANG",
        start: "MULAI",
        close: "Tutup",
        cannotDivide: "Tidak dapat dibagi lagi",
        yes: "Ya",
        no: "Tidak",
      },
      navigation: {
        tapNext: "Ketuk Berikutnya setelah membaca",
        tapEachWord:
          "Ketuk setiap kata untuk melihat bagaimana kata itu digunakan. Ketuk » setelah membaca",
        tapAndDrag: "Ketuk dan seret frasa ke area kategori yang tepat",
      },
      sceneOne: {
        whatIsStory: "Apa itu pertanyaan cerita?",
        aStoryQuestion:
          "Pertanyaan cerita adalah cerita mini kehidupan nyata singkat \n\nyang meminta Anda untuk",
        calculateNumbers: "menghitung angka",
      },
      sceneTwo: {
        typeOfStory: "Jenis pertanyaan cerita:",
        additionStory:
          "1. Pertanyaan cerita penjumlahan: Memberikan dua atau lebih angka \nyang harus Anda jumlahkan untuk mendapatkan jawabannya.",
        subtraction: "2. Pengurangan",
        confirmationKeyword:
          "Selanjutnya kita akan belajar kata kunci konfirmasi!",
      },
      sceneThree: {
        typesOfQuestion: "Jenis Pertanyaan Cerita",
        additionStoryQuestion: "Pertanyaan Cerita Penjumlahan",
        subtractionStoryQuestion: "Pertanyaan Cerita Pengurangan",
        multiplicationStoryQuestion: "Pertanyaan Cerita Perkalian",
        storyQuestionDescription:
          "Memberikan dua atau lebih angka yang harus dijumlahkan untuk mendapatkan jawabannya.",
        example: "Contoh",
        exampleText:
          "Pak Rahmad memiliki 110 apel dan 105 pisang. Berapa banyak buah yang dimilikinya secara total?",
        answerLabel: "Jawaban",
        exampleAnswer: "110 + 105",
        subtractionGivesYou:
          "Memberikan dua angka. Anda harus mengurangkan satu angka dari angka lainnya.",
        mrRehmadSubtractionText:
          "Pak Rahmad memiliki 110 apel dan menjual 50 apel di pasar. Berapa banyak apel yang tersisa?",
        subtractAnswer: "110 - 50",
        multiplicationGivesYOu:
          "Memberikan jumlah kelompok dan jumlah item di setiap kelompok. Anda perlu mengalikannya.",
        weWillLearn:
          "Kita akan mempelajarinya hari ini. Ketuk\n » untuk melanjutkan.",
      },
      sceneFour: {
        whatMultiplicationGivesYou:
          "Apa yang diberikan oleh pertanyaan cerita perkalian",
        aMultiplicationStoryAlways:
          "Pertanyaan cerita perkalian selalu memberikan:",
        numberOne: "1. Jumlah kelompok",
        numberTwo: "2. Jumlah item di setiap kelompok",
        weUseAbove: "Kita menggunakan dua hal di atas untuk menemukan:",
        totalNumber: "Jumlah total item",
      },
      sceneFive: {
        howWeCalculate: "Bagaimana kita menghitung jawabannya",
        noOfGroups: "Jumlah kelompok",
        items: "Item di setiap kelompok",
        totalItems: "Total item",
      },
      sceneSix: {
        whatToLook: "Apa yang harus dicari dalam pertanyaan cerita perkalian",
        wordOfPharasGive: "1. Kata atau frasa yang memberi tahu Anda: ",
        numberOfGroups: "jumlah kelompok",
        wordOfPharasTells: "2. Kata atau frasa yang memberi tahu Anda: ",
        items: "item di setiap kelompok",
        letUse:
          "Mari gunakan pengetahuan kita pada beberapa contoh pertanyaan cerita.",
      },
      sceneSeven: {
        identifyPharase:
          "Identifikasi frasa yang menggambarkan 'jumlah kelompok' dan 'item di setiap kelompok'",
        jakaBought: "Asep membeli",
        threeBasketOfApple: "5 kotak mainan",
        if: "Jika",
        eachBasket: "setiap kotak berisi 7 mainan,",
        howManyApples: "berapa banyak mainan",
        didHeBuy: "yang dia beli?",
        noOfGroups: "Jumlah kelompok",
        itemInEachGroup: "Item di setiap kelompok",
        goodJob: "Kerja bagus! Perhatikan pola di bawah ini",
        totalItems: "Total item",
        letsTry: "Mari coba satu pertanyaan cerita lagi",
        onceAgain: "Sekali lagi, mari identifikasi frasa yang menggambarkan:",
      },
      sceneTen: {
        janaWant: "Jana ingin memberi hadiah",
        twoCupCake: "3 kue mangkuk masing-masing",
        toHerBestFriend: "kepada 3 sahabatnya. Jika dia memiliki",
        threeBest: "3 sahabat,",
        howManyCupCakes: "berapa banyak kue mangkuk",
        sheMustBuy: "yang harus dia beli?",
      },
      sceneTwelve: {
        howTobeSure:
          "Bagaimana memastikan bahwa pertanyaan cerita adalah pertanyaan perkalian",
        nextWillLearn:
          "Selanjutnya kita akan belajar mengenali dua jenis kata kunci:",
        clueWords: "Kata Petunjuk",
        checkWords: "Kata Pemeriksa",
        eachEvery: "setiap,\nmasing-masing,\nper,\nkelompok dari,\nset dari",
        inAllHow:
          "Secara keseluruhan,\nberapa banyak,\njumlah total,\ncari total",
        whenBoth:
          "Ketika keduanya muncul bersama dalam sebuah cerita, kemungkinan itu adalah pertanyaan perkalian.",
      },
      sceneThirteen: {
        clueWordsTitle: "Kata Petunjuk",
        clueWordsDescription:
          "Kata petunjuk memberi sinyal bahwa sebuah cerita mungkin merupakan soal perkalian. Mereka selalu menunjukkan jumlah item dalam satu kelompok.\n\n Setelah Anda menemukannya, konfirmasikan dengan mencari kata pemeriksa yang menanyakan totalnya.",
        each: "Setiap",
        every: "Masing-masing",
        per: "Per",
        groupsOf: "Kelompok dari",
        setsOf: "Set dari",
        exampleStory:
          "Seorang penjaga toko menjual penghapus dalam set berisi 5. Ia menjual 27 set.",
        groupsItems: "Kelompok = bungkus penghapus\nItem = penghapus individu",
        alternateWay: "Cara membaca lain",
        alternateExplanation: "27 kelompok, setiap kelompok memiliki 5 item.",
        animaTree:
          "Amina memiliki 15 pohon mangga. Setiap pohon menghasilkan 20 mangga.",
        treeGroup: "Kelompok = pohon\nItem = mangga",
        treeAlternate: "15 kelompok, setiap kelompok memiliki 20 item.",
        pencil:
          "Setiap kotak berisi 24 pensil. Sebuah sekolah membeli 10 kotak.",
        pencilGroup: "Kelompok = kotak pensil\nItem = pensil",
        pencilAlternate: "10 kelompok, setiap kelompok memiliki 24 item.",
        trainStory:
          "Sebuah kereta membawa 120 penumpang per perjalanan. Ia melakukan 6 perjalanan dalam sehari.",
        trainGroup: "Kelompok = perjalanan\nItem = penumpang",
        trainAlternate: "6 kelompok, setiap kelompok memiliki 120 item.",
        studentStory:
          "Siswa berdiri dalam kelompok berisi 8 orang untuk parade. Ada 14 kelompok.",
        studentGroup: "Kelompok = kelompok parade\nItem = siswa",
        studentAlternate: "14 kelompok, setiap kelompok memiliki 8 item.",
      },
      sceneFifteen: {
        checkWords: "Kata Pemeriksa",
        commonKeywords:
          "Kata umum yang menggambarkan total item yang ditanyakan",
        checkWordsLine1: "adalah sinyal bahwa cerita sedang menanyakan",
        total: "total",
        checkWordsLine2:
          "Ketika kata pemeriksa muncul bersama dengan kata petunjuk (item dalam kelompok), itu menegaskan bahwa ini adalah soal perkalian.",
        inAll: "Secara keseluruhan",
        howMany: "Berapa banyak",
        totalNumber: "Jumlah total",
        findTotal: "Cari total",
        checkWordsTitle: "KATA PEMERIKSA",
      },
      sceneSixteen: {
        letSeeSome:
          "Mari lihat beberapa pertanyaan cerita dan identifikasi apakah itu soal perkalian atau bukan.\n\nTekan tombol di bawah jika Anda ingin mengulangi pelajaran ini lagi.",
      },
    },
  },
};

// Current language comes from global APP_LANGUAGE set in index.html
const currentLang = window.APP_LANGUAGE || "en";

// Helper: resolve nested keys like "storyOne.optionOne"
function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : null;
  }, obj);
}

// Translator function
function t(key, params = {}) {
  let text = getNested(appData[currentLang].translation, key) || key;

  // Replace variables if any (like {{count}})
  Object.keys(params).forEach((p) => {
    text = text.replace(`{{${p}}}`, params[p]);
  });

  return text;
}

// Expose globally so all components can use it
window.t = t;
