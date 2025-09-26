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
      },
      sideHeading: {
        represent: "Represent this pictures\n as a number pair.",
        tapCorrect:
          "Tap the correct option that tells the point of difference between the \nobjects.",
        countRedandBlue:
          "Count the total number of balloons (Red and Blue) and fill the number using numpad and \ncheck.",
        numberPair: "Choose the correct number pair for the given picture.",
        completeFirst:
          "Complete the first subtraction sentence that represents number \npair.",
      },
      steps: {
        stepOne: "Step 1: Find the point of difference between \nobjects.",
        stepTwo: "Step 2: Fill the total number of objects.",
        stepThree: "Step 3: Write as number pair.",
      },
      figureName: {
        part: "Part",
        total: "Total",
      },
      optionsSceneOne: {
        someBalloonRedAndYellow: "Some balloons are red and\n some are yellow.",
        someBalloonRebAndBlue: "Some balloons are red and\n some are blue.",
      },
      sceneTwo: {
        hintMessage: "Count and enter the total objects using the numpad.",
        FourRedError:
          "Oops! This is the total number of red objects. Count and enter the total objects",
        ThreeBlueError:
          "Oops! This is the total number of Blue objects. Count and enter the total objects",
        largeNumberError:
          "Oops! Larger number! Count again and enter the total objects.",
        smallerNumberError:
          "Oops! Smaller number! Count again and enter the total objects.",
        success: "Good Work! There are 7 objects in total. ",
      },
      navigation: {
        tapCorrectOption: "Tap the correct option.",
        tapToContinue: "Tap » to continue.",
        tapNumber: "Tap the correct number and then tap check.",
        starAgain: "Tap START OVER to start this activity again.",
      },
      sentanceOneError: {
        partBError:
          "Oops! You have entered number of part A, Tap the number in part B and Tap CHECK. ",
        smallNumberError:
          "Oops! Smaller number. Read and Tap the number in part B and Tap CHECK",
        largerNUmberError:
          "Oops! Larger number. Read and Tap the number in part B and Tap CHECK",
        success:
          "Well Done! You have correctly completed the subtraction sentence for the picture.",
      },
      sentanceTwoError: {
        partAError:
          "Oops! You have entered number of part A, Tap the number in part B and Tap CHECK. ",
        smallNumberError:
          "Oops! Smaller number. Read and Tap the number in part B and Tap CHECK",
        largeNumberError:
          "Oops! Larger number. Read and Tap the number in part B and Tap CHECK",
        success:
          "Well Done! You have correctly completed the subtraction sentence for the picture.",
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
        startOver:"Mulai Lagi"
      },
      sideHeading: {
        represent: "Representasikan gambar ini\nsebagai pasangan angka.",
        tapCorrect:
          "Ketuk opsi yang benar yang menunjukkan perbedaan antara \nobjek.",
        countRedandBlue:
          "Hitung jumlah total balon (Merah dan Biru) lalu isi angka menggunakan papan angka dan \nperiksa.",
        numberPair:
          "Pilih pasangan angka yang benar untuk gambar yang diberikan.",
        completeFirst:
          "Lengkapi kalimat pengurangan pertama yang merepresentasikan pasangan angka.",
      },
      steps: {
        stepOne: "Langkah 1: Temukan perbedaan antara \nobjek.",
        stepTwo: "Langkah 2: Isi jumlah total objek.",
        stepThree: "Langkah 3: Tulis sebagai pasangan angka.",
      },
      figureName: {
        part: "Bagian",
        total: "Total",
      },
      optionsSceneOne: {
        someBalloonRedAndYellow:
          "Beberapa balon berwarna merah dan\nbeberapa berwarna kuning.",
        someBalloonRebAndBlue:
          "Beberapa balon berwarna merah dan\nbeberapa berwarna biru.",
      },
      sceneTwo: {
        hintMessage: "Hitung dan masukkan total objek menggunakan papan angka.",
        FourRedError:
          "Ups! Ini adalah jumlah total objek merah. Hitung dan masukkan jumlah total objek.",
        ThreeBlueError:
          "Ups! Ini adalah jumlah total objek biru. Hitung dan masukkan jumlah total objek.",
        largeNumberError:
          "Ups! Angka terlalu besar! Hitung lagi dan masukkan jumlah total objek.",
        smallerNumberError:
          "Ups! Angka terlalu kecil! Hitung lagi dan masukkan jumlah total objek.",
        success: "Kerja bagus! Ada 7 objek secara total.",
      },
      navigation: {
        tapCorrectOption: "Ketuk opsi yang benar.",
        tapToContinue: "Ketuk » untuk melanjutkan.",
        tapNumber: "Ketuk angka yang benar lalu ketuk periksa.",
      },
      sentanceOneError: {
        partBError:
          "Ups! Kamu memasukkan angka dari bagian A, ketuk angka di bagian B lalu ketuk PERIKSA.",
        smallNumberError:
          "Ups! Angka terlalu kecil. Baca dan ketuk angka di bagian B lalu ketuk PERIKSA.",
        largerNUmberError:
          "Ups! Angka terlalu besar. Baca dan ketuk angka di bagian B lalu ketuk PERIKSA.",
        success:
          "Bagus sekali! Kamu telah berhasil menyelesaikan kalimat pengurangan untuk gambar ini.",
      },
      sentanceTwoError: {
        partAError:
          "Ups! Kamu memasukkan angka dari bagian A, ketuk angka di bagian B lalu ketuk PERIKSA.",
        smallNumberError:
          "Ups! Angka terlalu kecil. Baca dan ketuk angka di bagian B lalu ketuk PERIKSA.",
        largeNumberError:
          "Ups! Angka terlalu besar. Baca dan ketuk angka di bagian B lalu ketuk PERIKSA.",
        success:
          "Bagus sekali! Kamu telah berhasil menyelesaikan kalimat pengurangan untuk gambar ini.",
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
