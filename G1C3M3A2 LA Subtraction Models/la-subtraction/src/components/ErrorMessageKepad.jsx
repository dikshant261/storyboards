import React from "react";
import "./ErrorMessage.css";
const ErrorMessageKeypad = ({ count }) => {
  if (count === 2) {
    return null;
  }
  return (
    <div>
      {count < 2 && (
        <p className="error-2">
          Oops! There
          <br /> are more than
          <br /> 1 cars left…
        </p>
      )}
      {count > 2 && (
        <p className="error-2">
          Oops! There
          <br /> are less than {count}
          <br /> cars left…
        </p>
      )}
    </div>
  );
};

export default ErrorMessageKeypad;
