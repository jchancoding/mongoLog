var mongoose = require('mongoose');
var User = mongoose.model('User');
var moment = require('moment');
var session = requre('express-session');

app.use(session(session({secret: 'mongologin'})));

module.exports = {

  register: function(req,res) {
    if (req.body.password != req.body.password_conf) {
      res.redirect("/", {errors: "Passwords do not match"})
    }
    var newuser = new User( {
      name: {
        first: req.body.first_name,
        last: req.body.last_name,
      },
      password: req.body.password,
      email: req.body.email,
      birthday: req.body.birthday
    })
    console.log(moment(req.body.birthday).format("MMM Do YY"));
    newuser.save(function(err){
      if(err){
        console.log("Couldn't save user");
        console.log(err);
        let sess = req.session;
        sess.errors = err;
        res.redirect("/");
      } else {
        console.log("New user saved");
        res.redirect("/listusers");
      }
    })
  },

  login: function(req,res) {
    User.find({email: req.body.email}, function(err, data) {
      if(err) {
        console.log("Couldn't find user")
        console.log(err);
      } else if (req.body.password != data[0]['password']) {
        console.log(data);
        console.log(data[0]['password']);
        console.log(req.body.password);
        var message = "Password is incorrect";

        res.redirect("/");
      } else {
        console.log(data);
        console.log(data[0]['password']);
        console.log(req.body.password);
        res.redirect("/listusers");
      }
    });

  },

  showusers: function(req,res) {
    User.find({}, function(err, data){
      if(err) {
        console.log("Couldn't load user list")
        console.log(err);
        res.redirect("/", { errors: err })
      } else {
        res.render("list", { users: data, moment: moment });
      }
    })
  }

}
