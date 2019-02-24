const { User } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let user = await User.findOne(
      { _id: req.session.userId },
      "-password"
    ).populate(["campers", "registrations", "payments"]);

    if (!user) {
      return next(Boom.badRequest("This user does not exist."));
    }

    return res.send(user);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
