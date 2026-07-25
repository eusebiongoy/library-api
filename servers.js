require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./config/swagger");
const passport = require("./config/passport");

const app = express();


// Trust proxy (needed for Render HTTPS)
app.set("trust proxy", 1);


// Body parser
app.use(express.json());


// CORS
app.use(
    cors({
        origin: true,
        credentials: true
    })
);


// Session configuration
app.use(
    session({

        name: "library.sid",

        secret: process.env.SESSION_SECRET,

        resave: false,

        saveUninitialized: false,

        rolling: true,

        cookie: {

            httpOnly: true,

            // false on localhost, true on Render
            secure: process.env.NODE_ENV === "production",

            // Allows OAuth cookies on Render but works locally too
            sameSite:
                process.env.NODE_ENV === "production"
                    ? "none"
                    : "lax",

            maxAge: 1000 * 60 * 60 * 24
        }
    })
);


// Passport initialization
app.use(passport.initialize());

app.use(passport.session());


// Swagger Documentation
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);


// Routes
const booksRoutes = require("./routes/books");
const membersRoutes = require("./routes/members");
const authRoutes = require("./routes/auth");


app.use("/books", booksRoutes);

app.use("/members", membersRoutes);

app.use("/", authRoutes);


// Home route
app.get("/", (req, res) => {

    res.json({

        message: "Library API is running",

        environment: process.env.NODE_ENV

    });

});


// 404 Handler
app.use((req, res) => {

    res.status(404).json({

        message: "Route not found"

    });

});


// Database connection
const PORT = process.env.PORT || 3000;


mongoose
    .connect(process.env.MONGODB_URI)

    .then(() => {

        console.log("MongoDB Connected");


        app.listen(PORT, () => {

            console.log(`Server running on port ${PORT}`);

            console.log(
                `Swagger Docs: http://localhost:${PORT}/api-docs`
            );

        });

    })

    .catch((error) => {

        console.error(
            "MongoDB connection error:",
            error
        );

    });