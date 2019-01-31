const { validationResult } = require("express-validator/check");
const { User } = require("../../models");

module.exports = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

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
    console.error(e);
  }
  res.sendStatus(200);
};
