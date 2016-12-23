var express = require('express'),
	logger = require('../../config/logger'),
	router = express.Router()
	mongoose = require('mongoose'),
	Chirp = mongoose.model('Chirp');
//Authentication
passportService = require('../../config/passport')
passport = require('passport')
var requireAuth = passport.authenticate('jwt', { session: false });
//End Authentication

module.exports = function (app) {
	app.use('/api', router);

	router.route('/chirps')

		//More Web Services
		.post(requireAuth, function (req, res, next) {
			logger.log('Create Chirp', 'verbose');
			var chirp = new Chirp(req.body);
			chirp.save()
				.then(function (result) {
					res.status(201).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})

		.get(requireAuth, function (req, res) {
			logger.log("Get all chirps", "verbose");
			res.status(200).json({ msg: "Get all chirps" });
		})

		.put(requireAuth, function (req, res) {
			logger.log("Update a chirps", "verbose");
			res.status(201).json({ msg: "Update a chirps" });
		});

	router.route('/chirps/:id')

		.get(requireAuth, function (req, res) {
			logger.log("Get a chirps", "verbose");
			res.status(200).json({ msg: "Get a chirps" });
		})

		.delete(requireAuth, function (req, res) {
			logger.log("Delete a chirps", "verbose");
			res.status(200).json({ msg: "Delete a chirps" });
		});

	router.route('/chirps/userChirps/:id')

		//More Web Services
		.get(requireAuth, function (req, res, next) {
			logger.log('Get User Chirps ' + req.params.id, 'verbose');
			Chirp.find({ chirpAuthor: req.params.id })
				.populate('chirpAuthor')
				.sort("-dateCreated")
				.exec()
				.then(function (chirps) {
					res.status(200).json(chirps);
				})
				.catch(function (err) {
					return next(err);
				})
		});


	// 	.get(function (req, res) {
	// 	logger.log("Get a user’s chirps", "verbose");
	// 	res.status(200).json({ msg: "Get a user’s chirps" });
	// });

	router.route('/chirps/like/:id')

		//More Web Services
		.put(requireAuth, function (req, res, next) {
			logger.log('Update Chirp ' + req.params.id, 'debug');
			Chirp.findOne({ _id: req.params.id }).exec()
				.then(function (chirp) {
					chirp.likes++;
					return chirp.save();
				})
				.then(function (chirp) {
					res.status(200).json(chirp);
				})
				.catch(function (err) {
					return next(err);
				});
		});


	router.route('/chirps/followedChirps/:id')

		//More Web Services

		.get(function (req, res, next) {
			logger.log('Get Users followed chirps ' + req.params.id, 'debug');
			User.findOne({ _id: req.params.id }, function (err, user) {
				if (!err) {
					Chirp.find({
						$or: [
							{ chirpAuthor: user._id }, { chirpAuthor: { $in: user.follow } }
						]
					}).populate('chirpAuthor').sort({ dateSubmitted: -1 }).exec(function (err, chirps) {
						if (!err) {
							res.status(200).json(chirps);
						} else {
							res.status(403).json({ message: "Forbidden" });
						}
					});
				}
			});
		});

}