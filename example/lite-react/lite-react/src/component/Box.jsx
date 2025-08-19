import React, { useState, useEffect, useRef } from 'react'
import './box.css'
import MultiplesShow from './MultiplesShow'
import content from '../content.json';
const Box = ({setMultipleShow, setMultipleData, multipleData}) => {
    const multiples=[2,3,4,5,6,7,8,9,10,11,12]
    const [box, setBox] = useState(multipleData||2);
    
    const [newBoxes, setNewBoxes] = useState([])
    const prevBoxCount = useRef(2)
    const boxAlignRef = useRef(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    
    // const [showMultiples, setShowMultiples] = useState(false)

    const handleBox = (multiple, index) => {
        setCurrentIndex(index)
        const newCount = multiple * 2
        const newBoxCount = newCount - prevBoxCount.current
        
        if (newBoxCount > 0) {
            const newIndices = Array.from(
                { length: newBoxCount }, 
                (_, i) => prevBoxCount.current + i
            )
            setNewBoxes(newIndices)
            
            setTimeout(() => {
                setBox(newCount)
            }, 50)
        } else {
            setNewBoxes([])
            setBox(newCount)
        }
        prevBoxCount.current = newCount
    }

    const handleNext = () => {
        setMultipleShow(true)
        setMultipleData(box)
    }
    
    useEffect(() => {
        if (newBoxes.length > 0) {
            const timer = setTimeout(() => {
                setNewBoxes([])
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [newBoxes])
    
    return (
        <div>
            <div className='box-container'>
                <div className='box-align' ref={boxAlignRef}>
                    {Array.from({length: box}).map((_, index) => (
                        <div 
                            className={`box ${newBoxes.includes(index) ? 'animate-box' : ''}`} 
                            key={index}
                            style={{
                                transitionDelay: newBoxes.includes(index) ? '0s' : '0.1s'
                            }}
                        >
                            {(index + 1) % 2 === 0 && (
                                <div className="box-number">
                                    {index + 1}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className='button-container'>
                <h2>{content.box.subheading}</h2>
                <div className='button-align'>
                    {multiples.map((multiple, index) => (
                        <button 
                            key={index} 
                            className={`button ${currentIndex === index ? 'selected' : ''}`} 
                            onClick={() => handleBox(multiple, index)}
                        >
                            {multiple}
                        </button>
                    ))}
                    <button 
                        className='next-button' 
                        onClick={handleNext}
                    >
                        {content.box.button}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Box