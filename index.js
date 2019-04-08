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
    res.render('index');
});
app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Server Starts on ${port}`);
});