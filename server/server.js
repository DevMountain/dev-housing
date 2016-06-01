var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');


//CONFIG//
var config = require('./config');

//CONTROLLERS//
var userCtrl = require('./controllers/userCtrl.js');
var workorderCtrl = require('./controllers/workorderCtrl.js');
var unitCtrl = require('./controllers/unitCtrl.js');
var faqCtrl = require('./controllers/faqCtrl.js');
var checkinoutCtrl = require('./controllers/checkinoutCtrl.js');
var cohortCtrl = require('./controllers/cohortCtrl.js')

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
app.use(express.static(__dirname + './../public'));
app.use(session({
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));
app.use(passport.initialize());
app.use(passport.session());
mongoose.set('debug', true)


//ENDPOINTS//
//=====User Endpoints==========================
app.post('/user', userCtrl.register);
app.get('/me', isAuthed, userCtrl.me); //test
app.put('/user/:_id', isAuthed, userCtrl.update); //test
app.get('/users', userCtrl.read)
app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});
//=====Workorders Endpoints==========================
app.post('/workorder', workorderCtrl.create);
app.get('/workorders', workorderCtrl.read);
app.get('/workorder/:id', workorderCtrl.readById);
app.put('/workorder/:id', workorderCtrl.update);
app.delete('/workorder/:id', workorderCtrl.delete);

//=====Units Endpoints=============================== //add more endpoints?
app.post('/unit', unitCtrl.create);
app.get('/units', unitCtrl.read);
app.put('/unit/:id', unitCtrl.update);

//======FAQ Endpoints================================
app.post('/faq', faqCtrl.create);
app.get('/faqs', faqCtrl.read);
app.get('/faq/:id', faqCtrl.readById);
app.put('/faq/:id', faqCtrl.update);
app.delete('/faq/:id', faqCtrl.delete);

//=====CheckInOut Endpoints==========================
app.post('/checkinout', checkinoutCtrl.create);
app.get('/checkinouts', checkinoutCtrl.read);
app.get('/checkinout/:id', checkinoutCtrl.readById);
app.put('/checkinout/:id', checkinoutCtrl.update);
app.delete('/checkinout/:id', checkinoutCtrl.delete);

//=====Cohort Endpoints==============================  //add more endpoints?
app.post('/cohort', cohortCtrl.create);
app.get('/cohorts', cohortCtrl.read);
app.put('/cohorts/:id', cohortCtrl.update)



//CONNECTIONS//
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.connect(mongoURI);

mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(config.PORT, function () {
    console.log('Listening on port ', config.PORT);
});
});
