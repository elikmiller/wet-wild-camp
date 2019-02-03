const router = require("express").Router();
const isAdmin = require("../../middleware/isAdmin");
const EmailService = require("../../EmailService");

router.use(isAdmin);

router.use("/registrations", require("./registrations"));

router.post("/email", async (req, res) => {
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

module.exports = router;
