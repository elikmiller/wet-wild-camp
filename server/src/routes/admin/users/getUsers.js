const { User } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let users = await User.find({}, "-password");
    return res.send(users);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
