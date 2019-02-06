const { User } = require("../../models");
const EmailService = require("../../EmailService");
const Boom = require("boom");

module.exports = async (req, res, next) => {
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
    console.error("Sending mail failed.", err);
  }

  return res.send({
    _id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  });
};
