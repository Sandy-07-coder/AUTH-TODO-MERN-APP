const express = require('express');
const router = express.Router();
const User = require('../models/User.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerNewUser, loginUser, logoutUser, verifyUser } = require('../controllers/authController');

// creating a new user
router.post('/register', registerNewUser);

// log in a user
router.post('/login', loginUser);

// log out a user
router.post('/logout', logoutUser);

// verify authentication status
router.get('/verify', verifyUser);

module.exports = router;