var express = require('express');
router = express.Router({
  mergeParams: true
});
var app = express();
var bodyParser = require('body-parser');
var assert = require('assert');
var mongo = require('mongodb').MongoClient; // Using Mongo Database
var objectID = require('mongodb').objectID;
var url = 'mongodb://localhost:27017';
var favicon = require('serve-favicon');
var path = require('path');
var flash = require('connect-flash');
var methodOverride = require('method-override');

port = 8080;

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.use(bodyParser.json());
//app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('landing');
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/register.html'));
});
app.post('/authenticate', urlencodedParser, function (req, res, next) {
  var response = {
    full_name: req.body.full_name,
    email_address: req.body.email_address,
    password: req.body.password
    //comfirm_pass: req.query.confirm_pass
  }
  mongo.connect(url, {useNewUrlParser:true}, function (err, client) {
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
app.get('/showItems', (req, res) => {
  var resArr = [];
  mongo.connect(url, {useNewUrlParser:true},function (err, client) {
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

app.get('/patient', urlencodedParser, function (req, res, next) {
  var passedVar = req.query.valid; // Passed full_name variable
  res.render('dashboardPatient', {
    name: passedVar
  })
});
// CHECK FOR AUTH
app.post('/authUser', urlencodedParser, function (req, res, next) {
  var response = {
    email_address: req.body.email_address,
    password: req.body.password
  }
  var resArr = [];
  mongo.connect(url,{useNewUrlParser:true}, function (err, client) {
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
            res.redirect('/patient?valid=' + resArr[i].full_name);
            return 0;
          }
        }
      }
      // User not found
      res.redirect('/login')
    });
  });
});
app.get('/doctor', (req, res) => {
  res.render('dashboardDoctor', {
    name: 'Dr. Raafat'
  });
});
// AUTH LOGIC
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/views/404.html'));
});

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});