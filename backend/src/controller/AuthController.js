const User = require('../model/user').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Author } = require('../model/author').Author;
const CryptoTS = require('crypto-ts');
require('dotenv').config();

class AuthController {
    static async register(req, res) {
        const { name, email, birth, password, confirmPassword } = req.body;

        if (!name)
            return res.status(400).json({ message: "O nome é obrigatório" });

        if (!email)
            return res.status(400).json({ message: "O e-mail é obrigatório" });

        if (!password)
            return res.status(400).json({ message: "A senha é obrigatória" });

        try {

            var decryptNameBytes = CryptoTS.AES.decrypt(name.toString(), process.env.VITE_AES_SECRET);
            var decryptName = decryptNameBytes.toString(CryptoTS.enc.Utf8);

            var decryptEmailBytes = CryptoTS.AES.decrypt(email.toString(), process.env.VITE_AES_SECRET);
            var decryptEmail = decryptEmailBytes.toString(CryptoTS.enc.Utf8);

            var decryptBirthBytes = CryptoTS.AES.decrypt(birth.toString(), process.env.VITE_AES_SECRET);
            var decryptBirth = decryptBirthBytes.toString(CryptoTS.enc.Utf8);

            var decryptPasswordBytes = CryptoTS.AES.decrypt(password.toString(), process.env.VITE_AES_SECRET);
            var decryptPassword = decryptPasswordBytes.toString(CryptoTS.enc.Utf8);
            var decryptConfirmBytes = CryptoTS.AES.decrypt(confirmPassword.toString(), process.env.VITE_AES_SECRET);
            var decryptConfirmPassword = decryptConfirmBytes.toString(CryptoTS.enc.Utf8);

            if (decryptPassword != decryptConfirmPassword)
                return res.status(400).json({ message: "As senhas não conferem" });

            const userExist = await User.findOne({ email: decryptEmail });

            if (userExist)
                return res.status(409).json({ message: "insira outro e-mail" });

            if (!decryptEmail.includes('@'))
                return res.status(400).send({ message: "Insira um e-mail válido" })

            const salt = await bcrypt.genSalt(12);

            const passwordHash = await bcrypt.hash(decryptPassword, salt);

            const find = await User.findOne({ decryptEmail });

            if (find)
                return res.status(400).send({ message: "Email is used in another account" });

            const user = new User({
                name: decryptName,
                email: decryptEmail,
                password: passwordHash,
                createdAt: Date.now()
            });

            const author = new Author({
                name: decryptName,
                birth: decryptBirth,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            })

            await author.save();
            await user.save();
            res.status(201).send({ message: "User created successfully" });

        } catch (error) {
            return res.status(500).send({ message: "Something failed" })
        }
    }

    static async login(req, res) {
        const { email, password } = req.body;

        try {

            var decryptEmailBytes = CryptoTS.AES.decrypt(email.toString(), process.env.VITE_AES_SECRET);
            var decryptEmail = decryptEmailBytes.toString(CryptoTS.enc.Utf8);

            var decryptPasswordBytes = CryptoTS.AES.decrypt(password.toString(), process.env.VITE_AES_SECRET);
            var decryptPassword = decryptPasswordBytes.toString(CryptoTS.enc.Utf8);

            if (!decryptEmail || !decryptPassword)
                return res.status(400).send({ message: "Invalid data" });

            let user = await User.findOne({ email: decryptEmail });

            if (!user || !await bcrypt.compare(decryptPassword, user.password)) {
                return res.status(400).send({ message: "Invalid Email or password" });
            }

            const tk = jwt.sign(
                { id: user._id },
                process.env.SECRET,
                { expiresIn: '2d' }
            );
            return res.status(200).send({ token: tk });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: "Error processing request" });
        }


    }
}

module.exports = AuthController;