const express = require('express');
const donationController = require('../controllers/donationController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get('/checkout-session/:charityId', donationController.getCheckoutSession);

router.use(authController.restrictTo('admin', 'lead-organizer'));

router.route('/').get(donationController.getAllDonations).post(donationController.createDonation);

router
  .route('/:id')
  .get(donationController.getDonation)
  .patch(donationController.updateDonation)
  .delete(donationController.deleteDonation);

module.exports = router;
