import React, { useEffect, useState } from "react";
import "./scene.css";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import Tap from "./Tap";
import ImageRenderer from "./ImageRenderer";
import Orange from "./Orange";
const SceneTwo = ({ onNext, onPrev, questions, questionIndex,questionHeading }) => {
  const { t } = useTranslation();
  const [next, setNext] = useState(false);
  //   useEffect(() => {
  //     const result = sessionStorage.getItem("marbleExample");
  //     if (result) {
  //       const parsed = JSON.parse(result);
  //       setShowApple(parsed.showApple);
  //       setNext(parsed.next);
  //     }
  //   }, []);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  //   const handleClick = (ans, num) => {
  //     if (ans === questions.for) {
  //       playCorrect();
  //       setShow(true);
  //       setNavHeading(false);
  //       setNext(true);
  //       setDisabled([1, 2]);
  //     } else {
  //       playWrong();
  //       setDisabled((prev) => (prev.includes(num) ? prev : [...prev, num]));
  //     }
  //     // sessionStorage.setItem(
  //     //   "marbleExample",
  //     //   JSON.stringify({
  //     //     showApple: false,
  //     //     next: true,
  //     //   })
  //     // );
  //   };
  function separateByType(arr, n) {
    const ratio = [];
    const fraction = [];

    arr.slice(0, n+1).forEach((item) => {
      if (item.for === "ratio") {
        ratio.push(item);
      } else if (item.for === "fraction") {
        fraction.push(item);
      }
    });

    return { ratio, fraction };
  }

  // Example: separate first 4 objects
  const { ratio, fraction } = separateByType(questions, questionIndex);
  return (
    <div className="scene-constainer">
      <div className="scene-heading">
        <p>{t(questionHeading)}</p>
      </div>
      <div className="scene-main">
        <div
          className="scene-main-first"
          style={{ justifyContent: "flex-start",gap:"1vh" }}
        >
          {ratio.map((q, id) => (
            <div
              key={id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <p style={{ textAlign: "left", fontSize: "2vw" }}>
                {t(q.heading)}
              </p>
              <ImageRenderer src={q.image} width={q.widthTwo} />
            </div>
          ))}
          <div style={{ position: "fixed", bottom: "12%" }}>
            <ReusableButton
              label={t("buttons.ratio")}
              showTap={false}
              width="15vw"
              height="8vh"
              fontSize="3vw"
              backgroundColor={"#cfe2f3"}
              disabled={true}
              showActive={false}
            />
          </div>
        </div>
        <div
          className="scene-main-second"
          style={{ justifyContent: "flex-start",gap:"1vh" }}
        >
          
           {fraction.map((q,id)=> <div
              key={id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <p style={{ textAlign: "left", fontSize: "2vw" }}>
                {t(q.heading)}
              </p>
              <ImageRenderer src={q.image} width={q.widthTwo} />
            </div>
)}
          <div style={{ position: "fixed", bottom: "12%" }}>
            <ReusableButton
              label={t("buttons.fraction")}
              width="15vw"
              height="8vh"
              fontSize="3vw"
              showTap={false}
              showActive={false}
              backgroundColor={"#cfe2f3"}
              disabled={true}
            />
          </div>
        </div>
      </div>
      <div className="scene-footer">
        <button onClick={handlePrev}>{t("buttons.previous")}</button>
        <p>{t("navigation.tapNext")}</p>

        <div>
          <button onClick={handleNext}>{t("buttons.next")}</button>
          <Tap bottom={"0%"} />
        </div>
      </div>
    </div>
  );
};

export default SceneTwo;
