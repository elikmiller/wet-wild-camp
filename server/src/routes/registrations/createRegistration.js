const { Registration, Camp, Camper } = require("../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let camp = await Camp.findOne({ _id: req.body.camp });
    if (!camp) {
      return next(Boom.badRequest("This camp does not exist."));
    }

    let camper = await Camper.findOne({
      _id: req.body.camper,
      user: req.session.userId
    });

    if (!camper) {
      return next(Boom.badRequest("This camper does not exist."));
    }

    let registrations = await Registration.find({
      camp: req.body.camp,
      $or: [{ deposit: true }, { paid: true }]
    });

    let waitlist = registrations.length >= camp.capacity;

    let registration = new Registration({
      camper: req.body.camper,
      camp: req.body.camp,
      morningDropoff: req.body.morningDropoff,
      afternoonPickup: req.body.afternoonPickup,
      waitlist,
      created: Date.now(),
      user: req.session.userId
    });

    await registration.save();
    return res.send(registration);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
