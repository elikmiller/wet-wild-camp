const { User } = require("../models");
const auth = require("../middleware/auth");
const { body, validationResult } = require("express-validator/check");
const EmailService = require("../EmailService");
const Boom = require("boom");

module.exports = app => {
  // Add new User
  app.post(
    "/users",
    [
      body("firstName")
        .exists()
        .withMessage("First Name is required."),
      body("lastName")
        .exists()
        .withMessage("Last Name is required."),
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
    async (req, res, next) => {
      const validationErrors = validationResult(req);
      if (!validationErrors.isEmpty()) {
        return next(
          Boom.badData(
            "One or more form fields was invalid.",
            validationErrors.array()
          )
        );
      }

      const userModel = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });

      let user;
      try {
        user = await userModel.save();
      } catch (err) {
        if (err.name === "MongoError") {
          if (err.code === 11000) {
            return next(
              Boom.badRequest(
                "A user with this email address already exists. Please try another."
              )
            );
          }
        } else {
          return next(Boom.badImplementation());
        }
      }

      try {
        await EmailService.sendHtml({
          from: process.env.NO_REPLY_ADDRESS,
          to: user.email,
          subject: "Welcome to the Wet & Wild Camp Registration Portal!",
          html: `Thanks for signing up with us!<br />Click <a href="${
            process.env.CORS_URL
          }">here</a> to login and begin the registration process.`
        });
      } catch (err) {
        console.error("Sending mail failed.");
      }

      res.send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    }
  );

  // Get all non-admin Users (requires authentication)
  app.get("/users", auth, async (req, res) => {
    try {
      let users = await User.find({ admin: false });
      res.send(
        users.map(user => ({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }))
      );
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Get all campers for one user
  app.get("/users/:userId/campers", auth, async (req, res) => {
    try {
      let user = await User.findById(req.params.userId).populate("campers");
      res.send(user.campers);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Get one user
  app.get("/users/:userId", auth, async (req, res) => {
    try {
      let user = await User.findById(req.params.userId);
      res.send({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      });
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Admin user route that returns all user data
  app.get("/admin/users/:userId", auth, async (req, res) => {
    try {
      let user = await User.findById(req.params.userId);
      let userObject = user.toObject();
      let filteredUser = Object.keys(userObject).reduce((obj, key) => {
        if (key !== "password") {
          obj[key] = user[key];
        }
        return obj;
      }, {});
      res.send(filteredUser);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Get Contact data for one user
  app.get("/users/:userId/contacts", auth, async (req, res) => {
    try {
      let user = await User.findById(req.params.userId);
      res.send({
        primaryContact: user.primaryContact,
        secondaryContact: user.secondaryContact,
        emergencyContact: user.emergencyContact
      });
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Update user
  app.patch("/users/:userId", auth, async (req, res) => {
    delete req.body.admin;
    delete req.body.campers;
    delete req.body.registrations;
    delete req.body.payments;
    try {
      let updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true }
      );
      res.send({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email
      });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Delete user
  app.delete("/users/:userId", auth, async (req, res) => {
    try {
      let deletedUser = await User.findByIdAndRemove(req.params.userId);
      res.send({
        _id: deletedUser._id,
        firstName: deletedUser.firstName,
        lastName: deletedUser.lastName,
        email: deletedUser.email
      });
    } catch (err) {
      res.sendStatus(500);
    }
  });
};
