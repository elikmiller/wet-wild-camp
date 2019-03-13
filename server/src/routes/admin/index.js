const router = require("express").Router();
const isAdmin = require("../../middleware/isAdmin");
const EmailService = require("../../EmailService");
const Boom = require("boom");

router.use(isAdmin);

router.use("/users", require("./users"));
router.use("/campers", require("./campers"));
router.use("/camps", require("./camps"));
router.use("/registrations", require("./registrations"));
router.use("/payments", require("./payments"));

router.post("/email", (req, res, next) => {
  EmailService.sendText({
    from: req.body.from,
    to: req.body.to,
    cc: req.body.cc,
    bcc: req.body.bcc,
    subject: req.body.subject,
    text: req.body.text
  })
    .then(email => {
      return res.send(email);
    })
    .catch(err => {
      console.error(err);
      return next(Boom.badImplementation());
    });
});

module.exports = router;
