const { Payment } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let payments = await Payment.find({ 
      user: req.session.userId,
      archived: false
    });
    return res.send(payments);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
