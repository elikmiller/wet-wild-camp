const router = require("express").Router();
const { auth, validate } = require("../../middleware");
const { body, checkSchema } = require("express-validator/check");

// body("firstName")
//       .exists()
//       .withMessage("First Name is required."),
//     body("lastName")
//       .exists()
//       .withMessage("Last Name is required."),
//     body("dateOfBirth")
//       .exists()
//       .withMessage("Date of Birth is required.")
//       .isISO8601()
//       .withMessage("Date of Birth must be a valid date.")
//       .isBefore()
//       .withMessage("Date of Birth must be before today."),
//     body("gender")
//       .exists()
//       .withMessage("Gender is required.")
//       .isIn(["male", "female", "unspecified"])
//       .withMessage(
//         'Please enter a valid gender. Valid options are "male", "female", or "unspecified"'
//       ),
let validCamper = checkSchema({
  firstName: {
    exists: {
      errorMessage: "First Name is required."
    }
  },
  firstName: {
    exists: {
      errorMessage: "First Name is required."
    }
  }
});

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
      .isISO8601()
      .withMessage("Date of Birth must be a valid date.")
      .isBefore()
      .withMessage("Date of Birth must be before today."),
    body("gender")
      .exists()
      .withMessage("Gender is required.")
      .isIn(["male", "female", "unspecified"])
      .withMessage(
        'Please enter a valid gender. Valid options are "male", "female", or "unspecified"'
      ),
    validate
  ],
  require("./createCamper")
);

/**
 * @api {patch} /campers/:camperId Update Camper
 * @apiDescription Update existing Camper
 * @apiGroup Campers
 */
router.patch(
  "/:camperId",
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
      .withMessage("Please enter a valid birthdate."),
    body("gender")
      .exists()
      .withMessage("Gender is required.")
      .isIn(["male", "female", "unspecified"])
      .withMessage(
        'Please enter a valid gender. Valid options are "male", "female", or "unspecified"'
      ),
    validate
  ],
  require("./updateCamper")
);

/**
 * @api {delete} /campers/:camperId Delete Camper
 * @apiDescription Delete Camper
 * @apiGroup Campers
 */
router.delete("/:camperId", require("./deleteCamper"));

module.exports = router;
