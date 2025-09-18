import { useState } from "react";
import StartPage from "./components/StartPage";
import "./Outlet.css";
import Main from "./components/Main";
import { useTranslation } from "react-i18next";
import ActivityComplete from "./components/ActivityComplete";
const Outlet = () => {
  const [start, setStart] = useState(true);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [four, setFour] = useState(false);
  const [end,setEnd]=useState(false);
  const handleStart = () => {
    setStart(false);
    setFirst(true);
  };
  const handleNext = () => {
    setFirst(false);
    setSecond(true);
  };
  const handlePrevOne = () => {
    setFirst(false);
    setStart(true);
  };
  const handleNextTwo = () => {
    setSecond(false);
    setThird(true);
  };
  const handlePreTwo = () => {
    setSecond(false);
    setFirst(true);
  };
  const handleNextThree = () => {
    setThird(false);
    setFour(true);
  };
  const handlePreThree = () => {
    setThird(false);
    setSecond(true);
  };
  const handlePreFour = () => {
    setFour(false);
    setThird(true);
  };
  const handleNextFour=()=>{
    setFour(false);
    setEnd(true);

  }
    return (
    <div className="outlet">
      {start && <StartPage onClose={handleStart} />}
      {first && (
        <Main
          options={["5:3", "3:5", "8:3", "3:8", "5:8", "8:5"]}
          correctOption={["5:3", "3:5", "3:8"]}
          boxContent={[
            "marbleBoxesContent.yellowToGreen",
            "marbleBoxesContent.greenToYellow",
            "marbleBoxesContent.yellowToTotal",
          ]}
          flag={0}
          onNext={handleNext}
          onPrev={handlePrevOne}
        />
      )}
      {second && (
        <Main
          options={["4:10", "4:6", "6:4", "6:10", "10:4", "10:6"]}
          correctOption={["4:10", "4:6", "6:10"]}
          boxContent={[
            "triangleBoxContent.squareToTotal",
            "triangleBoxContent.squareToTriangle",
            "triangleBoxContent.triangleToTotal",
          ]}
          flag={1}
          onNext={handleNextTwo}
          onPrev={handlePreTwo}
        />
      )}
      {third && (
        <Main
          options={["5:7", "7:12", "7:5", "5:12", "12:7", "12:5"]}
          correctOption={["5:7", "7:12", "5:12"]}
          boxContent={[
            "circleBoxContent.rectanglesToCircles",
            "circleBoxContent.circleToShapes",
            "circleBoxContent.rectangleToShape",
          ]}
          flag={2}
          onNext={handleNextThree}
          onPrev={handlePreThree}
        />
      )}
      {four && (
        <Main
          options={["8:19", "11:19", "19:8", "11:8", "19:11", "8:11"]}
          correctOption={["8:19", "11:19", "11:8"]}
          boxContent={[
            "chitraContent.pinkToTotal",
            "chitraContent.blueToTotal",
            "chitraContent.blueToPink",
          ]}
          flag={3}
          onNext={handleNextFour}
          onPrev={handlePreFour}
        />
      )}
      {
        end && <ActivityComplete/>
      }
    </div>
  );
};

export default Outlet;
