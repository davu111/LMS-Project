const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Score = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: "User" },
    assignment_id: { type: Schema.Types.ObjectId, ref: "Assignment" },
    score: Number});

module.exports = mongoose.model("Score", Score);