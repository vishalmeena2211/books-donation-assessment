const mongoose = require('mongoose');

const bookModel = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year_of_publication: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const Book = mongoose.model('Book', bookModel);
export default Book;