// content in english
const appData = {
  en: {
    translation: {
      title: "Identify Ratios and Fractions",
      startPage: {
        ratiosAndFraction: "Ratios and fractions are different.",
        fromTheIdentify:
          "From the various phrases, \nidentify they represent a ratio or a fraction.",
        tip: "Tip: Look for the correct key-words. \nE.g. “for every” means ratios, “out-of” means fractions.",
      },
      buttons: {
        previous: "«",
        next: "»",
        show: "Show",
        check: "Check",
        hide: "Hide",
        startOver: "START OVER",
        start: "START",
        ratio: "Ratio",
        fraction: "Fraction",
      },
      appleAndQuestion: {
        oneThirdApple: "Ratio or Fraction?\nOne-third of the apples are green.",
        onThirdAppleGreen: "One-third of the apples\n are green.",
        forEvery: "For every 3 red marbles, there are 4 blue marbles.",
        threeRedMArble:
          "Ratio or Fraction?\nFor every 3 red marbles, there are 4 blue marbles.",
      },
      navigation: {
        tapFraction: "This represents a fraction. Tap on ‘Fraction’ button.",
        tapNext: "Tap » for next question.",
        tapRatio: "This represents a ratio. Tap on ‘Ratio’ button.",
        correctRepresentation: "Click on the correct representation.",
        tapContinue: "Tap » for continue",
      },
      questions: {
        questionStudent:
          "Ratio or Fraction?\nThe number of boys to girls in the class is 4 to 3.",
        questionTeacher:
          "Ratio or Fraction?\nFor each  teacher, there are 10 students.",
        questionPizza:
          "Ratio or Fraction?\nOut of 8 slices of pizza, 5 are eaten.",
        questionComic:
          "Ratio or Fraction?\nCounted out of 10 books, 6 are comics.",
        questionApple:
          "Ratio or Fraction?\n Compared to 5 apples, there are 3 oranges.",
        questionSleep:
          "Ratio or Fraction?\n Out of the whole 24 hours, 8 are for sleeping.",
      },
      pictureHeading: {
        student: "The number of boys to girls \nin the class is 4 to 3.",
        teacher: "For each teacher, there are \n10 students.",
        pizza: "Out of 8 slices of pizza, \n5 are eaten.",
        comic: "Counted out of 10 books,\n6 are comics.",
        apple: "Compared to 5 apples, there \nare 3 oranges.",
        sleep: "Out of the whole 24 hours, \n8 are for sleeping.",
      },
      activityComplete: "Activity Complete",
      ratioDifferent: "Ratios and fractions are different.",
      startOver: "To repeat the activity, click on “Start Over”.",
    },
  },
  id: {
    translation: {
      title: "Identifikasi Rasio dan Pecahan",
      startPage: {
        ratiosAndFraction: "Rasio dan pecahan itu berbeda.",
        fromTheIdentify:
          "Dari berbagai frasa, \nidentifikasi apakah mereka mewakili rasio atau pecahan.",
        tip: "Tip: Cari kata kunci yang benar. \nMisalnya: “untuk setiap” berarti rasio, “dari” berarti pecahan.",
      },
      buttons: {
        previous: "«",
        next: "»",
        show: "Tampilkan",
        check: "Periksa",
        hide: "Sembunyikan",
        startOver: "MULAI ULANG",
        start: "MULAI",
        ratio: "Rasio",
        fraction: "Pecahan",
      },
      appleAndQuestion: {
        oneThirdApple:
          "Rasio atau Pecahan?\nSepertiga dari apel berwarna hijau.",
        onThirdAppleGreen: "Sepertiga dari apel\nberwarna hijau.",
        forEvery: "Untuk setiap 3 kelereng merah, ada 4 kelereng biru.",
        threeRedMArble:
          "Rasio atau Pecahan?\nUntuk setiap 3 kelereng merah, ada 4 kelereng biru.",
      },
      navigation: {
        tapFraction: "Ini mewakili pecahan. Ketuk tombol ‘Pecahan’.",
        tapNext: "Ketuk » untuk soal berikutnya.",
        tapRatio: "Ini mewakili rasio. Ketuk tombol ‘Rasio’.",
        correctRepresentation: "Klik pada representasi yang benar.",
        tapContinue: "Ketuk » untuk melanjutkan",
      },
      questions: {
        questionStudent:
          "Rasio atau Pecahan?\nJumlah anak laki-laki dan perempuan di kelas adalah 4 banding 3.",
        questionTeacher:
          "Rasio atau Pecahan?\nUntuk setiap guru, ada 10 murid.",
        questionPizza:
          "Rasio atau Pecahan?\nDari 8 potong pizza, 5 sudah dimakan.",
        questionComic:
          "Rasio atau Pecahan?\nDihitung dari 10 buku, 6 adalah komik.",
        questionApple:
          "Rasio atau Pecahan?\nDibandingkan dengan 5 apel, ada 3 jeruk.",
        questionSleep:
          "Rasio atau Pecahan?\nDari total 24 jam, 8 digunakan untuk tidur.",
      },
      pictureHeading: {
        student:
          "Jumlah anak laki-laki dan perempuan \ndi kelas adalah 4 banding 3.",
        teacher: "Untuk setiap guru, ada \n10 murid.",
        pizza: "Dari 8 potong pizza, \n5 sudah dimakan.",
        comic: "Dihitung dari 10 buku,\n6 adalah komik.",
        apple: "Dibandingkan dengan 5 apel, ada \n3 jeruk.",
        sleep: "Dari total 24 jam, \n8 digunakan untuk tidur.",
      },
      activityComplete: "Aktivitas Selesai",
      ratioDifferent: "Rasio dan pecahan itu berbeda.",
      startOver: "Untuk mengulang aktivitas, klik “Mulai Ulang”.",
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
