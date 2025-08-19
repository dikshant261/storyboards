import React from 'react'
import './storyboard.css'
import content from '../content.json';
const SubHeadingThree = () => {
    return (
        <div className='storyboard-subheading'>
            <h2>{content.table.subheading}</h2>
        </div>
    )
}

export default SubHeadingThree