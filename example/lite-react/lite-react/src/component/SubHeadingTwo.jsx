import React from 'react'
import './storyboard.css'
import content from '../content.json';
const SubHeadingTwo = () => {
    return (
        <div className='storyboard-subheading'>
            <h2>{content.multiples.subheading}</h2>
        </div>
    )
}

export default SubHeadingTwo