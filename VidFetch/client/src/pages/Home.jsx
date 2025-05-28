import React from "react";
import UrlInputForm from "../components/UrlInputForm";


const Home = () => {
    return (

        <div className="app-container">

            <h1>VidFetch</h1>
            <P>Download videos from social media using the URL</P>
            <UrlInputForm/>

        </div>

    );
};

export default Home;