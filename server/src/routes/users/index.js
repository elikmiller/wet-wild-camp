const router = require("express").Router();
const auth = require("../../middleware/auth");
const { body } = require("express-validator/check");

/**
 * @api {post} /users Create User
 * @apiDescription Create User
 * @apiGroup User
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
    body("email")
      .exists()
      .withMessage("Email Address is required.")
      .isEmail()
      .withMessage("Please enter a valid Email Address."),
    body("password")
      .exists()
      .withMessage("Password is required.")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be between 8 and 64 characters.")
  ],
  require("./createUser")
);

/**
 * @api {get} /users Get User
 * @apiDescription Get User
 * @apiGroup User
 */
router.get("/", auth, require("./getUser"));

/**
 * @api {get} /users/contacts Get Contacts
 * @apiDescription Get User contact information
 * @apiGroup User
 */
router.get("/contacts", auth, require("./getContacts"));

/**
 * @api {patch} /users Update User
 * @apiDescription Update User
 * @apiGroup User
 */
router.patch("/", auth, require("./updateUser"));

module.exports = router;
