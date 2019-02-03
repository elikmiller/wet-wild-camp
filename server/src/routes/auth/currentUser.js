const { User } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let user = await User.findById(req.session.userId);
    return res.send({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        admin: user.admin
      }
    });
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
