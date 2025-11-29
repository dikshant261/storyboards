import i18n, { t } from "i18next";
import { Activity } from "react";
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
          replyButton: "Replay\nTransformation"
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
          aFrame: "A frame measures 120 cm × 80 cm.\nWhat is the ratio of the length and width of the frame?"
        },
        navigation: {
          tapCorrectOption: "Tap the correct option.",
          tapShowAnimation: "Tap » to see the transformation.",
          tapNext: "Tap ‘Replay’ to see the animation again, or » for another challenge."
        },
        startPage: {
          mixedNumbersAndImproperFractions: "Mixed Numbers and Improper Fractions",
          mixedNumbers: "Mixed Numbers",
          and: " and ",
          improperFractions: "Improper Fractions\n",
          areUsed: "are used to denote numbers that are\n",
          greaterThan: "greater than One Whole!\n\n",
          itsVeryUsefull: "It is very useful to be able to convert\nsuch values from one form to another.\n\nTap “Start” to try a few challenges\non such conversions."
        },
        sceneTwo: {
          expressTheGiven: "Express the given mixed number into an improper fraction."
        },
        feedback: {
          success: "Great job! \nThat’s the correct answer.",
          opps: "Oops!",
          is: " is ",
          isProper: "is a proper fraction."
        },
        activityCompleted: {
          activityCompleted: "Activity Completed!",
          mixedNumbers: "Mixed Numbers ",
          and: "and ",
          improperFractions: "Improper Fractions ",
          areUsed: "are used\n",
          toDenote: "to denote numbers that are ",
          greaterThanOne: "greater than One Whole!\n\n",
          fromAMixedFraction: "From a mixed number, we simply multiply the denominator\n with the whole number and add the numerator\nnto get the numerator of the improper fraction!\n\nTap “Start Over” to repeat this activity"
        }
      }
    }
  }
});
export default i18n;