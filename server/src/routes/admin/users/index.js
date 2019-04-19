const router = require("express").Router();

/**
 * @api {get} /users Get Users
 * @apiDescription Get all Users
 * @apiGroup User
 */
router.get("/", require("./getUsers"));

/**
 * @api {get} /users Get User
 * @apiDescription Get User
 * @apiGroup User
 */
router.get("/:userId", require("./getUser"));

/**
 * @api {patch} /users Update User
 * @apiDescription Update User
 * @apiGroup User
 */
router.patch("/:userId", require("./updateUser"));

/**
 * @api {delete} /users Delete User
 * @apiDescription Delete User
 * @apiGroup User
 */
router.delete("/:userId", require("./deleteUser"));

module.exports = router;
