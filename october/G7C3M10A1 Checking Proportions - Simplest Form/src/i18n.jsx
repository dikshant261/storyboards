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
          check: "Check",
          tryAgain: "Try Again",
        },
        length: "Length",
        width: "Width",
        frameA: "Frame A",
        frameB: "Frame B",
        frameC: "Frame C",
        startPage: {
          findingFrames: "Finding Frames That Are in Proportion",
          picture: "Look at the picture frame!",
          verticalside:
            "The vertical side shows the length, and\n the horizontal side shows the width.",
          letFind: "\n\nLet’s find the ratio of",
          length: "length : width",
          andCheck: "and \ncheck which frames are in proportion!",
        },

        navigation: {
          tapStart: "Tap ≫ to start computing the ratios.",
          enterEach: "Enter each ratio term using the numpad and tap ‘check’",
          tapSimplify: "Tap ≫ to simplify the ratio.",
          tapRatioFrameB: "Tap ≫ to fill ratio of frame {{frame}}.",
          tapFindProportion: "Tap ≫ to identify frames in proportion.",
          tapTwoFrame: "Tap 2 frames that are in proportion.",
          tapForNextChallange:"Tap ≫ for another challenge."
        },

        sceneTwo: {
          heading: "Which two picture frames are in proportion?",
          keypadHeading:
            "Frames are said to be\n in proportion if the\n ratio of their sides \nare in proportion.",
        },
        sceneThree: {
          whatIs: "What is the",
          lengthRatio: "length : width ratio",
          frameA: "for Frame {{frame}}?",
          whichTwo: "Which two picture frames are in proportion?",
        },
        feedBack: {
          errorOne:
            "Oops! The required ratio is length : width of Frame {{frame}}. The vertical measure is length.Try again.",
          errorTwo:
            "Oops! The required ratio is length : width of Frame {{frame}}. The horizontal measure is width. Try again.",
          success:
            "Good job. The sides are in the ratio {{num1}} : {{num2}} in Frame {{frame}} .",
          errorThree:
            "Not quite! Try dividing {{response}} by the GCF of\n ({{num1}}, {{num2}}).",
          successTwo:
            "Good job. The simplest form of sides-ratio for Frame {{frame}} is {{num1}} : {{num2}}.",
        },
        sceneNine: {
          error:
            "Oops! See Frame A doesn’t fit Frame B when enlarged.\n\nThe simplest form of the sides-ratio of these frames should be equal to be proportional.",
          success:
            "Yay! Frame A exactly fits Frame C when enlarged.\n\nThe simplest form of their sides-ratio are equal (5 : 3) .That means the frames are in proportion.",
        },
      },
    },
  },
});

export default i18n;
