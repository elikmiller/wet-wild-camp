const { GlobalSettings, Payment, Registration, Camp } = require("../../models");
const PaypalService = require("../../PaypalService");
const Boom = require("boom");

module.exports = async (req, res, next) => {
  try {
    let registrationArray = await Registration.find({
      _id: req.body.fullPayments
    }).populate("camp");
    let depositRegistrations = await Registration.find({
      _id: req.body.deposits
    }).populate("camp");
    let appendedArray = registrationArray.concat(depositRegistrations);

    let errors = [];
    for (const registration of appendedArray) {
      let camp = await Camp.findOne({ _id: registration.camp._id }).populate({
        path: "registrations",
        select: "deposit paid"
      });
      let savedRegistrations = camp.registrations.filter(reg => {
        return reg.deposit;
      });
      if (savedRegistrations.length >= camp.capacity && !registration.deposit) {
        errors.push(`${camp.fullName} is full.`);
      }
    }

    if (errors.length) return next(Boom.badRequest(errors[0]));

    let settings = await GlobalSettings.findOne({});
    let earlyBirdDate = new Date(settings.earlyBirdCutoff);

    let total = 0;
    total = total + req.body.deposits.length * 100;
    registrationArray.forEach(registration => {
      total = total + registration.camp.fee;
      if (registration.deposit) total = total - 100;
      if (Date.now() < earlyBirdDate) total = total - 30;
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
      deposits: req.body.deposits,
      fullPayments: req.body.fullPayments,
      user: req.session.userId,
      archived: false
    });
    await payment.save();

    return res.send(transaction);
  } catch (err) {
    console.error(err);
    return next(Boom.badImplementation());
  }
};
