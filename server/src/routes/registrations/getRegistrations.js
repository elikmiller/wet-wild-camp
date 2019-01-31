const { Registration } = require("../../models");

module.exports = async (req, res) => {
  try {
    let registrations = await Registration.find({ user: req.session.userId })
      .populate("camp")
      .populate("camper")
      .populate("user");
    res.send(registrations);
  } catch (err) {
    res.sendStatus(500);
  }
};
