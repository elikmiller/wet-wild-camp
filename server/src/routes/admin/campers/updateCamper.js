const { Camper } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let updatedCamper = await Camper.findOneAndUpdate(
      { _id: req.params.camperId },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfBirth: req.body.dateOfBirth,
        swimmingStrength: req.body.swimmingStrength,
        gender: req.body.gender,
        notes: req.body.notes,
        user: req.body.camper
      },
      { new: true }
    );
    return res.send(updatedCamper);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
