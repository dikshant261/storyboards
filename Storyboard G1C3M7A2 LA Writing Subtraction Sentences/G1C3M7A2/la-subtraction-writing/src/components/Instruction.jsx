import React from "react";
import "./Instruction.css";
import { useTranslation } from "react-i18next";
const Instruction = () => {
    const {t}=useTranslation();
  return (
    <div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="10.9 8.9 1.2 1.2"
          className="arrow-align-one"
        >
          <path
            d="M 12 9 Q 11 9 11 10"
            stroke="gold"
            stroke-width="0.06"
            fill="none"
          />
        </svg>
      </div>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="10.9 8.9 1.2 1.2"
          className="arrow-align-two"
        >
          <path
            d="M 12 9 Q 11 9 11 10"
            stroke="gold"
            stroke-width="0.06"
            fill="none"
          />
        </svg>
      </div>
      <div>
        {" "}
        <div className="arrow-line show-in"></div>
      </div>
      <div>
        <p className="total-number show-in">{t("totalCars")}</p>
        <p className="take-away show-in">{t("crossCars")}</p>
        <p className="ramains show-in">
          {t("remainingCars")}
        </p>
      </div>
    </div>
  );
};

export default Instruction;
