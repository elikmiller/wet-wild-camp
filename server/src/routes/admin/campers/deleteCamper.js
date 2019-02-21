const { Camper, Registration } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let camper = await Camper.findOne({
      _id: req.params.camperId
    });

    let registrations = await Registration.find({
      camper: req.params.camperId
    });

    if (!camper) {
      return next(Boom.badRequest("This camper does not exist."));
    }

    if (registrations.length > 0) {
      return next(
        Boom.badRequest(
          "This camper has existing registrations and cannot be deleted."
        )
      );
    }

    await Camper.findByIdAndDelete(camper._id);
    return res.send();
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
