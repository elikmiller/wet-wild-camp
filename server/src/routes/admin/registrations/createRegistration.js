const { User, Registration, Camp, Camper } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let user = await User.findOne({
      _id: req.body.user
    });
    if (!user) {
      return next(Boom.badRequest("This user does not exist."));
    }

    let camp = await Camp.findOne({ _id: req.body.camp, archived: false });
    if (!camp) {
      return next(Boom.badRequest("This camp does not exist."));
    }

    let camper = await Camper.findOne({
      _id: req.body.camper
    });
    if (!camper) {
      return next(Boom.badRequest("This camper does not exist."));
    }

    let registration = new Registration({
      camper: req.body.camper,
      camp: req.body.camp,
      morningDropoff: req.body.morningDropoff,
      afternoonPickup: req.body.afternoonPickup,
      deposit: req.body.deposit || false,
      paid: req.body.paid || false,
      waitlist: req.body.waitlist || false,
      created: Date.now(),
      user: req.body.user
    });

    await registration.save();
    return res.send(registration);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
