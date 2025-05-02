const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Score = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: "Student" },
    assignment_id: { type: Schema.Types.ObjectId, ref: "Assignment" },
    score: Number,
    images: [String],
});

module.exports = mongoose.model("Score", Score);