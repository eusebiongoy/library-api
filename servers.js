require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");
const passport = require("./config/passport");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
const booksRoutes = require("./routes/books");
const membersRoutes = require("./routes/members");
const authRoutes = require("./routes/auth");

app.use("/books", booksRoutes);
app.use("/members", membersRoutes);
app.use("/", authRoutes);

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