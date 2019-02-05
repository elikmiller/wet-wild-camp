const { Camper } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let campers = await Camper.findOne({
      _id: req.params.camperId,
      user: req.session.userId
    });
    return res.send(campers);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
