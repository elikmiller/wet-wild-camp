const router = require("express").Router();
const { auth } = require("../../../middleware");

// router.use(auth);

/**
 * @api {post} /settings Update Settings
 * @apiDescription Update the app's global settings
 * @apiGroup Settings
 */
router.post("/", require("./updateSettings"));

/**
 * @api {get} /settings Get Settings
 * @apiDescription Get current global settings
 * @apiGroup Settings
 */
router.get("/", require("./getSettings"));


module.exports = router;