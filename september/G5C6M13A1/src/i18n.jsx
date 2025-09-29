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
        },

        startPage: {
          simplestForm: "Simplest Form of a Fraction",
          keep: "Keep dividing the\n numerator and denominator\n by the same number\n until they can’t be divided further.",
          tapStart: "Tap “START” to begin.",
        },

        navigation: {
          tapOption: "Tap the option to divide.",
          tapContinue: "Tap » to continue",
          tapToSeeFar: "Tap » to see what we did so far.",
          tapNextPart: "Tap » to see the next part.",
          tapStartOver: "Tap » to start over.",
        },
        error: {
          notDivisibleByFive:
            "Oops! 24 and 8 are not divisible by 5. Remember, both numbers must be divisible by the same number.",
          notYet:
            "Not yet! You can still divide numerator and denominator further.",
          goodJob: "Good job! You picked the right number to divide.",
          thatCorrect: "That’s correct! It can't be divided further.",
          notDivide: "It can't be divided further.",
        },
        simplestFormHeading: "is the simplest form of",
        andToget: "and to get the simplest form\n of the fraction",
        divideBy: "Divided by",
        commonFactor: "are the \ncommon factors of \n12 and 24.",
        and: "and",
        greatJob:
          "Great job! A fraction is in its simplest form\n when the numerator and denominator can’t\n be divided by the same number. We used \ncommon prime factors to simplify fractions.",
      },
    },
  },
});

export default i18n;
