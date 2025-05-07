const assignmentRouter = require("./assignment");
const questionRouter = require("./question");
const scoreRouter = require("./score");
const studentRouter = require("./student");
const subjectRouter = require("./subject");
const assignmentSubjectRouter = require("./assignment_subject");

function route(app) {
    app.use("/api/assignments", assignmentRouter);
    app.use("/api/questions", questionRouter);
    app.use("/api/scores", scoreRouter);
    app.use("/api/students", studentRouter);
    app.use("/api/subjects", subjectRouter);
    app.use("/api/assignment_subjects", assignmentSubjectRouter);

}

module.exports = route;
