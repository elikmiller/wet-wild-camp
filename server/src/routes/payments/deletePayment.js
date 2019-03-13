const { Payment } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let payment = await Payment.findOne({
      _id: req.params.paymentId,
      user: req.session.userId
    });

    if (!payment) {
      return next(Boom.badRequest("This payment does not exist."));
    }

    if (payment.executed) {
      return next(
        Boom.badRequest(
          "This payment has already been executed and can not be deleted."
        )
      );
    }

    await Payment.findByIdAndDelete(payment._id);
    return res.send();
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
