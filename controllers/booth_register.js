var userModel = require('../models/users');
var boothModel = require('../models/booth');
var router = require('express').Router();
var fs = require('fs');

router.route('/')
    .post(function (req, res) {
        var reqs = req.body;
        userModel.findOne({ username: reqs.adminID, password: reqs.password, role: "Admin" }, function (err, result) {
            if (!err) {
                if (result) {
                    boothModel.create({
                        boothAddress: reqs.boothAddress,
                        boothNumber: reqs.boothNumber,
                        district: reqs.district,
                        constituency: reqs.constituency,
                    }).then(() => {
                        boothModel.findOne({
                            boothAddress: reqs.boothAddress,
                            boothNumber: reqs.boothNumber,
                            district: reqs.district,
                            constituency: reqs.constituency
                        }, function (err, result) {
                            res.send({ message: "registered succesfully", id: result.id });                            
            
                        });
                    }).catch((err) => {
                        res.send(err);
                    });
                } else {
                    res.send("authentication failed");
                }
            } else {
                res.end();

            }
        })
    });

module.exports = router;