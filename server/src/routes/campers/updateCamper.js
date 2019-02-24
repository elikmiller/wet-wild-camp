const { Camper } = require("../../models");
const _ = require("lodash");

module.exports = async (req, res, next) => {
  try {
    let updatedFields = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
      gender: req.body.gender,
      notes: req.body.notes
    };
    updatedFields = _.omitBy(updatedFields, _.isUndefined);
    let updatedCamper = await Camper.findOneAndUpdate(
      { _id: req.params.camperId, user: req.session.userId },
      updatedFields,
      { new: true }
    );
    return res.send(updatedCamper);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
