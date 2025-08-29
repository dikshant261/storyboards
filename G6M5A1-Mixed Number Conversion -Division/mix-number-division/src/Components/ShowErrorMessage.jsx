import React from "react";
import "./ShowError.css";
const ShowErrorMessage = ({ quotient, questionData }) => {
  let remainder = questionData.dividend % questionData.divisor;
  let multiply = quotient * questionData.divisor;
  let rem2=questionData.dividend - multiply;
  return (
    <div>
      {quotient === questionData.correctAnswer ? (
        <div className="success">
          Yay! There are {questionData.correctAnswer} complete wholes of{" "}
          {questionData.divisor} and then
          <br />
          {remainder} part of 5 left out as a remainder.
        </div>
      ) : multiply > questionData.dividend ? (
        <div className="error">
          Oops! The third group is not a complete whole of{" "}
          {questionData.divisor}!<br />
          This is not proper division. Try again!
        </div>
      ) : (
        <div className="error">
          Oops! There is another complete whole of {questionData.divisor} in the{" "}
          {rem2}<br /> part that are left! This is not proper division. Try
          again!
        </div>
      )}
    </div>
  );
};

export default ShowErrorMessage;
