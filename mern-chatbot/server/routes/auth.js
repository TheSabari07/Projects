const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post('/register', async (req, res) => {
    
    const { username, password } = req.body; 

    try {
      const user = new User({ username, password });
      await user.save();
      res.status(201).json({ message: 'User registered' });
    } catch (err) {
      res.status(400).json({ error: 'Username might already exist' });
    }

  });

  router.post('/login', async(req,res) => {
    const { username, password } = req.body;

    try {

    }
  })