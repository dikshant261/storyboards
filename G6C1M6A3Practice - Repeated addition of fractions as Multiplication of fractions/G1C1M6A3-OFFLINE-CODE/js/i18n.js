// content in english
const appData = {
  en: {
    translation: {
      reapeatedAddition: "Repeated addition as Multiplication",
        reapeatedAdditionHeadingOne:
          "Repeated Addition is easily\nrepresented in math as Multiplication.",
        reapeatedAdditionHeadingTwo:
          "Let’s see how repeatedly adding equal fractional parts\nconnects to multiplication of fractions.",
        startExplore: "Tap “Start” to explore.",
        start: "START",
        let_write_multilpication:
          "Let’s write a multiplication sentence for the given addition sentence.",
        tap_proceed: "Tap next to proceed.",
        addesReapeatedly: "Which one is added repeatedly?",
        tapAnswer: "Choose the correct answer. ",
        tapContinue: "Tap Next to continue.",
        denominatorError:
          "Oops! You picked the denominator \ninstead of the \nfraction.",
        countError:
          "Oops! {{count}} is the ‘count’ of fractions. Which is the fraction being added \n{{count}} times?",
        goodGoing: "Good going!\n\nWe’re adding",
        repeatedly: "repeatedly",
        how_many_times: "How many times is ",
        added: "added?",
        two_fifith_error: "Oops! Double-check the number of {{word}}.",
        two_fifth:"two-fifths.",
        one_thirds:"one-thirds",
        four_fifths:"four-fifths",
        two_sevenths:" two-sevenths",
        one_sixths:"one-sixths.",
        three_tenths:"three-tenths.",
        yes_we_added: "Yes! We added",
        three_times: "{{count}} times.",
        multiplicationSentance:
          "Write the multiplication sentence for the addition sentence.",
        wholeTwiceError:
          "Oops! You multiplied the whole twice instead of the whole and the numerator.",
        add_or_multiplyError:
          "Oops! Should we add or multiply the whole number and numerator?",
        wholeNumberSuccess:
          "Well done! The whole number is multiplied with the numerator.",
        what_is_result: "What is the result?",
        try_next_challenge: "Tap Next to try a new challenge.",
        the_numerator:
          "Oops! {{count}} times {{num}} in the numerator is not equal to {{deno}}.",
        well_done: "Well done. ",
        added_times_gives: "added {{count}} times\ngives",
        Start_Over:"Start Over",
        Tap_Start_Over_to_restart_the_activity:"Tap “Start Over” to restart the activity.",
        Denominator:"Denominator",
        Numerator:"Numerator",
        Whole:"Whole",
        Multiplication_sentences_can_be_written_as:"Multiplication sentences can be written as:",
        For_any_addition_sentence:"For any addition sentence,",
        Activity_Completed:"Activity Completed!"
    },
  },
};

// Current language comes from global APP_LANGUAGE set in index.html
const currentLang = window.APP_LANGUAGE || "en";

// Helper: resolve nested keys like "storyOne.optionOne"
function getNested(obj, path) {
  return path.split(".").reduce((acc, key) => {
    return acc && acc[key] !== undefined ? acc[key] : null;
  }, obj);
}

// Translator function
function t(key, params = {}) {
  let text = getNested(appData[currentLang].translation, key) || key;

  // Replace variables if any (like {{count}})
  Object.keys(params).forEach((p) => {
    text = text.replace(`{{${p}}}`, params[p]);
  });

  return text;
}

// Expose globally so all components can use it
window.t = t;
