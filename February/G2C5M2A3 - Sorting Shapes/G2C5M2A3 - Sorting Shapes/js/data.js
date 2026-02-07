// data.js - Internationalization data for the Subtraction Learning Applet
// Contains only the text content that's actually used in the subtraction app

const AppData = {
    // Current language setting
    currentLanguage: 'en',

    // Text content by language
    translations: {
        en: {
            appInfo: {
                title: "Sorting Learning"
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
                    image1: { imagePath: "Slide 1/bangle.png", category: "curve" },
                    image2: { imagePath: "Slide 1/bicycle wheel.png", category: "curve" },
                    image3: { imagePath: "Slide 1/bookCover.png", category: "polygon" },
                    image4: { imagePath: "Slide 1/clock.png", category: "curve" },
                    image5: { imagePath: "Slide 1/coin.png", category: "curve" },
                    image6: { imagePath: "Slide 1/kite.png", category: "polygon" },
                    image7: { imagePath: "Slide 1/plate.png", category: "curve" },
                    image8: { imagePath: "Slide 1/stop.png", category: "polygon" },
                    image9: { imagePath: "Slide 1/Tile.png", category: "polygon" },
                    image10: { imagePath: "Slide 1/Window.png", category: "polygon" },                },
            ],

            pages: {
                page1: {
                    header: "Sorting Shapes",
                    mainText: "Let’s sort shapes into POLYGONS<br/>and CURVED SHAPES<br/><br/><br/>Tap ‘Start’ to begin the lesson.",
                    startButton: "Start"
                },
                page2: {
                    header: "Sorting Shapes",
                    instructionText: "Shoutout the answer and drag the shape to the correct box...",
                    continueText: "Tap » to continue",
                    dropZone1Label: "Polygons",
                    dropZone2Label: "Curved Shapes",
                    unsortedEmptyMessage: "Great job! All items sorted!",
                    correctPolygonFeedback: "Correct! This is a polygon. It has a different number of sides.",
                    correctCurvedFeedback: "Correct! This is a curved shape.",
                    incorrectPolygonFeedback: "This is actually not a polygon.",
                    incorrectCurvedFeedback: "This is not a curved shape."
                },
                
                page3: {
                    header: "Activity Completed",
                    greatText: "Great!",
                    mainText: "You learned to identify polygons and curved shapes!",
                    startOverButton: "Start Over"
                }
            }
        },

        id: {
            appInfo: {
                title: "Pembelajaran Pengurutan"
            },

            buttons: {
                next: "»",
                previous: "«",
                startOver: "Mulai Lagi"
            },

            dropZone: {
                emptyMessage: "Seret gambar ke sini"
            },

            feedback: {
                questionCompleteFeedback: "Kerja bagus! Anda telah menyelesaikan pertanyaan."
            },

            debug: {
                pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?"
            },
            Questions: [
                {
                    image1: { imagePath: "Slide 1/roof of house.png", category: "triangle" },
                    image2: { imagePath: "Slide 1/Tent.png", category: "triangle" },
                    image3: { imagePath: "Slide 1/Pizza slice.png", category: "triangle" },
                    image4: { imagePath: "Slide 1/sailboat.png", category: "triangle" },
                    image5: { imagePath: "Slide 1/pyramid.png", category: "triangle" },
                    image6: { imagePath: "Slide 1/Nacos.png", category: "triangle" },
                    image7: { imagePath: "Slide 1/Sandwich.png", category: "triangle" },
                    image8: { imagePath: "Slide 1/bicycle wheel.png", category: "not-triangle" },
                    image9: { imagePath: "Slide 1/Book.png", category: "not-triangle" },
                    image10: { imagePath: "Slide 1/Button.png", category: "not-triangle" },
                    image11: { imagePath: "Slide 1/cake.png", category: "triangle" },
                    image12: { imagePath: "Slide 1/Cheez.png", category: "not-triangle" },
                    image13: { imagePath: "Slide 1/clock.png", category: "not-triangle" },
                    image14: { imagePath: "Slide 1/coin.png", category: "not-triangle" },
                    image15: { imagePath: "Slide 1/Door.png", category: "not-triangle" },
                    image16: { imagePath: "Slide 1/Envelope.png", category: "not-triangle" },
                    image17: { imagePath: "Slide 1/Napkin.png", category: "not-triangle" },
                    image18: { imagePath: "Slide 1/pizza.png", category: "not-triangle" },
                    image19: { imagePath: "Slide 1/Plate.png", category: "not-triangle" },
                    image20: { imagePath: "Slide 1/Tile.png", category: "not-triangle" },
                    image21: { imagePath: "Slide 1/TV.png", category: "not-triangle" },
                    image22: { imagePath: "Slide 1/Window.png", category: "not-triangle" }
                },
            ],

            pages: {
                page1: {
                    header: "Bagian yang sama dan tidak sama.",
                    mainText: "Siap untuk lebih banyak kesenangan?<br>Mari kita mengurutkan bentuk — mana yang dipotong menjadi bagian yang sama dan mana yang menjadi bagian yang tidak sama?",
                    startButton: "Mulai"
                },
                page2: {
                    header: "Apakah bentuk yang diberikan adalah Segitiga atau bukan?",
                    instructionText: "Sebutkan jawabannya dan seret bentuk ke kotak yang benar...",
                    continueText: "Ketuk » untuk melanjutkan",
                    dropZone1Label: "Segitiga",
                    dropZone2Label: "Bukan Segitiga",
                    unsortedEmptyMessage: "Kerja bagus! Semua item sudah diurutkan!",
                    correctTriangleFeedback: "Benar! Ini adalah segitiga. Segitiga memiliki tiga sisi dan tiga sudut.",
                    correctNotTriangleFeedback: "Benar! Ini bukan segitiga. Bentuknya memiliki jumlah sisi yang berbeda.",
                    incorrectTriangleFeedback: "Ini sebenarnya adalah segitiga. Segitiga memiliki tiga sisi dan tiga sudut. Coba kotak Segitiga!",
                    incorrectNotTriangleFeedback: "Ini sebenarnya bukan segitiga. Bentuknya memiliki jumlah sisi yang berbeda. Coba kotak Bukan Segitiga!"
                },
                page3: {
                    header: '<span style="color: #F1C40F;">Urutkan bentuk-bentuk ini berdasarkan\u00A0</span> <span style="color: #ffffff;">bentuk...</span>',
                    instructionText: "Seret setiap objek ke kotak bentuk yang benar…",
                    continueText: "Ketuk » untuk melanjutkan",
                    dropZone1Label: "Segitiga",
                    dropZone2Label: "Lingkaran atau Oval",
                    dropZone3Label: "Persegi atau Persegi Panjang",
                    unsortedEmptyMessage: "Kerja bagus! Semua item sudah diurutkan berdasarkan bentuk!",
                    correctTriangleFeedback: "Benar! Objek ini memiliki bentuk segitiga.",
                    correctCircleFeedback: "Benar! Objek ini memiliki bentuk lingkaran.",
                    correctRectangleFeedback: "Benar! Objek ini memiliki bentuk persegi panjang.",
                    incorrectShapeFeedback: "Lihat bentuk objek ini dengan lebih teliti. Apa bentuk garis luarnya? Coba lagi!"
                },
                page8: {
                    header: "Aktivitas Selesai",
                    greatText: "Bagus!",
                    mainText: "Anda belajar mengidentifikasi segitiga!<br>Segitiga memiliki tiga sisi dan tiga sudut.<br>Bentuk dengan jumlah sisi yang berbeda bukanlah segitiga.",
                    startOverButton: "Mulai Lagi"
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