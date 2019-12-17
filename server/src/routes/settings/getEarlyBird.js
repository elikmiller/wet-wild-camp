const { GlobalSettings } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let settings = await GlobalSettings.findOne({});
    return res.send(settings.earlyBirdCutoff);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};