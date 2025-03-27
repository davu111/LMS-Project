const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Question = new Schema({
    question: String,
    answer: {
        a: String,
        b: String,
        c: String,
        d: String
    },
    correct: String,
    assignment_id: { type: Schema.Types.ObjectId, ref: "Assignment" },
}, { timestamps: true });

module.exports = mongoose.model("Question", Question);