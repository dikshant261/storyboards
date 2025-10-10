import React from "react";
import { useTranslation } from "react-i18next";
import "./HintSlide.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
function FractionTwo({ value }) {
  const [numerator, denominator] = value.split("/");
  return (
    <span
      style={{
        display: "inline-block",
        textAlign: "center",
        verticalAlign: "middle",
        minWidth: "1.5em",
      }}
    >
      <span style={{ display: "block", lineHeight: "1" }}>{numerator}</span>
      <span
        style={{ borderTop: "0.3vw solid", display: "block", lineHeight: "1" }}
      >
        {denominator}
      </span>
    </span>
  );
}
const HintSlide = ({ close }) => {
  const { t } = useTranslation();

  return (
    <div className="fraction-container">
      <h2 className="fraction-title">{t("multiplication_title")}</h2>
      <p className="fraction-description">{t("multiply_fraction_rule")}</p>

      <div className="fraction-main">
        <div className="fraction-left">
          <p className="fraction-heading">{t("multiplication_heading")}</p>
          <p className="fraction-equation">
            <span className="fraction">
              <FractionTwo value={"2/3"} />
            </span>{" "}
            {t("of")} 6 ={" "}
            <span className="fraction">
              <FractionTwo value={"2/3"} />
            </span>{" "}
            × 6
          </p>
        </div>
        <p style={{ fontSize: "4vw", fontWeight: "900" }}>=</p>
        <div className="fraction-right">
          <p className="fraction-formula">
            <span className="fraction-label">
              <FractionTwo
                value={`${t("numerator_whole_over_denominator")}/${t(
                  "denominator"
                )}`}
              />
            </span>
          </p>
          <p className="fraction-solution">
            <FractionTwo value={"(2 × 6)/3"} /> = <FractionTwo value={"12/3"} />{" "}
            = 4
          </p>
        </div>
      </div>
      <div>
        <ReusableButton
          label={t("buttons.close")}
          width="10vw"
          height="9vh"
          fontSize="3vw"
          onClick={() => {
            playClick();
            close();
          }}
        />
      </div>
    </div>
  );
};

export default HintSlide;
