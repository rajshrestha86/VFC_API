var express = require('express'),
bodyParser = require('body-parser'),
_ = require('underscore'),
mongoose = require('mongoose'),
app = express(),
fs=require('fs'),
http=require('http'),
https=require('https');



// SSL CERTIFICATES
const options = {
    cert: fs.readFileSync('./ssl/localhost.crt'),
    key: fs.readFileSync('./ssl/localhost.key')
};



// Middleware
var auth=require('./auth');
app.use('/voter', auth);


// TO DO: Setup endpoints ...
var routes=require('./routes/default'),
voter_routes=require('./routes/voters'),
candidate_routes=require('./routes/candidate');



app.set('port', process.env.PORT || 3500);



connectDb = function (username = 'rajiv', password = 'rajiv') {
    mongoose.connect(`mongodb://${username}:${password}@ds133630.mlab.com:33630/vfc`,{useNewUrlParser:true}, (error) => {
        if (!error) {
            console.log("connected to Database: VFC");
        } else {
            console.log("Error: ", error);
        }
    });
}

app.use((req, res, next) => {
    if (mongoose.connection.readyState == 0) {
        console.log('Connecting to database.');
        connectDb();
    }
    next();
})

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());



app.use('/', routes);
app.use('/voter', voter_routes);
app.use('/candidate', candidate_routes);



var server = app.listen(app.get('port'), function() {
console.log('Server up: http://localhost:' + app.get('port'));
});

