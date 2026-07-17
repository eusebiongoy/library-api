const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const booksRoutes = require("./routes/books");
const membersRoutes = require("./routes/members");

app.use("/books", booksRoutes);
app.use("/members", membersRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Library API is running");
});

// MongoDB Connection and Server Start
const PORT = process.env.PORT || 3000;

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("MongoDB Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Swagger Docs: http://localhost:${PORT}/api-docs`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });