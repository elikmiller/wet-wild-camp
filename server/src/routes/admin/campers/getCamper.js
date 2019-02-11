const { Camper } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let camper = await Camper.findOne({
      _id: req.params.camperId
    });

    if (!camper) {
      return next(Boom.badRequest("This camper does not exist."));
    }

    return res.send(camper);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
