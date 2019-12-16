const router = require("express").Router();
const { auth } = require("../../../middleware");

router.use(auth);

/**
 * @api {post} /settings Update Settings
 * @apiDescription Update the app's global settings
 * @apiGroup Settings
 */
router.post("/", require("./updateSettings"));


module.exports = router;