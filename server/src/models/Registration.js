const mongoose = require("mongoose");
const softDelete = require("mongoosejs-soft-delete");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const { User } = require("./User");
const { Camp } = require("./Camp");
const { Camper } = require("./Camper");

const RegistrationSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    camper: {
        type: ObjectId,
        ref: "Camper",
        required: true,
    },
    camp: {
        type: ObjectId,
        ref: "Camp",
        required: true,
    },
    morningDropoff: {
        type: String,
        required: true,
        enum: ["north", "central", "south"],
    },
    afternoonPickup: {
        type: String,
        required: true,
        enum: ["north", "central", "south"],
    },
    waitlist: {
        type: Boolean,
    },
    deposit: {
        type: Boolean,
        default: false,
        required: true,
    },
    paid: {
        type: Boolean,
        default: false,
        required: true,
    },
    spaceSaved: {
        type: Boolean,
        default: false,
        required: true,
    },
    created: {
        type: Date,
        required: true,
    },
    archived: {
        type: Boolean,
        default: false,
    },
});

RegistrationSchema.plugin(softDelete);

RegistrationSchema.post("updateOne", async function () {
    if (this._update.deleted) {
        // Soft-delete clean-up actions can be performed here.
    }
});

RegistrationSchema.post("remove", async function (doc) {
    await Camp.update({ _id: doc.camp }, { $pull: { campers: doc._id, waitlist: doc._id } });
    await User.update({ _id: doc.user }, { $pull: { registrations: doc._id } });
    await Camper.update({ _id: doc.camper }, { $pull: { registrations: doc._id } });
});

RegistrationSchema.virtual("status").get(function () {
    if (this.waitlist) return "Waitlisted";
    if (!this.deposit && !this.paid && this.spaceSaved) return "Spot Reserved";
    if (!this.deposit && !this.paid && !this.spaceSaved) return "Unconfirmed";
    if (this.deposit && !this.paid) return "Pending";
    if (this.paid) return "Confirmed";
});

RegistrationSchema.set("toObject", { virtuals: true });

RegistrationSchema.set("toJSON", { virtuals: true });

const Registration = mongoose.model("Registration", RegistrationSchema);

module.exports = {
    Registration: Registration,
};
