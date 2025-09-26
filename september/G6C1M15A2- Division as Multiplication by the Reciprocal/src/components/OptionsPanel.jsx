import React, { useEffect, useState } from "react";
import "./optionspanel.css";
import ReusableButton from "./ReusableButton";
import { playClick, playCorrect, playWrong } from "./PlayAudio";
import ErrorMessage from "./ErrorMessage";
import { useTranslation } from "react-i18next";

const OptionsPanel = ({
  onSelect,
  validate,
  question,
  setHintSlide,
  freezeButton
}) => {
  const [feedback, setFeedback] = useState(false);
  const CORRECT_ID = "D"; // a × 1/b
  const [disabledAll, setDisabledAll] = useState(false);
  const [wrongIds, setWrongIds] = useState(new Set());
  const [wrongId,setWrongId]=useState("")
  const [correctId, setCorrectId] = useState(null);
  const [errorShow, setErrorShow] = useState(false);
  const {t}=useTranslation();
  useEffect(()=>{
    if(freezeButton){
      setDisabledAll(true);
      setCorrectId("D");
      setErrorShow(true);
    }
  },[freezeButton])
  const handleSelect = (value, index) => {
    playClick();
    const labelNode = typeof value === "string" ? value : value?.label;
    if (typeof validate === "function") {
      const result = validate(value, index);
      if (result === true) {
        playCorrect();
        setFeedback(true);
        setErrorShow(true);
        setCorrectId(value && value.id ? value.id : null);
        setDisabledAll(true);
        if (typeof onSelect === "function") {
          onSelect({
            selectedId: value?.id,
            selectedIndex: index,
            isCorrect: true,
            correctId: CORRECT_ID,
            question,
            selectedLabel: labelNode,
          });
        }
      } else if (result === false) {
        playWrong();
        setFeedback(true);
        setErrorShow(true);
        if (value && value.id)
          setWrongIds((prev) => new Set(prev).add(value.id));
        setWrongId(value.id);
        if (typeof onSelect === "function") {
          onSelect({
            selectedId: value?.id,
            selectedIndex: index,
            isCorrect: false,
            correctId: CORRECT_ID,
            question,
            selectedLabel: labelNode,
          });
        }
      }
    } else {
      // Default validation: only pattern a × 1/b is correct (id "D")
      const isCorrect =
        value && typeof value === "object" && value.id === CORRECT_ID;
      if (isCorrect) {
        playCorrect();
        setFeedback(true);
        setErrorShow(true);
        setCorrectId(CORRECT_ID);
        setDisabledAll(true);
        if (typeof onSelect === "function") {
          onSelect({
            selectedId: value?.id,
            selectedIndex: index,
            isCorrect: true,
            correctId: CORRECT_ID,
            question,
            selectedLabel: labelNode,
          });
        }
      } else {
        playWrong();
        setFeedback(true);
        setErrorShow(true);
        if (value && value.id)
          setWrongIds((prev) => new Set(prev).add(value.id));
        setWrongId(value.id);
        if (typeof onSelect === "function") {
          onSelect({
            selectedId: value?.id,
            selectedIndex: index,
            isCorrect: false,
            correctId: CORRECT_ID,
            question,
            selectedLabel: labelNode,
          });
        }
      }
    }
  };

  const handleHint = () => {
    playClick();
    setHintSlide();
  };
  // Build options safely and shuffle per question
  const toStr = (v) => `${v}`;
  const isFrac = (s) => typeof s === "string" && s.includes("/");
  const recipStr = (v) => {
    if (isFrac(v)) {
      const [n, d] = v.split("/");
      return `${d}/${n}`;
    }
    return `1/${v}`;
  };
  // Render a value as stacked fraction if needed
  const Fraction = ({ value }) => {
    const s = `${value}`;
    if (!s.includes("/")) return <span>{s}</span>;
    const [n, d] = s.split("/");
    return (
      <span className="frac">
        <span className="num">{n}</span>
        <span className="bar" />
        <span className="den">{d}</span>
      </span>
    );
  };
  console.log("feedback", feedback);
  const buildNumericOptions = () => {
    const a = question && question.length > 0 ? question[0] : "a";
    const b = question && question.length > 1 ? question[1] : "b";
    const base = [
      {
        id: "A",
        label: (
          <>
            <Fraction value={toStr(a)} /> &nbsp;÷&nbsp;{" "}
            <Fraction value={recipStr(b)} />
          </>
        ),
      },
      {
        id: "B",
        label: (
          <>
            <Fraction value={recipStr(a)} /> &nbsp;×&nbsp;{" "}
            <Fraction value={toStr(b)} />
          </>
        ),
      }, // correct
      {
        id: "C",
        label: (
          <>
            <Fraction value={recipStr(a)} /> &nbsp;÷&nbsp;{" "}
            <Fraction value={toStr(b)} />
          </>
        ),
      },
      {
        id: "D",
        label: (
          <>
            <Fraction value={toStr(a)} /> &nbsp;×&nbsp;{" "}
            <Fraction value={recipStr(b)} />
          </>
        ),
      },
    ];
    return base;
  };

  const [shuffled, setShuffled] = useState([]);

  React.useEffect(() => {
    const src = buildNumericOptions();
    const a = [...src];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    setShuffled(a);
    setDisabledAll(false);
    setWrongIds(new Set());
    setCorrectId(null);
  }, [question]);
  return (
    <div className="optionspanel-container">
      <div className="options-grid">
        {(shuffled.length ? shuffled : buildNumericOptions()).map((opt, i) => (
          <button
            key={opt.id || i}
            className={`option-btn ${
              correctId === opt.id
                ? "correct"
                : wrongIds.has(opt.id) || disabledAll
                ? "wrong"
                : ""
            }`}
            onClick={() => handleSelect(opt, i)}
            disabled={disabledAll || wrongIds.has(opt.id)}
          >
            {typeof opt === "string" ? opt : opt.label}
          </button>
        ))}
      </div>

      <div className="hint-row">
        <ReusableButton
          label={t("hint.hint")}
          width="11vw"
          height="9vh"
          fontSize="3vw"
          showTap={false}
          showActive={false}
          onClick={handleHint}
        />
      </div>

      <div
        className="feedback-box"
        style={{
          backgroundColor:
            correctId === "D"
              ? "lightgreen"
              : wrongIds.size > 0
              ? "salmon"
              : "",
          borderColor:
            correctId === "D"
              ? "darkgreen"
              : wrongIds.size > 0
              ? "darksalmon"
              : "",
        }}
      >
        {errorShow ? (
          <ErrorMessage wrongId={wrongId} correctId={correctId} />
        ) : (
          <span>Feedback</span>
        )}
      </div>
    </div>
  );
};

export default OptionsPanel;
