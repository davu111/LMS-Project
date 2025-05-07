const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        exp: { type: String, required: true },
        color: { type: String, required: true },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true,
        },
        start_date: { type: Date, required: true },
        end_date: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Subject", subjectSchema);

// example (1 subject chi ton tai o 1 course)
// _id: "63f8b2a4e4b0c3d1f8e4b0c3",
// name: "Mathematics",
// exp: "10.000",
// course: "63f8b2a4e4b0c3d1f8e4b0c3",
// teacher: "63f8b2a4e4b0c3d1f8e4b0c3",
// start_date: "2023-02-20T12:00:00.000Z",
// end_date: "2023-06-20T12:00:00.000Z",
// createdAt: "2023-02-20T12:00:00.000Z",
// updatedAt: "2023-02-20T12:00:00.000Z",
// __v: 0
