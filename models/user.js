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