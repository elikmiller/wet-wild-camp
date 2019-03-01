const { Camper } = require("../../../models");
const Boom = require("boom");
const _ = require("lodash");

module.exports = async (req, res, next) => {
  try {
    let updatedCampers = [];
    for (let camper of req.body) {
      let updatedFields = {
        firstName: camper.firstName,
        lastName: camper.lastName,
        dateOfBirth: camper.dateOfBirth,
        swimmingStrength: camper.swimmingStrength,
        gender: camper.gender,
        notes: camper.notes
      };
      updatedFields = _.omitBy(updatedFields, _.isUndefined);
      let updatedCamper = await Camper.findOneAndUpdate(
        { _id: camper._id },
        updatedFields,
        { new: true }
      );
      updatedCampers.push(updatedCamper);
    }
    return res.send(updatedCampers);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
