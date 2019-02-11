const router = require("express").Router();
const { auth } = require("../../../middleware");

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

/**
 * @api {get} /camps/:campId Create Camp
 * @apiDescription Create new Camp
 * @apiGroup Camps
 */
router.post("/", require("./createCamp"));

/**
 * @api {get} /camps/:campId Update Camp
 * @apiDescription Update existing Camp
 * @apiGroup Camps
 */
router.patch("/:campId", require("./updateCamp"));

/**
 * @api {get} /camps/:campId Delete Camp
 * @apiDescription Delete existing Camp
 * @apiGroup Camps
 */
router.delete("/:campId", require("./deleteCamp"));

router.get("/:campId/csv/monday", require("./csvMonday"));
router.get("/:campId/csv/swimming", require("./csvSwimming"));
router.get("/:campId/csv/contact", require("./csvContact"));

module.exports = router;
