// var express = require('express');
// var app = express();

// var bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));

// app.get('/', function (req, res) {
//     res.sendFile('/Users/abhatt/Documents/GitHub/SJSU_food_pantry/index.html');
// });

// app.post('/submit-user-data', function (req, res) {

//     if(req.body.firstName === 'user' && req.body.lastName === 'password'){
//         var name = req.body.firstName + ' ' + req.body.lastName;
//         res.sendFile('/Users/abhatt/Documents/GitHub/SJSU_food_pantry/submit.html');
//     }
//     else{
//         res.send('Wrong username or password');
//     }
  
//     // res.send(name + ' Submitted Successfully!');
// });


// var server = app.listen(3008, function () {
//     console.log('Node server is running..');
// });

/**
 * http://usejsdoc.org/
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./index');
var app = express();

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(session( {secret: "String for encrypting cookies." } ));

app.use('/', index);

module.exports = app;
app.listen(3000);