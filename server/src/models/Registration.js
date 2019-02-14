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
    required: true
  },
  camper: {
    type: ObjectId,
    ref: "Camper",
    required: true
  },
  camp: {
    type: ObjectId,
    ref: "Camp",
    required: true
  },
  morningDropoff: {
    type: String,
    required: true,
    enum: ["north", "central", "south"]
  },
  afternoonPickup: {
    type: String,
    required: true,
    enum: ["north", "central", "south"]
  },
  waitlist: {
    type: Boolean
  },
  deposit: {
    type: Boolean,
    default: false,
    required: true
  },
  paid: {
    type: Boolean,
    default: false,
    required: true
  },
  created: {
    type: Date,
    required: true
  }
});

RegistrationSchema.plugin(softDelete);

RegistrationSchema.post("updateOne", async function() {
  if (this._update.deleted) {
    // Soft-delete clean-up actions can be performed here.
  }
});

RegistrationSchema.post("remove", async function(doc) {
  await Camp.update(
    { _id: doc.camp },
    { $pull: { campers: doc._id, waitlist: doc._id } }
  );
  await User.update({ _id: doc.user }, { $pull: { registrations: doc._id } });
  await Camper.update(
    { _id: doc.camper },
    { $pull: { registrations: doc._id } }
  );
});

const Registration = mongoose.model("Registration", RegistrationSchema);

module.exports = {
  Registration: Registration
};
