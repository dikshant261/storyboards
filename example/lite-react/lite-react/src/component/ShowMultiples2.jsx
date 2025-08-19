import React from 'react'
import './box.css'
import content from '../content.json';
const MultiplesShow2 = ({ multipleData, goBactTable}) => {
    console.log(multipleData);
    const multiples = [];
    for(let i = 1; i <= multipleData; i++) {
        if(i % 2 === 0) {
            multiples.push(i);
        }
    }
    const handlePrevious = () => {
        goBactTable()
    }    
    // const handleNext = () => {
    //     setMultipleShow(false);
    //     setTableShow(true);
    // }
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
            <div className='table-bottom-container'>
                <button className='next-button' onClick={handlePrevious}>{content.multiples2.button2}</button>
                <button className='next-button' disabled={false} style={{cursor:"not-allowed"}}>{content.multiples2.button}</button>
            </div>
        </div>
    )
}

export default MultiplesShow2