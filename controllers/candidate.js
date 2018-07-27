var fptp_candidate_model=require('../models/fptp_candidate');
var pr_candidate_model=require('../models/pr_candidate');
var booth_model=require('../models/booth');

module.exports={
    fetch_fptp_candidate: function(req, res){
        const booth_address=req.headers['booth_address']
        const type=req.params.type;         // Type must be either hor or pa
        let constituency=0;
        
        console.log(type.toUpperCase());
        if((type=='hor') || type=='pa'){

                // Gets candidate from the booth address and constituency.
                booth_model.findById(booth_address, function(err, result){
                    if(!err){
                        if(result!=null){
                            if(type=='hor')
                            {
                                if(result.constituency%2==0)
                                    constituency=result.constituency/2;
                                else
                                    constituency=(result.constituency+1)/2;
                            }
                            else
                                constituency=result.constituency;
                                
                            fptp_candidate_model.find({district: result.district, constituency: constituency, electedfor: type.toUpperCase() }, function(err, results){
                                if(!err)
                                    res.status(200).send(results);
                            })
                        }
                    }
                    else{
                        res.send(401).send(err)
                    }
                })
        }
            // If booth is not in the database returns errors.
        else {
            res.status(401).send('Invalid Url');
            return;
        }
    },

    fetch_pr_candidate: function(req, res){
        const booth_address=req.headers['booth_address']
        booth_model.findById(booth_address, function(err, result){
            if(!err){
                if(result!=null){
                    pr_candidate_model.find({district: result.district, constituency: result.constituency}, function(err, results){
                        if(!err)
                            res.status(200).send(results);
                    })
                }
            }
            else{
                res.send(401).send(err)
            }
        })
    
    },

    add_some_booths: function(req, res){
        booth_model.create({boothAddress: 1234567890, district: 'Jhapa', constituency: 1}, function(err, result){
            if(err){
                res.status(500).send(err);
            }
            else
                res.status(200).send(result);
        });
    },

    get_all_pr: function(req, res){
        var parties=[];
        pr_candidate_model.find(function(err, results){
            
            for(var i=0; i<results.length; i++){
                parties.push(results[i].parties);
            }
            
            res.status(200).send(parties);

        })
    }

}
