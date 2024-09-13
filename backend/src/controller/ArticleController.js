const path = require('path');
const fs = require('fs');
const Article = require('../model/article').Article;
const AuthorController = require('../controller/AuthorController');

class ArticleController {
    static async create(req, res) {
        const { title, text, authorid } = req.body;

        if (!title || !text || !authorid)
            return res.status(400).send({ message: "os campos não podem estar vazios " });

        if (title.length < 3)
            return res.status(400).send({ message: "o titulo não pode ser menor que 3 caracteres" });
        if (text.length < 15)
            return res.status(400).send({ message: "o artigo não pode ser menor que 15 caracteres" });

        try {
            const author = await AuthorController.getAuthor(authorid);
            const article = {
                title,
                text,
                likes: 0,
                author,
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            }

            await Article.create(article)
            return res.status(201).send({ message: "Artigo criado com sucesso" })
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({ error: "Falha ao salvar o artigo", data: error.message });
        }
    };

    static async createLog(error) {
        const timestamp = Date.now();
        const archivePath = path.resolve(__dirname, '..', `logs-${timestamp}.txt`);
        const errorString = JSON.stringify(error.message)

        fs.writeFile(archivePath, errorString, function (err, result) {
            if (err) console.log(err)
        })
    }

    static async likeArticle(req, res) {
        const {id} = req.params;
        const {userId} = req.body;

        if(!id)
            return res.status(400).send({message: "No id provided"});

        try {
            
            const article = await Article.findById(id);

            if (!article) 
                return res.status(404).send({message: "Article not found"});

            const liked = article.likes.includes(userId);

            if (liked) 
                article.likes = article.likes.filter(like => like !== userId);
            else 
                article.likes.push(userId);

            await article.save();

            return res.status(200).send({message: `O post contém ${article.likes.length} curtidas`});
        } catch (error) {
            ArticleController.createLog(error);
            return res.status(500).send({error: "Falha ao curtir", data: error.message});
        }
    }

    static async getAll(req, res) {
        try {
            const articles = await Article.find();

            return res.status(200).send({article: articles});
        } catch(error) {
            return res.status(500).send({error: error});
        }
    }
}

module.exports = ArticleController;