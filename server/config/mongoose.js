var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');

console.log('mongoose.js running')
mongoose.connect('mongodb://localhost/mongoLog_db');

var models_path = path.join(__dirname, './../models');

fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') >= 0 ) {
    require(models_path + '/' +file);
  }
});
