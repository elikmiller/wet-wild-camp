const { User, PasswordResetToken } = require("../models/index");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator/check");
const crypto = require("crypto");
const EmailService = require("../EmailService");

module.exports = app => {
  // User login
  app.post(
    "/login",
    [
      body("email")
        .exists()
        .withMessage("Email Address is required.")
        .isEmail()
        .withMessage("Please enter a valid Email Address."),
      body("password")
        .exists()
        .withMessage("Password is required.")
        .isLength({ min: 8, max: 64 })
        .withMessage("Password must be between 8 and 64 characters.")
    ],
    (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      User.authenticate(req.body.email, req.body.password, (err, user) => {
        if (err) {
          console.error(err);
          return res.sendStatus(401);
        }
        req.session.authenticated = true;
        req.session.userId = user._id;
        return res.send({
          user: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            admin: user.admin
          }
        });
      });
    }
  );

  // User logout
  app.get("/logout", (req, res) => {
    req.session.authenticated = false;
    req.session.userId = null;
    req.session.destroy();
    res.sendStatus(200);
  });

  // Get current User (requires authentication)
  app.get("/current_user", auth, async (req, res) => {
    if (!req.session.userId) {
      return res.sendStatus(500);
    }
    try {
      let user = await User.findById(req.session.userId);
      res.send({
        user: {
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          admin: user.admin
        }
      });
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Create Password Reset Token
  app.post(
    "/password_reset",
    [
      body("email")
        .exists()
        .withMessage("Email Address is required.")
        .isEmail()
        .withMessage("Please enter a valid Email Address.")
    ],
    async (req, res) => {
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
    }
  );

  // Redeem Password Reset Token
  app.post(
    "/redeem_password_reset_token",
    [
      body("token")
        .exists()
        .withMessage("Token is required."),
      body("password")
        .exists()
        .withMessage("Password is required.")
        .isLength({ min: 8, max: 64 })
        .withMessage("Password must be between 8 and 64 characters.")
    ],
    async (req, res) => {
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
    }
  );
};
