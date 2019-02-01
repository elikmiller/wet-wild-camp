const { Camp } = require("../../models");

module.exports = async (req, res) => {
  try {
    let camps = await Camp.find({}, null, {
      sort: {
        startDate: 1
      }
    });
    res.send(camps);
  } catch (err) {
    res.sendStatus(500);
  }
};
