const { validationResult } = require("express-validator/check");
const { User, Camper } = require("../../models");

module.exports = async (req, res) => {
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
    user: req.session.userId
  });

  try {
    let newCamper = await camper.save();
    try {
      let updatedUser = await User.updateOne(
        { _id: req.session.userId },
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
};
