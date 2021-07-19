const mongoose = require("mongoose")
const Schema = mongoose.Schema

const countrySchema = new Schema({

    code: {
        type: String,
    },
    name: {
        type: String,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("continents", countrySchema)