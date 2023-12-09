const express = require('express');
const charityController = require('../controllers/charityController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:charityId/reviews', reviewRouter);
router.use('/:name/:charityName/reviews', reviewRouter);

router
  .route('/top-5-charities')
  .get(charityController.getTopCharities, charityController.getAllCharitis);

router.route('/stats').get(charityController.getCharityStats);
// #
// router
//   .route('/montlhy-plan/:year')
//   .get(
//     authController.protect,
//     authController.restrictTo('admin', 'lead-organizer', 'organizer'),
//     charityController.getMonthlyPlan
//   );

router
  .route('/charities-within/:distance/center/:latlng/unit/:unit')
  .get(charityController.getCharitiesWithin);

router.route('/distances/:latlng/unit/:unit').get(charityController.getDistances);

router
  .route('/')
  .get(charityController.getAllCharitis)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-organizer'),
    charityController.createCharity
  );

router.get('/name/:charityName', charityController.getCharityByName);

router.get('/my-charities', authController.protect, charityController.getMyCharities);

router
  .route('/:id')
  .get(charityController.getCharity)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-organizer'),
    charityController.uploadCharityImages,
    charityController.resizeCharityImages,
    charityController.updateCharity
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-organizer'),
    charityController.deleteCharity
  );

module.exports = router;
