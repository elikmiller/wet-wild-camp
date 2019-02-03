const router = require("express").Router();
const auth = require("../../middleware/auth");

router.use(auth);

//Create payment
router.post("/", require("./createPayment"));

// Execute payment
router.get("/:paymentId/execute", require("./executePayment"));

// Get Payments
router.get("/", require("./getPayments"));

// Get Payment
router.get("/:paymentId", require("./getPayment"));

// Delete payment
router.delete("/:paypalId", require("./deletePayment"));

module.exports = router;
