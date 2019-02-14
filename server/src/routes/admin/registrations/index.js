const router = require("express").Router();
const { validate } = require("../../../middleware");
const { checkSchema } = require("express-validator/check");

const checkRegistrationSchema = checkSchema({
  user: {
    exists: {
      errorMessage: "User is required."
    }
  },
  camper: {
    exists: {
      errorMessage: "Camper is required."
    }
  },
  camp: {
    exists: {
      errorMessage: "Camp is required."
    }
  },
  morningDropoff: {
    exists: {
      errorMessage: "Morning Dropoff is required."
    },
    isIn: {
      options: [["north", "central", "south"]],
      errorMessage:
        'Please enter a valid morning dropoff location. Valid options are "north", "central", or "south"'
    }
  },
  afternoonPickup: {
    exists: {
      errorMessage: "Afternoon Pickup is required."
    },
    isIn: {
      options: [["north", "central", "south"]],
      errorMessage:
        'Please enter a valid afternoon pickup location. Valid options are "north", "central", or "south"'
    }
  }
});

/**
 * @api {get} /registrations Get Registrations
 * @apiDescription Get all Registrations
 * @apiGroup Registrations
 */
router.get("/", require("./getRegistrations"));

/**
 * @api {get} /registrations/:registrationId Get Registration
 * @apiDescription Get single Registration
 * @apiGroup Registrations
 */
router.get("/:registrationId", require("./getRegistration"));

/**
 * @api {post} /registrations Create Registration
 * @apiDescription Create new Registration
 * @apiGroup Registrations
 */
router.post(
  "/",
  [checkRegistrationSchema, validate],
  require("./createRegistration")
);

/**
 * @api {patch} /registrations Update Registration
 * @apiDescription Update existing Registration
 * @apiGroup Registrations
 */
router.patch(
  "/:registrationId",
  [checkRegistrationSchema, validate],
  require("./updateRegistration")
);

/**
 * @api {delete} /registrations/:registrationId Delete Registration
 * @apiDescription Delete Registration
 * @apiGroup Registrations
 */
router.delete("/:registrationId", require("./deleteRegistration"));

module.exports = router;
