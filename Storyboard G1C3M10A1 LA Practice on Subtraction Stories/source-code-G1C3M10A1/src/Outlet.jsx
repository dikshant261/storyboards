import React, { useState } from "react";
import "./Outlet.css";
import FirstPage from "./Components/FirstPage";
import FrameOne from "./Components/FrameOne";
import SecondPage from "./Components/SecondPage";
import FrameTwo from "./Components/FrameTwo";
import ThirdPage from "./Components/ThirdPage";
import FrameThird from "./Components/FrameThird";
import SubtractionSentanceOne from "./Components/SubtractionSentanceOne";
import SubtractionSentanceTwo from "./Components/SubtractionSentanceTwo";
import SubtractionSentanceThree from "./Components/SubtractionSentanceThree";

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
  return (
    <div className="outlet">
      {/* first question */}
      {first && <FirstPage onClose={handleFirst} />}
      {frameOne && <FrameOne onNext={handleFrameOne} />}
      {sentanceOne && <SubtractionSentanceOne onNext={handleSentanceOne} />}
      {/* second question */}
      {second && <SecondPage onClose={handleSecond} />}
      {frameTwo && <FrameTwo onNext={handleFrameTwo} />}
      {sentanceTwo && <SubtractionSentanceTwo onNext={handleSentanceTwo} />}
      {/* third question */}
      {third && <ThirdPage onClose={handleThird} />}
      {frameThree && <FrameThird onNext={handleFrameThird} />}
      {sentanceThree && <SubtractionSentanceThree />}
    </div>
  );
};

export default Outlet;
