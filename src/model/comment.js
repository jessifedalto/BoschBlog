const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minlength: 3
    },
    user: {
        type: String,
        ref: 'User',
        required: true
    },
    likes: {
        type: [String],
        ref: 'User'
    },
    articleId: {
        type: String,
        ref: 'Article',
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    }
});

const Comment = mongoose.model('Comment', commentSchema);

exports.Comment = Comment;
exports.commentSchema = commentSchema;