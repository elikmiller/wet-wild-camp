const { Camper } = require("../../models");

module.exports = async (req, res) => {
  try {
    let camper = await Camper.find({ _id: req.params.camperId })
      .populate("user")
      .populate({
        path: "registrations",
        match: { deleted: false },
        populate: { path: "camp", model: "Camp" }
      });
    res.send(camper);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
