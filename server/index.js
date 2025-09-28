const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const authRoute = require('./routers/authRoute');
const todoRoute = require('./routers/todoRoute');
dotenv.config();

const secretKey = crypto.randomBytes(32).toString('hex');
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors({
  origin: [
    process.env.FRONT_END_URL,
    "http://localhost:5173", // For development
    "https://localhost:5173", // For local HTTPS
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));
app.use(cookieParser());
app.use('/auth', authRoute);
app.use('/', todoRoute);

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connection established")
}).catch((err) => {
    console.error("Database connection failed")
}
)
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

