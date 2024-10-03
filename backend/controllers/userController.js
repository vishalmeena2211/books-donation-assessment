const User = require('../models/userModel');

// Get all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().populate('books');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('books');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a user by ID
exports.updateUserById = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, phone, email, password },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a user by ID
exports.deleteUserById = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
