const { User } = require("../../../models");
const Boom = require("boom");
const _ = require("lodash");

module.exports = async (req, res, next) => {
  try {
    let updatedFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      primaryContact: req.body.primaryContact,
      secondaryContact: req.body.secondaryContact,
      emergencyContact: req.body.emergencyContact
    };
    updatedFields = _.omitBy(updatedFields, _.isUndefined);
    let updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      updatedFields,
      { new: true }
    ).populate([
      {
        path: "registrations",
        populate: ["camper", "camp"]
      },
      "campers",
      "payments"
    ]);
    return res.send(updatedUser);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
