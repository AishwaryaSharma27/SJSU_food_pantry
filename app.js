
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./controllers/index');
var app = express();
const connectDB = require("./config/db");
var additems = require("./models/addItems")

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(session( {secret: "String for encrypting cookies." } ));

app.use('/', index);
connectDB();

module.exports = app;
app.listen(3000,function(){
    console.log("Node Server running on port 3000");
});