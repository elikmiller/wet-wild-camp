module.exports = (req, res, next) => {
  if (req.session.authenticated) {
    return next();
  } else {
    return res.sendStatus(401);
  }
};
