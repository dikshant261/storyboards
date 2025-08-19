import React from 'react'
import './box.css'
import './storyboard.css'
import content from '../content.json';
const Table = ({ number, setMultipleShow, goBackToMultiples }) => {
    const tableData = [];
    for(let i = 1; i <= number; i++) {
        tableData.push(i);
    }
    const handleNext = () => {
        setMultipleShow();
    }
    const handlePrevious = () => {
        goBackToMultiples(number);
    }
  return (
    <div>
    <div className='box-container'>
        <div className='tale-data'>
            {tableData.map((data, index) => (
                <div className='table-data-box' key={index}>
                    <span>2 X {data}</span>
                    <div className='result-box'>
                        <span>{2 * data}</span>
                    </div>
                </div>
            ))}

        </div>
    </div>
    <div className='table-bottom-container'>
                <button className='next-button' onClick={handlePrevious}>{content.table.button2}</button>
                <button className='next-button' onClick={handleNext}>{content.table.button}</button>
            </div>
    </div>
  )
}

export default Table