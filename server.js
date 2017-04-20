// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var morgan     = require('morgan');

// configure app
app.use(morgan('dev')); // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port     = process.env.PORT || 8080; // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/bear'); // connect to our database
var User     = require('./app/models/user');
var Message  = require('./app/models/message');
var Status  = require('./app/models/status');

// create our router
var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next();
});

//(accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'Hey! welcome to our API!' });	
});

// ======================Watsapp ========================

router.route('/signup')
	.post(function(req, res) {
		var user = new User();
		user.firstname = req.body.firstname;
		user.lastname = req.body.lastname;
		user.mobileno = req.body.mobileno;
		user.gender = req.body.gender;
		user.otp = Math.floor(Math.random() * 9000) + 1000;
		user.active = false;
		user.created_at = new Date();
		user.save(function(err,data) {
			if (err)
				res.send(err);
			res.json({ message: data });
		});
	})

	.get(function(req, res) {
		User.find(function(err, users) {
			if (err)
				res.send(err);
			res.json(users);
		});
	});

router.route('/signup/:id')

	.get(function(req, res) {
		User.findById(req.params.id, function(err, user) {
			if (err)
				res.send(err);
			res.json(user);
		});
	})

	// update the user with this id
	.put(function(req, res) {
		User.findById(req.params.id, function(err, user) {
			if (err)
				res.send(err);
			user.firstname = req.body.firstname;
			user.lastname = req.body.lastname;
			user.mobileno = req.body.mobileno;
			user.gender = req.body.gender;
			user.updated_at = new Date();
			user.save(function(err) {
				if (err)
					res.send(err);
				res.json({ message: 'User updated!' });
			});
		});
	})

	// delete the user with this id
	.delete(function(req, res) {
		User.remove({
			_id: req.params.id
		}, function(err, user) {
			if (err)
				res.send(err);
			res.json({ message: 'Successfully deleted' });
		});
	});

router.route('/signup/otp/:id')
	// update the user otp with this id
	.put(function(req, res) {
		User.findById(req.params.id, function(err, user) {
			if (err)
				res.send(err);
			if(user.otp == req.body.otp){
				user.active = true;
				user.updated_at = new Date();
				user.save(function(err) {
					if (err)
						res.send(err);
					res.json({ message: 'User Activated Successfully!' });
				});
			}else{
				res.json({ message: 'OTP Mismatch!' });
			}
		});
	});

router.route('/message')
	.get(function(req, res) {
		Message.find(function(err, users) {
			if (err)
				res.send(err);
			res.json(users);
		});
	});

router.route('/message/:id')
	.delete(function(req, res) {
		Message.remove({
			_id: req.params.id
		}, function(err, msg) {
			if (err)
				res.send(err);
			res.json({ message: 'Message deleted' });
		});
	});

router.route('/message/:from/:to')

	.post(function(req, res) {
		var message = new Message();
		message.to = req.params.to;
		message.from = req.params.from;
		message.content = req.body.content;
		message.status = 1;
		message.send_date = new Date();
		message.created_at = new Date();
		message.save(function(err,data) {
			if (err)
				res.send(err);
			res.json({ message: data });
		});
	})

	.get(function(req, res) {
		Message.find({from:req.params.from,to:req.params.to}, function(err, msg) {
			if (err)
				res.send(err);
			res.json(msg);
		});
	})

router.route('/status')
	
	.get(function(req, res) {
		Status.find(function(err, stat) {
			if (err)
				res.send(err);
			res.json(stat);
		});
	});

router.route('/status/:id')

	.get(function(req, res) {
		Status.findById(req.params.id, function(err, stat) {
			if (err)
				res.send(err);
			res.json(stat);
		});
	})

	.delete(function(req, res) {
		Status.remove({
			_id: req.params.id
		}, function(err, msg) {
			if (err)
				res.send(err);
			res.json({ message: 'Status deleted' });
		});
	});
router.route('/status/user/:userid')

	.get(function(req, res) {
		Status.find({user_id:req.params.userid}, function(err, stat) {
			if (err)
				res.send(err);
			res.json(stat);
		});
	})

router.route('/status/:id')

	.put(function(req, res) {
		Status.findById(req.params.id, function(err, stat) {
			if (err)
				res.send(err);
			if(stat){
				stat.status = req.body.status;
				stat.user_id = req.body.userid;
				stat.updated_at = new Date();
				stat.save(function(err,data) {
					if (err)
						res.send(err);
					res.json({ data :data, message: 'Status Updated!' });
				});
			}else{
				var stat = new Status();
				stat.status = req.body.status;
				stat.user_id = req.body.userid;
				stat.created_at = new Date();
				stat.save(function(err,data) {
					if (err)
						res.send(err);
					res.json({ data :data, message: 'Status Added!' });
				});
			}
		});
	})

// REGISTER OUR ROUTES -------------------------------
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
