const {
  Registration,
  User,
  Camp,
  Camper,
  Payment
} = require("../models/index");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const Boom = require("boom");

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
  app.delete("/registrations/:registrationId", auth, async (req, res, next) => {
    let registration;
    try {
      registration = await Registration.findById(req.params.registrationId);

      // Registration must exist
      if (!registration) {
        return next(Boom.badRequest("This registration does not exist."));
      }

      // Registration must belong to currently authenticated user
      if (!registration.user.equals(req.session.userId)) {
        return next(
          Boom.forbidden(
            "This camper does not belong to the currently logged in user."
          )
        );
      }

      // If Registration has at least one associated Payment it should be soft-deleted. Otherwise it can be hard-deleted.
      let paymentCount = await Payment.countDocuments({
        $or: [
          { deposits: registration._id },
          { fullPayments: registration._id }
        ]
      });
      if (paymentCount > 0) {
        await Registration.removeOne({ _id: registration._id });
      } else {
        await registration.remove();
      }
      return res.send();
    } catch (err) {
      return next(Boom.badImplementation());
    }
  });

  // Delete Registration (admin)
  app.delete(
    "/admin/registrations/:registrationId",
    isAdmin,
    async (req, res, next) => {
      let registration;
      try {
        registration = await Registration.findById(req.params.registrationId);

        // Registration must exist
        if (!registration) {
          return next(Boom.badRequest("This registration does not exist."));
        }

        // If Registration has at least one associated Payment it should be soft-deleted. Otherwise it can be hard-deleted.
        let paymentCount = await Payment.countDocuments({
          $or: [
            { deposits: registration._id },
            { fullPayments: registration._id }
          ]
        });
        if (paymentCount > 0) {
          await Registration.removeOne({ _id: registration._id });
        } else {
          await registration.remove();
        }
        return res.send();
      } catch (err) {
        return next(Boom.badImplementation());
      }
    }
  );
};
