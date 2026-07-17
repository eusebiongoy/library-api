const express = require("express");
const router = express.Router();

const booksController = require("../controllers/booksController");

// GET all books
router.get("/", booksController.getAllBooks);

// GET one book
router.get("/:id", booksController.getBookById);

// CREATE book
router.post("/", booksController.createBook);

// UPDATE book
router.put("/:id", booksController.updateBook);

// DELETE book
router.delete("/:id", booksController.deleteBook);

module.exports = router;