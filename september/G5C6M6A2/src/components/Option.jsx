import React from "react";
import "./option.css";
import { useTranslation } from "react-i18next";
const Option = ({
  response,
  setShowError,
  allDisabled,
  setShowResultAnimation,
  flag,
}) => {
  const { t } = useTranslation();
  const result = sessionStorage.getItem("fractionsData");
  const parsed = result ? JSON.parse(result) : [];
  const handleResponse = (id) => {
    setShowError(false);
    response(id);
    // if (flag === 6 || flag === 7 || flag === 5 || flag === 2) {
    //   setShowResultAnimation(true);
    // } else {
    //   setShowResultAnimation(false);
    // }
  };
  return (
    <div className="option-container">
      <button onClick={() => handleResponse(2)} disabled={allDisabled}>
        <span>÷</span> <span>2</span>
      </button>
      <button onClick={() => handleResponse(3)} disabled={allDisabled}>
        <span>÷</span> <span>3</span>
      </button>
      <button onClick={() => handleResponse(5)} disabled={allDisabled}>
        <span>÷</span> <span>5</span>
      </button>
      <button
        style={{ fontSize: "2.2vw" }}
        onClick={() => handleResponse(4)}
        disabled={allDisabled}
      >
        {t("buttons.cannotDivide")}
      </button>
    </div>
  );
};

export default Option;
