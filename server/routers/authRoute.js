const express = require('express');
const router = express.Router();
const User = require('../models/User.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerNewUser, loginUser } = require('../controllers/authController');

// creating a new user

router.post('/register', registerNewUser);

// log in a new user

router.post('/login', loginUser);


module.exports = router;