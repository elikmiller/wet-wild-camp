const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema.Types;

const CampSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ["junior", "adventure"]
  },
  description: {
    type: String
  },
  fee: {
    type: Number,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  openDate: {
    type: Date,
    required: true
  },
  closeDate: {
    type: Date,
    required: true
  },
  waitlisted: {
    type: Boolean
  }
});

CampSchema.virtual("registrations", {
  ref: "Registration",
  localField: "_id",
  foreignField: "camp"
});

CampSchema.set("toObject", { virtuals: true });

CampSchema.set("toJSON", { virtuals: true });

const Camp = mongoose.model("Camp", CampSchema);

module.exports = {
  Camp: Camp
};
