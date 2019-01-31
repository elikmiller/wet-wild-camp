const router = require("express").Router();

/**
 * @api {get} /registrations Get Registrations
 * @apiDescription Get all Registrations
 * @apiGroup Admin
 */
router.get("/", require("./getRegistrations"));

/**
 * @api {get} /registrations/:registrationId Get Registration
 * @apiDescription Get single Registration
 * @apiGroup Admin
 */
router.get("/:registrationId", require("./getRegistration"));

/**
 * @api {post} /registrations Create Registration
 * @apiDescription Create new Registration
 * @apiGroup Admin
 */
router.post("/", require("./createRegistration"));

/**
 * @api {patch} /registrations/:registrationId Update Registration
 * @apiDescription Update existing Registration
 * @apiGroup Admin
 */
router.patch("/:registrationId", require("./updateRegistration"));

/**
 * @api {delete} /registrations/:registrationId Delete Registration
 * @apiDescription Delete Registration
 * @apiGroup Admin
 */
router.delete("/:registrationId", require("./deleteRegistration"));

module.exports = router;
