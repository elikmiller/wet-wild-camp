const { User } = require("../../models");

module.exports = (req, res) => {
  User.authenticate(req.body.email, req.body.password, (err, user) => {
    if (err) {
      return res.sendStatus(401);
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
