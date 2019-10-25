var express = require('express');
var router = express.Router();

const { Post, Reply } = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {

    Post.findAll({
        include: {
            model: Reply
        }
    }).then( result => {
        res.json(result)
    })
    /*
    Post.create({
        title: 'home ground',
        writer: 'writer'
    });
    */
});

module.exports = router;
