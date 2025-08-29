import React from "react";
import "./ErrorMessage.css";
const TotalCarError = ({ count,totalCar }) => {
  if (count === totalCar) {
    return null;
  }
  return (
    <div>
      {count < totalCar && (
        <p className="error-2">
          Oops! You have
          <br /> entered a<br /> smaller
          <br /> number…
          <br />
          Count and Try
          <br /> again…
        </p>
      )}
      {count > totalCar && (
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

export default TotalCarError;
