const { Article } = require('../model/article');
const { User } = require('../model/user');


class CommentController {
    static async addComment(req, res) {
        const { id } = req.params;
        const { userId, text } = req.body;

        if (!id || !userId || !text) 
            return res.status(400).send({message: "Wrong data provided"});

        try {
            const article = await Article.findById(id);

            if (!article) 
                return res.status(404).send({message: "Article not found"});

            const user = await User.findById(userId);

            if (!user) 
                return res.status(404).send({message: "User not found"});

            article.comments.push({text, user: userId, createdAt: Date.now(), articleId: id});

            await article.save();

            return res.status(200).send({ message: "Comentário adicionado"});
        } catch (error) {
            return res.status(500).send({ error: "Falha ao adicionar comentário", data: error.message });
        }
    }

    static async likeComment(req, res) {
        const { id } = req.params;
        const { userId } = req.body;

        if(!id)
            return res.status(400).send({message: "No id provided"});

        try {
            
            const comment = await Comment.findById(id);

            if (!comment) 
                return res.status(404).send({message: "Comment not found"});

            const liked = comment.likes.includes(userId);

            if (liked) 
                comment.likes = comment.likes.filter(like => like !== userId);
            else 
                comment.likes.push(userId);

            await comment.save();

            return res.status(200).send({message: `O comentário contém ${comment.likes.length} curtidas`});
        } catch (error) {
            return res.status(500).send({error: "Falha ao curtir", data: error.message});
        }
    }
}

module.exports = CommentController;