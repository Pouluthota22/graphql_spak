const mongoose = require("mongoose")
const Schema = mongoose.Schema

const languageSchema = new Schema({

    code: {
        type: String,
    },
    name: {
        type: String,
    },
    native: {
        type: String
    },
    rtf: {
        type: Boolean,
        default:false
    }

}, {
    timestamps: true
})

module.exports = mongoose.model("languages", languageSchema)