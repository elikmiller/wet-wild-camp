const { Registration, Camp, Camper } = require("../../models");
const Boom = require("boom");
const moment = require("moment");

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

    let ageOnStartDate = moment
      .utc(camp.startDate)
      .diff(moment.utc(camper.dateOfBirth), "years", false);

    if (
      camp.type === "adventure" &&
      (ageOnStartDate < 9 || ageOnStartDate > 15)
    ) {
      return next(
        Boom.badRequest("This camper is not the correct age for this camp.")
      );
    }

    if (camp.type === "junior" && (ageOnStartDate < 6 || ageOnStartDate > 9)) {
      return next(
        Boom.badRequest("This camper is not the correct age for this camp.")
      );
    }

    let existingRegistration = await Registration.find({
      camper: req.body.camper,
      camp: req.body.camp
    });

    if (existingRegistration.length > 0) {
      return next(
        Boom.badRequest("This camper already has a registration for this camp.")
      );
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
