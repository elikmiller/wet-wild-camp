const { validationResult } = require("express-validator/check");
const { User } = require("../../models");

module.exports = (req, res) => {
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
