const { Author } = require('../model/author');
const User = require('../model/user');

class AuthorController {
    static async create(req, res) {
        const { name, birth } = req.body;

        if (!name || !birth)
            return res.status(400).send({ message: "Os campos não podem estarem vazios " });

        if (name.length < 3)
            return res.status(400).send({ message: "o nome não pode ser menor que 3 caracteres" });

        if (email.length < 3)
            return res.status(400).send({ message: "Insira um e-mail válido" });

        const author = {
            name,
            birth,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            removedAt: null,
        }

        try {
            await Author.create(author)
            return res.status(201).send({ message: "Autor cadastrado com sucesso" })
        } catch (error) {
            return res.status(500).send({ error: "Failed to get data" });
        }
    }

    static async getAuthor(_id) {
        try {
            const author = await Author.findById(_id)
            return author
        } catch (error) {
            throw error;
        }
    }
}

module.exports = AuthorController;