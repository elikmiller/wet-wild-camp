const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;
const moment = require("moment");

const CamperSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "unspecified"]
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  notes: {
    type: String
  },
  swimmingStrength: {
    type: String,
    enum: ["none", "weak", "fair", "strong"]
  },
  user: {
    type: ObjectId,
    ref: "User",
    required: true
  }
});

CamperSchema.virtual("registrations", {
  ref: "Registration",
  localField: "_id",
  foreignField: "camper"
});

CamperSchema.virtual("age").get(function() {
  return moment().diff(this.dateOfBirth, "years", false);
});

CamperSchema.set("toObject", { virtuals: true });

CamperSchema.set("toJSON", { virtuals: true });

const Camper = mongoose.model("Camper", CamperSchema);

module.exports = {
  Camper: Camper
};
