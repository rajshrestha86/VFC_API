var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var booth=new Schema({
    boothAddress:String,
    number: Strib
    district:String,
    constituency:Number,
});

var model=mongoose.model('booth_model', booth);
module.exports=model;