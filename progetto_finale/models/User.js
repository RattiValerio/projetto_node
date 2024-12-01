const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    purchase_history: [
        {
            aircraft: String,
            date: String,
            price: Number
        }
    ],
    password: String,
    admin: { type: Boolean, default: false}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
