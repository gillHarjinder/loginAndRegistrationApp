var express = require('express');
var router = express.Router();


var User = require('../models/user');

// this function getting the register page
router.get('/register', function(req, res){
	res.render('register');
});


// this function getting the LOGIN page
router.get('/login', function(req, res){
	res.render('login');
});



// logout
router.get('/logout', function(req, res){
	res.render('logout');
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


module.exports = router;