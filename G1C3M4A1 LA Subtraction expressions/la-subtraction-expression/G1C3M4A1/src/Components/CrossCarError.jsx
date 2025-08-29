import React from "react";
import "./ErrorMessage.css";
const CrossCarError = ({ count, crossCar }) => {
  if (count === crossCar) {
    return null;
  }
  return (
    <div>
      {count < crossCar && (
        <p className="error-2">
          Oops! You have
          <br /> entered a<br /> smaller
          <br /> number…
          <br />
          Count and Try
          <br /> again…
        </p>
      )}
      {count > crossCar && (
        <p className="error-2">
          Oops! You have
          <br /> entered a bigger
          <br /> number…
          <br />
          Count and Try
          <br /> again…
        </p>
      )}
    </div>
  );
};

export default CrossCarError;
