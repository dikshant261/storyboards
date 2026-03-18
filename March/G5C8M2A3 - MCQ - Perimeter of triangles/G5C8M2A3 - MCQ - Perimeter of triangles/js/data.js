// data.js - Internationalization data for the Ratio Learning Applet
// Contains only the text content that's actually used in the ratio app

const highlightColor1 = "#FFD700";
const highlightColor2 = "#70ACC7";
const highlightColor3 = "#F28283";
const highlightColor4 = "#00FF7F";
const highlightColor5 = '#8A2BE2';

const questionTextSize = '24gc';

const AppData = {
    // Current language setting
    currentLanguage: "en",

    // Text content by language
    translations: {
        en: {
            appInfo: {
                title: "Ratio - Komodo Distance Comparison"
            },
            messages: {
                pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
                nextButtonPage2: "Dispatched page change event to page 2",
                previousButtonPage1: "Dispatched page change event to page 1"
            },

            buttons: {
                next: "»",
                previous: "«",
                startOver: "Start Over",
                start: 'Start'
            },

            common: {
                questionText: "Given an isosceles right triangle △ABC with ∠C = 90° and AB = 15$\\sqrt{2}$ cm.<br><br>Calculate the length of AC.",
                questionIcon: "Q",
                komangToLucas: "Komang to Lucas",
                tapAnimationAlt: "Tap",
                imageAlt: {
                    leftArrow: "Left Arrow"
                },
                labels: {
                    dropHere: "Drop here"
                },
                informationAnalysis: {
                    header: "INFORMATION ANALYSIS",
                    facts: "Facts",
                    values: "Value",
                    toFind: "To Find"
                },
                conceptSummary: {
                    header: "CONCEPT SUMMARY",
                    given: "Given",
                    toFind: "To Find",
                    keyConcepts: "Key Concepts",
                    importantFormulae: "Calculations"
                }
            },

            components: {
                informationAnalysis: {
                    headerText: "INFORMATION ANALYSIS",
                    factsTitle: "Facts",
                    valueTitle: "Value",
                    toFindTitle: "To Find"
                },
                conceptSummary: {
                    headerText: "CONCEPT SUMMARY",
                    givenTitle: "Given",
                    toFindTitle: "To Find",
                    keyConceptsTitle: "Key Concepts",
                    importantFormulaeTitle: "Calculations"
                }
            },

            pages: {
                page1: {
                    headerText: "Perimeter of Triangles",
                    mainText: 'Let’s add the lengths of all three sides of the triangle  to find its perimeter.<br/><br/>Tap “Start” to start the activity.'
                },
                page2: {
                    headerText: "Let’s find the perimeter of the given triangle.",
                    footerInstruction: "Tap the correct answer.",
                    instructionAfterQuiz: 'Tap » to continue.',
                    quizPanel: {
                        quizSubType: 'QT4R',
                        questionText: "What is the perimeter of the given triangle?",
                        options: [
                            {
                                text: "13 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "11 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "18 cm",
                                feedback: "Awesome",
                                iscorrect: true
                            },
                            {
                                text: "19 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                        ]
                    },

                },
                page3: {
                    headerText: "Let’s find the perimeter of the given triangle.",
                    footerInstruction: "Tap the correct answer.",
                    instructionAfterQuiz: 'Tap » to continue.',

                    quizPanel: {
                        quizSubType: 'QT4R',
                        questionText: "What is the perimeter of the given triangle?",
                        options: [
                            {
                                text: "10 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "15 cm",
                                feedback: "Awesome",
                                iscorrect: true

                            },
                            {
                                text: "5 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "20 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                        ]
                    },

                },
                page4: {
                    headerText: "Let’s find the perimeter of the given triangle.",
                    instructionAfterQuiz: 'Tap » to continue.',

                    footerInstruction: "Tap the correct answer.",
                    quizPanel: {
                        quizSubType: 'QT4R',
                        questionText: "What is the perimeter of the given triangle?",
                        options: [
                            {
                                text: "13 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },

                            {
                                text: "17 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "12 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "21 cm",
                                feedback: "Awesome",
                                iscorrect: true

                            },
                        ]
                    },

                },
                page5: {
                    headerText: "Let’s find the perimeter of the given triangle.",

                    instructionAfterQuiz: 'Tap » to continue.',
                    footerInstruction: "Tap the correct answer.",
                    quizPanel: {
                        quizSubType: 'QT4R',
                        questionText: "What is the perimeter of the given triangle?",
                        options: [
                            {
                                text: "15 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "24 cm",
                                feedback: "Awesome",
                                iscorrect: true

                            },
                            {
                                text: "18 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "25 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },

                        ]
                    },

                },
                page6: {
                    headerText: "Let’s find the perimeter of the given triangle.",
                    instructionAfterQuiz: 'Tap » to continue.',

                    footerInstruction: "Tap the correct answer.",
                    quizPanel: {
                        quizSubType: 'QT4R',
                        questionText: "What is the perimeter of the given triangle?",
                        options: [
                            {
                                text: "19 cm",
                                feedback: "Awesome",
                                iscorrect: true

                            },
                            {
                                text: "12 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },

                            {
                                text: "14 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },
                            {
                                text: "20 cm",
                                feedback: "Not correct. Try again!",
                                iscorrect: false
                            },

                        ]
                    },

                },
                page7: {
                    headerText: "Activity Completed!",
                    mainText: 'We practiced adding the lengths of all three sides of the triangle to find its perimeter.<br/><br/>Tap “Start Over” to restart the activity.'
                },
            },
        },
        id: {
            appInfo: {
                title: "Rasio - Perbandingan Jarak Komodo"
            },

            messages: {
                pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
                nextButtonPage2: "Event perubahan halaman dikirim ke halaman 2",
                previousButtonPage1: "Event perubahan halaman dikirim ke halaman 1"
            },

            buttons: {
                next: "»",
                previous: "«",
                startOver: "Mulai Ulang",
                start: "Mulai"
            },

            common: {
                questionText: "Diberikan segitiga siku-siku sama kaki △ABC dengan ∠C = 90° dan AB = 15$\\sqrt{2}$ cm.<br><br>Hitung panjang AC.",
                questionIcon: "Q",
                komangToLucas: "Komang ke Lucas",
                tapAnimationAlt: "Ketuk",
                imageAlt: {
                    leftArrow: "Panah Kiri"
                },
                labels: {
                    dropHere: "Letakkan di sini"
                },
                informationAnalysis: {
                    header: "ANALISIS INFORMASI",
                    facts: "Fakta",
                    values: "Nilai",
                    toFind: "Yang Dicari"
                },
                conceptSummary: {
                    header: "RINGKASAN KONSEP",
                    given: "Diketahui",
                    toFind: "Yang Dicari",
                    keyConcepts: "Konsep Utama",
                    importantFormulae: "Perhitungan"
                }
            },

            components: {
                informationAnalysis: {
                    headerText: "ANALISIS INFORMASI",
                    factsTitle: "Fakta",
                    valueTitle: "Nilai",
                    toFindTitle: "Yang Dicari"
                },
                conceptSummary: {
                    headerText: "RINGKASAN KONSEP",
                    givenTitle: "Diketahui",
                    toFindTitle: "Yang Dicari",
                    keyConceptsTitle: "Konsep Utama",
                    importantFormulaeTitle: "Perhitungan"
                }
            },

            pages: {
                page1: {
                    headerText: "Keliling Segitiga",
                    mainText: 'Mari kita jumlahkan panjang ketiga sisi segitiga untuk menemukan kelilingnya.<br/><br/>Ketuk "Mulai" untuk memulai aktivitas.'
                },

                page2: {
                    headerText: "Mari kita cari keliling segitiga yang diberikan.",
                    footerInstruction: "Ketuk jawaban yang benar.",
                    instructionAfterQuiz: 'Ketuk » untuk melanjutkan.',
                    quizPanel: {
                        quizSubType: "QT4R",
                        questionText: "Berapa keliling segitiga yang diberikan?",
                        options: [
                            { text: "13 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "11 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "18 cm", feedback: "Hebat!", iscorrect: true },
                            { text: "19 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false }
                        ]
                    }
                },

                page3: {
                    headerText: "Mari kita cari keliling segitiga yang diberikan.",
                    footerInstruction: "Ketuk jawaban yang benar.",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
                    quizPanel: {
                        quizSubType: "QT4R",
                        questionText: "Berapa keliling segitiga yang diberikan?",
                        options: [
                            { text: "10 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "15 cm", feedback: "Hebat!", iscorrect: true },
                            { text: "5 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "20 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false }
                        ]
                    }
                },

                page4: {
                    headerText: "Mari kita cari keliling segitiga yang diberikan.",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
                    footerInstruction: "Ketuk jawaban yang benar.",
                    quizPanel: {
                        quizSubType: "QT4R",
                        questionText: "Berapa keliling segitiga yang diberikan?",
                        options: [
                            { text: "13 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "17 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "12 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "21 cm", feedback: "Hebat!", iscorrect: true }
                        ]
                    }
                },

                page5: {
                    headerText: "Mari kita cari keliling segitiga yang diberikan.",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
                    footerInstruction: "Ketuk jawaban yang benar.",
                    quizPanel: {
                        quizSubType: "QT4R",
                        questionText: "Berapa keliling segitiga yang diberikan?",
                        options: [
                            { text: "15 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "24 cm", feedback: "Hebat!", iscorrect: true },
                            { text: "18 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "25 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false }
                        ]
                    }
                },

                page6: {
                    headerText: "Mari kita cari keliling segitiga yang diberikan.",
                    instructionAfterQuiz: "Ketuk » untuk melanjutkan.",
                    footerInstruction: "Ketuk jawaban yang benar.",
                    quizPanel: {
                        quizSubType: "QT4R",
                        questionText: "Berapa keliling segitiga yang diberikan?",
                        options: [
                            { text: "19 cm", feedback: "Hebat!", iscorrect: true },
                            { text: "12 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "14 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false },
                            { text: "20 cm", feedback: "Belum benar. Coba lagi!", iscorrect: false }
                        ]
                    }
                },

                page7: {
                    headerText: "Aktivitas Selesai!",
                    mainText: 'Kita telah berlatih menjumlahkan panjang ketiga sisi segitiga untuk menemukan kelilingnya.<br/><br/>Ketuk "Mulai Ulang" untuk memulai kembali aktivitas.'
                }
            }
        }

    },
};

// Indonesian ('id') translations are defined explicitly above.

// Simple i18n utility functions
const i18n = {
    // Get translated text
    t: (key, params = {}) => {
        const lang = AppData.currentLanguage;
        const translation = AppData.translations[lang];

        // Navigate through nested object using dot notation
        const keys = key.split(".");
        let value = translation;
        let found = true;

        for (const k of keys) {
            if (value && typeof value === "object" && k in value) {
                value = value[k];
            } else {
                found = false;
                break;
            }
        }

        // If not found in current language, try English fallback
        if (!found) {
            value = AppData.translations.en;
            for (const fallbackKey of keys) {
                if (value && typeof value === "object" && fallbackKey in value) {
                    value = value[fallbackKey];
                } else {
                    return `[Missing: ${key}]`;
                }
            }
        }

        // If value is undefined or null, return missing message
        if (value === undefined || value === null) {
            return `[Missing: ${key}]`;
        }

        // Replace parameters in string
        if (typeof value === "string") {
            return value.replace(/\{(\w+)\}/g, (match, param) => {
                return params.hasOwnProperty(param) ? params[param] : match;
            });
        }

        // Return value as-is (could be array, object, number, boolean, etc.)
        return value;
    },

    // Set the current language
    setLanguage: (langCode) => {
        console.log(`🌐 Attempting to set language to: ${langCode}`);
        console.log(`🌐 Available languages:`, Object.keys(AppData.translations));
        console.log(`🌐 Current language before change:`, AppData.currentLanguage);

        if (AppData.translations[langCode]) {
            AppData.currentLanguage = langCode;
            console.log(`✅ Language successfully set to: ${langCode}`);
            console.log(`🌐 Current language after change:`, AppData.currentLanguage);
            return true;
        } else {
            console.warn(
                `❌ Language '${langCode}' not supported. Available languages:`,
                Object.keys(AppData.translations)
            );
            return false;
        }
    },

    // Get the current language
    getCurrentLanguage: () => {
        return AppData.currentLanguage;
    },

    // Initialize language system (placeholder for compatibility)
    initLanguage: () => {
        console.log("🌐 i18n system initialized");
        return true;
    },

    // Helper function to get page data
    getPageData: (pageNumber) => {
        const lang = AppData.currentLanguage;
        const translation = AppData.translations[lang];

        if (translation.pages && translation.pages[`page${pageNumber}`]) {
            return translation.pages[`page${pageNumber}`];
        }

        // Fallback to English
        const enTranslation = AppData.translations.en;
        if (enTranslation.pages && enTranslation.pages[`page${pageNumber}`]) {
            return enTranslation.pages[`page${pageNumber}`];
        }

        return null;
    },
};

// Make i18n globally available
window.i18n = i18n;
