const { Registration, Camp, Camper, User } = require("../../models");
const Boom = require("boom");
const EmailService = require("../../EmailService");
const moment = require("moment");

module.exports = async (req, res, next) => {
  try {
    let user = await User.findOne({ _id: req.session.userId });
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

    let html = `
    <p>Dear ${user.firstName},</p>
    <p>We have received your registration for your child for the camps listed below:</p>
    <br/>
    <p>${camp.name}: ${camp.type} -- ${camper.firstName} ${camper.lastName}</p>
    <br/>
    <p>Make sure to make your deposit to secure your registration!</p>
    <p>
    <p>You may review your registrations and payments any time by visiting <a href="${
      process.env.CORS_URL
    }">${process.env.CORS_URL}</a></p>
    <p>We're looking forward to a great summer; so glad you'll be joining us.</p>
    `;

    await registration.save();
    EmailService.sendHtml({
      from: process.env.NO_REPLY_ADDRESS,
      to: user.email,
      bcc: "wetwildcamp@wetwildcamp.com",
      subject: "Wet & Wild Adventure Camp: Registration Confirmation",
      html
    });

    await registration.save();
    return res.send(registration);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
