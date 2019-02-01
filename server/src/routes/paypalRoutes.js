const auth = require("../middleware/auth");
const PaypalService = require("../PaypalService");
const EmailService = require("../EmailService");
const { User, Payment, Registration, Camp } = require("../models/index");
const moment = require("moment");

module.exports = app => {
  app.post("/:userId/payments/", auth, async (req, res) => {
    try {
      let registrationArray = await Registration.find({
        _id: req.body.fullPayments
      }).populate("camp");

      let total = 0;
      let earlyBirdCutoff = new Date("2019-05-01");
      total = total + req.body.deposits.length * 100;
      registrationArray.forEach(registration => {
        total = total + registration.camp.fee;
        if (registration.deposit) total = total - 100;
        if (Date.now() < earlyBirdCutoff) total = total - 30;
        req.body.deposits.forEach(deposit => {
          if (String(registration._id) === deposit) {
            total = total - 100;
          }
        });
      });

      let transaction = await PaypalService.createPayment(total);

      let payment = new Payment({
        paypalId: transaction.id,
        amount: transaction.transactions[0].amount.total,
        timeCreated: transaction.create_time,
        user: req.params.userId,
        deposits: req.body.deposits,
        fullPayments: req.body.fullPayments
      });

      let user = await User.findById(req.params.userId);
      user.payments.push(payment._id);
      user.save();
      payment.save();

      res.send(transaction);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.get("/:userId/payments/execute", auth, async (req, res) => {
    try {
      let user = await User.findById(req.params.userId);
      let transaction = await PaypalService.executePayment(
        req.query.paymentId,
        {
          payer_id: req.query.payerId
        }
      );

      if (transaction.state === "approved") {
        let payment = await Payment.findOne({
          paypalId: req.query.paymentId
        })
          .populate({
            path: "fullPayments",
            match: { deleted: false },
            populate: { path: "camper camp" }
          })
          .populate({
            path: "deposits",
            match: { deleted: false },
            populate: { path: "camper camp" }
          });

        payment.fullPayments.forEach(registration => {
          if (!registration.deposit) registration.deposit = true;
          registration.paid = true;
          registration.save();
        });

        payment.deposits.forEach(registration => {
          if (!registration.deposit) {
            registration.deposit = true;
            registration.save();
          }
        });

        payment.executed = true;
        payment.save();

        let fullPayment = payment.fullPayments || [];
        let depositOnly = payment.deposits || [];

        let total = payment.amount.toFixed(2);
        let fullPaymentRow = fullPayment
          .map(payment => {
            return `<tr>
              <td>${payment.camper.firstName} ${payment.camper.lastName}</td>
              <td>${payment.camp.name}</td>
              <td>${moment
                .utc(payment.camp.startDate)
                .format("MM/DD/YYYY")}</td>
              <td>${moment.utc(payment.camp.endDate).format("MM/DD/YYYY")}</td>
              <td>${payment.camp.type} Camp</td>
              <td>Full Payment</td>
            </tr>`;
          })
          .join("");
        let depositOnlyRow = depositOnly
          .map(payment => {
            return `<tr>
              <td>${payment.camper.firstName} ${payment.camper.lastName}</td>
              <td>${payment.camp.name}</td>
              <td>${moment
                .utc(payment.camp.startDate)
                .format("MM/DD/YYYY")}</td>
              <td>${moment.utc(payment.camp.endDate).format("MM/DD/YYYY")}</td>
              <td>${payment.camp.type} Camp</td>
              <td>Deposit</td>
            </tr>`;
          })
          .join("");

        let html = `
        <p>Dear ${user.firstName},</p>
        <p>We have received your registration for your child(ren), for the camp(s) listed below.</p>
        <p>We have also received your payment(s) of $${total}.</p>
        <p>
          <table>
            <tr>
              <th>Camper</th>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Type</th>
              <th>Deposit/Full Amount</th>
            </tr>
            ${fullPaymentRow}
            ${depositOnlyRow}
          </table>
        </p>
        <p>You may review your registration and payment any time by visiting <a href="${
          process.env.CORS_URL
        }">${process.env.CORS_URL}</a></p>
        <p>We're looking forward to a great summer; so glad you'll be joining us.</p>
        `;

        EmailService.sendHtml({
          from: process.env.NO_REPLY_ADDRESS,
          to: user.email,
          bcc: "wetwildcamp@wetwildcamp.com",
          subject: "Wet & Wild Adventure Camp: Registration Confirmation",
          html
        });
      } else {
        console.log("payment not approved by Paypal.");
      }

      res.send(transaction);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.get("/payments", auth, async (req, res) => {
    try {
      let payments = await Payment.find({ executed: true }).populate("user");
      res.send(payments);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.get("/payments/:paypalId", auth, async (req, res) => {
    try {
      let payment = await Payment.findOne({ paypalId: req.params.paypalId });
      res.send(payment);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.delete("/payments/:paypalId", auth, async (req, res) => {
    try {
      let deletedPayment = await Payment.findOneAndRemove({
        paypalId: req.params.paypalId
      });
      res.send(deletedPayment);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  });
};
