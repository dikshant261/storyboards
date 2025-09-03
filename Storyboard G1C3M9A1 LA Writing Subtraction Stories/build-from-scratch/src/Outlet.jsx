import React, { useState } from "react";
import "./Outlet.css";
import FirstPage from "./Components/FirstPage";
import FrameOne from "./Components/FrameOne";
import imageone from "./assets/imageone.png";
import imagetwo from "./assets/imagetwo.png";
import imagethree from "./assets/imagethree.png";

const Outlet = () => {
  const [first, setFirst] = useState(true);
  const [frameOne, setFrameOne] = useState(false);
  const [second, setSecond] = useState(false);
  const [frameTwo, setFrameTwo] = useState(false);
  const [third, setThird] = useState(false);
  const [frameThree, setFrameThree] = useState(false);
  const handleFirst = () => {
    setFirst(false);
    setFrameOne(true);
  };
  const handlePrev = () => {
    setFrameOne(false);
    setFirst(true);
  };
  const handlePrevOne = () => {
    setFrameTwo(false);
    setSecond(true);
  };
  const handlePrevTwo = () => {
    setFrameThree(false);
    setThird(true);
  };
  const handleFrameOne = () => {
    setFrameOne(false);
    setSecond(true);
  };
  const handleSecond = () => {
    setSecond(false);
    setFrameTwo(true);
  };
  const handleFrameTwo = () => {
    setFrameTwo(false);
    setThird(true);
  };
  const handleThird = () => {
    setThird(false);
    setFrameThree(true);
  };
  return (
    <div className="outlet">
      {first && (
        <FirstPage
          onClose={handleFirst}
          imageSrc={imageone}
          number={[6, 2, 4]}
        />
      )}
      {frameOne && (
        <FrameOne
          onNext={handleFrameOne}
          onPrev={handlePrev}
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
      {second && (
        <FirstPage
          onClose={handleSecond}
          imageSrc={imagetwo}
          number={[6, 4, 2]}
        />
      )}
      {frameTwo && (
        <FrameOne
          onNext={handleFrameTwo}
          imageSrc={imagetwo}
          onPrev={handlePrevOne}
          number={[6, 4, 2]}
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
      {third && (
        <FirstPage
          onClose={handleThird}
          imageSrc={imagethree}
          number={[6, 1, 5]}
        />
      )}
      {frameThree && (
        <FrameOne
          imageSrc={imagethree}
          onPrev={handlePrevTwo}
          number={[6, 1, 5]}
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
          flag="true"
        />
      )}
    </div>
  );
};

export default Outlet;
