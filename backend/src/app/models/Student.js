const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Student = new Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    // class_id: { type: Schema.Types.ObjectId, ref: "Class" },
    // teacher_id: { type: Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

module.exports = mongoose.model("Student", Student);