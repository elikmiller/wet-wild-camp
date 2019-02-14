const { Registration } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let updatedRegistration = await Registration.findOneAndUpdate(
      { _id: req.params.registrationId },
      {
        user: req.body.user,
        camper: req.body.camper,
        camp: req.body.camp,
        morningDropoff: req.body.morningDropoff,
        afternoonPickup: req.body.afternoonPickup,
        waitlist: req.body.waitlist,
        deposit: req.body.deposit,
        paid: req.body.paid
      },
      { new: true }
    );
    return res.send(updatedRegistration);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
