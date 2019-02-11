const { Camper } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    const camper = new Camper({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      gender: req.body.gender,
      dateOfBirth: req.body.dateOfBirth,
      swimmingStrength: req.body.swimmingStrength,
      notes: req.body.notes,
      user: req.body.user
    });
    let newCamper = await camper.save();
    return res.send(newCamper);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
