module.exports = async (req, res) => {
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
      user: req.body.userId,
      deposits: req.body.deposits,
      fullPayments: req.body.fullPayments
    });

    let user = await User.findById(req.body.userId);
    user.payments.push(payment._id);
    user.save();
    payment.save();

    res.send(transaction);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
