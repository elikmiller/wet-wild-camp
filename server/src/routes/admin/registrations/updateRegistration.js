const { Registration } = require("../../../models");
const Boom = require("boom");
const _ = require("lodash");

module.exports = async (req, res, next) => {
  try {
    let updatedFields = {
      user: req.body.userId,
      camper: req.body.camperId,
      camp: req.body.campId,
      morningDropoff: req.body.morningDropoff,
      afternoonPickup: req.body.afternoonPickup,
      waitlist: req.body.waitlist,
      spaceSaved: req.body.spaceSaved,
      deposit: req.body.deposit,
      paid: req.body.paid
    };
    updatedFields = _.omitBy(updatedFields, _.isUndefined);
    let updatedRegistration = await Registration.findOneAndUpdate(
      { _id: req.params.registrationId },
      updatedFields,
      { new: true }
    );
    return res.send(updatedRegistration);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
