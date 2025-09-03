import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        thePicture: "The picture \n represents a\n subtraction story.",
        writeStory:
          "Make a subtraction\nstory and build a\n subtraction sentence.",
        subtractionStoryFirst: "Write the\nsubtraction story\nfirst.",
        writingStory: "Writing the\nsubtraction\nStory.",
        writingNumpad:
          "Writing Subtraction\n sentence:\nFor the given\n picture and story,\nfill the subtraction\nsentence using\nnumpad and check.",
        start: "Start",
        tapStart: "Tap Start...",
        tapCheck: "Tap the numbers to enter and then tap check.",
        sideHeadingOne:
          " A subtraction story\n tells the total\n number, what is \ntaken away and\n what remains.",
        stepOne: "Step 1: Write \n about the total \n number.",
        chooseOption:
          "Choose the option \n that matches the \n story in the picture.",
        stepTwo: "Step 2: Write\n about how much \n is taken away.",
        stepThree: "Step 3: Write \n about how many \n remain.",
        allStep: "Write all these\n steps together in \n the form of story.",
        makeNote: "Make a note of \n this subtraction \n story.",
        rememberStep: "Remember the \nsteps:",
        storyOneText:
          "6 children were playing.\n 2 children left the game, then \n 4 children remained.",
        totalNumber: "Total Number",
        takenAway: "How much is taken away",
        remain: "How Much \n remains",
        makeStory: "MAKE A STORY",
        tapContinue: "Tap ▶ to continue.",
        tapCorrect: "Tap the correct option.",
        tapStory: "Tap MAKE A STORY.",
        tapNextQuestion: "Tap ▶ for next question.",
        hintMessage:
          "Use numbers in\nthe story to write\n a sentence in the\n form of “the\n whole – part\n taken away = part\n that is left”.",
        show: "Show",
        check: "CHECK",
        successMeassage:
          "Well Done!\nYou have\n correctly written\n subtraction\n sentence for this\n picture and\nstory…",
        errorMessage:
          "Oops!\n Use numbers in\nthe story to write\na sentence in the \nform of “the\n whole – part \ntaken away = part\n that is left”.",
        storyOne: {
          optionOne: "6 children are playing.",
          optionTwo: "6 children are sitting.",
          optionThree: "6 children are sleeping.",
          optionFour: "6 children are studying.",
          optionFive: "2 children woke up.",
          optionSix: "2 children left the game.",
          optionSeven: "2 children ate the chocolates.",
          optionEight: "2 children slept.",
          optionNine: "4 children remain.",
          optionTen: "4 children went away.",
          optionEleven: "4 children were in total.",
          optionTwelve: "4 children went to study.",
        },
        storyTwoText:
          "6 children were total.\n4 children are wearing blue shirt, then\n Remaining 2 are wearing white shirt.",
        storyTwo: {
          // Step One
          optionOne: "There are 6 children in total.",
          optionTwo: "There are 6 children eating.",
          optionThree: "There are 6 children sleeping.",
          optionFour: "There are 6 children studying.",

          // Step Two
          optionFive: "4 children are wearing Red shirt",
          optionSix: "4 children are wearing Blue shirt",
          optionSeven: "4 children are wearing White shirt",
          optionEight: "4 children are wearing Yellow shirt",

          // Step Three
          optionNine: "Remaining 2 are wearing Blue shirt",
          optionTen: "Remaining 2 are wearing Red shirt",
          optionEleven: "Remaining 2 are wearing White shirt",
          optionTwelve: "Remaining 2 are wearing Red shirt",
        },
        storyThreeText:
          "Mother served 6 cakes. \nThe boy ate 1 cake. \n5 cakes remain.",
        storyThree: {
          // Step One
          optionOne: "Mother served 6 cakes.",
          optionTwo: "Mother has 6 children",
          optionThree: "Mother served 6 plates of cakes.",
          optionFour: "Mother gave 6 books.",

          // Step Two
          optionFive: "Boy ate all cakes",
          optionSix: "Boy has 1 book.",
          optionSeven: "Boy ate 1 cake.",
          optionEight: "Boy ate 1 plate of cakes",

          // Step Three
          optionNine: "5 books remain.",
          optionTen: "5 plates remain.",
          optionEleven: "5 boys remain.",
          optionTwelve: "5 cakes remain.",
        },
      },
    },
  },
});

export default i18n;
