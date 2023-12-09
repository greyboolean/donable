const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { CLIENT_BASE_URL } = require('../config/constants');
const Donation = require('../models/donationModel');
const Charity = require('../models/charityModel');
const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

const factory = require('./handlerFactory');

exports.getCurrentUserDonations = catchAsync(async (req, res, next) => {
  const donation = await Donation.find({ user: req.user.id });

  const charityIds = donation.map(el => el.charity.id);
  const charities = await Charity.find({ _id: { $in: charityIds } });

  res.status(200).json({
    status: 'success',
    charities,
  });
});

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // get currently donated charity
  const charity = await Charity.findById(req.params.charityId);

  // cereate checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${CLIENT_BASE_URL}/my-charities?donation=success`,
    cancel_url: `${CLIENT_BASE_URL}/charity/${charity.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.charityId,
    line_items: [
      {
        price_data: {
          currency: 'lkr',
          unit_amount: charity.donationAmount * 100, // convert LKR to cents,
          product_data: {
            name: `${charity.name} Charity`,
            description: charity.summary,
            images: [`${req.protocol}://${req.get('host')}/img/charities/${charity.imageCover}`],
          },
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  // send it to the client
  res.status(200).json({
    status: 'success',
    sessionUrl: session.url,
  });
});

const createDonationCheckout = catchAsync(async session => {
  const charity = session.client_reference_id;
  const { id: user } = await User.findOne({ email: session.customer_email });
  // In session we convert the amount to cents so we convert it back to USD
  const donationAmount = session.amount_total / 100;

  await Donation.create({ charity, user, donationAmount });
});

// // webhookCheckout without dev
// exports.webhookCheckout = (req, res, next) => {
//   const signature = req.headers['stripe-signature'];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.body,
//       signature,
//       process.env.STRIPE_WEBHOOK_CHECKOUT_SECRET
//     );
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === 'checkout.session.completed') createDonationCheckout(event.data.object);

//   res.status(200).json({ received: true });
// };

exports.webhookCheckout = (req, res, next) => {
  const signature = req.headers['stripe-signature'];

  let event;
  let stripeWebhookSecret;

  if (process.env.NODE_ENV === 'development') {
    stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET_DEV;
  } else if (process.env.NODE_ENV === 'production') {
    stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET_PROD;
  }

  try {
    event = stripe.webhooks.constructEvent(req.body, signature, stripeWebhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') createDonationCheckout(event.data.object);

  res.status(200).json({ received: true });
};

exports.createDonation = factory.createOne(Donation);
exports.getDonation = factory.getOne(Donation);
exports.getAllDonations = factory.getAll(Donation);
exports.updateDonation = factory.updateOne(Donation);
exports.deleteDonation = factory.deleteOne(Donation);
