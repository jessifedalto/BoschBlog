const express = require('express');
const article = require('../src/routes/article');
const comment = require('../src/routes/comment');
const auth = require('../src/routes/auth');

module.exports = function (app) {
    app
        .use(express.json())
        .use('/api/person', auth)
        .use('/api/auth', auth)
        .use('/api/article', article)
        .use('/api/comment', comment)
}