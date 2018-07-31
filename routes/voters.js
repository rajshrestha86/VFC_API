var express=require('express')
var router=express.Router();
var json = require('../movies.json');
var controller=require('../controllers/voters');


    router.get('/', controller.voter_authenticate);
    router.get('/all', controller.voters_list);
    router.post('/authenticate', controller.voter_authenticate);
    router.post('/voted', controller.voter_voted_status);
    


module.exports =router;