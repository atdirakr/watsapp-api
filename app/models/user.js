var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	firstname: String,
	lastname: String,
	mobileno: { type: Number, required: true, unique: true },
	gender: String,
	otp: { type: Number, required: true},
	active : Boolean,
	created_at: Date,
  	updated_at: Date
});

module.exports = mongoose.model('User', UserSchema);