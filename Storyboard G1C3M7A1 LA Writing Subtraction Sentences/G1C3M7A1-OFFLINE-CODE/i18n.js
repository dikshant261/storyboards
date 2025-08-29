// i18n.js

//important!📌 
//question, you change question from here but change
//according to this pattern "[total,cross,remaining]"
const question = [
  [5, 1, 4],
  [9, 3, 6],
  [5, 5, 0],
  [8, 0, 8],
  [8, 6, 2],
];

//content in english
const appData = {
  en: {
    translation: {
      hey: "Write the subtraction sentence for this picture.",
      begin: "Tap start to begin...",
      stepOne: "Step 1: Fill the Total",
      stepOneProcess:
        "The first number in a\n subtraction sentence is\n the total number of\n objects.",
      countTotal:
        "Count the total objects,\n then enter the number\n using the numpad and\n check.",
      stepTwo: "Step 2: Fill\n ‘to be subtracted’",
      countCross:
        "Count the number of\n crossed objects, then\n enter the number in the\n second box using the\n numpad and check.",
      stepThree: "Step 3: Fill\n ‘difference’",
      countDifference:
        "Count the remaining\n objects (not crossed),\n then enter that number\n using the numpad and\n check.",
      start: "Start",
      check: "Check",
      show: "Show",
      successOne:
        "Well Done! There\n are {{count}} objects in\n the picture…\nNow how many are\n crossed?",
      successTwo:
        "Well Done! There\n are {{count}} crossed\n objects in the\n picture…\nNow how many\n are not  crossed?",
      successThree:
        "Well Done!\n You have\n correctly entered\n the subtraction\n sentence.",
      tapNumber: "Tap the number and then tap check.",
      errorMessageSmall:
        "Oops! Smaller\n number…Count the total \n number of\n objects, whether\n crossed or not…",
      errorMessageBig:
        "Oops! Larger\n number…Count the total \n number of \n objects, whether\n crossed or not…",
      errorCrossMessaageSmall:
        "Oops! You have\n entered a smaller\n number…\nCount crossed\n objects and Try\n again…",
      errorCrossMessaageBig:
        "Oops! You have\n entered a larger\n number…\nCount crossed\n objects and Try\n again…",
      countErrorMessageSmall:
        "Oops! You have\n entered a smaller\n number…\nCount remaining \nobjects and Try\n again…",
      countErrorMessageBig:
        "Oops! You have\n entered a larger\n number…\nCount remaining \nobjects and Try \nagain…",
      subtractionSentance: "Writing subtraction sentences for\n pictures",
      nextBox: "Tap ▶ to fill the next box.",
      weWrite: "We write this as,",
      nextQuestion: "Tap ▶ to move to next question.",
      hintMessageTotal:
        "Count the total \nnumber of\n objects, whether\n crossed or not…",
      hintMessageCross: "Count the  number of crossed objects shown…",
      hintMessageLeft:
        "Count the \n number of \nremaining bjects \n (not crossed)",
    },
  },
};

// Current language comes from global APP_LANGUAGE set in index.html
const currentLang = window.APP_LANGUAGE || "en";

// Simple translator function
function t(key, params = {}) {
  let text =
    (appData[currentLang] && appData[currentLang].translation[key]) || key;
  Object.keys(params).forEach((p) => {
    text = text.replace(`{{${p}}}`, params[p]);
  });

  return text;
}

// Expose globally so all components can use it
window.t = t;

//expose globally
window.question = question;
