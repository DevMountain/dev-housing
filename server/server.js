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
var checkinCtrl = require('./controllers/checkinCtrl.js');
var checkoutCtrl = require('./controllers/checkoutCtrl.js');
var cohortCtrl = require('./controllers/cohortCtrl.js');

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
mongoose.set('debug', true);


//ENDPOINTS//
//=====User Endpoints==========================
app.post('/user', userCtrl.register);
app.get('/me', isAuthed, userCtrl.me); //test
app.put('/user/:_id', isAuthed, userCtrl.update); //test
app.get('/users', userCtrl.read);
app.get('/users/pending', userCtrl.pending);
app.delete('/user/:id', userCtrl.delete);

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
app.put('/unit/add/current/:id', isAuthed, unitCtrl.addUserToUnitCurrent);
app.put('/unit/remove/current/:id', isAuthed, unitCtrl.removeUserFromUnitCurrent);
app.put('/unit/add/future/:id', isAuthed, unitCtrl.addUserToUnitFuture);
app.put('/unit/remove/future/:id', isAuthed, unitCtrl.removeUserFromUnitFuture);

//======FAQ Endpoints================================
app.post('/faq', faqCtrl.create);
app.get('/faqs', faqCtrl.read);
app.get('/faq/:id', faqCtrl.readById);
app.put('/faq/:id', faqCtrl.update);
app.delete('/faq/:id', faqCtrl.delete);

//=====Checkin Endpoints========================== //UPDATE ALL ENDPOINTS MATT
app.post('/checkin', checkinCtrl.create);
app.get('/checkins', checkinCtrl.read);
app.get('/checkin/:id', checkinCtrl.readById);
app.put('/checkin/:id', checkinCtrl.update);
app.delete('/checkin/:id', checkinCtrl.delete);

//=====Checkout Endpoints========================== //UPDATE ALL ENDPOINTS MATT
app.post('/checkout', checkoutCtrl.create);
app.get('/checkouts', checkoutCtrl.read);
app.get('/checkout/:id', checkoutCtrl.readById);
app.put('/checkout/:id', checkoutCtrl.update);
app.delete('/checkout/:id', checkoutCtrl.delete);

//=====Cohort Endpoints==============================  //add more endpoints?
app.post('/cohort', cohortCtrl.create);
app.get('/cohorts', cohortCtrl.read);
app.put('/cohorts/:id', cohortCtrl.update);



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
