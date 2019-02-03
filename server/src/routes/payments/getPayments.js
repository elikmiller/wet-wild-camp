module.exports = async (req, res) => {
  try {
    let payments = await Payment.find({ executed: true }).populate("user");
    res.send(payments);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
