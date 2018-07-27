var model_district=require('../models/districts');


module.exports={
    getDistrict: function(req, res){
   
    model_district.find({}, function(err, dists)
{
    if(err)
        throw err;

    res.json(dists);
});
    
    
}
}
