const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PasswordResetTokenSchema = new Schema({
  user: {
    type: ObjectId,
    ref: "User"
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    expires: 900,
    required: true,
    default: Date.now()
  }
});

const PasswordResetToken = mongoose.model(
  "PasswordResetToken",
  PasswordResetTokenSchema
);

module.exports = {
  PasswordResetToken
};
