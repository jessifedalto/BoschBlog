const User = require('../model/user').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config();

class AuthController {
    static async register(req, res) {
        const { name, email, password } = req.body;
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(toString(password), salt);

        const find = await User.findOne({ email });

        if (find)
            return res.status(400).send({ message: "Email is used in another account" });

        const user = new User({
            name,
            email,
            password: passwordHash,
        });

        try {
            await user.save();
            res.status(201).send({ message: "User created successfully" });
        } catch (error) {
            return res.status(500).send({ message: "Something failed" })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne(email);
        
            if (!user || !(await bcrypt.compare(toString(password), user.password))) {
                return res.status(400).send({ message: "Invalid Email or password" });
            }

            const tk = jwt.sign(
                { id: user._id },
                process.env.SECRET,
                { expiresIn: '2d' }
            );

            return res.status(200).send({ token: tk });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).send({ message: "Something went wrong" });
        }
    }
}

module.exports = AuthController;