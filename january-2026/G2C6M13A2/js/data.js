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
                    image1: { imagePath: "Slide 1/brushTeeth.png", imageName: "Brush Teeth", category: "morning" },
                    image2: { imagePath: "Slide 1/goToSchool.png", imageName: "Go To School", category: "morning" },
                    image3: { imagePath: "Slide 1/wakeUp.png", imageName: "Wake Up", category: "morning" },
                    image4: { imagePath: "Slide 1/Lunch.png", imageName: "Lunch", category: "afternoon" },
                    image5: { imagePath: "Slide 1/ComingBackFromSchool.png", imageName: "Coming Back From\n School", category: "afternoon" },
                    image6: { imagePath: "Slide 1/napHour.png", imageName: "Nap Hour", category: "afternoon" },
                    image7: { imagePath: "Slide 1/havingSnacks.png", imageName: "Having Snacks", category: "evening" },
                    image8: { imagePath: "Slide 1/playWithFreinds.png", imageName: "Play with Friends", category: "evening" },
                    image9: { imagePath: "Slide 1/homeWork.png", imageName: "Homework", category: "evening" },
                    image10: { imagePath: "Slide 1/readAStory.png", imageName: "Read A Story", category: "night" },
                    image11: { imagePath: "Slide 1/sleep.png", imageName: "Sleep", category: "night" },
                    image12: { imagePath: "Slide 1/dinner.png", imageName: "Dinner", category: "night" },
                },
            ],

            pages: {
                page1: {
                    header: "Indentify Day Activities!",
                    mainText: "Ready for more fun?<br>Let's sort the Day Activity",
                    startButton: "Start"
                },
                page2: {
                    header: "Match the activity to parts of the day.",
                    instructionText: "Drag and drop the image to the right box.",
                    continueText: "Tap » to Start Over",
                    dropZone1Label: "Morning",
                    dropZone2Label: "Afternoon",
                    dropZone3Label: "Evening",
                    dropZone4Label: "Night",
                    unsortedEmptyMessage: "Great job! All items sorted!",
                    correctTriangleFeedback: "Correct! This is a triangle. A triangle has three sides and three angles.",
                    correctNotTriangleFeedback: "Correct! This is not a triangle. It has a different number of sides.",
                    incorrectTriangleFeedback: "This is actually a triangle. A triangle has three sides and three angles. Try the Triangle box!",
                    incorrectNotTriangleFeedback: "This is actually not a triangle. It has a different number of sides. Try the Not a Triangle box!"
                },

                page3: {
                    header: "Activity Completed",
                    greatText: "Great!",
                    mainText: "You sort Day Activity",
                    startOverButton: "Start Over"
                }
            }
        },

        id: {
            appInfo: {
                title: "Pembelajaran Penyortiran"
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

            Questions: [
                {
                    image1: { imagePath: "Slide 1/brushTeeth.png", imageName: "Sikat Gigi", category: "morning" },
                    image2: { imagePath: "Slide 1/goToSchool.png", imageName: "Pergi ke Sekolah", category: "morning" },
                    image3: { imagePath: "Slide 1/wakeUp.png", imageName: "Bangun Tidur", category: "morning" },
                    image4: { imagePath: "Slide 1/Lunch.png", imageName: "Makan Siang", category: "afternoon" },
                    image5: { imagePath: "Slide 1/ComingBackFromSchool.png", imageName: "Pulang dari\n Sekolah", category: "afternoon" },
                    image6: { imagePath: "Slide 1/napHour.png", imageName: "Waktu Tidur Siang", category: "afternoon" },
                    image7: { imagePath: "Slide 1/havingSnacks.png", imageName: "Makan Camilan", category: "evening" },
                    image8: { imagePath: "Slide 1/playWithFreinds.png", imageName: "Bermain dengan Teman", category: "evening" },
                    image9: { imagePath: "Slide 1/homeWork.png", imageName: "Mengerjakan PR", category: "evening" },
                    image10: { imagePath: "Slide 1/readAStory.png", imageName: "Membaca Cerita", category: "night" },
                    image11: { imagePath: "Slide 1/sleep.png", imageName: "Tidur", category: "night" },
                    image12: { imagePath: "Slide 1/dinner.png", imageName: "Makan Malam", category: "night" },
                },
            ],

            pages: {
                page1: {
                    header: "Identifikasi Aktivitas Sehari-hari!",
                    mainText: "Siap untuk keseruan selanjutnya?<br>Ayo kita sortir aktivitas harian",
                    startButton: "Mulai"
                },

                page2: {
                    header: "Cocokkan aktivitas dengan waktu dalam sehari.",
                    instructionText: "Seret dan lepaskan gambar ke kotak yang sesuai.",
                    continueText: "Ketuk » untuk Mulai Ulang",
                    dropZone1Label: "Pagi",
                    dropZone2Label: "Siang",
                    dropZone3Label: "Sore",
                    dropZone4Label: "Malam",
                    unsortedEmptyMessage: "Kerja bagus! Semua item telah disortir!",
                    correctTriangleFeedback: "Benar! Ini adalah segitiga. Segitiga memiliki tiga sisi dan tiga sudut.",
                    correctNotTriangleFeedback: "Benar! Ini bukan segitiga. Jumlah sisinya berbeda.",
                    incorrectTriangleFeedback: "Sebenarnya ini adalah segitiga. Segitiga memiliki tiga sisi dan tiga sudut. Coba kotak Segitiga!",
                    incorrectNotTriangleFeedback: "Sebenarnya ini bukan segitiga. Jumlah sisinya berbeda. Coba kotak Bukan Segitiga!"
                },

                page3: {
                    header: "Aktivitas Selesai",
                    greatText: "Hebat!",
                    mainText: "Kamu telah menyortir aktivitas harian",
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