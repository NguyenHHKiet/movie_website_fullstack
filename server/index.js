// Requiring module
const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");

const movieRoutes = require("./routes/movie");
const authenticate = require("./middleware/authenticate");

app.use(cors());
app.use(bodyParser.json());

app.use(authenticate);
// Handling GET /api/movies request
app.use("/api/movies", movieRoutes);

// Handling non matching request from the client
app.use((req, res, next) => {
    res.status(404).send({
        message: "Route not found",
    });
});

// Server setup
app.listen(5000, () => {
    console.log("Server is Running");
});
