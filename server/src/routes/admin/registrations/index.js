const router = require("express").Router();

/**
 * @api {get} /admin/registrations Get Registrations (Admin)
 * @apiDescription Get all Registrations
 * @apiGroup Registrations
 */
router.get("/", require("./getRegistrations"));

/**
 * @api {get} /admin/registrations/:registrationId Get Registration (Admin)
 * @apiDescription Get single Registration
 * @apiGroup Registrations
 */
router.get("/:registrationId", require("./getRegistration"));

/**
 * @api {post} /admin/registrations Create Registration (Admin)
 * @apiDescription Create new Registration
 * @apiGroup Registrations
 */
router.post("/", require("./createRegistration"));

/**
 * @api {patch} /admin/registrations/:registrationId Update Registration (Admin)
 * @apiDescription Update existing Registration
 * @apiGroup Registrations
 */
router.patch("/:registrationId", require("./updateRegistration"));

/**
 * @api {delete} /admin/registrations/:registrationId Delete Registration (Admin)
 * @apiDescription Delete Registration
 * @apiGroup Registrations
 */
router.delete("/:registrationId", require("./deleteRegistration"));

module.exports = router;
