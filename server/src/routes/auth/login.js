const { User } = require("../../models");
const Boom = require("boom");

module.exports = (req, res, next) => {
  User.authenticate(req.body.email, req.body.password, (err, user) => {
    if (err) {
      return next(Boom.unauthorized());
    }

    // Populate session
    req.session.authenticated = true;
    req.session.userId = user._id;
    req.session.admin = user.admin;

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
};
