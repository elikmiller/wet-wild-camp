const { Camp, Registration } = require("../../../models");
const Boom = require("boom");
const json2csv = require("json2csv").parse;
const _ = require("lodash");
const moment = require("moment");

module.exports = async (req, res) => {
  try {
    let camp = await Camp.findOne({ _id: req.params.campId });
    let registrations = await Registration.find({
      camp: req.params.campId,
      archived: false
    }).populate("camper");

    const reportData = registrations.filter(reg => !reg.waitlist);
    const fields = [
      { label: "First Name", value: "camper.firstName" },
      { label: "Last Name", value: "camper.lastName" },
      { label: "Age", value: "camper.age" },
      { label: "Gender", value: "camper.gender" },
      { label: "Swimming Ability", value: "camper.swimmingStrength" }
    ];
    const csv = json2csv(reportData, { fields });
    const date = moment().format("MM/DD/YYYY");
    const filename =
      _.snakeCase(`${camp.name}_${camp.type}_${date}_swimming_report`) + ".csv";
    res.set({
      "Content-Disposition": `attachment; filename=${filename}`,
      "Content-Type": "text/csv"
    });
    res.status(200).send(csv);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
