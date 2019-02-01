const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    let user = await User.findById(req.session.userId);
    res.send({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    });
  } catch (err) {
    res.sendStatus(500);
  }
};
