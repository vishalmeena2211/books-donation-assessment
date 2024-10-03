const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
    }]
})

const User = mongoose.model('User', userModel);

export default User;