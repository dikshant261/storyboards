// data.js - Internationalization data for the Equivalent Fractions Learning Applet
// Contains only the text content that's actually used in the equivalent fractions app

const AppData = {
    // Current language setting
    currentLanguage: 'id', // Default to Indonesian
   
    // Available languages
    languages: {
        en: { name: 'English', code: 'en' },
        id: { name: 'Bahasa Indonesia', code: 'id' }
    },
   
    // Text content by language
    translations: {
        en: {
            // App title
            appTitle: "Equivalent Fractions Learning",
           
            // App info
            appInfo: {
                title: "Equivalent Fractions Learning"
            },
           
            // Button text
            buttons: {
                next: "»",
                previous: "«",
                start: "START",
                check: "CHECK",
                nextQuestion: "Next Question",
                startOver: "Start Over",
                next_btn:"NEXT"
            },
           
            // Dialog texts
            dialogs: {
                numberPad: {
                    showHint: "💡 Show Hint",
                    hideHint: "🔆 Hide Hint",
                    check: "CHECK",
                    hint: "Equivalent fractions are created by multiplying or dividing both numerator and denominator by the same number."
                }
            },
           
            // Page configuration text
            pages: {
                // Common text
                common: {
                    equivalentFractions: "Equivalent Fractions",
                    weMultiply: "When we multiply both the numerator and \ndenominator of a fraction by the same number,\n the value of the fraction stays the same — this\n creates an equivalent fraction.",
                    letFind: "Let's find the number we need to multiply them by to get the new fraction.",
                    hereAre: "Here are two equivalent fractions. Let's find the number to multiply the numerator and denominator of ",
                    toGet: "to get\n",
                    tapNext: "Tap next to continue.",
                    whatNumberShould: "By what number should the numerator and denominator of the fraction",
                    multipliedToGet: "multiplied to get the equivalent fraction",
                    tapNumber: "Tap the correct number.",
                    nextContinue: "Tap next to continue.",
                    greatWork: "Great work! Multiplying the numerator and denominator of",
                    givesIt: "by {count} gives its equivalent fraction",
                    nowItTime: "Now, it's time to divide the numerator and denominator of the fraction by the same number to get new fractions that represent the same value.",
                    letFindDivide: "Here are two equivalent fractions. Let's find the number to divide the numerator and denominator of",
                    divideError: "Not quite! Dividing both {num} and {deno} by {result} doesn't give us ",
                    divideErrorTwo: "Try finding a number that divides both evenly.",
                    greatWorkDivide: "Great work! Dividing the numerator and denominator of ",
                    greatWorkDivideTwo: "by {count} gives its equivalent fraction",
                    greatYouHaveLearned: "Great job! You've learned that multiplying or dividing the numerator and denominator of the fraction by the same number creates an equivalent fraction.",
                    divideEquation: "be divided to get the equivalent fraction",
                    minusSign: "-",
                    equalSign: "="
                },
               
                // Page 1
                page1: {
                    tapStart: "Tap Start",
                    startButton: "Start"
                },
               
                // Page 2
                page2: {
                    tapContinue: "Tap Continue",
                    continueButton: "Continue"
                },
            },
           
            // Error messages
            errors: {
                errorMessage: "Not quite! {num} × {result} = {multiply}, not {num_result}, and {deno} × {result_one} = {multiplyTwo}, not {deno_result}. Multiply the numerator and denominator by the number that gives the new fraction"
            }
           
        },
       
        id: {
            // App title
            appTitle: "Pembelajaran Pecahan Setara",
           
            // App info
            appInfo: {
                title: "Pembelajaran Pecahan Setara"
            },
           
            // Button text
            buttons: {
                next: "»",
                previous: "«",
                start: "MULAI",
                check: "PERIKSA",
                nextQuestion: "Pertanyaan Selanjutnya",
                startOver: "Mulai Lagi",
                next_btn:"Berikutnya"
            },
           
            // Dialog texts
            dialogs: {
                numberPad: {
                    showHint: "💡 Tampilkan Petunjuk",
                    hideHint: "🔆 Sembunyikan Petunjuk",
                    check: "PERIKSA",
                    hint: "Pecahan setara dibuat dengan mengalikan atau membagi pembilang dan penyebut dengan angka yang sama."
                }
            },
           
            // Page configuration text
            pages: {
                // Common text
                common: {
                    EquivalentFractions: "Pecahan Setara",
                    weMultiply: "Ketika kita mengalikan pembilang dan penyebut dari suatu pecahan dengan angka yang sama, nilai pecahan tetap sama — ini menghasilkan pecahan senilai.",
                    letFind: "Mari kita cari angka yang perlu kita kalikan agar mendapatkan pecahan baru.",
                    hereAre: "Berikut dua pecahan senilai. Mari kita cari angka untuk mengalikan pembilang dan penyebut dari ",
                    toGet: "untuk mendapatkan\n",
                    tapNext: "Ketuk berikutnya untuk melanjutkan.",
                    whatNumberShould: "Dengan angka berapa pembilang dan penyebut dari pecahan harus dikalikan untuk mendapatkan pecahan senilai?",
                    multipliedToGet: "dikalikan untuk mendapatkan pecahan senilai",
                    tapNumber: "Ketuk angka yang benar.",
                    nextContinue: "Ketuk berikutnya untuk melanjutkan.",
                    greatWork: "Kerja bagus! Mengalikan pembilang dan penyebut dari",
                    givesIt: "dengan {count} menghasilkan pecahan senilai",
                    nowItTime: "Sekarang, saatnya membagi pembilang dan penyebut dari pecahan dengan angka yang sama untuk mendapatkan pecahan baru yang mewakili nilai yang sama.",
                    letFindDivide: "Berikut dua pecahan senilai. Mari kita cari angka untuk membagi pembilang dan penyebut dari",
                    divideError: "Belum tepat! Membagi {num} dan {deno} dengan {result} tidak menghasilkan ",
                    divideErrorTwo: "Cobalah cari angka yang dapat membagi keduanya dengan tepat.",
                    greatWorkDivide: "Kerja bagus! Membagi pembilang dan penyebut dari ",
                    greatWorkDivideTwo: "dengan {count} menghasilkan pecahan senilai",
                    greatYouHaveLearned: "Kerja bagus! Kamu telah belajar bahwa mengalikan atau membagi pembilang dan penyebut dari pecahan dengan angka yang sama akan menghasilkan pecahan senilai.",
                    divideEquation: "dibagi untuk mendapatkan pecahan senilai",
                    minusSign: "-",
                    equalSign: "=",

                },
               
                // Page 1
                page1: {
                    tapStart: "Ketuk Mulai",
                    startButton: "Mulai"
                },
               
                // Page 2
                page2: {
                    tapContinue: "Ketuk Lanjutkan",
                    continueButton: "Lanjutkan"
                },
            },
           
            // Error messages
            errors: {
                errorMessage: "Belum tepat! {num} × {result} = {multiply}, bukan {num_result}, dan {deno} × {result_one} = {multiplyTwo}, bukan {deno_result}. Kalikan pembilang dan penyebut dengan angka yang menghasilkan pecahan baru."
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
