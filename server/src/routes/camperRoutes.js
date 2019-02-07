const { User, Camper } = require("../models/index.js");
const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");
const { body, validationResult } = require("express-validator/check");
const Boom = require("boom");

module.exports = app => {
  // Get all campers
  app.get("/campers", auth, async (req, res) => {
    try {
      let campers = await Camper.find({}).populate({
        path: "registrations",
        match: { deleted: false }
      });
      res.send(campers);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  //Get one camper
  app.get("/campers/:camperId", auth, async (req, res) => {
    try {
      let camper = await Camper.find({ _id: req.params.camperId })
        .populate("user")
        .populate({
          path: "registrations",
          match: { deleted: false },
          populate: { path: "camp", model: "Camp" }
        });
      res.send(camper);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Create new camper
  app.post(
    "/campers",
    [
      body("firstName")
        .exists()
        .withMessage("First Name is required."),
      body("lastName")
        .exists()
        .withMessage("Last Name is required."),
      body("dateOfBirth")
        .exists()
        .withMessage("Date of Birth is required.")
        .isBefore()
        .withMessage("Please enter a valid birthdate.")
    ],
    auth,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }

      const camper = new Camper({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dateOfBirth: req.body.dateOfBirth,
        swimmingStrength: "none",
        notes: req.body.notes,
        user: req.body.user
      });

      try {
        let newCamper = await camper.save();
        try {
          let updatedUser = await User.updateOne(
            { _id: req.body.user },
            { $push: { campers: newCamper._id } }
          );
        } catch (err) {
          console.error(err);
          res.sendStatus(500);
        }
        res.send(newCamper);
      } catch (err) {
        console.error(err);
        res.sendStatus(500);
      }
    }
  );

  // Update camper
  app.patch("/campers/:camperId", auth, async (req, res) => {
    try {
      let updatedCamper = await Camper.findByIdAndUpdate(
        req.params.camperId,
        req.body,
        { new: true }
      );
      res.send(updatedCamper);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Delete camper
  app.delete("/campers/:camperId", auth, async (req, res, next) => {
    let camper;
    try {
      camper = await Camper.findById(req.params.camperId);

      if (!camper) {
        return next(Boom.badRequest("This camper does not exist."));
      }

      if (!camper.user.equals(req.session.userId)) {
        return next(
          Boom.forbidden(
            "This camper does not belong to the currently logged in user."
          )
        );
      }

      if (camper.registrations.length > 0) {
        return next(
          Boom.badRequest(
            "This camper has existing registrations and cannot be deleted."
          )
        );
      }

      await Camper.findByIdAndDelete(camper._id);
      return res.send();
    } catch (err) {
      return next(Boom.badImplementation());
    }
  });

  // Delete camper (admin)
  app.delete(
    "/admin/campers/:camperId",
    auth,
    isAdmin,
    async (req, res, next) => {
      let camper;
      try {
        camper = await Camper.findById(req.params.camperId);

        if (!camper) {
          return next(Boom.badRequest("This camper does not exist."));
        }

        if (camper.registrations.length > 0) {
          return next(
            Boom.badRequest(
              "This camper has existing registrations and cannot be deleted."
            )
          );
        }

        await Camper.findByIdAndDelete(camper._id);
        return res.send();
      } catch (err) {
        return next(Boom.badImplementation());
      }
    }
  );

  // Bulk update Campers
  app.patch("/campers", auth, async (req, res) => {
    try {
      let updatedCampers = [];
      for (let camper of req.body) {
        let updatedCamper = await Camper.findByIdAndUpdate(camper._id, camper);
        updatedCampers.push(updatedCamper);
      }
      res.send(updatedCampers);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
};
