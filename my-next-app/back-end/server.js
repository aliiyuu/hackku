require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const port = process.env.PORT || 5038;
const app = express();

mongoose
    .connect(process.env.DATABASE_URI)
    .then(() => console.log("Successful connection"))
    .catch((err) => console.log(err));

    mongoose.connection.once("open", () => {
        app.listen(port, () => {
            console.log("Server started on port " + port); 
        });
    });

module.exports = app;
