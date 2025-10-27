import React, { useState } from "react";
import "./scene.css";
import raisehandchild from "../assets/raisehandchild.png";
import Mindy_Pointing_Up_Mid from "../assets/Mindy_Pointing_Up_Mid.png";
import { useTranslation } from "react-i18next";
import Onefinger from "../assets/Onefinger.png";
import Threefinger from "../assets/Threefinger.png";
import Twofinger from "../assets/Twofinger.png";
import fourfinger from "../assets/fourfinger.png";
import Fivefinger from "../assets/Fivefinger.png";
import speaker from "../assets/speaker.png";
import { playClick, playFive, playFour, playOne, playThree, playTwo } from "./PlayAudio";
import Tap from "./Tap";
import ReusableButton from "./ReusableButton";
const Scene = () => {
  const {
    t
  } = useTranslation();
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false
  });
  const [start, setStart] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const handleClick = (key, playFn) => {
    playFn();
    setClicked(prev => {
      const updated = {
        ...prev,
        [key]: true
      };
      return updated;
    });
  };

  // If all three are clicked at least once, button becomes enabled
  const allClicked = clicked.one && clicked.two && clicked.three && clicked.four && clicked.five;
  const handleSpeakerClick = () => {
    if (isPlaying) return; // stop if already playing

    const randomFn = [playOne, playTwo, playThree, playFive, playFour][Math.floor(Math.random() * 3)];
    setIsPlaying(true);
    setStart(false);

    // Play chosen sound
    randomFn();

    // Assume each audio ~1.5s — adjust to your actual duration
    setTimeout(() => {
      setIsPlaying(false);
    }, 1500);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top-heading"
  }, t("count")), /*#__PURE__*/React.createElement("div", {
    className: "align-hand-image"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shout-loud"
  }, t("shout")), /*#__PURE__*/React.createElement("img", {
    src: raisehandchild,
    className: "boy-hand"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "one"
  }, /*#__PURE__*/React.createElement("img", {
    src: Onefinger,
    style: {
      width: "16vw",
      cursor: "pointer"
    },
    className: `${start ? "opacity" : ""}`,
    onClick: () => {
      handleClick("one", playOne);
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: Twofinger,
    style: {
      width: "16vw",
      cursor: "pointer"
    },
    className: `${start ? "opacity" : ""}`,
    onClick: () => {
      handleClick("two", playTwo);
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: Threefinger,
    style: {
      width: "16vw",
      cursor: "pointer"
    },
    className: `${start ? "opacity" : ""}`,
    onClick: () => {
      handleClick("three", playThree);
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: fourfinger,
    style: {
      width: "16vw",
      cursor: "pointer"
    },
    className: `${start ? "opacity" : ""}`,
    onClick: () => {
      handleClick("four", playFour);
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: Fivefinger,
    style: {
      width: "16vw",
      cursor: "pointer"
    },
    className: `${start ? "opacity" : ""}`,
    onClick: () => {
      handleClick("five", playFive);
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("img", {
    src: speaker,
    style: {
      width: "17vw",
      cursor: "pointer"
    },
    onClick: () => {
      handleSpeakerClick();
    }
  })))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("p", null, t("tap")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.next"),
    padding: "1vh",
    fontSize: "3vw",
    showTap: false,
    showActive: false,
    onClick: () => {
      playClick();
      window.location.reload();
    },
    disabled: !allClicked // Enable when all images are clicked
  })));
};
export default Scene;