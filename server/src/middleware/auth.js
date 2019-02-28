const Boom = require("boom");

module.exports = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  } else {
    return next(Boom.unauthorized());
  }
};
