var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var session = ('express-sesssion');

app.use(bodyParser.urlencoded({extended: true}));
app.use(session(session({secret: 'mongologin'})));

app.use(express.static(path.join(__dirname, "../client/static")));
app.set('views', path.join(__dirname, "../client/views"));
app.set("view engine", "ejs");

require('./config/mongoose.js')

var routes_setter = require('./config/routes.js')

routes_setter(app)

app.listen(8000, function(){
  console.log("Running port 8000")
})
