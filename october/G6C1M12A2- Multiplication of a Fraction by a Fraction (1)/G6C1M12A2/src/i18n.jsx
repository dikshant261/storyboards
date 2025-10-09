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
          cannotDivide: "Can’t divide further",
          yes: "Yes",
          no: "No",
        },
        activity: "Activity Completed!",
        navigation: {
          tapNumpad:
            "Use numpad to enter numerator and denominator, then tap Check.",
          tapNext: "Tap » to continue",
          tryNext: "Tap » to try a new challenge.",
        },
        startPage: {
          title: "Multiplication of a Fraction by a Fraction",
          weHave:
            "We learned how to multiply two fractions using\n an area model.",
          nowIts: "Now, it’s your turn to try on your own.",
          tapStart: "Tap “Start” to begin.",
        },
        sceneOne: {
          heading: "Multiply the given fractions.",
          success:
            "Well done! Product of fractions is the same as\nproduct of numerators over product of denominators.",
          error: "Try Again",
          errorTwo:
            "Oops! Multiply the numerators together and\n multiply the denominators together. Try again!",
          successTwo:
            "Correct! {{count}} out of {{counttwo}} parts are overlapped.\nProduct of fractions is the same as\nproduct of numerators over product of denominators.",
        },

        numerator1: "Numerator 1",
        denominator1: "Denominator 1",
        numerator2: "Numerator 2",
        denominator2: "Denominator 2",

        sceneTwo: {
          whatResult: "What is the result of",
          of: "of",
          message:
            "To multiply two fractions, multiply the numerators together and the\n denominators together.",
        },

        fraction: {
          title: "We used an area model to show multiplication of fractions.",
          description:
            "This can be done by multiplying the numerators together and multiplying the denominators together.",
          numerator: "Numerator",
          denominator: "Denominator",
          restart: "Tap “Start Over” to restart the activity.",
        },
      },
    },
  },
});

export default i18n;
