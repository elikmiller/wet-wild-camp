const { Registration, Payment } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  let registration;
  try {
    registration = await Registration.findOne({
      _id: req.params.registrationId,
      user: req.session.userId
    });

    // Registration must exist
    if (!registration) {
      return next(Boom.badRequest("This registration does not exist."));
    }

    // If Registration has at least one associated Payment it should be soft-deleted. Otherwise it can be hard-deleted.
    let paymentCount = await Payment.countDocuments({
      $or: [{ deposits: registration._id }, { fullPayments: registration._id }]
    });
    if (paymentCount > 0) {
      await Registration.removeOne({ _id: registration._id });
    } else {
      await registration.remove();
    }
    return res.send();
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
