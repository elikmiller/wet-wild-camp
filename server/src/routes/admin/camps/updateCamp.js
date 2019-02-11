const { Camp } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let updatedCamp = await Camp.findOneAndUpdate(
      { _id: req.params.campId },
      {
        name: req.body.name,
        type: req.body.type,
        description: req.body.description,
        fee: req.body.fee,
        capacity: req.body.capacity,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        openDate: req.body.openDate,
        closeDate: req.body.closeDate
      },
      { new: true }
    );
    return res.send(updatedCamp);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
