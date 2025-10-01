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
          startOver: "START OVER",
          start: "START",
          close: "Close",
          cannotDivide: "Can’t divide further",
          yes: "Yes",
          no: "No"
        },
        startPage: {
          areReady: "Dee Tee, Jax, and Jane \nare ready.",
          celebration: "Now, let’s start Jane’s birthday\ncelebration!"
        },
        navigation: {
          tapOption: "Tap the option to divide.",
          tapContinue: "Tap » to continue",
          tapToSeeFar: "Tap » to see what we did so far.",
          tapNextPart: "Tap » to see the next part.",
          tapStartOver: "Tap » to start over."
        },
        sceneOne: {
          look: "Look! These are the cakes they made.",
          tapToSee: "Tap » to see what Dee Tee, Jax, and Jane are up to!"
        },
        sceneTwo: {
          janSpecial: "Jane! \nit’s your special day!",
          letCutCake: "Let’s cut the cake \nyou made.",
          tapNext: "Tap » to see what happens next!"
        },
        sceneThree: {
          DeeTee: "DeeTee",
          cutCakeHalf: "Can I cut the cake exactly in half?",
          tapKnows: "Tap » know what Dee Tee says ?"
        },
        sceneFour: {
          offCourse: "Of course, Jane!\nIt’s your day,\n so you get to\n choose.",
          tapCut: "Tap the cutting line and then tap",
          happyBirthday: "Happy Birthday\n Jane!\nGreat job cutting\n the cake into two\n equal parts!",
          tapMoveStory: "Tap » to move ahead in the story!"
        },
        sceneFive: {
          equalParts: "Equal parts mean\n half as well,\n DeeTee?",
          tapToKnow: "Equal parts mean half as well, DeeTee?"
        },
        sceneSix: {
          ohhJax: "Ohh, Jax!\n Look, it’s two equal\n parts.\nWhen we cut a \nwhole into two\n equal parts, each\n part is called a half.",
          tapContinue: "Tap » to continue",
          half: "Half",
          oneTwo: "One of two equal parts of a \nwhole."
        },
        sceneSeven: {
          thatWas: "That was\n awesome\n, DeeTee!\n\nHow about you cut\n your cake into\n two halves too?",
          tapToKnow: "Tap » know what Dee Tee says ?"
        },
        sceneEight: {
          whyNot: "Why not, Jane!\n\nLet’s cut the cake \ninto two halves.",
          tapCutting: "Tap the cutting line and then tap ",
          wowTwo: "Woow! Two perfect\n halves!\n\nLook — you cut it\n differently, and it’s\n still halves!",
          tapKnow: "Tap » know what Dee Tee says ?",
          twoHalves: "halves",
          wowPerfect: "Woow! \nTwo perfect halves!\n\nDeeTee,if we join\n them back, \nwill it make \nthe whole again?"
        },
        sceneNine: {
          thatRight: "That’s right, Jane!\n We can cut a whol\n into halves in\n different ways. \n\nLet’s join them back\n to see if it becomes\n a whole again.",
          dragEachPart: "Drag each part to bring them together.",
          twoHalvesCake: "Two halves of cake.",
          half: "Half"
        },
        sceneTen: {
          yayWehave: "Yay!\n When we join\n two halves,\n we get the whole\n back!",
          tapContinue: "Tap » to continue."
        },
        sceneEleven: {
          nowTime: "Now, it's time for\n Jax Cake.\n\nLook at the cake —\n is it cut into two\n halves?",
          tapCorrect: "Tap the correct answer.",
          tapLine: "Tap the cutting line",
          tapContinue: "Tap » to continue.",
          error: "Try again! Both halves should be equal in size.",
          success: "Well done! Unequal parts cannot make halves."
        },
        sceneTwelve: {
          notEqual: "If the parts are not\n equal,\n then they are not\n halves.",
          smallerPart: "Smaller part",
          biggerPart: "Bigger Part",
          tapContinue: "Tap » to continue."
        }
      }
    }
  }
});
export default i18n;