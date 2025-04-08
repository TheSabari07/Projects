import React, { useEffect, useState } from 'react'
import axios from 'axios';

const App = () => {

  const [backend,setBackend] = useState("");

 useEffect(()=>{
      axios.get('http://localhost:5002 ')
      .then(res => setBackend(res.data))
      .catch(err => console.error(err));
 },[]); 

  return (
    <div>
       <h1>React Frontend</h1>
       <p>Backend says: {backend}</p>
    </div>
  )
}

export default App;