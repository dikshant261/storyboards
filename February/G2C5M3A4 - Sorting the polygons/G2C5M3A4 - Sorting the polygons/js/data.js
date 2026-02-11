// data.js - Internationalization data for the Subtraction Learning Applet
// Contains only the text content that's actually used in the subtraction app

const AppData = {
    // Current language setting
    currentLanguage: 'en',

    // Text content by language
    translations: {
        en: {
            appInfo: {
                title: "Sorting the POLYGONS"
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
            Questions1: [
                {
                    image1: { imagePath: "Slide 1/window.png", category: "FourAngles" },
                    image2: { imagePath: "Slide 1/badge.png", category: "fiveVertices" },
                    image3: { imagePath: "Slide 1/tableTop.png", category: "FourAngles" },
                    image4: { imagePath: "Slide 1/pentagonTile.png", category: "fiveVertices" },
                    image5: { imagePath: "Slide 1/door.png", category: "FourAngles" },
                    image6: { imagePath: "Slide 1/shield.png", category: "fiveVertices" },

                },
            ],
            Questions2: [
                {
                    image1: { imagePath: "Slide 1/photoFrame.png", category: "FourAngles" },
                    image2: { imagePath: "Slide 1/trafficSign.png", category: "threeSides" },
                    image3: { imagePath: "Slide 1/Tile.png", category: "FourAngles" },
                    image4: { imagePath: "Slide 1/pizzaSlice.png", category: "threeSides" },
                    image5: { imagePath: "Slide 1/chessBoard.png", category: "FourAngles" },
                    image6: { imagePath: "Slide 1/nacho.png", category: "threeSides" },

                },
            ],
            pages: {
                page1: {
                    header: "Sorting the POLYGONS",
                    mainText: "Today we will sort the polygons on the <br/>basis of the number of vertices and<br/> angles.<br/><br/>Tap ‘Start’ to begin the lesson.",
                    startButton: "Start"
                },
                page2: {
                    header: "Sorting the POLYGONS",
                    instructionText: "Shoutout the answer and drag the shape to the correct box...",
                    continueText: "Tap » to continue",
                    dropZone1Label: "4 Angles",
                    dropZone2Label: "5 Vertices",
                    unsortedEmptyMessage: "Great job! All items sorted!",
                    correctPolygonFeedback: "Correct! In this have 4 Angles.",
                    correctCurvedFeedback: "Correct! In this have 5 Vertices.",
                    incorrectPolygonFeedback: "Incorrect!. In this have not  5 Vertices.",
                    incorrectCurvedFeedback: "Incorrect!. In this have more than 4 Angles."
                },
                page3: {
                    header: "Sorting the POLYGONS",
                    instructionText: "Shoutout the answer and drag the shape to the correct box...",
                    continueText: "Tap » to continue",
                    dropZone1Label: "3 Sides",
                    dropZone2Label: "4 Angles",
                    unsortedEmptyMessage: "Great job! All items sorted!",
                    correctPolygonFeedback: "Correct! In this have 3 Sides.",
                    correctCurvedFeedback: "Correct! In this have 4 Angles.",
                    incorrectPolygonFeedback: "Incorrect!. In this not have 3 Sides.",
                    incorrectCurvedFeedback: "Incorrect!. In this not have 4 Angles."
                },
                page4: {
                    header: "Activity Completed",
                    greatText: "",
                    mainText: "Great!<br/>You learned to identify polygons sides and angles!<br/>Shapes with 3 sides are triangles, shapes with 4 angles are quadrilaterals, and shapes with 5 vertices are pentagons.",
                    startOverButton: "Start Over"
                }
            }
        },

        id: {
    appInfo: {
        title: "Mengelompokkan POLIGON"
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
        questionCompleteFeedback: "Bagus sekali! Kamu telah menyelesaikan soal ini."
    },

    debug: {
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?"
    },

    Questions1: [
        {
            image1: { imagePath: "Slide 1/window.png", category: "FourAngles" },
            image2: { imagePath: "Slide 1/badge.png", category: "fiveVertices" },
            image3: { imagePath: "Slide 1/tableTop.png", category: "FourAngles" },
            image4: { imagePath: "Slide 1/pentagonTile.png", category: "fiveVertices" },
            image5: { imagePath: "Slide 1/door.png", category: "FourAngles" },
            image6: { imagePath: "Slide 1/shield.png", category: "fiveVertices" }
        }
    ],

    Questions2: [
        {
            image1: { imagePath: "Slide 1/photoFrame.png", category: "FourAngles" },
            image2: { imagePath: "Slide 1/trafficSign.png", category: "threeSides" },
            image3: { imagePath: "Slide 1/Tile.png", category: "FourAngles" },
            image4: { imagePath: "Slide 1/pizzaSlice.png", category: "threeSides" },
            image5: { imagePath: "Slide 1/chessBoard.png", category: "FourAngles" },
            image6: { imagePath: "Slide 1/nacho.png", category: "threeSides" }
        }
    ],

    pages: {
        page1: {
            header: "Mengelompokkan POLIGON",
            mainText: "Hari ini kita akan mengelompokkan poligon <br/>berdasarkan jumlah titik sudut dan<br/>sudutnya.<br/><br/>Ketuk ‘Mulai’ untuk memulai pelajaran.",
            startButton: "Mulai"
        },

        page2: {
            header: "Mengelompokkan POLIGON",
            instructionText: "Sebutkan jawabannya dan seret bentuk ke kotak yang benar...",
            continueText: "Ketuk » untuk melanjutkan",
            dropZone1Label: "4 Sudut",
            dropZone2Label: "5 Titik Sudut",
            unsortedEmptyMessage: "Kerja bagus! Semua benda sudah dikelompokkan!",
            correctPolygonFeedback: "Benar! Benda ini memiliki 4 sudut.",
            correctCurvedFeedback: "Benar! Benda ini memiliki 5 titik sudut.",
            incorrectPolygonFeedback: "Salah! Benda ini tidak memiliki 5 titik sudut.",
            incorrectCurvedFeedback: "Salah! Benda ini memiliki lebih dari 4 sudut."
        },

        page3: {
            header: "Mengelompokkan POLIGON",
            instructionText: "Sebutkan jawabannya dan seret bentuk ke kotak yang benar...",
            continueText: "Ketuk » untuk melanjutkan",
            dropZone1Label: "3 Sisi",
            dropZone2Label: "4 Sudut",
            unsortedEmptyMessage: "Kerja bagus! Semua benda sudah dikelompokkan!",
            correctPolygonFeedback: "Benar! Benda ini memiliki 3 sisi.",
            correctCurvedFeedback: "Benar! Benda ini memiliki 4 sudut.",
            incorrectPolygonFeedback: "Salah! Benda ini tidak memiliki 3 sisi.",
            incorrectCurvedFeedback: "Salah! Benda ini tidak memiliki 4 sudut."
        },

        page4: {
            header: "Aktivitas Selesai",
            greatText: "",
            mainText: "Hebat!<br/>Kamu telah belajar mengenali sisi dan sudut pada poligon!<br/>Bentuk dengan 3 sisi adalah segitiga, bentuk dengan 4 sudut adalah segi empat, dan bentuk dengan 5 titik sudut adalah segi lima.",
            startOverButton: "Mulai Ulang"
        }
    }
}

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