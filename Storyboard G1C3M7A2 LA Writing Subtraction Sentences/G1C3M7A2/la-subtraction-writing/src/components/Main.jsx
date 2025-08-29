import React, { useRef, useState } from "react";
import "./Main.css";
import { useTranslation } from "react-i18next";
import CarOne from "./Car";
import click from "../assets/click.mp3";
import wrong from "../assets/wrong.mp3";
import correct from "../assets/correct.mp3";
import Keypad from "./Keypad";
import Instruction from "./Instruction";
const Main = ({ onNext,question }) => {
  const [showNav, setShowNav] = useState(false);
  const [erroShow, setErrorShow] = useState(false);
  const [keypadShow, setKeypadShow] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const [numbers, setNumbers] = useState({
    number1: "",
    number2: "",
    number3: "",
  });
  const [status, setStatus] = useState({
    number1: "",
    number2: "",
    number3: "",
  });
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const { t } = useTranslation();
  const clickAudio = new Audio(click);
  clickAudio.preload = "auto";
  const clickHandle = () => {
    clickAudio.currentTime = 0;
    clickAudio.play();
  };

  // Create audio once
  const clickAudioRef = useRef(new Audio(click));
  const wrongAudioRef = useRef(new Audio(wrong));
  const rightAudioRef = useRef(new Audio(correct));
  clickAudioRef.current.preload = "auto";
  wrongAudioRef.current.preload = "auto";
  rightAudioRef.current.preload = "auto";

  const play = (ref) => {
    try {
      ref.current.currentTime = 0;
      const p = ref.current.play();
      if (p && typeof p.then === "function") p.catch(() => {}); // ignore autoplay errors
    } catch {}
  };

  const focusNext = () => {
    if (!numbers.number1) input1Ref.current?.focus();
    else if (!numbers.number2) input2Ref.current?.focus();
    else if (!numbers.number3) input3Ref.current?.focus();
  };

  // Keypad input: fill first empty, clear colors for that box, click sound
  const handleKeypadInput = (num) => {
    setShowNav(false);
    setNumbers((prev) => {
      if (!prev.number1) {
        setStatus((s) => ({ ...s, number1: "" }));
        return { ...prev, number1: String(num) };
      } else if (!prev.number2) {
        setStatus((s) => ({ ...s, number2: "" }));
        return { ...prev, number2: String(num) };
      } else if (!prev.number3) {
        setStatus((s) => ({ ...s, number3: "" }));
        return { ...prev, number3: String(num) };
      }
      return prev;
    });
    play(clickAudioRef);
    focusNext();
  };

  // Manual typing: only digits, clear color for that box
  const handleChange = (field, value) => {
    if (/^\d?$/.test(value)) {
      setNumbers((prev) => ({ ...prev, [field]: value }));
      setStatus((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // ✅ Define checkNumber (this was missing)
  const checkNumber = () => {
    // Use the current state values
    const is1 = numbers.number1 === question[0];
    const is2 = numbers.number2 === question[1];
    const is3 = numbers.number3 === question[2];

    const newStatus = {
      number1: is1 ? "correct" : "wrong",
      number2: is2 ? "correct" : "wrong",
      number3: is3 ? "correct" : "wrong",
    };
    setStatus(newStatus);

    if (is1 && is2 && is3) {
      setErrorShow(true);
      setKeypadShow(false);
      setShowNext(true);
      play(rightAudioRef);
    } else {
      setErrorShow(true);
      setShowNav(true);
      play(wrongAudioRef);
    }
  };
  const handleNext = () => {
    setErrorShow(false);
    setKeypadShow(true);
    onNext();
  };
  
  console.log(question);
  return (
    <div className="main-container">
      <div className="main-container-left">
        {keypadShow && (
          <div>
            <p className="slide-left">{t("writing")}</p>
            <p className="slide-right">{t("givenPicture")}</p>
          </div>
        )}
        {showNext && (
          <div>
            <p style={{ fontWeight: 900, textAlign: "left" }} className="slide-left">
              {t("subtractionSentance")}
            </p>
            <ul>
              <li className="slide-left">{t("stepOne", { count: question[0] })}</li>
              <li className="slide-right">{t("stepTwo", { count: question[1] })}</li>
              <li className="slide-left">{t("stepThree", { count: question[2] })}</li>
            </ul>
            <p style={{ textAlign: "left", marginTop: "0" }}className="slide-up">
              {t("weWrite")}
              <br />
              {question[0]}-{question[1]}={question[2]}
            </p>
          </div>
        )}
      </div>
      <div className="main-container-right">
        <div className="main-container-right-main">
          <div className="main-container-right-main-car">
            <div
              className="subtraction-align-box slide-right"
              style={{
                position: "relative",
              }}
            >
              {showNav && (
                <div className="show-in">
                  <Instruction />
                </div>
              )}

              <div className="subtraction-align-box slide-right">
                <input
                  type="text"
                  maxLength={1}
                  ref={input1Ref}
                  value={numbers.number1}
                  onChange={(e) => handleChange("number1", e.target.value)}
                  className={`subtraction-image-box ${status.number1}`}
                />
                <div className="subtraction-minus-line"></div>

                <input
                  type="text"
                  maxLength={1}
                  ref={input2Ref}
                  value={numbers.number2}
                  onChange={(e) => handleChange("number2", e.target.value)}
                  className={`subtraction-image-box ${status.number2}`}
                />

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5vw",
                  }}
                >
                  <div className="subtraction-minus-line"></div>
                  <div className="subtraction-minus-line"></div>
                </div>

                <input
                  type="text"
                  maxLength={1}
                  ref={input3Ref}
                  value={numbers.number3}
                  onChange={(e) => handleChange("number3", e.target.value)}
                  className={`subtraction-image-box ${status.number3}`}
                />
              </div>
            </div>
            <CarOne
              totalCars={parseInt(question[0])}
              crossCars={parseInt(question[1])}
            />
          </div>
          <div className="main-container-right-main-keypad">
            <Keypad
              setShowNav={() => setShowNav(true)}
              onNumberClick={handleKeypadInput}
              checkNumber={checkNumber}
              numbers={numbers}
              question={question}
              erroShow={erroShow}
              keypadShow={keypadShow}
              setErrorShow={() => setErrorShow(false)}
            />
          </div>
        </div>
        <div className="main-container-right-footer">
          {keypadShow && <h3>{t("tapNumber")}</h3>}
          {showNext && <h3>{t("nextQuestion")}</h3>}
        </div>
        <div className="main-container-right-footer-2">
          <button className="next-button" onClick={handleNext}>▶</button>
        </div>
      </div>
    </div>
  );
};

export default Main;
