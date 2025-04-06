const express = require("express");
const router = express.Router(); 
const patientDB = require("./Patient");

// create new user and store in db
router.route("/patients").post(async (req, res) => {
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
            message: err.message
        });
    });
});

// get all patients
router.route("/patients").get(async (req, res) => {
    let collection = await patientDB.find({}); 
    res.status(200).send(collection);
});

// find all patients (including given patient) that opted in, are in the same location as request, share at least 1 condition, and are in the same 10 year age range
// required parameter: a patient's email address
router.route("/patients/:id/group").get(async (req, res) => {
    let patient;
    try {
        patient = await patientDB.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: "Patient not found" });
          }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }

    let group = await patientDB.find({
        $and: [
            { opt_in: true },
            { location: patient.location },
            { conditions : { $in: patient.conditions }},
            { age: { $lte: patient.age + 5, $gte: patient.age - 5 }}
        ]
    });

    res.status(200).send(group);
    // error if group is just the patient 
})

// get a specific patient by email
router.route("/patients/:id").get(async (req, res) => {
    let patient = await patientDB.findOne({ _id: req.params.id });
  
    if (patient != null) res.status(200).send(patient); 
    else
      res.status(400).send({
        // ERROR HANDLING
        status: false,
        message: "Error retrieving patient",
      });
});

module.exports = router;
