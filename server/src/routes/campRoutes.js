const { Camp, Registration } = require("../models/index");
const auth = require("../middleware/auth");
const json2csv = require("json2csv").parse;
const _ = require("lodash");
const moment = require("moment");

module.exports = app => {
  // Get all camps
  app.get("/camps", auth, async (req, res) => {
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
  });

  // Get one camp
  app.get("/camps/:campId", auth, async (req, res) => {
    try {
      let camp = await Camp.findById(req.params.campId)
        .populate({
          path: "campers",
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
          populate: { path: "camper", model: "Camper" }
        });
      res.send(camp);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Add camp
  app.post("/camps", auth, async (req, res) => {
    const camp = new Camp({
      name: req.body.name,
      type: req.body.type,
      description: req.body.description,
      fee: req.body.fee,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      openDate: req.body.openDate,
      closeDate: req.body.closeDate,
      capacity: req.body.capacity
    });

    try {
      let newCamp = await camp.save();
      res.send(newCamp);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Update camp
  app.patch("/camps/:campId", auth, async (req, res) => {
    try {
      let updatedCamp = await Camp.findByIdAndUpdate(
        req.params.campId,
        req.body,
        { new: true }
      );
      res.send(updatedCamp);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Move from waitlist
  app.get("/camps/:campId/:registrationId", auth, async (req, res) => {
    try {
      let registration = await Registration.findById(req.params.registrationId);
      let camp = await Camp.findById(req.params.campId);

      if (registration.waitlist) registration.waitlist = false;
      let waitlistIndex = camp.waitlist.indexOf(registration._id);
      camp.waitlist.splice(waitlistIndex, 1);
      camp.campers.push(registration._id);

      camp.save();
      registration.save();
      res.send(camp);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Delete camp
  app.delete("/camps/:campId", auth, async (req, res) => {
    try {
      let deletedCamp = await Camp.findByIdAndRemove(req.params.campId);
      res.send(deletedCamp);
    } catch (err) {
      res.sendStatus(500);
    }
  });

  // Generate CSV Contact Report
  app.get("/camps/:campId/csv/contact", auth, async (req, res) => {
    let camp = await Camp.findById(req.params.campId).populate({
      path: "campers",
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
    });

    const reportData = camp.campers;
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

    try {
      const csv = json2csv(reportData, { fields });
      const date = moment().format("MM/DD/YYYY");
      const filename = _.snakeCase(
        `${camp.name}_${camp.type}_${date}_contact_report.csv`
      );
      res.set({
        "Content-Disposition": `attachment; filename=${filename}`,
        "Content-Type": "text/csv"
      });
      res.status(200).send(csv);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Generate CSV Monday Report
  app.get("/camps/:campId/csv/monday", auth, async (req, res) => {
    let camp = await Camp.findById(req.params.campId).populate({
      path: "campers",
      populate: [
        {
          path: "camper",
          model: "Camper"
        }
      ]
    });

    const reportData = camp.campers;
    const fields = [
      { label: "First Name", value: "camper.firstName" },
      { label: "Last Name", value: "camper.lastName" },
      { label: "Gender", value: "camper.gender" },
      { label: "Age", value: "camper.age" },
      { label: "Morning Dropoff", value: "morningDropoff" },
      { label: "Afternoon Pickup", value: "afternoonPickup" }
    ];

    try {
      const csv = json2csv(reportData, { fields });
      const date = moment().format("MM/DD/YYYY");
      const filename = _.snakeCase(
        `${camp.name}_${camp.type}_${date}_monday_report.csv`
      );
      res.set({
        "Content-Disposition": `attachment; filename=${filename}`,
        "Content-Type": "text/csv"
      });
      res.status(200).send(csv);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  // Generate CSV Swimming Report
  app.get("/camps/:campId/csv/swimming", auth, async (req, res) => {
    let camp = await Camp.findById(req.params.campId).populate({
      path: "campers",
      populate: [
        {
          path: "camper",
          model: "Camper"
        }
      ]
    });

    const reportData = camp.campers;
    const fields = [
      { label: "First Name", value: "camper.firstName" },
      { label: "Last Name", value: "camper.lastName" },
      { label: "Age", value: "camper.age" },
      { label: "Swimming Ability", value: "camper.swimmingStrength" }
    ];

    try {
      const csv = json2csv(reportData, { fields });
      const date = moment().format("MM/DD/YYYY");
      const filename = _.snakeCase(
        `${camp.name}_${camp.type}_${date}_swimming_report.csv`
      );
      res.set({
        "Content-Disposition": `attachment; filename=${filename}`,
        "Content-Type": "text/csv"
      });
      res.status(200).send(csv);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
};
