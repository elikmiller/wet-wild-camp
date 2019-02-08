const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  primaryContact: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    streetAddress: { type: String },
    streetAddress2: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String }
  },
  secondaryContact: {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String }
  },
  emergencyContact: {
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String }
  },
  surveyQuestion: {
    type: String,
    enum: [
      "previousCamper",
      "internet",
      "friend/relative",
      "campFair",
      "newspaper/magazine",
      "other"
    ]
  }
});

UserSchema.virtual("registrations", {
  ref: "Registration",
  localField: "_id",
  foreignField: "user"
});

UserSchema.virtual("campers", {
  ref: "Camper",
  localField: "_id",
  foreignField: "user"
});

UserSchema.virtual("payments", {
  ref: "Payment",
  localField: "_id",
  foreignField: "user"
});

UserSchema.set("toObject", { virtuals: true });

UserSchema.set("toJSON", { virtuals: true });

// Hashes and salts passwords before they are saved to the database
UserSchema.pre("save", function(next) {
  const user = this;
  if (user.isModified("password") || user.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        return next();
      });
    });
  } else return next();
});

UserSchema.pre("findOneAndUpdate", async function(next) {
  let query = this;
  if (query._update.password) {
    let hash = await bcrypt.hash(query._update.password, 10);
    query._update.password = hash;
  }
  return next();
});

// Checks login info against the DB
UserSchema.statics.authenticate = (email, password, callback) => {
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return callback(err, null);
    }
    if (!user) {
      let err = new Error("User not found.");
      err.status = 401;
      return callback(err, null);
    }
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return callback(err, null);
      }
      if (result) {
        return callback(null, user);
      } else {
        return callback(new Error("Invalid password."), null);
      }
    });
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = {
  User: User
};
