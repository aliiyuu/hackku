require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const Patient = require("./Patient.js");
const patient_routes = require("./Patient_Routes.js");

const port = process.env.PORT || 5038;
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use("/", patient_routes);

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
