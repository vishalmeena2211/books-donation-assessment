const express = require('express');
const { connectDB } = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const router = require('./routes/route');

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'hhttps://book-donation-assessment.netlify.app',
    // credentials: true
}));

connectDB();

app.use('/api/v1', router);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});