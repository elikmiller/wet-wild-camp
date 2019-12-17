const router = require("express").Router();
const { auth } = require("../../middleware");

// router.use(auth);

/**
 * @api {get} /camps Get Early Bird Date
 * @apiDescription Get early bird date from settings
 * @apiGroup Settings
 */
router.get("/", require("./getEarlyBird"));

module.exports = router;
