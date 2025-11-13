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
          tryAgain: "Try Again",
          yes: "Yes",
          no: "No"
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
          checkProportionality: "Let’s check proportionality!",
          getPurple: "We get purple when we mix \nred and blue!",
          mixGiven: "Let’s mix given amounts of red and blue \npaints and check if their ratios are in\n proportion."
        },
        navigation: {
          tapStart: "Tap ≫ to start computing the ratios.",
          enterEach: "Enter each ratio term using the numpad and tap ‘check’",
          tapSimplify: "Tap ≫ to simplify the ratio.",
          tapRatioPaintB: "Tap ≫ to fill ratio of Paint {{paint}}.",
          tapForCross: "Tap ≫ to cross-multiply the ratios.",
          tapForNextPair: "Tap ≫ to cross-multiply the next pair of terms.",
          tapForNextChallange: "Tap ≫ for another challenge.",
          tapCheckRatio: "Tap ≫ to check proportionality.",
          obServeCross: "Observe the cross products and tap yes or no.",
          nextQuestion: "Tap ≫ for another challenge.",
          Tap: "Tap ≫"
        },
        sceneTwo: {
          clickIf: "Check if the",
          ratioOfRed: "ratio of red to blue",
          inPaintA: "in Paint A and Paint B are in proportion.",
          keypadHeading: "Let's test if the ratios of red to blue in Paint A and Paint B are proportional using cross-multiplication method. "
        },
        sceneThree: {
          expressThe: "Express the ratio of",
          lengthRatio: "red to blue paint",
          frameA: "in Paint {{paint}} as a fraction.",
          termA: "Enter the first term in the ratio for Paint {{paint}}.",
          termB: "Enter the second term in the ratio for Paint {{paint}}."
        },
        sceneFive: {
          findProduct: "Find the product of {{num1}} and {{num2}}.",
          letsDoCross: "Let’s do the cross-multiplication!"
        },
        sceneSeven: {
          expressThe: "Express the ratio of ",
          lengthRatio: "red to blue paint ",
          frameA: "in Paint A and Paint B are in proportion.",
          sideKeypadHeading: "Is the ratio of red to blue\n in Paint A proportional\n to the ratio of red to\n blue in Paint B?"
        },
        feedBack: {
          errorOne: "Oops! We start with red paint first.Try again!",
          errorTwo: "Oops! The second term shows the amount of blue paint.Try again!",
          success: "Good job. The ratio of red to blue paints in Paint {{frame}} is ",
          crossError: "Not quite! {{num1}} × {{num2}} is not equal to {{ans}}.",
          crossSuccess: "Good job. \n{{num1}} × {{num2}} = {{ans}}.",
          yesError: "Oops!\n Observe the purple shade of Paint A and Paint B are different.\n\nFor the ratios to be proportional, the cross-products should be equal.",
          yesSuccess: "Correct!\nThe cross-products are not equal, so the ratio of red to blue in Paint A is not proportional to ratio of red to blue in Paint B. \n\nThat’s why the purple shades don’t match.",
          yesSuccessOne: "Correct! \nThe cross-products are equal, so the ratio of red to blue in Paint A is proportional to ratio of red to blue in Paint B. \n\nThat’s why the purple shades are same.",
          yesErrorOne: "Oops!\n See how the purple shade of Paint A and Paint B match?\n\nFor the ratios to be proportional, the cross-products should be equal."
        },
        activityComplete: {
          activityComplete: "Activity Completed!",
          whenRatio: "When ratio of red and blue paints are in \nproportion, paint A and paint B had the same shade.\n\n\nWhen the two cross products of the ratios are equal,\n then the ratios are in proportion."
        }
      }
    }
  }
});
export default i18n;