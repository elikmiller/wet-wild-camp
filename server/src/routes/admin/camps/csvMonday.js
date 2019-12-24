const { Camp, Registration } = require("../../../models");
const Boom = require("boom");
const json2csv = require("json2csv").parse;
const _ = require("lodash");
const moment = require("moment");

module.exports = async (req, res, next) => {
  try {
    let camp = await Camp.findOne({ _id: req.params.campId });
    let registrations = await Registration.find({
      camp: req.params.campId,
      archived: false
    }).populate("camper");

    let mappedPayments = registrations.map(reg => {
      if (reg.paid) reg.paymentInfo = "Paid in Full";
      else if (reg.deposit) reg.paymentInfo = "Deposit Paid";
      else reg.paymentInfo = "Unpaid";
      return reg;
    });

    let reportData = mappedPayments.filter(reg => !reg.waitlist);

    const fields = [
      { label: "First Name", value: "camper.firstName" },
      { label: "Last Name", value: "camper.lastName" },
      { label: "Gender", value: "camper.gender" },
      { label: "Age", value: "camper.age" },
      { label: "Morning Dropoff", value: "morningDropoff" },
      { label: "Afternoon Pickup", value: "afternoonPickup" },
      { label: "Payment Status", value: "paymentInfo" }
    ];
    const csv = json2csv(reportData, { fields });
    const date = moment().format("MM/DD/YYYY");
    const filename =
      _.snakeCase(`${camp.name}_${camp.type}_${date}_monday_report`) + ".csv";
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
