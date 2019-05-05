var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');
var flash = require('connect-flash');
var methodOverride = require('method-override');
var session = require('express-session');

const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(flash());
app.use(session({
  secret: 'ssshhhhh',
  saveUninitialized: true,
  resave: true,
  cookie: { maxAge: 60000 }
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

const insuranceRoutes = require('./routes/insurance'),
  patientRoutes = require('./routes/patient'),
  governmentRoutes = require('./routes/government'),
  doctorRoutes = require('./routes/doctor'),
  hospitalRoutes = require('./routes/hospital'),
  indexRoutes = require('./routes/index');

app.use('/patient', patientRoutes);
app.use('/insurance', insuranceRoutes);
app.use('/government', governmentRoutes);
app.use('/doctor', doctorRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/', indexRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/./404.html'));
});

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});