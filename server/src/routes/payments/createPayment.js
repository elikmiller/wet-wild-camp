const { User, Payment, Registration } = require("../../models");
const PaypalService = require("../../PaypalService");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let registrationArray = await Registration.find({
      _id: req.body.fullPayments
    }).populate("camp");

    let total = 0;
    let earlyBirdCutoff = new Date("2019-05-01");
    total = total + req.body.deposits.length * 100;
    registrationArray.forEach(registration => {
      total = total + registration.camp.fee;
      if (registration.deposit) total = total - 100;
      if (Date.now() < earlyBirdCutoff) total = total - 30;
      req.body.deposits.forEach(deposit => {
        if (String(registration._id) === deposit) {
          total = total - 100;
        }
      });
    });

    let transaction = await PaypalService.createPayment(total);

    let payment = new Payment({
      paypalId: transaction.id,
      amount: transaction.transactions[0].amount.total,
      timeCreated: transaction.create_time,
      deposits: req.body.deposits,
      fullPayments: req.body.fullPayments,
      user: req.session.userId
    });
    await payment.save();

    return res.send(transaction);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
