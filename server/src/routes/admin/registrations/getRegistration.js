const { Registration } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let registration = await Registration.findOne({
      _id: req.params.registrationId
    }).populate(["user", "camper", "camp"]);

    if (!registration) {
      return next(Boom.badRequest("This registration does not exist."));
    }

    return res.send(registration);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
