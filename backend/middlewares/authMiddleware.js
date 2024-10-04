const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as necessary
require('dotenv').config();

exports.authMiddleware = async (req, res, next) => {
    // const token = req.headers.authorization;
    //exptract token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            throw new Error();
        }

        req.user = decoded;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
};
