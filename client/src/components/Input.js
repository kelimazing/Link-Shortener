import React, { useState } from 'react'

const Input = ({ setLongUrl }) => {
  const [input, setInput] = useState('')


  // When Shorten button is clicked
  const handleClick = () => {
    // Update long Url
    setLongUrl(input)
  }

  return (
    <div className='inputContainer'>
      <h1>URL <span>Shortener</span></h1>
      <div>
        <input type='text' placeholder='Paste your link here' value={input} onChange={(e) => setInput(e.target.value)}/>
        <button onClick={handleClick}>Shorten</button>
      </div>
    </div>
  )
}

export default Input