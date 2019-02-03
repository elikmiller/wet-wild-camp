module.exports = (req, res) => {
  // Clear session
  req.session.authenticated = false;
  req.session.userId = null;
  req.session.admin = false;
  req.session.destroy();

  return res.send();
};
