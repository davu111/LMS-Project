const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    course_id: { type: Schema.Types.ObjectId, ref: "Course" },
    // teacher_id: { type: Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Student", Student);