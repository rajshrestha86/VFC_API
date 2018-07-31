var jwt=require('jsonwebtoken');
var voter_model=require('../models/voters');
var booth_model=require('../models/booth');
var config=require('../config')
var crypto=require('crypto');

module.exports={
    index: function(req, res){
        res.json({
            message: 'Hello Worldies'
        });
    },

    voters_list: function(req, res)
    {
        voter_model.find(function(err, docs){
           
        res.json(docs);
    });
    },


    //  Authneticate voter and grant api key.
    voter_authenticate: function(req, res){
        
        // Get Voters Private key and Booth address
        // var pkHash=req.body.id;
        var boothAddress=req.body.booth_address;
        var pkEncrypted=req.body.id;

        //  Check for the voter to be in the list.
        console.log(req.body);

        //  Check if the request is coming from authorized booth.
        booth_model.findById(boothAddress, function(err, result){
            console.log(result);
            if(err)
                res.status(401).send(err);

            if(result==null){
                res.status(401).send({
                    'message': 'Booth is not authorized.'
                });
                return;
            }

            console.log('District Length',(result.district).length);
            // If the booth is authorized then get voter info.

            console.log('Encrypted Value',pkEncrypted);
            console.log('Encrypted Value Length: ',pkEncrypted.length);
            var mykey=crypto.createDecipher('aes-256-cbc', result.district);
            console.log('District: ', result.district);
            // mykey.setAutoPadding(false)
            var pkDecrypted=mykey.update(pkEncrypted,'hex','utf8')
            pkDecrypted+=mykey.final('utf8')
            // pkDecrypted=pkDecrypted.substring(0, 66);
            console.log(pkDecrypted);

            const hash = crypto.createHash('sha256');
            console.log('Type of pkDecrypted: ', (pkDecrypted).length)
            // // for(var i=0; i<pkDecrypted.length; i++){
            // //     console.log(pkDecrypted[i]);
            // // }
            hash.update(pkDecrypted.toString());
            pkHash = hash.digest('hex');
            console.log('Hashed PK: ', pkHash);

            // Get voter from the same district as Voter.
            voter_model.findOne({pkHash, district: result.district}, function(err, result){
                console.log("r: ", result);
                if(err)
                {
                    res.status(401).send(err);
                }
                else{
                    if(result==null){
                        res.status(401).send({
                            'message': 'Voter Not found.'
                        })
                        return;

                }
                    if(!result.voted){
                    //  If the voter is in List authenticate a voter and send the token id and user id as a response.

                        console.log("Login Successfull.", result.fullName);
                        var token=jwt.sign({
                            user_id: result.pkHash
                        }, config.secret,{
                            expiresIn:10*60         // Expires in 10 minutes.
                        })
            
                        console.log("found");
                        // This token and user id is required to change voter status.
                        res.status(200).send({
                            'token':token,
                            'username': result.id
                        })
                    }
                    }

                    // If the user has already Voted we response a already voted message.
                    if(result.voted){
                        console.log('Already Voted. #####################################')
                        res.status(401).send({
                            'message': 'Already Voted.'
                        })
                    }

                    
                    
    
                
            })

        });
       

    },


    // Change the voter status of the voter.
    /* Required:
            token, usename in header. This is obtained after the authorization.
            */
    voter_voted_status: function(req, res){
        const username = req.body.username;
        console.log(username)
        const add1 = req.body.fptp_hor_ethAddress;
        const add2 = req.body.fptp_pa_ethAddress;
        const add3 = req.body.pr_hor_ethAddress;
        const add4 = req.body.pr_pa_ethAddress;
        const token = req.body.token;
        console.log('################################ ', token);

        if(token){
            jwt.verify(token, config.secret, function(error, decoded){
                if(error){
                    console.log('Verification Error')
                    return res.status(401).send(error)
                }else {
                    req.decoded=decoded
                    voter_model.findById(username, function(err, result){
                        if(!err)
                        {
                            console.log(result);
                            if(result!=null){
                                console.log('found voter ');
                                result.voted=true;
                                result.save();
                                config.db.insert({ voter_address: result.ethAddress, candidate_address: add1, txHash: null, timestamp: Date.now() });
                                config.db.insert({ voter_address: result.ethAddress, candidate_address: add2, txHash: null, timestamp: Date.now() });
                                config.db.insert({ voter_address: result.ethAddress, candidate_address: add3, txHash: null, timestamp: Date.now() });
                                config.db.insert({ voter_address: result.ethAddress, candidate_address: add4, txHash: null, timestamp: Date.now() });
                                res.json({
                                    status: true,
                                    message: "User voted status changed.",
                                    id: result.id
                                });
            
                            }
                            else
                            {
                                res.json({
                                    status: false,
                                    message: "User Not found in the Database"
            
                                })
                            }
                        }
            
                        else
                        {
                            res.send(err)
                        }
                    })
                    
                }
            })
        }else{
            console.log('Error');
            res.redirect(401,'/')
        }




        
        

    }
}