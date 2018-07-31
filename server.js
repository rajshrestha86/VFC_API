var express = require('express'),
bodyParser = require('body-parser'),
_ = require('underscore'),
mongoose = require('mongoose'),
app = express(),
fs=require('fs'),
http=require('http'),
https=require('https');
var Web3 = require('web3');
var config = require('./config');


// SSL CERTIFICATES
const options = {
    cert: fs.readFileSync('./ssl/localhost.crt'),
    key: fs.readFileSync('./ssl/localhost.key')
};

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,booth_address');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Middleware
var auth=require('./auth');
app.use('/voter', auth);
var register_booth = require('./controllers/booth_register')


// TO DO: Setup endpoints ...
var routes=require('./routes/default'),
voter_routes=require('./routes/voters'),
candidate_routes=require('./routes/candidate'),
district_routes=require('./routes/districts');

var web3 = new Web3();
var myContract;


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

app.use((req, res, next) => {
    if (web3.currentProvider == null) {
        web3.setProvider(new Web3.providers.WebsocketProvider(config.web3Connection))
        myContract = new web3.eth.Contract(config.ABI, config.CONTRACT_ADDRESS);
        web3.eth.personal.unlockAccount(config.OWNER_ADDRESS, "r@jivgeth", 0);

        fs.readFile('./logs/tokenTransfer.log', function (err, data) {
            var blockNumber = parseInt(data.toString('utf8'));
            console.log(blockNumber);
            myContract.events.Transfer({ fromBlock: blockNumber })
                .on('data', function (data) {
                    fs.writeFileSync('./logs/tokenTransfer.log', data.blockNumber + 1);
                    
                    config.db.remove({ voter_address: data.returnValues._from, candidate_address: data.returnValues._to }, { multi: false }, function (err, number) {
                        if (!err) console.log("removed data: ", number);
                    });

                })
                .on('error', function (error) {
                    console.log(error);
                });

        });
    }
    next();
});

setInterval(function () {

    if (web3.currentProvider) {
        var ethAddress;
        config.db.findOne({ txHash: null }, function (err, doc) {
            if (doc) {
                voter_address = doc.voter_address;
                candidate_address = doc.candidate_address;
                myContract.methods.transfer(candidate_address, voter_address).send({ from: config.OWNER_ADDRESS })
                    .on('transactionHash', function (hash) {
                        // console.log(hash);
                        config.db.update({ _id: doc._id }, { $set: { txHash: hash, timestamp: Date.now() } });
                    })
                    .on('confirmation', function (confNo, receipt) {
                        // console.log(confNo);
                    })
                    .on('receipt', function (receipt) {
                        // console.log("receipt received");
                    })
                    .on('error', function (error) {
                        console.log(error);
                    });
            }
        });

    }

}, 15000);

setInterval(function () {

    if (web3.currentProvider) {
        var tenMinutes = Date.now() - 60000;
        config.db.findOne({ $and: [{ txHash: { $ne: null } }, { timestamp: { $lt: tenMinutes } }] }, function (err, doc) {
            if (doc) {
                web3.eth.getTransactionReceipt(doc.txHash, function (err, result) {
                    if (!err) {
                        if (result) {
                            if (result.status == "0x0") {
                                config.db.update({ _id: doc._id }, { $set: { txHash: null } }, { multi: false });
                            }
                        } else {
                            config.db.update({ _id: doc._id }, { $set: { txHash: null } }, { multi: false });
                        }

                    }
                });
            }

        });
    }

}, 15000);




app.use('/', routes);
app.use('/voter', voter_routes);
app.use('/candidate', candidate_routes);
app.use('/register-booth', register_booth)
app.use('/districts', district_routes);



var server = app.listen(app.get('port'), function() {
console.log('Server up: http://localhost:' + app.get('port'));
});

