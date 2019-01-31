const { validationResult } = require("express-validator/check");
const { User } = require("../../models");

module.exports = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array() });
  }

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
  } catch (e) {
    console.error(e);
  }
  res.sendStatus(200);
};
