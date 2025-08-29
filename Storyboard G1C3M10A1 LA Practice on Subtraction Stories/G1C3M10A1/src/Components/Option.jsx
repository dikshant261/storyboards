import React from "react";
import "./Option.css";
const Option = ({ content, onClick,style }) => {
  return (
    <div className="option" onClick={onClick} style={style}>
      {content}
    </div>
  );
};

export default Option;
