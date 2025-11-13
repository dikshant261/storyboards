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
          startOver: "START OVER",
          start: "START",
          close: "Close",
          check: "Check",
          tryAgain: "Try Again",
          yes: "Yes",
          no: "No",
        },
        length: "Length",
        width: "Width",
        ml: "ml",
        l: "L",
        paintA: "Paint A",
        paintB: "Paint B",
        red: "red",
        blue: "blue",
        crossProduct: "Cross Product ",
        startPage: {
          letWrite: "Let’s write the ratio in simplest form",
          aFrame:
            "A frame measures 120 cm × 80 cm.\nWhat is the ratio of the length and width of the frame?",
        },

        navigation: {
          tapContinue: "Tap » to continue.",
          tapProceed: "Tap » to Proceed.",
          tapCorrectOption: "Tap the correct option.",
          slideToMove: "Move the slider to enlarge the small frame.",
          tapContinue: "Tap » to continue.",
        },
        sceneTwo: {
          aFrameMeasure: "A frame measures",
          measurement: "120 cm × 80 cm.\n",
          whatIs: "What is the ratio of the length and width of the frame?",
          showsTheMeasurement:
            "120 cm  ×  80 cm shows the\n measurements of the frame.\n\nLet’s take the larger measurement as\n the length and the smaller\n measurement as the width.",
        },
        sceneThree: {
          given: "Given:",
          lengthOfFrame: "Length of the frame",
          widthOfFrame: "Width of the frame",
          whatIsLength: "What is the length of the\n frame?",
          error:
            "Not quite. The larger measurement is the length of the frame.",
          success: "Yes! The length is 120 cm. ",
        },
        sceneFour: {
          whatIsWidth: "What is the width of the\n frame?",
          error:
            "Not quite. The smaller measurement is the width of the frame.",
          success: "That’s right! The width is 80 cm.",
        },
        sceneFive: {
          ratioOfLengthWidth: "Ratio of length to\n width",
          whatIsWidth: "What the ratio of length to \nwidth?",
          letsFind:
            "Let’s find the ratio of the frame’s length to its width using the given measurements.",
          error:
            "Oops! Remember, the first part of the ratio is for the length.",
          success:
            "Good job! The ratio is 120 : 80 which can also be written as ",
        },
        sceneSix: {
          ratioOfLengthWidth: "Ratio of length to width",
          whatIsWidth: "Represent 120 as a multiple \nof 10.",
          letsFind:
            "Let’s simplify the ratio by expressing each number as a multiple of 10.",
          error: "Not quite! Try again.",
          success: "Correct! \n\n120 can be written as 12 × 10.",
        },
        sceneSeven: {
          whatIsWidth: "Represent 80 as a multiple \nof 10.",
          error: "Not quite! Try again.",
          success: "Correct! \n\n80 can be written as 8 × 10.",
        },
        sceneEight: {
          whatIsWidth: "Can we cancel 10 in both\n numbers?",
          letsFind: "Let’s simplify the ratio.",
          error: "Check again — both terms have 10 as a common factor.",
          success:
            "Yes! You can cancel 10 in both numbers as it is the common factor.",
        },
        sceneNine: {
          whatIsWidth: "Which number divides 12 and \n8 to simplify the ratio?",
          error: "Not quite. To simplify, divide 12 and 8 by their GCF.",
          success:
            "Perfect! The greatest common factor helps simplify the ratio.",
          lcmOf: "LCM of \n12 and 8",
          gcfOf: "GCF of \n12 and 8",
        },
        sceneTen: {
          whatIsWidth: "What is the GCF of 12 and 8.",
          simplestForm: "Simplest form ",
          error: "Not quite! Try again.",
          success: "Yes! 4 is the greatest number that divides both 12 and 8.",
        },
        sceneEleven: {
          whatIsWidth: "What is the simplest form?",
          error: "Oops! Check your order of ratio.",
          correct: "Correct!",
          success:
            "is the simplest form of the ratio, which can also be written as 3 : 2. This means that for every 3 cm of length, there is 2 cm of width. ",
          lengthWidth: "Length : width ",
        },
        sceneTwelve: {
          letsFind:
            "Consider a smaller frame of 3 cm × 2 cm.\nLet’s enlarge it and see if it fits perfectly over the original 120 cm × 80 cm frame.",
          theSmallerFrame:
            "The smaller frame enlarges in the\n same ratio — 3 : 2 — and fits \nperfectly over the original frame. \n\nSo, 3 : 2 is the simplest form of the \nratio 120 : 80.",
        },
        nextQuestion: {
          motherBought:
            "Mother bought 2.8 kg of mangoes and 4.2 kg of oranges \nand placed them in a basket.\n\nWhat is the ratio of the weight of mangoes to oranges?",
        },
        sceneThirteen: {
          motherBought: "Mother bought ",
          mangoes: "2.8 kg of mangoes ",
          and: " and ",
          oranges: "4.2 kg of oranges ",

          andPlaced:
            "and placed them in a basket.\nWhat is the ratio of the weight of mangoes to oranges?",
          ratioOfMangoesOranges: "Ratio of the weight of \nMangoes to oranges ",
          error:
            "Oops! Be careful with the order — it’s mangoes first, then oranges.",
          success: "Good! The ratio of mangoes to oranges is 2.8 : 4.2.",
          whatIsWidth: "Identify the required ratio.",
        },
        sceneFourteen: {
          convertEach: "Convert each decimal to its fraction form.",
          whatIsWidth: "Express 2.8 as a fraction.",
          error:
            "Not quite. 2.8 has one decimal place, so write it as 28 over 10.",
          success: "That’s correct!",
        },
        sceneFifteen: {
          whatIsWidth: "Express 4.2 in fraction form.",
          error:
            "Not quite. 4.2 has one decimal place, so write it as 42 over 10.",
        },
        sceneSixteen: {
          letSimplifyRatio: "Let’s simplify the ratio.",
          canWe: "Can we cancel the common\n factor ",
          inBoth: "in both terms?",
          error: "Not quite. We can remove the common factor ",
          errorFromBoth: " from both terms.",
          success: "That’s correct! Let’s cancel it out.",
        },
        sceneSeventeen: {
          whichNumber:
            "Which number divides 28 and\n 42 to simplify the ratio?",
          error: "Not quite. To simplify, divide 29 and 42 by their GCF.",
          success:
            "Perfect! The greatest common factor helps simplify the ratio.",
          lcm: "LCM of \n28 and 42",
          gcf: "GCF of 28 and 42",
        },
        sceneEighteen: {
          whatIs: "What is the GCF of 28 and 42.",
          simplestForm: "Simplest form",
          error: "Not quite! Try again.",
          success:
            "Yes! 14 is the greatest number that divides both 28 and 42.",
        },
        sceneNineteen: {
          whatIs: "What is the simplest form?",
          error: "Oops! Check your order of ratio.",
          success: "That’s correct.",
          ratioOfWeight:
            "2 : 3 is the ratio of the\n weight of mangoes and\n oranges.\n\nThis means that for\n every 2 kg of mangoes\n there are 3 kg of\n oranges.",
        },
        activityComplete: {
          activityComplete: "Activity Completed!",
          youCompleted:
            "You’ve completed solving word problems \nby writing the required ratios \nin their simplest form.",
        },
      },
    },
  },
});

export default i18n;
