const { GlobalSettings } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    // Should only be one settings object at any time
    let settings = await GlobalSettings.findOne({});

    // If no settings object exists, creates new one
    if (!settings) {
        settings = new GlobalSettings({
            campArchiveDate: new Date(0),
            registrationArchiveDate: new Date(0),
            paymentArchiveDate: new Date(0),
            earlyBirdCutoff: new Date(0)
        });
        await settings.save();
    };
    return res.send(settings);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};