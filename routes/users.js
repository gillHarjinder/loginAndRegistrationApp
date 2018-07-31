var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; //using this cuz of storing in locally



var User = require('../models/user');

// this function getting the register page
router.get('/register', function(req, res){
	res.render('register');
});


// this function getting the LOGIN page
router.get('/login', function(req, res){
	res.render('login');
});


// help to create user of Register user (post request)
router.post('/register', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var password =  req.body.password;
	var password2 = req.body.password2;

	// Validation wheather above feild work
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('username', 'username is required').notEmpty();
	req.checkBody('password', 'Name is required').notEmpty();
	req.checkBody('password2', 'Password does not Match').notEmpty();

	var errors = req.validationErrors();


	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		// this will link to user.js
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});

		User.createUser(newUser, function(err, user){
			if(err) throw err;
			console.log(user);
		})	

		req.flash('success_msg', 'You are registered, Please login now!')
		
		res.redirect('/users/login');
	}
	
});

// this peice of code gets from:
//		http://www.passportjs.org/docs/username-password/


passport.use(new LocalStrategy(
  	function(username, password, done) {
    	User.getUserByUsername(username, function(err, user){
    		if(err) throw err;
    		if(!user){
    			return done(null, false, {message: 'Unknown User'});
    		}
    		User.comparePassword(password, user.password, function(err, isMatch){
    			if(err) throw err;
    			if(isMatch){
    				return done(null, user);
    			} else {
    				return done(null, false, {message: 'Invalid password'})
    			}
    		})
    	});
  	}));

// get this peice of code from:
//	http://www.passportjs.org/docs/configure/
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});


// this peice of code get from :
//		http://www.passportjs.org/docs/authenticate/

// this code help to login to the registered users

router.post('/login',
	passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash:true}),
  		function(req, res) {
  			res.redirect('/');

  		});

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'you are logged out');

	res.redirect('/users/login');
})

module.exports = router;