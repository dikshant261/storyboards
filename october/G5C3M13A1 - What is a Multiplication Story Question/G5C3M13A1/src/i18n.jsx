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
        sceneOne: {
          whatIsStory: "What is a story question?",
          aStoryQuestion:
            "A story question is a short, real-life mini-story \n\nthat asks you to",
          calculateNumbers: "calculate a number",
        },
        sceneTwo: {
          typeOfStory: "Types of story questions:",
          additionStory:
            "1. Addition story question: Gives you two or more numbers that \nyou must add to get the answer.",
          subtraction: "2. Subtraction",
          confirmationKeyword:
            "Let’s learn the confirmation keywords words next!",
        },
        sceneThree: {
          typesOfQuestion: "Types of Story Questions",
          additionStoryQuestion: "Addition Story Question",
          subtractionStoryQuestion: "Subtraction Story Question",
          multiplicationStoryQuestion: "Multiplication Story Question",
          storyQuestionDescription:
            "Gives you two or more numbers that should be added to get the answer.",
          example: "Example",
          exampleText:
            "Mr. Rahmad has 110 apples and 105 bananas. How many fruits does he have in total?",
          answerLabel: "Answer",
          exampleAnswer: "110 + 105",

          subtractionGivesYou:
            "Gives you two numbers. You need to subtract one number from the other.",
          mrRehmadSubtractionText:
            "Mr. Rahmad has 110 apples and he sells 50 apples in the market. How many apples does he have left?",
          subtractAnswer: " 110 - 50",
          multiplicationGivesYOu:
            "Gives you number of groups and number of items in each group. You need to multiply both.",
          weWillLearn: "We will learn about this today. Tap\n » to continue.",
        },

        sceneFour: {
          whatMultiplicationGivesYou:
            "What a multiplication story question gives you",
          aMultiplicationStoryAlways:
            "A multiplication story question always gives you:",
          numberOne: "1. Number of groups",
          numberTwo: "2. Number of items in each group",
          weUseAbove: "We use the above two to find the:",
          totalNumber: "Total number of items ",
        },
        sceneFive: {
          howWeCalculate: "How we calculate the answer",
          noOfGroups: "No. of groups",
          items: "Items in each group",
          totalItems: "Total items",
        },
        sceneSix: {
          whatToLook: "What to look for in the multiplication story question",
          wordOfPharasGive: "1. Words or phrases that tells you: ",
          numberOfGroups: "number of groups",
          wordOfPharasTells: "2. Words or phrases that tells you: ",
          items: "items in each group",
          letUse: "Let’s use our wits on some example story questions.",
        },
        sceneSeven: {
          identifyPharase:
            "Identify phrases that describe “number of groups” and “items in each group”",
          jakaBought: "Asep bought",
          threeBasketOfApple: "5 boxes of toys",
          if: "If",
          eachBasket: "each box contains 7 toys,",
          howManyApples: "how many toys",
          didHeBuy: "did he buy?",
          noOfGroups: "No. of groups",
          itemInEachGroup: "Items in each group",
          goodJob: "Good job! Notice the pattern below",
          totalItems: "Total items",
          letsTry: "Let’s try one more story question",
          onceAgain: "Once again, let’s identify the phrases that describe:",
        },
        sceneTen: {
          janaWant: "Jana wants to gift",
          twoCupCake: "3 cupcakes each",
          toHerBestFriend: "to her 3 best friends.If she has",
          threeBest: "3 best friends,",
          howManyCupCakes: "how many cupcakes",
          sheMustBuy: "she must buy?",
        },
        sceneTwelve: {
          howTobeSure:
            "How to be sure that a story question is a multiplication question",
          nextWillLearn: "Next we will learn to spot two kinds of keywords:",
          clueWords: "Clue words",
          checkWords: "Check Words",
          eachEvery: "each,\nevery,\nper,\ngroups of,\nsets of",
          inAllHow: "In all,\nhow many,\ntotal number,\nfind the total",
          whenBoth:
            "When both show up together in a story, it is likely a multiplication question.",
        },

        sceneThirteen: {
          clueWordsTitle: "Clue Words",
          clueWordsDescription:
            "Clue words signal that a story is probably a multiplication problem. They always tell the number of items in a group.\n\n After you spot one, confirm it by finding check words that ask for the total.",
          each: "Each",
          every: "Every",
          per: "Per",
          groupsOf: "Groups of",
          setsOf: "Sets of",
          exampleStory:
            "A shopkeeper sells erasers in sets of 5. He sells 27 sets.",
          groupsItems: "Groups = eraser pack\nItems = individual erasers",
          alternateWay: "Alternate way of reading",
          alternateExplanation: "27 groups, each group has 5 items.",
          animaTree: "Amina has 15 mango trees. Each tree produces 20 mangoes.",
          treeGroup: "Groups = trees\nItems = mangoes",
          treeAlternate: "15 groups, each group has 20 items.",
          pencil: "Every box contains 24 pencils. A school buys 10 boxes.",
          pencilGroup: "Groups = pencil box\nItems = pencils",
          pencilAlternate: "10 groups, each group has 24 items.",
          trainStory:
            "A train carries 120 passengers per trip. It makes 6 trips in a day.",
          trainGroup: "Groups = trips\nItems = passengers",
          trainAlternate: "6 groups, each group has 120 items.",
          studentStory:
            "Students are standing in groups of 8 for a parade. There are 14 groups.",
          studentGroup: "Groups = parade groups\nItems = students",
          studentAlternate: "14 groups, each group has 8 items.",
        },
        sceneFifteen: {
          checkWords: "Check words",
          commonKeywords:
            "Common keywords that describe total items being asked",

          checkWordsLine1: "are signals that the story is asking for the",
          total: "total",
          checkWordsLine2:
            "When a check word shows up with a clue word (items in a group), that confirms it’s a multiplication problem.",
          inAll: "In all",
          howMany: "How many",
          totalNumber: "Total number",
          findTotal: "Find the total",
          checkWordsTitle: "CHECK WORDS",
        },
        sceneSixteen: {
          letSeeSome:
            "Let’s see some story questions and identify whether it is a multiplication problem or not.\n\nPress the button below if you want to do this lesson again.",
        },
      },
    },
  },
});

export default i18n;
