// data.js - Internationalization data for the Fraction Multiplication Learning Applet
// Contains all text content used in the fraction multiplication app

const AppData = {
    // Current language setting
    currentLanguage: 'en',

    // Available languages
    languages: {
        en: { name: 'English', code: 'en' },
        id: { name: 'Bahasa Indonesia', code: 'id' }
    },

    // Text content by language
    translations: {
        en: {
            // App title
            appTitle: "Fraction Multiplication Learning",

            // App info
            appInfo: {
                title: "Fraction Multiplication Learning"
            },

            // Button text
            buttons: {
                next: "»",
                previous: "«",
                start: "START",
                check: "CHECK",
                nextQuestion: "Next Question",
                startOver: "Start Over"
            },

            // Start page content
            startPage: {
                repeatedAddition: "Repeated addition as Multiplication",
                repeatedAdditionHeadingOne: "Repeated Addition is easily\nrepresented in math as Multiplication.",
                repeatedAdditionHeadingTwo: "Let's see how repeatedly adding equal fractional parts\nconnects to multiplication of fractions.",
                startExplore: "Tap \"Start\" to explore.",
                start: "START"
            },

            // Scene content
            scenes: {
                letWriteMultiplication: "Let's write a multiplication sentence for the given addition sentence.",
                tapProceed: "Tap » to proceed.",
                addedRepeatedly: "Which one is added repeatedly?",
                tapAnswer: "Choose the correct answer.",
                tapContinue: "Tap » to continue.",
                howManyTimes: "How many times is ",
                added: "added?",
                multiplicationSentence: "Write the multiplication sentence for the addition sentence.",
                whatIsResult: "What is the result?",
                tapNextChallenge: 'Tap » to try a new challenge.'
            },

            // Error messages
            errors: {
                denominatorError: "Oops! You picked the denominator \ninstead of the \nfraction.",
                countError: "Oops! {count} is the 'count' of fractions. Which is the fraction being added \n{count} times?",
                goodGoing: "Good going!\nWe're adding ",
                repeatedly: "repeatedly",
                twoFifthError: "Oops! Double-check the number of {word}.",
                yesWeAdded: "Yes! We added",
                threeTimes: "{count} times.",
                wholeTwiceError: "Oops! You multiplied the whole twice instead of the whole and the numerator.",
                addOrMultiplyError: "Oops! Should we add or multiply the whole number and numerator?",
                addOrDivideError: "Oops! Should we divide or multiply the whole number and numerator?",
                wholeNumberSuccess: "Well done! The whole number is multiplied with the numerator.",
                theNumerator: "Oops! {count} times {num} in the numerator is not equal to {deno}.",
                wellDone: "Well done. ",
                addedTimesGives: "added {count} times\ngives"
            },

            // Fraction names
            fractions: {
                twoFifth: "two-fifths.",
                oneThirds: "one-thirds",
                fourFifths: "four-fifths",
                twoSevenths: " two-sevenths",
                oneSixths: "one-sixths.",
                threeTenths: "three-tenths."
            },

            // Activity complete
            activityComplete: {
                title: "Activity Completed!",
                forAnyAdditionSentence: "For any addition sentence,",
                multiplicationSentencesCanBeWrittenAs: "Multiplication sentences can be written as:",
                tapStartOverToRestart: "Tap \"Start Over\" to restart the activity.",
                startOver: "Start Over"
            },

            // Math terms
            mathTerms: {
                numerator: "Numerator",
                denominator: "Denominator",
                whole: "Whole"
            }
        },

        id: {
            // App title
            appTitle: "Pembelajaran Perkalian Pecahan",

            // App info
            appInfo: {
                title: "Pembelajaran Perkalian Pecahan"
            },

            // Button text
            buttons: {
                next: "»",
                previous: "«",
                start: "MULAI",
                check: "PERIKSA",
                nextQuestion: "Pertanyaan Selanjutnya",
                startOver: "Mulai Lagi"
            },

            // Start page content
            startPage: {
                repeatedAddition: "Penjumlahan berulang sebagai Perkalian",
                repeatedAdditionHeadingOne: "Penjumlahan Berulang mudah\ndiwakili dalam matematika sebagai Perkalian.",
                repeatedAdditionHeadingTwo: "Mari lihat bagaimana menambahkan bagian pecahan yang sama berulang kali\nterhubung dengan perkalian pecahan.",
                startExplore: "Ketuk \"Mulai\" untuk menjelajahi.",
                start: "MULAI"
            },

            // Scene content
            scenes: {
                letWriteMultiplication: "Mari tulis kalimat perkalian untuk kalimat penjumlahan yang diberikan.",
                tapProceed: "Ketuk selanjutnya untuk melanjutkan.",
                addedRepeatedly: "Mana yang ditambahkan berulang kali?",
                tapAnswer: "Pilih jawaban yang benar.",
                tapContinue: "Ketuk Selanjutnya untuk melanjutkan.",
                howManyTimes: "Berapa kali ",
                added: "ditambahkan?",
                multiplicationSentence: "Tulis kalimat perkalian untuk kalimat penjumlahan.",
                whatIsResult: "Apa hasilnya?"
            },

            // Error messages
            errors: {
                denominatorError: "Ups! Anda memilih penyebut \nbukan pecahan.",
                countError: "Ups! {count} adalah 'jumlah' pecahan. Pecahan mana yang ditambahkan \n{count} kali?",
                goodGoing: "Bagus!\n\nKita menambahkan",
                repeatedly: "berulang kali",
                twoFifthError: "Ups! Periksa kembali jumlah {word}.",
                yesWeAdded: "Ya! Kita menambahkan",
                threeTimes: "{count} kali.",
                wholeTwiceError: "Ups! Anda mengalikan bilangan bulat dua kali bukan bilangan bulat dan pembilang.",

                addOrMultiplyError: "Ups! Haruskah kita menambah atau mengalikan bilangan bulat dan pembilang?",
                addOrDivideError: "Ups! Haruskah kita membagi atau mengalikan bilangan bulat dan pembilangnya?",
                wholeNumberSuccess: "Bagus! Bilangan bulat dikalikan dengan pembilang.",
                theNumerator: "Ups! {count} kali {num} dalam pembilang tidak sama dengan {deno}.",
                wellDone: "Bagus. ",
                addedTimesGives: "ditambahkan {count} kali\nmenghasilkan"
            },

            // Fraction names
            fractions: {
                twoFifth: "dua-perlima.",
                oneThirds: "satu-pertiga",
                fourFifths: "empat-perlima",
                twoSevenths: " dua-per tujuh",
                oneSixths: "satu-per enam.",
                threeTenths: "tiga-per sepuluh."
            },

            // Activity complete
            activityComplete: {
                title: "Aktivitas Selesai!",
                forAnyAdditionSentence: "Untuk kalimat penjumlahan apa pun,",
                multiplicationSentencesCanBeWrittenAs: "Kalimat perkalian dapat ditulis sebagai:",
                tapStartOverToRestart: "Ketuk \"Mulai Lagi\" untuk memulai ulang aktivitas.",
                startOver: "Mulai Lagi"
            },

            // Math terms
            mathTerms: {
                numerator: "Pembilang",
                denominator: "Penyebut",
                whole: "Bilangan Bulat"
            }
        }
    },

    config: {
        backgroundColor: "#0F4760"
    }
};

// Simple i18n utility functions
const i18n = {
    // Get current language
    getCurrentLanguage: () => AppData.currentLanguage,

    // Set language
    setLanguage: (langCode) => {
        if (AppData.translations[langCode]) {
            AppData.currentLanguage = langCode;
            // Save to localStorage (use consistent key with index.html)
            localStorage.setItem('appLanguage', langCode);
            console.log(`🌐 i18n: Language set to ${langCode}`);
            return true;
        }
        console.warn(`🌐 i18n: Language ${langCode} not supported`);
        return false;
    },

    // Initialize language from localStorage
    initLanguage: () => {
        // Check for forced language first (from APP_CONFIG if available)
        if (typeof window.APP_CONFIG !== 'undefined' && window.APP_CONFIG.FORCE_LANGUAGE) {
            if (AppData.translations[window.APP_CONFIG.FORCE_LANGUAGE]) {
                AppData.currentLanguage = window.APP_CONFIG.FORCE_LANGUAGE;
                console.log(`🌐 i18n: Using forced language: ${window.APP_CONFIG.FORCE_LANGUAGE}`);
                return;
            }
        }

        // Otherwise use saved language
        const savedLang = localStorage.getItem('appLanguage');
        if (savedLang && AppData.translations[savedLang]) {
            AppData.currentLanguage = savedLang;
            console.log(`🌐 i18n: Using saved language: ${savedLang}`);
        } else {
            console.log(`🌐 i18n: Using default language: ${AppData.currentLanguage}`);
        }
    },

    // Get translated text
    t: (key, params = {}) => {
        const lang = AppData.currentLanguage;
        const translation = AppData.translations[lang];

        // Navigate through nested object using dot notation
        const keys = key.split('.');
        let value = translation;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English if translation not found
                value = AppData.translations.en;
                for (const fallbackKey of keys) {
                    if (value && typeof value === 'object' && fallbackKey in value) {
                        value = value[fallbackKey];
                    } else {
                        return `[Missing: ${key}]`;
                    }
                }
                break;
            }
        }

        // Replace parameters in string
        if (typeof value === 'string') {
            return value.replace(/\{(\w+)\}/g, (match, param) => {
                return params.hasOwnProperty(param) ? params[param] : match;
            });
        }

        return value || `[Missing: ${key}]`;
    },

    // Get available languages
    getLanguages: () => AppData.languages
};

// Make i18n globally available
window.i18n = i18n;

// Initialize immediately if APP_CONFIG is available
if (typeof window.APP_CONFIG !== 'undefined') {
    console.log('🌐 Immediate initialization with APP_CONFIG');
    i18n.initLanguage();
    if (window.APP_CONFIG.FORCE_LANGUAGE) {
        i18n.setLanguage(window.APP_CONFIG.FORCE_LANGUAGE);
        console.log('🌐 Immediate language set to:', window.APP_CONFIG.FORCE_LANGUAGE);
    }
}

// Legacy compatibility - maintain the old t() function for existing code
window.t = (key, params = {}) => {
    // Check if i18n is available
    if (typeof i18n === 'undefined') {
        console.warn('i18n not available, returning key:', key);
        return key;
    }

    // Map old keys to new structure
    const keyMappings = {
        'reapeatedAddition': 'startPage.repeatedAddition',
        'reapeatedAdditionHeadingOne': 'startPage.repeatedAdditionHeadingOne',
        'reapeatedAdditionHeadingTwo': 'startPage.repeatedAdditionHeadingTwo',
        'startExplore': 'startPage.startExplore',
        'start': 'startPage.start',
        'let_write_multilpication': 'scenes.letWriteMultiplication',
        'tap_proceed': 'scenes.tapProceed',
        'addesReapeatedly': 'scenes.addedRepeatedly',
        'tapAnswer': 'scenes.tapAnswer',
        'tapContinue': 'scenes.tapContinue',
        'denominatorError': 'errors.denominatorError',
        'countError': 'errors.countError',
        'goodGoing': 'errors.goodGoing',
        'repeatedly': 'errors.repeatedly',
        'how_many_times': 'scenes.howManyTimes',
        'added': 'scenes.added',
        'two_fifith_error': 'errors.twoFifthError',
        'two_fifth': 'fractions.twoFifth',
        'one_thirds': 'fractions.oneThirds',
        'four_fifths': 'fractions.fourFifths',
        'two_sevenths': 'fractions.twoSevenths',
        'one_sixths': 'fractions.oneSixths',
        'three_tenths': 'fractions.threeTenths',
        'yes_we_added': 'errors.yesWeAdded',
        'three_times': 'errors.threeTimes',
        'multiplicationSentance': 'scenes.multiplicationSentence',
        'wholeTwiceError': 'errors.wholeTwiceError',
        'add_or_multiplyError': 'errors.addOrMultiplyError',
        'add_or_divideError': "errors.addOrDivideError",
        'wholeNumberSuccess': 'errors.wholeNumberSuccess',
        'What is the result?': 'scenes.whatIsResult',
        'the_numerator': 'errors.theNumerator',
        'well_done': 'errors.wellDone',
        'added_times_gives': 'errors.addedTimesGives',
        'Start_Over': 'activityComplete.startOver',
        'Tap_Start_Over_to_restart_the_activity': 'activityComplete.tapStartOverToRestart',
        'Denominator': 'mathTerms.denominator',
        'Numerator': 'mathTerms.numerator',
        'Whole': 'mathTerms.whole',
        'Multiplication_sentences_can_be_written_as': 'activityComplete.multiplicationSentencesCanBeWrittenAs',
        'For_any_addition_sentence': 'activityComplete.forAnyAdditionSentence',
        'Activity Completed!': 'activityComplete.title',
        'tapNextChallenge': 'scenes.tapNextChallenge'
    };

    const mappedKey = keyMappings[key] || key;
    return i18n.t(mappedKey, params);
};
