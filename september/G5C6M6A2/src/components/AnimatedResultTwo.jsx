import React, { useEffect, useState, useMemo } from "react";
import "./animatedresult.css";
import Fraction from "./Fraction";
import { useTranslation } from "react-i18next";
import bracket from "../assets/bracket.png";
const AnimatedResultTwo = ({
  next,
  setNext,
  fadeOpacity,
  paraTwo,
  paraOne,
}) => {
  const [visibleRows, setVisibleRows] = useState(0);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [divisors, setDivisors] = useState([]);
  const { t } = useTranslation();

  // ✅ Memoize parsed data to prevent infinite renders
  const parsed = useMemo(() => {
    const result = sessionStorage.getItem("fractionsData");
    return result ? JSON.parse(result) : [];
  }, []);

  // ✅ Extract divisors once
  useEffect(() => {
    if (parsed.length) {
      const extractedDivisors = parsed.map((item) => item.step.divisor);
      setDivisors(extractedDivisors);
    }
  }, [parsed]);

  // ✅ Show rows and trigger steps with proper timers
  useEffect(() => {
    if (!parsed.length) return;

    let i = 0;
    const rowInterval = setInterval(() => {
      setVisibleRows((prev) => prev + 1);
      i++;
      if (i >= parsed.length) clearInterval(rowInterval);
    }, 1500);

    const stepOneTimer = setTimeout(() => setStepOne(true), 5500);
    const stepTwoTimer = setTimeout(() => setStepTwo(true), 6500);
    const stepThreeTimer = setTimeout(() => {
      setStepThree(true);
      if (!next && setNext) setNext(true);
    }, 7200);

    return () => {
      clearInterval(rowInterval);
      clearTimeout(stepOneTimer);
      clearTimeout(stepTwoTimer);
      clearTimeout(stepThreeTimer);
    };
  }, [parsed, next, setNext]);

  // ✅ Utility: determine if this row should "beat"
  const isBeating = () => !fadeOpacity;

  // ✅ Utility: fade opacity style
  const fadeStyle = fadeOpacity ? 0.4 : 1;

  return (
    <div className="conatiner">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gridAutoFlow: "dense",
          gap: "1vh",
          justifyContent: "center",
        }}
      >
        {parsed.slice(0, visibleRows).map((item, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: "2vw",
              gridAutoFlow: "column",
              width: "100%"
            }}
          >
            <div
              style={{
                width: "6vw",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                opacity: fadeStyle,
              }}
            >
              <Fraction
                numerator={item.step.originalNum}
                denominator={item.step.originalDen}
                fontSize={"4vw"}
                lineHeight={"1vh"}
                lineWidth={"100%"}
              />
            </div>

            <p style={{ opacity: fadeStyle }}>=</p>

            {/* Division step */}
            <div className="division-align">
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "2vh",
                }}
              >
                <span style={{ opacity: fadeStyle }}>
                  {item.step.originalNum}
                </span>
                <span style={{ opacity: fadeStyle }}> ÷ </span>
                <span className={stepOne ? "divisor" : ""}>
                  {item.step.divisor}
                </span>
              </div>
              <div className="line-two" style={{ opacity: fadeStyle }}></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "2vh",
                }}
              >
                <span style={{ opacity: fadeStyle }}>
                  {item.step.originalDen}
                </span>
                <span style={{ opacity: fadeStyle }}> ÷ </span>
                <span className={stepOne ? "divisor" : ""}>
                  {item.step.divisor}
                </span>
              </div>
            </div>

            <p style={{ opacity: fadeStyle }}>=</p>

            {/* Final simplified fraction */}
            <div style={{ opacity: fadeStyle }}>
              <Fraction
                numerator={item.fraction.num}
                denominator={item.fraction.den}
                fontSize={"4vw"}
                lineHeight={"1vh"}
                lineWidth={"100%"}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="bracket" style={{ opacity: stepTwo ? 1 : 0 }}>
        <img src={bracket} style={{ height: "57vh", width: "4vw" }} />
      </div>

      {paraOne && (
        <div style={{ opacity: stepThree ? 1 : 0 }}>
          <p
            style={{
              fontSize: "2.5vw",
            }}
          >
            <span>
              <span style={{ opacity: fadeStyle }}>{t("divideBy")}</span>,
              <span className="divisor">{divisors[0]}</span>
              <span>{t("and")}</span>,
              <span className="divisor">{divisors[1]}</span>
              <span>{t("and")}</span>,
              <span className="divisor">{divisors[2]}</span>
              <br />
              <span style={{ opacity: fadeOpacity ? 0.7 : 1 }}>
                {t("andToget")}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                opacity: fadeStyle,
              }}
            >
              <span>12</span>
              <span
                style={{
                  backgroundColor: "white",
                  width: "3vw",
                  height: "0.3vh",
                }}
              ></span>
              <span>24</span>
            </span>
          </p>
        </div>
      )}

      {paraTwo && (
        <p>
          <span className="divisor">{divisors[0]}</span>
          <span>{t("and")}</span>,<span className="divisor">{divisors[1]}</span>
          {t("and")}
          <span className="divisor">{divisors[2]}</span> {t("commonFactor")}
        </p>
      )}
    </div>
  );
};

export default AnimatedResultTwo;
