const assignmentRouter = require("./assignment");
const questionRouter = require("./question");
const scoreRouter = require("./score");
const studentRouter = require("./student");

function route(app) {
    app.use("/api/assignments", assignmentRouter);
    app.use("/api/questions", questionRouter);
    app.use("/api/scores", scoreRouter);
    app.use("/api/students", studentRouter);

}

module.exports = route;
