const { Registration } = require("../../../models");

module.exports = async (req, res) => {
  try {
    let registrations = await Registration.find({})
      .populate("camp")
      .populate("camper")
      .populate("user");
    res.send(registrations);
  } catch (err) {
    res.sendStatus(500);
  }
};
