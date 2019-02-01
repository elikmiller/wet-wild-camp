const router = require("express").Router();
const auth = require("../../middleware/auth");

router.use(auth);

/**
 * @api {get} /camps Get Camps
 * @apiDescription Get all Camps
 * @apiGroup Camps
 */
router.get("/", require("./getCamps"));

/**
 * @api {get} /camps/:campId Get Camp
 * @apiDescription Get single Camp
 * @apiGroup Camps
 */
router.get("/:campId", require("./getCamp"));

module.exports = router;
