const express        = require('express'),
      router         = express.Router({mergeParams: true}),
      app            = express(),
      bodyParser     = require('body-parser'),
      port           = 8080,
      favicon        = require('serve-favicon'),
      path           = require('path'),
      flash          = require('connect-flash'),
      methodOverride = require('method-override');

app.use(flash());
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//app.use(favicon(path.join(__dirname, 'public','images', 'favicon.ico')));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
  res.render('landing');
});
//NEED TO ADD AUTH LOGIC
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/login.html'));
});
app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname+'/views/register.html'));
});

// CHECK FOR AUTH
app.get('/patient', (req, res) => {
  res.render('dashboardPatient', {name: 'Mohammed Yaseen'});
});
// CHECK FOR AUTH
app.get('/doctor', (req, res) => {
  res.render('dashboardDoctor', {name: 'Dr. Raafat'});
});
// AUTH LOGIC
app.post('/userAuth', (req, res) => {
  console.log('hi');
  res.redirect('/patient');
});
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname+'/views/404.html'));
});

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});