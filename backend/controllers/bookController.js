const { default: mongoose } = require('mongoose');
const Book = require('../models/bookModel');
const User = require('../models/userModel');

// Get all books
exports.getAllBooksOfUser = async (req, res) => {
    try {
        const userId = req.user.id
        const books = await Book.find({
            user: userId
        });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    const { title, author, year_of_publication, ISBN } = req.body;
    const user = req.user.id;
    const newBook = new Book({
        title,
        author,
        year_of_publication,
        ISBN,
        user
    });

    try {
        const savedBook = await newBook.save();

        const userOfThisBook = await User.findById(req.user.id)
        userOfThisBook.books.unshift(savedBook._id);
        await userOfThisBook.save();

        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
    try {

        const book = await Book.find({ _id: req.params.id, user: req.user.id })

        if (!book) {
            res.status(404).json({ message: "book not found" });
            return;
        }

        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })

        res.status(200).json(updatedBook);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a book by ID
exports.deleteBook = async (req, res) => {
    try {

        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            res.status(404).json({ message: 'Book not found' });
            return;
        }

        const user = await User.findById(req.user.id);
        user.books = user.books.filter((book) => book.toString() !== req.params.id);

        await user.save();

        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// / Reorder books and make the specified book ID appear on top
exports.reorderBooks = async (req, res) => {
    try {
        const bookId = req.params.id; // Get the book ID from request parameters
        const userId = req.user.id; // Get the user ID from authenticated user context

        // Check if userId is defined
        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Find the user by their ID
        const user = await User.findById(userId);

        // Check if the user exists
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if bookId is valid
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ message: 'Invalid book ID' });
        }

        console.log(user)
        console.log(user.books)

        user.books = user.books.filter((book) => book.toString() !== bookId);
        user.books.unshift(bookId);

        await user.save();
        res.status(200).json({ message: 'Book reordered successfully', books: user.books });
    } catch (error) {
        console.error('Error reordering books:', error);
        res.status(500).json({ message: error.message });
    }
};