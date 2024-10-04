const mongoose = require('mongoose');

const bookModel = mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,
    },
    year_of_publication: {
        type: String,
    },
    ISBN: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Book = mongoose.model('Book', bookModel);
module.exports = Book;