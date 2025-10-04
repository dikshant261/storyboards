import React, { useState } from "react";
import "./Outlet.css";
import StartPage from "./components/StartPage";
import Main from "./components/Main";
import MainTwo from "./components/MainTwo";
import MainThree from "./components/MainThree";
import { useTranslation } from "react-i18next";
import RepersentinRatio from "./components/RepersentinRatio";
import MainFour from "./components/MainFour";
import MainFive from "./components/MainFive";
import MainSix from "./components/MainSix";
import ActivityComplete from "./components/ActivityComplete";
const Outlet = () => {
  const { t } = useTranslation();
  const [start, setStart] = React.useState(true);
  const [main, setMain] = React.useState(false);
  const [second, setSecond] = React.useState(false);
  const [third, setThird] = React.useState(false);
  const [fourth, setFourth] = React.useState(false);
  const [five, setFive] = React.useState(false);
  const [nextPart, setNextPart] = React.useState(false);
  const [seven, setSeven] = React.useState(false);
  const [six, setSix] = useState(false);
  const [eight, setEight] = useState(false);
  const [nine, setNine] = useState(false);
  const [ten, setTen] = useState(false);
  const [end, setEnd] = useState(false);
  const handleStartClose = () => {
    setStart(false);
    setMain(true);
  };
  const handlePrevOne = () => {
    setMain(false);
    setStart(true);
  };
  const handleNext = () => {
    setMain(false);
    setSecond(true);
  };
  const handlePrevTwo = () => {
    setSecond(false);
    setMain(true);
  };
  const handleNextTwo = () => {
    setSecond(false);
    setThird(true);
  };
  const handlePrevThree = () => {
    setThird(false);
    setSecond(true);
  };
  const handleNextThree = () => {
    setThird(false);
    setFourth(true);
  };
  const handlePrevFour = () => {
    setFourth(false);
    setThird(true);
  };
  const handleNextFour = () => {
    setFourth(false);
    setFive(true);
  };
  const handlePrevFive = () => {
    setFive(false);
    setFourth(true);
  };
  const handleNextFive = () => {
    setFive(false);
    setNextPart(true);
  };
  const handleNextSix = () => {
    setNextPart(false);
    setSix(true);
  };
  const handleNextSeven = () => {
    setSix(false);
    setSeven(true);
  };
  const handlePrevSix = () => {
    setSix(false);
    setNextPart(true);
  };
  const handleNextEight = () => {
    setSeven(false);
    setEight(true);
  };
  const handlePrevSeven = () => {
    setSeven(false);
    setSix(true);
  };
  const handleNextNine = () => {
    setEight(false);
    setNine(true);
  };
  const handlePrevEight = () => {
    setEight(false);
    setSeven(true);
  };
  const handleNextTen = () => {
    setNine(false);
    setTen(true);
  };
  const handlePrevNine = () => {
    setNine(false);
    setEight(true);
  };
  const handleNextEleven = () => {
    setTen(false);
    setEnd(true);
  };
  const handlePrevTen = () => {
    setTen(false);
    setNine(true);
  };
  return (
    <div className="outlet">
      {start && <StartPage onClose={handleStartClose} />}
      {main && (
        <Main
          onNext={handleNext}
          onPrev={handlePrevOne}
          options={["3 : 2", "3 to 2", "2 to 3", "3/2", "2/3", "2 : 3"]}
          correctOption={["3 : 2", "3 to 2", "3/2"]}
        />
      )}
      {second && (
        <MainTwo
          onNext={handleNextTwo}
          onPrev={handlePrevTwo}
          options={["6 : 2", "6 to 2", "2 to 6", "6/2", "2/6", "2 : 6"]}
          correctOption={["6 : 2", "6 to 2", "6/2"]}
        />
      )}
      {third && (
        <MainThree
          onNext={() => handleNextThree()}
          onPrev={handlePrevThree}
          questionHeading={t("emptyChairsHeading")}
          question={t("questionExtra")}
          extraHeading={t("extraHeading")}
          options={["2 : 6", "2 to 6", "6 to 2", "2/6", "6/2", "6 : 2"]}
          correctOption={["2 : 6", "2 to 6", "2/6"]}
        />
      )}
      {fourth && (
        <MainThree
          onNext={() => handleNextFour()}
          onPrev={handlePrevFour}
          questionHeading={t("emptyChairsHeading")}
          question={t("questionThree")}
          extraHeading={t("questionThreeHeading")}
          options={["9 : 7", "9 to 7", "7 to 9", "9/7", "7/9", "7 : 9"]}
          correctOption={["9 : 7", "9 to 7", "9/7"]}
          flag={1}
        />
      )}
      {five && (
        <MainThree
          onNext={() => handleNextFive()}
          onPrev={handlePrevFive}
          questionHeading={t("emptyChairsHeading")}
          extraHeading={t("questionFourHeading")}
          question={t("questionFour")}
          options={["7 : 9", "7 to 9", "9 to 7", "7/9", "9/7", "9 : 7"]}
          correctOption={["7 : 9", "7 to 9", "7/9"]}
          flag={2}
        />
      )}
      {nextPart && <RepersentinRatio onNext={handleNextSix} />}
      {six && (
        <MainFour
          onNext={handleNextSeven}
          onPrev={handlePrevSix}
          boxOneHeading={t("ratioApple")}
          boxTwoHeading={t("rationOrange")}
          questionHeading={t("repreSenting_ratios")}
          options={["5 : 4", "5 : 10", "4 : 5", "4 : 10"]}
          correctOption={["4 : 5", "5 : 4"]}
        />
      )}
      {seven && (
        <MainFive
          onNext={handleNextEight}
          onPrev={handlePrevSeven}
          questionHeading={t("repreSenting_ratios")}
          options={["7 : 3", "3 : 10", "3 : 7", "7 : 10"]}
          correctOption={["3 : 7", "7 : 3"]}
          flag={1}
        />
      )}
      {eight && (
        <MainSix
          onNext={handleNextNine}
          onPrev={handlePrevEight}
          question={t("questionFive")}
          boxOneHeading={t("ratioBoys")}
          boxTwoHeading={t("ratioGirl")}
          questionHeading={t("repreSenting_ratios")}
          options={["14/9", "9/23", "9/14", "14/23"]}
          correctOption={["9/14", "14/9"]}
          flag={2}
        />
      )}
      {nine && (
        <MainSix
          onNext={handleNextTen}
          onPrev={handlePrevNine}
          question={t("questionSix")}
          boxOneHeading={t("rationBanana")}
          boxTwoHeading={t("ratioOrange")}
          questionHeading={t("repreSenting_ratios")}
          options={["16 to 19", "16/35", "19 to 16", "19/35"]}
          correctOption={["19 to 16", "16 to 19"]}
          flag={3}
        />
      )}
      {ten && (
        <MainSix
          onNext={handleNextEleven}
          onPrev={handlePrevTen}
          question={t("questionSeven")}
          boxOneHeading={t("ratioStudent")}
          boxTwoHeading={t("ratioPlaground")}
          questionHeading={t("repreSenting_ratios")}
          options={["32 : 25", "32 : 57", "25 : 32", "25 : 57"]}
          correctOption={["25 : 32", "32 : 25"]}
          flag={4}
        />
      )}
      {end && <ActivityComplete />}
    </div>
  );
};

export default Outlet;
