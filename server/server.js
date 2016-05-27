var express      = require('express');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var mongoose     = require('mongoose');


var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + 'public'));
//set up express-session

//Endpoints



app.listen(3000, function () {
  console.log('Listening on port 3000');
})
