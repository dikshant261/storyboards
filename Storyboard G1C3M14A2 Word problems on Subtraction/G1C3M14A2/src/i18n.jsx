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
        },
        sideHeading: {
          thereAre: "There are mainly 3 cases of subtraction ",
        },
        wordProblems: {
          one: "1. Take away (removing part from total)",
          two: "2. Comparison(Finding difference)",
          three: "3. Part-total (Finding missing part)",
        },
        questionHading: {
          solveSubtraction: "Solve subtraction word problems.",
        },
        navigation: {
          tapStart: "Tap START",
          tapNumber: "Tap the number and then tap check.",
        },
        typeOne: {
          typeOneText:
            "Type 1: TAKE AWAY.Read the question. Subtract what is taken away from the total to find the difference.",
          subtractFrom:
            "Subtract 4 from 7.\nTap and fill the difference using numpad and check.",
          enterNumbers: "Enter the numbers using the numpad and \nCheck",
          total: "Total",
          taken: "Taken away:",
        },
        questionOne: {
          question:
            "There were 7 pencils. 4 were used. How many pencils are left?",
        },
      },
    },
  },
});

export default i18n;
