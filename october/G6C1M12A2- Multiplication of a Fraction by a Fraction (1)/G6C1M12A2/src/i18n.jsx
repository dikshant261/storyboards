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
        navigation: {
          tapNext: "Tap Next after reading",
          tapEachWord:
            "Tap on each word to see how it is used. Tap » after reading",
          tapAndDrag: "Tap and drag the phrases into the right category area ",
        },
        startPage:{
          title:"Multiplication of a Fraction by a Fraction",
          weHave:"We learned how to multiply two fractions using\n an area model.",
          nowIts:"Now, it’s your turn to try on your own.",
          tapStart:"Tap “Start” to begin."
        }
      },
    },
  },
});

export default i18n;
