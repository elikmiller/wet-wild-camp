const { validationResult } = require("express-validator/check");
const Boom = require("boom");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(Boom.badRequest("Invalid request", errors.array()));
  }
  return next();
};
