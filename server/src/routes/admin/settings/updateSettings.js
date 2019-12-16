const { GlobalSettings } = require("../../../models");
const Boom = require("boom");
const _ = require("lodash");

module.exports = async (req, res, next) => {
    try {
        // There should only ever be one settings object
        let settings = await GlobalSettings.findOne({});
        const { campArchiveDate, registrationArchiveDate, paymentArchiveDate, earlyBirdCutoff } = req.body;

        // If settings object does not already exist, create new settings
        if (!settings) {
            settings = new GlobalSettings({
                campArchiveDate: new Date(0),
                registrationArchiveDate: new Date(0),
                paymentArchiveDate: new Date(0),
                earlyBirdCutoff: new Date(0)
            });
        };

        // Set all fields to new values if they were passed in
        if (campArchiveDate) settings.campArchiveDate = campArchiveDate;
        if (registrationArchiveDate) settings.registrationArchiveDate = registrationArchiveDate;
        if (paymentArchiveDate) settings.paymentArchiveDate = paymentArchiveDate;
        if (earlyBirdCutoff) settings.earlyBirdCutoff = earlyBirdCutoff;

        await settings.save(); 
        res.send(settings);
    } catch (err) {
        Boom.badImplementation((`Settings failed to update: ${err}`));
    }

}