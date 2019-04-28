const { Payment } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let notes = {
      notes: req.body.notes
    };
    console.log(notes);
    let updatedPayment = await Payment.findOneAndUpdate(
      { _id: req.params.paymentId },
      notes,
      { upsert: true }
    );
    return res.send(updatedPayment);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
