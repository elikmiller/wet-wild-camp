const { Camp, Registration } = require("../../../models");
const Boom = require("boom");
const json2csv = require("json2csv").parse;
const _ = require("lodash");
const moment = require("moment");

module.exports = async (req, res, next) => {
  try {
    let camp = await Camp.findOne({ _id: req.params.campId });
    let registrations = await Registration.find({
      camp: req.params.campId
    }).populate(["user", "camper"]);

    const reportData = registrations;
    const fields = [
      { label: "Camper First Name", value: "camper.firstName" },
      { label: "Camper Last Name", value: "camper.lastName" },
      { label: "Primary First Name", value: "user.primaryContact.firstName" },
      { label: "Primary Last Name", value: "user.primaryContact.lastName" },
      { label: "Primary Phone", value: "user.primaryContact.phoneNumber" },
      {
        label: "Secondary First Name",
        value: "user.secondaryContact.firstName"
      },
      { label: "secondary Last Name", value: "user.secondaryContact.lastName" },
      { label: "secondary Phone", value: "user.secondaryContact.phoneNumber" },
      {
        label: "Emergency First Name",
        value: "user.emergencyContact.firstName"
      },
      { label: "Emergency Last Name", value: "user.emergencyContact.lastName" },
      { label: "Emergency Phone", value: "user.emergencyContact.phoneNumber" }
    ];
    const csv = json2csv(reportData, { fields });
    const date = moment().format("MM/DD/YYYY");
    const filename = _.snakeCase(
      `${camp.name}_${camp.type}_${date}_contact_report.csv`
    );
    res.set({
      "Content-Disposition": `attachment; filename=${filename}`,
      "Content-Type": "text/csv"
    });
    return res.status(200).send(csv);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
