const mongoose = require('mongoose');
const { authorSchema } = require('./author');
const { commentSchema } = require('./comment');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    text: {
        type: String,
        required: true,
        minlength: 15
    },
    author: {
        type: String,
        required: true
    },
    likes: {
        type: [String],
        required: false
    },
    comments: [commentSchema],
    createdAt: {
        type: Date,
        required: false
    },
    updatedAt: {
        type: Date,
        required: false
    },
    removedAt: {
        type: Date,
        required: false
    }
});

const Article = mongoose.model('Article', articleSchema);

exports.Article = Article;
exports.articleSchema = articleSchema;