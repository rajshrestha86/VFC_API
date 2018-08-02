var express=require('express')
var router=express.Router();
var json = require('../movies.json');
var districts=require('../controllers/districts')


    router.get('/id', function(req, res){
        res.json({
            message: 'Hello World'
        });
    });

    router.get('/', districts.getDistrict);
    router.get('/add', districts.addDistricts);

    // Get list of all fptp candidates based on type. Example Url: localhost:3500/candidate/fptp/hor    (Booth Id is must in the request header.)
    


module.exports =router;