const { Payment } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let payment = await Payment.findOne({
      paypalId: req.params.paymentId,
      user: req.session.userId,
      archived: false
    });

    if (!payment) {
      return next(Boom.badRequest("This payment does not exist."));
    }

    return res.send(payment);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
