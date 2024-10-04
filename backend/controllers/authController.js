require('dotenv').config();
const User = require('../models/userModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkExistance = await User.findOne({ email });
        if (checkExistance) {
            return res.status(401).json({
                success: false,
                message: "Account already exist with this email adress"
            });
        }

        const hashedpassword = await bcrypt.hash(password, 10);

        const savedData = await User.create({
            name
            , email
            , password: hashedpassword,
            phone: null,
            books: []
        });
        console.log("Data save succesfully");
        savedData.password = undefined;

        return res.status(200).json({
            success: true,
            message: "data Saved successfully",
            data: savedData,

        });

    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: `Error while signup ${error.message}`
        });

    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        let isUser = await User.findOne({ email });
        if (!isUser) {
            return res.status(401).json({
                success: false,
                message: "No User Exist"
            })
        }
        const checkPassword = await bcrypt.compare(password, isUser.password);
        if (checkPassword) {

            const payload = {
                id: isUser._id,
                email: isUser.email,
                name: isUser.name,
                phone: isUser.phone
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
            isUser = isUser.toObject()
            isUser.token = token;
            isUser.password = undefined;
            console.log("login sucessfully");
            return res.cookie("token", token, { expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), httpOnly: true }).status(200).json({
                success: true,
                message: "login successfull",
                data: isUser,
                token
            })
        } else {
            return res.status(401).json({
                success: false,
                message: "Wrong password"
            })
        }
    }
    catch (error) {
        return res.status(401).json({
            success: false,
            message: `error when try to log in ${error.message}`
        })

    }
}