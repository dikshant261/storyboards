import React, { useState } from "react";
import "./Outlet.css";
import SubtractionSentanceOne from "./Components/SubtractionSentanceOne";
import imageone from "./assets/imageone.png";
import imagetwo from "./assets/imagetwo.png";
import imagethree from "./assets/imagethree.png";
import Page from "./Components/Page";
import Frame from "./Components/Frame";

const Outlet = () => {
  const [first, setFirst] = useState(true);
  const [frameOne, setFrameOne] = useState(false);
  const [second, setSecond] = useState(false);
  const [frameTwo, setFrameTwo] = useState(false);
  const [third, setThird] = useState(false);
  const [frameThree, setFrameThree] = useState(false);
  const [sentanceOne, setSentanceOne] = useState(false);
  const [sentanceTwo, setSentanceTwo] = useState(false);
  const [sentanceThree, setSentanceThree] = useState(false);
  const handleFirst = () => {
    setFirst(false);
    setFrameOne(true);
  };
  const handleFrameOne = () => {
    setFrameOne(false);
    setSentanceOne(true);
  };
  const handleSentanceOne = () => {
    setSentanceOne(false);
    setSecond(true);
  };
  const handleSecond = () => {
    setSecond(false);
    setFrameTwo(true);
  };
  const handleFrameTwo = () => {
    setFrameTwo(false);
    setSentanceTwo(true);
  };
  const handleSentanceTwo = () => {
    setSentanceTwo(false);
    setThird(true);
  };
  const handleThird = () => {
    setThird(false);
    setFrameThree(true);
  };
  const handleFrameThird = () => {
    setFrameThree(false);
    setSentanceThree(true);
  };
  const handlePrevFramOne = () => {
    setFrameOne(false);
    setFirst(true);
  };
  const handlePrevFramTwo = () => {
    setFrameTwo(false);
    setSecond(true);
  };
  const handlePrevFramThree = () => {
    setFrameThree(false);
    setThird(true);
  };
  const handlePrevOne = () => {
    setSentanceOne(false);
    setFrameOne(true);
  };
  const handlePrevTwo = () => {
    setSentanceTwo(false);
    setFrameTwo(true);
  };
  const handlePrevThree = () => {
    setSentanceThree(false);
    setFrameThree(true);
  };
  return (
    <div className="outlet">
      {/* first question */}
      {first && <Page onClose={handleFirst} imageSrc={imageone} />}
      {frameOne && (
        <Frame
          onNext={handleFrameOne}
          prev={handlePrevFramOne}
          imageSrc={imageone}
          number={[6, 2, 4]}
          storyTextKey="storyOneText"
          optionKeys={[
            [
              "storyOne.optionOne",
              "storyOne.optionTwo",
              "storyOne.optionThree",
              "storyOne.optionFour",
            ],
            [
              "storyOne.optionFive",
              "storyOne.optionSix",
              "storyOne.optionSeven",
              "storyOne.optionEight",
            ],
            [
              "storyOne.optionNine",
              "storyOne.optionTen",
              "storyOne.optionEleven",
              "storyOne.optionTweleve",
            ],
          ]}
        />
      )}
      {sentanceOne && (
        <SubtractionSentanceOne
          onNext={handleSentanceOne}
          correctNumber={["6", "2", "4"]}
          imageSrc={imageone}
          storyTextKey="storyOneText"
          prev={handlePrevOne}
        />
      )}
      {/* second question */}
      {second && <Page onClose={handleSecond} imageSrc={imagetwo} />}
      {frameTwo && (
        <Frame
          onNext={handleFrameTwo}
          prev={handlePrevFramTwo}
          imageSrc={imagetwo}
          storyTextKey="storyTwoText"
          optionKeys={[
            [
              "storyTwo.optionOne",
              "storyTwo.optionTwo",
              "storyTwo.optionThree",
              "storyTwo.optionFour",
            ],
            [
              "storyTwo.optionFive",
              "storyTwo.optionSix",
              "storyTwo.optionSeven",
              "storyTwo.optionEight",
            ],
            [
              "storyTwo.optionNine",
              "storyTwo.optionTen",
              "storyTwo.optionEleven",
              "storyTwo.optionTweleve",
            ],
          ]}
          width="34vw"
          gap="1vw"
        />
      )}
      {sentanceTwo && (
        <SubtractionSentanceOne
          onNext={handleSentanceTwo}
          prev={handlePrevTwo}
          correctNumber={["6", "4", "2"]}
          imageSrc={imagetwo}
          storyTextKey="storyTwoText"
        />
      )}
      {/* third question */}
      {third && <Page onClose={handleThird} imageSrc={imagethree} />}
      {frameThree && (
        <Frame
          onNext={handleFrameThird}
          prev={handlePrevFramThree}
          imageSrc={imagethree}
          storyTextKey="storyThreeText"
          optionKeys={[
            [
              "storyThree.optionOne",
              "storyThree.optionTwo",
              "storyThree.optionThree",
              "storyThree.optionFour",
            ],
            [
              "storyThree.optionFive",
              "storyThree.optionSix",
              "storyThree.optionSeven",
              "storyThree.optionEight",
            ],
            [
              "storyThree.optionNine",
              "storyThree.optionTen",
              "storyThree.optionEleven",
              "storyThree.optionTweleve",
            ],
          ]}
          width="30vw"
          gap="3vw"
        />
      )}
      {sentanceThree && (
        <SubtractionSentanceOne
          correctNumber={["6", "1", "5"]}
          prev={handlePrevThree}
          imageSrc={imagethree}
          storyTextKey="storyThreeText"
          flag="true"
        />
      )}
    </div>
  );
};

export default Outlet;
