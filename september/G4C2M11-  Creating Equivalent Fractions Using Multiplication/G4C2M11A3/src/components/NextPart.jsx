import React from 'react'
import './startpage.css';
import { useTranslation } from 'react-i18next';
import ReusableButton from './TapButton';
import { playClick } from './PlayAudio';
const NextPart = ({onClose}) => {
    const {t}=useTranslation();
  return (
    <div className="start-page-container">
      <div className="top-heading">{t("Equivalent_Fractions")}</div>
      <div className="sub-heading-one">{t("now_it_time")}</div>
      <div className="top-margin">
        <ReusableButton
          label={t("next")}
          width="12vw"
          height="10vh"
          fontSize="3vw"
          onClick={() => {
            playClick();
            onClose();
          }}
        />
      </div>
    </div>
  )
}

export default NextPart