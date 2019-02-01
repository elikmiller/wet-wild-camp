const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    let user = await User.findById(req.session.userId);
    res.send({
      primaryContact: user.primaryContact,
      secondaryContact: user.secondaryContact,
      emergencyContact: user.emergencyContact
    });
  } catch (err) {
    res.sendStatus(500);
  }
};
