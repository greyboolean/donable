const multer = require('multer');
const sharp = require('sharp');
const Charity = require('../models/charityModel');
const Donation = require('../models/donationModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const factory = require('./handlerFactory');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCharityImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.resizeCharityImages = catchAsync(async (req, res, next) => {
  if (!req.files.imageCover && !req.files.imageCover) return next();

  if (req.files.imageCover) {
    req.body.imageCover = `charity-${req.params.id}-${Date.now()}-cover.jpeg`;
    await sharp(req.files.imageCover[0].buffer)
      .resize(2000, 1333)
      .toFormat('jpeg')
      .jpeg({ quality: 90 })
      .toFile(`public/img/charities/${req.body.imageCover}`);
  }

  if (req.files.images) {
    req.body.images = [];

    await Promise.all(
      req.files.images.map(async (file, i) => {
        const fileName = `charity-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

        await sharp(file.buffer)
          .resize(2000, 1333)
          .toFormat('jpeg')
          .jpeg({ quality: 90 })
          .toFile(`public/img/charities/${fileName}`);

        req.body.images.push(fileName);
      })
    );
  }

  next();
});

exports.getTopCharities = async (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,donationAmount';
  req.query.fields = 'name,donationAmount,ratingsAverage,summary,category';

  next();
};

exports.getAllCharitis = factory.getAll(Charity);
exports.getCharity = factory.getOne(Charity, { path: 'reviews' });
exports.createCharity = factory.createOne(Charity);
exports.updateCharity = factory.updateOne(Charity);
exports.deleteCharity = factory.deleteOne(Charity);

exports.getMyCharities = catchAsync(async (req, res, next) => {
  const donations = await Donation.find({ user: req.user.id });

  const charityIds = donations.map(el => el.charity);

  const charities = await Charity.find({ _id: { $in: charityIds } });

  res.status(200).json({
    status: 'success',
    data: charities,
  });
});

exports.getCharityByName = catchAsync(async (req, res, next) => {
  const charity = await Charity.findOne({ slug: req.params.charityName }).populate({
    path: 'reviews',
    fields: 'review rating user',
  });

  res.status(200).json({
    status: 'success',
    data: {
      data: charity,
    },
  });
});

exports.getCharityStats = catchAsync(async (req, res, next) => {
  const stats = await Charity.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: '$category',
        numCharities: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgDonationAmount: { $avg: '$donationAmount' },
        minDonationAmount: { $min: '$donationAmount' },
        maxDonationAmount: { $max: '$donationAmount' },
      },
    },
    {
      $sort: { avgDonationAmount: 1 },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});

// #
// exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
//   const year = req.params.year * 1;

//   const plan = await Charity.aggregate([
//     {
//       $unwind: '$startDates',
//     },
//     {
//       $match: {
//         startDates: {
//           $gte: new Date(`${year}-01-01`),
//           $lte: new Date(`${year}-12-31`),
//         },
//       },
//     },
//     {
//       $group: {
//         _id: { $month: '$startDates' },
//         numCharityStarts: { $sum: 1 },
//         charities: { $push: '$name' },
//       },
//     },
//     {
//       $addFields: { month: '$_id' },
//     },
//     {
//       $project: { _id: 0 },
//     },
//     {
//       $sort: { numCharityStarts: -1 },
//     },
//     { $limit: 12 },
//   ]);

//   res.status(200).json({
//     status: 'success',
//     results: plan.length,
//     data: plan,
//   });
// });

// /charities-within/:distance/center/:latlng/unit/:unit
exports.getCharitiesWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  if (!lat || !lng) {
    next(new AppError('Please provide latitude and longitude in the format lat,lng', 400));
  }

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  // #for region
  // const charities = await Charity.find({
  //   startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  // });
  const charities = await Charity.find({
    'locations.coordinates': {
      $geoWithin: { $centerSphere: [[lng, lat], radius] },
    },
  });

  res.status(200).json({
    status: 'success',
    results: charities.length,
    data: {
      data: charities,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    next(new AppError('Please provide latitude and longitude in the format lat,lng', 400));
  }

  const distances = await Charity.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
