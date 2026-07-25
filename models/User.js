const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    githubId: {
      type: String,
      required: true,
      unique: true
    },

    username: {
      type: String,
      required: true
    },

    name: {
      type: String
    },

    email: {
      type: String,
      lowercase: true,
      trim: true
    },

    avatar: {
      type: String
    },

    provider: {
      type: String,
      default: "github"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("User", userSchema);