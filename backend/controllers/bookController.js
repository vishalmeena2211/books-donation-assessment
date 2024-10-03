const Book = require('../models/bookModel');

// Get all books
exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single book by ID
exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new book
exports.createBook = async (req, res) => {
    const { title, author, year_of_publication, ISBN, user } = req.body;
    const newBook = new Book({
        title,
        author,
        year_of_publication,
        ISBN,
        user
    });

    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a book by ID
exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ message: 'Book not found' });
        }
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
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
