const router = require("express").Router();
const auth = require("../../middleware/auth");

router.use(auth);

/**
 * @api {get} /registrations Get Registrations
 * @apiDescription Get all Registrations
 * @apiGroup User
 */
router.get("/", require("./getRegistrations"));

/**
 * @api {get} /registrations/:registrationId Get Registration
 * @apiDescription Get single Registration
 * @apiGroup User
 */
router.get("/:registrationId", require("./getRegistration"));

/**
 * @api {post} /registrations Create Registration
 * @apiDescription Create new Registration
 * @apiGroup User
 */
router.post("/", require("./createRegistration"));

/**
 * @api {patch} /registrations/:registrationId Update Registration
 * @apiDescription Update existing Registration
 * @apiGroup User
 */
router.patch("/:registrationId", require("./updateRegistration"));

/**
 * @api {delete} /registrations/:registrationId Delete Registration
 * @apiDescription Delete Registration
 * @apiGroup User
 */
router.delete("/:registrationId", require("./deleteRegistration"));

module.exports = router;
