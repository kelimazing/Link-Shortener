import React, { useState } from 'react'
import BackgroundAnimation from './BackgroundAnimation';
import Input from "./Input";
import Result from "./Result";

const Home = () => {
  const [longUrl, setLongUrl] = useState("")
  
  return (
    <div className='container'>
      <Input setLongUrl={setLongUrl} />
      <BackgroundAnimation />
      <Result longUrl={longUrl}/>
    </div>
  )
}

export default Home