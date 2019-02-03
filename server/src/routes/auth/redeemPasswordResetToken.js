const { validationResult } = require("express-validator/check");
const { User, PasswordResetToken } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    // Find the matching password reset token
    let passwordResetToken = await PasswordResetToken.findOne({
      token: req.body.token
    }).populate("user");

    // Update the associated user's password
    await User.findByIdAndUpdate(passwordResetToken.user._id, {
      password: req.body.password
    });

    // Delete the password reset token
    await PasswordResetToken.findByIdAndDelete(passwordResetToken._id);
  } catch (e) {
    return next(Boom.badImplementation());
  }

  return res.send();
};
