import React from "react";
import { useTranslation } from "react-i18next";
import tap from "../assets/tap.gif";
const FooterButtons = ({
  disabledNext,
  nextOne,
  nextTwo,
  stepOne,
  stepTwo,
  stepThree,
  btnTwo,
  prveOne,
  last,
  tapProceed,
  handleNextOne,
  handleNextTwo,
  handleProceed,
  handlePrevOne,
  handlePrevTwo,
  handlePrevThree,
  handlePrevFour
}) => {
  const {
    t
  } = useTranslation();
  return /*#__PURE__*/React.createElement("div", {
    className: "footer-buttons"
  }, stepOne && /*#__PURE__*/React.createElement("button", {
    className: "nxt-btn",
    onClick: handlePrevOne
  }, t("buttons.previous")), stepTwo && /*#__PURE__*/React.createElement("button", {
    className: "nxt-btn",
    onClick: handlePrevTwo
  }, t("buttons.previous")), btnTwo && /*#__PURE__*/React.createElement("button", {
    className: "nxt-btn",
    onClick: handlePrevThree
  }, t("buttons.previous")), tapProceed && /*#__PURE__*/React.createElement("button", {
    className: "nxt-btn",
    onClick: handlePrevFour
  }, t("buttons.previous")), disabledNext && /*#__PURE__*/React.createElement("button", {
    className: "nxt-btn",
    disabled: true,
    style: {
      backgroundColor: "gray",
      borderColor: "gray"
    }
  }, t("buttons.proceed")), nextOne && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "nxt-btn",
    onClick: handleNextOne,
    style: {
      position: "relative"
    }
  }, t("buttons.proceed")), /*#__PURE__*/React.createElement("img", {
    src: tap,
    alt: "Proceed",
    style: {
      position: "absolute",
      bottom: "0%",
      width: "3vw",
      height: "3vw",
      animation: "bounce 1s infinite"
    }
  })), nextTwo && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "nxt-btn",
    onClick: handleNextTwo,
    style: {
      position: "relative"
    }
  }, t("buttons.proceed")), /*#__PURE__*/React.createElement("img", {
    src: tap,
    alt: "Proceed",
    style: {
      position: "absolute",
      bottom: "0%",
      width: "3vw",
      height: "3vw",
      animation: "bounce 1s infinite"
    }
  })), tapProceed && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "nxt-btn",
    onClick: handleProceed,
    style: {
      position: "relative"
    }
  }, t("buttons.proceed")), /*#__PURE__*/React.createElement("img", {
    src: tap,
    alt: "Proceed",
    style: {
      position: "absolute",
      bottom: "0%",
      width: "3vw",
      height: "3vw",
      animation: "bounce 1s infinite"
    }
  })));
};
export default FooterButtons;