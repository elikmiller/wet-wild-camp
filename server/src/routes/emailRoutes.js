const auth = require("../middleware/auth");
const EmailService = require("../EmailService");

module.exports = app => {
  app.post("/admin/email", auth, async (req, res) => {
    EmailService.sendText({
      from: req.body.from,
      to: req.body.to,
      cc: req.body.cc,
      bcc: req.body.bcc,
      subject: req.body.subject,
      text: req.body.text
    })
      .then(email => {
        res.send(email);
      })
      .catch(err => {
        console.error(err);
      });
  });
};
