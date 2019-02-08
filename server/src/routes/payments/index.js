const router = require("express").Router();
const { auth } = require("../../middleware");

router.use(auth);

/**
 * @api {get} /camps Execute Payment
 * @apiDescription Execute Payment following User approval
 * @apiGroup Payments
 */
router.get("/:paymentId/execute", require("./executePayment"));

/**
 * @api {get} /camps Get Payments
 * @apiDescription Get all Payments
 * @apiGroup Payments
 */
router.get("/", require("./getPayments"));

/**
 * @api {get} /camps Get Payment
 * @apiDescription Get single Payment
 * @apiGroup Payments
 */
router.get("/:paymentId", require("./getPayment"));

/**
 * @api {post} /camps Create Payment
 * @apiDescription Create new Payment
 * @apiGroup Payments
 */
router.post("/", require("./createPayment"));

/**
 * @api {delete} /camps Delete Payment
 * @apiDescription Delete existing Payment
 * @apiGroup Payments
 */
router.delete("/:paymentId", require("./deletePayment"));

module.exports = router;
