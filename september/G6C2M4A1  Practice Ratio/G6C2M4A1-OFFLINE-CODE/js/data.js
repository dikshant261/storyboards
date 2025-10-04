// data.js - Internationalization data for the Ratio Learning Applet
// Contains all text content used in the ratio learning app

const AppData = {
    // Current language setting
    currentLanguage: 'id',
    
    // Available languages
    languages: {
        en: { name: 'English', code: 'en' },
        id: { name: 'Bahasa Indonesia', code: 'id' }
    },
    
    // Text content by language
    translations: {
        en: {
            // App title
            appTitle: "Representing and Writing Ratios",
            
            // App info
            appInfo: {
                title: "Representing and Writing Ratios"
            },
            
            // Button text
            buttons: {
                next: "NEXT",
                previous: "«",
                start: "START",
                check: "CHECK",
                nextQuestion: "Next Question",
                startOver: "Start Over",
                proceed: "»"
            },
            
            // Start page
            startPage: {
                writingRatio: "Representing and Writing Ratios",
                get_ready_to_explore: "Get ready to explore ratios in action.\nYou will practice representing ratios in different forms.",
                practiceStart: "You have practiced representing ratios \nusing symbol, words, and fractions.",
                getReady: "Now, get ready to practice identifying and\nwriting ratios.",
                nextContinue: "Tap 'Next' to continue."
            },
            
            // Main content
            main: {
                representingRatios: "Represent the ratio of cats to dogs in this picture.",
                tapRatio: "Tap the correct ratio in the correct form to fill the highlighted box…",
                tapNext: "Tap » to next...",
                proceed: "Tap » to proceed.",
                great: "Great!",
                repreSenting_ratios: "Represent the ratio as required."
            },
            
            // Questions and scenarios
            questions: {
                questionOne: "At a table for 8,\n 6 seats are filled\n and 2 seats are empty.",
                questionTwo: "At a table for 8, \n2 seats are empty and 6 seats are filled.",
                questionThree: "A bag contains 9 yellow marbles and 7 blue marbles.",
                questionFour: "A bag contains 9 yellow marbles and 7 blue marbles.",
                questionFive: "A classroom has 9 boys and 14 girls.",
                questionSix: "A basket contains 16 apples and 19 bananas.",
                questionSeven: "32 students in the classroom and 25 students in the playground."
            },
            
            // Question headings
            headings: {
                questionThreeHeading: "Represent the ratio of yellow to blue marbles.",
                questionFourHeading: "Represent the ratio of blue to yellow marbles.",
                emptyChairsHeading: "Represent the ratio of filled to empty seats."
            },
            
            // Ratio types
            ratios: {
                ratioApple: "Ratio of \napples to oranges",
                rationOrange: "Ratio of \noranges to apples",
                ratioBoys: "Ratio of \nboys to girls",
                ratioGirl: "Ratio of \ngirls to boys",
                rationBanana: "Ratio of\nbananas to apples",
                ratioOrange: "Ratio of\nbananas to apples",
                ratioStudent: "Ratio of students in\nplayground to classroom",
                ratioPlaground: "Ratio of students in\nclassroom to playground",
                ratio_of_pentagons: "Ratio of triangles to pentagons",
                ratio_of_triangles: "Ratio of pentagons to triangles"
            },
            
            // Form types
            forms: {
                word: "Word",
                fraction: "Fraction",
                symbol: "Symbol"
            },
            
            // Success messages
            success: {
                success: "is the the correct {word} form required!",
                successTwo: "Great! {count} is the correct ratio required.",
                successThree: "is the correct ratio required."
            },
            
            // Error messages - Dog and Cat
            errors: {
                dogErrorone: "Oops! We need the {word}.\n Try again!",
                dogErrortwo: "Not quite! We need cats first, then dogs.\n Try again!",
                dogErrorFraction: "Not quite! We need cats at numerator. Try again!"
            },
            
            // Error messages - Table
            tableErrors: {
                tableErrorSymbol: "Not quite! We need filled seats first, then empty seats. Try again!",
                tableErrorFraction: "Not quite! We need filled seats at numerator. Try again!"
            },
            
            // Error messages - Marbles
            marbleErrors: {
                yellowMarble: "Not quite! We need yellow marbles first, then blue marbles. Try again!",
                yellowMarbleFraction: "Not quite! We need yellow marbles at numerator. Try again!",
                blueMarbles: "Not quite! We need blue marbles first, then yellow marbles. Try again!",
                blueMarblesFraction: "Not quite! We need blue marbles at numerator. Try again!"
            },
            
            // Error messages - Apples and Oranges
            appleErrors: {
                appleErrorOne: "Oops! That's not correct. There are 5 oranges, not 10. Try again!",
                appleErrorTwo: "Not quite! We need apples first, then oranges. \nTry again!",
                orangeErrorOne: "Oops! That's not correct. There are 4 apples, not 10. \nTry again!",
                orangeErrorTwo: "Not quite! We need oranges first, then apples. \nTry again!"
            },
            
            // Error messages - Triangles and Pentagons
            triangleErrors: {
                triangleErrorOne: "Not quite! We need pentagons first, then triangles. \nTry again!",
                triangleErrorTwo: "Oops! That's not correct. There are 7 triangles, not 10. \nTry again!",
                pentagonErrorOne: "Not quite! We need triangles first, then pentagons. \nTry again!",
                pentagonErrorTwo: "Oops! That's not correct. There are 3 pentagons, not 10. \nTry again!"
            },
            
            // Error messages - Boys and Girls
            boyGirlErrors: {
                boyFirstErrorOne: "Not quite! We need boys first, then girls. \nTry again!",
                boyFirstErrorTwo: "Oops! That's not correct. There are 14 girls, not 23. \nTry again!",
                girlsFirstErrorOne: "Not quite! We need boys first, then girls. \nTry again!",
                girlsFirstErrorTwo: "Oops! That's not correct. There are 9 boys, not 23. \nTry again!"
            },
            
            // Error messages - Bananas and Apples
            bananaAppleErrors: {
                bananaFirstErrorOne: "Not quite! We need bananas first, then apples. \nTry again!",
                bananaFirstErrorTwo: "Oops! That's not correct. There are 16 apples, not 35. \nTry again!",
                appleFirstErrorOne: "Not quite! We need apples first, then bananas. \nTry again!",
                appleFirstErrorTwo: "Oops! That's not correct. There are 19 bananas, not 35. \nTry again!"
            },
            
            // Error messages - Students
            studentErrors: {
                studentErrorOne: "Not quite! We need students in playground first. \nTry again!",
                studentErrorTwo: "Oops! That's not correct. There are 32 students in classroom, not 57. \nTry again!",
                studentPalygroundOne: "Not quite! We need students in classroom first. \nTry again!",
                studentPalygroundTwo: "Oops! That's not correct. There are 25 students in playground, not 57. \nTry again!"
            },
            
            // Activity completion
            completion: {
                activityComplete: "Activity Completed!",
                leraned_forms: "You have learned how to identify and represent ratios \nin symbol, fraction, and word forms.",
                startOver: "To go over the activity again, tap on 'Start Over'.",
                buttonStartOver: "Start Over"
            }
        },
        
        id: {
            // App title
            appTitle: "Mewakili dan Menulis Rasio",
            
            // App info
            appInfo: {
                title: "Mewakili dan Menulis Rasio"
            },
            
            // Button text
            buttons: {
                next: "LANJUT",
                previous: "«",
                start: "MULAI",
                check: "PERIKSA",
                nextQuestion: "Pertanyaan Selanjutnya",
                startOver: "Mulai Lagi",
                proceed: "»"
            },
            
            // Start page
            startPage: {
                writingRatio: "Mewakili dan Menulis Rasio",
                get_ready_to_explore: "Bersiaplah untuk menjelajahi rasio dalam aksi.\nAnda akan berlatih mewakili rasio dalam berbagai bentuk.",
                practiceStart: "Anda telah berlatih mewakili rasio \nmenggunakan simbol, kata, dan pecahan.",
                getReady: "Sekarang, bersiaplah untuk berlatih mengidentifikasi dan\nmenulis rasio.",
                nextContinue: "Ketuk 'Lanjut' untuk melanjutkan."
            },
            
            // Main content
            main: {
                representingRatios: "Wakili rasio kucing terhadap anjing dalam gambar ini.",
                tapRatio: "Ketuk rasio yang benar dalam bentuk yang benar untuk mengisi kotak yang disorot…",
                tapNext: "Ketuk » untuk selanjutnya...",
                proceed: "Ketuk » untuk melanjutkan.",
                great: "Bagus!",
                repreSenting_ratios: "Wakili rasio sesuai yang diminta."
            },
            
            // Questions and scenarios
            questions: {
                questionOne: "Di meja untuk 8 orang,\n 6 kursi terisi\n dan 2 kursi kosong.",
                questionTwo: "Di meja untuk 8 orang, \n2 kursi kosong dan 6 kursi terisi.",
                questionThree: "Sebuah kantong berisi 9 kelereng kuning dan 7 kelereng biru.",
                questionFour: "Sebuah kantong berisi 9 kelereng kuning dan 7 kelereng biru.",
                questionFive: "Sebuah kelas memiliki 9 anak laki-laki dan 14 anak perempuan.",
                questionSix: "Sebuah keranjang berisi 16 apel dan 19 pisang.",
                questionSeven: "32 siswa di dalam kelas dan 25 siswa di lapangan bermain."
            },
            
            // Question headings
            headings: {
                questionThreeHeading: "Wakili rasio kelereng kuning terhadap kelereng biru.",
                questionFourHeading: "Wakili rasio kelereng biru terhadap kelereng kuning.",
                emptyChairsHeading: "Wakili rasio kursi terisi terhadap kursi kosong."
            },
            
            // Ratio types
            ratios: {
                ratioApple: "Rasio \napel terhadap jeruk",
                rationOrange: "Rasio \njeruk terhadap apel",
                ratioBoys: "Rasio \nanak laki-laki terhadap anak perempuan",
                ratioGirl: "Rasio \nanak perempuan terhadap anak laki-laki",
                rationBanana: "Rasio\npisang terhadap apel",
                ratioOrange: "Rasio\npisang terhadap apel",
                ratioStudent: "Rasio siswa di\nlapangan bermain terhadap kelas",
                ratioPlaground: "Rasio siswa di\nkelas terhadap lapangan bermain",
                ratio_of_pentagons: "Rasio segitiga terhadap pentagon",
                ratio_of_triangles: "Rasio pentagon terhadap segitiga"
            },
            
            // Form types
            forms: {
                word: "Kata",
                fraction: "Pecahan",
                symbol: "Simbol"
            },
            
            // Success messages
            success: {
                success: "adalah bentuk {word} yang benar yang diminta!",
                successTwo: "Bagus! {count} adalah rasio yang benar yang diminta.",
                successThree: "adalah rasio yang benar yang diminta."
            },
            
            // Error messages - Dog and Cat
            errors: {
                dogErrorone: "Ups! Kita membutuhkan {word}.\n Coba lagi!",
                dogErrortwo: "Tidak tepat! Kita membutuhkan kucing dulu, baru anjing.\n Coba lagi!",
                dogErrorFraction: "Tidak tepat! Kita membutuhkan kucing di pembilang. Coba lagi!"
            },
            
            // Error messages - Table
            tableErrors: {
                tableErrorSymbol: "Tidak tepat! Kita membutuhkan kursi terisi dulu, baru kursi kosong. Coba lagi!",
                tableErrorFraction: "Tidak tepat! Kita membutuhkan kursi terisi di pembilang. Coba lagi!"
            },
            
            // Error messages - Marbles
            marbleErrors: {
                yellowMarble: "Tidak tepat! Kita membutuhkan kelereng kuning dulu, baru kelereng biru. Coba lagi!",
                yellowMarbleFraction: "Tidak tepat! Kita membutuhkan kelereng kuning di pembilang. Coba lagi!",
                blueMarbles: "Tidak tepat! Kita membutuhkan kelereng biru dulu, baru kelereng kuning. Coba lagi!",
                blueMarblesFraction: "Tidak tepat! Kita membutuhkan kelereng biru di pembilang. Coba lagi!"
            },
            
            // Error messages - Apples and Oranges
            appleErrors: {
                appleErrorOne: "Ups! Itu tidak benar. Ada 5 jeruk, bukan 10. Coba lagi!",
                appleErrorTwo: "Tidak tepat! Kita membutuhkan apel dulu, baru jeruk. \nCoba lagi!",
                orangeErrorOne: "Ups! Itu tidak benar. Ada 4 apel, bukan 10. \nCoba lagi!",
                orangeErrorTwo: "Tidak tepat! Kita membutuhkan jeruk dulu, baru apel. \nCoba lagi!"
            },
            
            // Error messages - Triangles and Pentagons
            triangleErrors: {
                triangleErrorOne: "Tidak tepat! Kita membutuhkan pentagon dulu, baru segitiga. \nCoba lagi!",
                triangleErrorTwo: "Ups! Itu tidak benar. Ada 7 segitiga, bukan 10. \nCoba lagi!",
                pentagonErrorOne: "Tidak tepat! Kita membutuhkan segitiga dulu, baru pentagon. \nCoba lagi!",
                pentagonErrorTwo: "Ups! Itu tidak benar. Ada 3 pentagon, bukan 10. \nCoba lagi!"
            },
            
            // Error messages - Boys and Girls
            boyGirlErrors: {
                boyFirstErrorOne: "Tidak tepat! Kita membutuhkan anak laki-laki dulu, baru anak perempuan. \nCoba lagi!",
                boyFirstErrorTwo: "Ups! Itu tidak benar. Ada 14 anak perempuan, bukan 23. \nCoba lagi!",
                girlsFirstErrorOne: "Tidak tepat! Kita membutuhkan anak laki-laki dulu, baru anak perempuan. \nCoba lagi!",
                girlsFirstErrorTwo: "Ups! Itu tidak benar. Ada 9 anak laki-laki, bukan 23. \nCoba lagi!"
            },
            
            // Error messages - Bananas and Apples
            bananaAppleErrors: {
                bananaFirstErrorOne: "Tidak tepat! Kita membutuhkan pisang dulu, baru apel. \nCoba lagi!",
                bananaFirstErrorTwo: "Ups! Itu tidak benar. Ada 16 apel, bukan 35. \nCoba lagi!",
                appleFirstErrorOne: "Tidak tepat! Kita membutuhkan apel dulu, baru pisang. \nCoba lagi!",
                appleFirstErrorTwo: "Ups! Itu tidak benar. Ada 19 pisang, bukan 35. \nCoba lagi!"
            },
            
            // Error messages - Students
            studentErrors: {
                studentErrorOne: "Tidak tepat! Kita membutuhkan siswa di lapangan bermain dulu. \nCoba lagi!",
                studentErrorTwo: "Ups! Itu tidak benar. Ada 32 siswa di kelas, bukan 57. \nCoba lagi!",
                studentPalygroundOne: "Tidak tepat! Kita membutuhkan siswa di kelas dulu. \nCoba lagi!",
                studentPalygroundTwo: "Ups! Itu tidak benar. Ada 25 siswa di lapangan bermain, bukan 57. \nCoba lagi!"
            },
            
            // Activity completion
            completion: {
                activityComplete: "Aktivitas Selesai!",
                leraned_forms: "Anda telah belajar cara mengidentifikasi dan mewakili rasio \ndalam bentuk simbol, pecahan, dan kata.",
                startOver: "Untuk mengulang aktivitas lagi, ketuk 'Mulai Lagi'.",
                buttonStartOver: "Mulai Lagi"
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

// Legacy compatibility - maintain the old 't' function for existing code
window.t = (key, params = {}) => {
    // Handle legacy flat key structure by checking multiple possible locations
    const possibleKeys = [
        key,
        `main.${key}`,
        `startPage.${key}`,
        `questions.${key}`,
        `headings.${key}`,
        `ratios.${key}`,
        `forms.${key}`,
        `success.${key}`,
        `errors.${key}`,
        `tableErrors.${key}`,
        `marbleErrors.${key}`,
        `appleErrors.${key}`,
        `triangleErrors.${key}`,
        `boyGirlErrors.${key}`,
        `bananaAppleErrors.${key}`,
        `studentErrors.${key}`,
        `completion.${key}`,
        `buttons.${key}`
    ];
    
    for (const possibleKey of possibleKeys) {
        const result = i18n.t(possibleKey, params);
        if (result !== `[Missing: ${possibleKey}]` && typeof result === 'string') {
            return result;
        }
    }
    
    // If still not found, try direct access to the current language translations
    const currentLang = AppData.currentLanguage;
    const translations = AppData.translations[currentLang];
    
    if (translations && translations[key]) {
        let value = translations[key];
        
        // If it's an object, try to get the default success message
        if (typeof value === 'object' && value.success) {
            value = value.success;
        }
        
        // Replace parameters in string
        if (typeof value === 'string') {
            return value.replace(/\{(\w+)\}/g, (match, param) => {
                return params.hasOwnProperty(param) ? params[param] : match;
            });
        }
        
        return value;
    }
    
    console.warn(`Translation key not found: ${key}`);
    return `[Missing: ${key}]`;
};
