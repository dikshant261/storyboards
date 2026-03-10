// data.js - Internationalization data for the Subtraction Learning Applet
// Contains only the text content that's actually used in the subtraction app

const AppData = {
    // Current language setting
    currentLanguage: 'en',

    // Text content by language
    translations: {
        en: {
            appInfo: {
                title: "Sorting QUADRILATERALS"
            },

            buttons: {
                next: "»",
                previous: "«",
                startOver: "Start Over"
            },

            dropZone: {
                emptyMessage: "Drag images here"
            },

            feedback: {
                questionCompleteFeedback: "Well done! You have completed the question."
            },

            debug: {
                pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?"
            },
            Questions: [
                {
                    image1: { imagePath: "Slide 1/quadrilateral1.png", category: "quadrilateral" },
                    image2: { imagePath: "Slide 1/quadrilateral2.png", category: "quadrilateral" },
                    image3: { imagePath: "Slide 1/quadrilateral3.png", category: "quadrilateral" },
                    image4: { imagePath: "Slide 1/quadrilateral4.png", category: "quadrilateral" },
                    image5: { imagePath: "Slide 1/notQuadrilateral1.png", category: "notQuadrilateral" },
                    image6: { imagePath: "Slide 1/notQuadrilateral2.png", category: "notQuadrilateral" },
                    image7: { imagePath: "Slide 1/kite.png", category: "quadrilateral" },
                    image8: { imagePath: "Slide 1/circle.png", category: "notQuadrilateral" },
                },
            ],

            pages: {
                page1: {
                    header: "Sorting QUADRILATERALS",
                    mainText: "Let us sort shapes into quadrilateral <br/>or not quadrilaterals.<br/><br/>Tap ‘Start’ to begin the lesson.",
                    startButton: "Start"
                },
                page2: {
                    header: "Identify if the shape is quadrilateral or not",
                    instructionText: "Shoutout the answer and drag the shape to the correct box...",
                    continueText: "Tap » to continue",
                    dropZone1Label: "Quadrilateral",
                    dropZone2Label: "Not a Quadrilateral",
                    unsortedEmptyMessage: "Great job! All items sorted!",
                    correctPolygonFeedback: "Correct! This is a Quadrilateral.",
                    correctCurvedFeedback: "Correct! This is not a Quadrilateral.",
                    incorrectPolygonFeedback: "This is not a Quadrilateral.",
                    incorrectCurvedFeedback: "This is a Quadrilateral."
                },

                page3: {
                    header: "Activity Completed",
                    greatText: "Great!",
                    mainText: "You learned to identify quadrilaterals!",
                    startOverButton: "Start Over"
                }
            }
        },

        id: {
            appInfo: {
                title: "Mengelompokkan SEGIEMPAT"
            },

            buttons: {
                next: "»",
                previous: "«",
                startOver: "Mulai Ulang"
            },

            dropZone: {
                emptyMessage: "Seret gambar ke sini"
            },

            feedback: {
                questionCompleteFeedback: "Bagus sekali! Kamu telah menyelesaikan pertanyaan."
            },

            debug: {
                pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?"
            },

            Questions: [
                {
                    image1: { imagePath: "Slide 1/quadrilateral1.png", category: "quadrilateral" },
                    image2: { imagePath: "Slide 1/quadrilateral2.png", category: "quadrilateral" },
                    image3: { imagePath: "Slide 1/quadrilateral3.png", category: "quadrilateral" },
                    image4: { imagePath: "Slide 1/quadrilateral4.png", category: "quadrilateral" },
                    image5: { imagePath: "Slide 1/notQuadrilateral1.png", category: "notQuadrilateral" },
                    image6: { imagePath: "Slide 1/notQuadrilateral2.png", category: "notQuadrilateral" },
                    image7: { imagePath: "Slide 1/kite.png", category: "quadrilateral" },
                    image8: { imagePath: "Slide 1/circle.png", category: "notQuadrilateral" },
                },
            ],

            pages: {
                page1: {
                    header: "Mengelompokkan SEGIEMPAT",
                    mainText: "Mari kita mengelompokkan bentuk menjadi segiempat <br/>atau bukan segiempat.<br/><br/>Ketuk 'Mulai' untuk memulai pelajaran.",
                    startButton: "Mulai"
                },

                page2: {
                    header: "Tentukan apakah bentuk ini segiempat atau bukan",
                    instructionText: "Sebutkan jawabannya dan seret bentuk ke kotak yang benar...",
                    continueText: "Ketuk » untuk melanjutkan",
                    dropZone1Label: "Segiempat",
                    dropZone2Label: "Bukan Segiempat",
                    unsortedEmptyMessage: "Hebat! Semua item sudah dikelompokkan!",
                    correctPolygonFeedback: "Benar! Ini adalah Segiempat.",
                    correctCurvedFeedback: "Benar! Ini bukan Segiempat.",
                    incorrectPolygonFeedback: "Ini bukan Segiempat.",
                    incorrectCurvedFeedback: "Ini adalah Segiempat."
                },

                page3: {
                    header: "Aktivitas Selesai",
                    greatText: "Hebat!",
                    mainText: "Kamu sudah belajar mengenali segiempat!",
                    startOverButton: "Mulai Ulang"
                }
            }
        },


    }
};

// Helper function to get language-specific questions
const getQuestions = () => {
    const lang = AppData.currentLanguage || 'en';
    const translation = AppData.translations[lang];

    if (translation && translation.Questions) {
        return translation.Questions;
    }

    // Fallback to English questions
    return AppData.translations.en.Questions || [];
};

// Make getQuestions globally available
window.getQuestions = getQuestions;

// Simple i18n utility functions
const i18n = {

    // Get translated text
    t: (key, params = {}) => {
        const lang = AppData.currentLanguage;
        const translation = AppData.translations[lang];

        // Handle special cases for page object structure
        if (key.startsWith('subtraction.page')) {
            const pageMatch = key.match(/subtraction\.page(\d+)\.(.+)/);
            if (pageMatch) {
                const pageNum = pageMatch[1];
                const subKey = pageMatch[2];

                if (translation.pages && translation.pages[`page${pageNum}`]) {
                    const pageData = translation.pages[`page${pageNum}`];
                    let value = pageData[subKey];

                    // Replace parameters in string
                    if (typeof value === 'string') {
                        return value.replace(/\{(\w+)\}/g, (match, param) => {
                            return params.hasOwnProperty(param) ? params[param] : match;
                        });
                    }

                    return value || `[Missing: ${key}]`;
                }
            }
        }

        // Navigate through nested object using dot notation for other keys
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
            console.warn(`❌ Language '${langCode}' not supported. Available languages:`, Object.keys(AppData.translations));
            return false;
        }
    },

    // Get the current language
    getCurrentLanguage: () => {
        return AppData.currentLanguage;
    },

    // Initialize language system (placeholder for compatibility)
    initLanguage: () => {
        console.log('🌐 i18n system initialized');
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
    }
};

// Make i18n globally available
window.i18n = i18n;

// Get current language-specific questions and make them globally available
const updateGlobalQuestions = () => {
    const Questions = getQuestions();
    window.Questions = Questions;
    console.log(`✅ Questions loaded for language: ${AppData.currentLanguage}`, Questions);
    return Questions;
};

// Initialize Questions on load
updateGlobalQuestions();

// Override setLanguage to update Questions when language changes
const originalSetLanguage = i18n.setLanguage;
i18n.setLanguage = (langCode) => {
    const result = originalSetLanguage(langCode);
    if (result) {
        updateGlobalQuestions();
    }
    return result;
};

// Make updateGlobalQuestions available globally
window.updateGlobalQuestions = updateGlobalQuestions;