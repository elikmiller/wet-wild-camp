const { Camp } = require("../../models");

module.exports = async (req, res) => {
  try {
    let camp = await Camp.findById(req.params.campId)
      .populate({
        path: "campers",
        match: { deleted: false },
        populate: [
          {
            path: "camper",
            model: "Camper"
          },
          {
            path: "user",
            model: "User"
          }
        ]
      })
      .populate({
        path: "waitlist",
        match: { deleted: false },
        populate: { path: "camper", model: "Camper" }
      });
    res.send(camp);
  } catch (err) {
    res.sendStatus(500);
  }
};
