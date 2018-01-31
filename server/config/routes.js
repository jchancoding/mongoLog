var path = require('path');
var users = require('../controllers/users.js')

module.exports = function(app) {

  app.get("/", function(req, res, err) {
    var error = err;
    res.render("index", { errors: error} );
  }),

  app.post("/register", function(req, res) {
    users.register(req, res);
  }),

  app.post("/login", function(req, res){
    users.login(req, res);
  })

  app.get("/listusers", function(req, res){
    users.showusers(req, res);
  })
}
