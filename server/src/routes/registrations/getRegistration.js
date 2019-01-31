const { Registration } = require("../../models");

module.exports = async (req, res) => {
  try {
    let registration = await Registration.findOne({
      user: req.session.userId,
      _id: req.params.registrationId
    })
      .populate("camp")
      .populate("camper")
      .populate("user");
    res.send(registration);
  } catch (err) {
    res.sendStatus(500);
  }
};
