const { Camper } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let updatedCamper = await Camper.findOneAndUpdate(
      { _id: req.params.camperId, user: req.session.userId },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        notes: req.body.notes
      },
      { new: true }
    );
    return res.send(updatedCamper);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
