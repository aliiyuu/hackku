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
    age: Number,
    sex: String,
    gender: String,
    weight: Number,
    height: Number,
    conditions: [String],
    history: String,
    medications: String,
    opt_in: Boolean
})

module.exports = mongoose.model('Patient', patientSchema);