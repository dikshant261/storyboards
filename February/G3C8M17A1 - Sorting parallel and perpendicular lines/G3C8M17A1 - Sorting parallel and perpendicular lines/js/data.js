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
                questionCompleteFeedback: "Well done! You have completed the question."
            },

            debug: {
                pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?"
            },
            Questions: [
                {
                    image1: { imagePath: "Slide 1/parallelLine1.png", category: "parallel" },
                    image2: { imagePath: "Slide 1/parallelLine2.png", category: "parallel" },
                    image3: { imagePath: "Slide 1/parallelLine3.png", category: "parallel" },
                    image4: { imagePath: "Slide 1/perpendicular1.png", category: "perpendicular" },
                    image5: { imagePath: "Slide 1/perpendicular2.png", category: "perpendicular" },
                    image6: { imagePath: "Slide 1/perpendicular3.png", category: "perpendicular" },
                }
            ],

            pages: {
                page1: {
                    header: "Sort Parallel and Perpendicular Lines",
                    mainText: "Let us practice sorting parallel<br/> and perpendicular lines.<br/><br/>Tap ‘Start’ to begin the lesson.",
                    startButton: "Start"
                },
                page2: {
                    header: "Identify CYLINDERS and CONES",
                    instructionText: "Shoutout the answer and drag the shape to the correct box...",
                    continueText: "Tap » to continue",
                    dropZone1Label: "Parallel Lines",
                    dropZone2Label: "Perpendicular Lines",
                    unsortedEmptyMessage: "Hurray!!We have sorted parallel and perpendicular lines correctly.",
                    correctPolygonFeedback: "Correct! This is a Parallel Line.",
                    correctCurvedFeedback: "Correct! This is a Perpendicular Line.",
                    incorrectPolygonFeedback: "This is not a Parallel Line.",
                    incorrectCurvedFeedback: "This is not a Perpendicular Line."
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
                questionCompleteFeedback: "Bagus sekali! Kamu telah menyelesaikan pertanyaan."
            },

            debug: {
                pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?"
            },

            Questions: [
                {
                    image1: { imagePath: "Slide 1/parallelLine1.png", category: "parallel" },
                    image2: { imagePath: "Slide 1/parallelLine2.png", category: "parallel" },
                    image3: { imagePath: "Slide 1/parallelLine3.png", category: "parallel" },
                    image4: { imagePath: "Slide 1/perpendicular1.png", category: "perpendicular" },
                    image5: { imagePath: "Slide 1/perpendicular2.png", category: "perpendicular" },
                    image6: { imagePath: "Slide 1/perpendicular3.png", category: "perpendicular" },
                }
            ],

            pages: {
                page1: {
                    header: "Mengelompokkan Garis Sejajar dan Garis Tegak Lurus",
                    mainText: "Mari kita berlatih mengelompokkan garis sejajar<br/>dan garis tegak lurus.<br/><br/>Ketuk 'Mulai' untuk memulai pelajaran.",
                    startButton: "Mulai"
                },

                page2: {
                    header: "Tentukan Garis Sejajar dan Garis Tegak Lurus",
                    instructionText: "Sebutkan jawabannya dan seret gambar ke kotak yang benar...",
                    continueText: "Ketuk » untuk melanjutkan",
                    dropZone1Label: "Garis Sejajar",
                    dropZone2Label: "Garis Tegak Lurus",
                    unsortedEmptyMessage: "Hore!! Kita telah mengelompokkan garis sejajar dan garis tegak lurus dengan benar.",
                    correctPolygonFeedback: "Benar! Ini adalah Garis Sejajar.",
                    correctCurvedFeedback: "Benar! Ini adalah Garis Tegak Lurus.",
                    incorrectPolygonFeedback: "Ini bukan Garis Sejajar.",
                    incorrectCurvedFeedback: "Ini bukan Garis Tegak Lurus."
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