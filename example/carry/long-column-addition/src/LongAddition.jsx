import React, { useState } from "react";
import "./LongAddition.css";

export default function LongAddition() {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [step, setStep] = useState(0);
  const [carryOver, setCarryOver] = useState([0, 0, 0]); // [hundreds, tens, ones]
  const [result, setResult] = useState(["", "", ""]);

  const splitDigits = (number) => {
    const str = number.toString().padStart(3, "0");
    return str.split("").map((n) => parseInt(n));
  };

  const handleNext = () => {
    const digits1 = splitDigits(num1);
    const digits2 = splitDigits(num2);

    if (step === 0) {
      // Add ones place
      const sum = digits1[2] + digits2[2];
      const carry = sum >= 10 ? 1 : 0;
      setCarryOver([0, 0, carry]);
      setResult((r) => [r[0], r[1], sum % 10]);
    } else if (step === 1) {
      // Add tens place + carry from ones
      const sum = digits1[1] + digits2[1] + carryOver[2];
      const carry = sum >= 10 ? 1 : 0;
      setCarryOver([0, carry, carryOver[2]]);
      setResult((r) => [r[0], sum % 10, r[2]]);
    } else if (step === 2) {
      // Add hundreds place + carry from tens
      const sum = digits1[0] + digits2[0] + carryOver[1];
      setCarryOver([carryOver[1], carryOver[2], 0]); // no more carry needed
      setResult((r) => [sum, r[1], r[2]]);
    }
    setStep(step + 1);
  };

  const handleReset = () => {
    setStep(0);
    setCarryOver([0, 0, 0]);
    setResult(["", "", ""]);
  };

  return (
    <div className="container">
      <h1>Long Column Addition</h1>
      <div className="inputs">
        <input
          type="number"
          max="999"
          placeholder="First Number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
        />
        <input
          type="number"
          max="999"
          placeholder="Second Number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        />
      </div>

      {step > 0 && (
        <div className="columns">
          <div className="row carry">
            {carryOver[0] > 0 ? <span>{carryOver[0]}</span> : <span>&nbsp;</span>}
            {carryOver[1] > 0 ? <span>{carryOver[1]}</span> : <span>&nbsp;</span>}
            {carryOver[2] > 0 ? <span>{carryOver[2]}</span> : <span>&nbsp;</span>}
          </div>
          <div className="row">
            {splitDigits(num1).map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="row plus">
            +
            {splitDigits(num2).map((d, i) => (
              <span key={i}>{d}</span>
            ))}
          </div>
          <div className="row">
            {result.map((d, i) => (
              <span key={i}>{d !== "" ? d : "_"}</span>
            ))}
          </div>
        </div>
      )}

      <div className="buttons">
        {step < 3 ? (
          <button onClick={handleNext} disabled={!num1 || !num2}>
            Next
          </button>
        ) : (
          <button onClick={handleReset}>Try Another</button>
        )}
      </div>
    </div>
  );
}
