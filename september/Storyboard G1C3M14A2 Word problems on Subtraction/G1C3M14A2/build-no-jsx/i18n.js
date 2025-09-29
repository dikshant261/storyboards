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
          check: "CHECK",
          hide: "Hide",
          hint: "Show",
          startOver: "START OVER",
          start: "START"
        },
        sideHeading: {
          thereAre: "There are mainly 3 cases of subtraction "
        },
        wordProblems: {
          one: "1.Take away (removing part from total)",
          two: "2.Comparison\n(Finding difference)",
          three: "3.Part-total (Finding missing part)"
        },
        questionHading: {
          solveSubtraction: "Solve subtraction word problems."
        },
        navigation: {
          tapStart: "Tap START",
          tapNumber: "Tap the number and then tap check.",
          tapContinue: "Tap » to continue."
        },
        typeOne: {
          typeOneText: "Type 1: TAKE AWAY.Read the question. Subtract what is taken away from the total to find the difference.",
          subtractFrom: "Subtract 4 from 7.\nTap and fill the difference using numpad and check.",
          enterNumbers: "Enter the numbers using the numpad and Check",
          total: "Total",
          taken: "Taken away:",
          typeTwoText: "Type 2: COMPARISON Read the question. Subtract the smaller number from the larger number.",
          typeThreeText: "Type 3: PART-TOTAL Read the question. Subtract the known part from the total to find the missing part."
        },
        questionOne: {
          question: "There were 7 pencils. 4 were used. How many pencils are left?"
        },
        questionTwo: {
          question: "Malik has 9 marbles and Andi has 7 marbles. How many more marbles does Malik have than Andi?",
          malik: "Malik",
          andi: "Andi",
          larger: "Larger Number",
          smaller: "Smaller Number"
        },
        questionThree: {
          question: "There are 6 mangoes in a basket. 2 are ripe, and the rest are unripe. How many unripe mangoes are there?",
          partA: "Part A (ripe):",
          mangoes: "Mangoes",
          ripe: "ripe",
          unripe: "unripe"
        },
        total: "Total :",
        takenAway: "Taken away :",
        hintMessages: {
          hintOne: "Tap to fill the total number of objects in the question.",
          hintTwo: "Tap to fill the number of objects taken away in the question.",
          hintThree: "Subtract 4 from 7. Tap and fill the difference and check."
        },
        PencilErrors: {
          smallerNumber: "Oops! Smaller number. Tap to fill the total number of objects. Try again…",
          largeNumber: "Oops! Larger number. Tap to fill the total number of objects. Try again…",
          totalSuccess: "Good work!\nThere are 7 pencils in total.",
          emptyError: "Oops! That shows what’s taken away. Tap to fill the total number of objects. Try again…"
        },
        pencilTakenAwayError: {
          emptyError: "Oops! That shows total objects. Tap to fill the number of objects taken away.Try again…",
          smallerError: "Oops! Smaller number. Tap to fill the number of objects taken away.Try again…",
          largerError: "Oops! Larger number. Tap to fill the number of objects taken away.Try again…",
          success: "Good work!Out of 7 pencils, 4 were used or taken away. "
        },
        pencilSentanceError: {
          smallerError: "Oops! Smaller Number.Tap the difference between 7 and 4.Try again…",
          largerError: "Oops! Larger Number.Tap the difference between 7 and 4.Try again…",
          success: "Well Done!Out of 7 pencils, 4 were used or taken away, then 3 pencils remain",
          emptyError: "Oops! that shows  Out of 7 pencils, 4 were used or taken away,then pencils remain?"
        },
        numberOfPencil: "Number of Pencils left :",
        marbleHint: {
          hintOne: "eed to compare!Tap to fill the larger number in the question.",
          hintTwo: "Need to compare!Tap to fill the smaller number in the question.",
          hintThree: "Subtract 7 from 9. Tap and fill the difference and check."
        },
        marbleLargerError: {
          largerError: "Oops! Wrong number.Tap to fill the larger number and check. Try again…",
          smallerError: "Oops! That shows smaller number. Tap to fill the larger number and check. Try again…",
          success: "Good work!Malik has more marbles. Malik has 9 marbles."
        },
        marbleSmallerError: {
          largerError: "Oops! That shows larger number. Tap to fill the smaller number and check. Try again…",
          smallerError: "Oops! Wrong number.Tap to fill the smaller number and check. Try again…",
          success: "Good work!Andi has more marbles. Andi has 7 marbles."
        },
        marbleSenetanceError: {
          smallerError: "Oops! Smaller Number.Tap the difference between 9 and 7.Try again…",
          largerNumber: "Oops! Larger Number.Tap the difference between 9 and 7.Try again…",
          success: "Well Done!Malik has 9 and Andi has 7 marbles. Malik has 2 more marbles than Andi."
        },
        malikHas: "Malik has ",
        hasTwo: " more marbles than Andi.",
        magoesHint: {
          hintOne: "Need to find missing part!Tap to fill Total number of objects in the question.",
          hintTwo: "Need to find missing part!Tap to fill number of objects Part A",
          hintThree: "Subtract 2 from 6. Tap and fill the remaining part B and check."
        },
        mangoeTotal: {
          partError: "Oops! That shows part. Tap to fill the total number and check. Try again…",
          smallerError: "Oops! Smaller number. Tap to fill the total number and check. Try again…",
          largerError: "Oops! Larger number. Tap to fill the total number and check. Try again…",
          success: "Good work!There are total 6 mangoes"
        },
        mangoesRipe: {
          partError: "Good work!There are total 6 mangoes",
          smallerError: "Oops! Smaller number. Tap to fill the number of objects in part A and check. Try again…",
          largerError: "Oops! Larger number. Tap to fill the number of objects in part A and check. Try again…",
          success: "Good work!Total 6 mangoes and 2 of them are ripe."
        },
        mangoSentanceError: {
          smallerError: "Oops! Smaller Number.Tap the difference between 6 and 2.Try again.",
          largerError: "Oops! Larger Number.Tap the difference between 6 and 2.Try again…",
          success: "Good work! Total 6 mangoes and 2 of them are ripe. Remaining 4 mangoes are unripe."
        },
        remaining: "Remaining",
        mangoesUnripe: "mangoes are unripe."
      }
    }
  }
});
export default i18n;