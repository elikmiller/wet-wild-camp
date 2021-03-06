const { Camp } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let camp = await Camp.findOne({ _id: req.params.campId }).populate({
      path: "registrations",
      populate: [{ path: "user" }, { path: "camper" }]
    });

    if (!camp) {
      return next(Boom.badRequest("This camp does not exist."));
    }

    return res.send(camp);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
