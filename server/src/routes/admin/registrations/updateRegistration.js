const { Registration } = require("../../../models");

module.exports = async (req, res) => {
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
};
