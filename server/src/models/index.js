const mongoose = require("mongoose");

// Import models
const userModel = require("./User");
const camperModel = require("./Camper");
const campModel = require("./Camp");
const registrationModel = require("./Registration");
const paymentModel = require("./Payment");
const passwordResetTokenModel = require("./PasswordResetToken");

// DB connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true }
);

module.exports = {
  User: userModel.User,
  Camper: camperModel.Camper,
  Camp: campModel.Camp,
  Registration: registrationModel.Registration,
  Payment: paymentModel.Payment,
  PasswordResetToken: passwordResetTokenModel.PasswordResetToken
};
