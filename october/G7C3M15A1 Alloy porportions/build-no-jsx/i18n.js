import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({
  lng: "en",
  // default language
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
          tryAgain: "Try Again"
        },
        sceneOne: {
          aCertain: "A certain alloy is made by mixing ",
          twoMetals: "two metals, A and B, in the ratio 7.5 g : 3 g. ",
          ifANew: "If a new sample of the ",
          sameAlloy: "same alloy contains 45 g of metal B, ",
          howManyGrams: "how many grams of metal A does it contain?",
          letFind: "Let’s find the missing term of the ratio using ",
          crossMultiplication: "cross multiplication method."
        },
        sceneTwo: {
          inAnAlloy: "In an alloy – \nMetal A : Metal B = \n7.5 : 3",
          inSameAlloy: "In same alloy –\nMetal B = 45 g"
        },
        sceneThree: {
          amountOfMetal: "Amount of metal A \nin the new sample"
        },
        sceneFour: {
          letAssume: "Let us assume the amount of metal A in the new sample to be",
          xGrams: "𝒳 grams."
        },
        sceneFive: {
          sinceBoth: "Since both alloys are the same, ",
          theMetal: "the ratios of Metal A and Metal B in both alloys will be proportional.",
          qs: " 7.5 : 3 = 𝒳 : 45",
          writeAs: "Write as fractions —\n",
          whichOption: "Which option represents the\n correct relationship between\n cross products?",
          error: "No! Observe the arrows, cross multiply and try again.",
          success: "Good Job!"
        },
        given: "Given",
        toFind: "To Find",
        metalA: "Metal A",
        metalB: "Metal B",
        instructions: {
          tapComphrehend: "Tap » to comprehend the challenge. ",
          tapToUnderStand: "Tap » to understand what we need to find.",
          tapToContinue: "Tap » to continue. ",
          correctOption: "Choose the correct option.",
          tapToStartOver: "Activity Completed!, Tap » to start over"
        },
        sceneSix: {
          sloveThis: "Solve this equation to ",
          findTheValue: "find the value of 𝒳",
          findValueX: "What is the correct value of 𝒳?",
          errorOne: "No! You divided 45 by 2.5 instead of multiplying. Try again!",
          errorTwo: "Uh-oh! You missed division by 3. Try again!",
          errorThree: "So close! You forgot to put decimal point in the answer. Try again!",
          success: "Good job! You found the answer."
        },
        sceneSeven: {
          soThe: "So, the new sample of alloy has ",
          metalA: "112.5 grams of metal A ",
          metalB: "and 45 grams of metal B.",
          isPerportional: "7.5 : 3  is proportional to  112.5 : 45"
        }
      }
    }
  }
});
export default i18n;