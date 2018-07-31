var express = require('express');
var router = express.Router();

// get request for HomePage
router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
}

module.exports = router;