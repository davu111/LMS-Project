const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Assignment = new Schema({
    name: String,
    grade: String,
    subject: String,
    year: String, //May be notused
    dateStart: Date,
    type: String,
    duration: String,
    status: String,
}, { timestamps: true });

module.exports = mongoose.model("Assignment", Assignment);