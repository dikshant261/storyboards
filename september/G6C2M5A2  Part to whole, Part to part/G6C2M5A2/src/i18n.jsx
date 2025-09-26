import i18n, { t } from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en", // default language
  fallbackLng: "en",
  resources: {
    en: {
      translation: {
        startEndPage: {
          ExploringRatios: "Exploring Ratios",
          LetPracticeFinding:
            "Let’s practice finding part to part and part to whole ratios!",
          clickStart: "Click ‘Start’ to begin.",

          activityCompleted: "Activity Completed!",
          youHaveIdentified:
            "You have identified the required part-to-part and part-to-whole ratios.",
          tapStartOver: "To go over the activity again, tap on ‘Start Over’.",
        },
        buttons: {
          start: "START",
          previous: "«",
          next: "»",
          startOver: "START OVER",
        },
        main: {
          representingRation: "Represent the ratio as required.",
          tapTheRatios:
            "Tap one of the ratios given to fill the highlighted box.",
          tapProceed: "Tap ▶ to proceed.",
          tapContinue: "Tap Next ▶ to Continue.",
        },
        error: {
          tryAgain: "Try Again",
        },
        marbleBoxesContent: {
          yellowToGreen: "Yellow to green \nmarbles",
          greenToYellow: "Green to yellow \nmarbles",
          yellowToTotal: "Yellow to total \nmarbles",
        },
        triangleBoxContent: {
          squareToTotal: "Squares to total\nshapes",
          squareToTriangle: "Squares to \ntriangles",
          triangleToTotal: "Triangles to total \nshapes",
        },
        circleBoxContent: {
          rectanglesToCircles: "Rectangles to \ncircles",
          circleToShapes: "Circles to total \nshapes",
          rectangleToShape: "Rectangles to total \nshapes",
        },
        triangleContent: {
          succesOne: "Great! 4 : 10 is the ratio of squares to total shapes.",
          succesTwo: "Excellent! 4 : 6 is the ratio of squares to triangles.",
          succesThree:
            "Well done! 6 : 10 is the ratio of triangles to total shapes.",
        },
        marblesSucces: {
          succesOne: "Great! 3 : 5 is the ratio of yellow to green marbles.",
          succesTwo:
            "Excellent! 5 : 3 is the ratio of green to yellow marbles.",
          succesThree:
            "Well done! 3 : 8 is the ratio of yellow to total marbles.",
        },
        circleSuccess: {
          succesOne: "Great! 5 : 7 is the ratio of rectangles to circles.",
          succesTwo: "Great! 7 : 12 is the ratio of circles to total shapes.",
          succesThree:
            "Well done! 5 : 12 is the ratio of rectangles to total shapes.",
        },
        chitraContent: {
          question:
            "Citra has 8 pink beads and 11 blue beads \non her necklace.",

          pinkToTotal: "Pink to total \nbeads",
          blueToTotal: "Blue to total \nbeads",
          blueToPink: "Blue to pink\nbeads",
        },
        chitraSuccess: {
          succesOne: "Great! 8 : 19 is the ratio of pink to total beads.",
          succesTwo: "Great! 11 : 19 is the ratio of blue to total beads.",
          succesThree: "Great! 11 : 8 is the ratio of blue to pink beads.",
        },
      },
    },
  },
});

export default i18n;
