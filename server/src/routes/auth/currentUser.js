const { User } = require("../../models");

module.exports = async (req, res) => {
  if (!req.session.userId) {
    return res.sendStatus(500);
  }
  try {
    let user = await User.findById(req.session.userId);
    res.send({
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        admin: user.admin
      }
    });
  } catch (err) {
    res.sendStatus(500);
  }
};
