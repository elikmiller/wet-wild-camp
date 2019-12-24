const { GlobalSettings, Camp, Registration, Payment } = require("../../../models");
const Boom = require("boom");
const _ = require("lodash");
const mongoose = require('mongoose');
const moment = require("moment");

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

        // Conditionally update all documents in the collection if new setting was passed in and set
        // new values to 'settings' object
        if (campArchiveDate !== settings.campArchiveDate.toISOString().substr(0, 10)) {
            const campObjectId = convertDateToObjectId(campArchiveDate);
            await Camp.updateMany({ _id: { "$lt": campObjectId} }, { $set: { "archived": true }});
            await Camp.updateMany({ _id: { "$gte": campObjectId} }, { $set: { "archived": false }});
            settings.campArchiveDate = campArchiveDate;
        }

        if (registrationArchiveDate !== settings.registrationArchiveDate.toISOString().substr(0, 10)) {
            const registrationObjectId = convertDateToObjectId(registrationArchiveDate);
            await Registration.updateMany({ _id: { "$lt": registrationObjectId} }, { $set: { "archived": true }});
            await Registration.updateMany({ _id: { "$gte": registrationObjectId} }, { $set: { "archived": false }});
            settings.registrationArchiveDate = registrationArchiveDate;
        }

        if (paymentArchiveDate !== settings.paymentArchiveDate.toISOString().substr(0, 10)) {
            const paymentObjectId = convertDateToObjectId(paymentArchiveDate);
            await Payment.updateMany({ _id: { "$lt": paymentObjectId} }, { $set: { "archived": true }});
            await Payment.updateMany({ _id: { "$gte": paymentObjectId} }, { $set: { "archived": false }});
            settings.paymentArchiveDate = paymentArchiveDate;
        }

        if (earlyBirdCutoff) settings.earlyBirdCutoff = earlyBirdCutoff;

        await settings.save(); 
        res.send(settings);
    } catch (err) {
        Boom.badImplementation((`Settings failed to update: ${err}`));
    }

}

// Helper function for converting dates to objectIds
convertDateToObjectId = date => {
    const dateObject = new Date(date);
    console.log(Math.floor(dateObject.getTime() / 1000).toString(16) + "0000000000000000");
}