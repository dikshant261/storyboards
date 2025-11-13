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
          yes: "Yes",
          no: "No",
          clear: "Clear",
        },
        sceneTwo: {
          observeTheMap:
            "Observe the map of Indonesia and its explanation carefully. Measure\n the length of the thick black line. That line represents 175 km. Complete\n the table below.",
          letSolve:
            "Let’s solve this\n challenge by\n finding scale\n factors.",
        },
        instructions: {
          readThenTap: "Tap » after reading the question.",
          tapTheMap: "Tap the map to zoom in. \nEnter value using the keypad.",
        },
        table: {
          heading: "Length on the Map and Actual Distance",
          city_to_city: "City to city",
          length_on_map: "Length on map (cm)",
          actual_distance: "Actual distance (km)",
          black_line: "Black line",
          jakarta_jayapura: "Jakarta – Jayapura",
          jakarta_medan: "Jakarta – Medan",
          jakarta_palangkarya: "Jakarta – Palangkaraya",
        },
      },
    },
  },
});

export default i18n;
