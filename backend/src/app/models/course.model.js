const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
    name: String,
    // teacher_id: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Course", Course);