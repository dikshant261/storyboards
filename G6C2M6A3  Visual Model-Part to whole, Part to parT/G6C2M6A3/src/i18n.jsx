import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        startEndPage: {
          ratiosInVisual: "Ratios in Visual Charts",
          letPractice:
            "Let’s practice reading charts and writing ratios by comparing parts and the whole.",

          activityCompleted: "Activity Completed!",
          youHaveLearned:
            "You’ve learned how to read visual charts and \nexpress the information as ratios. ",
          nowYouCan:
            "Now you can compare parts-to-parts and \nparts-to-whole with confidence!",
          toGoStartOver: "To go over the activity again, tap on ‘Start Over’.",
        },
        buttons: {
          start: "START",
          previous: "«",
          next: "»",
          startOver: "START OVER",
        },
        chartHeading: {
          surveyHeading:
            "Survey results of students’ \nmodes of transport to school",
          car: "Car",
          walk: "Walk",
          bus: "Bus",
        },
        navigations: {
          tapTheRatios: "Tap the option that shows the correct ratio.",
          tapContinue: "Tap Next » to Continue.",
        },
        questionOne: {
          question:
            "What is the ratio of students traveling by car to those traveling by bus?",
        },
        carToBus: {
          success:
            "Excellent! 7 : 12 is the required ratio of students travel by \ncar to bus.",
          errorOne:
            "Oops! This is bus to car ratio, not car to bus. \nTry again.",
          errorTwo: "Not quite! We need car first, then bus. \nTry again.",
          errorThree:
            "Not quite! The number of students travel by bus is not 19. \nTry again.",
        },
        questionTwo: {
          question:
            "What is the ratio of students who walk to those who travel by car?",
        },
        carToWalk: {
          success:
            "Excellent! 17 : 7 is the ratio of students walking to those \ntraveling by car.",
          errorOne:
            "Oops! This shows car to walking ratio, not walking to car. \nTry again!",
          errorTwo:
            "Not quite! The number of students travel by car is not 12.\nTry again.",
          errorThree:
            "Not quite! The number of students go by walking is not 12.\nTry again!",
        },
        questionThree: {
          question:
            "What is the ratio of students who walk to the total number of students?",
        },
        walkToTotal: {
          success:
            "Excellent! 17 : 36 is the ratio of students go by walking to the total students",
          errorOne:
            "Not quite! The total number of students is not 26.\nTry again.",
          errorTwo:
            "Not quite! The number of students go by walking is not 7.\nTry again.",
          errorThree:
            "Not quite! The number of students go by walking is not 7. \nTry again!",
        },
        questionFour: {
          question:
            "What is the ratio of students traveling by bus to the total number of students?",
        },
        busToTotal: {
          success:
            "Excellent! 12 : 36 is the ratio of students go by bus to the total students",
          errorOne:
            "Not quite! We need students go by bus first, then total students.Try again.",
          errorTwo:
            "Not quite! The number of students go by bus is not 17.\nTry again.",
          errorThree:
            "Not quite! We need students go by bus first, then total students.\nTry again.",
        },
      },
    },
  },
});

export default i18n;
