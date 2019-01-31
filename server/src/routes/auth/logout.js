module.exports = (req, res) => {
  req.session.authenticated = false;
  req.session.userId = null;
  req.session.admin = false;
  req.session.destroy();
  res.sendStatus(200);
};
