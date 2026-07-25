const express = require("express");
const router = express.Router();

const booksController = require("../controllers/booksController");
const isAuthenticated = require("../middleware/authMiddleware");


// GET all books (public)
router.get("/", booksController.getAllBooks);


// GET one book (public)
router.get("/:id", booksController.getBookById);


// CREATE book (protected)
router.post("/", isAuthenticated, booksController.createBook);


// UPDATE book (protected)
router.put("/:id", isAuthenticated, booksController.updateBook);


// DELETE book (protected)
router.delete("/:id", isAuthenticated, booksController.deleteBook);


module.exports = router;