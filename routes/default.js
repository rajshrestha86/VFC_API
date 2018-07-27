var express=require('express')
var router=express.Router();
var json = require('../movies.json');
var controller=require('../controllers/voters');


    router.post('/', controller.voter_authenticate);
    router.get('/test', function(req, res){
        res.json({
            message: 'Hello World'
        });
    });
    



module.exports =router;