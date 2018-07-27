var express = require('express');
var router = express.Router();

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
	
});


module.exports = router;