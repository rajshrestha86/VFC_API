var jwt=require('jsonwebtoken')
var config=require('./config.js')


module.exports=function(req, res, next){
    var token=req.headers['token']
    console.log(req.headers)

    if(token){
        jwt.verify(token, config.secret, function(error, decoded){
            if(error){
                console.log('Verification Error')
                return res.status(401).send(error)
            }else {
                req.decoded=decoded
                return next()
            }
        })
    }else{
        res.redirect(401,'/')
    }
}