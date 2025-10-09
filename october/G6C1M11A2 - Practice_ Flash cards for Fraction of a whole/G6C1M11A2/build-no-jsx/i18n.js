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
          hint: "Hint",
          startOver: "START OVER",
          start: "START",
          close: "Close"
        },
        navigation: {
          tapFraction: "Tap a fraction problem card, then tap its matching answer card.",
          tapContinue: "Tap » to continue"
        },
        startPage: {
          title: "Multiplication of Fraction by a Whole",
          content: "Multiplying  a fraction and a whole means multiplying\n the numerator of the fraction by the whole number\n and keeping the denominator the same.\n\nLet’s practice — match each one with its picture.\n\nTap “Start” to start the activity."
        },
        sceneOne: {
          heading: "Match each multiplication problem with its answer.",
          success: "Well Done! That’s a perfect match.",
          error: "Oops! That’s not a match. Try multiplying again."
        },
        multiplication_title: "Multiplication of Fraction and a Whole Number",
        multiply_fraction_rule: "To multiply a fraction by a whole number, multiply the numerator of the fraction by the whole number and keep the denominator the same.",
        multiplication_heading: "Multiplication of Fraction and a Whole Number",
        of: "of",
        numerator_whole_over_denominator: "Numerator × Whole",
        denominator: "Denominator",
        activity: {
          title: "Activity Completed!",
          content: "You matched the cards!\n\nNow you know that to multiply a fraction by a whole \nnumber, multiply the numerator of the fraction by the whole \nnumber and keep the denominator the same.\n\nTo go over the activity again, tap on ‘Start Over’."
        }
      }
    }
  }
});
export default i18n;