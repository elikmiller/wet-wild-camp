const { Registration, User, Camper, Camp } = require("../../models");

module.exports = async (req, res) => {
  let registration = new Registration({
    user: req.body.user,
    camper: req.body.camper,
    camp: req.body.camp,
    morningDropoff: req.body.morningDropoff,
    afternoonPickup: req.body.afternoonPickup,
    created: Date.now()
  });
  try {
    let user = await User.findById(req.body.user);
    user.registrations.push(registration._id);
    user.save();

    let camper = await Camper.findById(req.body.camper);
    camper.registrations.push(registration._id);
    camper.save();

    let camp = await Camp.findById(req.body.camp);
    if (camp.campers.length >= camp.capacity) {
      if (!camp.waitlisted) camp.waitlisted = true;
      registration.waitlist = true;
      camp.waitlist.push(registration._id);
    } else {
      registration.waitlist = false;
      camp.campers.push(registration._id);
    }
    camp.save();

    registration.save();
    res.send(registration);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
