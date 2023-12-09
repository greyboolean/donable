const Review = require('../models/reviewModel');
const Charity = require('../models/charityModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

/* before setting add review funcaionality
exports.setCharityUserIds = (req, res, next) => {
  // Allow nested route
  if (!req.body.charity) req.body.charity = req.params.charityId;
  if (!req.body.user) req.body.user = req.user.id;

  next();
};
*/

exports.setCharityUserIds = async (req, res, next) => {
  // Allow nested route
  if (!req.body.charity) {
    if (req.params.charityId) {
      req.body.charity = req.params.charityId;
    } else if (req.params.charityName) {
      // Retrieve the charity ID based on the charity name
      const charity = await Charity.findOne({ slug: req.params.charityName });
      if (!charity) {
        return next(new AppError('Charity not found', 404));
      }
      req.body.charity = charity.id;
    }
  }
  if (!req.body.user) req.body.user = req.user.id;

  next();
};

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
