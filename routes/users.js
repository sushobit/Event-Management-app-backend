// routes/users.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db'); // Assuming you have a db module for SQLite

// Secret key for JWT
const SECRET_KEY = 'your_secret_key';

// Dummy user data, replace this with real database logic
const users = [
  { username: 'admin', password: 'event' } // Password is 'password'
];

// User login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
