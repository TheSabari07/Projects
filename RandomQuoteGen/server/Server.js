const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());

const quotes = [
    { text: "The best way to predict the future is to create it.", author: "Peter Drucker" },
    { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
];

app.get('/quotes/random', (req, res) => {
    const index = Math.floor(Math.random() * quotes.length); // Fix
    res.json(quotes[index]);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
