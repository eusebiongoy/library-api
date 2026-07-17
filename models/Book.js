const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true
    },

    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true
    },

    genre: {
      type: String,
      required: [true, "Genre is required"],
      trim: true
    },

    year: {
      type: Number,
      required: [true, "Year is required"],
      min: [0, "Year cannot be negative"]
    },

    isbn: {
      type: String,
      required: [true, "ISBN is required"],
      unique: true,
      trim: true
    },

    publisher: {
      type: String,
      required: [true, "Publisher is required"],
      trim: true
    },

    pages: {
      type: Number,
      required: [true, "Pages are required"],
      min: [1, "Pages must be greater than 0"]
    },

    available: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Book", bookSchema);