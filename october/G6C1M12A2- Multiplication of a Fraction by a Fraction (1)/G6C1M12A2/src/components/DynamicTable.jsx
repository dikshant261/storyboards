import React from "react";
import "./DynamicTable.css";

const DynamicTable = ({ rows, cols, coloredCells, style }) => {
  // coloredCells = object with cell positions and their colors
  // Example:
  // { "0-0": "cyan", "1-0": "cyan", "2-0": "green", "2-1": "green" }

  return (
    <table className="custom-table">
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: cols }).map((_, colIndex) => {
              const cellKey = `${rowIndex}-${colIndex}`;
              const cellColor = coloredCells[cellKey]?.color || "";
              const cellText = coloredCells[cellKey]?.text || "";
              return (
                <td key={colIndex} className={cellColor} style={style}>
                  {cellText}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicTable;
