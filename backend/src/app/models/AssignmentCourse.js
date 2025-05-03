const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AssignmentCourse = new Schema({
    assignmentId : { type: Schema.Types.ObjectId, ref: "Assignment" },
    courseId : { type: Schema.Types.ObjectId, ref: "Course" },
    timeStart : Date,
    timeEnd : Date,
});

module.exports = mongoose.model("AssignmentCourse", AssignmentCourse);