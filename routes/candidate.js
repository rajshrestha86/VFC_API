var express=require('express')
var router=express.Router();
var json = require('../movies.json');
var candidate=require('../controllers/candidate')


    router.get('/id', function(req, res){
        res.json({
            message: 'Hello World'
        });
    });

    router.get('/add', candidate.add_some_booths);
    // Get list of all fptp candidates based on type. Example Url: localhost:3500/candidate/fptp/hor    (Booth Id is must in the request header.)
    router.get('/fptp/:type', candidate.fetch_fptp_candidate);
    router.get('/pr/:type', candidate.fetch_pr_candidate);
    router.get('/pr/all', candidate.get_all_pr);
    router.post('/test', candidate.test);


module.exports =router;