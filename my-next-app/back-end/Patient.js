const { Agent } = require("http");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    _id: { // email
        type: String,
        validate: {
            validator: function(email) {
                return /(gmail\.com)$/.test(email);
            },
            message: props => " This is not a valid email."
        }
    },
    age: { type: Number, default: ""},
    sex: { type: String, default: ""},
    gender: { type: String, default: ""},
    weight: { type: Number, default: ""},
    height: { type: Number, default: ""},
    conditions: { type: [String], default: ""},
    history: { type: String, default: ""},
    medications: { type: String, default: ""},
    opt_in: { type: Boolean, default: false},
    location: { type: String, default: ""}
})

module.exports = mongoose.model('Patient', patientSchema);