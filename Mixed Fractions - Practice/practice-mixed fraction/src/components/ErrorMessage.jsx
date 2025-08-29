import React from "react";
import "./ErrorMessage.css";
const ErrorMessage = ({ quotient, questionData }) => {
  return (
    <div>
      {quotient === questionData.rightQuotient ? (
        <div className="success-message">
          Well done! The correct quotient is {questionData.rightQuotient}
        </div>
      ) : questionData.dividend <= questionData.divisor * quotient ? (
        <div className="error-message">
          Oops! {quotient} groups of {questionData.divisor} make{" "}
          {questionData.divisor * quotient}, but we only have{" "}
          {questionData.dividend}.
          <br />
          Try again!
        </div>
      ) : (
        <div className="error-message">
          Oops! There is another complete whole of {questionData.divisor} in the
           {" "}{questionData.dividend-questionData.divisor * quotient} <br />
          part that are left.
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
