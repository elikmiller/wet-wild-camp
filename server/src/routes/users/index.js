const router = require("express").Router();
const { auth, validate } = require("../../middleware");
const { checkSchema } = require("express-validator/check");

const checkUserSchema = checkSchema({
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
  email: {
    exists: {
      errorMessage: "Email Address is required."
    },
    isEmail: {
      errorMessage: "Please enter a valid Email Address."
    }
  },
  password: {
    exists: {
      errorMessage: "Password is required."
    },
    isLength: {
      options: { min: 8, max: 64 },
      errorMessage: "Password must be between 8 and 64 characters."
    }
  }
});

/**
 * @api {post} /users Create User
 * @apiDescription Create User
 * @apiGroup User
 */
router.post("/", [checkUserSchema, validate], require("./createUser"));

/**
 * @api {get} /users Get User
 * @apiDescription Get User
 * @apiGroup User
 */
router.get("/", auth, require("./getUser"));

/**
 * @api {patch} /users Update User
 * @apiDescription Update User
 * @apiGroup User
 */
router.patch("/", auth, require("./updateUser"));

module.exports = router;
