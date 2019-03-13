const { Payment } = require("../../../models");
const PaypalService = require("../../../PaypalService");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let payment = await Payment.findOne({
      _id: req.params.paymentId
    });

    let paypal = await PaypalService.getPayment(payment.paypalId).catch(
      err => err
    );

    if (!payment) {
      return next(Boom.badRequest("This payment does not exist."));
    }

    return res.send({ ...payment.toObject(), paypal });
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
