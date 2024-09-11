const express = require('express');
const CommentController = require('../controller/CommentController');

const route = express.Router();

route
    .post('/:id', CommentController.addComment)
    .post('/like/:id', CommentController.likeComment)

module.exports = route;