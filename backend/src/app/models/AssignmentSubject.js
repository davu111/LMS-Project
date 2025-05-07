const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const assignmentSubjectSchema = new Schema({
    subjects: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    title: { type: String, required: true },
    instructions: String,
    assignment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignment",
        required: true,
    },
    notes: String,
    timeStart: { type: Date, required: true },
    deadline: { type: Date, required: true },
},
{
    timestamps: true,
});

module.exports = mongoose.model("AssignmentSubject", assignmentSubjectSchema);