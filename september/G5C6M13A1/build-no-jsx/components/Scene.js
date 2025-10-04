import React, { useEffect, useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import Fraction from "./Fraction";
import Option from "./Option";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import AnimatedResult from "./AnimatedResult";
import ErrorMessage from "./ErrorMessage";
import Tap from "./Tap";
const Scene = ({
  onNext
}) => {
  const [divisionSteps, setDivisionSteps] = useState([]);
  const [showFraction, setShowFraction] = useState(true);
  const [errorShow, setShowError] = useState(false);
  const [flag, setFlag] = useState(null);
  const [divisorOption, setDivisorOption] = useState(null);
  const [allDisabled, setAllDisabled] = useState(false);
  const [showHeading, setShowHeading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [showSoFar, setShowSoFar] = useState(false);
  const [next, setNext] = useState(false);
  const [currentFraction, setCurrentFraction] = useState({
    num: 12,
    den: 24
  });
  const [isSimplified, setIsSimplified] = useState(false);
  const result = sessionStorage.getItem("fractionsData");
  const parsed = JSON.parse(result);
  console.log("parsed", parsed);
  const handleResult = id => {
    setDivisorOption(id);
    if (id === 2 && (currentFraction.num % 2 !== 0 || currentFraction.den % 2 !== 0)) {
      playWrong();
      setFlag(6);
      setShowError(true);
      console.log("hi");
    } else if (id === 3 && (currentFraction.num % 3 !== 0 || currentFraction.den % 3 !== 0)) {
      playWrong();
      setFlag(6);
      setShowError(true);
      console.log("hi");
    } else if (id === 2 || id === 3) {
      // Check if the divisor can actually divide both numerator and denominator
      if (currentFraction.num % id === 0 && currentFraction.den % id === 0) {
        playCorrect();
        setShowError(true);
        setFlag(1); // Success fla
        // Create new division step
        const newStep = {
          divisor: id,
          originalNum: currentFraction.num,
          originalDen: currentFraction.den,
          newNum: currentFraction.num / id,
          newDen: currentFraction.den / id
        };

        // Add to division steps
        setDivisionSteps(prev => [...prev, newStep]);

        // Update current fraction
        const newFraction = {
          num: currentFraction.num / id,
          den: currentFraction.den / id
        };
        setCurrentFraction(newFraction);
        const savedData = JSON.parse(sessionStorage.getItem("fractionsData")) || [];

        // Push new step + fraction together
        savedData.push({
          step: newStep,
          fraction: newFraction
        });

        // Save back
        sessionStorage.setItem("fractionsData", JSON.stringify(savedData));
        // Hide original fraction after first division
        if (showFraction) {
          setShowFraction(false);
          setShowResult(true);
        }

        // Check if fraction is simplified (1/2)
        if (newFraction.num === 1 && newFraction.den === 2 && isSimplified) {
          setAllDisabled(true);
          setShowHeading(true);
          setIsSimplified(true);
          setFlag(1);
          setShowError(true);
        }
      } else {
        playWrong();
        setShowError(true);
        setFlag(0); // Error flag
      }
    } else if (id === 4) {
      // "Cannot divide" option - check if it's correct
      if (currentFraction.num === 1 || currentFraction.den === 2) {
        setAllDisabled(true);
        setShowHeading(true);
        setIsSimplified(true);
        playCorrect();
        setShowError(true);
        setFlag(4); // Success flag
      } else {
        playWrong();
        setShowError(true);
        setFlag(5); // Error flag
      }
    } else if (id === 5) {
      playWrong();
      setShowError(true);
      setFlag(2);
      // Create new division s
    } else {
      playWrong();
      setShowError(true);
      setFlag(0); // Error flag
    }
  };
  console.log("heading", showHeading);
  const {
    t
  } = useTranslation();
  const handleNextOne = () => {
    playClick();
    setShowResult(false);
    setShowSoFar(true);
    setShowHeading(false);
    setNext(true);
  };
  const handleNext = () => {
    playClick();
    onNext();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-constainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-main"
  }, showFraction && /*#__PURE__*/React.createElement("div", {
    className: "scene-main-first"
  }, /*#__PURE__*/React.createElement(Fraction, {
    numerator: currentFraction.num,
    denominator: currentFraction.den,
    fontSize: "12vw",
    lineHeight: "1.5vh",
    lineWidth: "100%"
  })), divisionSteps.length > 0 && showResult && /*#__PURE__*/React.createElement("div", {
    className: "scene-main-first",
    style: {
      justifyContent: "flex-start"
    }
  }, divisionSteps.map((step, index) => /*#__PURE__*/React.createElement(AnimatedResult, {
    key: index,
    step: step,
    stepIndex: index,
    isLastStep: index === divisionSteps.length - 1
  })), showHeading && /*#__PURE__*/React.createElement("div", {
    className: "heading-align"
  }, /*#__PURE__*/React.createElement(Fraction, {
    numerator: 12,
    denominator: 24,
    fontSize: "3vw"
  }), /*#__PURE__*/React.createElement("p", null, t("simplestFormHeading")), /*#__PURE__*/React.createElement(Fraction, {
    numerator: 1,
    denominator: 2,
    fontSize: "3vw"
  }))), showSoFar && /*#__PURE__*/React.createElement("div", {
    className: "scene-main-first"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading-align",
    style: {
      gap: "2vh"
    }
  }, /*#__PURE__*/React.createElement(Fraction, {
    numerator: 12,
    denominator: 24,
    fontSize: "5vw",
    lineWidth: "100%",
    lineHeight: "0.5vh"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "5vw"
    }
  }, " ", t("simplestFormHeading"), " "), /*#__PURE__*/React.createElement(Fraction, {
    numerator: 1,
    denominator: 2,
    fontSize: "5vw",
    lineWidth: "100%",
    lineHeight: "0.5vh"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-main-second"
  }, /*#__PURE__*/React.createElement(Option, {
    response: handleResult,
    setShowError: () => setShowError(false),
    allDisabled: allDisabled
  }), errorShow && /*#__PURE__*/React.createElement(ErrorMessage, {
    flag: flag
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), !isSimplified && /*#__PURE__*/React.createElement("p", null, t("navigation.tapOption")), showHeading && /*#__PURE__*/React.createElement("p", null, t("navigation.tapContinue")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapToSeeFar")), !isSimplified && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), showHeading && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNextOne
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%"
  })), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%"
  }))));
};
export default Scene;