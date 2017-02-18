var passport = require('passport'),
    signupController = require('../controllers/signupController.js')
var Users = require("../model/User.js");
var Quotes = require("../model/Quotes.js");

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
   Users.findOne({
      where: {username: req.user.dataValues.username}
    }).then(function(users){
      res.render("mainpage", {username: users.dataValues.username})
    })
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  router.get('/journal', isAuthenticated, function(req, res) {
    res.render('journal.handlebars')
  })

  router.get('/calendar', isAuthenticated, function(req, res) {
    res.render('calendar.handlebars')
  })

  router.get('/settings', isAuthenticated, function(req, res) {
    res.render('settings.handlebars')
  })

  // //get username on quote page
  // router.get('/quote', isAuthenticated, function(req, res) {
  //   Users.findOne({
  //     where: {username: req.user.dataValues.username}
  //   }).then(function(users){
  //     res.render("quote", {username: users.dataValues.username})
  //   })
  // })


  function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}




  //get quote and autor on quote page
  router.get('/quote', isAuthenticated, function(req, res) {
    Quotes.findAll({
    // where: {quote: req.user.dataValues.quote}
    }).then(function(users){
    console.log("users:", users);
    console.log("author:", users)
    // console.log("users:", users);
      res.render('quote', {
        quote: users[0].dataValues.quote,
        author: users[0].dataValues.author})
    });
  })

  //get username on dailyquote page
  router.get('/dailyquote', isAuthenticated, function(req, res) {
    Users.findOne({
      where: {username: req.user.dataValues.username}
    }).then(function(users){
      res.render("dailyquote", {username: users.dataValues.username})
    })
  })

  router.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
  })

  return router
}