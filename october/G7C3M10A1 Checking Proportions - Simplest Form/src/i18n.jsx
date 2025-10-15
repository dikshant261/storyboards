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
          findingFrames: "Finding Frames That Are in Proportion",
          picture: "Look at the picture frame!",
          verticalside:
            "The vertical side shows the length, and\n the horizontal side shows the width.",
          letFind:"\n\nLet’s find the ratio of",
          length:"length : width",
          andCheck:"and \ncheck which frames are in proportion!"  
        },

        navigation: {
          tapOption: "Tap the option to divide.",
          tapContinue: "Tap » to continue",
          tapToSeeFar: "Tap » to see what we did so far.",
          tapNextPart: "Tap » to see the next part.",
          tapStartOver: "Tap » to start over.",
        },
      },
    },
  },
});

export default i18n;
