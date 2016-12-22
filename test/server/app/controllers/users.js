var express = require('express'),
	logger = require('../../config/logger'),
	router = express.Router(),
	mongoose = require('mongoose'),
	User = mongoose.model('User');

module.exports = function (app) {
	app.use('/api', router);

	router.route('/users')

		.post(function (req, res, next) {
			logger.log('Create User', 'verbose');
			var user = new User(req.body);
			user.save()
				.then(function (result) {
					res.status(201).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})

		.put(function (req, res, next) {
			logger.log('Update User ' + req.params.id, 'verbose');
			var query = User.findOneAndUpdate(
				{ _id: req.body._id },
				req.body,
				{ new: true })
				.exec()
				.then(function (result) {
					res.status(200).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})

		.get(function (req, res, next) {
			logger.log('Get User ' + req.params.id, 'verbose');
			var query = User.findById(req.params.id)
				.exec()
				.then(function (result) {
					res.status(200).json(result);
				})
				.catch(function (err) {
					return next(err);
				});
		})

		.delete(function (req, res, next) {
			logger.log('Delete User ' + req.params.id, 'verbose');
			var query = User.remove({ _id: req.params.id })
				.exec()
				.then(function (result) {
					res.status(204).json({ message: 'Record deleted' });
				})
				.catch(function (err) {
					return next(err);
				});
		})


}