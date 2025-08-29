import React from "react";
import "./ErrorMessage.css";
const ErrorMessage = ({ numbers,correctNumber }) => {
  console.log(numbers,correctNumber);
  return (
    <div>
      {numbers.number1 === correctNumber[0] &&
      numbers.number2 === correctNumber[1] &&
      numbers.number3 === correctNumber[2] ? (
        <p className="success">
          Well Done!
          <br />
          You have
          <br /> correctly written
          <br /> subtraction
          <br /> sentence for this
          <br /> picture and
          <br /> story…
        </p>
      ) : (
        <p className="error-2">
          Oops!
          <br />
          Use numbers in
          <br /> the story to write
          <br /> a sentence in the <br />
          form of “the
          <br /> whole – part <br />
          taken away = part
          <br /> that is left”.
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
