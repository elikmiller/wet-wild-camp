const mongoose = require('mongoose');
const { Schema } = mongoose;

// Schema for singleton admin settings object
const GlobalSettingsSchema = new Schema({
    campArchiveDate: {
        type: Date
    },
    registrationArchiveDate: {
        type: Date
    },
    paymentArchiveDate: {
        type: Date
    },
    earlyBirdCutoff: {
        type: Date
    }
});

const GlobalSettings = mongoose.model(
    "GlobalSettings",
    GlobalSettingsSchema
);

module.exports = {
    GlobalSettings
};