// data.js - Internationalization data for the Subtraction Learning Applet
// Contains only the text content that's actually used in the subtraction app

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
            appTitle: "Subtraction Learning",
            
            // App info
            appInfo: {
                title: "Subtraction Learning"
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
            
            // Dialog texts
                           dialogs: {
                numberPad: {
                    showHint: "💡 Show Hint",
                    hideHint: "🔆 Hide Hint",
                    check: "CHECK",
                    hint: "Subtraction sentences are written as: \"the whole – part taken away = part that is left\""
                }
            },
            
            // Subtraction app specific text
            subtraction: {
                // Page 1 text
                page1: {
                    definition: "Hey! Look at the picture.",
                    stepInstruction: "Let’s write the subtraction sentence that represents this picture.",
                    instructionHeader: "Tap Start to begin",
                    instructionHeaderCompleted: "Tap Next to continue",
                    feedback: {
                        correct: "Correct! You have removed {subtrahend} cars.",
                        tooFew: "Oops! You need to subtract {subtrahend}. Cross more cars and check…",
                        tooMany: "Oops! You have removed more than {subtrahend} cars. Try again…"
                    }
                },
                // Page 2 text
                page2: {
                    step1Text: "Writing subtraction sentences for pictures.",
                    step2Text: "For the given picture, fill the subtraction sentence using numpad and check.",
                    step1Completed: "✅ Step 1: There were {minuend} cars. We crossed and removed {subtrahend} of them to subtract {subtrahend} from {minuend}.",
                    step2Instruction: "Step 2: Count the number of remaining cars. Fill that number in the box and check.",
                    step3Text: "Writing subtraction sentences for pictures.",
                    step4Text: "• There are {minuend} cars in total.<br>• {subtrahend} car is removed/ crossed.<br>• Then, {answer} cars remain.",
                    step5Text: "We write this as,<br>{minuend} - {subtrahend} = {answer}",
                    totalCarsLabel: "Total cars",
                    crossedCarsLabel: "Crossed cars",
                    remainingCarsLabel: "Remaining cars",
                    step3Result: "Subtracting {subtrahend} from {minuend} gives {answer}.",
                    step4Explanation: "Also, if {subtrahend} is subtracted from {minuend}, then {answer} remains.",
                    instructionHeader: "Tap the correct number and then tap check.",
                    instructionHeaderCompleted: "Tap Next for the next challenge…",
                    answerEquation: "Subtracting {subtrahend} from {minuend} gives",
                    feedback: {
                        correct: "Well Done! You have correctly written subtraction sentence for this picture…",
                        bigger: "Oops! You have entered a bigger number…\nCount and Try again…",
                        smaller: "Oops! You have entered a smaller number…\nCount and Try again…",
                        fillBoth: "Please fill both values to check.",
                        fillAll: "Please fill all values to check.",
                        bothIncorrect: "Both values are incorrect. Try again!",
                        minuendIncorrect: "The first value is incorrect. Try again!",
                        subtrahendIncorrect: "The second value is incorrect. Try again!",
                        bothCaseIncorrect: "Oops! Count the total cars and cars that are crossed and cars left to write the subtraction sentence.",
                        tooFew: "Oops! There are more than {userAnswer} cars left…",
                        tooMany: "Oops! There are less than {userAnswer} cars left…"
                    }
                }
            }
        },
        
        id: {
            // App title
            appTitle: "Pembelajaran Pengurangan",
            
            // App info
            appInfo: {
                title: "Pembelajaran Pengurangan"
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
            
            // Dialog texts
                           dialogs: {
                numberPad: {
                    showHint: "💡 Tampilkan Petunjuk",
                    hideHint: "🔆 Sembunyikan Petunjuk",
                    check: "PERIKSA",
                    hint: "Hitung jumlah mobil yang disilang. Angka itu akan menunjukkan 'berapa banyak yang dikurangi'."
                }
            },
            
            // Subtraction app specific text
            subtraction: {
                // Page 1 text
                page1: {
                    definition: "Hei! Lihat gambarnya.",
                    stepInstruction: "Mari tulis kalimat pengurangan yang merepresentasikan gambar ini.",
                    instructionHeader: "Ketuk Mulai untuk memulai",
                    instructionHeaderCompleted: "Ketuk Selanjutnya untuk melanjutkan",
                    feedback: {
                        correct: "Benar! Anda telah menghapus {subtrahend} mobil.",
                        tooFew: "Ups! Anda perlu mengurangi {subtrahend}. Silang lebih banyak mobil dan periksa…",
                        tooMany: "Ups! Anda telah menghapus lebih dari {subtrahend} mobil. Coba lagi…"
                    }
                },
                // Page 2 text
                page2: {
                    step1Text: "Menulis kalimat pengurangan untuk gambar.",
                    step2Text: "Untuk gambar yang diberikan, isi kalimat pengurangan menggunakan numpad dan periksa.",
                    step1Completed: "✅ Langkah 1: Ada {minuend} mobil. Kami menyilang dan menghapus {subtrahend} dari mereka untuk mengurangi {subtrahend} dari {minuend}.",
                    step2Instruction: "Langkah 2: Hitung jumlah mobil yang tersisa. Isi angka itu di kotak dan periksa.",
                    step3Text: "Jika {subtrahend} objek disilang dari {minuend}, kita katakan bahwa",
                    step4Text: "• Ada {minuend} mobil secara total.<br>• {subtrahend} mobil dihapus/disilang.<br>• Kemudian, {answer} mobil tersisa.",
                    step5Text: "Kami menulisnya sebagai,<br>{minuend} - {subtrahend} = {answer}",
                    totalCarsLabel: "Total mobil",
                    crossedCarsLabel: "Mobil disilang",
                    remainingCarsLabel: "Mobil tersisa",
                    step3Result: "Mengurangi {subtrahend} dari {minuend} menghasilkan {answer}.",
                    step4Explanation: "Juga, jika {subtrahend} dikurangi dari {minuend}, maka {answer} tersisa.",
                    instructionHeader: "Ketuk angka yang benar lalu ketuk periksa.",
                    instructionHeaderCompleted: "Ketuk Selanjutnya untuk tantangan berikutnya…",
                    answerEquation: "Mengurangi {subtrahend} dari {minuend} menghasilkan",
                    feedback: {
                        correct: "Jawaban Benar!",
                        bigger: "Ups! Anda memasukkan angka yang lebih besar…\nHitung dan Coba lagi…",
                        smaller: "Ups! Anda memasukkan angka yang lebih kecil…\nHitung dan Coba lagi…",
                        fillBoth: "Silakan isi kedua nilai untuk memeriksa.",
                        bothIncorrect: "Kedua nilai salah. Coba lagi!",
                        minuendIncorrect: "Nilai pertama salah. Coba lagi!",
                        subtrahendIncorrect: "Nilai kedua salah. Coba lagi!",
                        bothCaseIncorrect: "Ups! Hitung total mobil dan mobil yang disilang, lalu isi dan periksa… Coba lagi…",
                        tooFew: "Ups! Ada lebih dari {userAnswer} mobil yang tersisa…",
                        tooMany: "Ups! Ada kurang dari {userAnswer} mobil yang tersisa…"
                    }
                }
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