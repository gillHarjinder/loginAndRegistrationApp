var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');



// user Schema

var UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	}
});

// creating variable which is accesseble from ouside from this file

var User = module.exports = mongoose.model('User', UserSchema);


// to create the user
// to hash the password, i get the code from:
//		https://www.npmjs.com/package/bcryptjs
module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}


// code inside gets from:
//		https://www.npmjs.com/package/bcryptjs 
//		[Tp check a password] section
// 	This function campare the password from DB
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
});
}