const { Camper } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let campers = await Camper.find({}).populate("user");
    return res.send(campers);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
