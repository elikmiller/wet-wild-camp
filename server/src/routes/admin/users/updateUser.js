const { User } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        primaryContact: req.body.primaryContact,
        secondaryContact: req.body.secondaryContact,
        emergencyContact: req.body.emergencyContact
      },
      { new: true }
    );
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
