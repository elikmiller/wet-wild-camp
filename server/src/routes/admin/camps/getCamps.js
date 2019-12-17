const { Camp } = require("../../../models");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let camps = await Camp.find({ archived: false }, null, {
      sort: {
        startDate: 1
      }
    }).populate("registrations");
    return res.send(camps);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
