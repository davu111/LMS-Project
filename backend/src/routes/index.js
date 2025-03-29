const assignmentRouter = require("./assignment");
const questionRouter = require("./question");

function route(app) {
    app.use("/api/assignments", assignmentRouter);
    app.use("/api/questions", questionRouter);
}

module.exports = route;
