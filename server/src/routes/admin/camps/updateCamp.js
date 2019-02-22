const { Camp } = require("../../../models");
const Boom = require("boom");
const _ = require("lodash");

module.exports = async (req, res, next) => {
  try {
    let updatedFields = {
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      fee: req.body.fee,
      capacity: req.body.capacity,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      openDate: req.body.openDate,
      closeDate: req.body.closeDate
    };
    updatedFields = _.omitBy(updatedFields, _.isUndefined);
    let updatedCamp = await Camp.findOneAndUpdate(
      { _id: req.params.campId },
      updatedFields,
      { new: true }
    );
    return res.send(updatedCamp);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
