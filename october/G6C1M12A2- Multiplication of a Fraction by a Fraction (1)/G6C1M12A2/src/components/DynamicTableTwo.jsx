import React from "react";
import "./DynamicTable.css";

const DynamicTableTwo = ({ tables,style }) => {
  return (
    <div className="tables-container-two" style={style}>
      {tables.map((table, tableIndex) => (
        <table key={tableIndex} className="custom-table-two">
          <tbody>
            {Array.from({ length: table.rows }).map((_, rowIndex) => (
              <tr key={rowIndex}>
                {Array.from({ length: table.cols }).map((_, colIndex) => {
                  const key = `${rowIndex}-${colIndex}`;
                  const cellColor = table.coloredCells[key] || "";
                  return (
                    <td
                      key={colIndex}
                      className={cellColor}
                      style={table.style}
                    ></td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default DynamicTableTwo;
