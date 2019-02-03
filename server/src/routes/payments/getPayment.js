module.exports = async (req, res) => {
  try {
    let payment = await Payment.findOne({ paypalId: req.params.paypalId });
    res.send(payment);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
