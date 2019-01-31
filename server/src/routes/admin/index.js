const router = require("express").Router();
const isAdmin = require("../../middleware/isAdmin");

router.use(isAdmin);

router.use("/registrations", require("./registrations"));

module.exports = router;
