const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  charity: {
    type: mongoose.Schema.ObjectId,
    ref: 'Charity',
    required: [true, 'Donation must belong to a charity'],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Donation must belong to a user'],
  },
  donationAmount: {
    type: Number,
    required: [true, 'Donation must have a donation amount'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  paid: {
    type: Boolean,
    default: true,
  },
});

donationSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'charity',
    select: 'name',
  });
  next();
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
