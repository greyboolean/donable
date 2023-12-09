const mongoose = require('mongoose');
const Charity = require('./charityModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    craetedAt: {
      type: Date,
      default: Date.now(),
    },
    charity: {
      type: mongoose.Schema.ObjectId,
      ref: 'Charity',
      required: [true, 'Review must belong to a charity'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

reviewSchema.statics.calcAverageRatings = async function (charityId) {
  const stats = await this.aggregate([
    {
      $match: { charity: charityId },
    },
    {
      $group: {
        _id: '$charity',
        numRatings: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  const ratingsQuantity = stats[0]?.numRatings ?? 0;
  const ratingsAverage = stats[0]?.avgRating ?? 4;

  await Charity.findByIdAndUpdate(charityId, {
    ratingsQuantity,
    ratingsAverage,
  });
};

// #reviewSchema.index({ review: 1, charity: 1 }, { unique: true });
reviewSchema.index({ charity: 1, user: 1 }, { unique: true });

reviewSchema.pre(/^find/, function (next) {
  // this.populate({ path: 'charity', select: 'name' });

  this.populate({ path: 'user', select: 'name photo' });
  next();
});

// reviewSchema.pre(/^findOneAnd/, async function (next) {
//   this.r = await this.findOne();

//   console.log(this.r);
//   next();
// });

reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.charity);
});

reviewSchema.post(/^findOneAnd/, async docs => {
  if (docs) await docs.constructor.calcAverageRatings(docs.charity);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
