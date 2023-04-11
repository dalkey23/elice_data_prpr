const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
      unique: true,
      required: true,
    },
    profileImage: {
      type: String,
      required: false,
      default: null
    },
    userType: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
  },
  {
    collection: "User",
    timestamps: true,
  }
);

module.exports = userSchema;