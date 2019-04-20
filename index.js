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
var {countryList} = require('./public/js/constants');
var patientRoutes = require('./routes/patients');
var indexRoutes = require('./routes/index');
var moment = require('moment');
port = 8080;

// app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use('/',indexRoutes);
app.use('/patient',patientRoutes);
app.get('/2', (req, res) => {
  res.sendFile(path.join(__dirname + '/./cards.html'));
});

app.get('/doctor', (req, res) => {
  res.render('dashboardDoctor', {
    name: 'Dr. Raafat'
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/./404.html'));
});



app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});