const { validationResult } = require("express-validator/check");
const { User, PasswordResetToken } = require("../../models");
const EmailService = require("../../EmailService");
const crypto = require("crypto");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    // Find user by email
    let user = await User.findOne({ email: req.body.email });

    // Generate a token
    let token = crypto.randomBytes(48).toString("hex");

    // Upsert token into database
    await PasswordResetToken.findOneAndUpdate(
      { user: user._id },
      {
        user: user._id,
        token,
        createdAt: Date.now()
      },
      { upsert: true }
    );

    // Send email containing reset URL and token
    EmailService.sendHtml({
      from: process.env.NO_REPLY_ADDRESS,
      to: user.email,
      subject: "Wet & Wild Adventure Camp: Password Reset",
      html: `Click <a href="${
        req.headers.origin
      }/reset-password?token=${token}">here</a> to reset your password.`
    });

    res.send({ token });
  } catch (e) {
    return next(Boom.badImplementation());
  }
};
