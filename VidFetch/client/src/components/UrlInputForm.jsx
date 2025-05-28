import React, { useState } from 'react'

const UrlInputForm = () => {

    const [Url, setUrl] = useState("");


  return (

    <form action=""  className="form">

        <input type="text" placeholder="Paste video URL here..."
        value={url} onChange={(e) => setUrl(e.target.value)} />

        <button type="submit">Download</button>
    </form>

  );

};

export default UrlInputForm;