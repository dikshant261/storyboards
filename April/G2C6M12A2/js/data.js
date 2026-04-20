// data.js - Internationalization data for the Subtraction Learning Applet
// Contains only the text content that's actually used in the subtraction app

const AppData = {
    // Current language setting
    currentLanguage: 'en',


    // Text content by language
    translations: {
        en: {
            appInfo: {
                title: "Subtraction Learning"
            },

            buttons: {
                next: "»",
                previous: "«",
                check: "CHECK",
                startOver: "Start Over",
                nextQuestion: "Next Question"
            },

            books: {
                1: {
                    name: "Book of Eden",
                    message: "The first knowledge awakens — you have collected the Book of Eden.",
                    bookImage: "book1.png"
                },
                2: {
                    name: "Chronicle of Dawn",
                    message: "The first light of knowledge awakens — you have unlocked the Chronicle of Dawn.",
                    bookImage: "book2.png"
                },
                3: {
                    name: "Codex of Shadows",
                    message: "Dark secrets whisper — the Codex of Shadows is yours.",
                    bookImage: "book3.png"
                },
                4: {
                    name: "Tome of Echoes",
                    message: "The voices of the past resound — you obtained the Tome of Echoes.",
                    bookImage: "book4.png"
                },
                5: {
                    name: "Grimoire of Lost Ages",
                    message: "Ancient wisdom stirs — the Grimoire of Lost Ages joins your library.",
                    bookImage: "book5.png"
                },
                6: {
                    name: "Scroll of Eternity",
                    message: "Time bends before you — you unroll the Scroll of Eternity.",
                    bookImage: "book6.png"
                },
                7: {
                    name: "Archive of the Ancients",
                    message: "Forgotten minds awaken — you access the Archive of the Ancients.",
                    bookImage: "book7.png"
                },
                8: {
                    name: "Ledger of Forgotten Realms",
                    message: "Hidden worlds recorded — the Ledger of Forgotten Realms is revealed.",
                    bookImage: "book8.png"
                },
                9: {
                    name: "Manuscript of Destiny",
                    message: "Your fate intertwines with history — you unlock the Manuscript of Destiny.",
                    bookImage: "book9.png"
                },
                10: {
                    name: "Volume of the Infinite Path",
                    message: "The endless road of mastery opens — the Volume of the Infinite Path is yours.",
                    bookImage: "book10.png"
                },
                11: {
                    name: "Codex of the Celestials",
                    message: "Starlit wisdom descends — you unveil the Codex of the Celestials.",
                    bookImage: "book11.png"
                },
                12: {
                    name: "Scroll of Whispering Stars",
                    message: "The cosmos murmurs secrets — you hold the Scroll of Whispering Stars.",
                    bookImage: "book12.png"
                },
                13: {
                    name: "Tome of the Hidden Gate",
                    message: "A new realm beckons — you open the Tome of the Hidden Gate.",
                    bookImage: "book13.png"
                },
                14: {
                    name: "Book of Eternal Flame",
                    message: "Fire of enlightenment burns bright — the Book of Eternal Flame is yours.",
                    bookImage: "book14.png"
                },
                15: {
                    name: "Atlas of Forgotten Dreams",
                    message: "The final map unfolds — you possess the Atlas of Forgotten Dreams.",
                    bookImage: "book15.png"
                }
            },

            messages: {
                success: {
                    bookCollected: "🎉 You have now collected the Book of Eden!",
                    finalSuccess: "🎉 Congratulations! With this amazing collection of books you are the knowledgeable one"
                },
                feedback: {
                    defaultInstruction: "Arrange the given fractions from smallest to largest."
                }
            },

            questions: [
                {
                    id: 1,
                    type: "DSC",
                    instructions: "Drag the cards to arrange the objects from heaviest to lightest.",

                    step1: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Strawberry.png",

                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",                    

                    step3: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Mango.png",

                    correctFeedback: "Well done! That's correct.",
                    incorrectFeedback: "Oops! The object with more weight is the heaviest. The one with less weight is the lightest."
                },
                {
                    id: 2,
                    type: "ASC",
                    instructions: "Drag the cards to arrange the objects from lightest to heaviest.",
                    step1: "assets/G2C6M12A2/scaleAssets/pomegranateScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/pineAppleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/papayaScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/pomegranateScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Pineapple-1.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/pineAppleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Pineapple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/papayaScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Papaya.png",
                    correctFeedback: "Well done! That's correct.",
                    incorrectFeedback: "Oops! The object with more weight is the heaviest. The one with less weight is the lightest."
                },
                {
                    id: 3,
                    type: "DSC",
                    instructions: "Drag the cards to arrange the objects from heaviest to lightest.",
                    step1: "assets/G2C6M12A2/scaleAssets/cupScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/milkScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/plateScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/cupScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Cup.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/milkScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Milk cup.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/plateScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Plate.png",
                    correctFeedback: "Well done! That's correct.",
                    incorrectFeedback: "Oops! The object with more weight is the heaviest. The one with less weight is the lightest."
                },
                {
                    id: 4,
                    type: "ASC",
                    instructions: "Drag the cards to arrange the objects from lightest to heaviest.",
                    step1: "assets/G2C6M12A2/scaleAssets/ladyFingerScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/tomatoScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/eggplantScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/ladyFingerScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Ladisfinger.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/tomatoScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Tomato.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/eggplantScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Eggplant.png",
                    correctFeedback: "Well done! That's correct.",
                    incorrectFeedback: "Oops! The object with more weight is the heaviest. The one with less weight is the lightest."
                },
                {
                    id: 5,
                    type: "DSC",
                    instructions: "Drag the cards to arrange the objects from heaviest to lightest.",

                    step1: "assets/G2C6M12A2/scaleAssets/shuttlecockScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/spoonScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/ballScale.png",

                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/shuttlecockScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Shuttlecock.png",

                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/spoonScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Spoon.png",

                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/ballScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Ball.png",

                    correctFeedback: "Well done! That's correct.",
                    incorrectFeedback: "Oops! The object with more weight is the heaviest. The one with less weight is the lightest."
                },
                {
                    id: 6,
                    type: "ASC",
                    instructions: "Drag the cards to arrange the objects from lightest to heaviest.",

                    step1: "assets/G2C6M12A2/scaleAssets/pencilScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/dusterScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/compassBoxScale.png",

                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/pencilScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Pencil.png",

                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/dusterScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Duster.png",

                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/compassBoxScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Compos box.png",

                    correctFeedback: "Well done! That's correct.",
                    incorrectFeedback: "Oops! The object with more weight is the heaviest. The one with less weight is the lightest."
                },
                {
                    id: 7,
                    type: "DSC",
                    instructions: "Drag the cards to arrange the objects from heaviest to lightest.",

                    step1: "assets/G2C6M12A2/scaleAssets/lunchBagScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/waterBottleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/lunchBoxScale.png",

                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/lunchBagScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Lunch bag.png",

                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/waterBottleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/waterBottle.png",

                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/lunchBoxScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Lunch box.png",

                    correctFeedback: "Well done! That's correct.",
                    incorrectFeedback: "Oops! The object with more weight is the heaviest. The one with less weight is the lightest."
                },
                {
                    id: 8,
                    type: "ASC",
                    instructions: "Drag the cards to arrange the objects from lightest to heaviest.",

                    step1: "assets/G2C6M12A2/scaleAssets/bananaScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/orangeScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/guavaScale.png",

                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/bananaScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Banana.png",

                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/orangeScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Orange.png",

                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/guavaScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Guava.png",

                    correctFeedback: "Well done! That's correct.",
                    incorrectFeedback: "Oops! The object with more weight is the heaviest. The one with less weight is the lightest."
                },
                {
                    id: 9,
                    type: "DSC",
                    instructions: "Drag the cards to arrange the objects from heaviest to lightest.",

                    step1: "assets/G2C6M12A2/scaleAssets/chocolateScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/pastryScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/cookiesScale.png",

                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/chocolateScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Chocolate.png",

                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/pastryScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Pastry.png",

                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/cookiesScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Cookies.png",

                    correctFeedback: "Well done! That's correct.",
                    incorrectFeedback: "Oops! The object with more weight is the heaviest. The one with less weight is the lightest."
                },
                {
                    id: 10,
                    type: "ASC",
                    instructions: "Drag the cards to arrange the objects from lightest to heaviest.",

                    step1: "assets/G2C6M12A2/scaleAssets/yellowBookScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/greenBookScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/redBookScale.png",

                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/yellowBookScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/yellow book.png",

                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/greenBookScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Green Book.png",

                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/redBookScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Red book.png",

                    correctFeedback: "Well done! That's correct.",
                    incorrectFeedback: "Oops! The object with more weight is the heaviest. The one with less weight is the lightest."
                }
            ],

            pages: {
                page1: {
                    dialogText: "CHECK",
                    instructionText: "Tap Start to proceed"
                }
            }
        },

        id: {
            appInfo: {
                title: "Pembelajaran Pengurangan"
            },

            buttons: {
                next: "»",
                previous: "«",
                check: "PERIKSA",
                startOver: "Mulai Ulang",
                nextQuestion: "Pertanyaan Berikutnya"
            },

            books: {
                1: {
                    name: "Kitab Eden",
                    message: "Pengetahuan pertama bangkit — Anda telah mengumpulkan Kitab Eden.",
                    bookImage: "book1.png"
                },
                2: {
                    name: "Kronik Fajar",
                    message: "Cahaya pertama pengetahuan bangkit — Anda telah membuka Kronik Fajar.",
                    bookImage: "book2.png"
                },
                3: {
                    name: "Kodeks Bayangan",
                    message: "Rahasia gelap berbisik — Kodeks Bayangan adalah milik Anda.",
                    bookImage: "book3.png"
                },
                4: {
                    name: "Tome Gema",
                    message: "Suara masa lalu bergema — Anda memperoleh Tome Gema.",
                    bookImage: "book4.png"
                },
                5: {
                    name: "Grimoire Zaman Hilang",
                    message: "Kebijaksanaan kuno bergerak — Grimoire Zaman Hilang bergabung dengan perpustakaan Anda.",
                    bookImage: "book5.png"
                },
                6: {
                    name: "Gulungan Keabadian",
                    message: "Waktu membungkuk di hadapan Anda — Anda membuka Gulungan Keabadian.",
                    bookImage: "book6.png"
                },
                7: {
                    name: "Arsip Para Leluhur",
                    message: "Pikiran yang terlupakan bangkit — Anda mengakses Arsip Para Leluhur.",
                    bookImage: "book7.png"
                },
                8: {
                    name: "Buku Besar Dunia Terlupakan",
                    message: "Dunia tersembunyi tercatat — Buku Besar Dunia Terlupakan terungkap.",
                    bookImage: "book8.png"
                },
                9: {
                    name: "Naskah Takdir",
                    message: "Nasib Anda terjalin dengan sejarah — Anda membuka Naskah Takdir.",
                    bookImage: "book9.png"
                },
                10: {
                    name: "Volume Jalan Tak Terbatas",
                    message: "Jalan penguasaan tanpa akhir terbuka — Volume Jalan Tak Terbatas adalah milik Anda.",
                    bookImage: "book10.png"
                },
                11: {
                    name: "Kodeks Para Langit",
                    message: "Kebijaksanaan bintang turun — Anda mengungkap Kodeks Para Langit.",
                    bookImage: "book11.png"
                },
                12: {
                    name: "Gulungan Bintang Berbisik",
                    message: "Kosmos membisikkan rahasia — Anda memegang Gulungan Bintang Berbisik.",
                    bookImage: "book12.png"
                },
                13: {
                    name: "Tome Gerbang Tersembunyi",
                    message: "Dunia baru memanggil — Anda membuka Tome Gerbang Tersembunyi.",
                    bookImage: "book13.png"
                },
                14: {
                    name: "Kitab Api Abadi",
                    message: "Api pencerahan menyala terang — Kitab Api Abadi adalah milik Anda.",
                    bookImage: "book14.png"
                },
                15: {
                    name: "Atlas Mimpi Terlupakan",
                    message: "Peta terakhir terbuka — Anda memiliki Atlas Mimpi Terlupakan.",
                    bookImage: "book15.png"
                }
            },

            messages: {
                success: {
                    bookCollected: "🎉 Anda telah mengumpulkan Kitab Eden!",
                    finalSuccess: "🎉 Selamat! Dengan koleksi buku yang luar biasa ini, Anda adalah yang paling berpengetahuan"
                },
                feedback: {
                    defaultInstruction: "Susun pecahan yang diberikan dari terkecil ke terbesar."
                }
            },

            questions: [
                {
                    id: 1,
                    type: "ASC",
                    instructions: "Seret kartu untuk mengurutkan bilangan campuran berikut dari yang terkecil ke yang terbesar.",
                    step1: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Mango.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Strawberry.png",
                    correctFeedback: "Benar sekali! Bilangan campuran dengan bagian utuh yang lebih besar nilainya lebih besar.",
                    incorrectFeedback: "Coba lagi! Ingat — bilangan campuran dengan bagian utuh yang lebih besar nilainya lebih besar."
                },
                {
                    id: 2,
                    type: "DSC",
                    instructions: "Seret kartu untuk mengurutkan bilangan campuran berikut dari yang terbesar ke yang terkecil.",
                    step1: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Mango.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Strawberry.png",
                    correctFeedback: "Bagus! Karena bagian utuhnya sama, bilangan campuran dengan bagian pecahan yang lebih besar nilainya lebih besar.",
                    incorrectFeedback: "Coba lagi! Bagian utuhnya sama — bandingkan bagian pecahannya saja. Pecahan yang lebih besar berarti bilangan campuran yang lebih besar."
                },
                {
                    id: 3,
                    type: "ASC",
                    instructions: "Seret kartu untuk mengurutkan bilangan campuran berikut dari yang terkecil ke yang terbesar.",
                    step1: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Mango.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Strawberry.png",
                    correctFeedback: "Bagus! Karena bagian utuhnya sama, bilangan campuran dengan bagian pecahan yang lebih besar nilainya lebih besar.",
                    incorrectFeedback: "Coba lagi! Bagian utuhnya sama — bandingkan bagian pecahannya saja. Pecahan yang lebih besar berarti bilangan campuran yang lebih besar."
                },
                {
                    id: 4,
                    type: "DSC",
                    instructions: "Seret kartu untuk mengurutkan bilangan campuran berikut dari yang terbesar ke yang terkecil.",
                    step1: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Mango.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Strawberry.png",
                    correctFeedback: "Benar sekali! Bilangan campuran dengan bagian utuh yang lebih besar nilainya lebih besar.",
                    incorrectFeedback: "Coba lagi! Ingat — bilangan campuran dengan bagian utuh yang lebih besar nilainya lebih besar."
                },
                {
                    id: 5,
                    type: "ASC",
                    instructions: "Seret kartu untuk mengurutkan bilangan campuran berikut dari yang terkecil ke yang terbesar.",
                    step1: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Mango.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Strawberry.png",
                    correctFeedback: "Bagus! Karena bagian utuhnya sama, bilangan campuran dengan bagian pecahan yang lebih besar nilainya lebih besar.",
                    incorrectFeedback: "Coba lagi! Bagian utuhnya sama — bandingkan bagian pecahannya saja. Pecahan yang lebih besar berarti bilangan campuran yang lebih besar."
                },
                {
                    id: 6,
                    type: "DSC",
                    instructions: "Seret kartu untuk mengurutkan bilangan campuran berikut dari yang terbesar ke yang terkecil.",
                    step1: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Mango.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Strawberry.png",
                    correctFeedback: "Bagus! Karena bagian utuhnya sama, bilangan campuran dengan bagian pecahan yang lebih besar nilainya lebih besar.",
                    incorrectFeedback: "Coba lagi! Bagian utuhnya sama — bandingkan bagian pecahannya saja. Pecahan yang lebih besar berarti bilangan campuran yang lebih besar."
                },
                {
                    id: 7,
                    type: "DSC",
                    instructions: "Seret kartu untuk mengurutkan bilangan campuran berikut dari yang terbesar ke yang terkecil.",
                    step1: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Mango.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Strawberry.png",
                    correctFeedback: "Benar sekali! Bilangan campuran dengan bagian utuh yang lebih besar nilainya lebih besar.",
                    incorrectFeedback: "Coba lagi! Ingat — bilangan campuran dengan bagian utuh yang lebih besar nilainya lebih besar."
                },
                {
                    id: 8,
                    type: "ASC",
                    instructions: "Seret kartu untuk mengurutkan bilangan campuran berikut dari yang terkecil ke yang terbesar.",
                    step1: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Mango.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Strawberry.png",
                    correctFeedback: "Benar sekali! Bilangan campuran dengan bagian utuh yang lebih besar nilainya lebih besar.",
                    incorrectFeedback: "Coba lagi! Ingat — bilangan campuran dengan bagian utuh yang lebih besar nilainya lebih besar."
                },
                {
                    id: 9,
                    type: "DSC",
                    instructions: "Seret kartu untuk mengurutkan bilangan campuran berikut dari yang terbesar ke yang terkecil.",
                    step1: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Mango.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Strawberry.png",
                    correctFeedback: "Bagus! Karena bagian utuhnya sama, bilangan campuran dengan bagian pecahan yang lebih besar nilainya lebih besar.",
                    incorrectFeedback: "Coba lagi! Bagian utuhnya sama — bandingkan bagian pecahannya saja. Pecahan yang lebih besar berarti bilangan campuran yang lebih besar."
                },
                {
                    id: 10,
                    type: "ASC",
                    instructions: "Seret kartu untuk mengurutkan bilangan campuran berikut dari yang terkecil ke yang terbesar.",
                    step1: "assets/G2C6M12A2/scaleAssets/mangoScale.png",
                    step2: "assets/G2C6M12A2/scaleAssets/appleScale.png",
                    step3: "assets/G2C6M12A2/scaleAssets/strawberryScale.png",
                    step1Incorrect: "assets/G2C6M12A2/scaleAssets/mangoScaleNumber.png",
                    step1Correct: "assets/G2C6M12A2/single assets/Mango.png",
                    step2Incorrect: "assets/G2C6M12A2/scaleAssets/appleScaleNumber.png",
                    step2Correct: "assets/G2C6M12A2/single assets/Apple.png",
                    step3Incorrect: "assets/G2C6M12A2/scaleAssets/strawberryScaleNumber.png",
                    step3Correct: "assets/G2C6M12A2/single assets/Strawberry.png",
                    correctFeedback: "Benar sekali! Bilangan campuran dengan bagian utuh yang lebih besar nilainya lebih besar.",
                    incorrectFeedback: "Coba lagi! Ingat — bilangan campuran dengan bagian utuh yang lebih besar nilainya lebih besar."
                }
            ],

            pages: {
                page1: {
                    dialogText: "PERIKSA",
                    instructionText: "Ketuk Mulai untuk melanjutkan"
                }
            }
        }
    }
};

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
    },

    // Helper function to get book data
    getBookData: (level) => {
        const lang = AppData.currentLanguage;
        const translation = AppData.translations[lang];

        if (translation.books && translation.books[level]) {
            return translation.books[level];
        }

        // Fallback to English
        const enTranslation = AppData.translations.en;
        if (enTranslation.books && enTranslation.books[level]) {
            return enTranslation.books[level];
        }

        return null;
    },

    // Helper function to get question data
    getQuestionData: (index) => {
        const lang = AppData.currentLanguage;
        const translation = AppData.translations[lang];

        if (translation.questions && translation.questions[index]) {
            return translation.questions[index];
        }

        // Fallback to English
        const enTranslation = AppData.translations.en;
        if (enTranslation.questions && enTranslation.questions[index]) {
            return enTranslation.questions[index];
        }

        return null;
    }
};

// Make i18n globally available
window.i18n = i18n;

// Create a global bookName function that returns internationalized book data
window.bookName = (level) => {
    return i18n.getBookData(level);
};

// Create a global Question function that returns internationalized question data
window.Question = (index) => {
    return i18n.getQuestionData(index);
};

// Add global function to switch language for testing
window.setAppLanguage = (langCode) => {
    console.log(`🌐 Switching app language to: ${langCode}`);
    if (window.i18n && typeof window.i18n.setLanguage === 'function') {
        const success = window.i18n.setLanguage(langCode);
        if (success) {
            console.log(`✅ Language switched to: ${langCode}`);

            // Force update all UI texts immediately without reload
            if (window.StepOrderingGame && typeof window.StepOrderingGame.forceUpdateAllTexts === 'function') {
                window.StepOrderingGame.forceUpdateAllTexts();
            } else {
                // Fallback to individual updates
                if (window.StepOrderingGame && typeof window.StepOrderingGame.updateButtonTexts === 'function') {
                    window.StepOrderingGame.updateButtonTexts();
                }

                if (window.StepOrderingGame && typeof window.StepOrderingGame.resetFeedbackText === 'function') {
                    window.StepOrderingGame.resetFeedbackText();
                }
            }

            console.log('✅ UI texts updated to new language');
        } else {
            console.error(`❌ Failed to switch language to: ${langCode}`);
        }
    } else {
        console.error('❌ i18n system not available');
    }
};

// Add global function to get current language
window.getCurrentAppLanguage = () => {
    if (window.i18n && typeof window.i18n.getCurrentLanguage === 'function') {
        return window.i18n.getCurrentLanguage();
    }
    return 'unknown';
};