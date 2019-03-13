const Boom = require("boom");

module.exports = (req, res, next) => {
  if (req.session.authenticated && req.session.admin) {
    return next();
  } else {
    return next(Boom.forbidden());
  }
};
