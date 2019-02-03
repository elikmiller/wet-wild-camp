module.exports = async (req, res) => {
  try {
    let deletedPayment = await Payment.findOneAndRemove({
      paypalId: req.params.paypalId
    });
    res.send(deletedPayment);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
