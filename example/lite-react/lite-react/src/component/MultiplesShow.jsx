import React from 'react'
import './box.css'
import content from '../content.json';
const MultiplesShow = ({ multipleData,setMultipleShow, setTableShow }) => {
    const multiples = [];
    for(let i = 1; i <= multipleData; i++) {
        if(i % 2 === 0) {
            multiples.push(i);
        }
    }
    const handlePrevious = () => {
        setMultipleShow(multipleData);
    }    
    const handleNext = () => {
        setTableShow();
    }
    return (
        <div>
            <div className='box-container'>
                <div className='multiple-show-container'>
                    {multiples.map((multiple, index) => (
                        <div className='multiple-show-box' key={index}>
                            {multiple}
                        </div>
                    ))}
                </div>
            </div>
            <div className='multiple-bottom-container'>
                <button className='next-button' onClick={handlePrevious}>{content.multiples.button2}</button>
                <button className='next-button' onClick={handleNext}>Next</button>
            </div>
        </div>
    )
}

export default MultiplesShow