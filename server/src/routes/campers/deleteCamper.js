const { validationResult } = require("express-validator/check");
const { Camper } = require("../../models");

module.exports = async (req, res, next) => {
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
};
