const { Camper } = require("../../models");

module.exports = async (req, res) => {
  try {
    let campers = await Camper.find({}).populate({
      path: "registrations",
      match: { deleted: false }
    });
    res.send(campers);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
