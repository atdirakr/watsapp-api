var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MessageSchema   = new Schema({
	from: { type: String, required: true },
	to: { type: String, required: true },
	content: String,
	status : Number,
	send_date: Date,
	created_at: Date,
  	updated_at: Date
});

module.exports = mongoose.model('Message', MessageSchema);