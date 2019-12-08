const { Camp, Registration } = require("../../../models");
const Boom = require("boom");
const json2csv = require("json2csv").parse;
const _ = require("lodash");
const moment = require("moment");

module.exports = async (req, res, next) => {
    try {
        // Get camp and registrations
        let camp = await Camp.findOne({ _id: req.params.campId });
        let registrations = await Registration.find({ camp: req.params.campId }).populate("camper");

        // Calculate age from DOB
        let regWithAge = await registrations.map(reg => {   
            let ageMoment = moment(reg.camper.dateOfBirth);
            reg.camper.age = moment(Date.now()).diff(ageMoment, 'years');
            return reg;
        });

        // Remove waitlisted campers from data
        let reportData = regWithAge.filter(reg => !reg.waitlist);

        // Generate CSV
        const fields = [
            { label: "First Name", value: "camper.firstName" },
            { label: "Last Name", value: "camper.lastName" },
            { label: "Age", value: "camper.age" },
            { label: "First Name", value: "camper.firstName" }
        ]
        const csv = json2csv(reportData, { fields });
        const date = moment().format("MM/DD/YYYY");
        const filename = _.snakeCase(`${camp.name}_${camp.type}_${date}_special_needs_report`) + ".csv";

        // Configure response
        res.set({
            "Content-Disposition": `attachment; filename=${filename}`,
            "Content-Type": "text/csv"
        });
        res.status(200).send(csv);
    } catch (err) {
        console.error(err);
        return next(Boom.badImplementation());
    }
}