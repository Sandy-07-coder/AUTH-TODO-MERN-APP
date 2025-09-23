const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    todoList: [
        {
            task: { type: String },
            status: { type: String, default: "Not Started" },
            createdAt: { type: String }
        }
    ]

}, { timestamps: true })

userSchema.plugin(AutoIncrement, { inc_field: 'id' })

const User = mongoose.model("User", userSchema);



module.exports = User;