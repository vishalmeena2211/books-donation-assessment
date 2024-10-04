const express = require('express');
const { login, signUp } = require('../controllers/authController');
const { getUsers, deleteUserById, updateUserById, getUserById } = require('../controllers/userController');
const { getAllBooksOfUser, createBook, updateBook, deleteBook, reorderBooks } = require('../controllers/bookController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

//Auth Routes
router.post('/login', login);
router.post('/signup', signUp);

//User Routes
router.get('/users', authMiddleware, getUserById);
router.put('/users', authMiddleware, updateUserById);
router.delete('/users/:id', authMiddleware, deleteUserById);

//Book Routes
router.get('/books', authMiddleware, getAllBooksOfUser);
router.post('/books', authMiddleware, createBook);
router.put('/books/:id', authMiddleware, updateBook);
router.delete('/books/:id', authMiddleware, deleteBook);
router.get('/books/reorder/:id', authMiddleware, reorderBooks);

module.exports = router;