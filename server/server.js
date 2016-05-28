var express      = require('express');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var mongoose     = require('mongoose');

//CONFIG//
var config = require('./config');

//CONTROLLERS//
var UserCtrl = require('./controllers/UserCtrl');
var WorkOrdCtrl = require('./controllers/WorkOrdCtrl');

//SERVICES//
var passport = require('./services/passport');

//POLICIES//
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();
  return next();
};

//EXPRESS//
var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + 'public'));
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());

//ENDPOINTS//
//=====User Endpoints==========================
app.post('/users', UserCtrl.register);
app.get('/me', isAuthed, UserCtrl.me);
app.put('/users/:_id', isAuthed, UserCtrl.update);

app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});
//=====WorkOrders Endpoints=====================
app.post('/work-orders', WorkOrdCtrl.create);
app.get('/work-orders', WorkOrdCtrl.read);
app.get('/work-orders/:_id', WorkOrdCtrl.readById);
app.put('/work-orders/:_id', WorkOrdCtrl.update);
app.delete('/work-orders/:_id', WorkOrdCtrl.delete);


//CONNECTIONS//
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.connect(mongoURI);

mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(config.PORT, function () {
    console.log('Listening on port ', config.PORT);
  })
});
