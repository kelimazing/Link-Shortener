import React from 'react'
import { Link } from 'react-router-dom'
import BackgroundAnimation from './BackgroundAnimation'

const NotFound = () => {
  return (
    <div className='container'>
      <div className='inputContainer'>
        <h1>URL <span>Shortener</span></h1>
      </div>
      <div className='result'>
        <p>Link Not Found</p>
        <Link to='/'><button>Go back to Home</button></Link>
      </div>
      <BackgroundAnimation />
    </div>
  )
}

export default NotFound