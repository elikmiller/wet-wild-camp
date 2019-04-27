const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PaymentSchema = new Schema({
  paypalId: {
    type: String,
    required: true
  },
  timeCreated: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  executed: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  user: {
    type: ObjectId,
    ref: "User"
  },
  deposits: [
    {
      type: ObjectId,
      ref: "Registration"
    }
  ],
  fullPayments: [
    {
      type: ObjectId,
      ref: "Registration"
    }
  ]
});

PaymentSchema.virtual("fullAmount").get(function() {
  return `$${this.amount.toFixed(2)}`;
});

PaymentSchema.set("toObject", { virtuals: true });

PaymentSchema.set("toJSON", { virtuals: true });

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = {
  Payment: Payment
};
