const router = require("express").Router();
const auth = require("../../middleware/auth");
const { body } = require("express-validator/check");

router.use(auth);

/**
 * @api {get} /campers Get Campers
 * @apiDescription Get all Campers
 * @apiGroup Campers
 */
router.get("/", require("./getCampers"));

/**
 * @api {get} /campers/:camperId Get Camper
 * @apiDescription Get single Camper
 * @apiGroup Campers
 */
router.get("/:camperId", require("./getCamper"));

/**
 * @api {post} /campers Create Camper
 * @apiDescription Create new Camper
 * @apiGroup Campers
 */
router.post(
  "/",
  [
    body("firstName")
      .exists()
      .withMessage("First Name is required."),
    body("lastName")
      .exists()
      .withMessage("Last Name is required."),
    body("dateOfBirth")
      .exists()
      .withMessage("Date of Birth is required.")
      .isBefore()
      .withMessage("Please enter a valid birthdate.")
  ],
  require("./createCamper")
);

/**
 * @api {patch} /campers/:camperId Update Camper
 * @apiDescription Update existing Camper
 * @apiGroup Campers
 */
router.patch("/:camperId", require("./updateCamper"));

/**
 * @api {delete} /campers/:camperId Delete Camper
 * @apiDescription Delete Camper
 * @apiGroup Campers
 */
router.delete("/:camperId", require("./deleteCamper"));

module.exports = router;
