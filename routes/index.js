const express = require('express'),
    router = express.Router({
        mergeParams: true
    }),
    path = require('path'),
    {
        countryList
    } = require('../public/js/constants'),
    bodyParser = require('body-parser');

var mongo = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017';
var assert = require('assert');
var urlencodedParser = bodyParser.urlencoded({
    extended: false
})
router.get('/', (req, res) => {
    res.render('landing');
});
router.post('/authenticate', urlencodedParser, function (req, res, next) {
    var response = {
        full_name: req.body.full_name,
        email_address: req.body.email_address,
        password: req.body.password
        //comfirm_pass: req.query.confirm_pass
    }
    mongo.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        assert.equal(null, err);
        var db = client.db('test01');
        db.collection('userData').insertOne(response, function (err, db) {
            assert.equal(null, err);
            console.log('User added')
            client.close();
            res.redirect('/login');
        });
    });
});
router.get('/api/showItems', (req, res) => {
    var resArr = [];
    mongo.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        assert.equal(null, err);
        var db = client.db('test01');
        var pointer = db.collection('userData').find();
        pointer.forEach(function (doc, err) {
            assert.equal(null, err);
            resArr.push(doc);
        }, function () {
            client.close();
            console.log('Viewed');
            res.send({
                users: resArr
            });
        });
    });
});

// CHECK FOR AUTH
router.post('/authUser', urlencodedParser, function (req, res, next) {
    var response = {
        email_address: req.body.email_address,
        password: req.body.password
    }
    var resArr = [];
    mongo.connect(url, {
        useNewUrlParser: true
    }, function (err, client) {
        assert.equal(null, err);
        var db = client.db('test01');
        var pointer = db.collection('userData').find();
        pointer.forEach(function (doc, err) {
            assert.equal(null, err);
            resArr.push(doc);
        }, function () {
            client.close();
            console.log(response);
            for (i = 0; i < resArr.length; i++) {
                if (resArr[i].email_address == response.email_address) {
                    if (resArr[i].password == response.password) {
                        // User found
                        var passable = encodeURIComponent(resArr[i].full_name); // Pass full_name variable
                        res.redirect('/patient/123?valid=' + resArr[i].full_name);
                        return 0;
                    }
                }
            }
            // User not found
            res.redirect('/login')
        });
    });
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/register', (req, res) => {
    res.render('register', {
        countryList: countryList
    });
});

module.exports = router;