import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";
i18n.use(initReactI18next).init({
  lng: "en",
  // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        title: "Identify Ratios and Fractions",
        startPage: {
          ratiosAndFraction: "Ratios and fractions are different.",
          fromTheIdentify: "From the various phrases, \nidentify they represent a ratio or a fraction.",
          tip: "Tip: Look for the correct key-words. \nE.g. “for every” means ratios, “out-of” means fractions."
        },
        buttons: {
          previous: "«",
          next: "»",
          show: "Show",
          check: "Check",
          hide: "Hide",
          startOver: "START OVER",
          start: "START",
          ratio: "Ratio",
          fraction: "Fraction"
        },
        appleAndQuestion: {
          oneThirdApple: "Ratio or Fraction?\nOne-third of the apples are green.",
          onThirdAppleGreen: "One-third of the apples\n are green.",
          forEvery: "For every 3 red marbles, there are 4 blue marbles.",
          threeRedMArble: "Ratio or Fraction?\nFor every 3 red marbles, there are 4 blue marbles."
        },
        navigation: {
          tapFraction: "This represents a fraction. Tap on ‘Fraction’ button.",
          tapNext: "Tap » for next question.",
          tapRatio: "This represents a ratio. Tap on ‘Ratio’ button.",
          correctRepresentation: "Click on the correct representation.",
          tapContinue: "Tap » for continue"
        },
        questions: {
          questionStudent: "Ratio or Fraction?\nThe number of boys to girls in the class is 4 to 3.",
          questionTeacher: "Ratio or Fraction?\nFor each  teacher, there are 10 students.",
          questionPizza: "Ratio or Fraction?\nOut of 8 slices of pizza, 5 are eaten.",
          questionComic: "Ratio or Fraction?\nCounted out of 10 books, 6 are comics.",
          questionApple: "Ratio or Fraction?\n Compared to 5 apples, there are 3 oranges.",
          questionSleep: "Ratio or Fraction?\n Out of the whole 24 hours, 8 are for sleeping."
        },
        pictureHeading: {
          student: "The number of boys to girls \nin the class is 4 to 3.",
          teacher: "For each teacher, there are \n10 students.",
          pizza: "Out of 8 slices of pizza, \n5 are eaten.",
          comic: "Counted out of 10 books,\n6 are comics.",
          apple: "Compared to 5 apples, there \nare 3 oranges.",
          sleep: "Out of the whole 24 hours, \n8 are for sleeping."
        },
        activityComplete: "Activity Complete",
        ratioDifferent: "Ratios and fractions are different.",
        startOver: "To repeat the activity, click on “Start Over”."
      }
    }
  }
});
export default i18n;