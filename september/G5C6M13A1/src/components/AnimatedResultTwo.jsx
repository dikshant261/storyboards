import React, { useEffect, useState } from "react";
import "./animatedresult.css";
import Fraction from "./Fraction";
import { useTranslation } from "react-i18next";

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
  const result = sessionStorage.getItem("fractionsData");
  const parsed = result ? JSON.parse(result) : [];
  const { t } = useTranslation();
  // Show each row one by one
  useEffect(() => {
    if (parsed.length === 0) return;

    let i = 0;
    const interval = setInterval(() => {
      setVisibleRows((prev) => prev + 1);
      i++;
      if (i >= parsed.length) {
        clearInterval(interval);
      }
    }, 1500); // 1.5 sec delay per row
    setInterval(() => {
      setStepOne(true);
    }, 5500);
    setInterval(() => {
      setStepTwo(true);
    }, 6500);
    setInterval(() => {
      setStepThree(true);
      if (!next) {
        setNext();
      }
    }, 7200);
    return () => clearInterval(interval);
  }, [parsed, next]);

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
              width: "100%",
            }}
          >
            <div
              style={{
                width: "6vw",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
                opacity: fadeOpacity ? "0.4" : "1",
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

            <p style={{ opacity: fadeOpacity ? "0.4" : "1" }}>=</p>

            {/* Division step */}
            <div
              className="division-align"
              style={{
                
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "2vh",
                }}
              >
                <span style={{ opacity: fadeOpacity ? "0.4" : "1" }}>
                  {" "}
                  {item.step.originalNum}
                </span>
                <span style={{ opacity: fadeOpacity ? "0.4" : "1" }}> ÷ </span>
                <span className={`${stepOne ? "divisor" : ""}`}>
                  {item.step.divisor}
                </span>
              </div>
              <div
                className="line-two"
                style={{ opacity: fadeOpacity ? "0.4" : "1" }}
              ></div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "2vh",
                }}
              >
                <span style={{ opacity: fadeOpacity ? "0.4" : "1" }}>
                  {item.step.originalDen}
                </span>{" "}
                <span style={{ opacity: fadeOpacity ? "0.4" : "1" }}> ÷ </span>
                <span className={`${stepOne ? "divisor" : ""}`}>
                  {item.step.divisor}
                </span>
              </div>
            </div>

            <p style={{ opacity: fadeOpacity ? "0.4" : "1" }}>=</p>

            {/* Final simplified fraction */}
            <div style={{ opacity: fadeOpacity ? "0.4" : "1" }}>
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
      <div
        className="bracket"
        style={{ opacity: fadeOpacity ? "0.4" : stepTwo ? "1" : "0" }}
      >
        {"}"}
      </div>
      {paraOne && (
        <div style={{ opacity: stepThree ? "1" : "0" }}>
          <p>
            <span>
              <span style={{ opacity: fadeOpacity ? "0.4" : "1" }}>
                {t("divideBy")}
              </span>
              ,<span className="divisor">2</span>,
              <span className="divisor">2</span>,
              <span className="divisor">3</span>
              <br />
              <span style={{ opacity: fadeOpacity ? "0.7" : "1" }}>
                {t("andToget")}
              </span>
            </span>
            <span
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                opacity: fadeOpacity ? "0.4" : "1",
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
          <span className="divisor">2</span>,<span className="divisor">2</span>{" "}
          {t("and")} <span className="divisor">3</span> {t("commonFactor")}
        </p>
      )}
    </div>
  );
};

export default AnimatedResultTwo;
