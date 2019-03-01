const router = require("express").Router();
const { validate } = require("../../../middleware");
const { checkSchema } = require("express-validator/check");

const checkCamperSchema = checkSchema({
  firstName: {
    exists: {
      errorMessage: "First Name is required."
    }
  },
  lastName: {
    exists: {
      errorMessage: "Last Name is required."
    }
  },
  dateOfBirth: {
    exists: {
      errorMessage: "Date of Birth is required."
    },
    isISO8601: {
      errorMessage: "Date of Birth must be a valid date."
    },
    isBefore: {
      errorMessage: "Date of Birth must be in the past."
    }
  },
  gender: {
    isIn: {
      options: [["male", "female", "unspecified"]],
      errorMessage:
        'Please enter a valid gender. Valid options are "male", "female", or "unspecified"'
    }
  }
});

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
router.post("/", [checkCamperSchema, validate], require("./createCamper"));

/**
 * @api {patch} /campers/:camperId Update Camper
 * @apiDescription Update existing Camper
 * @apiGroup Campers
 */
router.patch(
  "/:camperId",
  [checkCamperSchema, validate],
  require("./updateCamper")
);

/**
 * @api {patch} /campers/:camperId Update Camper
 * @apiDescription Update many existing Campers
 * @apiGroup Campers
 */
router.patch("/", require("./updateCamperBulk"));

/**
 * @api {delete} /campers/:camperId Delete Camper
 * @apiDescription Delete Camper
 * @apiGroup Campers
 */
router.delete("/:camperId", require("./deleteCamper"));

module.exports = router;
