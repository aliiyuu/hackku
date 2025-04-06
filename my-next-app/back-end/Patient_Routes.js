const express = require("express");
const router = express.Router(); 
const patientDB = require("./Patient");

// create new user and store in db
router.route("/patients").post(async (requestAnimationFrame, res) => {
    patientDB
        .create({
            _id:  req.body._id,
            age: req.body.age,
            sex: req.body.sex,
            gender: req.body.gender,
            weight: req.body.weight,
            height: req.body.height,
            conditions: req.body.conditions,
            history: req.body.history,
            medications: req.body.medications,
            opt_in: req.body.opt_in,
            location: req.body.location
        })
        .then(() => {
            res.status(201).send({
              status: true,
              message: "Patient added successfully",
            });
          })
        .catch((err) => {
        res.status(400).send({
            status: false,
            message: err.message,
        });
    });
});

// get all patients
router.route("/patients").get(async (req, res) => {
    let collection = await patientDB.find({}); 
    res.send(collection).status(200);
});

// get a specific patient by email
router.route("/patients/:id").get(async (req, res) => {
    let patient = await patientDB.findOne({ _id: req.params.id });
  
    if (patient != null) res.send(patient).status(200); 
    else
      res.status(400).send({
        // ERROR HANDLING
        status: false,
        message: "Error retrieving patient",
      });
});

// find all patients that opted in, are in the same location as request, share at least 1 condition, and are in the same 10 year age range
// required parameters: location of user, medical conditions list as a string array, age 
router.route("/patients").get(async (req, res) => {
    patientDB.find([
        $and: [
            { opt_in: true },
            { location: req.params.location },
            // CONDITION MATCHING
            { $and: [
                age: $lt: (req.params.age + 5)  
            ] }
        ]
    ])
})
