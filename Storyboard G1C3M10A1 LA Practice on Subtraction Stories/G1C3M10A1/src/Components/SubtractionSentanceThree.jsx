import React, { useRef, useState } from "react";
import "./SubtractionSentance.css";
import imageone from "../assets/imagethree.png";
import Keypad from "./Keypad";
import click from "../assets/click.mp3";
import wrong from "../assets/wrong.mp3";
import right from "../assets/correct.mp3";
const correctNumber = ["6", "1", "5"];
const SubtractionSentanceThree = ({ onNext }) => {
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
  const [erroShow, setErrorShow] = useState(false);
  const [keypadShow, setKeypadShow] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  // Create audio once
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
    const is1 = numbers.number1 === "6";
    const is2 = numbers.number2 === "1";
    const is3 = numbers.number3 === "5";

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
    play();
    window.location.reload();
  };
  return (
    <div className="subtraction">
      <div className="subtraction-left">
        <p className="slide-left">
          Writing the
          <br /> subtraction
          <br /> Story.✅
        </p>
        <p className="slide-right">
          Writing Subtraction
          <br /> sentence:
          <br />
          For the given
          <br /> picture and story,
          <br />
          fill the subtraction
          <br /> sentence using
          <br />
          numpad and check.
        </p>
      </div>

      <div className="subtraction-right">
        <div className="subtraction-right-main">
          <div className="subtraction-right-main-one">
            <div className="subtraction-image-container">
              <img src={imageone} className="subtraction-image scale-up" alt="story" />
            </div>

            <div className="sentance-story">
              <p className="slide-left">
                Mother served 6 cakes.
                <br />
                The boy ate 1 cake. 5 cakes remain.
              </p>
            </div>

            <div className="subtraction-align-box">
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

          <div className="subtraction-right-main-two scale-up">
            {/* checkNumber is now defined and passed */}
            
              <Keypad
                onNumberClick={handleKeypadInput}
                checkNumber={checkNumber}
                numbers={numbers}
                keypadShow={keypadShow}
                correctNumber={correctNumber}
                erroShow={erroShow}
                setErrorShow={() => setErrorShow(false)}
              />
        
          </div>
        </div>

        <div
          className="subtraction-right-footer"
          style={{
            position: "relative",
          }}
        >
          {keypadShow && <h3 className="slide-mid">Tap the numbers to enter and then tap check.</h3>}
          {showNext && <h3 className="slide-right">Tap ▶ for next question.</h3>}
          {showNext && (
            <div>
              <button
                className="subtraction-next-button slide-left"
                onClick={handleNext}
              >
                ▶
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubtractionSentanceThree;
