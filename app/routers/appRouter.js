var passport = require('passport'),
signupController = require('../controllers/signupController.js');
// var Username = require("../model/User.js");
// var models = require('../model');
var Username = require('../model/Username');

module.exports = function(express) {
  var router = express.Router()

  var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
      return next()
    req.flash('error', 'You have to be logged in to access the page.')
    res.redirect('/')
  }
  
  router.get('/signup', signupController.show)
  router.post('/signup', signupController.signup)

  router.post('/login', passport.authenticate('local', {
    successRedirect: '/mainpage',
    failureRedirect: '/',
    failureFlash: true 
  }))

  router.get('/', function(req, res) {
    res.render('home')
  })

  router.get('/mainpage', isAuthenticated, function(req, res) {
    res.render('mainpage')
  })

  router.get('/quote', isAuthenticated, function(req, res) {
    res.render('quote.handlebars')
  })

  router.get('/calendar', isAuthenticated, function(req, res) {
    res.render('calendar')
  })

  router.get("/dailyquote", isAuthenticated, function(req, res) {
    // console.log("req.user", req.user.dataValues.username);
    Username.findOne({
      where: {username: req.user.dataValues.username}
    }).then(function(users){
      // console.log("users:", users);

      res.render("dailyquote", {username: users.dataValues.username})
    });
    //{

    //   username: req.body.username 
    // }).then(function() {
      // res.end();
    // });
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  return router
}