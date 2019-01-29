const mongoose = require("mongoose");
const softDelete = require('mongoosejs-soft-delete');
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

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
    default: false
  },
  paid: {
    type: Boolean,
    default: false
  },
  created: {
    type: Date,
    required: true
  }
});

RegistrationSchema.plugin(softDelete);

const Registration = mongoose.model("Registration", RegistrationSchema);

module.exports = {
  Registration: Registration
};
