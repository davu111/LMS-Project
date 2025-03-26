const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Assignment = new Schema({
    name: String,
    grade: String,
    subject: String,
    year: String,
    type: String,
    duration: String,
    status: String,
});

module.exports = mongoose.model("Assignment", Assignment);