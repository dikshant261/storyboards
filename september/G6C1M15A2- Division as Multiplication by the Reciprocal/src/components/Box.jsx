import React from 'react'
import './box.css';
const Box = ({ content,boxCss }) => {
  console.log(boxCss)
  return (
    <div className='alignment'>
     <span>=</span>   
    <div className={`box ${boxCss}`}>
     {content}
    </div>
    </div>
  )
}

export default Box