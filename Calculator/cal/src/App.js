import React, { useState } from 'react'
import './App.css';


const App = () => {

    const [input,setInput] = useState("");
    const [result,setResult] = useState("");


  return (
    <>
      <div className='calculator-container'>
         {/* display */}
        <div>
          <div>{input|| "0"}</div>
          <div>{result}</div>
        </div>
      </div>
      
    </>
  
  )
}

export default App