var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var StatusSchema   = new Schema({
	status: String,
	user_id : String,
	created_at: Date,
  	updated_at: Date
});

module.exports = mongoose.model('Status', StatusSchema);