// content in english
const appData = {
  en: {
    translation: {
      buttons: {
        previous: "«",
        next: "»",
        show: "Show",
        check: "CHECK",
        hide: "Hide",
        hint: "Show",
        startOver: "START OVER",
        start: "START",
      },
      sideHeading: {
        thereAre: "There are mainly 3 cases of subtraction ",
      },
      wordProblems: {
        one: "1.Take away (removing part from total)",
        two: "2.Comparison\n(Finding difference)",
        three: "3.Part-total (Finding missing part)",
      },
      questionHading: {
        solveSubtraction: "Solve subtraction word problems.",
      },
      navigation: {
        tapStart: "Tap START",
        tapNumber: "Tap the number and then tap check.",
        tapContinue: "Tap » to continue.",
      },
      typeOne: {
        typeOneText:
          "Type 1: TAKE AWAY.Read the question. Subtract what is taken away from the total to find the difference.",
        subtractFrom:
          "Subtract 4 from 7.\nTap and fill the difference using numpad and check.",
        enterNumbers: "Enter the numbers using the numpad and Check",
        total: "Total",
        taken: "Taken away:",
        typeTwoText:
          "Type 2: COMPARISON Read the question. Subtract the smaller number from the larger number.",
        typeThreeText:
          "Type 3: PART-TOTAL Read the question. Subtract the known part from the total to find the missing part.",
      },
      questionOne: {
        question:
          "There were 7 pencils. 4 were used. How many pencils are left?",
      },
      questionTwo: {
        question:
          "Malik has 9 marbles and Andi has 7 marbles. How many more marbles does Malik have than Andi?",
        malik: "Malik",
        andi: "Andi",
        larger: "Larger Number",
        smaller: "Smaller Number",
      },
      questionThree: {
        question:
          "There are 6 mangoes in a basket. 2 are ripe, and the rest are unripe. How many unripe mangoes are there?",
        partA: "Part A (ripe):",
        mangoes: "Mangoes",
        ripe: "ripe",
        unripe: "unripe",
      },
      total: "Total :",
      takenAway: "Taken away :",
      hintMessages: {
        hintOne: "Tap to fill the total number of objects in the question.",
        hintTwo:
          "Tap to fill the number of objects taken away in the question.",
        hintThree: "Subtract 4 from 7. Tap and fill the difference and check.",
      },
      PencilErrors: {
        smallerNumber:
          "Oops! Smaller number. Tap to fill the total number of objects. Try again…",
        largeNumber:
          "Oops! Larger number. Tap to fill the total number of objects. Try again…",
        totalSuccess: "Good work!\nThere are 7 pencils in total.",
        emptyError:
          "Oops! That shows what’s taken away. Tap to fill the total number of objects. Try again…",
      },
      pencilTakenAwayError: {
        emptyError:
          "Oops! That shows total objects. Tap to fill the number of objects taken away.Try again…",
        smallerError:
          "Oops! Smaller number. Tap to fill the number of objects taken away.Try again…",
        largerError:
          "Oops! Larger number. Tap to fill the number of objects taken away.Try again…",
        success: "Good work!Out of 7 pencils, 4 were used or taken away. ",
      },
      pencilSentanceError: {
        smallerError:
          "Oops! Smaller Number.Tap the difference between 7 and 4.Try again…",
        largerError:
          "Oops! Larger Number.Tap the difference between 7 and 4.Try again…",
        success:
          "Well Done!Out of 7 pencils, 4 were used or taken away, then 3 pencils remain",
        emptyError:
          "Oops! that shows  Out of 7 pencils, 4 were used or taken away,then pencils remain?",
      },
      numberOfPencil: "Number of Pencils left :",

      marbleHint: {
        hintOne:
          "Need to compare!Tap to fill the larger number in the question.",
        hintTwo:
          "Need to compare!Tap to fill the smaller number in the question.",
        hintThree: "Subtract 7 from 9. Tap and fill the difference and check.",
      },
      marbleLargerError: {
        largerError:
          "Oops! Wrong number.Tap to fill the larger number and check. Try again…",
        smallerError:
          "Oops! That shows smaller number. Tap to fill the larger number and check. Try again…",
        success: "Good work!Malik has more marbles. Malik has 9 marbles.",
      },
      marbleSmallerError: {
        largerError:
          "Oops! That shows larger number. Tap to fill the smaller number and check. Try again…",
        smallerError:
          "Oops! Wrong number.Tap to fill the smaller number and check. Try again…",
        success: "Good work!Andi has more marbles. Andi has 7 marbles.",
      },
      marbleSenetanceError: {
        smallerError:
          "Oops! Smaller Number.Tap the difference between 9 and 7.Try again…",
        largerNumber:
          "Oops! Larger Number.Tap the difference between 9 and 7.Try again…",
        success:
          "Well Done!Malik has 9 and Andi has 7 marbles. Malik has 2 more marbles than Andi.",
      },
      malikHas: "Malik has ",
      hasTwo: " more marbles than Andi.",
      magoesHint: {
        hintOne:
          "Need to find missing part!Tap to fill Total number of objects in the question.",
        hintTwo:
          "Need to find missing part!Tap to fill number of objects Part A",
        hintThree:
          "Subtract 2 from 6. Tap and fill the remaining part B and check.",
      },
      mangoeTotal: {
        partError:
          "Oops! That shows part. Tap to fill the total number and check. Try again…",
        smallerError:
          "Oops! Smaller number. Tap to fill the total number and check. Try again…",
        largerError:
          "Oops! Larger number. Tap to fill the total number and check. Try again…",
        success: "Good work!There are total 6 mangoes",
      },
      mangoesRipe: {
        partError:
          "Oops! That shows total. Tap to fill the number of objects in part A and check. Try again…",
        smallerError:
          "Oops! Smaller number. Tap to fill the number of objects in part A and check. Try again…",
        largerError:
          "Oops! Larger number. Tap to fill the number of objects in part A and check. Try again…",
        success: "Good work!Total 6 mangoes and 2 of them are ripe.",
      },
      mangoSentanceError: {
        smallerError:
          "Oops! Smaller Number.Tap the difference between 6 and 2.Try again.",
        largerError:
          "Oops! Larger Number.Tap the difference between 6 and 2.Try again…",
        success:
          "Good work! Total 6 mangoes and 2 of them are ripe. Remaining 4 mangoes are unripe.",
      },
      remaining: "Remaining",
      mangoesUnripe: "mangoes are unripe.",
    },
  },
  id: {
    translation: {
      buttons: {
        previous: "«",
        next: "»",
        show: "Tampilkan",
        check: "PERIKSA",
        hide: "Sembunyikan",
        hint: "Tampilkan",
        startOver: "MULAI ULANG",
        start: "MULAI",
      },
      sideHeading: {
        thereAre: "Ada 3 kasus utama dari pengurangan",
      },
      wordProblems: {
        one: "1. Mengambil (menghapus sebagian dari total)",
        two: "2. Perbandingan\n(Mencari selisih)",
        three: "3. Bagian-total (Mencari bagian yang hilang)",
      },
      questionHading: {
        solveSubtraction: "Selesaikan soal cerita pengurangan.",
      },
      navigation: {
        tapStart: "Ketuk MULAI",
        tapNumber: "Ketuk angkanya lalu ketuk PERIKSA.",
        tapContinue: "Ketuk » untuk melanjutkan.",
      },
      typeOne: {
        typeOneText:
          "Tipe 1: MENGAMBIL. Baca soalnya. Kurangi apa yang diambil dari total untuk menemukan selisih.",
        subtractFrom:
          "Kurangi 4 dari 7.\nKetuk dan isi selisih menggunakan papan angka lalu periksa.",
        enterNumbers: "Masukkan angka menggunakan papan angka lalu periksa",
        total: "Total",
        taken: "Diambil:",
        typeTwoText:
          "Tipe 2: PERBANDINGAN. Baca soalnya. Kurangi angka yang lebih kecil dari angka yang lebih besar.",
        typeThreeText:
          "Tipe 3: BAGIAN-TOTAL. Baca soalnya. Kurangi bagian yang diketahui dari total untuk menemukan bagian yang hilang.",
      },
      questionOne: {
        question: "Ada 7 pensil. 4 digunakan. Berapa pensil yang tersisa?",
      },
      questionTwo: {
        question:
          "Malik punya 9 kelereng dan Andi punya 7 kelereng. Berapa lebih banyak kelereng Malik dibanding Andi?",
        malik: "Malik",
        andi: "Andi",
        larger: "Angka Lebih Besar",
        smaller: "Angka Lebih Kecil",
      },
      questionThree: {
        question:
          "Ada 6 mangga dalam keranjang. 2 matang, sisanya mentah. Berapa banyak mangga mentah?",
        partA: "Bagian A (matang):",
        mangoes: "Mangga",
        ripe: "matang",
        unripe: "mentah",
      },
      total: "Total :",
      takenAway: "Diambil :",
      hintMessages: {
        hintOne: "Ketuk untuk mengisi jumlah total objek dalam soal.",
        hintTwo: "Ketuk untuk mengisi jumlah objek yang diambil dalam soal.",
        hintThree: "Kurangi 4 dari 7. Ketuk dan isi selisih lalu periksa.",
      },
      PencilErrors: {
        smallerNumber:
          "Ups! Angka lebih kecil. Ketuk untuk mengisi jumlah total objek. Coba lagi…",
        largeNumber:
          "Ups! Angka lebih besar. Ketuk untuk mengisi jumlah total objek. Coba lagi…",
        totalSuccess: "Kerja bagus!\nAda 7 pensil total.",
        emptyError:
          "Ups! Itu menunjukkan yang diambil. Ketuk untuk mengisi jumlah total objek. Coba lagi…",
      },
      pencilTakenAwayError: {
        emptyError:
          "Ups! Itu menunjukkan total objek. Ketuk untuk mengisi jumlah objek yang diambil. Coba lagi…",
        smallerError:
          "Ups! Angka lebih kecil. Ketuk untuk mengisi jumlah objek yang diambil. Coba lagi…",
        largerError:
          "Ups! Angka lebih besar. Ketuk untuk mengisi jumlah objek yang diambil. Coba lagi…",
        success: "Kerja bagus! Dari 7 pensil, 4 digunakan atau diambil.",
      },
      pencilSentanceError: {
        smallerError:
          "Ups! Angka lebih kecil. Ketuk selisih antara 7 dan 4. Coba lagi…",
        largerError:
          "Ups! Angka lebih besar. Ketuk selisih antara 7 dan 4. Coba lagi…",
        success:
          "Bagus sekali! Dari 7 pensil, 4 digunakan atau diambil, maka tersisa 3 pensil",
        emptyError:
          "Ups! itu menunjukkan  Dari 7 pensil, 4 digunakan atau diambil, lalu berapa pensil yang tersisa?",
      },
      numberOfPencil: "Jumlah pensil yang tersisa :",

      marbleHint: {
        hintOne:
          "Perlu membandingkan! Ketuk untuk mengisi angka yang lebih besar dalam soal.",
        hintTwo:
          "Perlu membandingkan! Ketuk untuk mengisi angka yang lebih kecil dalam soal.",
        hintThree: "Kurangi 7 dari 9. Ketuk dan isi selisih lalu periksa.",
      },
      marbleLargerError: {
        largerError:
          "Ups! Angka salah. Ketuk untuk mengisi angka lebih besar lalu periksa. Coba lagi…",
        smallerError:
          "Ups! Itu menunjukkan angka lebih kecil. Ketuk untuk mengisi angka lebih besar lalu periksa. Coba lagi…",
        success:
          "Kerja bagus! Malik punya lebih banyak kelereng. Malik punya 9 kelereng.",
      },
      marbleSmallerError: {
        largerError:
          "Ups! Itu menunjukkan angka lebih besar. Ketuk untuk mengisi angka lebih kecil lalu periksa. Coba lagi…",
        smallerError:
          "Ups! Angka salah. Ketuk untuk mengisi angka lebih kecil lalu periksa. Coba lagi…",
        success:
          "Kerja bagus! Andi punya lebih banyak kelereng. Andi punya 7 kelereng.",
      },
      marbleSenetanceError: {
        smallerError:
          "Ups! Angka lebih kecil. Ketuk selisih antara 9 dan 7. Coba lagi…",
        largerNumber:
          "Ups! Angka lebih besar. Ketuk selisih antara 9 dan 7. Coba lagi…",
        success:
          "Bagus sekali! Malik punya 9 dan Andi punya 7 kelereng. Malik punya 2 kelereng lebih banyak daripada Andi.",
      },
      malikHas: "Malik punya ",
      hasTwo: " kelereng lebih banyak daripada Andi.",
      magoesHint: {
        hintOne:
          "Perlu mencari bagian yang hilang! Ketuk untuk mengisi jumlah total objek dalam soal.",
        hintTwo:
          "Perlu mencari bagian yang hilang! Ketuk untuk mengisi jumlah objek Bagian A",
        hintThree:
          "Kurangi 2 dari 6. Ketuk dan isi bagian B yang tersisa lalu periksa.",
      },
      mangoeTotal: {
        partError:
          "Ups! Itu menunjukkan bagian. Ketuk untuk mengisi total lalu periksa. Coba lagi…",
        smallerError:
          "Ups! Angka lebih kecil. Ketuk untuk mengisi total lalu periksa. Coba lagi…",
        largerError:
          "Ups! Angka lebih besar. Ketuk untuk mengisi total lalu periksa. Coba lagi…",
        success: "Kerja bagus! Ada total 6 mangga",
      },
      mangoesRipe: {
        partError:
          "Ups! Itu menunjukkan total. Ketuk untuk mengisi jumlah objek di Bagian A lalu periksa. Coba lagi…",
        smallerError:
          "Ups! Angka lebih kecil. Ketuk untuk mengisi jumlah objek di Bagian A lalu periksa. Coba lagi…",
        largerError:
          "Ups! Angka lebih besar. Ketuk untuk mengisi jumlah objek di Bagian A lalu periksa. Coba lagi…",
        success: "Kerja bagus! Total 6 mangga dan 2 di antaranya matang.",
      },
      mangoSentanceError: {
        smallerError:
          "Ups! Angka lebih kecil. Ketuk selisih antara 6 dan 2. Coba lagi.",
        largerError:
          "Ups! Angka lebih besar. Ketuk selisih antara 6 dan 2. Coba lagi…",
        success:
          "Kerja bagus! Total 6 mangga dan 2 di antaranya matang. Sisa 4 mangga mentah.",
      },
      remaining: "Sisa",
      mangoesUnripe: "mangga yang mentah.",
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
