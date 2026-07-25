const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true
    },

    membershipDate: {
      type: Date,
      required: [true, "Membership date is required"]
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Member", memberSchema);