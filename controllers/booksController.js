const Book = require("../models/Book");

// GET all books
const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();

        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving books",
            error: error.message
        });
    }
};


// GET one book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(400).json({
            message: "Invalid book ID",
            error: error.message
        });
    }
};


// CREATE a new book just comment
const createBook = async (req, res) => {
    try {

        const newBook = new Book({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year,
            isbn: req.body.isbn,
            publisher: req.body.publisher,
            pages: req.body.pages,
            available: req.body.available
        });

        const savedBook = await newBook.save();

        res.status(201).json(savedBook);

    } catch (error) {
        res.status(400).json({
            message: "Error creating book",
            error: error.message
        });
    }
};


// UPDATE a book
const updateBook = async (req, res) => {
    try {

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(updatedBook);

    } catch (error) {
        res.status(400).json({
            message: "Error updating book",
            error: error.message
        });
    }
};


// DELETE a book
const deleteBook = async (req, res) => {
    try {

        const deletedBook = await Book.findByIdAndDelete(req.params.id);

        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            message: "Error deleting book",
            error: error.message
        });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};