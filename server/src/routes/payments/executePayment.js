const { User, Payment } = require("../../models");
const EmailService = require("../../EmailService");
const PaypalService = require("../../PaypalService");
const Boom = require("boom");
const moment = require("moment");

module.exports = async (req, res, next) => {
  try {
    let user = await User.findById(req.session.userId);
    let transaction = await PaypalService.executePayment(req.query.paymentId, {
      payer_id: req.query.payerId
    });

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
        <p>We have received your payment of $${total} for your child(ren) for the camps listed below:</p>
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
        subject: "Wet & Wild Adventure Camp: Payment Confirmation",
        html
      });
    } else {
      console.log("payment not approved by Paypal.");
    }

    res.send(transaction);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
