const router = require("express").Router();
const isAdmin = require("../../middleware/isAdmin");
const EmailService = require("../../EmailService");

router.use(isAdmin);

// router.use("/users", require("./src/routes/users"));
// router.use("/auth", require("./src/routes/auth"));
router.use("/campers", require("./campers"));
router.use("/camps", require("./camps"));
router.use("/registrations", require("./registrations"));
// router.use("/admin", require("./src/routes/admin"));
// router.use("/payments", require("./src/routes/payments"));

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
