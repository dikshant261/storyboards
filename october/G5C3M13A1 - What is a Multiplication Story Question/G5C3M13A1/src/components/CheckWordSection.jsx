import React from "react";
import { useTranslation } from "react-i18next";
import "./CheckWordSection.css";
import check from "../assets/check.png"; // replace with your icon path

const CheckWordsSection = () => {
  const { t } = useTranslation();

  return (
    <div className="check-container">
      {/* Left Description */}
      <div className="left-description">
        <p className="para-t">
          <i>{t("sceneFifteen.checkWords")}</i>{" "}
          {t("sceneFifteen.checkWordsLine1")}
          <span className="bold">{t("sceneFifteen.total")}</span>.
        </p>
        <p className="para-t">{t("sceneFifteen.checkWordsLine2")}</p>
      </div>

      {/* Middle Keywords */}
      <div className="middle-words">
        <p className="word">{t("sceneFifteen.inAll")}</p>
        <p className="word">{t("sceneFifteen.howMany")}</p>
        <p className="word">{t("sceneFifteen.totalNumber")}</p>
        <p className="word">{t("sceneFifteen.findTotal")}</p>
      </div>

      {/* Right Icon */}
      <div className="right-icon">
        <img src={check} alt="Check Icon" className="icon" />
      </div>
    </div>
  );
};

export default CheckWordsSection;
