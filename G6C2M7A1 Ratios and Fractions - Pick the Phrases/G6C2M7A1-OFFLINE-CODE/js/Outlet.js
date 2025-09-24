const {useState,useEffect}=React;
const questions = [{
  question: "questions.questionStudent",
  image: "student.png",
  for: "ratio",
  heading: "pictureHeading.student",
  width: "36vw",
  widthTwo: "20vw",
  one: "one"
}, {
  question: "questions.questionTeacher",
  image: "teacher.png",
  for: "ratio",
  heading: "pictureHeading.teacher",
  width: "36vw",
  widthTwo: "20vw",
  one: "two"
}, {
  question: "questions.questionPizza",
  image: "pizza.png",
  for: "fraction",
  heading: "pictureHeading.pizza",
  width: "30vw",
  widthTwo: "13vw",
  one: "three"
}, {
  question: "questions.questionComic",
  image: "comic.png",
  for: "fraction",
  heading: "pictureHeading.comic",
  width: "30vw",
  widthTwo: "15vw",
  one: "four"
}, {
  question: "questions.questionApple",
  image: "orangeapple.png",
  for: "ratio",
  heading: "pictureHeading.apple",
  width: "31vw",
  widthTwo: "20vw",
  one: "five"
}, {
  question: "questions.questionSleep",
  image: "sleep.png",
  for: "fraction",
  heading: "pictureHeading.sleep",
  width: "36vw",
  widthTwo: "20vw",
  one: "six"
}];
const Outlet = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [start, setStart] = useState(true);
  const [sceneOne, setSceneOne] = useState(false);
  const [sceneTwo, setSceneTwo] = useState(false);
  const [sceneThree, setSceneThree] = useState(false);
  const [sceneFour, setSceneFour] = useState(false);
  const [end, setEnd] = useState(false);
  const handleStart = () => {
    setStart(false);
    setSceneOne(true);
  };
  const handlePrevOne = () => {
    setSceneOne(false);
    setStart(true);
  };
  const handleNextOne = () => {
    setSceneOne(false);
    setSceneTwo(true);
  };
  const handlePrevTwo = () => {
    setSceneTwo(false);
    setSceneOne(true);
  };
  const handleNextTwo = () => {
    setSceneTwo(false);
    setSceneThree(true);
  };
  const handleNextThree = () => {
    setSceneThree(false);
    setSceneFour(true);
  };
  const handleNextFour = () => {
    if (currentIndex + 1 === questions.length) {
      setSceneFour(false);
      setEnd(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSceneFour(false);
      setSceneThree(true);
    }
  };
  const handlePrevThree = () => {
    if (currentIndex === 0) {
      setSceneThree(false);
      setSceneTwo(true);
    } else {
      setCurrentIndex(prev => prev - 1);
      setSceneThree(false);
      setSceneFour(true);
    }
  };
  const handlePrevFour = () => {
    setSceneFour(false);
    setSceneThree(true);
  };
  const currentQuestion = questions[currentIndex];
  return /*#__PURE__*/React.createElement("div", {
    className: "outlet"
  }, start && /*#__PURE__*/React.createElement(StartPage, {
    onClose: handleStart
  }), sceneOne && /*#__PURE__*/React.createElement(ExampleApple, {
    onNext: handleNextOne,
    onPrev: handlePrevOne
  }), sceneTwo && /*#__PURE__*/React.createElement(MarbleExample, {
    onPrev: handlePrevTwo,
    onNext: handleNextTwo
  }), sceneThree && /*#__PURE__*/React.createElement(SceneOne, {
    questions: currentQuestion,
    onNext: handleNextThree,
    onPrev: handlePrevThree
  }), sceneFour && /*#__PURE__*/React.createElement(SceneTwo, {
    questions: questions,
    onNext: handleNextFour,
    questionIndex: currentIndex,
    questionHeading: currentQuestion.question,
    onPrev: handlePrevFour
  }), end && /*#__PURE__*/React.createElement(ActivityCompleted, null), /*#__PURE__*/React.createElement(RefreshDetector, null));
};
window.Outlet=Outlet;