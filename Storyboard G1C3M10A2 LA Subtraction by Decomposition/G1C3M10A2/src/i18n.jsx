import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        buttons: {
          previous: "«",
          next: "»",
          show: "Show",
          check: "Check",
          hide: "Hide",
          startOver:"START OVER"
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
          someBalloonRedAndYellow:
            "Some balloons are red and\n some are yellow.",
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
  },
});

export default i18n;
