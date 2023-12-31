const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {type: Number, default: 1},
    isActivated: {type: Boolean, default: true},
    activationLink: {type: String}
},
{timestamps: true},
);

const User = model('User', userSchema);

module.exports = User;