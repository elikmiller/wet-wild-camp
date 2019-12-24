const { User, Registration, Camper, Camp } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.params.userId });

    if (!user) {
      return next(Boom.badRequest("That user does not exist."));
    }

    let camps = await Camp.find({ archived: false }).populate({
      path: "registrations",
      select: "user"
    });
    for (let camp of camps) {
      camp.registrations.forEach((item, i) => {
        if (item.user.toString() === user._id.toString()) {
          camp.registrations.splice(i, 1);
        }
      });
      await camp.save();
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
