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
  },
  campers: [
    {
      type: ObjectId,
      ref: "Registration"
    }
  ],
  waitlist: [
    {
      type: ObjectId,
      ref: "Registration"
    }
  ]
});

const Camp = mongoose.model("Camp", CampSchema);

module.exports = {
  Camp: Camp
};
