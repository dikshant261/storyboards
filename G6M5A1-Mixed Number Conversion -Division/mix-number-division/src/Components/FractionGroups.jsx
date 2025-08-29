import React, { useEffect } from "react";

// Utility function: generate groups in num/den form
function getGroups(num, den, chosenQ) {
  if (chosenQ === null || chosenQ === undefined || isNaN(chosenQ)) return [];
  const groups = [];
  // Show chosenQ full groups of den/den
  for (let i = 0; i < chosenQ; i++) {
    groups.push(`${den}/${den}`);
  }
  // Remainder group
  const remainder = num - chosenQ * den;
  if (remainder > 0) {
    groups.push(`${remainder}/${den}`);
  }
  return groups;
}

// React component
const FractionGroups = ({ numerator, denominator, chosenQuotient, correctAnswer }) => {
  const [showCorrectAnswer, setShowCorrectAnswer] = React.useState(false);
  const groups = getGroups(numerator, denominator, chosenQuotient);
  useEffect(()=>{
    if(chosenQuotient === correctAnswer) {
      setShowCorrectAnswer(true);
    }
    else {
      setShowCorrectAnswer(false);
    }
  }, [correctAnswer, chosenQuotient]);
  return (
    <div style={{ display: "flex", gap: "1vw", fontSize: "3vw" }}>
      {groups.map((g, idx) => {
        const [num, den] = g.split("/");
        // Color last fraction based on showCorrectAnswer
        const isLast = idx === groups.length - 1;
        let color = undefined;
        let dividerColor = "#ffffffff";
        if (isLast) {
          color = showCorrectAnswer ? "var(--secondary-color)" : "lightcoral";
          dividerColor = color;
        }
        return (
          <span key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", fontSize: "4vw", color }}>
            <span>{num}</span>
            <span style={{ borderBottom: `2px solid ${dividerColor}`, width: "1.5em", margin: "2px 0" }}></span>
            <span>{den}</span>
          </span>
        );
      })}
    </div>
  );
};

export default FractionGroups;
