const User = require('../models/User.Model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerNewUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPwd });
        const user = await newUser.save();

        const token = jwt.sign({
            id: user._id, name: user.name, email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "1d" });


        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            domain: process.env.NODE_ENV === 'production' ? undefined : undefined, // Let browser handle domain
            path: '/'
        });

        res.status(200).json({ message: "User registered successfully", token, user });
    }
    catch (err) {
        if (err.code === 11000) return res.status(409).json({ message: "Email already exist" });

        if (err.name === "ValidationError") {
            const missingField = Object.keys(err.errors).map(field => field);
            return res.status(400).json({ missingField, message: "Please provide all the fields" });
        }
        res.status(500).json(err);
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User with this email not found" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credientials" });

        const token = jwt.sign({
            id: user._id, name: user.name, email: user.email
        }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Only secure in production
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000, // 24 hours
            domain: process.env.NODE_ENV === 'production' ? undefined : undefined, // Let browser handle domain
            path: '/'
        });

        res.json({ message: "User loged successfully ", token, user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const logoutUser = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        expires: new Date(0), // Expire the cookie immediately
        path: '/'
    });
    res.status(200).json({ message: "Logged out successfully" });
};

const verifyUser = (req, res) => {
    const token = req.cookies.token;
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        // Return user info without sensitive data
        res.status(200).json({ 
            user: {
                id: decoded.id,
                name: decoded.name,
                email: decoded.email
            },
            message: "Token is valid"
        });
    });
};

module.exports = { registerNewUser, loginUser, logoutUser, verifyUser };