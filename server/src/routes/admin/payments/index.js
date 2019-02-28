const router = require("express").Router();

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
 * @api {delete} /camps Delete Payment
 * @apiDescription Delete existing Payment
 * @apiGroup Payments
 */
router.delete("/:paymentId", require("./deletePayment"));

module.exports = router;
