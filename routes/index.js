var express = require('express');
var router = express.Router();

// get request for HomePage
router.get('/', function(req, res){
	res.render('index');
});


module.exports = router;