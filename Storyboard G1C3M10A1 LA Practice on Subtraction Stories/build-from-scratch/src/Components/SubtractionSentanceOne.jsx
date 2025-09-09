import React, { useRef, useState } from "react";
import "./SubtractionSentance.css";
import imageone from "../assets/imageone.png";
import Keypad from "./Keypad";
import click from "../assets/click.mp3";
import wrong from "../assets/wrong.mp3";
import right from "../assets/correct.mp3";
import tap from "../assets/tap.gif";
import { useTranslation } from "react-i18next";
const SubtractionSentanceOne = ({
  onNext,
  correctNumber,
  imageSrc,
  storyTextKey,
  prev,
  flag=false
}) => {
  const { t } = useTranslation();
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
  const [focusedField, setFocusedField] = useState(null); // 👈 track focused
  const [erroShow, setErrorShow] = useState(false);
  const [keypadShow, setKeypadShow] = useState(true);
  const [showNext, setShowNext] = useState(false);

  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  // Audio refs
  const clickAudioRef = useRef(new Audio(click));
  const wrongAudioRef = useRef(new Audio(wrong));
  const rightAudioRef = useRef(new Audio(right));

  clickAudioRef.current.preload = "auto";
  wrongAudioRef.current.preload = "auto";
  rightAudioRef.current.preload = "auto";

  const play = (ref) => {
    try {
      ref.current.currentTime = 0;
      const p = ref.current.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    } catch {}
  };

  // Keypad input → replace if focused
  // Keypad input → replace if focused OR auto focus next
const handleKeypadInput = (num) => {
  setNumbers((prev) => {
    let updated = { ...prev };

    if (focusedField) {
      updated[focusedField] = String(num);

      // Auto move to next field
      if (focusedField === "number1") {
        input2Ref.current?.focus();
        setFocusedField("number2");
      } else if (focusedField === "number2") {
        input3Ref.current?.focus();
        setFocusedField("number3");
      }
      return updated;
    }

    // fallback → fill sequential & auto focus
    if (!prev.number1) {
      updated.number1 = String(num);
      input2Ref.current?.focus();
      setFocusedField("number2");
    } else if (!prev.number2) {
      updated.number2 = String(num);
      input3Ref.current?.focus();
      setFocusedField("number3");
    } else if (!prev.number3) {
      updated.number3 = String(num);
    }
    return updated;
  });

  play(clickAudioRef);
};


  // Manual typing
  const handleChange = (field, value) => {
    if (/^\d?$/.test(value)) {
      setNumbers((prev) => ({ ...prev, [field]: value }));
      setStatus((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const checkNumber = () => {
    const is1 = numbers.number1 === correctNumber[0];
    const is2 = numbers.number2 === correctNumber[1];
    const is3 = numbers.number3 === correctNumber[2];

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
      play(wrongAudioRef);
    }
  };

  const handleNext = () => {
    if(flag){
      window.location.reload();
    }
    setErrorShow(false);
    setKeypadShow(true);
    onNext();
  };

  // 👇 Add "pulse-click" class briefly when clicked
  const handleBoxClick = (field, ref) => {
    setFocusedField(field);
    if (ref.current) {
      ref.current.classList.add("pulse-click");
      setTimeout(() => {
        ref.current?.classList.remove("pulse-click");
      }, 600);
    }
  };
  const handlePrev=()=>{
   prev();
  }
  return (
    <div className="subtraction">
      <div className="subtraction-left">
        <p className="slide-left" style={{
          color:"lightgreen"
        }}>{t("writingStory")}✅</p>
        <p className="slide-right">{t("writingNumpad")}</p>
      </div>

      <div className="subtraction-right">
        <div className="subtraction-right-main">
          <div className="subtraction-right-main-one">
            <div className="subtraction-image-container scale-up">
              <img src={imageSrc} className="subtraction-image" alt="story" />
            </div>

            <div className="sentance-story slide-mid">
              <p>{t(storyTextKey)}</p>
            </div>

            <div className="subtraction-align-box slide-right">
              <input
                type="text"
                maxLength={1}
                ref={input1Ref}
                value={numbers.number1}
                onChange={(e) => handleChange("number1", e.target.value)}
                onFocus={() => setFocusedField("number1")}
                onClick={() => handleBoxClick("number1", input1Ref)}
                className={`subtraction-image-box ${status.number1}`}
              />
              <div className="subtraction-minus-line"></div>

              <input
                type="text"
                maxLength={1}
                ref={input2Ref}
                value={numbers.number2}
                onChange={(e) => handleChange("number2", e.target.value)}
                onFocus={() => setFocusedField("number2")}
                onClick={() => handleBoxClick("number2", input2Ref)}
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
                onFocus={() => setFocusedField("number3")}
                onClick={() => handleBoxClick("number3", input3Ref)}
                className={`subtraction-image-box ${status.number3}`}
              />
            </div>
          </div>

          <div className="subtraction-right-main-two scale-up">
            <Keypad
              onNumberClick={handleKeypadInput}
              checkNumber={checkNumber}
              numbers={numbers}
              correctNumber={correctNumber}
              erroShow={erroShow}
              keypadShow={keypadShow}
              setErrorShow={() => setErrorShow(false)}
            />
          </div>
        </div>

        <div
          className="subtraction-right-footer"
          style={{ position: "relative" }}
        >
          {keypadShow && <h3 className="slide-left">{t("tapCheck")}</h3>}
          {showNext && <h3 className="slide-left">{t("tapNextQuestion")}</h3>}
          {showNext && (
            <div>
              <button className="subtraction-next-button" onClick={handleNext}>
                ▶
              </button>
              <img
                src={tap}
                alt="tap"
                style={{
                  position: "absolute",
                  bottom: "0%",
                  right: "2%",
                  width: "4vw",
                }}
              />
            </div>
          )}
          <button className="subtraction-next-button-left" onClick={handlePrev}>
            ◀
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubtractionSentanceOne;
