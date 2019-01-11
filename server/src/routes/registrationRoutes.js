const { Registration, User, Camp, Camper } = require("../models/index");
const auth = require("../middleware/auth");

module.exports = app => {
  // Get all registrations
  app.get("/registrations", auth, async (req, res) => {
    try {
      let registrations = await Registration.find({})
        .populate("camp")
        .populate("camper")
        .populate("user");
      res.send(registrations);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Get one registration
  app.get("/registrations/:registrationId", auth, async (req, res) => {
    try {
      let registration = await Registration.findById(req.params.registrationId);
      res.send(registration);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Get all registrations for one user
  app.get("/users/:userId/registrations", auth, async (req, res) => {
    try {
      let user = await User.findById(req.params.userId).populate({
        path: "registrations",
        populate: [{ path: "camper" }, { path: "camp" }]
      });
      res.send(user.registrations);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Create new registration
  app.post("/registrations", auth, async (req, res) => {
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
  });

  // Update registration
  app.patch("/registrations/:registrationId", auth, async (req, res) => {
    try {
      let updatedRegistration = await Registration.findByIdAndUpdate(
        req.params.registrationId,
        req.body,
        { new: true }
      );
      res.send(updatedRegistration);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Delete Registration
  app.delete("/registrations/:registrationId", auth, async (req, res) => {
    try {
      let registration = await Registration.findById(req.params.registrationId);
      let camper = await Camper.findById(registration.camper);
      let camp = await Camp.findById(registration.camp)
        .populate("campers")
        .populate("waitlist");

      // Finds which list the registration is in on the specified camp and removes it
      if (camp.campers.find(elem => elem._id == req.params.registrationId)) {
        let i = camp.campers.findIndex(
          elem => elem._id == req.params.registrationId
        );
        camp.campers.splice(i, 1);
        // if camp is no longer waitlisted, updates camp
        if (camp.waitlisted && camp.campers.length < camp.capacity) {
          camp.waitlisted = false;
        }
      } else if (
        camp.waitlist.find(elem => elem._id == req.params.registrationId)
      ) {
        let i = camp.waitlist.findIndex(
          elem => elem._id == req.params.registrationId
        );
        camp.waitlist.splice(i, 1);
      }

      // Remove registration from array on camper object
      if (camper.registrations) {
        let i = camper.registrations.indexOf(registration._id);
        camper.registrations.splice(i, 1);
      }

      camp.save();
      camper.save();
      registration.remove();
      res.send(registration);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Delete Registration by Camper and Camp
  app.delete("/registrations/:campId/:camperId", auth, async (req, res) => {
    try {
      let { camperId } = req.params;
      let camp = await Camp.findById(req.params.campId);
      let registration = await Registration.findOne({
        camper: camperId,
        camp: camp._id
      });

      if (camp.campers.indexOf(registration.camper) !== -1) {
        let i = camp.campers.indexOf(registration.camper);
        camp.campers.splice(i, 1);
      } else if (camp.waitlist.indexOf(registration.camper) !== -1) {
        let i = camp.waitlist.indexOf(registration.camper);
        camp.waitlist.splice(i, 1);
      }

      camp.save();
      registration.remove();
      res.send(registration);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
};
