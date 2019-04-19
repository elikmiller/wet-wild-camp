const { User, Registration, Camper } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.userId }).populate(
      "campers"
    );

    if (!user) {
      return next(Boom.badRequest("That user does not exist."));
    }

    await Registration.deleteMany({ user: user._id });
    await Camper.deleteMany({ user: user._id });
    let deletedUser = await user.remove();

    res.send(deletedUser);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
