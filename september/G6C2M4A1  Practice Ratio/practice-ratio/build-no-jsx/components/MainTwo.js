import React, { useState } from "react";
import "./main.css";
import { useSSR, useTranslation } from "react-i18next";
import Catimage from "./Catimage";
import DogAndCatOption from "./DogAndCatOption";
import ResultBox from "./ResultBox";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import tap from "../assets/tap.gif";
import FooterButtons from "./FooterButtons";
import TableImage from "./TableImage";
import TableOption from "./TableOption";
const MainTwo = ({
  onNext,
  options,
  correctOption,
  onPrev
}) => {
  const {
    t
  } = useTranslation();
  const [stepOne, setStepOne] = React.useState(true);
  const [stepTwo, setStepTwo] = React.useState(false);
  const [stepThree, setStepThree] = React.useState(false);
  const [boxResultOne, setBoxResultOne] = React.useState("");
  const [boxOneCss, setBoxOneCss] = React.useState("");
  const [showErrorOne, setShowErrorOne] = React.useState(false);
  const [boxResultTwo, setBoxResultTwo] = React.useState("");
  const [boxTwoCss, setBoxTwoCss] = React.useState("");
  const [showErrorTwo, setShowErrorTwo] = React.useState(false);
  const [boxResultThree, setBoxResultThree] = React.useState("");
  const [boxThreeCss, setBoxThreeCss] = React.useState("");
  const [showErrorThree, setShowErrorThree] = React.useState(false);
  const [tapProceed, setTapProceed] = React.useState(false);
  const [btnTwo, setBtnTwo] = React.useState(false);
  const [disabledNext, setDisabledNext] = React.useState(true);
  const [nextOne, setNextOne] = React.useState(false);
  const [nextTwo, setNextTwo] = React.useState(false);
  const [tapRatio, setTapRatio] = React.useState(true);
  const [beat, setBeat] = React.useState(true);
  const [beatOne, setBeatOne] = React.useState(false);
  const [beatTwo, setBeatTwo] = React.useState(false);
  const [buttondis, setButtonDis] = React.useState(false);
  console.log("btnTwo", btnTwo);
  const handleBoxResultOne = option => {
    if (!stepOne) return;
    setBoxResultOne(option);
    if (option === correctOption[0]) {
      playCorrect();
      setBoxOneCss("correct");
      setNextOne(true);
      setTapRatio(false);
      setBeat(false);
      setDisabledNext(false);
      setShowErrorOne(true);
    } else {
      playWrong();
      setBoxOneCss("incorrect");
      setShowErrorOne(true);
    }
  };
  const handleNextOne = () => {
    playClick();
    setNextOne(false);
    setShowErrorOne(false);
    setStepOne(false);
    setBeatOne(true);
    setDisabledNext(true);
    setTapRatio(true);
    setStepTwo(true);
  };
  const handleBoxResultTwo = option => {
    if (!stepTwo) return;
    setBoxResultTwo(option);
    if (option === correctOption[1]) {
      playCorrect();
      setBoxTwoCss("correct");
      setNextTwo(true);
      setBeatOne(false);
      setTapRatio(false);
      setDisabledNext(false);
      setShowErrorTwo(true);
    } else {
      playWrong();
      setBoxTwoCss("incorrect");
      setShowErrorTwo(true);
    }
  };
  const handleNextTwo = () => {
    playClick();
    setNextTwo(false);
    setStepTwo(false);
    setShowErrorTwo(false);
    setBeatTwo(true);
    setStepThree(true);
    setBtnTwo(true);
    setButtonDis(true);
    setDisabledNext(true);
    setTapRatio(true);
  };
  const handleBoxResultThree = option => {
    if (!stepThree) return;
    setBoxResultThree(option);
    if (option === correctOption[2]) {
      playCorrect();
      setBoxThreeCss("correct");
      setTapRatio(false);
      setBeatTwo(false);
      setDisabledNext(false);
      setTapProceed(true);
      setShowErrorThree(true);
      setBtnTwo(false);
    } else {
      playWrong();
      setBoxThreeCss("incorrect");
      setShowErrorThree(true);
    }
  };
  const handleProceed = () => {
    playClick();
    setStepThree(false);
    onNext();
  };
  const handlePrevOne = () => {
    playClick();
    onPrev();
  };
  const handlePrevTwo = () => {
    playClick();
    setStepTwo(false);
    setBeat(true);
    setBeatOne(false);
    setStepOne(true);
    setBoxResultOne("");
    setBoxResultTwo("");
    setBoxOneCss("");
    setBoxTwoCss("");
    setNextOne(false);
  };
  const handlePrevThree = () => {
    playClick();
    setStepThree(false);
    setBeatOne(true);
    setBeatTwo(false);
    setStepTwo(true);
    setBtnTwo(false);
    setBoxResultTwo("");
    setBoxTwoCss("");
    setBoxResultThree("");
    setBoxThreeCss("");
    setNextTwo(false);
  };
  const handlePrevFour = () => {
    playClick();
    setTapProceed(false);
    setBoxThreeCss("");
    setBoxResultThree("");
    setBeatTwo(true);
    setStepThree(true);
    setBeatTwo(true);
    setDisabledNext(true);
    setTapRatio(true);
    setTapProceed(false);
    setBtnTwo(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("emptyChairsHeading"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("fieldToEmpty")))), /*#__PURE__*/React.createElement("div", {
    className: "main-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-box"
  }, /*#__PURE__*/React.createElement(TableImage, null)), /*#__PURE__*/React.createElement("div", {
    className: "answer-box"
  }, /*#__PURE__*/React.createElement(ResultBox, {
    beat: beat,
    beatOne: beatOne,
    beatTwo: beatTwo,
    stepOne: stepOne,
    stepTwo: stepTwo,
    stepThree: stepThree,
    boxResultOne: boxResultOne,
    boxOneCss: boxOneCss,
    boxResultTwo: boxResultTwo,
    boxTwoCss: boxTwoCss,
    boxResultThree: boxResultThree,
    boxThreeCss: boxThreeCss
  }))), /*#__PURE__*/React.createElement("div", {
    className: "option-box"
  }, /*#__PURE__*/React.createElement(TableOption, {
    options: options,
    correctOption: correctOption,
    boxResultSet: stepOne ? handleBoxResultOne : stepTwo ? handleBoxResultTwo : stepThree ? handleBoxResultThree : () => {},
    stepOne: stepOne,
    stepTwo: stepTwo,
    stepThree: stepThree,
    boxResultOne: boxResultOne,
    boxResultTwo: boxResultTwo,
    boxResultThree: boxResultThree,
    showErrorOne: showErrorOne,
    showErrorTwo: showErrorTwo,
    showErrorThree: showErrorThree
  }))), tapRatio && /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("tapRatio")), nextOne && /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("tapNext")), nextTwo && /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("tapNext")), tapProceed && /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("proceed")), /*#__PURE__*/React.createElement(FooterButtons, {
    disabledNext: disabledNext,
    nextOne: nextOne,
    nextTwo: nextTwo,
    stepOne: stepOne,
    stepTwo: stepTwo,
    stepThree: stepThree,
    tapProceed: tapProceed,
    btnTwo: btnTwo,
    handleNextOne: handleNextOne,
    handleNextTwo: handleNextTwo,
    handleProceed: handleProceed,
    handlePrevOne: handlePrevOne,
    handlePrevTwo: handlePrevTwo,
    handlePrevThree: handlePrevThree,
    handlePrevFour: handlePrevFour
  }));
};
export default MainTwo;