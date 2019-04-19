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

app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));
var urlencodedParser = bodyParser.urlencoded({
  extended: false
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));

app.get('/patient', (req, res) => {
  res.render('patient/profile',{
    patient : {
      firstName : 'John',
      lastName : 'Doe',
      country : 'Madagascar',
      isVerified : true,
      id : 123
    },
    countryList : countryList
  });
});
app.get('/patientOperation', (req, res) => {
  res.render('patient/operation',{
    patient : {
      firstName : 'John',
      lastName : 'Doe',
      country : 'Madagascar',
      isVerified : true,
      id : 123
    },
    operations : [
      {
        date: moment().format('MMM Do YY'),
        name: 'Tonsil Surgery',
        doctor: 'Steven',
        dischargeDate : moment().subtract(10, 'days').format('MMM Do YY'),
        daysInHospital : '23',
        comment:'Successful operation'
      }
    ]
  });
});
app.get('/patientAllergy', (req, res) => {
  res.render('patient/allergy',{
    patient : {
      firstName : 'John',
      lastName : 'Doe',
      country : 'Madagascar',
      isVerified : true,
      id : 123
    },
    allergies : [
      {
        name : 'Peanut Butter',
        doctor : 'Hello',
        date : moment().format('MMM Do YY'),
        severity : 'low',
        medication : 'N/A'
      },
      {
        name : 'Peanut Butter',
        doctor : 'Hello',
        date : moment().format('MMM Do YY'),
        severity : 'med',
        medication : 'N/A'
      },
      {
        name : 'Peanut Butter',
        doctor : 'Hello',
        date : moment().format('MMM Do YY'),
        severity : 'high',
        medication : 'Water'
      }
    ]
  });
});
app.get('patient/:id/profile',(req,res) => {
    res.render('patient/profile',{
        patient : {
          firstName : 'John',
          lastName : 'Doe',
          country : 'Madagascar',
          isVerified : true,
          id : req.params.id
        },
        countryList : countryList
      });
});
app.put('patient/:id/profile', (req,res)=> {
    res.redirect('/patient/'+req.params.id);
});


app.use('/',indexRoutes);
//app.use('/patient',patientRoutes);
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

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});