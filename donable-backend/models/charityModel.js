const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const charitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A charity must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A charity name must have less or equal than 40 characters'],
      minlength: [10, 'A charity name must have more or equal than 10 characters'],
      // validate: [validator.isAlpha, 'Charity name must only contains characters'],
    },
    slug: String,
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    numPeople: {
      type: Number,
      required: [true, 'A charity must have the number of people'],
    },
    category: {
      type: String,
      required: [true, 'A charity must have a rating'],
      enum: {
        values: ['child', 'elderly', 'health', 'education', 'environment'],
        message: 'Category is either child, elderly, health, education or environment',
      },
    },
    donationAmount: {
      type: Number,
      required: [true, 'A charity must have a donation amount'],
    },
    donationAmountDiscount: {
      type: Number,
      validate: {
        // This validator function only works on documents during creation
        validator: function (val) {
          return val < this.donationAmount;
        },
        message: 'Discount donation amount ({VALUE}) should be below the regular donation amount',
      },
    },
    summary: {
      type: String,
      required: [true, 'The charity must have a summary'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A charity must have a charity image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDate: Date,
    secretcharity: {
      type: Boolean,
      default: false,
    },
    region: {
      type: String,
      required: [true, 'The charity must have a summary'],
      trim: true,
    },
    locations: [
      {
        type: { type: String, default: 'Point', enum: ['Point'] },
        coordinates: [Number],
        address: String,
        description: String,
      },
    ],
    organizers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

charitySchema.index({ donationAmount: 1, ratingsAverage: -1 });
charitySchema.index({ slug: 1 });

charitySchema.index({ 'locations.coordinates': '2dsphere' });

// #
// charitySchema.virtual('durationWeeks').get(function () {
//   return this.duration / 7;
// });

// Virtual populate
charitySchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'charity',
  localField: '_id',
});

// QUERY MIDDLEWARE
charitySchema.pre(/^find/, function (next) {
  this.find({ secretCharity: { $ne: true } });

  this.start = Date.now();
  next();
});

charitySchema.pre(/^find/, function (next) {
  this.populate({
    path: 'organizers',
    select: '-__v -passwordChangedAt',
  });

  next();
});

// charitySchema.post(/^find/, function (docs, next) {
//   // eslint-disable-next-line no-console
//   console.log(`Query took ${Date.now() - this.start} ms`);
//   next();
// });

// DOCUMENT MIDDLEWARE
// Only runs for .save() and .create()
charitySchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// AGGREGATION MIDDLEWARE
// charitySchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { secretCharity: { $ne: true } } });
//   next();
// });

const Charity = mongoose.model('Charity', charitySchema);

module.exports = Charity;
