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


        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24*60*60*1000
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

        res.cookie("token",token,{
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 24*60*60*1000
        });

        res.json({ message: "User loged successfully ", token, user });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { registerNewUser, loginUser };