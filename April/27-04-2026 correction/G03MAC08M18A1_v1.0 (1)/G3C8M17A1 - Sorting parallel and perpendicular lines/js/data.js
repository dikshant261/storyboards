// data.js - Internationalization data for the Subtraction Learning Applet
// Contains only the text content that's actually used in the subtraction app

const AppData = {
    // Current language setting
    currentLanguage: 'en',

    // Text content by language
    translations: {
        en: {
            appInfo: {
                title: "Sort Parallel and Perpendicular Lines"
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
                questionCompleteFeedback: "Well done! You have sorted all parallel and perpendicular lines."
            },

            debug: {
                pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?",
                testFeedbackCorrect: "Test correct feedback!",
                testFeedbackIncorrect: "Test incorrect feedback!"
            },
            Questions: [
                {
                    image1: { imagePath: "qs1.png", category: "parallel" },
                    image2: { imagePath: "qs2.png", category: "neither" },
                    image3: { imagePath: "qs3.png", category: "perpendicular" },
                    image4: { imagePath: "qs4.png", category: "perpendicular" },
                    image5: { imagePath: "qs5.png", category: "parallel" },
                    image6: { imagePath: "qs6.png", category: "perpendicular" },
                    image7: { imagePath: "qs7.png", category: "neither" },
                    image8: { imagePath: "qs8.png", category: "parallel" },
                }
            ],

            pages: {
                page1: {
                    header: "Sort Parallel and Perpendicular Lines",
                    mainText: "Let us practice sorting parallel<br/> and perpendicular lines.<br/><br/>Tap ‘Start’ to begin the lesson.",
                    startButton: "Start"
                },
                page2: {
                    header: "Sort Parallel and Perpendicular Lines",
                    instructionText: "Say your answer, then drag each picture into the correct box—parallel lines or perpendicular lines.",
                    continueText: "Tap » to continue",
                    dropZone1Label: "Parallel Lines",
                    dropZone2Label: "Perpendicular Lines",
                    unsortedEmptyMessage: "Hurray! We have sorted parallel and perpendicular lines correctly.",
                    correctPolygonFeedback: "Correct! These are parallel lines.",
                    correctCurvedFeedback: "Correct! These are perpendicular lines.",
                    incorrectPolygonFeedback: "These are not parallel lines.",
                    incorrectCurvedFeedback: "These are not perpendicular lines."
                },

                page3: {
                    header: "Activity Completed",
                    greatText: "Great!",
                    mainText: "You learned to identify parallel and perpendicular lines in everyday life!",
                    startOverButton: "Start Over"
                }
            }
        },

        id: {
            appInfo: {
                title: "Mengelompokkan Garis Sejajar dan Garis Tegak Lurus"
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
                questionCompleteFeedback: "Bagus sekali! Kamu telah mengurutkan semua garis sejajar dan garis tegak lurus."
            },

            debug: {
                pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?",
                testFeedbackCorrect: "Tes: pesan benar!",
                testFeedbackIncorrect: "Tes: pesan salah!"
            },

            Questions: [
                {
                    image1: { imagePath: "qs1.png", category: "parallel" },
                    image2: { imagePath: "qs2.png", category: "neither" },
                    image3: { imagePath: "qs3.png", category: "perpendicular" },
                    image4: { imagePath: "qs4.png", category: "perpendicular" },
                    image5: { imagePath: "qs5.png", category: "parallel" },
                    image6: { imagePath: "qs6.png", category: "perpendicular" },
                    image7: { imagePath: "qs7.png", category: "neither" },
                    image8: { imagePath: "qs8.png", category: "parallel" },
                }
            ],

            pages: {
                page1: {
                    header: "Mengelompokkan Garis Sejajar dan Garis Tegak Lurus",
                    mainText: "Mari kita berlatih mengelompokkan garis sejajar<br/>dan garis tegak lurus.<br/><br/>Ketuk 'Mulai' untuk memulai pelajaran.",
                    startButton: "Mulai"
                },

                page2: {
                    header: "Urutkan Garis Sejajar dan Garis Tegak Lurus",
                    instructionText: "Sebutkan jawabanmu, lalu seret setiap gambar ke kotak yang benar—garis sejajar atau garis tegak lurus.",
                    continueText: "Ketuk » untuk melanjutkan",
                    dropZone1Label: "Garis Sejajar",
                    dropZone2Label: "Garis Tegak Lurus",
                    unsortedEmptyMessage: "Hore! Kita telah mengelompokkan garis sejajar dan garis tegak lurus dengan benar.",
                    correctPolygonFeedback: "Benar! Ini adalah garis sejajar.",
                    correctCurvedFeedback: "Benar! Ini adalah garis tegak lurus.",
                    incorrectPolygonFeedback: "Ini bukan garis sejajar.",
                    incorrectCurvedFeedback: "Ini bukan garis tegak lurus."
                },

                page3: {
                    header: "Aktivitas Selesai",
                    greatText: "Hebat!",
                    mainText: "Kamu sudah belajar mengenali garis sejajar dan garis tegak lurus dalam kehidupan sehari-hari!",
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