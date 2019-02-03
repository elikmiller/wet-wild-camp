const router = require("express").Router();
const auth = require("../../middleware/auth");
const validate = require("../../middleware/validate");
const { body } = require("express-validator/check");

/**
 * @api {post} /auth/login Login
 * @apiDescription Authenticate User
 * @apiGroup Auth
 *
 * @apiParam {String} email User email address
 * @apiParam {String} password User password
 * @apiParamExample {json} Example
 * {
 *   "email": "user@email.com", "password": "password" }
 *
 * @apiSuccess (Success - 200) {Object} user Authenticated User
 * @apiSuccessExample {json} Response
 * {
 *   "user": {
 *     "_id": "5c18729d5b33380bba1e37b6",
 *     "firstName": "First",
 *     "lastName": "Last",
 *     "email": "user@email.com",
 *     "admin": false
 *   }
 * }
 *
 * @apiError (Error - 4xx) 400 Invalid request
 * @apiError (Error - 4xx) 401 Unauthorized
 */
router.post(
  "/login",
  [
    body("email")
      .exists()
      .withMessage("Email Address is required.")
      .isEmail()
      .withMessage("Please enter a valid Email Address."),
    body("password")
      .exists()
      .withMessage("Password is required.")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be between 8 and 64 characters."),
    validate
  ],
  require("./login")
);

/**
 * @api {get} /auth/logout Logout
 * @apiDescription Unauthenticate User
 * @apiGroup Auth
 */
router.get("/logout", require("./logout"));

/**
 * @api {get} /auth/current_user Current User
 * @apiDescription Get currently authenticated User
 * @apiGroup Auth
 */
router.get("/current_user", auth, require("./currentUser"));

/**
 * @api {post} /auth/password_reset Password Reset
 * @apiDescription Request a password reset email
 * @apiGroup Auth
 */
router.post(
  "/password_reset",
  [
    body("email")
      .exists()
      .withMessage("Email Address is required.")
      .isEmail()
      .withMessage("Please enter a valid Email Address.")
  ],
  require("./passwordReset")
);

/**
 * @api {post} /auth/redeem_password_reset_token Redeem Password Reset Token
 * @apiDescription Request a password reset email
 * @apiGroup Auth
 */
router.post(
  "/redeem_password_reset_token",
  [
    body("token")
      .exists()
      .withMessage("Token is required."),
    body("password")
      .exists()
      .withMessage("Password is required.")
      .isLength({ min: 8, max: 64 })
      .withMessage("Password must be between 8 and 64 characters.")
  ],
  require("./redeemPasswordResetToken")
);

module.exports = router;