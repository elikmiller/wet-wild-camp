const { Camper } = require("../../models");

module.exports = async (req, res) => {
  try {
    let updatedCamper = await Camper.findByIdAndUpdate(
      req.params.camperId,
      req.body,
      { new: true }
    );
    res.send(updatedCamper);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
