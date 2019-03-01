const { Camp } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let camp = await Camp.findOne({
      _id: req.params.campId
    }).populate("registrations");

    if (!camp) {
      return next(Boom.badRequest("This Camp does not exist."));
    }

    if (camp.registrations.length > 0) {
      return next(
        Boom.badRequest(
          "This Camp has existing registrations and cannot be deleted."
        )
      );
    }

    await Camp.findByIdAndDelete(camp._id);
    return res.send();
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
