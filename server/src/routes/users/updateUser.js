const { User } = require("../../models");

module.exports = async (req, res) => {
  delete req.body.admin;
  delete req.body.campers;
  delete req.body.registrations;
  delete req.body.payments;
  try {
    let updatedUser = await User.findByIdAndUpdate(
      req.session.userId,
      req.body,
      { new: true }
    );
    res.send({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};
