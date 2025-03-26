const assignmentRouter = require("./assignment");

function route(app) {
    app.use("/api/assignments", assignmentRouter);
}

module.exports = route;
