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
        navigationReset: "Resetting to question 1",
        navigationComplete: "Complete app reset completed - ready for new question",
        pageStatesCleared: "Page states have been cleared. Reload the page to start fresh?"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Start Over"
      },

      common: {
        questionText: "Andi is helping his mother make a clothesline. If the shape of the clothesline Andi wants is shown in the following picture, how long will the total length of rope Andi need to make the clothesline?",
        tapAnimationAlt: "Tap"
      },

      pages: {
        page1: {
          highlights: [],
          headerText: "Read the question and identify 'given' and 'to find'",
          footerInstruction: "Tap » to identify 'given' information"
        },
        page2: {
          headerText: "Let us visualise the problem to solve it",
          measurementLabel: "3 m",
          buttonText: "Visualise the problem",
          instructionText: "Click on the highlighted button",
          step1Header: "Recognize the Clothesline as a Known Shape",
          step1Instruction: "Note the shape and the given dimensions",
          step2Header: "Divide the Dimensions into Equal Parts",
          step2Instruction: "Observe the tick marks that split each 3 m line into 0.5 m segments",
          step3Header: "Simplify the Diagram to Measure Total Rope Length",
          step3Instruction: "Identify the shape and dimensions to solve the problem",
          step4Header: "Mark the Key Measurements",
          step4Instruction: "Note the measurements shown in the diagram",
          grid3DescriptionText: "We have a simplified visual to help us solve the challenge"
        },
        page3: {
          highlights: [
            { text: "diagonal of a rectangle", highlightColor: "#FFD700", fontColor: "#000000" },
            { text: "its shortest side", highlightColor: "#FFD700", fontColor: "#000000" },
            { text: "60°", highlightColor: "#FFD700", fontColor: "#000000" }
          ],
          triangleDescription: "Note 3 m as the given dimensions of the diagonals of the clothline"
        },
        page4: {
          highlights: [
            { text: "diagonal of a rectangle", highlightColor: "#FFD700", fontColor: "#000000" },
            { text: "its shortest side", highlightColor: "#FFD700", fontColor: "#000000" },
            { text: "60°", highlightColor: "#FFD700", fontColor: "#000000" },
            { text: "length of the diagonal is 12 cm.", highlightColor: "#FFD700", fontColor: "#000000" }
          ],
          lengthOfRopeRequired: "Length of Rope Required",
          equalsSign: "=",
          plusSign: "+",
          animationObservationText: "We see from the animation that all four sides are equal",
          lengthOfQuadrilateral: "Length of quadrilateral",
          multiplySign: "×",
          equation3Text: '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">Rope Required</span></span> = ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #E94B3C;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">C₁C₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #F5A623;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">B₁B₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #4A90E2;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">A₁A₂</span></span> )',
          triangleDescriptionPlus2: "+",
          triangleDescriptionPart5: "Length of quadilateral A<sub>1</sub>A<sub>2</sub>A<sub>3</sub>A<sub>4</sub>",
          flipTileC1C2C3C4: "Length of quadilateral C<sub>1</sub>C<sub>2</sub>C<sub>3</sub>C<sub>4</sub>",
          flipTileB1B2B3B4: "Length of quadilateral B<sub>1</sub>B<sub>2</sub>B<sub>3</sub>B<sub>4</sub>",
          flipTileA1A2A3A4: "Length of quadilateral A<sub>1</sub>A<sub>2</sub>A<sub>3</sub>A<sub>4</sub>",
          flipTileNumber4: "4",
          flipTileLengthOfSide: "Length of Side",
          instruction: 'Tap on "?" to reveal',
          instructionAfterQuiz: "Tap » to continue",
          allSlideAreEqual: "All the sides of the quadrilaterals are equal."
        },
        page5: {
          headerText: '<span style="color: #ffffff;">Let us find side length </span><span style="color: #4A90E2;">A<sub>1</sub>A<sub>2</sub></span><span style="color: #ffffff;"> (inner loop)</span>',
          triangleQuestionText: '<span style="color: #4A90E2;">Δ</span> <span style="color: #4A90E2;">A<sub>1</sub>OA<sub>2</sub></span> is :',
          givenTriangleText: 'Given <span style="color: #4A90E2;">Δ</span> <span style="color: #4A90E2;">A<sub>1</sub>OA<sub>2</sub></span> is an isosceles triangle, What is the ratio of the sides (side : side : hypotenuse)?',
          triangleTypeFeedbackDefault: "Choose the correct type of triangle",
          ratioFeedbackDefault: "Choose the correct ratio of the sides",
          triangleTypeFeedbackIncorrect: "Incorrect! Check the side lengths.",
          triangleTypeFeedbackCorrect: "OA₁ = OA₂ making Δ an isosceles Δ",
          ratioFeedbackIncorrect1: "Incorrect! The ratio 1 : 2 : 3 does not match an isosceles triangle.",
          ratioFeedbackIncorrect2: "Incorrect! The ratio 1 : $\\sqrt{3}$ : 2 does not match an isosceles triangle.",
          ratioFeedbackIncorrect3: "Incorrect! The ratio 1 : $\\sqrt{2}$ : 1 does not match an isosceles triangle.",
          ratioFeedbackCorrect: "Δ A₁OA₂, the ratio of sides OA₁ : OA₂ : A₁A₂ is 1 : 1 : $\\sqrt{2}$.",
          thirdAnswerText: 'A₁A₂ in Δ A₁OA₂ = 0.5  x $\\sqrt{2}$ = 0.5$\\sqrt{2}$',
          triangleButtonScalene: "a\nscalene Δ",
          triangleButtonIsosceles: "an\nisosceles Δ",
          triangleButtonEquilateral: "an\nequilateral Δ",
          ratioButton1: "1 : 2 : 3",
          ratioButton2: "1 : 1 : $\\sqrt{2}$",
          ratioButton3: "1 : $\\sqrt{3}$ : 2",
          ratioButton4: "1 : $\\sqrt{2}$ : 1",
          label05: "0.5",
          instruction: "Answer the questions correctly to move forward",
          instructionAfterQuiz: "Tap » to continue"
        },
        page6: {
          headerText: '<span style="color: #ffffff;">Let us find side length </span><span style="color: #F5A623;">B<sub>1</sub>B<sub>2</sub></span><span style="color: #ffffff;"> (middle loop)</span>',
          triangleQuestionText: '<span style="color: #F5A623;">Δ</span> <span style="color: #F5A623;">B<sub>1</sub>OB<sub>2</sub></span> is :',
          givenTriangleText: 'Given <span style="color: #F5A623;">Δ</span> <span style="color: #F5A623;">B<sub>1</sub>OB<sub>2</sub></span> is an isosceles triangle, What is the ratio of the sides (side : side : hypotenuse)?',
          triangleTypeFeedbackDefault: "Choose the correct type of triangle",
          ratioFeedbackDefault: "Choose the correct ratio of the sides",
          triangleTypeFeedbackIncorrect: "Incorrect! Check the side lengths.",
          triangleTypeFeedbackCorrect: "OB₁ = OB₂ making Δ an isosceles Δ",
          ratioFeedbackIncorrect1: "Incorrect! The ratio 1 : 2 : 3 does not match an isosceles triangle.",
          ratioFeedbackIncorrect2: "Incorrect! The ratio 1 : $\\sqrt{3}$ : 2 does not match an isosceles triangle.",
          ratioFeedbackIncorrect3: "Incorrect! The ratio 1 : $\\sqrt{2}$ : 1 does not match an isosceles triangle.",
          ratioFeedbackCorrect: "Δ B₁OB₂, the ratio of sides OB₁ : OB₂ : B₁B₂ is 1 : 1 : $\\sqrt{2}$.",
          thirdAnswerText: 'B₁B₂ in Δ B₁OB₂ = 1 × $\\sqrt{2}$ = $\\sqrt{2}$',
          triangleButtonScalene: "a\nscalene Δ",
          triangleButtonIsosceles: "an\nisosceles Δ",
          triangleButtonEquilateral: "an\nequilateral Δ",
          ratioButton1: "1 : 2 : 3",
          ratioButton2: "1 : 1 : $\\sqrt{2}$",
          ratioButton3: "1 : $\\sqrt{3}$ : 2",
          ratioButton4: "1 : $\\sqrt{2}$ : 1",
          label05: "0.5",
          instruction: "Answer the questions correctly to move forward",
          instructionAfterQuiz: "Tap » to continue"
        },
        page7: {
          headerText: '<span style="color: #ffffff;">Let us find side length </span><span style="color: #E94B3C;">C<sub>1</sub>C<sub>2</sub></span><span style="color: #ffffff;"> (outer loop)</span>',
          triangleQuestionText: '<span style="color: #E94B3C;">Δ</span> <span style="color: #E94B3C;">C<sub>1</sub>OC<sub>2</sub></span> is :',
          givenTriangleText: 'Given <span style="color: #E94B3C;">Δ</span> <span style="color: #E94B3C;">C<sub>1</sub>OC<sub>2</sub></span> is an isosceles triangle, What is the ratio of the sides (side : side : hypotenuse)?',
          triangleTypeFeedbackDefault: "Choose the correct type of triangle",
          ratioFeedbackDefault: "Choose the correct ratio of the sides",
          triangleTypeFeedbackIncorrect: "Incorrect! Check the side lengths.",
          triangleTypeFeedbackCorrect: "OC₁ = OC₂ making Δ an isosceles Δ",
          ratioFeedbackIncorrect1: "Incorrect! The ratio 1 : 2 : 3 does not match an isosceles triangle.",
          ratioFeedbackIncorrect2: "Incorrect! The ratio 1 : $\\sqrt{3}$ : 2 does not match an isosceles triangle.",
          ratioFeedbackIncorrect3: "Incorrect! The ratio 1 : $\\sqrt{2}$ : 1 does not match an isosceles triangle.",
          ratioFeedbackCorrect: "Δ C₁OC₂, the ratio of sides OC₁ : OC₂ : C₁C₂ is 1 : 1 : $\\sqrt{2}$.",
          thirdAnswerText: 'C₁C₂ in Δ C₁OC₂ = 1.5 x $\\sqrt{2}$ = 1.5$\\sqrt{2}$',
          triangleButtonScalene: "a\nscalene Δ",
          triangleButtonIsosceles: "an\nisosceles Δ",
          triangleButtonEquilateral: "an\nequilateral Δ",
          ratioButton1: "1 : 2 : 3",
          ratioButton2: "1 : 1 : $\\sqrt{2}$",
          ratioButton3: "1 : $\\sqrt{3}$ : 2",
          ratioButton4: "1 : $\\sqrt{2}$ : 1",
          label05: "0.5",
          instruction: "Answer the questions correctly to move forward",
          instructionAfterQuiz: "Tap » to continue"
        },
        page8: {
          headerText: "Let us combine all results to find the solution",
          instruction: "Tap » to continue",
          equation3Text: '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">Rope Required</span></span> = ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #E94B3C;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">C₁C₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #F5A623;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">B₁B₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #4A90E2;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">A₁A₂</span></span> )',
          calculationResultsText: 'As calculated, <span style="color: #4A90E2;">A₁A₂ = $\\sqrt{2}$</span>; <span style="color: #F5A623;">B₁B₂ = $\\sqrt{2}$</span>; <span style="color: #E94B3C;">C₁C₂ = $\\sqrt{2}$</span>',
          equation4Text: '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">Rope Required</span></span> = 4 × (<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #E94B3C;">0.5$\\sqrt{2}$</span>  + <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #F5A623;">$\\sqrt{2}$</span>  +  <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #4A90E2;">1.5$\\sqrt{2}$</span> )',
          equation5Text: '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Length of</span><span style="display: block; text-align: center;">Rope Required</span></span> = </span>  <span style="color: #4acbe2;">4(3$\\sqrt{2}$)</span> = <span style="color: #ffffff; background-color: #00AA55; padding: 4px 8px; border-radius: 4px;">$12\\sqrt{2}$</span>'
        },
        page9: {
          headerText: "Activity completed",
          instruction: "Tap » to start over again",
          solutionText: "Therefore, the total length of rope Andi needs to make the clothesline is <span style=\"color: #00AA55; font-weight: bold;\">$12\\sqrt{2}$</span> units.",
          instructionAfterQuiz: "Tap » to continue"
        }
      }
    },

    // ✅ Indonesian (id) translations
    id: {
      appInfo: {
        title: "Rasio - Perbandingan Jarak Komodo"
      },
      messages: {
        navigationReset: "Mengatur ulang ke pertanyaan 1",
        navigationComplete: "Pengaturan ulang aplikasi selesai - siap untuk pertanyaan baru",
        pageStatesCleared: "Status halaman telah dihapus. Muat ulang halaman untuk memulai dari awal?"
      },

      buttons: {
        next: "»",
        previous: "«",
        startOver: "Mulai Ulang"
      },

      common: {
        questionText: "Andi membantu ibunya membuat jemuran. Jika bentuk jemuran yang diinginkan Andi ditunjukkan pada gambar berikut, berapa panjang total tali yang dibutuhkan Andi untuk membuat jemuran?",
        tapAnimationAlt: "Ketuk"
      },

      pages: {
        page1: {
          highlights: [],
          headerText: "Baca pertanyaan dan identifikasi 'diketahui' dan 'yang dicari'",
          footerInstruction: "Ketuk » untuk mengidentifikasi informasi 'diketahui'"
        },
        page2: {
          headerText: "Mari kita visualisasikan masalah untuk menyelesaikannya",
          measurementLabel: "3 m",
          buttonText: "Visualisasikan masalah",
          instructionText: "Klik tombol yang disorot",
          step1Header: "Kenali Jemuran sebagai Bentuk yang Dikenal",
          step1Instruction: "Perhatikan bentuk dan dimensi yang diberikan",
          step2Header: "Bagi Dimensi menjadi Bagian yang Sama",
          step2Instruction: "Perhatikan tanda centang yang membagi setiap garis 3 m menjadi segmen 0,5 m",
          step3Header: "Sederhanakan Diagram untuk Mengukur Panjang Tali Total",
          step3Instruction: "Identifikasi bentuk dan dimensi untuk menyelesaikan masalah",
          step4Header: "Tandai Pengukuran Kunci",
          step4Instruction: "Perhatikan pengukuran yang ditunjukkan dalam diagram",
          grid3DescriptionText: "Kita memiliki visual sederhana untuk membantu kita menyelesaikan tantangan"
        },
        page3: {
          highlights: [
            { text: "diagonal persegi panjang", highlightColor: "#FFD700", fontColor: "#000000" },
            { text: "sisi terpendeknya", highlightColor: "#FFD700", fontColor: "#000000" },
            { text: "60°", highlightColor: "#FFD700", fontColor: "#000000" }
          ],
          triangleDescription: "Perhatikan 3m sebagai dimensi yang diberikan dari diagonal jemuran"
        },
        page4: {
          highlights: [
            { text: "diagonal persegi panjang", highlightColor: "#FFD700", fontColor: "#000000" },
            { text: "sisi terpendeknya", highlightColor: "#FFD700", fontColor: "#000000" },
            { text: "60°", highlightColor: "#FFD700", fontColor: "#000000" },
            { text: "panjang diagonalnya adalah 12 cm.", highlightColor: "#FFD700", fontColor: "#000000" }
          ],
          lengthOfRopeRequired: "Panjang Tali yang Diperlukan",
          equalsSign: "=",
          plusSign: "+",
          animationObservationText: "Kita lihat dari animasi bahwa keempat sisinya sama",
          lengthOfQuadrilateral: "Panjang segi empat",
          multiplySign: "×",
          equation3Text: '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Panjang</span><span style="display: block; text-align: center;">Tali yang Diperlukan</span></span> = ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #E94B3C;"><span style="display: block; text-align: center;">Panjang</span><span style="display: block; text-align: center;">C₁C₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #F5A623;"><span style="display: block; text-align: center;">Panjang</span><span style="display: block; text-align: center;">B₁B₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #4A90E2;"><span style="display: block; text-align: center;">Panjang</span><span style="display: block; text-align: center;">A₁A₂</span></span> )',
          triangleDescriptionPlus2: "+",
          triangleDescriptionPart5: "Panjang segi empat A<sub>1</sub>A<sub>2</sub>A<sub>3</sub>A<sub>4</sub>",
          flipTileC1C2C3C4: "Panjang segi empat C<sub>1</sub>C<sub>2</sub>C<sub>3</sub>C<sub>4</sub>",
          flipTileB1B2B3B4: "Panjang segi empat B<sub>1</sub>B<sub>2</sub>B<sub>3</sub>B<sub>4</sub>",
          flipTileA1A2A3A4: "Panjang segi empat A<sub>1</sub>A<sub>2</sub>A<sub>3</sub>A<sub>4</sub>",
          flipTileNumber4: "4",
          flipTileLengthOfSide: "Panjang Sisi",
          instruction: 'Ketuk pada "?" untuk membuka',
          instructionAfterQuiz: "Ketuk » untuk melanjutkan"
        },
        page5: {
          headerText: '<span style="color: #ffffff;">Mari kita cari panjang sisi </span><span style="color: #4A90E2;">A<sub>1</sub>A<sub>2</sub></span><span style="color: #ffffff;"> (lingkaran dalam)</span>',
          triangleQuestionText: '<span style="color: #4A90E2;">Δ</span> <span style="color: #4A90E2;">A<sub>1</sub>OA<sub>2</sub></span> adalah :',
          givenTriangleText: 'Diketahui <span style="color: #4A90E2;">Δ</span> <span style="color: #4A90E2;">A<sub>1</sub>OA<sub>2</sub></span> adalah segitiga sama kaki, Berapakah perbandingan sisi-sisinya (sisi : sisi : hipotenusa)?',
          triangleTypeFeedbackDefault: "Pilih jenis segitiga yang benar",
          ratioFeedbackDefault: "Pilih perbandingan sisi yang benar",
          triangleTypeFeedbackIncorrect: "Salah! Periksa panjang sisinya.",
          triangleTypeFeedbackCorrect: "OA₁ = OA₂ membuat Δ menjadi segitiga sama kaki Δ",
          ratioFeedbackIncorrect1: "Salah! Perbandingan 1 : 2 : 3 tidak cocok dengan segitiga sama kaki.",
          ratioFeedbackIncorrect2: "Salah! Perbandingan 1 : $\\sqrt{3}$ : 2 tidak cocok dengan segitiga sama kaki.",
          ratioFeedbackIncorrect3: "Salah! Perbandingan 1 : $\\sqrt{2}$ : 1 tidak cocok dengan segitiga sama kaki.",
          ratioFeedbackCorrect: "Δ A₁OA₂, perbandingan sisi OA₁ : OA₂ : A₁A₂ adalah 1 : 1 : $\\sqrt{2}$.",
          thirdAnswerText: 'A₁A₂ dalam Δ A₁OA₂ = 0.5 × $\\sqrt{2}$ = $\\frac{\\sqrt{2}}{2}$ = <span style="color: #F59E0B;">$\\frac{1}{\\sqrt{2}}$</span>',
          triangleButtonScalene: "segitiga\nsembarang Δ",
          triangleButtonIsosceles: "segitiga\nsama kaki Δ",
          triangleButtonEquilateral: "segitiga\nsama sisi Δ",
          ratioButton1: "1 : 2 : 3",
          ratioButton2: "1 : 1 : $\\sqrt{2}$",
          ratioButton3: "1 : $\\sqrt{3}$ : 2",
          ratioButton4: "1 : $\\sqrt{2}$ : 1",
          label05: "0.5",
          instruction: "Jawab pertanyaan dengan benar untuk melanjutkan",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan"
        },
        page6: {
          headerText: '<span style="color: #ffffff;">Mari kita cari panjang sisi </span><span style="color: #F5A623;">B<sub>1</sub>B<sub>2</sub></span><span style="color: #ffffff;"> (lingkaran tengah)</span>',
          triangleQuestionText: '<span style="color: #F5A623;">Δ</span> <span style="color: #F5A623;">B<sub>1</sub>OB<sub>2</sub></span> adalah :',
          givenTriangleText: 'Diketahui <span style="color: #F5A623;">Δ</span> <span style="color: #F5A623;">B<sub>1</sub>OB<sub>2</sub></span> adalah segitiga sama kaki, Berapakah perbandingan sisi-sisinya (sisi : sisi : hipotenusa)?',
          triangleTypeFeedbackDefault: "Pilih jenis segitiga yang benar",
          ratioFeedbackDefault: "Pilih perbandingan sisi yang benar",
          triangleTypeFeedbackIncorrect: "Salah! Periksa panjang sisinya.",
          triangleTypeFeedbackCorrect: "OB₁ = OB₂ membuat Δ menjadi segitiga sama kaki Δ",
          ratioFeedbackIncorrect1: "Salah! Perbandingan 1 : 2 : 3 tidak cocok dengan segitiga sama kaki.",
          ratioFeedbackIncorrect2: "Salah! Perbandingan 1 : $\\sqrt{3}$ : 2 tidak cocok dengan segitiga sama kaki.",
          ratioFeedbackIncorrect3: "Salah! Perbandingan 1 : $\\sqrt{2}$ : 1 tidak cocok dengan segitiga sama kaki.",
          ratioFeedbackCorrect: "Δ B₁OB₂, perbandingan sisi OB₁ : OB₂ : B₁B₂ adalah 1 : 1 : $\\sqrt{2}$.",
          thirdAnswerText: 'B₁B₂ dalam Δ B₁OB₂ = 1 × $\\sqrt{2}$ = $\\sqrt{2}$',
          triangleButtonScalene: "segitiga\nsembarang Δ",
          triangleButtonIsosceles: "segitiga\nsama kaki Δ",
          triangleButtonEquilateral: "segitiga\nsama sisi Δ",
          ratioButton1: "1 : 2 : 3",
          ratioButton2: "1 : 1 : $\\sqrt{2}$",
          ratioButton3: "1 : $\\sqrt{3}$ : 2",
          ratioButton4: "1 : $\\sqrt{2}$ : 1",
          label05: "0.5",
          instruction: "Jawab pertanyaan dengan benar untuk melanjutkan",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan"
        },
        page7: {
          headerText: '<span style="color: #ffffff;">Mari kita cari panjang sisi </span><span style="color: #E94B3C;">C<sub>1</sub>C<sub>2</sub></span><span style="color: #ffffff;"> (lingkaran luar)</span>',
          triangleQuestionText: '<span style="color: #E94B3C;">Δ</span> <span style="color: #E94B3C;">C<sub>1</sub>OC<sub>2</sub></span> adalah :',
          givenTriangleText: 'Diketahui <span style="color: #E94B3C;">Δ</span> <span style="color: #E94B3C;">C<sub>1</sub>OC<sub>2</sub></span> adalah segitiga sama kaki, Berapakah perbandingan sisi-sisinya (sisi : sisi : hipotenusa)?',
          triangleTypeFeedbackDefault: "Pilih jenis segitiga yang benar",
          ratioFeedbackDefault: "Pilih perbandingan sisi yang benar",
          triangleTypeFeedbackIncorrect: "Salah! Periksa panjang sisinya.",
          triangleTypeFeedbackCorrect: "OC₁ = OC₂ membuat Δ menjadi segitiga sama kaki Δ",
          ratioFeedbackIncorrect1: "Salah! Perbandingan 1 : 2 : 3 tidak cocok dengan segitiga sama kaki.",
          ratioFeedbackIncorrect2: "Salah! Perbandingan 1 : $\\sqrt{3}$ : 2 tidak cocok dengan segitiga sama kaki.",
          ratioFeedbackIncorrect3: "Salah! Perbandingan 1 : $\\sqrt{2}$ : 1 tidak cocok dengan segitiga sama kaki.",
          ratioFeedbackCorrect: "Δ C₁OC₂, perbandingan sisi OC₁ : OC₂ : C₁C₂ adalah 1 : 1 : $\\sqrt{2}$.",
          thirdAnswerText: 'C₁C₂ dalam Δ C₁OC₂ = 1.5 × $\\sqrt{2}$ = $\\frac{3\\sqrt{2}}{2}$',
          triangleButtonScalene: "segitiga\nsembarang Δ",
          triangleButtonIsosceles: "segitiga\nsama kaki Δ",
          triangleButtonEquilateral: "segitiga\nsama sisi Δ",
          ratioButton1: "1 : 2 : 3",
          ratioButton2: "1 : 1 : $\\sqrt{2}$",
          ratioButton3: "1 : $\\sqrt{3}$ : 2",
          ratioButton4: "1 : $\\sqrt{2}$ : 1",
          label05: "0.5",
          instruction: "Jawab pertanyaan dengan benar untuk melanjutkan",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan"
        },
        page8: {
          headerText: "Mari kita gabungkan semua hasil untuk menemukan solusi",
          instruction: "Ketuk » untuk melanjutkan",
          equation3Text: '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Panjang</span><span style="display: block; text-align: center;">Tali yang Diperlukan</span></span> = ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #E94B3C;"><span style="display: block; text-align: center;">Panjang</span><span style="display: block; text-align: center;">C₁C₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #F5A623;"><span style="display: block; text-align: center;">Panjang</span><span style="display: block; text-align: center;">B₁B₂</span></span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #4A90E2;"><span style="display: block; text-align: center;">Panjang</span><span style="display: block; text-align: center;">A₁A₂</span></span> )',
          calculationResultsText: 'Seperti yang dihitung, <span style="color: #4A90E2;">A₁A₂ = $\\frac{\\sqrt{2}}{2}$</span>; <span style="color: #F5A623;">B₁B₂ = $\\sqrt{2}$</span>; <span style="color: #E94B3C;">C₁C₂ = $\\frac{3\\sqrt{2}}{2}$</span>',
          equation4Text: '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Panjang</span><span style="display: block; text-align: center;">Tali yang Diperlukan</span></span> = ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #E94B3C;">$\\frac{3\\sqrt{2}}{2}$</span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #F5A623;">$\\sqrt{2}$</span> ) + ( 4 × <span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px; color: #4A90E2;">$\\frac{\\sqrt{2}}{2}$</span> )',
          equation5Text: '<span style="display: inline-block; white-space: normal; line-height: 1.2; vertical-align: middle; text-align: center; margin: 0 8px;"><span style="display: block; text-align: center;">Panjang</span><span style="display: block; text-align: center;">Tali yang Diperlukan</span></span> = <span style="color: #E94B3C;">$6\\sqrt{2}$</span> + <span style="color: #F5A623;">$4\\sqrt{2}$</span> + <span style="color: #4A90E2;">$2\\sqrt{2}$</span> = <span style="color: #ffffff; background-color: #00AA55; padding: 4px 8px; border-radius: 4px;">$12\\sqrt{2}$</span>'
        },
        page9: {
          headerText: "Aktivitas selesai",
          instruction: "Ketuk » untuk memulai lagi",
          solutionText: "Oleh karena itu, total panjang tali yang dibutuhkan Andi untuk membuat jemuran adalah <span style=\"color: #00AA55; font-weight: bold;\">$12\\sqrt{2}$</span> satuan.",
          instructionAfterQuiz: "Ketuk » untuk melanjutkan"
        }
      }
    },
  },
};

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
