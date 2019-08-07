var express = require('express');
var router = express.Router();

const { Person } = require('../models');

router.get('/person', function(req, res, next) {
    var options = {
        offset: 0, limit: 100
    };

    Person.findAll(options)
    .then( (result)=> res.json(result) )
    .catch( (err)=> res.send('error-- person'));

    // res.render('index', { title: 'Express' });
});

router.post('/person', (req,res,next) => {
    Person.create({
        "name": req.body.name,
        "age": req.body.age
    }).then ( (result) => { res.json(result); })
    .catch( (err) => { res.send('error');} );
    res.send('success create');
})

router.get('/person/:id', (req,res,next) => {
    Person.findOne({
        where: {id: req.params.id}
    }).then( (result)=> res.json(result) )
    .catch( (err)=> res.send('err-- findOne'));
})
module.exports = router;
