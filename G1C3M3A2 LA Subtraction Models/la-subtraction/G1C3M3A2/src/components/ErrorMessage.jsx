import React from "react";
import "./ErrorMessage.css";
const ErrorMessage = ({ count }) => {
  if (count === 0) {
    return null;
  }
  return (
    <div>
      {count < 3 && (
        <p className="error-message">
          You need
          <br /> to subtract 3.
          <br /> Cross more cars
          <br /> and check…
        </p>
      )}
      {count > 3 && (
        <p className="error-message">
          Oops! You have
          <br /> removed more
          <br /> than 3 cars. Try
          <br /> again…
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
