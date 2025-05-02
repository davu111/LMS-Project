const assignmentRouter = require("./assignment");
const questionRouter = require("./question");
const scoreRouter = require("./score");

function route(app) {
    app.use("/api/assignments", assignmentRouter);
    app.use("/api/questions", questionRouter);
    app.use("/api/scores", scoreRouter);
    // app.use('/uploads', express.static('uploads'));

}

module.exports = route;
