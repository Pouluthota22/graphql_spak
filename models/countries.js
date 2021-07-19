const mongoose = require("mongoose")
const Schema = mongoose.Schema

const countrySchema = new Schema({

    code: {
        type: String,
    },
    name: {
        type: String,
    },
    phone: {
        type: Number
    },
    native: {
        type: String
    },
    continent: {
        type: String
    },
    capital: {
        type: String
    },
    currency: {
        type: String
    },
    languages: [String]

}, {
    timestamps: true
})

module.exports = mongoose.model("countries", countrySchema)